const timeEl = document.querySelector('.time');
const scoreEl = document.querySelector('.score');
const textEl = document.querySelector('.text');
const input = document.getElementById('input');
const contentTwo = document.querySelector('.content-two');
const playBtn = document.querySelector('.play-btn');


let randomWord;
let score = 0;
let time = 10;

const timeInterval = setInterval(updateTime, 1000)


function getRandomWord(){
  fetch('https://random-words-api.vercel.app/word')
       .then(res => res.json())
       .then(data =>{
           const arr = data[0].word;
           randomWord = arr.toString()
           textEl.innerHTML = randomWord;
       })
}
function updateTime(){
    time--;
    timeEl.innerHTML = `Time : ${time}`
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver(){
     contentTwo.classList.add('show');
     contentTwo.innerHTML = `
     <h2>Time Run Out</h2>
      <span>Your Final Score is ${score}</span> <br>
     <button id="play-btn" onclick="playAgain()">Play Again</button>
     `
}
function playAgain(){
    window.location.reload()
}
function putCursor(){
    input.focus()
}
input.addEventListener('input', function(e){
    const inputVal = e.target.value;
    if(inputVal === randomWord){
        getRandomWord()
        input.value = ''
        score++;
        time += 4;
        updateTime()
        scoreEl.innerText = `Score : ${score}`;
       timeEl.innerText = `Time : ${time}`;
    }
})
function callDOM(){
    getRandomWord()
    putCursor()
}
callDOM()