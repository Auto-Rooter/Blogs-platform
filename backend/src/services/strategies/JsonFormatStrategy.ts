import { FormatStrategy } from "./FormatStrategy";

export class JsonFormatStrategy implements FormatStrategy {
    export(data: any): string {
        return JSON.stringify(data, null, 2);
    }

    async import(fileContent: string): Promise<any[]> {
        return JSON.parse(fileContent);
    }
}