var blueTeam = []; 
var redTeam = [];

var drawFlag = false; 
var enableDraw = false;

var username;

function initSetup() {
    loadData1(); 
}

var empireImg; 

function loadData1() {
    loadImage("file:///Users/Mihir/Documents/Test2/FinalProject/Tyrant.jpg", function(img1){

    });   
	 
}

var end1;  
var end2; 
var end1Stop;
var end2Stop;

var matchId;

//resets variables for drawing purposes
function initRunAnimate(id) {
    matchId = id;
    sortPlayerStats(id);
    //drawBarchart(); 
    clearBarchart(); 
    end1 = PI; end2 = 0;
    end1Stop = TWO_PI; end2Stop = PI;
    enableDraw = true;
    drawFlag = false;
    //if (id==1)
    //  {clear();return;}
    clear();
    //image(empireImg, 0, 0, empireImg.width = 1200, empireImg.height/2.7);
    //drawVisualizationAnimate();
    loop();
}

function draw() {
    if (!loadDataDone || !enableDraw) return; 
    console.log("draw");
	//ellipse(50, 50, 80, 80);
	//pausecomp(60000);
    console.log(end1); 
    drawVisualizationAnimate();
}

//draws p5 viz
function drawVisualizationAnimate() {
    //if (end1 <= TWO_PI) {
    if(drawFlag == false) {
        drawVisualization(); 
    } else {
        noLoop(); 

        //drawVisualization(); 

        redTeamPlotKills(); 
        redTeamPlotDeaths(); 
        redTeamPlotAssists(); 
        redTeamPlotHeadshots();
        //---------------------- 
        blueTeamPlotKills(); 
        blueTeamPlotDeaths(); 
        blueTeamPlotAssists(); 
        blueTeamPlotHeadshots();

        var name = allData[matchId].gameVariantName;
        var description1 = allData[matchId].gameDescription;
        var description2 = description1.slice(25, description1.length);
        description1 = description1.slice(0, 25);

        textSize(14);
        text(name, 0, 25);
        textSize(10);
        text(description1, 0, 50);
        text(description2, 0, 60);

        stroke(0);
        fill(128, 128, 128);
        rect(0, 290, 10, 10);
        stroke(0);
        fill(255);
        textSize(8);
        text(" KILLS", 10, 300);

        stroke(0);
        fill(77, 77, 77);
        rect(0, 305, 10, 10);
        stroke(0);
        fill(255);
        textSize(8);
        text(" DEATHS", 10, 315);

        stroke(0);
        fill(51, 51, 51);
        rect(0, 320, 10, 10);
        stroke(0);
        fill(255);
        textSize(8);
        text(" ASSISTS", 10, 330);

        stroke(0);
        fill(26, 26, 26);
        rect(0, 335, 10, 10);
        stroke(0);
        fill(255);
        textSize(8);
        text(" HEADSHOTS", 10, 345);


        //showPlayerDetails(matchId); 

        //noLoop(); 
    }
}


function drawVisualization() {
//setup arcs and basic template for VIZ
    strokeWeight(5);
    stroke(105,105,105);
    noFill(); 
    
    end1 += .05;
    end2 += .05;
    if (end1 >= end1Stop || end2 >= end2Stop) {
        end1 = end1Stop;
        end2 = end2Stop;
        drawFlag = true;
        console.log("DrawFlag: true");
    }

    stroke(128, 128, 128);
    arc(340, 195, 450, 350, PI, end1);
    stroke(77, 77, 77);
    arc(340, 195, 390, 290, PI, end1);
    stroke(51, 51, 51);
    arc(340, 195, 330, 230, PI, end1);
    stroke(26, 26, 26);
    arc(340, 195, 270, 170, PI, end1); 

    stroke(128, 128, 128);
    arc(340, 205, 450, 350, 0, end2);
    stroke(77, 77, 77);
    arc(340, 205, 390, 290, 0, end2);
    stroke(51, 51, 51);
    arc(340, 205, 330, 230, 0, end2);
    stroke(26, 26, 26);
    arc(340, 205, 270, 170, 0, end2);

    strokeWeight(4);
    stroke(255, 0, 0);
    line(80, 195, 600, 195);
    stroke(0, 0, 255);
    line(80, 205, 600, 205);

}

