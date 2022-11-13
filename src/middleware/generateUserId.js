import crypto from 'crypto';
import {v4 as uuidv4} from 'uuid';

export const newUserID = uuidv4();

export const randomString = (n) => crypto.randomBytes(n).toString("hex");

