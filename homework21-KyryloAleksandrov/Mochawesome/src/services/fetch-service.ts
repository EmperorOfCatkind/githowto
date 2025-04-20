import { config } from 'src/config/config';

export class FetchService {
    public static async get(endpoint: string): Promise<Response> {
        const response = await fetch(`${config.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error Status: ${response.status}`);
        }
        return response;
    }
}
