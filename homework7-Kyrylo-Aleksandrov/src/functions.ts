function arraySumNumbers(array : number[]): void{
    const sum = array.reduce((acc, current) => acc + current, 0);
    console.log(sum);
}

function arraySumStrings(array: string[]): void{
    console.log(array.join(''));
}

const arrNumbers = [1, 4, 6, 8];
const arrStrings = ['1', '4', '6', '8'];

arraySumNumbers(arrNumbers);
arraySumStrings(arrStrings);
