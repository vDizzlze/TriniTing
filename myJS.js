// const logo = document.querySelectorAll('#logo2 path');

// for(let i = 0; i<logo.length; i++) {
// 	console.log(logo[i].getTotalLength());
// }

(function main() {

	const startPanel = document.getElementById('startPanel');
	const gamePanel = document.getElementById('gamePanel');
	const aboutPanel = document.getElementById('aboutPanel');
	const leaderPanel = document.getElementById('leaderPanel');
	const transitionPanel = document.getElementById('transitionPanel');
	let transition = function() {
		if(transitionPanel.style.left == "-50%") {
			return "150%";
		}
		return "-50%";
	};

	

	const gameBtn = document.getElementById('gameBtn');
	const leaderBtn = document.getElementById('leaderBtn');
	const aboutBtn = document.getElementById('aboutBtn');
	const startBtn = document.getElementById('startBtn');
	const navBtns = document.querySelectorAll('.navBtn');
	const startForm = document.getElementById('startForm');

	let currentNavBtn = gameBtn;
	let gameOn = false;
	let name;
	let category;
	let difficulty;

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
			buttons.forEach(resetBtns)
			document.querySelector('#gameBtn').style.backgroundColor = "black";
			document.querySelector('#gameBtn').style.color = "white";
			gamePanel.style.display = "initial";
			gameBtn.disabled = true;
			currentNavBtn = gameBtn;
			transitionPanel.style.left = transition();
		}
		else {
			let panels = document.querySelectorAll('#gamePanel, #leaderPanel, #aboutPanel');
			let buttons = document.querySelectorAll('#leaderBtn, #aboutBtn');
			panels.forEach(hidePanels);
			buttons.forEach(resetBtns)
			document.querySelector('#gameBtn').style.backgroundColor = "black";
			document.querySelector('#gameBtn').style.color = "white";
			startPanel.style.display = "initial";
			gameBtn.disabled = true;
			currentNavBtn = gameBtn;
			transitionPanel.style.left = transition();
		}
	}

	leaderBtn.onclick = function() {
		let panels = document.querySelectorAll('#startPanel, #gamePanel, #aboutPanel');
		let buttons = document.querySelectorAll('#gameBtn, #aboutBtn');
		panels.forEach(hidePanels);
		buttons.forEach(resetBtns)
		document.querySelector('#leaderBtn').style.backgroundColor = "black";
		document.querySelector('#leaderBtn').style.color = "white";

		leaderPanel.style.display = "initial";
		leaderBtn.disabled = true;
		currentNavBtn = leaderBtn;
		transitionPanel.style.left = transition();
	}

	aboutBtn.onclick = function() {
		let panels = document.querySelectorAll('#startPanel, #gamePanel, #leaderPanel');
		let buttons = document.querySelectorAll('#gameBtn, #leaderBtn');
		panels.forEach(hidePanels);
		buttons.forEach(resetBtns)
		document.querySelector('#aboutBtn').style.backgroundColor = "black";
		document.querySelector('#aboutBtn').style.color = "white";

		aboutPanel.style.display = "initial";
		aboutBtn.disabled = true;
		currentNavBtn = aboutBtn;
		transitionPanel.style.left = transition();
	}

	startBtn.onclick = function() {
		name = document.getElementById('name').value;
		category = document.getElementById('category').value;
		difficulty = document.getElementById('difficulty').value;
		startPanel.style.display = "none";
		gamePanel.style.display = "initial";
	}
	

	function restartCSSAnimation(selector) {
	let node = document.querySelector(selector);
	let mainNode = document.querySelector('main');
	let cloneNode = node.cloneNode(true);
	mainNode.replaceChild(cloneNode, node);
	}

	function game() {

	}

})();




