//Mihir Srivastava/Amit Rathore
//FINAL PROJECT - HALO 5 Multiplayer visualization that shows correlations between multiple 
//players and why one team wins over another

var allData = [];
var loadDataDone = false;
var myCanvas = null; 

function setup() {
    myCanvas = createCanvas(1000,400);
    myCanvas.parent("canvas-container1");
    console.log("setup entered");
    noLoop();
    //loadData();
    //frameRate(10);
    initSetup();
}


//promises for async callbacks
function loadDataFromHTML(name) {
	
	//getMatchInformation('raptorship'); 
    if (myCanvas != null) {
        myCanvas.clear(); 
    }
    loadDataDone = false; 
    allData = []; 
    username = name; 
	getMatchInformation(name).then(function(response) {
        console.log("promise:Halo5esponse");
        Halo5MatchResponse(response);
    }).then(function(response) {return(getMapInformation(allData));})
      .then(function(response) {return(getGameVariantInformation(allData));})
      .then(function(response) {return(getPostCarnageInformation(allData));})
      .then(function(r) {console.log("Final allData:");
                         console.log(allData);
                         setupNavMenu();
                         loadDataDone = true;
                        });
    
	//httpGet("http://localhost:3000/Halo5Match", Halo5MatchResponse);

    
}


function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} 


function getMatchInformation(playerGamertag) {
	var data = {
		name: playerGamertag
	}
    return new Promise(function(resolve,reject) {
	   httpGet("http://localhost:3000/Halo5Match", data, (function(response) {var data = JSON.parse(response);resolve(data);}));
    });
}

function Halo5MatchResponse(response) {
	//var data = JSON.parse(response);
    var data = response;
	var results = data.Results; 
	console.log(results);
	var matchID = [];
	var mapID = [];
	//var gameBaseVariantID = [];
	var gameVariantID = [];

	for (var i = 0; i < results.length; i++) {
		//matchID[i] = results[i].Id.MatchId;
		//mapID[i] = results[i].MapVariant.ResourceId; 
        var obj = {matchID: results[i].Id.MatchId,
                   mapID: results[i].MapVariant.ResourceId,
                   gameVariantID: results[i].GameVariant.ResourceId};     
        allData.push(obj);
        //if (i == 1)
           // break;
		//gameVariantID[i] = results[i].GameVariant.ResourceId; //Slayer, CTF, etc...
		//console.log("MatchID:" + matchID[i]);
        console.log("mapID:" + allData[i].mapID);
	}
}


function getGameVariantInformation(gameVariantID) {
	console.log("game count: " + gameVariantID.length); 
    console.log("getGameVariantInformation enter");
    var p = [];
    for (var x = 0; x < gameVariantID.length; x++) {
        //console.log("Game Variant ID: " + gameVariantID[x].gameVariantID);
        var data = {gameVariantId: gameVariantID[x].gameVariantID};
        (p[x] = new Promise(function(resolve,reject) {
            httpGet("http://localhost:3000/Halo5GameVariantMeta", data, (function(response) {var data = JSON.parse(response);resolve(data);}));
            })).then(gameVariantMetaResponse);
    }
    return(Promise.all(p));
}
 
function gameVariantMetaResponse(response) {
	//var gameVariantData = JSON.parse(response);
    var gameVariantData = response;
	console.log("gameVariantMetaResponse");
    console.log(gameVariantData);
    
    var flag = false;
    for (var i = 0; i < allData.length; ++i) {
        if (allData[i].gameVariantID == gameVariantData.id) {
            allData[i].gameVariantName = gameVariantData.name;
            allData[i].gameDescription = gameVariantData.description;
            flag = true;
            break;
        }
    }
    if (flag == false) 
        console.log("****gameVariantID not found:" + gameVariantData.id);
    console.log("gameVariantMetaResponse allData:");
    console.log(allData);
}


function getMapInformation(mapID) {
    console.log("getMapInformation enter");
    var p = [];
	for (var x = 0; x < mapID.length; x++) {
		console.log("mapID="+mapID[x].mapID);
		var data = {mapId: mapID[x].mapID};
		(p[x] = new Promise(function(resolve,reject) {
	       httpGet("http://localhost:3000/Halo5MapMeta", data, (function(response) {var data = JSON.parse(response);resolve(data);}));
        })).then(mapMetaResponse);
		//httpGet("http://localhost:3000/Halo5MapMeta", data, mapMetaResponse);
	}
    return(Promise.all(p));
}

    
function mapMetaResponse(response) {
	//var mData = JSON.parse(response);
    //console.log(response);
    var mData = response;
    console.log("mapMetaResponse response:");
    console.log(mData);
    var flag = false;
    for (var i = 0; i < allData.length; ++i) {
        if (allData[i].mapID == mData.id) {
            allData[i].mapName = mData.name;
            allData[i].mapDescription = mData.description;
            allData[i].mapImageURL = mData.mapImageUrl;
            flag = true;
            break;
        }
    }
    if (flag == false) 
        console.log("****mapId not found:" + mData.id);
    console.log("mapMetaResponse allData:");
    console.log(allData);
}

