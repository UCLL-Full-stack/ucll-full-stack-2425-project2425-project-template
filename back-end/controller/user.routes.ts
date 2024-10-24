import express, { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service.ts';

const userRouter = express.Router();