function loops() {
    for( let i = 0; i <= 9; i++) {
        console.log(i);
    }

    console.log("----------");

    let i = 0;
    while(i <= 9) {
        console.log(i);
        i++;
    }

    console.log("----------");

    for(let i = 100; 0 <= i; i -= 10) {
        console.log(i);
    }

    console.log("----------");

    let j = 100;
    while (j >= 0) {
        console.log(j);
        j -= 10;
    }
}

loops();
