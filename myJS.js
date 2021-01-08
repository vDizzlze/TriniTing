var gameBtn =  document.getElementById("gameBtn"); //nav button to game page
var aboutBtn =  document.getElementById("aboutBtn"); //nav button to about page
var startBtn = document.getElementById("startBtn"); //start/stop game
var started = false; //whether game is running or not
var interval; //used for game timer
var currentPage = gameBtn; //keeps track of current nav button
var difficulty = "easy"; //keeps track of difficulty
var time = 181000; //game time
var endTime = undefined; //time game ends
var timeSpan = document.getElementById("timer"); //span element used to display timer
var diffiicultyDrop = document.getElementById("difficulty"); //select element to select difficulty
var card1 = undefined; //1st clicked card
var card2 = undefined; //2nd clicked card
var card3 = undefined; //3rd clicked card
var card4 = undefined; //4th clicked card
var score = 0; //keps track of the score
var scoreSpan = document.getElementById("score", 1); //span element to display score
var backgroundSound = new repeatSound("audio/background.mp3", 0.2); //sound to play in background of game
var correctSound = new sound("audio/correct.mp3", 1); //sound to play when cards are mathed
var wrongSound = new sound("audio/wrong.mp3", 1); //sound to play when wrong cards are mathed
var winSound = new sound("audio/win.mp3", 1); //sound to play when win
var timeOutSound = new sound("audio/timeOut.mp3", 0.2); //sound to play when time is up
var timeLeft; //time left in game

//An object that represents a card
function card(name, position) {
	this.name = name;
	this.url = "images/" + name + ".jpg";
	this.position = position;
	this.compare = function(card) {
		if((this.name == card.name) && (this.position != card.position)) {
			return true;
		}
		return false;
	}
}

//An array of card names
const fileNames = ["AmyCooper", "Brian", "ChuckNorris", "DeadBonesBrook", "EdwardElric", "GroupProject", "JustinBieber", "MonkeyDLuffy", "Nami", "PortgasDAce", "Sanji", "SpiderMonkey", "TheGeorge", "ThotRepellent", "TrumpCard", "Usopp", "Whitebeard", "ZoroThePirateHunter"];
//An array of 24 cards
const cards = [24];
//An array of card positions
const pos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
//Default difficulty set
easy();

//set default style to nav button
currentPage.style.backgroundColor = "green";
currentPage.style.color = "black";

//set onchange function to dropdown menu
diffiicultyDrop.onchange = function() {
	difficulty = diffiicultyDrop.value;
	applyDifficulty();
}

//sets difficulty on difficulty change using drop down menu
function applyDifficulty() {
	switch(difficulty) {
		case "easy":
			easy();
			break;

		case "medium":
			medium();
			break;

		case "difficult":
			difficult();
			break;
		default:
			easy();
	}
}

//Easy difficulty
function easy() {
	let x = pos.slice();
	let y = fileNames.slice();
	let tempCard;
	time = 181000;
	timeSpan.innerHTML = "Time: 3:00";
	for(let i = 0; i < 12; i++) {
		tempCard = new card(y.splice(Math.floor(Math.random() * y.length), 1));
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
	}
	for(let i = 0; i < 24; i++){
		document.getElementById(i).onclick = function() {
			if(started) {
				document.getElementById(i).src = cards[i].url;
				if(card1 == undefined) {
					card1 = new card(cards[i].name, i);
				}
				else if(card2 == undefined) {
					card2 = new card(cards[i].name, i);
					if(card1.compare(card2)){
						correctSound.play();
						score += 5;
						scoreSpan.innerHTML = "Score: " + score;
						document.getElementById(card1.position).onclick = function() {};
						document.getElementById(card2.position).onclick = function() {};
						card1 = undefined;
						card2 = undefined;
						if(score == 60) {
							winSound.play();
							clearInterval(interval);
							score += Math.ceil(timeLeft/1000);
							alert("Winner! You Score: " + score);
							stopGame();
						}
					}
					else {
						let pos1 = card1.position;
						let pos2 = card2.position;
						card1 = undefined;
						card2 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
						}, 500);
					}
				}
			}
		}
	}
}

