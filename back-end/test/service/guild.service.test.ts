import { Guild } from "../../model/guild";
import guildDb from "../../repository/guild.db";
import guildService from "../../service/guild.service";
import { DiscordPermission, KanbanPermission } from "../../types";


jest.mock('../../repository/guild.db');

describe('Guild Service', () => {
    let guild: Guild;

    beforeEach(() => {
        guild = new Guild('guild1', 'Test Guild', [
            { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR] },
        ], [], []);
        
        guildDb.getGuildById = jest.fn().mockReturnValue(guild);
        guildDb.getGuilds = jest.fn().mockReturnValue([guild]);
    });

    test('should get all guilds', () => {
        const guilds = guildService.getAllGuilds();
        expect(guilds).toEqual([guild]);
        expect(guildDb.getGuilds).toHaveBeenCalledTimes(1);
    });

    test('should get guild permissions', () => {
        const permissions = guildService.getGuildPermissions('guild1');
        expect(permissions).toEqual(guild.getSettings());
        expect(guildDb.getGuildById).toHaveBeenCalledWith('guild1');
    });

    test('should throw an error when getting permissions for a non-existing guild', () => {
        guildDb.getGuildById = jest.fn().mockReturnValue(null);

        expect(() => {
            guildService.getGuildPermissions('non-existing-guild');
        }).toThrow('Guild not found');
    });
});
