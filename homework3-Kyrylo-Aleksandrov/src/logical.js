function logical()
{
    const a = 10;
    const b = 20;

    const a1 = 10;
    const a2 = '10';

    console.log(a > b);
    console.log(a == a1);
    console.log(a == a2);
    console.log(a === a2);

    const b1 = null;
    const b2 = 10;

    const b3 = b1 ?? b2;

    console.log(b3);

    const c1 = true;
    const c2 = false;

    console.log(c1, !c2);
    console.log(c1 || c2);
    console.log(c2 && c1);
}

logical();
