import { NextApiRequest, NextApiResponse } from 'next';
import { Client, GatewayIntentBits } from "discord.js";
import axios from 'axios';
import UserService from '@/services/UserService';
import GuildService from '@/services/GuildService';
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
                // const user = await UserService.getUser(userData.id);
                // const guildsInDb = await GuildService.getGuilds();
                // const guildsInDbUserIsIn = guildsInDb.filter((guild: any) => guildsData.some((guildData: any) => guildData.id === guild.guildId));
                const adminOrManageServerGuilds = guildsData.filter((guild: { id: string, permissions: string | number | bigint; })=>{
                    const permissions = BigInt(guild.permissions);
                    const hasAdmin = (permissions & BigInt(0x00000008)) === BigInt(0x00000008);
                    const hasManageServer = (permissions & BigInt(0x00000020)) === BigInt(0x00000020);
                    return hasAdmin || hasManageServer;
                })
                
                fs.writeFileSync('discord/guilds.json', JSON.stringify(adminOrManageServerGuilds, null, 2))
                fs.writeFileSync('discord/user.json', JSON.stringify(userData, null, 2))

                const botGuildData = await Promise.all(
                    adminOrManageServerGuilds.map(async (guild: {id: string, name: string}) => {
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
                fs.writeFileSync("discord/bot_guild_data.json", JSON.stringify(filteredBotGuildData, null, 2));
                
                // if (user === null) {
                //     await UserService.addUser({
                //         userId: userData.id,
                //         username: userData.username,
                //         globalName: userData.username,
                //         userAvatar: userData.avatar,
                //         guildIds: guildsInDbUserIsIn.map((guild: any) => guild.guildId),
                //     });
                // }


                res.writeHead(302, { Location: '/' });
                res.status(400).json(tokenData);
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
