require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const PORT = 3000;
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BOT_TOKEN } = process.env;

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}! The bot is ready.`);
});

client.login(BOT_TOKEN);

app.get("/login", (req, res) => {
    const scope = "identify guilds";
    const oauth2Url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=${encodeURIComponent(scope)}`;
    res.redirect(oauth2Url);
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send("Missing code in request");
    }

    try {
        const params = new URLSearchParams();
        params.append("client_id", CLIENT_ID);
        params.append("client_secret", CLIENT_SECRET);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", REDIRECT_URI);

        const tokenResponse = await axios.post("https://discord.com/api/oauth2/token", params, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const guildsResponse = await axios.get("https://discord.com/api/users/@me/guilds", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = userResponse.data;
        const guilds = guildsResponse.data;

        const adminOrManageServerGuilds = guilds.filter((guild) => {
            const permissions = BigInt(guild.permissions);
            const hasAdmin = (permissions & BigInt(0x00000008)) === BigInt(0x00000008); // ADMINISTRATOR
            const hasManageServer = (permissions & BigInt(0x00000020)) === BigInt(0x00000020); // MANAGE_GUILD
            return hasAdmin || hasManageServer;
        });

        fs.writeFileSync(
            "discord_data.json",
            JSON.stringify({ user, guilds: adminOrManageServerGuilds }, null, 2)
        );
        console.log("Filtered user guild data written to discord_data.json");

        const botGuildData = await Promise.all(
            adminOrManageServerGuilds.map(async (guild) => {
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
                } catch (error) {
                    console.error(`Error fetching data for guild ${guild.id}:`, error.message);
                    return null;
                }
            })
        );
        const filteredBotGuildData = botGuildData.filter((guild) => guild !== null);
        fs.writeFileSync("bot_guild_data.json", JSON.stringify(filteredBotGuildData, null, 2));
        console.log("Bot guild data written to bot_guild_data.json");
        res.send("Data received and written to discord_data.json and bot_guild_data.json!");
    } catch (error) {
        console.error("Error fetching data:", error.stack);
        res.status(500).send("Error fetching data. Check the console for more details.");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
