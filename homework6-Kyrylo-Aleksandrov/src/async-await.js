async function GetDataFromResponse(){

    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const json = await response.json();
    console.log("body: ", json);

    return json;
}
GetDataFromResponse();
