export const DIALOG_TYPE = {
    Error: 'error',
    Warning: 'warning',
    Success: 'success',
    Info: 'info',
    Default: 'default',
} as const;

export type DialogType = (typeof DIALOG_TYPE)[keyof typeof DIALOG_TYPE];
