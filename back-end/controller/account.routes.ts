import express, { NextFunction, Request, Response } from 'express';
import accountService from '../service/account.service';


const accountRouter = express.Router();