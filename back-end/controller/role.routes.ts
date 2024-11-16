import { Router } from "express";
import roleService from "../service/role.service";
import { CreateRoleInput } from "../types";


const roleRouter = Router();

roleRouter.get("/", (req, res) => {
    try {
        const roles = roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});

roleRouter.get("/:roleId", (req, res) => {
    const { roleId } = req.params;
    try {
        const role = roleService.getRoleById(roleId);
        res.status(200).json(role);
    } catch (error) {
        if (error instanceof Error) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(404).json({ error: "An unknown error occurred" });
        }
    }
});

roleRouter.post("/", (req, res) => {
    const { roleId, roleName, permissions = [], guildId } = req.body;
    const createRole: CreateRoleInput = { roleId, roleName, permissions, guildId };
    try {
        const role = roleService.addRole(createRole);
        res.status(201).json(role);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});

roleRouter.put("/:roleId", (req, res) => {
    const { roleId } = req.params;
    const { roleName, permissions } = req.body;
    try {
        const role = roleService.updateRole(roleId, { roleName, permissions });
        res.status(200).json(role);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred" });
        }
    }
});

export default roleRouter;