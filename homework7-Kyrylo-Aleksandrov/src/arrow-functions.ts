const numberSum = (array: number[]): number => {
    const sum = array.reduce((acc, current) => acc + current, 0);
    //console.log(sum);
    return sum;
};

const stringSum = (array: string[]): string => {
    //console.log(array.join(''));
    const concat = array.join('');
    return concat;
};

const numbersArrow = [2, 4, 6, 8];
const stringsArrow = ['2', '4', '6', '8'];

console.log(numberSum(numbersArrow));
console.log(stringSum(stringsArrow));
