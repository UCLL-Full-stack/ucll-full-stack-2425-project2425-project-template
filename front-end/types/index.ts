export enum DiscordPermission {
    VIEW_CHANNELS = "View Channels",
    MANAGE_CHANNELS = "Manage Channels",
    MANAGE_ROLES = "Manage Roles",
    CREATE_EXPRESSIONS = "Create Expressions",
    MANAGE_EXPRESSIONS = "Manage Expressions",
    VIEW_AUDIT_LOG = "View Audit Log",
    VIEW_SERVER_INSIGHTS = "View Server Insights",
    MANAGE_WEBHOOKS = "Manage Webhooks",
    MANAGE_SERVER = "Manage Server",
    CREATE_INVITE = "Create Invite",
    CHANGE_NICKNAME = "Change Nickname",
    MANAGE_NICKNAMES = "Manage Nicknames",
    KICK_MEMBERS = "Kick Members",
    BAN_MEMBERS = "Ban Members",
    TIMEOUT_MEMBERS = "Timeout Members",
    SEND_MESSAGES = "Send Messages",
    SEND_MESSAGES_IN_THREADS = "Send Messages in Threads",
    CREATE_PUBLIC_THREADS = "Create Public Threads",
    CREATE_PRIVATE_THREADS = "Create Private Threads",
    EMBED_LINKS = "Embed Links",
    ATTACH_FILES = "Attach Files",
    ADD_REACTIONS = "Add Reactions",
    USE_EXTERNAL_EMOJI = "Use External Emoji",
    USE_EXTERNAL_STICKERS = "Use External Stickers",
    MENTION_EVERYONE = "Mention @everyone, @here, and All Roles",
    MANAGE_MESSAGES = "Manage Messages",
    MANAGE_THREADS = "Manage Threads",
    SEND_TEXT_TO_SPEECH_MESSAGES = "Send Text-to-Speech Messages",
    SEND_VOICE_MESSAGES = "Send Voice Messages",
    CREATE_POLLS = "Create Polls",
    CONNECT = "Connect",
    SPEAK = "Speak",
    VIDEO = "Video",
    USE_SOUNDBOARD = "Use Soundboard",
    USE_EXTERNAL_SOUNDS = "Use External Sounds",
    USE_VOICE_ACTIVITY = "Use Voice Activity",
    PRIORITY_SPEAKER = "Priority Speaker",
    MUTE_MEMBERS = "Mute Members",
    DEAFEN_MEMBERS = "Deafen Members",
    MOVE_MEMBERS = "Move Members",
    SET_VOICE_CHANNEL_STATUS = "Set Voice Channel Status",
    USE_APPLICATION_COMMANDS = "Use Application Commands",
    USE_ACTIVITIES = "Use Activities",
    USE_EXTERNAL_APPS = "Use External Apps",
    REQUEST_TO_SPEAK = "Request to Speak",
    CREATE_EVENTS = "Create Events",
    MANAGE_EVENTS = "Manage Events",
    ADMINISTRATOR = "Administrator",
}
  
export enum KanbanPermission {
    VIEW_BOARD = "View Board",
    CREATE_BOARD = "Create Board",
    EDIT_BOARD = "Edit Board",
    DELETE_BOARD = "Delete Board",
    MANAGE_BOARD_PERMISSIONS = "Manage Board Permissions",
    CREATE_COLUMNS = "Create Columns",
    DELETE_COLUMNS = "Delete Columns",
    EDIT_COLUMNS = "Edit Columns",
    CREATE_TASKS = "Create Tasks",
    EDIT_TASKS = "Edit Tasks",
    DELETE_TASKS = "Delete Tasks",
    ASSIGN_TASKS = "Assign Tasks",
    CHANGE_TASK_STATUS = "Change Task Status",
    MANAGE_TASK_ASSIGNEES = "Manage Task Assignees",
    VIEW_ACTIVITY_LOG = "View Activity Log",
    ADMINISTRATOR = "Administrator",
}

export interface PermissionEntry{
    identifier: string | DiscordPermission;
    kanbanPermission: KanbanPermission[];
}

export interface Guild{
    guildId: string;
    guildName: string;
    settings: PermissionEntry[];
    roles: Role[];
    members: Member[];
}

export interface Role{
    roleId: string;
    roleName: string;
    permissions: DiscordPermission[];
}

export interface Member{
    userId: string;
    roleIds: string[];
}

export interface User{
    userId: string;
    username: string;
    globalName: string;
    userAvatar: string;
    guildIds?: string[];
}

export interface Column{
    columnId: string;
    columnName: string;
    tasks: Task[];
}

export interface Task{
    taskId: string;
    taskName: string;
    taskDescription: string;
    dueDate: Date;
    assignees: string[];
}

export interface Board{
    boardId: string;
    boardName: string;
    createdByUser: string;
    guild: string;
    columns: Column[];
    permissions: PermissionEntry[];
}