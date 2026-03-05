//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");
//retrieving stored missionList
let storedMissions = localStorage.getItem("missionList");

let missionList = [];
const missionLoader = {
	id: 0,
	title: "loader",
	difficulty: "1.0",
	level: "0",
	state: "finished"
};
missionList.push(missionLoader);
if(storedMissions){
	missionList.push(storedMissions);
}

//Add mission to array
missionCreateBtn.addEventListener("click",function (){
	const mission = {
		id: (missionList.length),
		title: missionTitle,
		difficulty: difficulty,
		level: missionLevel,
		state: "unfinished",
		event: DecideEvent(),
		duration: duration,
		enemyQuantity: enemyQuantity,
		enemyLevel: enemyLevel
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
	console.log(data);
	tableBody.innerHTML = "";

	data.forEach((mission, index) => {
		console.log(mission);
		if(mission.state = "unfinished"){
			const row = document.createElement("tr");

		const missionCell = document.createElement("td");
		missionCell.textContent = mission.title;
		const difficultyCell = document.createElement("td");
		difficultyCell.textContent = mission.difficulty;
		const levelCell = document.createElement("td");
		levelCell.textContent = mission.level;
		const eventCell = document.createElement("td");
		eventCell.textContent = mission.event; 
		const durationCell = document.createElement("td");
		durationCell.textContent = mission.duration;
		const enemyQuantityCell = document.createElement("td");
		enemyQuantityCell.textContent = mission.enemyQuantity;
		const enemyLevelCell = document.createElement("td");
		enemyLevelCell.textContent = mission.enemyLevel;

		const actionCell = document.createElement("td");
		const acceptBtn = document.createElement("button");
		acceptBtn.textContent = "Accept Mission";

		acceptBtn.addEventListener("click", function (){
			//Logic of mission succes or failure
			mission.state = "finished";
			localStorage.setItem("missionList", JSON.stringify(missionList));
			renderMissionTable(missionList);
		});

		actionCell.appendChild(acceptBtn);

		row.appendChild(missionCell);
		row.appendChild(difficultyCell);
		row.appendChild(levelCell);
		row.appendChild(eventCell);
		row.appendChild(durationCell);
		row.appendChild(enemyQuantityCell);
		row.appendChild(enemyLevelCell);
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
	let succesChance = (((100 - mission.level) - EnLvl) - (EnQty/2));
	let succesRoll = CreateRandomNumber(1, 100);
	if(succesChance <= succesRoll){
		//Create item chance discovery 
		mission.state = "finished";
		localStorage.setItem("missionList", JSON.stringify(missionList));
		renderMissionTable(missionList);
		return true;
	}else{
		return false;
		//player recieve dmg
	}

}

function CreateRandomNumber(max, min) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DecideEvent(){
	let rNumber = CreateRandomNumber(20, 1);
	switch(rNumber){
		case 1: return "rain";
			break;
		case 2: return "debris";
			break;
		default: return "nothing";
			break;
	}
}