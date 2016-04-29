var allData = [];
var loadDataDone = false;

function setup() {
    var myCanvas = createCanvas(1000,400);
    myCanvas.parent("canvas-container1");
    console.log("setup entered");
    noLoop();
    loadData();
    //frameRate(10);
    initSetup();
}

function setCanvas(){
    myCanvas = createCanvas(1000,400);
    myCanvas.parent("canvas-container1");
    setupNavMenu();
}

/*function draw() {
    if (!loadDataDone) 
        return;
    //ellipse(50, 50, 80, 80);
    //pausecomp(60000);
    clear();
    drawVisualizationAnimate();
    //if (xCenter == xCenterStop) {noLoop();return;}
}*/

/*var xCenter = 0;
var xCenterStop = 505;
var xCenterLine = 0;
var xCenterLineStop = 1000;

function drawVisualizationAnimate(matchId) {
    //img = loadImage("fathom.jpg");
    //image(img, 0, 0);
    strokeWeight(8);
    stroke(255, 0, 0);
    line(0, 200, xCenterLine, 200);
    stroke(0, 0, 255);
    line(0, 210, xCenterLine, 210);
    
    strokeWeight(5);
    stroke(0, 0, 0);
    arc(xCenter, 190, 360, 360, PI, TWO_PI);
    arc(xCenter, 190, 260, 260, PI, TWO_PI);
    arc(xCenter, 190, 160, 160, PI, TWO_PI);
    arc(xCenter, 190, 60, 60, PI, TWO_PI);
    //
    stroke(0, 0, 0);
    arc(xCenter, 220, 360, 360, 0, PI);
    arc(xCenter, 220, 260, 260, 0, PI);
    arc(xCenter, 220, 160, 160, 0, PI);
    arc(xCenter, 220, 60, 60, 0, PI);
    

    if (xCenter == xCenterStop && xCenterLine == xCenterLineStop) {noLoop();return;} 
    
    xCenter += 50;
    if (xCenter >= xCenterStop) 
       xCenter = xCenterStop;
    
    xCenterLine += 50;
     if (xCenterLine >= xCenterLineStop) 
       xCenterLine = xCenterLineStop;*/
    
    
/*
    var pData = allData[matchId].playerData;
    for (i = 0; i < pData.length; i++) {
        if (pData[i].teamID == 0) {
            var totalKillsRatio = 1 - (pData[i].totalKills / 50); 

            var arcLength = totalKillsRatio * (PI * 180);
            var theta = -(arcLength / 180);
            var xValue = (180 * (cos(theta))) + 505;
            var yValue = (180 * (sin(theta))) + 190; 
            ellipse(xValue, yValue, 10, 10);
            console.log("ARC LENGTH: " + arcLength);
            console.log("THETA: " + theta);
        }
        else {
           // continue;
           var totalKillsRatio = (pData[i].totalKills / 50); 

            var arcLength = totalKillsRatio * (PI * 180);
            var theta = (arcLength / 180);
            var xValue = (180 * (cos(theta))) + 505;
            var yValue = (180 * (sin(theta))) + 220; 
            ellipse(xValue, yValue, 10, 10);
            console.log("ARC LENGTH: " + arcLength);
            console.log("THETA: " + theta); 
        }
    }
    */
    //noLoop();
//}


/*function drawVisualization(matchId) {
    //img = loadImage("fathom.jpg");
    //image(img, 0, 0);
    strokeWeight(8);
    stroke(255, 0, 0);
    line(10, 200, 1000, 200);
    stroke(0, 0, 255);
    line(10, 210, 1000, 210);
    
    strokeWeight(5);
    stroke(0, 0, 0);
    arc(505, 190, 360, 360, PI, TWO_PI);
    arc(505, 190, 260, 260, PI, TWO_PI);
    arc(505, 190, 160, 160, PI, TWO_PI);
    arc(505, 190, 60, 60, PI, TWO_PI);
    //
    stroke(0, 0, 0);
    arc(505, 220, 360, 360, 0, PI);
    arc(505, 220, 260, 260, 0, PI);
    arc(505, 220, 160, 160, 0, PI);
    arc(505, 220, 60, 60, 0, PI);

    var pData = allData[matchId].playerData;
    for (i = 0; i < pData.length; i++) {
        if (pData[i].teamID == 0) {
            var totalKillsRatio = 1 - (pData[i].totalKills / 50); 

            var arcLength = totalKillsRatio * (PI * 180);
            var theta = -(arcLength / 180);
            var xValue = (180 * (cos(theta))) + 505;
            var yValue = (180 * (sin(theta))) + 190; 
            ellipse(xValue, yValue, 10, 10);
            console.log("ARC LENGTH: " + arcLength);
            console.log("THETA: " + theta);
        }
        else {
           // continue;
           var totalKillsRatio = (pData[i].totalKills / 50); 

            var arcLength = totalKillsRatio * (PI * 180);
            var theta = (arcLength / 180);
            var xValue = (180 * (cos(theta))) + 505;
            var yValue = (180 * (sin(theta))) + 220; 
            ellipse(xValue, yValue, 10, 10);
            console.log("ARC LENGTH: " + arcLength);
            console.log("THETA: " + theta); 
        }
    }
    //noLoop();
}*/


