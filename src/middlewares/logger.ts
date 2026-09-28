import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const logDirectory = path.join(process.cwd(), 'src', 'logs');
const logFile = path.join(logDirectory, 'app.log');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const logMessage =
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;

  console.log(logMessage);

  fs.appendFileSync(logFile, logMessage);

  next();
};