//Medium difficulty
function medium() {
	let x = pos.slice();
	let y = fileNames.slice();
	let tempCard;
	time = 121000;
	timeSpan.innerHTML = "Time: 2:00";
	for(let i = 0; i < 8; i++) {
		tempCard = new card(y.splice(Math.floor(Math.random() * y.length), 1));
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
	}
	for(let i = 0; i < 24; i++){
		document.getElementById(i).onclick = function() {
			if(started) {
				document.getElementById(i).src = cards[i].url;
				if(card1 == undefined) {
					card1 = new card(cards[i].name, i);
				}
				else if(card2 == undefined) {
					card2 = new card(cards[i].name, i);
					if((!card1.compare(card2))){
						let pos1 = card1.position;
						let pos2 = card2.position;
						card1 = undefined;
						card2 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
						}, 500);
					}
				}
				else if(card3 == undefined) {
					card3 = new card(cards[i].name, i);
					if(card1.compare(card3)){
						correctSound.play();
						score += 15;
						scoreSpan.innerHTML = "Score: " + score;
						document.getElementById(card1.position).onclick = function() {};
						document.getElementById(card2.position).onclick = function() {};
						document.getElementById(card3.position).onclick = function() {};
						card1 = undefined;
						card2 = undefined;
						card3 = undefined;
						if(score == 120) {
							winSound.play();
							clearInterval(interval);
							score += (5*Math.ceil(timeLeft/1000));
							alert("Winner! You Score: " + score);
							stopGame();
						}
					}
					else {
						let pos1 = card1.position;
						let pos2 = card2.position;
						let pos3 = card3.position;
						card1 = undefined;
						card2 = undefined;
						card3 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
							document.getElementById(pos3).src = "images/CardBack.jpg";
						}, 500);
					}
				}
			}
		}
	}
}

//Difficult difficulty
function difficult() {
	let x = pos.slice();
	let y = fileNames.slice();
	let tempCard;
	time = 61000;
	timeSpan.innerHTML = "Time: 1:00";
	for(let i = 0; i < 6; i++) {
		tempCard = new card(y.splice(Math.floor(Math.random() * y.length), 1));
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
		cards[x.splice(Math.floor(Math.random() * x.length), 1)] = tempCard;
	}
	for(let i = 0; i < 24; i++){
		document.getElementById(i).onclick = function() {
			if(started) {
				document.getElementById(i).src = cards[i].url;
				if(card1 == undefined) {
					card1 = new card(cards[i].name, i);
				}
				else if(card2 == undefined) {
					card2 = new card(cards[i].name, i);
					if((!card1.compare(card2))){
						let pos1 = card1.position;
						let pos2 = card2.position;
						card1 = undefined;
						card2 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
						}, 500);
					}
				}
				else if(card3 == undefined) {
					card3 = new card(cards[i].name, i);
					if((!card1.compare(card3))){
						let pos1 = card1.position;
						let pos2 = card2.position;
						let pos3 = card3.position;
						card1 = undefined;
						card2 = undefined;
						card3 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
							document.getElementById(pos3).src = "images/CardBack.jpg";
						}, 500);
					}
				}
				else if(card4 == undefined) {
					card4 = new card(cards[i].name, i);
					if((card1.compare(card4))){
						correctSound.play();
						score += 40;
						scoreSpan.innerHTML = "Score: " + score;
						document.getElementById(card1.position).onclick = function() {};
						document.getElementById(card2.position).onclick = function() {};
						document.getElementById(card3.position).onclick = function() {};
						document.getElementById(card4.position).onclick = function() {};
						card1 = undefined;
						card2 = undefined;
						card3 = undefined;
						card4 = undefined;
						if(score == 240) {
							winSound.play();
							clearInterval(interval);
							score += (10*Math.ceil(timeLeft/1000));
							alert("Winner! You Score: " + score);
							stopGame();
						}
					}
					else {
						let pos1 = card1.position;
						let pos2 = card2.position;
						let pos3 = card3.position;
						let pos4 = card4.position;
						card1 = undefined;
						card2 = undefined;
						card3 = undefined;
						card4 = undefined;
						wrongSound.play();
						setTimeout(function() {
							document.getElementById(pos1).src = "images/CardBack.jpg";
							document.getElementById(pos2).src = "images/CardBack.jpg";
							document.getElementById(pos3).src = "images/CardBack.jpg";
							document.getElementById(pos4).src = "images/CardBack.jpg";
						}, 500);
					}
				}
			}
		}
	}
}

//Object to add sound to game ("Game Sound", 2020)
//Modified from: https://www.w3schools.com/graphics/game_sound.asp
function sound(src, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.volume = volume;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
}

