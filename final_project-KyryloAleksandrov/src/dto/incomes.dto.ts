export interface IncomeRecord {
    ID: string;
    Date: string;
    Income: number;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

export type IncomesResponse = Record<string, IncomeRecord[]>;

export interface CreateIncomeDto {
    Date: string;
    Income: string;
    Currency: string;
    Comment: string;
    Cash: boolean;
}

