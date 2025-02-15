async function tryGetService(){
    try{
        console.log("Attempting to reach non-existing API");
        const response = await fetch('https://api.publicapis.org/entries');
        const json = await response.json();
        console.log("body: ", json);
    } catch{
        try{
            console.log("You've tried to reach non-existing API. Redirecting to existing one instead: ");
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const json = await response.json();
            console.log("body: ", json);
            return json;
        }catch{
            customError();
        }
    }
}

function customError(){
    throw new Error("None of these APIs exist");
}

await tryGetService();
