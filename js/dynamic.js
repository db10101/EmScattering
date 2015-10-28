var counter = 0;
var limit = 100;
var epsilon = [];
var mu = [];
var length = [];
var crystal;

function quickDraw() {
     addNumLayers('dynamicInput', 3);
     fillSampleValues();
     buildCrystal();
     printChart('linechart2_material', 900, 500);
}

function addStruct(x, color, width, height) {
     var overlayDiv = "<div class='overlay"+x+"'><svg width='"+width+"' height='"+height+"'><defs><pattern id='pattern-stripe' width='4' height='4' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'><rect width='2' height='4' transform='translate(0,0)' fill='white'></rect></pattern><mask id='mask-stripe'><rect x='0' y='0' width='100%' height='100%' fill='url(#pattern-stripe)' /></mask></defs><rect class='struct rect" + x + "' width='500' height='500' fill='" + color + "'></svg></div>"
    $(".addHere").append(overlayDiv);
}

function addStruct1() {
     addStruct(3, 'red', 100, 300);

}

function addNumLayers(divName, numInputs){
     numberOfLayers = parseInt(numInputs) + 2;
     if(counter<numberOfLayers) {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Layer " + (counter + 1) + " <br><b>Epsilon:</b> <input type='text' id='e"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Mu:</b> <input type= 'text' id = 'm"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Length:</b> <input type = 'text' id = 'l"+counter +"'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
          if(counter<numberOfLayers)
               addNumLayers(divName, numInputs);

     }
     var myElements = document.querySelectorAll(".hiddenButtons");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }
}
function fillSampleValues() {
     eps = [1,5,10,5,1];
     muu = [1,10,1,10,1];
     leng = [6,3,3,3,6];
     om = 1;
     kk1 = .2;
     kk2 = .4;
     jj1 = 1;
     jj2 = 0;
     jj3 = -1;
     jj4 = 0;
     numberOfLayers = parseInt(numOfLayers) + 2;
     for(var i = 0; i < numberOfLayers; i++) {
          document.getElementById("e"+i).value = eps[i];
          document.getElementById("m"+i).value = muu[i];
          document.getElementById("l"+i).value = leng[i];
     }
     document.getElementById("omega").value = om;
     document.getElementById("k1").value = kk1;
     document.getElementById("k2").value = kk2;
     document.getElementById("j1").value = jj1;
     document.getElementById("j2").value = jj2;
     document.getElementById("j3").value = jj3;
     document.getElementById("j4").value = jj4;
}
function printChart(divName, width, height) {
     var o = parseFloat(document.getElementById("omega").value);
     var k1 = parseFloat(document.getElementById("k1").value);
     var k2 = parseFloat(document.getElementById("k2").value);
     var j1 = parseFloat(document.getElementById("j1").value);
     var j2 = parseFloat(document.getElementById("j2").value);
     var j3 = parseFloat(document.getElementById("j3").value);
     var j4 = parseFloat(document.getElementById("j4").value);
     console.log("o:"+o+" k1:"+k1+" k2:"+k2+" j1:"+j1+" j2:"+j2+" j3:"+j3+" j4:"+j4);
     crystal1 = new emScattering.PhotonicStructure1D(epsilon, mu, length);

     //fields = crystal1.determineField(1, .2, .4, [1,0,-1,0]);
     fields = crystal1.determineField(o, k1, k2, [j1, j2, j3, j4]);
     interfaces = crystal1.materialInterfaces();
     hAx = parseInt(fields.z[fields.z.length-1]);
     console.log(hAx)
     var data = new google.visualization.DataTable();
     data.addColumn('number', 'z');
     data.addColumn('number', document.getElementById("shownVal").value);
     //Iterate through fields values 

     for(var i = 0, N = fields.z.length; i < N; i++) {
          if(document.getElementById("shownVal").value=='Ex') {
               data.addRows([
                    [fields.z[i], fields.Ex[i]]
                    ]);
          }
          if(document.getElementById("shownVal").value=='Ey') {
               data.addRows([
                    [fields.z[i], fields.Ey[i]]
                    ]);
          }
          if(document.getElementById("shownVal").value=='Hx') {
               data.addRows([
                    [fields.z[i], fields.Hx[i]]
                    ]);
          }
          if(document.getElementById("shownVal").value=='Hy') {
               data.addRows([
                    [fields.z[i], fields.Hy[i]]
                    ]);
          }
          console.log(fields.z[i]+" "+fields.Ex[i]+" "+fields.Ey[i]+" "+fields.Hx[i] +" "+fields.Hy[i]);
     }

     var options = {
        chart: {
          title: document.getElementById("shownVal").value+ ' Values in Relation to Z'
        },
        width: width,
        height: height,
        vAxis: { gridlines: { count: hAx } },
        hAxis: { gridlines: { count: hAx } }

        };

     function printInterfaces(dataTable) {
          var cli = this.getChartLayoutInterface();
          var chartArea = cli.getChartAreaBoundingBox();
          var cols = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
          var w = cli.getXLocation(interfaces[1]) - cli.getXLocation(interfaces[0]);
          var y = cli.getYLocation(-1) - cli.getYLocation(1);
          console.log(interfaces);
          console.log("w:"+w);
          console.log("y:"+y);
          for (var i = 0; i < interfaces.length-1; i++) {
               var w = cli.getXLocation(interfaces[i+1])-cli.getXLocation(interfaces[i]);
               addStruct(i, cols[i%5], w, y);
               document.querySelector('.overlay'+i).style.position = 'absolute';
               document.querySelector('.overlay'+i).style.opacity = '.5';
               document.querySelector('.overlay'+i).style.top = Math.floor(cli.getYLocation(1)) + 300 + "px";
               document.querySelector('.overlay'+i).style.left = Math.floor(cli.getXLocation(interfaces[i])) + 180 + "px";
          };



     }

     var chart = new google.visualization.LineChart(document.getElementById(divName));
     google.visualization.events.addListener(chart, 'ready', printInterfaces.bind(chart, data));
     //var chart = new google.charts.Line(document.getElementById('linechart_material'));
     chart.draw(data, options);


}
function getIncomingMode() {
     omega = document.getElementById("omega").value;
     k1 = document.getElementById("k1").value;
     k2 = document.getElementById("k2").value;
     incoming = crystal.incomingModes(omega, k1, k2);
     mBack1x = incoming[0].eigenvalue.x;
     mBack1y = incoming[0].eigenvalue.y;
     mBack2x =  incoming[1].eigenvalue.x;
     mBack2y = incoming[1].eigenvalue.y;
     mFor1x = incoming[2].eigenvalue.x;
     mFor1y = incoming[2].eigenvalue.y;
     mFor2x = incoming[3].eigenvalue.x;
     mFor2y = incoming[3].eigenvalue.y;

     var newdiv = document.createElement('div');
     var newdiv2 = document.createElement('div');
     newdiv.innerHTML = "<u>"+mFor1x+"x + "+mFor1y+"iy<br> "+mFor2x+"x + "+mFor2y+"iy</u>";
     newdiv2.innerHTML = "<u>"+mBack1x+"x + "+mBack1y+"iy<br> "+mBack2x+"x + "+mBack2y+"iy</u>";
     document.getElementById("forwardModes").appendChild(newdiv);
     document.getElementById("backwardModes").appendChild(newdiv2);
     //emScattering.printModes(incoming);

     var myElements = document.querySelectorAll("#hiddenModes");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }

}


function buildCrystal() {
     layers = parseInt(numOfLayers) + 2;

     for(var i = 0; i < layers; i++){
          epsilon[i] = parseInt(document.getElementById("e"+i).value);
          mu[i] = parseInt(document.getElementById("m"+i).value);
          length[i] = parseInt(document.getElementById("l"+i).value);
     }
     var myElements = document.querySelectorAll(".hiddentab");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }
     console.log(epsilon);
     console.log(mu);
     console.log(length);
     crystal = new emScattering.PhotonicStructure1D(epsilon, mu, length);
     alert("Variables assigned. Crystal created; layers including ambients = "+layers);
}
     

 