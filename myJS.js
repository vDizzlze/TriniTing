// const logo = document.querySelectorAll('#logo2 path');

// for(let i = 0; i<logo.length; i++) {
// 	console.log(logo[i].getTotalLength());
// }

//Keeps data private.
(function main() {


	const startPanel = document.getElementById('startPanel'); //The section element that is displayed initially
	const gamePanel = document.getElementById('gamePanel'); //The section element that has everything related to the actual gameplay
	const aboutPanel = document.getElementById('aboutPanel'); //Section element with information about the game
	const leaderPanel = document.getElementById('leaderPanel'); //Section element where the leaderboard is displayed
	const transitionPanel = document.getElementById('transitionPanel'); //A blank section element that transitions across the screen when a nav button is clicked

	let gameOn = false; //Used to determine if the game is running so we would know which panel to show when the game nav button is clicked

	//This function runs when a nav button is clicked.
	//It changes the position of the transitionPanel and by using a css transition it slowly mmoves across the screen creating a wipe effect
	let transition = function() {
		if(transitionPanel.style.left == "-50%") {
			return "150%";
		}
		return "-50%";
	};
	
	//All code relating to navigation is found here, keeps data private
	(function navigation() {
		const gameBtn = document.getElementById('gameBtn'); //Nav button
		const leaderBtn = document.getElementById('leaderBtn'); //Nav button
		const aboutBtn = document.getElementById('aboutBtn'); //Nav button
		const startBtn = document.getElementById('startBtn'); //button to start game
		const navBtns = document.querySelectorAll('.navBtn'); //Nav buttons array
		

		let currentNavBtn = gameBtn; //keeps track of which nav button is currently clicked.

		//sets the display of html element to none to swicth between section elements.
		function hidePanels(item) {
			setTimeout(function() {
				item.style.display = "none";
			}, 250);
			
		}

		//Chnages the properties of a nav button to its default
		function resetBtns(item) {
			item.style.backgroundColor = "rgba(231, 76, 76, 100)";
			item.style.color = "black";
			item.disabled = false;
		}

		//Adds a mouseover and mouseout function to all nav buttons to change colour and pointer
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

		//Nav button onclick function
		gameBtn.onclick = function() {
			//If a game is ongoing and the game button is clicked show the actual game
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

			//If a game is not running show the landing page to start a new game
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

		//Adds a onclick function to the leaderboad nav button to hide all other section elements except the leaderboard page
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

		//Adds a onclick function to the about nav button to hide all other section elements except the about page
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

	
	//All code relating to gameplay is found here, keeps data private
	(function game() {
		const startForm = document.getElementById('startForm'); //The form where you enter your name to start a game
		const categorySelect = document.getElementById('category'); //Select category using a drop down
		const difficultySelect = document.getElementById('difficulty'); //Select difficulty using a drop down
		const scoreSpan = document.getElementById('scoreSpan'); //A span element where the player score is shown
		const categorySpan = document.getElementById('categorySpan'); //A span element where the category selected is displayed
		const timeSpan = document.getElementById('timeSpan'); //a span element where the remaing time is displayed
		const questionDiv = document.getElementById('questionDiv'); //A div element where the current question is displayed
		const hintBtn = document.getElementById('hintBtn'); //A button to display a hing when clicked.
		const attachmentDiv = document.getElementById('attachmentDiv'); //A div to display and attachment (audio / image) related to the question
		const answerForm = document.getElementById('answerForm'); //A form to enter question answers
		const answerInput = document.getElementById('answerInput'); //The input field to type answer
		const submitBtn = document.getElementById('submitBtn'); //The button to submit answer
		const nameSpan = document.getElementById('nameSpan'); //A span element to display the player's name
		const surrenderBtn = document.getElementById('surrenderBtn'); //A button to surrender the game
		const playAgainBtn = document.getElementById('playAgainBtn'); //A button to restart game with current settings
		const newGameBtn = document.getElementById('newGameBtn'); //A button to start a new game as a new player (goes to home page)
		const modal = document.getElementById('modal'); //A div used to display a custom alert (outer div)
		const modalHead = document.getElementById('modalHead'); //The heading of the alert to be displayed
		const modalMsg = document.getElementById('modalMsg'); //The message of the alert
		const modalBtns = document.getElementById('modalBtns'); //The div containing buttons for alert
		const modalDiv = document.getElementById('modalDiv'); //The inner div of the alert

		const gameStart = new SystemAudio("SystemAudio/gameStart.mp3", 1); //audio to play at start of game
		const answerTrue = new SystemAudio("SystemAudio/answerTrue.mp3", 1); //audio to play if an answer is true
		const answerFalse = new SystemAudio("SystemAudio/answerFalse.mp3", 1); //audio to play if an answer is false
		const gameWin = new SystemAudio("SystemAudio/gameWin.mp3", 1);  //audio to play if game is won
		const gameLose = new SystemAudio("SystemAudio/gameLose.mp3", 1);  //audio to play if game is lost
		const timeOut = new SystemAudio("SystemAudio/timeOut.mp3", 1);  //audio to play when there is 30 sec remaining

		let player;
		let category = "random"; //variable to store category (random is default)
		let difficulty = "0"; //variable to store difficulty (0/easy is default)
		let categoryLabel = "Random"; //The category label displayed on the game page
		let timeLeft; //keeps track of the time remaining
		let endTime; //keeps track of what time game ends
		let addTime = 0; //used to calculate how much time ti give user based on number of questions available
		let timerInterval; //stores an interval for the timer
		let inputInterval; //sets an interval for checking if the user has tped anything
		let questions; //stores all questions for current game
		let lives; //stores player lives
		let timeOutInterval; //plays a sound when 30 seconds are remaining
		let timeoutCheck = false; //keeps track if timeOutInterval is running or not

		//Multi-dimensional array to hold all quiz questions
		// quizQuestions[difficulty][category][question]
		const quizQuestions = [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []]];
		let currentQuestion = 0; //stores index of current question

		//An object to create audio elements for attachments ("Game Tutorial", 2021)
		function Audio(src) {
		  this.audio = document.createElement("audio");
		  this.audio.src = src;
		  this.audio.setAttribute("preload", "auto");
		  this.audio.setAttribute("controls", "controls");
		  this.audio.id = "audioPlayer";
		  this.play = function(){
		    this.audio.play();
		  }
		  this.stop = function(){
		    this.audio.pause();
		  }
		}

		//An object to create audio elements for game sounds ("Game Tutorial", 2021)
		function SystemAudio(src, volume) {
		    this.sytemAudio = document.createElement("audio");
		    this.sytemAudio.src = src;
		    this.sytemAudio.volume = volume;
		    this.sytemAudio.setAttribute("preload", "auto");
		    this.sytemAudio.setAttribute("controls", "none");
		    this.sytemAudio.style.display = "none";
		    document.body.appendChild(this.sytemAudio);
		    this.play = function(){
		        this.sytemAudio.play();
		    }
		}

		//An object to create img elements for attachments
		function Image(src) {
			this.image = document.createElement("img");
			this.image.src = src;
			this.image.style.height = "23vh";
			this.image.style.maxWidth = "40vw";
		}

		//An object to store all data related to a question
		function Question(q, a, hint, points, attachment) {
			this.q = q;
			this.a = a;
			this.hint = hint;
			this.points = points;
			this.attachment = attachment;
		}

		//A player object to store player related data
		//Made last minute cause I only just saw it when doing the write up
		function Player(name) {
			this.name = name;
			this.score = 0;
		}

		//Switches category label based of user selection
		function labelSwitcher() {
			switch(category) {
				case "random":
					categoryLabel = "Random";
					break;

				case "0":
					categoryLabel = "Food";
					break;

				case "1":
					categoryLabel = "Famous Persons";
					break;

				case "2":
					categoryLabel = "Geography";
					break;

				case "3":
					categoryLabel = "Celebrations";
					break;

				case "4":
					categoryLabel = "Music";
					break;
			}
		}

		//What to do when a user enters name and click start game
		startForm.onsubmit = function() {
			player = new Player(startForm.elements[0].value);
			startForm.elements[0].value = "";
			category = startForm.elements[1].value;
			difficulty = startForm.elements[2].value;
			labelSwitcher();
			nameSpan.innerHTML = player.name;
			categorySpan.innerHTML = categoryLabel;
			startPanel.style.display = "none";
			gamePanel.style.display = "initial";
			startGame();
		}
		
		
		//Runs when the game starts to define variables and questions.
		function startGame() {
			gameStart.play(); //play a sound effect
			timeoutCheck = false; //reset timeoutCheck to false for a new game

			//Enter all questions
			//Easy
			quizQuestions[0][0][0] = new Question("It is one of the most popular Trini street food. (Easy)", ["doubles"], "Hint: Debe is famous for this food.", 5, (new Image("Images/doubles.jpg").image));
			quizQuestions[0][0][1] = new Question("You can buy this at most beaches in T&T. (Easy)", ["bake and shark"], "Hint: Consists of fried flatbread and pieces of shark meat.", 5, (new Image("Images/bakenshark.jpg").image));
			quizQuestions[0][0][2] = new Question("What is the name of this dish? (Easy)", ["callaloo", "callalloo", "calalloo", "calaloo", "kallaloo"], "Hint: Made with bhaaji ('dasheen bush') and coconut milk.", 5, (new Image("Images/callaloo.jpg").image));
			quizQuestions[0][0][3] = new Question("What type of drinnk is this? (Easy)", ["sorrel"], "Hint: One of Trinidad's most popular Christmas drinks", 5, (new Image("Images/sorrel.jpg").image));
			quizQuestions[0][0][4] = new Question("This is T&T's version of eggnog. (Easy)", ["punche de creme", "ponche a creme", "punche de crème", "ponche a crème"], "Hint: Main ingredients are eggs, milk & nutmeg.", 5, (new Image("Images/ponche-de-creme.jpg").image));

			quizQuestions[0][1][0] = new Question("Who is she? (Easy)", ["wendy fitzwilliam"], "Hint: She won the Miss Universe pageant in 1998.", 5, (new Image("Images/missuniverse.jpg").image));
			quizQuestions[0][1][1] = new Question("Who is this famous singer? (Easy)", ["destra garcia", "destra"], "Hint: She is the self proclaimed 'Queen of Bacchanal'.", 5, (new Image("Images/destra.jpg").image));
			quizQuestions[0][1][2] = new Question("Who is this famous singer-songwriter? (Easy)", ["billy ocean"], "Hint: Trinidad-British R&B singer of the 1980's.", 5, (new Image("Images/billyocean.jpg").image));
			quizQuestions[0][1][3] = new Question("Who is he? (Easy)", ["machel montano", "machel"], "Hint: One of the most popular soca artist in the world.", 5, (new Image("Images/machel.jpg").image));
			quizQuestions[0][1][4] = new Question("He is known as the grand master of calypso. Who is he? (Easy)", ["lord kitchener", "aldwyn roberts", "kitch"], "Hint: He holds the record for most road march wins.", 5, (new Image("Images/kitch.jpg").image));

			quizQuestions[0][2][0] = new Question("This is also known as the 8th wonder of the world. (Easy)", ["the picth lake", "pitch lake", "la brea pitch lake"], "Hint: The largest natural deposit of asphalt in the world.", 5, (new Image("Images/pitch-lake.jpg").image));
			quizQuestions[0][2][1] = new Question("Leatherback turtles come here to lay eggs. (Easy)", ["grande riviere beach", "the grande riviere"], "Hint: The 2nd largest leatherback turtle nesting ground in the world.", 5, (new Image("Images/grande-riviere-beach.jpg").image));
			quizQuestions[0][2][2] = new Question("What is the name of the reef located in Tobago? (Easy)", ["bucco reef"], "Hint: The third most spectacular reef in the world.", 5, (new Image("Images/buccoreef.jpg").image));
			quizQuestions[0][2][3] = new Question("This is a metre deep body of water in the middle of the ocean. What is it's name? (Easy)", ["nylon pool"], "Hint: It is located in Tobago.", 5, (new Image("Images/nylon-pool.jpg").image));
			quizQuestions[0][2][4] = new Question("In what part of Trinidad is this located? (Easy)", ["chaguramas"], "Hint: This is Bamboo Cathedral.", 5, (new Image("Images/bamboo-cathedral.jpg").image));

			quizQuestions[0][3][0] = new Question("This celebration originated during slavery. (Easy)", ["carnival"], "Hint: Takes place in the month of February.", 5, (new Image("Images/carnival.jpg").image));
			quizQuestions[0][3][1] = new Question("This is a celebration of the Hindu new year. (Easy)", ["phagwa", "holi"], "Hint: Also known as the festival of colours.", 5, (new Image("Images/holi.jpg").image));
			quizQuestions[0][3][2] = new Question("In April this music festival takes place in Tobago. (Easy)", ["tobago jazz festival"], "Hint: Jazz", 5, (new Image("Images/jazz-festival.jpg").image));
			quizQuestions[0][3][3] = new Question("This festival celebrates Tobago's heritage. (Easy)", ["tobago heritage festival"], "Hint: Runs from mid-July to the beginning of August.", 5, (new Image("Images/heritage-festival.jpg").image));
			quizQuestions[0][3][4] = new Question("This celebration commemorates the liberation from salvery. (Easy)", ["emancipation"], "Hint: Takes place on August 1st.", 5, (new Image("Images/emancipation.jpg").image));

			quizQuestions[0][4][0] = new Question("In what year did this song win Road March? (Easy)", ["2019"], "Hint: Famalay - Machel Montano, Bunji Garlin, Skinny Fabulous.", 5, (new Audio("Audio/famalay.mp3").audio));
			quizQuestions[0][4][1] = new Question("Who is this singer? (Easy)", ["kris kennedy"], "Hint: He is a slam radio host and in this class.", 5, (new Audio("Audio/kriskennedy.mp3").audio));
			quizQuestions[0][4][2] = new Question("In what year did this song win road march? (Easy)", ["2020"], "Hint: Kees & Iwer - Stage Gone Bad", 5, (new Audio("Audio/stage-gone-bad.mp3").audio));
			quizQuestions[0][4][3] = new Question("Who is this soca artist? (Easy)", ["shurwayne winchester"], "Hint: He won road march in 2004 & 2005.", 5, (new Audio("Audio/shurwayne.mp3").audio));
			quizQuestions[0][4][4] = new Question("What is the name of this song? (Easy)", ["big truck"], "Hint: Machel Montano won his first road march with this song.", 5, (new Audio("Audio/big-truck.mp3").audio));

			//Medium
			quizQuestions[1][0][0] = new Question("Name the main ingredient in this dish. (Med)", ["corn flour", "corn starch", "maize starch"], "Hint: Ingredient made using corn.", 10, (new Image("Images/pastelle.jpg").image));
			quizQuestions[1][0][1] = new Question("Name this drink. (Med)", ["peardrax"], "Hint: A carbonated drnik made from pears.", 10, (new Image("Images/peardrax.jpg").image));
			quizQuestions[1][0][2] = new Question("What is the name of this indian delicacy? (Med)", ["pholourie", "phulourie", "phoulourie"], "Hint: A fried dough served with a sauce or chutney.", 10, (new Image("Images/pholourie.jpg").image));
			quizQuestions[1][0][3] = new Question("This dish usually consists of rice, meat, and vegetables. (Med)", ["pelau"], "Hint: A traditional 'beach lime' food.", 10, (new Image("Images/pelau.jpg").image));
			quizQuestions[1][0][4] = new Question("What is the name of this indian delicacy? (Med)", ["saheena"], "Hint: Popular at Divali time.", 10, (new Image("Images/saheena.png").image));

			quizQuestions[1][1][0] = new Question("Fay-Ann Lyons is the daughter of which famous calypsonian? (Med)", ["superblue", "austin lyons", "blueboy"], "Hint: He likes the colour blue.", 10, (new Image("Images/pelau.jpg").image));
			quizQuestions[1][1][1] = new Question("Bunji Garlin is married to which famous soca artist? (Med)", ["fay-ann lyons", "fay ann lyons", "fay-ann lyons-alvarez"], "Hint: The daughter of superblue", 10, (new Image("Images/bunji.jpg").image));
			quizQuestions[1][1][2] = new Question("Who is this West Indies cricketer? (Med)", ["brian lara", "lara"], "Hint: He is the world record holder for most runs.", 10, (new Image("Images/lara.jpg").image));
			quizQuestions[1][1][3] = new Question("Who is this famous bacteriologist? (Med)", ["dr joseph lennox pawan", "dr. joseph lennox pawan","doctor joseph lennox pawan", "joseph lennox pawan"], "Hint: He discovered how rabies were transmitted.", 10, (new Image("Images/pawan.jpg").image));
			quizQuestions[1][1][4] = new Question("Who is this? (Med)", ["anya ayoung chee"], "Hint: She was Miss Trinidad & Tobago 2008.", 10, (new Image("Images/anya-ayoung-chee.jpg").image));

			quizQuestions[1][2][0] = new Question("This is the home to the national bird. (Med)", ["caroni bird sanctuary"], "Hint: Home to the Scarlet Ibis.", (new Image("Images/scarlet-ibis.jpg").image));
			quizQuestions[1][2][1] = new Question("What is the name of this historic fort? (Med)", ["fort king george", "fort george"], "Hint: Built by the British in the 1770s in honour of King George.", 10, (new Image("Images/fort-george.jpg").image));
			quizQuestions[1][2][2] = new Question("What is the name of this beach? (Med)", ["english man's bay"], "Hint:  Located on the leeward coast of Tobago.", 10, (new Image("Images/englishmans-bay.jpg").image));
			quizQuestions[1][2][3] = new Question("A small island off the northeastern coast of Tobago, and part of the Republic of Trinidad and Tobago. (Med)", ["little tobago"], "Hint: It is an important breeding site for seabirds.", 10, (new Image("Images/little-tobago.jpg").image));
			quizQuestions[1][2][4] = new Question("This is Tobago's highest waterfall. (Med)", ["argyle waterfall", "argyle falls"], "Hint: 175 feet tall.", 10, (new Image("Images/argyle-waterfall.jpg").image));

			quizQuestions[1][3][0] = new Question("What is the name of this hindu celebration? (Med)", ["divali", "diwali"], "Hint: The festival of lights.", 10, (new Image("Images/divali.jpg").image));
			quizQuestions[1][3][1] = new Question("The islamic observance of the martyrdom of the Prophet Mohammed’s grandsons. (Med)", ["hosay"], "Hint: Hand-made temples are submerged in the sea.", 10, (new Image("Images/hosay.jpg").image));
			quizQuestions[1][3][2] = new Question("This day celebrates T&T's independence from Great Britain. (Med)", ["independence", "independence day"], "Hint: Celebrated on August 31st", 10, (new Image("Images/independence.jpg").image));
			quizQuestions[1][3][3] = new Question("This celebration marks the end of a month long fasting by muslims. (Med)", ["eid-ul-fitr", "eid ul fitr", "eid ul-fitr", "eid-al-fitr", "eid al-fitr", "eid al fitr", "festival of breaking the fast"], "Hint: Usually takes place close to the end of year.", 10, (new Image("Images/eid.jpg").image));
			quizQuestions[1][3][4] = new Question("This festival honours the remaining carbis on the island. (Med)", ["santa rosa festival"], "Hint: It is held in August.", 10, (new Image("Images/santa-rosa-festival.jpg").image));

			quizQuestions[1][4][0] = new Question("What is the 'white powder' mentioned in this song? (Med)", ["cocaine", "coke"], "Hint: A dangerous drug.", 10, (new Audio("Audio/watch-out.mp3").audio));
			quizQuestions[1][4][1] = new Question("What is the name of this song? (Med)", ["watch out my children"], "Hint: The name is in the chorus.", 10, (new Audio("Audio/watch-out.mp3").audio));
			quizQuestions[1][4][2] = new Question("What is the name of this song? (Med)", ["mr. fete", "mr fete", "mister fete"], "Hint: Song by Machel Montano.", 10, (new Audio("Audio/mr-fete.mp3").audio));
			quizQuestions[1][4][3] = new Question("What is the name of this soca artist? (Med)", ["machel montano"], "Hint: He has won 11 road march.", 10, (new Audio("Audio/mr-fete.mp3").audio));
			quizQuestions[1][4][4] = new Question("Name any 1 of the soca artists in this song. (Med)", ["machel montano", "bunji garlin", "skinny fabulous"], "Hint: This song won road march in 2019.", 10, (new Audio("Audio/famalay.mp3").audio));

			//Hard
			quizQuestions[2][0][0] = new Question("What is the name of this indian delicacy? (Hard)", ["parsad", "cream of wheat", "parasad"], "Hint: Served during Divali.", 15, (new Image("Images/parsad.jpg").image));
			quizQuestions[2][0][1] = new Question("What is the name is this Trini dessert? (Hard)", ["sweet bread"], "Hint: A traditional Trini Christmas dessert.", 15, (new Image("Images/sweet-bread.jpg").image));
			quizQuestions[2][0][2] = new Question("What is the name of this dish? (Hard)", ["pastelle"], "Hint: A Trini Christmas dish.", 15, (new Image("Images/pastelle.jpg").image));
			quizQuestions[2][0][3] = new Question("What is the name of this dish? (Hard)", ["corn soup"], "Hint: A type of soup.", 15, (new Image("Images/corn-soup.jpg").image));
			quizQuestions[2][0][4] = new Question("What is the name of this indian delicacy? (Hard)", ["aloo pie"], "Hint: Usually sold by doubles vendors.", 15, (new Image("Images/aloo-pie.jpg").image));

			quizQuestions[2][1][0] = new Question("Who is this famous writer? (Hard)", ["earl lovelace"], "Hint: Known for his book The Dragon Can't Dance.", 15, (new Image("Images/earl-lovelace.jpg").image));
			quizQuestions[2][1][1] = new Question("Who is his famous footballer? (Hard)", ["dwight yorke"], "Hint: FP2", 15, (new Image("Images/dwight-yorke.jpg").image));
			quizQuestions[2][1][2] = new Question("Who is this famous track and field athlete? (Hard)", ["ato boldon"], "Hint: Holds T&T's records for 50, 60 & 200 metre events.", 15, (new Image("Images/ato-boldon.jpg").image));
			quizQuestions[2][1][3] = new Question("Who is this calypsonian? (Hard)", ["david rudder"], "Hint: He was lead singer for Charlie's Roots.", 15, (new Image("Images/david-rudder.jpg").image));
			quizQuestions[2][1][4] = new Question("Who is this world famous Trinidad born rapper? (Hard)", ["nicki minaj", "onika tanya maraj-petty"], "Hint: Her Pink Friday album peaked at #1 in the US.", 15, (new Image("Images/nicki-minaj.png").image));

			quizQuestions[2][2][0] = new Question("What is the name of this series of caves? (Hard)", ["gasparee caves", "gasparee"], "Hint:  Lies 12 km (7. 5 mi) west of Port of Spain. ", 15, (new Image("Images/gasparee.jpg").image));
			quizQuestions[2][2][1] = new Question("Where is the Wildfowl Trust located? (Hard)", ["point-a-pierre", "point a pierre"], "Hint: The country's largest oil refinery is located here.", 15, (new Image("Images/wildfowl.jpg").image));
			quizQuestions[2][2][2] = new Question("What is the largest freshwater wetland in Trinidad? (Hard)", ["nariva swamp"], "Hint: Located not too far from Manzanilla Beach.", 15, (new Image("Images/nariva-swamp.jpg").image));
			quizQuestions[2][2][3] = new Question("Where is the home of the hummingbird? (Hard)", ["yerettê", "yerette"], "Hint: Located in Maracas Valley.", 15, (new Image("Images/yerette.jpg").image));
			quizQuestions[2][2][4] = new Question("How many mud volcanoes are there in Trinidad? (Hard)", ["15"], "Hint: There are over 10 but less than 20.", 15, (new Image("Images/mud-volcano.jpg").image));

			quizQuestions[2][3][0] = new Question("This culinary event features competitions focused on dishes using the root vegetable, Dasheen. (Hard)", ["blue food festival"], "Hint: Takes place in October in Blood Bay, Tobago.", 15, (new Image("Images/blue-food.jfif").image));
			quizQuestions[2][3][1] = new Question("This celebration commeorates the birth of Christ. (Hard)", ["christmas", "xmas", "x-mas"], "Hint: Takes place on December 25th.", 15, (new Image("Images/christmas.jpg").image));
			quizQuestions[2][3][2] = new Question("This festival takes place in Tobago on Easter Monday. (Hard)", ["buccoo goat race festival", "goat race festival"], "Hint: The poor man's equivalent to horse racing.", 15, (new Image("Images/goat-race.jpg").image));
			quizQuestions[2][3][3] = new Question("Commemorates the repeal of a law that prevented a religious group from practicing their religion. (Hard)", ["shouter baptist liberation day", "spiritual baptist liberation day"], "Hint: The religion is based on Christianity with a blend of Africanism.", 15, (new Image("Images/shouter-baptist.jpg").image));
			quizQuestions[2][3][4] = new Question("Celebration of the first indigineous people of T&T. (Hard)", ["first people's celebration", "first people celebration"], "Hint: Celeb5", 15, (new Image("Images/first-people.jpg").image));

			quizQuestions[2][4][0] = new Question("In what year was Machel Montano's firts hit song 'Too Youbg to Soca' released? (Hard)", ["1984"], "Hint: He was 9 years old.", 15, (new Audio("Audio/too-young-to-soca.mp3").audio));
			quizQuestions[2][4][1] = new Question("Who is this soca artist? (Hard)", ["machel montano"], "Hint: He has won 11 road march to date.", 15, (new Audio("Audio/too-young-to-soca.mp3").audio));
			quizQuestions[2][4][2] = new Question("What is the name of this song? (Hard)", ["tuesday on the rocks"], "Hint: Kees is known for this song.", 15, (new Audio("Audio/kees.mp3").audio));
			quizQuestions[2][4][3] = new Question("Who sings this song? (Hard)", ["kees the band", "kees"], "Hint: It is a band.", 15, (new Audio("Audio/kees.mp3").audio));
			quizQuestions[2][4][4] = new Question("What is the name of this song? (Hard)", ["dead or alive"], "Hint: It won road march in 2005.", 15, (new Audio("Audio/shurwayne.mp3").audio));

			lives = 5; //sets lives to 5 to trigger a response int the livesFunc() 
			livesFunc(); //If lives is 5 it will remove hangman body parts
			addTime = 0; //helps determine how much time to add
			currentQuestion = 0; //stores index of current question
			player.score = 0; //user score

			//returns up to 15 random question from quizQuestions array
			questions = (function() {
				let temp = []; //temp array

				//if difficulty is increasing then change difficulty every 5 questions else return selected difficulty
				let difficultyFunc = function(i) {
					if(difficulty == "increasing") {
						return Math.floor(i/5);
					}
					return difficulty;
				}

				//In case of error reload page
				try {
					//select random questions from random categories
					if(category == "random") {
						for(let i = 0; i < 15; i++) {
							let category = Math.floor(Math.random() * quizQuestions[difficultyFunc(i)].length);
							let question = Math.floor(Math.random() * quizQuestions[difficultyFunc(i)][category].length);
							temp.push(quizQuestions[difficultyFunc(i)][category].splice(question, 1)[0]);
							addTime += 30000; //add 30 sec for each question
						}
					}
					//select random questions form random categors with increasing difficulty
					else if(category == "ranked") {
						for(let i = 0; i < 15; i++) {
							let category = Math.floor(Math.random() * quizQuestions[difficultyFunc(i)].length);
							let question = Math.floor(Math.random() * quizQuestions[difficultyFunc(i)][category].length);
							if(quizQuestions[difficultyFunc(i)][category][question] == undefined) {
								
							}
							else {
								temp.push(quizQuestions[Math.floor(i/5)][category].splice(question, 1)[0]);
								addTime += 30000; //add 30 sec for each question
							}
						}
					}
					//use user selected difficulty and category
					else {
						for(let i = 0; i < 15; i++) {
							let question = Math.floor(Math.random() * quizQuestions[difficultyFunc(i)][category].length);
							if(quizQuestions[difficultyFunc(i)][category][0] == undefined) {
								break;
							}
							else if(quizQuestions[difficultyFunc(i)][category][question] == undefined) {
								
							}
							else {
								temp.push(quizQuestions[difficultyFunc(i)][category].splice(question, 1)[0]);
								addTime += 30000; //add 30 sec for each question
							}
						}
					}
				}
				catch(e) {
					alert("Error: The page will reload");
					location.reload();
				}
				
				return temp;
			})();

			endTime = (new Date().getTime()) + addTime; //sets end time
			timerInterval = setInterval(timer, 1000); //starts timer
			inputInterval = setInterval(inputChecker, 500); //check if usser has type anything in answer field
			questionDiv.innerHTML = "Q" + (currentQuestion +1)  + ": " + questions[currentQuestion].q; //display 1st question
			answerInput.value = ""; //clear answer input field
			attachmentDiv.innerHTML = ""; //remove any attachments
			scoreSpan.innerHTML = "Score: " + player.score; //set the score
			answerInput.style.backgroundColor = "white"; //set the answer field to white background
			//reset hint button
			hintBtn.innerHTML = "Hint";
			hintBtn.disabled = false;
			hintBtn.style.width = "10%";
			//if there is an attachment then display it
			if(questions[currentQuestion].attachment != undefined) {
				attachmentDiv.appendChild(questions[currentQuestion].attachment);
			}
			gameOn = !gameOn; //sets gameOn to true;
		}

		//when hint button is clicked then replace its innerHTML with the question hint and minus 3 points form score
		hintBtn.onclick = function() {
			hintBtn.innerHTML = questions[currentQuestion].hint;
			hintBtn.disabled = true;
			hintBtn.style.width = "50%";
			player.score -= 3;
			scoreSpan.innerHTML = "Score: " + player.score;

		}

		//when surrender is clicked stop all intervals and display an alert
		surrenderBtn.onclick = function() {
			clearInterval(timerInterval);
			clearInterval(inputInterval);
			clearInterval(timeOutInterval);
			gameLose.play();
			myAlert(("You Surrendered " + player.name + "!"), ("You Score: " + player.score + "<p>Time Left: " + timeSpan.innerHTML.split(" ")[1]));
		}

		//when clicked retart game with current settings
		playAgainBtn.onclick = function() {
			modalDiv.style.display = "none";
			gameOn = !gameOn;
			startGame();
		}

		//when clicked go back to home page
		newGameBtn.onclick = function() {
			gameOn = !gameOn;
			modalDiv.style.display = "none";
			gamePanel.style.display = "none";
			startPanel.style.display = "initial";

		}

		//when answer is submitted check if it is right or wrong and add score if right
		answerForm.onsubmit = function() {
			let answer = answerInput.value.toLowerCase();
			let correct = false;
			for(let i = 0; i < questions[currentQuestion].a.length; i++) {
				if(answer == questions[currentQuestion].a[i].toLowerCase()) {
					answerInput.style.backgroundColor = "#3BC62E";
					player.score += questions[currentQuestion].points;
					scoreSpan.innerHTML = "Score: " + player.score;
					if(lives < 3) {
						lives = 5;
						livesFunc();
					}
					answerTrue.play();
					setTimeout(nextQuestion, 500);

					break;
				}
				else if((i + 1) == questions[currentQuestion].a.length) {
					answerFalse.play();
					answerInput.style.backgroundColor = "rgba(231, 76, 76, 100)";
					livesFunc();
				}
			}
		}

		//checks if there is another question or game is won, if there is another question display it else show a alert
		function nextQuestion() {
			++currentQuestion;
			answerInput.style.backgroundColor = "white";
			answerInput.value = "";
			attachmentDiv.innerHTML = "";
			if(questions[currentQuestion] == undefined) {
				clearInterval(timerInterval);
				clearInterval(inputInterval);
				gameWin.play();
				myAlert(("You Won " + player.name + "!"), ("You Score: " + player.score + "<p>Time Left: " + timeSpan.innerHTML.split(" ")[1]));
			}
			else {
				questionDiv.innerHTML = "Q" + (currentQuestion +1)  + ": " + questions[currentQuestion].q;
				if(questions[currentQuestion].attachment != undefined) {
					attachmentDiv.appendChild(questions[currentQuestion].attachment);
				}
				hintBtn.innerHTML = "Hint";
				hintBtn.disabled = false;
				hintBtn.style.width = "10%";
			}
		}
			
		//Used to add or remove hangman body parts
		function livesFunc() {
			--lives;
			let aliveHead = document.querySelectorAll('.aliveHead');
			let torso = document.querySelectorAll('.torso');
			let deadHead = document.querySelectorAll('.deadHead');
			let legs = document.querySelectorAll('.legs');
			switch(lives) {
				case 4:
					for(let i = 0; i < aliveHead.length; i++) {
						aliveHead[i].style.display = "none";
					}
					for(let i = 0; i < deadHead.length; i++) {
						deadHead[i].style.display = "none";
					}
					for(let i = 0; i < torso.length; i++) {
						torso[i].style.display = "none";
					}
					for(let i = 0; i < legs.length; i++) {
						legs[i].style.display = "none";
					}
					lives = 3;
					break;
				case 2:
					for(let i = 0; i < aliveHead.length; i++) {
						aliveHead[i].style.display = "initial";
					}
					setTimeout(nextQuestion, 500);
					break;

				case 1:
					for(let i = 0; i < aliveHead.length; i++) {
						aliveHead[i].style.display = "none";
					}
					for(let i = 0; i < deadHead.length; i++) {
						deadHead[i].style.display = "initial";
					}
					for(let i = 0; i < torso.length; i++) {
						torso[i].style.display = "initial";
					}
					setTimeout(nextQuestion, 500);
					break;

				case 0:
					for(let i = 0; i < legs.length; i++) {
						legs[i].style.display = "initial";
					}
					clearInterval(timerInterval);
					clearInterval(inputInterval);
					gameLose.play();
					setTimeout(function() {myAlert(("You Lost " + player.name + "!"), ("You Score: " + player.score + "<p>Time Left: " + timeSpan.innerHTML.split(" ")[1]));}, 500);
					break;
			}
		}

		//Used to keep track of time and display it, if time is up stop game and display alert
		function timer() {
			let now = new Date().getTime();
			timeLeft = endTime - now;
			let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
			let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
			timeSpan.innerHTML = "Time: 0" + minutes + ":" + (function() {
				if(seconds < 10) {
					return "0" + seconds;
				}
				return seconds;
			})();
			if((timeLeft <= 30000) && (timeoutCheck != true)) {
				timeOutInterval = setInterval(function() {
					timeOut.play();
				}, 2000);
				timeoutCheck = true;
			}
			if(timeLeft <= 0) {
				clearInterval(timerInterval);
				clearInterval(inputInterval);
				clearInterval(timeOutInterval);
				timeSpan.innerHTML = "Time: 00:00";
				gameLose.play();
				myAlert(("Time's Up " + player.name + "!"), ("You Score: " + player.score + "<p>Time Left: " + timeSpan.innerHTML.split(" ")[1]));
			}
		}

		//checks if there is anything inputted into the answer input
		function inputChecker() {
			if(answerInput.value.length == 0) {
				submitBtn.innerHTML = "Skip";
			}
			else {
				submitBtn.innerHTML = "Submit";
			}
		}

		//Used to display a custom alert
		function myAlert(head, msg, button1, button2) {
			modalHead.innerHTML = head;
			modalMsg.innerHTML = msg;
			modalDiv.style.display = "initial";
		}

	})();

})();




