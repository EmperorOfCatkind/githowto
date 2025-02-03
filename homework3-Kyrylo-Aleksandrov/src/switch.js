function switching()
{
    const a = 15;
    const b = 20;

    switch(true)
    {
        case a < b: {
            console.log("a is less than b");
            break;
        }
        case a == b: {
            console.log("a is equal to b");
            break;
        }
        case a > b: {
            console.log("a is more than b");
            break;
        }
        default:{
            console.log("default");
            break;
        }
    }
}

switching();
