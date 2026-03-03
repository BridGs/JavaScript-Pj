//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");
//retrieving stored missionList
const storedMissions = localStorage.getItem("missionList");

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

	data.forEach(mission => {
		console.log(mission);
		const row = document.createElement("tr");

		const missionCell = document.createElement("td");
		missionCell.textContent = mission.title;
		const difficultyCell = document.createElement("td");
		difficultyCell.textContent = mission.difficulty;
		const levelCell = document.createElement("td");
		levelCell.textContent = mission.level;
	
		row.appendChild(missionCell);
		row.appendChild(difficultyCell);
		row.appendChild(levelCell);
		tableBody.appendChild(row);
	});
}

renderMissionTable(missionList);