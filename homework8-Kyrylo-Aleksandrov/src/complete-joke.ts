import { ApiResponse } from './api-response';

export class CompleteJoke{
    public elements: Partial<ApiResponse>;

    public constructor(elements: ApiResponse){
        this.elements = elements;
    }

    public tellJoke(): void{
        console.log(this.elements.body?.setup + ' ' + this.elements.body?.punchline);
    }
}
