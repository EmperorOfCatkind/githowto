import * as dotenv from 'dotenv';
import { CreateExpenseDto } from 'src/dto/expenses.dto';
import { CreateIncomeDto } from 'src/dto/incomes.dto';

dotenv.config();

export class Config {
    public static baseURL = 'https://new.fophelp.pro/';

    public static login: string = process.env.LOGIN || '';
    public static password: string = process.env.PASSWORD || '';

    public static incomeTestValue = '1234.56';
    public static incomeCommentTestValue = 'UI test income entry';

    public static expenseTestValue = '1555';
    public static expenseCommentTestValue = 'UI test expense entry';

    public static newIncomePayload: CreateIncomeDto = {
        Date: new Date().toISOString().split('.')[0],
        Income: '1234.56',
        Currency: 'UAH',
        Comment: 'API test income entry',
        Cash: false
    };

    public static newExpensePayload: CreateExpenseDto = {
        Date: new Date().toISOString().split('.')[0],
        Expense: '1555',
        Currency: 'UAH',
        Comment: 'API test expense entry',
        Cash: false
    };
}
