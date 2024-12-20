-- CreateEnum
CREATE TYPE "DiscordPermission" AS ENUM ('ADD_REACTIONS', 'ADMINISTRATOR', 'ATTACH_FILES', 'BAN_MEMBERS', 'CHANGE_NICKNAME', 'CONNECT', 'CREATE_EVENTS', 'CREATE_EXPRESSIONS', 'CREATE_INSTANT_INVITE', 'CREATE_PRIVATE_THREADS', 'CREATE_PUBLIC_THREADS', 'DEAFEN_MEMBERS', 'EMBED_LINKS', 'KICK_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_EMOJIS_AND_STICKERS', 'MANAGE_EVENTS', 'MANAGE_GUILD', 'MANAGE_EXPRESSIONS', 'MANAGE_MESSAGES', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_THREADS', 'MANAGE_WEBHOOKS', 'MENTION_EVERYONE', 'MODERATE_MEMBERS', 'MOVE_MEMBERS', 'MUTE_MEMBERS', 'PRIORITY_SPEAKER', 'READ_MESSAGE_HISTORY', 'REQUEST_TO_SPEAK', 'SEND_MESSAGES', 'SEND_MESSAGES_IN_THREADS', 'SEND_POLL', 'SEND_TEXT_TO_SPEECH_MESSAGES', 'SEND_VOICE_MESSAGES', 'SPEAK', 'STREAM', 'USE_APPLICATION_COMMANDS', 'USE_EMBEDDED_ACTIVITIES', 'USE_EXTERNAL_APPS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_SOUNDS', 'USE_EXTERNAL_STICKERS', 'USE_SOUNDBOARD', 'USE_VAD', 'VIEW_AUDIT_LOG', 'VIEW_CHANNEL', 'VIEW_GUILD_INSIGHTS', 'VIEW_CREATOR_MONETIZATION_ANALYTICS');

-- CreateEnum
CREATE TYPE "KanbanPermission" AS ENUM ('VIEW_BOARD', 'CREATE_BOARD', 'EDIT_BOARD', 'DELETE_BOARD', 'MANAGE_BOARD_PERMISSIONS', 'CREATE_COLUMNS', 'DELETE_COLUMNS', 'EDIT_COLUMNS', 'CREATE_TASKS', 'EDIT_TASKS', 'DELETE_TASKS', 'ASSIGN_TASKS', 'CHANGE_TASK_STATUS', 'MANAGE_TASK_ASSIGNEES', 'VIEW_ACTIVITY_LOG', 'ADMINISTRATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "globalName" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "guildName" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "permissions" "DiscordPermission"[],
    "guildId" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleIds" TEXT[],
    "guildId" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "boardName" TEXT NOT NULL,
    "createdByUser" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,
    "boardId" TEXT,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "taskName" TEXT NOT NULL,
    "taskDescription" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "assignees" TEXT[],
    "columnId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PermissionEntry" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "kanbanPermissions" "KanbanPermission"[],
    "guildId" TEXT,
    "boardId" TEXT,

    CONSTRAINT "PermissionEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGuilds" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guildId_key" ON "Guild"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleId_key" ON "Role"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Board_boardId_key" ON "Board"("boardId");

-- CreateIndex
CREATE UNIQUE INDEX "Column_columnId_key" ON "Column"("columnId");

-- CreateIndex
CREATE UNIQUE INDEX "Task_taskId_key" ON "Task"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGuilds_AB_unique" ON "_UserGuilds"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGuilds_B_index" ON "_UserGuilds"("B");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Board" ADD CONSTRAINT "Board_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionEntry" ADD CONSTRAINT "PermissionEntry_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionEntry" ADD CONSTRAINT "PermissionEntry_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGuilds" ADD CONSTRAINT "_UserGuilds_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
