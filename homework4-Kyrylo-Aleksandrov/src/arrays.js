function arrays()
{
    const arrNumbers = [6, 4, 1, 7];
    const arrStrings = ["John", "Smith", "Kurt", "Dave"];
    const arrBools = [true, true, false, true, false];
    const arrAny = [10, "25", true, "City"];

    const arrFilteredStrings = arrAny.filter((el) => typeof el === 'string');
    console.log(arrFilteredStrings);

    console.log("----------");

    const findElement = arrNumbers.find((el) => el == 3);
    console.log(findElement);

    console.log("----------");

    const sortedNumberArray = arrNumbers.sort((a, b) => a - b);
    console.log(sortedNumberArray);
    const sortedNumberArray1 = arrNumbers.sort((a, b) => b - a);
    console.log(sortedNumberArray1);

    console.log("----------");

    const arrConcat = arrNumbers.concat(arrStrings);
    console.log(arrConcat);

    console.log("----------");

    const arrIncludes = arrNumbers.includes(6);
    console.log(arrIncludes);

    console.log("----------");

    const arrJoin = arrStrings.join("; ");
    console.log(arrJoin);

    console.log("----------");

    const allArrays = [arrNumbers, arrStrings, arrBools, arrAny];
    console.log(allArrays);

    console.log("----------");

    arrAny.forEach((el, i) => {
        if(typeof el ==='string'){
            console.log(i);
        }
    });

    console.log("----------");

    const arrOnlyNumbers = arrAny.map((el) => {
        if(typeof el === 'string')
        {
            return el;
        }
    });
    console.log(arrOnlyNumbers);
}

arrays();
