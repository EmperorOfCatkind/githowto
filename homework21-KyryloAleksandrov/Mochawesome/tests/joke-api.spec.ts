import { expect } from 'chai';
import { JokeApi } from 'src/api/joke-api';
import { Joke } from 'src/dtos/joke.dto';


describe('Official Joke API Tests', () => {
    it('should fetch a valid joke object', async () => {
        const joke: Joke = await JokeApi.getRandomJoke();
        expect(joke).to.be.an('object');
        expect(joke.type).to.be.a('string');
        expect(joke.setup).to.be.a('string');
        expect(joke.punchline).to.be.a('string');
        expect(joke.id).to.be.a('number');
    });

    it('should fetch a list of valid joke types', async () => {
        const validTypes = await JokeApi.getJokeTypes();
        expect(validTypes).to.be.an('array').that.is.not.empty;
        validTypes.forEach(type => {
            expect(type).to.be.a('string').and.not.to.be.empty;
        });
    });

    it('should fetch a joke with a valid type', async () => {
        const joke: Joke = await JokeApi.getRandomJoke();
        const validTypes = await JokeApi.getJokeTypes();
        expect(validTypes).to.include(joke.type);
    });

    it('should fetch the requested amount of jokes', async () => {
        const jokeAmount = 5;
        const jokes: Joke[] = await JokeApi.getMultipleJokes(jokeAmount);
        expect(jokes).to.be.an('array');
        expect(jokes.length).to.equal(jokeAmount);
    });

    it('should fetch unique jokes without duplicates', async () => {
        const jokeAmount = 5;
        const jokes: Joke[] = await JokeApi.getMultipleJokes(jokeAmount);
        const jokeIDs = jokes.map(joke => joke.id);
        const uniqueJokeIDs = new Set(jokeIDs);
        expect(jokeIDs.length).to.equal(uniqueJokeIDs.size);
    });
});

