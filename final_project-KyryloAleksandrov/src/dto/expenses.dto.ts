export interface ExpenseRecord {
    ID: string;
    Date: string;
    Expense: number;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

export type ExpensesResponse = Record<string, ExpenseRecord[]>;

export interface CreateExpenseDto {
    Date: string;
    Expense: string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}
