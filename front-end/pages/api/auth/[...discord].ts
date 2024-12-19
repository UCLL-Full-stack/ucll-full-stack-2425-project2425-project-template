import { NextApiRequest, NextApiResponse } from 'next';
import { Client, GatewayIntentBits } from "discord.js";
import axios from 'axios';
import UserService from '@/services/UserService';
import GuildService from '@/services/GuildService';
import RoleService from '@/services/RoleService';
import fs from 'fs'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
})

client.once('ready', () => {
    console.log('Discord client ready');
});

client.login(process.env.BOT_TOKEN);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const { code } = req.query;

        // Exchange the code for an access token
        if (typeof code === 'string') {
            const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
                    client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET!,
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!,
                }).toString(),
            });

            const tokenData = await tokenResponse.json();

            if (tokenResponse.ok) {
                const accessToken = tokenData.access_token;

                // Fetch user data
                const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // Fetch guild data
                const guildResponse = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const userData = await userResponse.data;
                const guildsData = await guildResponse.data;
                const user = await UserService.getUser(userData.id);
                if (user.error) {
                    if (user.error === 'User not found') {
                        await UserService.addUser({
                            userId: userData.id,
                            username: userData.username,
                            globalName: userData.global_name,
                            userAvatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
                        });
                    }
                } else if (user.userId) {
                    await UserService.updateUser(userData.id, {
                        username: userData.username,
                        globalName: userData.global_name,
                        userAvatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
                    });
                }
                const adminOrManageServerGuilds = guildsData.filter((guild: { id: string, permissions: string | number | bigint; })=>{
                    const permissions = BigInt(guild.permissions);
                    const hasAdmin = (permissions & BigInt(0x00000008)) === BigInt(0x00000008);
                    const hasManageServer = (permissions & BigInt(0x00000020)) === BigInt(0x00000020);
                    return hasAdmin || hasManageServer;
                })
                const ownerGuilds = guildsData.filter((guild: {owner: boolean}) => guild.owner === true);
                const botGuildData = await Promise.all(
                    guildsData.map(async (guild: {id: string, name: string, ownerId: string}) => {
                        try {
                            const botGuild = client.guilds.cache.get(guild.id);
                            if (!botGuild) return null;
                            const roles = botGuild.roles.cache.map((role) => ({
                                id: role.id,
                                name: role.name,
                                permissions: role.permissions.toArray(),
                            }));
                            const members = await botGuild.members.fetch();
                            const memberData = members.map((member) => ({
                                userId: member.user.id,
                                username: member.user.username,
                                avatar: member.user.displayAvatarURL(),
                                roles: member.roles.cache.map((role) => role.id),
                            }));
                            return {
                                id: guild.id,
                                name: guild.name,
                                ownerId: botGuild.ownerId,
                                roles,
                                members: memberData,
                            };
                        } catch (error: any) {
                            console.error(`Error fetching data for guild ${guild.id}:`, error.message);
                            return null;
                        }
                    })
                );
                const filteredBotGuildData = botGuildData.filter((guild) => guild !== null);
                filteredBotGuildData.forEach(async (guild: any) => {
                    const exists = await GuildService.getGuild(guild.id);
                    if(exists.error){
                        if(exists.error === "Guild not found"){
                            // console.log(guild)
                            await GuildService.addGuild({
                                guildId: guild.id,
                                guildName: guild.name,
                                guildOwnerId: guild.ownerId,
                                members: guild.members.map((member: any) => {
                                    return {
                                        userId: member.userId,
                                        roleIds: member.roles,
                                    };
                                }),
                            });
                            await Promise.all(guild.roles.map(async (role: any) => {
                                await RoleService.addRole({
                                    roleId: role.id,
                                    roleName: role.name,
                                    permissions: role.permissions,
                                    guildId: guild.id,
                                });
                            }));
                        }                
                    } else if(exists.guildId){
                        await GuildService.updateGuild(guild.id, {
                            guildName: guild.name,
                            guildOwnerId: guild.ownerId,
                            members: guild.members.map((member: any) => {
                                return {
                                    userId: member.userId,
                                    roleIds: member.roles,
                                };
                            }),
                        });
                        await Promise.all(guild.roles.map(async (role: any) => {
                            const exists = await RoleService.getRole(role.id);
                            if(exists.error){
                                if(exists.error === "Role not found"){
                                    await RoleService.addRole({
                                        roleId: role.id,
                                        roleName: role.name,
                                        permissions: role.permissions,
                                        guildId: guild.id,
                                    });
                                }
                            } else if(exists.roleId){
                                await RoleService.updateRole(role.id, {
                                    roleName: role.name,
                                    permissions: role.permissions,
                                    guildId: guild.id,
                                });
                            }
                        }));
                    }
                });
                const guildsInDb = await GuildService.getGuilds();
                const guildsInDbUserIsIn = guildsInDb.filter((guild: any) => guildsData.some((guildData: any) => guildData.id === guild.guildId));
                const userGuildIds = guildsInDb
                    .filter((guild: any) => guild.members.some((member: any) => member.userId === user.userId))
                    .map((guild: any) => guild.guildId);
                
                await UserService.updateUser(userData.id, {
                    guildIds: userGuildIds,
                });
                const data = {
                    userId: userData.id,
                    username: userData.username,
                    globalName: userData.global_name,
                    userAvatar: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
                }
                const enhancedGuildsInDb = guildsInDbUserIsIn.map((guild: {guildId: string, guildName: string}) => {
                    const botInGuild = client.guilds.cache.has(guild.guildId);
                    return {
                        guildId: guild.guildId,
                        guildName: guild.guildName,
                        botInGuild,
                        inviteLink: botInGuild
                            ? null
                            : `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&guild_id=${guild.guildId}&permissions=8&scope=bot`,
                        };
                });
                const enhancedOwner = adminOrManageServerGuilds.map((guild: {id: string, name: string}) => {
                    const botInGuild = client.guilds.cache.has(guild.id);
                    return {
                        guildId: guild.id,
                        guildName: guild.name,
                        botInGuild,
                        inviteLink: botInGuild
                            ? null
                            : `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&guild_id=${guild.id}&permissions=8&scope=bot`,
                        };
                });
                const enhancedGuilds = [
                    ...enhancedGuildsInDb,
                    ...enhancedOwner.filter((guild: {guildId: string}) => !enhancedGuildsInDb.some((guildInDb: {guildId: string}) => guildInDb.guildId === guild.guildId)),
                ]
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <script>
                        sessionStorage.setItem('user', '${JSON.stringify(data)}');
                        sessionStorage.setItem('guilds', '${JSON.stringify(enhancedGuilds).replace(/'/g, "\\'").replace(/"/g, '\\"')}');
                        window.location.href = '/';
                    </script>    
                `);
            }
        } else {
            res.status(400).json({ error: 'Invalid code' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
