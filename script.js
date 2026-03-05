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
		state: "unfinished"
		//event:
		//duration:
		//enemyQuantity:
		//enemyLevel:
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
		row.appendChild(actionCell);	
		tableBody.appendChild(row);
		}
		
	});
}

renderMissionTable(missionList);

function missionStart (/*gets mission data AND player data */) {	//THINK OF FORMULA 
//compares player lvl and mission lvl, player overlevel = higher win%						--can be underlevel, lower win%
//compares player ammoCount to mission.enemyQuantity, if ammoCount higher = higher win%		--can be low ammo
//get difficulty, duration, event and enemyLevel and apply buff or debuff

}