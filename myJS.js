// const logo = document.querySelectorAll('#logo2 path');

// for(let i = 0; i<logo.length; i++) {
// 	console.log(logo[i].getTotalLength());
// }

// (function main() {

	const startPanel = document.getElementById('startPanel');
	const gamePanel = document.getElementById('gamePanel');
	const aboutPanel = document.getElementById('aboutPanel');
	const leaderPanel = document.getElementById('leaderPanel');
	const transitionPanel = document.getElementById('transitionPanel');

	let gameOn = false;

	let transition = function() {
		if(transitionPanel.style.left == "-50%") {
			return "150%";
		}
		return "-50%";
	};
	

	(function navigation() {
		const gameBtn = document.getElementById('gameBtn');
		const leaderBtn = document.getElementById('leaderBtn');
		const aboutBtn = document.getElementById('aboutBtn');
		const startBtn = document.getElementById('startBtn');
		const navBtns = document.querySelectorAll('.navBtn');
		

		let currentNavBtn = gameBtn;

		function hidePanels(item) {
			item.style.display = "none";
		}

		function resetBtns(item) {
			item.style.backgroundColor = "rgba(231, 76, 76, 100)";
			item.style.color = "black";
			item.disabled = false;
		}

		navBtns.forEach(function(item) {
			item.onmouseover = function() {
				if(this != currentNavBtn) {
					this.style.color = "white";
					this.style.backgroundColor = "rgba(61, 25, 25, 50)";
					this.style.cursor = "pointer";
				}
				
			}
			item.onmouseout = function() {
				if(this != currentNavBtn) {
					this.style.color = "black";
					this.style.backgroundColor = "rgba(231, 76, 76, 100)";
				}
				this.style.cursor = "initial";
			}
		});

		gameBtn.onclick = function() {
			if(gameOn) {

				let panels = document.querySelectorAll('#startPanel, #leaderPanel, #aboutPanel');
				let buttons = document.querySelectorAll('#leaderBtn, #aboutBtn');
				panels.forEach(hidePanels);
				buttons.forEach(resetBtns);
				document.querySelector('#gameBtn').style.backgroundColor = "black";
				document.querySelector('#gameBtn').style.color = "white";
				transitionPanel.style.left = transition();
				setTimeout(function() {gamePanel.style.display = "initial";}, 250);
				gameBtn.disabled = true;
				currentNavBtn = gameBtn;
				
			}
			else {
				let panels = document.querySelectorAll('#gamePanel, #leaderPanel, #aboutPanel');
				let buttons = document.querySelectorAll('#leaderBtn, #aboutBtn');
				buttons.forEach(resetBtns);
				document.querySelector('#gameBtn').style.backgroundColor = "black";
				document.querySelector('#gameBtn').style.color = "white";
				transitionPanel.style.left = transition();
				panels.forEach(hidePanels);
				setTimeout(function() {startPanel.style.display = "initial";}, 250);
				gameBtn.disabled = true;
				currentNavBtn = gameBtn;
				
			}
		}

		leaderBtn.onclick = function() {
			let panels = document.querySelectorAll('#startPanel, #gamePanel, #aboutPanel');
			let buttons = document.querySelectorAll('#gameBtn, #aboutBtn');
			buttons.forEach(resetBtns);
			document.querySelector('#leaderBtn').style.backgroundColor = "black";
			document.querySelector('#leaderBtn').style.color = "white";
			transitionPanel.style.left = transition();
			panels.forEach(hidePanels);
			setTimeout(function() {leaderPanel.style.display = "initial";}, 250);
			leaderBtn.disabled = true;
			currentNavBtn = leaderBtn;
		}

		aboutBtn.onclick = function() {
			let panels = document.querySelectorAll('#startPanel, #gamePanel, #leaderPanel');
			let buttons = document.querySelectorAll('#gameBtn, #leaderBtn');
			buttons.forEach(resetBtns);
			document.querySelector('#aboutBtn').style.backgroundColor = "black";
			document.querySelector('#aboutBtn').style.color = "white";
			transitionPanel.style.left = transition();
			panels.forEach(hidePanels);
			setTimeout(function() {aboutPanel.style.display = "initial";}, 250);
			aboutBtn.disabled = true;
			currentNavBtn = aboutBtn;
		}
	})();

	

	(function game() {
		const startForm = document.getElementById('startForm');
		const categorySelect = document.getElementById('category');
		const difficultySelect = document.getElementById('difficulty');

		
		let name;
		let category = "random";
		let difficulty = "easy";

		function Audio(src) {
		  this.audio = document.createElement("audio");
		  this.audio.src = src;
		  this.audio.setAttribute("preload", "auto");
		  this.audio.setAttribute("controls", "controls");
		  this.play = function(){
		    this.audio.play();
		  }
		  this.stop = function(){
		    this.audio.pause();
		  }
		}

		function SystemAudio(src, volume) {
		    this.sytemAudio = document.createElement("audio");
		    this.sytemAudio.src = src;
		    this.sytemAudio.volume = volume;
		    this.sytemAudio.setAttribute("preload", "auto");
		    this.sytemAudio.setAttribute("controls", "none");
		    this.sytemAudio.style.display = "none";
		    document.body.appendChild(this.sound);
		    this.play = function(){
		        this.sytemAudio.play();
		    }
		}

		function Question(q, a, hint, attachment) {
			this.q = q;
			this.a = a;
			this. hint = hint;
			this.attachment = attachment;
		}

		const easyQuestions = [[], [], [], [], []];
		const mediumQuestions = [[], [], [], [], []];
		const hardQuestions = [[], [], [], [], []];
		let currentQuestion;

		easyQuestions[0][0] = new Question("Q: ", "", "Hint: ");
		easyQuestions[0][1] = new Question("Q: ", "", "Hint: ");
		easyQuestions[0][2] = new Question("Q: ", "", "Hint: ");
		easyQuestions[0][3] = new Question("Q: ", "", "Hint: ");
		easyQuestions[0][4] = new Question("Q: ", "", "Hint: ");

		easyQuestions[1][0] = new Question("Q: ", "", "Hint: ");
		easyQuestions[1][1] = new Question("Q: ", "", "Hint: ");
		easyQuestions[1][2] = new Question("Q: ", "", "Hint: ");
		easyQuestions[1][3] = new Question("Q: ", "", "Hint: ");
		easyQuestions[1][4] = new Question("Q: ", "", "Hint: ");

		easyQuestions[2][0] = new Question("Q: ", "", "Hint: ");
		easyQuestions[2][1] = new Question("Q: ", "", "Hint: ");
		easyQuestions[2][2] = new Question("Q: ", "", "Hint: ");
		easyQuestions[2][3] = new Question("Q: ", "", "Hint: ");
		easyQuestions[2][4] = new Question("Q: ", "", "Hint: ");

		easyQuestions[3][0] = new Question("Q: ", "", "Hint: ");
		easyQuestions[3][1] = new Question("Q: ", "", "Hint: ");
		easyQuestions[3][2] = new Question("Q: ", "", "Hint: ");
		easyQuestions[3][3] = new Question("Q: ", "", "Hint: ");
		easyQuestions[3][4] = new Question("Q: ", "", "Hint: ");

		easyQuestions[4][0] = new Question("Q: ", "", "Hint: ", (new Audio("Audio/audio.mp3")));
		easyQuestions[4][1] = new Question("Q: ", "", "Hint: ", (new Audio("Audio/audio.mp3")));
		easyQuestions[4][2] = new Question("Q: ", "", "Hint: ", (new Audio("Audio/audio.mp3")));
		easyQuestions[4][3] = new Question("Q: ", "", "Hint: ", (new Audio("Audio/audio.mp3")));
		easyQuestions[4][4] = new Question("Q: ", "", "Hint: ", (new Audio("Audio/audio.mp3")));

		startForm.onsubmit = function() {
			name = startForm.elements[0].value;
			category = startForm.elements[1].value;
			difficulty = startForm.elements[2].value;
			startPanel.style.display = "none";
			gamePanel.style.display = "initial";
			gameOn = !gameOn;
			console.log(name + category + difficulty);
		}

		// categorySelect.onchange = function() {
		// 	category = categorySelect.value;
		// }

		// difficultySelect.onchange = function() {
		// 	difficulty = difficultySelect.value;
		// } 

		function startGame() {
			let score = 0;
			let timeLeft;
			let endTime;
			let question;
			let 
		}
	})();

	

// })();




