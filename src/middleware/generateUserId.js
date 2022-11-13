import crypto from 'crypto';
import {v4 as uuidv4} from 'uuid';

export const newUserID = uuidv4();

export const randonString = crypto.randomBytes(16).toString("hex");

