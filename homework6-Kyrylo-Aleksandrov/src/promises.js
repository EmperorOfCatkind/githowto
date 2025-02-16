fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => {
        return response.json();
    })
    .then(body => console.log("body: ", body))
    .catch(error => console.log("error: ", error))
    .finally(() => console.log('fetching'));
