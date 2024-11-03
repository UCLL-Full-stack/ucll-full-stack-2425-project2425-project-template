export enum DiscordPermission {
    VIEW_CHANNELS = "View Channels",
    MANAGE_CHANNELS = "Manage Channels",
    MANAGE_ROLES = "Manage Roles",
    ADMINISTRATOR = "Administrator",
    KICK_MEMBERS = "Kick Members",
    BAN_MEMBERS = "Ban Members",
    TIMEOUT_MEMBERS = "Timeout Members"
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
    ADMINISTRATOR = "Administrator"
}

export interface ValidationErrors {
    boardName?: string;
    description?: string;
    general?: string;
}

export interface Board {
    boardId: string;
    boardName: string;
    description?: string;
    createdByUser: {
        userId: string;
        username: string;
        userTag: string;
    };
    guild: {
        guildId: string;
        guildName: string;
    };
    columns: Column[];
    permissions: PermissionEntry[];
}

export interface Column {
    columnId: string;
    columnName: string;
    tasks: Task[];
}

export interface Task {
    taskId: string;
    title: string;
    description: string;
    dueDate: Date;
    assignees: string[]; // User IDs
}

export interface PermissionEntry {
    identifier: string | DiscordPermission;
    kanbanPermission: KanbanPermission[];
}