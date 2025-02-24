interface Joke {
    type: string;
    setup: string;
    punchline: string;
    id: number;
}

interface ApiResponse {
    body: Joke;
}

async function getJson(): Promise<ApiResponse> {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const json = await response.json() as Joke;
    return { body: json };
}

class CompleteJoke{
    public elements: Partial<ApiResponse>;

    public constructor(elements: ApiResponse){
        this.elements = elements;
    }

    public tellJoke(): void{
        console.log(this.elements.body?.setup + ' ' + this.elements.body?.punchline);
    }
}

(async () => {
    const data = await getJson();
    console.log(data);
    const newJoke = new CompleteJoke(data);
    newJoke.tellJoke();
})();
