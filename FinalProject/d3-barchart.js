
function drawBarchart() {
   //var data = [4,8,15,16,23,42];
   clearBarchart(); 
   var statNames = ["Kills", "Deaths", "Assists", "Heads", "Kills", "Deaths", "Assists", "Heads"];
   var dataset = totalStats(); 
   var data1 = dataset.redTeam; 
   var data2 = dataset.blueTeam;
   var data = [data1.kills, data1.deaths, data1.assists, data1.headshots, 
               data2.kills, data2.deaths, data2.assists, data2.headshots]; 

   var xScale = d3.scale.linear()
                    .domain([0,d3.max(data)])
                    .range([0,420]);
    var d = d3.select(".chart")
        .selectAll("div")
        .data(data)
        .enter().append("div")
        .attr("class", "div-d3")
        //.style("width",function(d) {return xScale(d) + "px";})
        .style("height", "20px")
        .style("width","10px")
        .style("opacity",0)
        .attr("font-family", "sans-serif")
        .attr("font-size", "6px")
        .style("background-color", function(d, i) {if(i <=3) return "red"; else return "blue";})
        //.text(function(d) {return d;})
        .on("mouseover",function() {d3.select(this).
                                        transition().
                                        duration(300).
                                        style("background-color","#FFD700");})
        .on("mouseout",function() {d3.select(this).
                                        transition().
                                        duration(300).
                                        style("background-color", 
                                            function(d, i) {console.log(i); if(i <=3) return "red"; else return "blue";})})
        .transition()
            .delay(function(d,i) {return i * 100;})
            .duration(1000)
            //.style("width",function(d) {return(d*150) + "px";})
            .style("width",function(d) {return xScale(d) + "px";})
            .style("opacity",1)
            .text(function(d,i) {

                return statNames[i] + ": " + d;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "6px");
    
}

function totalStats() {
    var totalStatsRed = {kills:0, deaths: 0, assists: 0, headshots: 0};
    var totalStatsBlue = {kills:0, deaths: 0, assists: 0, headshots: 0};

    for (var i = 0; i < redTeam.length; i++) {
        totalStatsRed.kills += redTeam[i].totalKills;
        totalStatsRed.deaths += redTeam[i].totalDeaths; 
        totalStatsRed.assists += redTeam[i].totalAssists; 
        totalStatsRed.headshots += redTeam[i].totalHeadshots; 
        //---------
        totalStatsBlue.kills += blueTeam[i].totalKills;
        totalStatsBlue.deaths += blueTeam[i].totalDeaths; 
        totalStatsBlue.assists += blueTeam[i].totalAssists; 
        totalStatsBlue.headshots += blueTeam[i].totalHeadshots; 
    }

    console.log("TOTAL STATS: " + totalStatsRed);

    return {redTeam: totalStatsRed, blueTeam: totalStatsBlue};
}

function clearBarchart() {
    d3.selectAll(".div-d3").remove();

}