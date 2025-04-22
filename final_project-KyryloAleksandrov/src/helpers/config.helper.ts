import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
    public static readonly login: string = process.env.LOGIN || '';
    public static readonly password: string = process.env.PASSWORD || '';
}
