import { NextApiRequest, NextApiResponse } from 'next';

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
                const userResponse = await fetch('https://discord.com/api/v10/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const userData = await userResponse.json();

                // Fetch guild data
                const guildResponse = await fetch('https://discord.com/api/v10/users/@me/guilds', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const guildsData = await guildResponse.json();
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