//sorts players by teamID
function sortPlayerStats(matchId) {

    //var teamID = allData[0].playerData[0].teamID; 
    //console.log("TEAM ID FOR PLAYER 0: " + teamID);
    redTeam = [];
    blueTeam = [];
    var i = matchId;
    for (var x = 0; x < allData[i].playerData.length; x++) {
        var teamID = allData[i].playerData[x].teamID; 

        if (teamID == 1) {
            blueTeam.push(allData[i].playerData[x]); 
        } else if (teamID == 0) {
            redTeam.push(allData[i].playerData[x]); 
        }
    }

    for (var y = 0; y < blueTeam.length; y++) {
        console.log("BLUE TEAM: "); 
        console.log(blueTeam[y]); 
    }
    for (var z = 0; z < redTeam.length; z++){
        console.log("RED TEAM: " );
        console.log(redTeam[z]); 
    }
}


function redTeamPlotKills() {
    var kills = []; 

    for (var i = 0; i < redTeam.length; i++) {
        console.log("RED TEAM: " + redTeam[i].gamerTag);
        var totalKillsRatio = 1 - ((redTeam[i].totalKills * 2.2) / 50); 
        var arcLength = totalKillsRatio * (PI * 225);
        var theta = -(arcLength / 225);
        var xValue = (225 * (cos(theta))) + 340;
        var yValue = (175 * (sin(theta))) + 195; 
        fill(255, 0, 0);
        stroke(255, 0, 0);

        if (redTeam[i].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(kills, redTeam[i].totalKills); 
        kills[i] = redTeam[i].totalKills;

        if (compareResult) {
            xValue += 20;
        }

        //text(i+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalKillsRatio);

        //noLoop(); 
    }
}

function redTeamPlotDeaths() {
    var deaths = []; 

    for (var x = 0; x < redTeam.length; x++) {
        console.log("RED TEAM: " + redTeam[x].gamerTag);
        var totalDeathsRatio = 1 - ((redTeam[x].totalDeaths) / 20); 
        var arcLength = totalDeathsRatio * (PI * 195);
        var theta = -(arcLength / 195);
        var xValue = (195 * (cos(theta))) + 340;
        var yValue = (145 * (sin(theta))) + 195; 
        fill(255, 0, 0);
        stroke(255, 0, 0);

        if (redTeam[x].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else   
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(deaths, redTeam[x].totalDeaths); 
        deaths[x] = redTeam[x].totalDeaths;

        if (compareResult) {
            xValue += 20;
        }

        //text(x+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalDeathsRatio);

        //noLoop(); 
    }
}
function redTeamPlotAssists() {
    var assists = []; 

    for (var z = 0; z < redTeam.length; z++) {
        console.log("RED TEAM: " + redTeam[z].gamerTag);
        var totalAssistsRatio = 1 - ((redTeam[z].totalAssists) / 12); 
        var arcLength = totalAssistsRatio * (PI * 165);
        var theta = -(arcLength / 165);
        var xValue = (165 * (cos(theta))) + 340;
        var yValue = (115 * (sin(theta))) + 195; 
        fill(255, 0, 0);
        stroke(255, 0, 0);

        if (redTeam[z].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(assists, redTeam[z].totalAssists); 
        assists[z] = redTeam[z].totalAssists;

        if (compareResult) {
            xValue += 20;
        }

        //text(z+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalAssistsRatio);

        //noLoop(); 
    }
}

function redTeamPlotHeadshots() {
var headshots = [];

    for (var a = 0; a < redTeam.length; a++) {
        console.log("RED TEAM: " + redTeam[a].gamerTag);
        var totalHeadshotsRatio = 1 - ((redTeam[a].totalHeadshots) / 25); 
        console.log("Ratio Headshots: " + totalHeadshotsRatio);
        var arcLength = totalHeadshotsRatio * (PI * 135);
        var theta = -(arcLength / 135);
        var xValue = (135 * (cos(theta))) + 340;
        var yValue = (85 * (sin(theta))) + 195; 
        fill(255, 0, 0);
        stroke(255, 0, 0);

        if (redTeam[a].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(headshots, redTeam[a].totalHeadshots); 
        headshots[a] = redTeam[a].totalHeadshots;

        if (compareResult) {
            xValue += 20;
        }

        //text(a+1, xValue + 10, yValue);

        console.log("RATIO: " + totalHeadshotsRatio);

        //noLoop(); 
    }
}

function blueTeamPlotKills() {
    var kills = []; 

    for (var i = 0; i < blueTeam.length; i++) {
        console.log("RED TEAM: " + blueTeam[i].gamerTag);
        var totalKillsRatio = 1 - ((blueTeam[i].totalKills * 2.2) / 50); 
        var arcLength = totalKillsRatio * (-PI * 225);
        var theta = -(arcLength / 225);
        var xValue = (225 * (cos(theta))) + 340;
        var yValue = (175 * (sin(theta))) + 205; 
        fill(0, 0, 255);
        stroke(0, 0, 255);

        if (blueTeam[i].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(kills, blueTeam[i].totalKills); 
        kills[i] = blueTeam[i].totalKills;

        if (compareResult) {
            xValue += 20;
        }

        //text(i+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalKillsRatio);

        //noLoop(); 
    }
}

function blueTeamPlotDeaths() {
    var deaths = []; 

    for (var x = 0; x < blueTeam.length; x++) {
        console.log("RED TEAM: " + blueTeam[x].gamerTag);
        var totalDeathsRatio = 1 - ((blueTeam[x].totalDeaths) / 20); 
        var arcLength = totalDeathsRatio * (-PI * 195);
        var theta = -(arcLength / 195);
        var xValue = (195 * (cos(theta))) + 340;
        var yValue = (145 * (sin(theta))) + 205; 
        fill(0, 0, 255);
        stroke(0, 0, 255);

        if (blueTeam[x].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(deaths, blueTeam[x].totalDeaths); 
        deaths[x] = blueTeam[x].totalDeaths;

        if (compareResult) {
            xValue += 20;
        }

        //text(x+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalDeathsRatio);

        //noLoop(); 
    }
}
function blueTeamPlotAssists() {
    var assists = []; 

    for (var z = 0; z < blueTeam.length; z++) {
        console.log("RED TEAM: " + blueTeam[z].gamerTag);
        var totalAssistsRatio = 1 - ((blueTeam[z].totalAssists) / 12); 
        var arcLength = totalAssistsRatio * (-PI * 165);
        var theta = -(arcLength / 165);
        var xValue = (165 * (cos(theta))) + 340;
        var yValue = (115 * (sin(theta))) + 205; 
        fill(0, 0, 255);
        stroke(0, 0, 255);

        if (blueTeam[z].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(assists, blueTeam[z].totalAssists); 
        assists[z] = blueTeam[z].totalAssists;

        if (compareResult) {
            xValue += 20;
        }

        //text(z+1 /*redTeam[i].gamerTag*/, xValue + 10, yValue);

        console.log("RATIO: " + totalAssistsRatio);

        //noLoop(); 
    }
}

function blueTeamPlotHeadshots() {
var headshots = [];

    for (var a = 0; a < blueTeam.length; a++) {
        console.log("RED TEAM: " + blueTeam[a].gamerTag);
        var totalHeadshotsRatio = 1 - ((blueTeam[a].totalHeadshots) / 25); 
        console.log("Ratio Headshots: " + totalHeadshotsRatio);
        var arcLength = totalHeadshotsRatio * (-PI * 135);
        var theta = -(arcLength / 135);
        var xValue = (135 * (cos(theta))) + 340;
        var yValue = (85 * (sin(theta))) + 205; 
        fill(0, 0, 255);
        stroke(0, 0, 255);

        if (blueTeam[a].gamerTag == username) {ellipse(xValue, yValue, 15, 15);}
        else 
            ellipse(xValue, yValue, 10, 10);
        textSize(12);
        noFill();
        strokeWeight(1); 
        stroke(0);
        fill(255); 

        var compareResult = compareKills(headshots, blueTeam[a].totalHeadshots); 
        headshots[a] = blueTeam[a].totalHeadshots;

        if (compareResult) {
            xValue += 20;
        }

        //text(a+1, xValue + 10, yValue);

        console.log("RATIO: " + totalHeadshotsRatio);

        //noLoop(); 
    }
}

function compareKills(compareArray, currentValue) {
    for (var x = 0; x < compareArray.length; x++) {
        if (currentValue == compareArray[x]) {
            return true; 
        } 
    }

    return false; 
}


	