//Modified sound object to loop a sound
function repeatSound(src, volume) {
    this.repeatSound = document.createElement("audio");
    this.repeatSound.src = src;
    this.repeatSound.volume = volume;
    this.repeatSound.setAttribute("preload", "auto");
    this.repeatSound.setAttribute("controls", "none");
    this.repeatSound.setAttribute("loop", "loop");
    this.repeatSound.style.display = "none";
    document.body.appendChild(this.repeatSound);
    this.play = function(){
    	this.repeatSound.load();
        this.repeatSound.play();
    }
    this.stop = function(){
        this.repeatSound.pause();
    }    
}

//game timer function
function timer() {
	let now = new Date().getTime();
	timeLeft = endTime - now;
	var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
	timeSpan.innerHTML = "Time: " + minutes + " Min " + seconds + " Sec";
	if(timeLeft <= 0) {
		clearInterval(interval);
		timeSpan.innerHTML = "Time: 0:00"
		timeOutSound.play();
		alert("Time's  Up! You score: " + score);
		stopGame();
	}
}

// start game
function startGame() {
	started = !started;
	startBtn.innerHTML = "Stop Game";
	startBtn.style.backgroundColor = "green";
	startBtn.style.color = "black";
	endTime = new Date().getTime() + time;
	interval = setInterval(timer, 1000);
	backgroundSound.play();
	diffiicultyDrop.setAttribute("disabled", "disabled")
}

//stop game
function stopGame() {
	started = !started;
	clearInterval(interval);
	startBtn.innerHTML = "Start Game";
	startBtn.style.backgroundColor = "black";
	startBtn.style.color = "white";
	for(let i = 0; i < 24; i++){
		document.getElementById(i).src = "images/CardBack.jpg";
	}
	applyDifficulty();
	backgroundSound.stop();
	score = 0;
	scoreSpan.innerHTML = "Score: " + score;
	card1 = undefined;
	card2 = undefined;
	card3 = undefined;
	card4 = undefined;
	diffiicultyDrop.removeAttribute("disabled", "disabled")
}

//onclick and mouseover functions for buttons

//start/stop game
startBtn.onclick = function() {
	if(!started) {
		startGame();
	}

	else {
		stopGame();
	}
}

//onclick hide about panel and show game panel
gameBtn.onclick = function() {
	document.getElementById("gamePanel").style.display = "initial";
	document.getElementById("aboutPanel").style.display = "none";
	document.getElementById("gameBtn").style.color = "black";
	document.getElementById("gameBtn").style.backgroundColor = "green";
	document.getElementById("aboutBtn").style.backgroundColor = "black";
	document.getElementById("aboutBtn").style.color = "white";
	currentPage = gameBtn;
}

//onclick hide game panel and show about panel
aboutBtn.onclick = function() {
	document.getElementById("gamePanel").style.display = "none";
	document.getElementById("aboutPanel").style.display = "initial";
	document.getElementById("aboutBtn").style.color = "black";
	document.getElementById("aboutBtn").style.backgroundColor = "green";
	document.getElementById("gameBtn").style.backgroundColor = "black";
	document.getElementById("gameBtn").style.color = "white";
	currentPage = aboutBtn;
}

//Change button style on mouseover
aboutBtn.onmouseover = function() {
	aboutBtn.style.backgroundColor = "white";
	aboutBtn.style.color = "black";
}

//Change back button style on mouseout
aboutBtn.onmouseout = function() {
	aboutBtn.style.backgroundColor = "black";
	aboutBtn.style.color = "white";
	currentPage.style.backgroundColor = "green";
	currentPage.style.color = "black";
}

//Change button style on mouseover
gameBtn.onmouseover = function() {
	gameBtn.style.backgroundColor = "white";
	gameBtn.style.color = "black";
}

//Change back button style on mouseout
gameBtn.onmouseout = function() {
	gameBtn.style.backgroundColor = "black";
	gameBtn.style.color = "white";
	currentPage.style.backgroundColor = "green";
	currentPage.style.color = "black";
}

//Change button style on mouseover
startBtn.onmouseover = function() {
	startBtn.style.backgroundColor = "white";
	startBtn.style.color = "black";
}

//Change back button style on mouseout
startBtn.onmouseout = function() {
	startBtn.style.backgroundColor = "black";
	startBtn.style.color = "white";
	if(started) {
		startBtn.style.backgroundColor = "green";
		startBtn.style.color = "black";
	}
	
}



/*
References
Game Sound. (2020). Retrieved 6 December 2020, from https://www.w3schools.com/graphics/game_sound.asp
*/

