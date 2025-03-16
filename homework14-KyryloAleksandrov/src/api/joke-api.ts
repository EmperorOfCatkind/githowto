import { Joke } from 'src/dtos/joke.dto';
import { FetchService } from 'src/services/fetch-service';

export class JokeApi {
    public static async getRandomJoke(): Promise<Joke> {
        const response = await FetchService.get('/jokes/random');
        return response.json();
    }

    public static async getJokeTypes(): Promise<string[]> {
        const response = await FetchService.get('/types');
        return response.json();
    }

    public static async getMultipleJokes(count: number): Promise<Joke[]> {
        const response = await FetchService.get(`/jokes/random/${count}`);
        return response.json();
    }
}

