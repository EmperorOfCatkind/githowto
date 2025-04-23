import * as dotenv from 'dotenv';

dotenv.config();

export class Config {
    public static baseURL = 'https://new.fophelp.pro/';

    public static login: string = process.env.LOGIN || '';
    public static password: string = process.env.PASSWORD || '';

    public static incomeTestValue = '15355';
    public static incomeCommentTestValue = 'UI test income entry';

    public static expenseTestValue = '6454';
    public static expenseCommentTestValue = 'UI test expense entry';
}
