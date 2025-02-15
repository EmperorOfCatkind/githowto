const arraySum = (array = []) => {
    if (array.every(item => typeof item === 'number')) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        console.log(sum);
    } else if (array.every(item => typeof item === 'string')) {
        console.log(array.join(""));
    }
};

const arrNumbers = [1, 4, 6, 8];
const arrStrings = ['1', '4', '6', '8'];

arraySum(arrNumbers);
arraySum(arrStrings);

