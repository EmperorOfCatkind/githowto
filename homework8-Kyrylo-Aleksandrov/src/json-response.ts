export interface Joke {
    type: string;
    setup: string;
    punchline: string;
    id: number;
}

export interface ApiResponse {
    body: Joke;
}

export class CompleteJoke{
    public elements: Partial<ApiResponse>;

    public constructor(elements: ApiResponse){
        this.elements = elements;
    }

    public tellJoke(): void{
        console.log(this.elements.body?.setup + ' ' + this.elements.body?.punchline);
    }
}
