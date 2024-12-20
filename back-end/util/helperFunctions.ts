import { DiscordPermission } from "../types";

export function convertToDiscordPermissions(discordPermissions: string[]): DiscordPermission[] {
    return discordPermissions
        .map((perm) => DiscordPermission[perm as keyof typeof DiscordPermission])
        .filter((perm): perm is DiscordPermission => perm !== undefined);
}