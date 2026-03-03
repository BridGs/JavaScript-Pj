//Mission data input
const missionCreateBtn = document.getElementById("createMissionBtn");
const missionTitle = document.getElementById("missionTitle");
const difficulty = document.getElementById("difficulty");
const missionLevel = document.getElementById("level");

let missionList = [];

missionCreateBtn.addEventListener("click",function (){
	const mission = {
		title: missionTitle,
		difficulty: difficulty,
		level: missionLevel,
		state: "unfinished"
	};

	missionList.push(mission);

	console.log(missionList);
});