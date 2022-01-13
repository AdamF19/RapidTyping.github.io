const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const wpm = document.getElementById('WPM')
const timerElement = document.getElementById('timer')
let buttonIsRendered = false
let timerStarted = false
let interval
timerNumber = 0



quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (!timerStarted) startTimer()

  if (correct && timerStarted) {
    clearInterval(interval)
  }

  if (correct && !buttonIsRendered) {
    renderButton()
    console.log(WPM(arrayQuote.length, timerNumber))
    wpm.innerText = WPM(arrayQuote.length, timerNumber)
  }
})

function renderButton() {
  btn = document.createElement("button")
  btn.innerHTML = "Next quote"
  buttonIsRendered = true
  document.body.appendChild(btn)
  btn.addEventListener("click", function () {
    renderNewQuote()
    wpm.innerText = null
    document.body.removeChild(btn)
    buttonIsRendered = false
    timerStarted = false
    timerNumber = 0
  });
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
}

let startTime
function startTimer() {
  timerStarted = true
  startTime = new Date()
  interval = setInterval(() => {
    timerNumber++
    console.log(timerNumber)
  }, 1000)
}

function WPM(characterTyped, timeElapsed) {
  return Math.round((((characterTyped / 5) / timeElapsed) * 60));
}
renderNewQuote()
