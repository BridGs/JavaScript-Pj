//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const resetProgressBtn = document.getElementById("resetProgress");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");
const duration = document.getElementById("duration");
const enemyQuantity = document.getElementById("enemyQuantity");
const enemyLevel = document.getElementById("enemyLevel")
//retrieving stored missionList


let storedMissions = localStorage.getItem("missionList");
let storedPlayer = localStorage.getItem("Player");
let missionList = [];
let Player;
let playerTable = document.getElementById("playerStats");
//Preload of data

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
console.log(storedPlayer);

//Player data storage
if(storedPlayer != null){
	Player = JSON.parse(storedPlayer);
}else{
	Player = {
	playerXp : 0,
	playerLevel : 1,
	playerDmg : 0,
	playerVitality : 1,
	playerHp : ManagePlayerHP,
	playerAgility : 1,
	playerLuck : 1,
}
}


function ManagePlayerHP(player){
	if(player.playerVitality != null){
		return Math.floor(10 * (player.playerVitality / 2) - player.playerDmg);
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
		xp: AssignXp(missionLevel.value, difficulty.value)
	};

	missionList.push(mission);
	//converts to string then saves to local storage
	localStorage.setItem("missionList",JSON.stringify(missionList));

	console.log(missionList);
	renderMissionTable(missionList);
});

let tableBody = document.getElementById("missionTable");
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

function missionStart (mission) {	
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
			Player.playerXp += AssignXp(mission.level, mission.difficulty);
			console.log(mission.xp);
			console.log("PLAYER XP = ",Player.playerXp);
			localStorage.setItem("missionList", JSON.stringify(missionList));
		renderMissionTable(missionList);
		RenderPlayerStats(Player);
		RemoveMission(mission);
		alert("Mission succesfull"); 
		return true;
	}else{
		DealDmgPlayer(mission.level, Player)
		Player.playerXp += (AssignXp(mission.level, mission.difficulty) / 2);
		console.log("PLAYER XP = ",Player.playerXp);
		renderMissionTable(missionList);
		RenderPlayerStats(Player);
		//player recieve dmg
		alert("Mission failed");
		return false;
	}
}

function RemoveMission(mission){
	if(mission.id > -1){
		missionList.splice(index, mission.id);
	}
}

function AssignXp(level, difficulty){
	level = Number(level);
	difficulty = Number(difficulty);
	switch(difficulty){
		case 1: 
			console.log(level * 1);
			return level * 1;
			break;
		case 2: 
			console.log(level * 2);
			return level * 2; 
			break;
		case 4: return level * 4;
			break;
	}   
}

function LevelUp() {
	if(Player.playerXp >= 50){
		Player.playerLevel =+ 1;
		Player.playerXp = Player.playerXp - 50;
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
			console.log("EVENT = rain, 1");
			return "rain";
			break;
		case 2:
			console.log("EVENT = debris, 2") 
			return "debris";
			break;
		default: 
			console.log("EVENT = nothing,else")
			return "nothing";
			break;
	}
}

function DealDmgPlayer(missionLevel, Player){
	return Math.floor(CreateRandomNumber(1,missionLevel) + (Player.playerLevel/Player.playerVitality));
}


function RenderPlayerStats(player) {
	playerTable.innerHTML = "";

	const row = document.createElement("tr");

	console.log(player);
		const hpCell = document.createElement("td");
		const levelCell = document.createElement("td");
		const xpCell = document.createElement("td");
		const vitalityCell = document.createElement("td");
		const agilityCell = document.createElement("td");
		const luckCell = document.createElement("td");
		//console.log(player.playerHp);
		hpCell.textContent = ManagePlayerHP(player);
		levelCell.textContent = player.playerLevel;
		xpCell.textContent = player.playerXp;
		vitalityCell.textContent = player.playerVitality;
		agilityCell.textContent = player.playerAgility;
		luckCell.textContent = player.playerLuck;
		
		row.appendChild(hpCell);
		row.appendChild(levelCell);
		row.appendChild(xpCell);
		row.appendChild(vitalityCell);
		row.appendChild(agilityCell);
		row.appendChild(luckCell);	
		playerTable.appendChild(row);
}

resetProgressBtn.addEventListener("click", function(){
	missionList = [];
	Player = {
	playerXp : 0,
	playerLevel : 1,
	playerDmg : 0,
	playerVitality : 1,
	playerHp : ManagePlayerHP,
	playerAgility : 1,
	playerLuck : 1,
	};
	renderMissionTable(missionList);
	RenderPlayerStats(Player);
})

RenderPlayerStats(Player);