function getPostCarnageInformation(mdata) {
	console.log("getPostCarnageInformation enter:");
    var p = [];
    var x;
	for(var x = 0; x < mdata.length; x++) {
        var id = mdata[x].matchID;
		var data = {matchId: id}; 
        
        (p[x] = new Promise(function(resolve,reject) {
            httpGet("http://localhost:3000/Halo5PostGameCarnageArena", data,(function(response) {var data = JSON.parse(response);resolve(data);}));
        })).then(postCarnageResponse);
        //console.log("getPost:" + x);
		//httpGet("http://localhost:3000/Halo5PostGameCarnageArena", data, postCarnageResponse);		
	}
    //console.log("getPost::" + x + "," + mdata.length);
	return(Promise.all(p));
}

function postCarnageResponse(response) {
    console.log("postCarnegeResponse");
    //console.log(response);
    var data = response; 
    console.log(data);
    var gameVarId = data.GameVariantId;
    console.log("gameVarId: " + gameVarId);
    var flag = false;
    var pData = [];
    for (var i = 0; i < allData.length; i++) {
        if (allData[i].gameVariantID == data.GameVariantId) {
            for (var x = 0; x < data.PlayerStats.length; x++) {
                pData.push({
                    gamerTag: data.PlayerStats[x].Player.Gamertag,
                    teamID: data.PlayerStats[x].TeamId,
                    totalKills: data.PlayerStats[x].TotalKills,
                    totalDeaths: data.PlayerStats[x].TotalDeaths,
                    totalHeadshots: data.PlayerStats[x].TotalHeadshots, 
                    totalAssists: data.PlayerStats[x].TotalAssists
                });
            }
            allData[i].playerData = pData;
            flag = true;
            break;
        }
    }
    if (flag == false) 
        console.log("****gameVariantId not found:" + data.GameVariantId);
    console.log("postCarnageResponse allData:");
    console.log(allData); 
}

function getTotalKills(matchNumber) {
	var blueTeam = []; 
	var redTeam = [];
	
	var n = allData.length;
    if (n > matchNumber) {
        console.log("GetTotalKills: Matchnumber is incorrect: " + matchNumber + "," + n);
    }
    
    var pData = allData[matchNumber-1];
    
	for (var i = 0; i < pData.length; i++) {
		if (pData[i].TeamId == 0) {/* blue team */
			blueTeam.push(pData[i]);
		}
		else {
           redTeam.push(pData[i]); 
        }
	}
	return {Blue: blueTeam, Red: redTeam}
}

//loads map images based on what is map name
function getMapImage(mapName) {
    if (mapName == "Empire")
        n = "Empire";
    else if (mapName == "Fathom")
        n = "Fathom";
    else if (mapName == "The Rig")
        n = "Rig";
    else if (mapName == "Riptide")
        n = "Riptide";
    else if (mapName == "Torque")
        n = "Torque";
    else if (mapName == "Eden")
        n = "Eden";
    else if (mapName == "Tyrant")
        n = "Tyrant";
    else 
        n = "Riptide";
    return(n);
}

function setupNavMenu() {
    var str = "<tr>";
    var th = "";

    for (var i = 0; i < allData.length; i++) {
        var im = getMapImage(allData[i].mapName);

        th += "<th>" + allData[i].mapName + "</th>";
        str += "<td>" + 
                '<img src='
                + '"../../../' + im + '.jpg"' 
                + 'alt="Match 0" style="width:300px;height:150px;border:0"'
                + ' onclick="navClick(' + i + ')">'
                + "</td>";
        }

     th = "<tr>" + th + "</tr>"; 
     str += "</tr>"  
     str = th + str;
     document.getElementById("myNav").innerHTML = str; 
}

function navClick(id) {
    console.log("navClick:" + id);
    //showPlayerDetails(id);
    //xCenter = 0; xCenterLine = 0; loop();
    initRunAnimate(id);
    //drawVisualizationAnimate();
    //sortPlayerStats(id);
    //showPlayerDetails(id);
}

function showPlayerDetails(matchId) {
    redTeam = document.getElementById("playerDetailsRedTeam");
    blueTeam = document.getElementById("playerDetailsBlueTeam");

    var strRed = "<tr> \
            <th>Gamer Tag</th> \
            <th>Kills &nbsp</th> \
            <th>Deaths &nbsp</th> \
            <th>Headshots &nbsp</th> \
            <th>Assists &nbsp</th>\
            </tr>"
    var strBlue = "<tr> \
            <th>Gamer Tag</th> \
            <th>Kills &nbsp</th> \
            <th>Deaths &nbsp</th> \
            <th>Headshots &nbsp</th> \
            <th>Assists &nbsp</th>\
            </tr>"

    pData = allData[matchId].playerData;        
    for (var i = 0; i < pData.length; i++) {
        if (pData[i].teamID == 0) {
            strRed += "<tr> <td style=\"text-align: left;\">" + pData[i].gamerTag + "</td>" +
                      "<td>" + pData[i].totalKills + "</td>" +
                      "<td>" + pData[i].totalDeaths + "</td>" +
                      "<td>" + pData[i].totalHeadshots + "</td>" +
                      "<td>" + pData[i].totalAssists + "</td> </tr>";
        }
        else {
            strBlue += "<tr> <td style=\"text-align: left;\">" + pData[i].gamerTag + "</td>" +
                      "<td>" + pData[i].totalKills + "</td>" +
                      "<td>" + pData[i].totalDeaths + "</td>>" +
                      "<td>" + pData[i].totalHeadshots + "</td>" +
                      "<td>" + pData[i].totalAssists + "</td> </tr>";
        }
    }

    redTeam.innerHTML = strRed;
    blueTeam.innerHTML = strBlue;
}

