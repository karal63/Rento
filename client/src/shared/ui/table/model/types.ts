export type TableColumn<T> = {
    key: string;
    header: string;
    width?: string;
    render?: (row: T) => string | number;
    minWidth?: number;
};
