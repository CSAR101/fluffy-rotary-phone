function setup() {
	getMatchInformation('raptorship'); 
	
	//httpGet("http://localhost:3000/Halo5Match", Halo5MatchResponse);

}

function getMatchInformation(playerGamertag) {
	var data = {
		name: playerGamertag
	}
	httpGet("http://localhost:3000/Halo5Match", data, Halo5MatchResponse);
}

function finished(response) {
	var data = JSON.parse(response); 
	console.log(data);
	console.log("results:");
}

function draw() {
	ellipse(50, 50, 80, 80);
}

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} 

function getGameVariantInformation(gameVariantID) {
	console.log("game count: " + gameVariantID.length); 

		for (x = 0; x < gameVariantID.length; x++) {
			console.log("Game Variant ID: " + gameVariantID);
			var data = {gameVariantId: gameVariantID[x]};

			httpGet("http://localhost:3000/Halo5GameVariantMeta", data, gameVariantMetaResponse);
			pausecomp(3000);
		}
}

var gameVariantName = []; 
var gameVariantDescription = []; 
var gameIndex = 0; 
function gameVariantMetaResponse(response) {
	var gameVariantData = JSON.parse(response);
	console.log("GAME RESPONSE: " + response);

	gameVariantName[gameIndex] = gameVariantData.name; 
	gameVariantDescription[gameIndex] = gameVariantData.description;

	console.log("game variant: " + gameVariantName[gameIndex]);

	gameIndex += 1; 
}

//var mapFlag = true; 
function getMapInformation(mapID) {
	for (x = 0; x < mapID.length; x++) {
		//console.log("mapID="+mapID[x]);
		var data = {mapId: mapID[x]};
		//console.log("data="+data);
		httpGet("http://localhost:3000/Halo5MapMeta", data, mapMetaResponse);
		
		pausecomp(3000);

	}
}

var mapName = []; 
var mapDescription = []; 
var mapImageURL = [];
var mapIndex = 0;
function mapMetaResponse(response) {
	var mapData = JSON.parse(response);
	mapName[mapIndex] = mapData.name; 
	mapDescription[mapIndex] = mapData.description; 
	mapImageURL[mapIndex] = mapData.mapImageUrl; 

	console.log(mapName[mapIndex]);
	console.log(mapDescription[mapIndex]);
	console.log(mapImageURL[mapIndex]);

	mapIndex += 1; 
	//mapFlag = true; 
}

function getPostCarnageInformation(matchID) {
	console.log("Match ID Length: " + matchID.length);
	for(x = 0; x < matchID.length; x++) {
		var data = {matchId: matchID[x]}; 
		httpGet("http://localhost:3000/Halo5PostGameCarnageArena", data, postCarnageResponse);	
		//setTimeout(delayFunc,60000);
		pausecomp(3000); 	
	}
	
}

var playerData = [];
var playerDataIndex = 0;
function postCarnageResponse(response) {
	playerData[playerDataIndex] = JSON.parse(response); 
	console.log(playerData[playerDataIndex].PlayerStats); 

	for (i = 0; i < playerData[playerDataIndex].PlayerStats.length; i++) {
		playerData[playerDataIndex].gamerTag = playerData[playerDataIndex].PlayerStats[i].Player.Gamertag; 
		playerData[playerDataIndex].teamID = playerData[playerDataIndex].PlayerStats[i].TeamId; 
		playerData[playerDataIndex].totalKills = playerData[playerDataIndex].PlayerStats[i].TotalKills; 
		playerData[playerDataIndex].totalDeaths = playerData[playerDataIndex].PlayerStats[i].TotalDeaths; 
		playerData[playerDataIndex].totalHeadshots = playerData[playerDataIndex].PlayerStats[i].TotalHeadshots; 
		playerData[playerDataIndex].totalAssists = playerData[playerDataIndex].PlayerStats[i].TotalAssists; 

		console.log("MATCH " + playerDataIndex + ": "); 
		console.log("Player GamerTag: " + playerData[playerDataIndex].gamerTag); 
		console.log("TEAM #" + playerData[playerDataIndex].teamID)
		console.log("-Kills=" + playerData[playerDataIndex].totalKills);
		console.log("-Deaths=" + playerData[playerDataIndex].totalDeaths);
		console.log("-Headshots=" + playerData[playerDataIndex].totalHeadshots);
		console.log("-Assists=" + playerData[playerDataIndex].totalAssists);

	} 
	playerDataIndex += 1;
}

function Halo5MatchResponse(response) {
	var data = JSON.parse(response);
	var results = data.Results; 
	console.log(results);
	var matchID = [];
	var mapID = [];
	var gameBaseVariantID = [];
	var gameVariantID = [];

	for (i = 0; i < results.length; i++) {
		matchID[i] = results[i].Id.MatchId;
		mapID[i] = results[i].MapVariant.ResourceId; 
		//gameBaseVariantID[i] = results[i].GameBaseVariantId; //Arena
		gameVariantID[i] = results[i].GameVariant.ResourceId; //Slayer, CTF, etc...
		console.log("MatchID:" + matchID[i]);
	}

	getMapInformation(mapID);
	//pausecomp(11000);
	getGameVariantInformation(gameVariantID);
	//pausecomp(11000);
	getPostCarnageInformation(matchID); 
}