function loadData() {
	
	//getMatchInformation('raptorship'); 
    
	getMatchInformation('raptorship').then(function(response) {
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
	var gameBaseVariantID = [];
	var gameVariantID = [];

	for (i = 0; i < results.length; i++) {
		//matchID[i] = results[i].Id.MatchId;
		//mapID[i] = results[i].MapVariant.ResourceId; 
        var obj = {matchID: results[i].Id.MatchId,
                   mapID: results[i].MapVariant.ResourceId,
                   gameVariantID: results[i].GameVariant.ResourceId};     
        allData.push(obj);
        //if (i == 1)
           // break;
		//gameBaseVariantID[i] = results[i].GameBaseVariantId; //Arena
		//gameVariantID[i] = results[i].GameVariant.ResourceId; //Slayer, CTF, etc...
		//console.log("MatchID:" + matchID[i]);
        console.log("mapID:" + allData[i].mapID);
	}
}


function getGameVariantInformation(gameVariantID) {
	console.log("game count: " + gameVariantID.length); 
    console.log("getGameVariantInformation enter");
    var p = [];
    for (x = 0; x < gameVariantID.length; x++) {
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
    for (i = 0; i < allData.length; ++i) {
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
	for (x = 0; x < mapID.length; x++) {
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
    for (i = 0; i < allData.length; ++i) {
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
	for(x = 0; x < mdata.length; x++) {
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
    for (i = 0; i < allData.length; i++) {
        if (allData[i].gameVariantID == data.GameVariantId) {
            for (x = 0; x < data.PlayerStats.length; x++) {
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
        console.log("GetTotalKills: Mtachnumber is incorrect: " + matchNumber + "," + n);
    }
    
    var pData = allData[matchNumber-1];
    
	for (i = 0; i < pData.length; i++) {
		if (pData[i].TeamId == 0) {/* blue team */
			blueTeam.push(pData[i]);
		}
		else {
           redTeam.push(pData[i]); 
        }
	}
	return {Blue: blueTeam, Red: redTeam}
}



/*
function setupNavMenu()
{
    var str = "<b> <u> Match IDs </u> </b> <br>";
    var labelClass =  'class=\"labelClass\"';
    
    for (i = 0; i < allData.length; i++) {
        //var id = allData[i].matchID;
        str += '<label ' + labelClass + ' onclick=\'navClick("' + i + '")\'>' + "Match " + i + "</label> <br>";
    }
    document.getElementById("myNav").innerHTML = str;
}
*/

function getMapImage(mapName) {
    if (mapName == "Empire")
        n = "Empire";
    else if (mapName == "Fathom")
        n = "Fathom";
    else if (mapName == "The Rig")
        n = "Rig";
    else if (mapName == "Riptide")
        n = "RipTide";
    else if (mapName == "Torque")
        n = "Torque";
    else if (mapName == "Tyrant")
        n = "Tyrant";
    else 
        n = "Riptide";
    return(n);
}

function setupNavMenu() {
    var str = "<tr>";
    var th = "";

    for (i = 0; i < allData.length; i++) {
        var im = getMapImage(allData[i].mapName);

        th += "<th>" + allData[i].mapName + "</th>";
        str += "<td>" + 
                '<img src='
                + '"../../../' + im + '.jpg"' 
                + 'alt="Match 0" style="width:100px;height:100px;border:0"'
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
}

function showPlayerDetails(matchId) {
    redTeam = document.getElementById("playerDetailsRedTeam");
    blueTeam = document.getElementById("playerDetailsBlueTeam");

    var strRed = "<tr> \
            <th>Gamer Tag</th> \
            <th>Total Kills</th> \
            <th>Total Deaths</th> \
            <th>Total Headshots</th> \
            <th>Total Assists</th>\
            </tr>"
    var strBlue = "<tr> \
            <th>Gamer Tag</th> \
            <th>Total Kills</th> \
            <th>Total Deaths</th> \
            <th>Total Headshots</th> \
            <th>Total Assists</th>\
            </tr>"

    pData = allData[matchId].playerData;        
    for (var i = 0; i < pData.length; i++) {
        if (pData[i].teamID == 0) {
            strRed += "<tr> <td>" + pData[i].gamerTag + "</td>" +
                      "<td>" + pData[i].totalKills + "</td>" +
                      "<td>" + pData[i].totalDeaths + "</td>" +
                      "<td>" + pData[i].totalHeadshots + "</td>" +
                      "<td>" + pData[i].totalAssists + "</td> </tr>";
        }
        else {
            strBlue += "<tr> <td>" + pData[i].gamerTag + "</td>" +
                      "<td>" + pData[i].totalKills + "</td>" +
                      "<td>" + pData[i].totalDeaths + "</td>>" +
                      "<td>" + pData[i].totalHeadshots + "</td>" +
                      "<td>" + pData[i].totalAssists + "</td> </tr>";
        }
    }

    redTeam.innerHTML = strRed;
    blueTeam.innerHTML = strBlue;
}

