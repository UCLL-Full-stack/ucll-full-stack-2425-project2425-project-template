import { Request, Response, NextFunction } from 'express';
import { DiscordPermission, KanbanPermission, Member, PermissionEntry } from '../types';

export const validateBoard = (req: Request, res: Response, next: NextFunction) => {
    const { boardName, createdByUser, guild, columns, permissions } = req.body;
    if (!boardName || typeof boardName !== 'string' || boardName.length < 3 || boardName.length > 50) {
        return res.status(400).json({ error: 'Invalid board name. It must be a string between 3 and 50 characters.' });
    }
    if (!createdByUser) {
        return res.status(400).json({ error: 'Board must have a creator.' });
    }
    if (!guild) {
        return res.status(400).json({ error: 'Board must be associated with a guild.' });
    }
    if (!columns || !Array.isArray(columns)) {
        return res.status(400).json({ error: 'Invalid columns.' });
    }
    if (columns.length === 0) {
        return res.status(400).json({ error: 'Board must have at least one column.' });
    }
    if (!permissions || !Array.isArray(permissions)) {
        return res.status(400).json({ error: 'Invalid permissions.' });
    }
    if(permissions.length === 0) {
        return res.status(400).json({ error: 'Board must have at least one permission.' });
    }
    for (const permission of permissions) {
        if (!permission || typeof permission !== 'object') {
            return res.status(400).json({ error: 'Invalid permission entry. It must be an object.' });
        }
        if (!permission.identifier || 
            (typeof permission.identifier !== 'string' && !Object.values(DiscordPermission).includes(permission.identifier))) {
            return res.status(400).json({ error: 'Invalid permission identifier. It must be a valid DiscordPermission.' });
        }
        if (!permission.kanbanPermission || !Array.isArray(permission.kanbanPermission) || permission.kanbanPermission.length === 0) {
            return res.status(400).json({ error: 'Invalid kanban permissions. It must be a non-empty array of KanbanPermission.' });
        }
        for (const perm of permission.kanbanPermission) {
            if (!Object.values(KanbanPermission).includes(perm)) {
                return res.status(400).json({ error: `Invalid kanban permission: ${perm}.` });
            }
        }
    }
    for (const column of columns) {
        validateColumn({ body: column } as Request, res, next);
    }
    next();
};

export const validateColumn = (req: Request, res: Response, next: NextFunction) => {
    const { columnName, tasks } = req.body;
    if (!columnName || typeof columnName !== 'string') {
        return res.status(400).json({ error: 'Invalid column name. It must be a string.' });
    }
    if (tasks && !Array.isArray(tasks)) {
        return res.status(400).json({ error: 'Tasks must be an array.' });
    }
    if (tasks) {
        for (const task of tasks) {
            validateTask({ body: task } as Request, res, next);
        }
    }
    next();
};

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
    const { title, description, dueDate, assignees } = req.body;
    if (!title || typeof title !== 'string' || title.length === 0) {
        return res.status(400).json({ error: 'Task title is required and must be a string.' });
    }
    if (!description || typeof description !== 'string') {
        return res.status(400).json({ error: 'Task description is required and must be a string.' });
    }
    if (dueDate) {
        const checkDueDate = new Date(dueDate);
        if (isNaN(checkDueDate.getTime())) {
            return res.status(400).json({ error: 'Task due date must be a valid date string.' });
        }
    }
    if (assignees && !Array.isArray(assignees)) {
        return res.status(400).json({ error: 'Assignees must be an array.' });
    }
    for (const assignee of assignees){
        validateUser({ body: assignee } as Request, res, next);
    }
    next();
};

export const validateGuild = (req: Request, res: Response, next: NextFunction) => {
    const { guildName, settings, roles, members } = req.body;
    if (!guildName || typeof guildName !== 'string') {
        return res.status(400).json({ error: 'Invalid guild name. It must be a string.' });
    }
    if (!settings || !Array.isArray(settings)) {
        return res.status(400).json({ error: 'Settings must be an array.' });
    }
    for (const permission of settings) {
        if (!validatePermission(permission)) {
            return res.status(400).json({ error: 'Invalid permission entry in settings.' });
        }
    }
    if (!roles || !Array.isArray(roles)) {
        return res.status(400).json({ error: 'Roles must be an array.' });
    }

    if (members && !Array.isArray(members)) {
        return res.status(400).json({ error: 'Members must be an array.' });
    }

    if (members) {
        if (!validateMembers(members)) {
            return res.status(400).json({ error: 'Invalid member entries.' });
        }
    }
    
    next();
};


export const validateRole = (req: Request, res: Response, next: NextFunction) => {
    const { roleName, permissions } = req.body;

    if (!roleName || typeof roleName !== 'string') {
        return res.status(400).json({ error: 'Invalid role name. It must be a string.' });
    }

    if (!permissions || !Array.isArray(permissions)) {
        return res.status(400).json({ error: 'Permissions must be an array.' });
    }
    for (const perm of permissions) {
        if (!Object.values(DiscordPermission).includes(perm)) {
            return res.status(400).json({ error: `Invalid permission: ${perm}.` });
        }
    }

    next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, userTag, guilds } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username. It must be a string.' });
    }

    if (!userTag || typeof userTag !== 'string') {
        return res.status(400).json({ error: 'Invalid userTag. It must be a string.' });
    }

    if (guilds && !Array.isArray(guilds)) {
        return res.status(400).json({ error: 'Guilds must be an array.' });
    }
    for (const guild of guilds) {
        validateGuild({ body: guild } as Request, res, next);
    }

    next();
};

export const validatePermission = (permission: PermissionEntry) => {
    if (!permission || typeof permission !== 'object') {
        return false;
    }
    if (!permission.identifier || 
        (typeof permission.identifier !== 'string' && !Object.values(DiscordPermission).includes(permission.identifier))) {
        return false;
    }
    if (!permission.kanbanPermission || !Array.isArray(permission.kanbanPermission) || permission.kanbanPermission.length === 0) {
        return false;
    }
    for (const perm of permission.kanbanPermission) {
        if (!Object.values(KanbanPermission).includes(perm)) {
            return false;
        }
    }
    return true;
};

export const validatePermissions = (req: Request, res: Response, next: NextFunction) => {
    const permissions = req.body;
    if (!permissions || !Array.isArray(permissions)) {
        return res.status(400).json({ error: 'Invalid permissions.' });
    }
    for (const permission of permissions) {
        if (!validatePermission(permission)) {
            return res.status(400).json({ error: 'Invalid permission entry.' });
        }
    }
    next();
}

const validateMembers = ( members: Member[] ) => {
    if (!members || !Array.isArray(members)) {
        return false;
    }
    for (const member of members) {
        if (!member || typeof member !== 'object') {
            return false;
        }
        if (!member.userId || typeof member.userId !== 'string') {
            return false;
        }
        if (!member.roleIds || !Array.isArray(member.roleIds)) {
            return false;
        }
        for (const roleId of member.roleIds) {
            if (typeof roleId !== 'string') {
                return false;
            }
        }
    }
    return true;
}