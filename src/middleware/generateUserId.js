import crypto from 'crypto';

export const newUserID = crypto.randomBytes(16).toString("hex");