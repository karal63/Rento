export type ErrorContext = {
    field: string;
    constraints: string[];
}[];

export type AppError = {
    status: number;
    code: string;
    context?: ErrorContext;
    original?: unknown;
};
