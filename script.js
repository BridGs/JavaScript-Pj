//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");
const duration = document.getElementById("duration");
const enemyQuantity = document.getElementById("enemyQuantity");
const enemyLevel = document.getElementById("enemyLevel")
//retrieving stored missionList


let storedMissions = localStorage.getItem("missionList");
let missionList = [];

//missionList.push(missionLoader);
if(storedMissions){
	missionList = JSON.parse(storedMissions);
}else{
	missionList = [{
		id:0,
		title: "loader",
		difficulty: "1.0",
		level: "0",
		state: "finished"
	}];
}

if(storedMissions != missionList){
	missionList.push(storedMissions);
}

//Player data storage

let Player = {
	playerXp : 0,
	playerLevel : 1,
	playerDmg : 0,
	playerVitality : 1,
	playerHp : ManagePlayerHP,
	playerAgility : 1,
	playerLuck : 1,
	playerAmmoQuantity : "Low"
}

function ManagePlayerHP(){
	if(Player.playerVitality != null){
		return Math.floor(10 * (Player.playerVitality / 2) - Player.playerDmg);
	} else{
		return 10
	}
}


//Add mission to array
missionCreateBtn.addEventListener("click",function (){
	const mission = {
		id: (missionList.length),
		title: missionTitle.value,
		difficulty: difficulty.value,
		level: missionLevel.value,
		state: "unfinished",
		event: DecideEvent(),
		duration: duration.value,
		enemyQuantity: enemyQuantity.value,
		enemyLevel: enemyLevel.value,
		xp : AssignXp(missionLevel, difficulty)
	};

	missionList.push(mission);
	//converts to string then saves to local storage
	localStorage.setItem("missionList",JSON.stringify(missionList));

	console.log(missionList);
	renderMissionTable(missionList);
});

let tableBody = document.getElementById("missionTable")
//Make table of mission from array
function renderMissionTable (data) {
	//console.log(data);
	tableBody.innerHTML = "";

	data.forEach((mission, index) => {
		//console.log(mission);
		if(!mission){
			return;
		}

		if(mission.state == "unfinished"){
			const row = document.createElement("tr");

		const missionCell = document.createElement("td");
		missionCell.textContent = mission.title;
		//console.log(mission.title);
		const difficultyCell = document.createElement("td");
		difficultyCell.textContent = mission.difficulty;
		//console.log(mission.difficulty);
		const levelCell = document.createElement("td");
		levelCell.textContent = mission.level;
		//console.log(mission.level);
		const eventCell = document.createElement("td");
		eventCell.textContent = mission.event; 
		const durationCell = document.createElement("td");
		durationCell.textContent = mission.duration;
		const enemyQuantityCell = document.createElement("td");
		enemyQuantityCell.textContent = mission.enemyQuantity;
		const enemyLevelCell = document.createElement("td");
		enemyLevelCell.textContent = mission.enemyLevel;
		const missionChanceCell = document.createElement("td");
		missionChanceCell.textContent = missionStart(mission);

		const actionCell = document.createElement("td");
		const acceptBtn = document.createElement("button");
		acceptBtn.textContent = "Accept Mission";

		acceptBtn.addEventListener("click", function (){
			//Logic of mission succes or failure
			MissionAssigmentStart(mission);
			renderMissionTable(missionList);
		});

		actionCell.appendChild(acceptBtn);
		
		//console.log(levelCell,eventCell,enemyLevelCell);

		row.appendChild(missionCell);
		row.appendChild(difficultyCell);
		row.appendChild(levelCell);
		row.appendChild(eventCell);
		row.appendChild(durationCell);
		row.appendChild(enemyQuantityCell);
		row.appendChild(enemyLevelCell);
		row.appendChild(missionChanceCell);
		row.appendChild(actionCell);	
		tableBody.appendChild(row);
		}
	});
}

renderMissionTable(missionList);

function missionStart (mission) {	//THINK OF FORMULA 
//compares player lvl and mission lvl, player overlevel = higher win%						--can be underlevel, lower win%
//compares player ammoCount to mission.enemyQuantity, if ammoCount higher = higher win%		--can be low ammo
//get difficulty, duration, event and enemyLevel and apply buff or debuff
	let EnLvl = 0;
	let EnQty = 0;
	let event = 0;
	switch(mission.enemyLevel){
		case "Untrained": EnLvl = -5;
			break;
		case "Trained": EnLvl = 2;
			break;
		case "Veteran": EnLvl = 10;
			break;
	}
	switch(mission.enemyQuantity){
		case "Low": EnQty = -12;
			break;
		case "Normal": EnQty = 6;
			break;
		case "Excesive": EnQty = 12;
			break;
	}
	switch(mission.event){
		case "rain": event = 5;
			break;
		case "debris" : event = 8;
			break;
		case "nothing" : event = 0;
			break;
	}
	let succesChance = ((((100 - mission.level) - EnLvl) - (EnQty/2)) - event);
	return succesChance;
}

function MissionAssigmentStart(mission) {
	let succesChance = missionStart(mission);
	let succesRoll = CreateRandomNumber(1, 100);
	console.log("chance de success",succesChance, "valor sacado", succesRoll);
		if(succesChance >= succesRoll){
			//Create item chance discovery 
			mission.state = "finished";
			Player.playerXp += mission.xp;
			console.log(Player.playerXp);
			localStorage.setItem("missionList", JSON.stringify(missionList));
		renderMissionTable(missionList);
		alert("Mission succesfull"); 
		return true;
	}else{
		DealDmgPlayer(mission.level, Player)
		Player.playerXp += (mission.xp / 2);
		console.log(Player.playerXp);
		renderMissionTable(missionList);
		//player recieve dmg
		alert("Mission failed");
		return false;
	}
}

function AssignXp(level, difficulty){
	switch(difficulty){
		case 1: return level * 1;
			break;
		case 2: return level * 2; 
			break;
		case 4: return level * 4;
			break;
	}   
}

function LevelUp() {
	if(Player.playerXp >= 100){
		Player.playerLevel =+ 1;
		Player.playerXp = Player.playerXp - 100;
		let levelUp = prompt("Enter skill to level up: Vitality, Agility, Luck");
		switch(levelUp){
			case "Vitality": Player.playerVitality += 1;
				break;
			case "Agility": Player.playerAgility += 1;
				break;
			case "Luck": Player.playerLuck += 1;
				break;
		}
	}
}

function CreateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DecideEvent(){
	let rNumber = CreateRandomNumber(1, 20);
	switch(rNumber){
		case 1: 
			console.log("rain, 1");
			return "rain";
			break;
		case 2:
			console.log("debris, 2") 
			return "debris";
			break;
		default: 
			console.log("nothing,else")
			return "nothing";
			break;
	}
}

function DealDmgPlayer(missionLevel, Player){
	return Math.floor(CreateRandomNumber(1,missionLevel) + (Player.playerLevel/Player.playerVitality));
}