
// ----- Footer Joke: ----- //

const p = document.querySelector('.footerJoke');

async function getJoke() {
  const jokeData = fetch('https://icanhazdadjoke.com', {
  headers: {
    Accept: 'application/json'
  }
})
  const jokeObject = await (await jokeData).json();
  p.innerHTML = `<span>A quick Dadjoke:</span> ${jokeObject.joke}`;
}

getJoke();

