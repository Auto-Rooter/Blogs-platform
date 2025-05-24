export interface FormatStrategy {
    export(data: any): string;
    import(fileContent: string): Promise<any>;
}