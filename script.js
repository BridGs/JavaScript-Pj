//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");
//retrieving stored missionList
const storedMissions = localStorage.getItem("missionList");

let missionList = [];
missionList = storedMissions;

missionCreateBtn.addEventListener("click",function (){
	const mission = {
		title: missionTitle,
		difficulty: difficulty,
		level: missionLevel,
		state: "unfinished"
	};

	missionList.push(mission);
	//converts to string then saves to local storage
	localStorage.setItem("missionList",JSON.stringify(missionList));

	console.log(missionList);
});