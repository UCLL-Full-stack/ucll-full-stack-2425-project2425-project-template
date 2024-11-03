// front-end/types/index.ts

export enum DiscordPermission {
    VIEW_CHANNELS = "View Channels",
    MANAGE_CHANNELS = "Manage Channels",
    MANAGE_ROLES = "Manage Roles",
    ADMINISTRATOR = "Administrator",
    // Add other permissions as needed
}

export enum KanbanPermission {
    VIEW_BOARD = "View Board",
    CREATE_BOARD = "Create Board",
    EDIT_BOARD = "Edit Board",
    DELETE_BOARD = "Delete Board",
    ADMINISTRATOR = "Administrator",
    // Add other permissions as needed
}

export interface PermissionEntry {
    identifier: string | DiscordPermission;
    kanbanPermission: KanbanPermission[];
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
    tasks: any[];
}