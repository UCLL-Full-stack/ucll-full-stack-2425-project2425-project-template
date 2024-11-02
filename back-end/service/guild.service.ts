import guildDb from '../repository/guild.db';

const getAllGuilds = () => {
    return guildDb.getGuilds();
}

const getGuild = (guildId: string) => {
    return guildDb.getGuildById(guildId);
}

const addSettingsEntryToGuild = (guildId: string, settingsEntry: any) => {
    guildDb.addSettingsEntryToGuildById(guildId, settingsEntry);
}

const removeSettingsEntryFromGuild = (guildId: string, entryId: string) => {
    guildDb.removeSettingsEntryFromGuildById(guildId, entryId);
}

export default {
    getAllGuilds,
    getGuild,
    addSettingsEntryToGuild,
    removeSettingsEntryFromGuild,
};
