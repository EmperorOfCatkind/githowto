function arithmetics(){
    const a = 1;
    let b = 2;

    let c = a + b;

    const text_a = "Hello ";
    let text_b = "World!";

    let text_c = text_a + text_b;

    let diff_a = text_a + a;

    const number_a = '10';
    let number_b = 10;

    let number_c = number_a + number_b;

    console.log("Number addition: " + a, b, c);
    console.log("String addition: " + text_a, text_b, text_c);
    console.log("String and Number addition: " + text_a, a, diff_a);
    console.log("Number in String and Number addition: " + number_a, number_b, number_c);

    let number_d = Number(number_a) + number_b;

    console.log("Number in String to Number and Number addition: " + number_a, number_b, number_d);
}

arithmetics();
