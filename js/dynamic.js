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
     printFieldsChart('linechart2_material', 900, 500);
     getIncomingMode();
     printDispersionChart('dispersionChart', 900, 500);
     printTransmissionChart('transmissionChart', 900, 500);

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function addStruct(x, color, width, height) {

     var overlayDiv = "<div class='overlay"+x+"'><svg width='"+width+"' height='"+height+"'><defs><pattern id='pattern-stripe' width='4' height='4' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'><rect width='2' height='4' transform='translate(0,0)' fill='white'></rect></pattern><mask id='mask-stripe'><rect x='0' y='0' width='100%' height='100%' fill='url(#pattern-stripe)' /></mask></defs><rect class='struct rect" + x + "' width='500' height='500' fill='" + color + "'></svg></div>"
    $(".addHere").append(overlayDiv);
}

function addStruct1() {
     addStruct(3, 'red', 100, 300);

}

function addNumLayers2(divName, numInputs) {
  numberOfLayers = parseInt(numInputs) + 2;
  var layersToAdd = numberOfLayers;
  if(counter<layersToAdd) {
    if(counter==0) {

      // document.getElementsByClassName("h"+counter).remove();
      $("#h"+counter).remove();
      var newdiv = document.createElement('div');
      newdiv.innerHTML = "<div id='h"+counter+"'>Ambient Left " + " <br><b>Epsilon:</b> <input type='text' size='6' id='e"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Mu:</b> <input type= 'text' size='6'  id = 'm"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Length:</b> <input type = 'text' size='6' id = 'l"+counter +"'></div>";
      document.getElementById(divName).appendChild(newdiv);         
      counter++;
      addNumLayers2(divName, numInputs);
    } else if((counter+1)<layersToAdd) {
      $("#h"+counter).remove();
      // document.getElementsByClassName("h"+counter).remove();
      var newdiv = document.createElement('div');
      newdiv.innerHTML = "<div id='h"+counter+"'>Layer" + (counter) + " <br><b>Epsilon:</b> <input type='text' size='6' id='e"+counter+"' class='e"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Mu:</b> <input type= 'text' size='6'  id = 'm"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Length:</b> <input type = 'text' size='6' id = 'l"+counter +"'> </div>";
      document.getElementById(divName).appendChild(newdiv);
      counter++;
      addNumLayers2(divName, numInputs);
    } else if((counter+1)==layersToAdd) {
      // document.getElementsByClassName("h"+counter).remove();
      $("#h"+counter).remove();
      var newdiv = document.createElement('div');
      newdiv.innerHTML = "<div id='h"+counter+"'>Ambient Right" + " <br><b>Epsilon:</b> <input type='text' size='6' id='e"+counter+"' class='e"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Mu:</b> <input type= 'text' size='6'  id = 'm"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Length:</b> <input type = 'text' size='6' id = 'l"+counter +"'> </div>";
      document.getElementById(divName).appendChild(newdiv);
      counter = 0;
    }
  }
}

function addNumLayers(divName, numInputs){
     numberOfLayers = parseInt(numInputs) + 2;
     if(counter<numberOfLayers) {

          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Layer " + (counter + 1) + " <br><b>Epsilon:</b> <input type='text' size='6' id='e"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Mu:</b> <input type= 'text' size='6'  id = 'm"+ counter +"'> &nbsp;&nbsp;&nbsp; <b>Length:</b> <input type = 'text' size='6' id = 'l"+counter +"'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
          if(counter<numberOfLayers) {
            addNumLayers(divName, numInputs);
          }

               
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


function printTransmissionChart(divName, width, height) {


     var crystal = new emScattering.PhotonicStructure1D(epsilon, mu, length);
     var k1 = parseFloat(document.getElementById("k1").value);
     var k2 = parseFloat(document.getElementById("k2").value);
     var omegLow = document.getElementById("oLow").value;
     var omegHigh = document.getElementById("oHi").value;
     var kZsList = [];
     var kZs = document.getElementById("kzList").value;
     for(var i = 0; i < kZs.length; i++) {
      console.log(kZs.charAt(i));
      if(isNumeric(kZs.charAt(i))) {
        var str = ""+kZs.charAt(i);
        kZsList.push(parseInt(str));
      }
     }
     console.log(kZsList);
     var transmissionGraph = crystal.transmission(kZsList, k1, k2, omegLow, omegHigh, 100);
     var data = new google.visualization.DataTable();
      data.addColumn('number', 'omega');
      for(var i = 0; i < transmissionGraph.kzList.length; i++){
        data.addColumn('number', 'kz'+transmissionGraph.kzList[i]);
      }
      var dataArray = new Array(transmissionGraph.omegaRange.length);
      for(var i = 0; i < dataArray.length; i++)
      {
        dataArray[i] = new Array(transmissionGraph.kzList.length);
      }

      for(var i = 0; i < transmissionGraph.omegaRange.length; i++) {
        dataArray[i][0] = transmissionGraph.omegaRange[i];
        for(var j = 1; j <= transmissionGraph.kzList.length; j++) {
          dataArray[i][j] = transmissionGraph.transmissionCoeffArrays[j-1][i];
        }
      }


      for(var i = 0; i<dataArray.length; i++){
        data.addRows([
          dataArray[i]
          ]);
      }
      var options = {
        chart: {
          title: 'dispersion relationship'
        },
        chartArea: {
          left: 40,
          top: 5
        },
        width: width,
        height: height
      };

      var chart = new google.visualization.LineChart(document.getElementById(divName));

      chart.draw(data, options);
      console.log(dataArray[0][1]);
      //emScattering.printDispersion(dispersion);

      var myElements = document.querySelectorAll(".hiddenChart1");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }

    

}

function printDispersionChart(divName, width, height) {

     var range = document.getElementById("range").value;
     var crystal = new emScattering.PhotonicStructure1D(epsilon, mu, length);
     var k1 = parseFloat(document.getElementById("k1").value);
     var k2 = parseFloat(document.getElementById("k2").value);
     dispersion = crystal.dispersionRelationship(k1,k2,range,100);
     var data = new google.visualization.DataTable();
      data.addColumn('number', 'kz');
      for(var i = 0; i < dispersion.layersDispersions.length; i++){
        data.addColumn('number', 'Layer'+i);
      }
      var dataArray = new Array(dispersion.kz.length) ;
      for(var i = 0; i < dataArray.length; i++)
      {
        dataArray[i] = new Array(dispersion.layersDispersions.length+1);
      }

      for (var i = 0; i< dispersion.kz.length; i++) {
        dataArray[i][0]= dispersion.kz[i];
        for(var j = 1; j<dispersion.layersDispersions.length+1; j++){
          dataArray[i][j]=dispersion.layersDispersions[j-1][i];
          //this is where it fails
          //j not including first dispersion 
        }
      }
      for(var i = 0; i<dataArray.length; i++){
        data.addRows([
          dataArray[i]
          ]);
      }
      var options = {
        chart: {
          title: 'dispersion relationship'
        },
        chartArea: {
          left: 40,
          top: 5
        },
        width: width,
        height: height
      };

      var chart = new google.visualization.LineChart(document.getElementById(divName));

      chart.draw(data, options);
      console.log(dataArray[0][1]);
      //emScattering.printDispersion(dispersion);

      var myElements = document.querySelectorAll(".hiddenChart1");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }
}
function printFieldsChart(divName, width, height) {
     var o = parseFloat(document.getElementById("omega").value);
     var k1 = parseFloat(document.getElementById("k1").value);
     var k2 = parseFloat(document.getElementById("k2").value);
     var j1 = parseFloat(document.getElementById("j1").value);
     var j2 = parseFloat(document.getElementById("j2").value);
     var j3 = parseFloat(document.getElementById("j3").value);
     var j4 = parseFloat(document.getElementById("j4").value);

     console.log("o:"+o+" k1:"+k1+" k2:"+k2+" j1:"+j1+" j2:"+j2+" j3:"+j3+" j4:"+j4);
     crystal1 = new emScattering.PhotonicStructure1D(epsilon, mu, length);

     fields = crystal1.determineField(o, k1, k2, [j1, j2, j3, j4]);
     interfaces = crystal1.materialInterfaces();
     
     

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
        }

        };

     function printInterfaces(dataTable) {
          var cli = this.getChartLayoutInterface();
          var chartArea = cli.getChartAreaBoundingBox();
          var cols = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
          var w = cli.getXLocation(interfaces[1]) - cli.getXLocation(interfaces[0]);
          var y = cli.getChartAreaBoundingBox().height;
          console.log(interfaces);
          console.log("w:"+w);
          console.log("y:"+y);
          console.log("gety:" + Math.floor(cli.getYLocation(1)));
          console.log("bounding:" + cli.getChartAreaBoundingBox().top);
          var yBound = cli.getChartAreaBoundingBox().top;
    //       Element.prototype.remove = function() {
    // this.parentElement.removeChild(this);
    // }
    // //allows removal of elements without parents
    // NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    // for(var i = this.length - 1; i >= 0; i--) {
    //     if(this[i] && this[i].parentElement) {
    //         this[i].parentElement.removeChild(this[i]);
    //     }
    //  }
    //  }
          for (var i = 0; i < interfaces.length-1; i++) {
               var w = cli.getXLocation(interfaces[i+1])-cli.getXLocation(interfaces[i]);
               document.getElementsByClassName('overlay'+i).remove();
               addStruct(i, cols[i%5], w, y);
               document.querySelector('.overlay'+i).style.position = 'absolute';
               document.querySelector('.overlay'+i).style.opacity = '.5';
               document.querySelector('.overlay'+i).style.top = Math.floor(cli.getChartAreaBoundingBox().top) + 330 + "px";
               document.querySelector('.overlay'+i).style.left = Math.floor(cli.getXLocation(interfaces[i])) + 20 + "px";
          };



     }

     var chart = new google.visualization.LineChart(document.getElementById(divName));
     google.visualization.events.addListener(chart, 'ready', printInterfaces.bind(chart, data));
     //var chart = new google.charts.Line(document.getElementById('linechart_material'));
     chart.draw(data, options);

     var myElements = document.querySelectorAll(".hiddenChart");
     for (var i = 0; i < myElements.length; i++) {
               myElements[i].style.opacity = 1;
          }

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
     $("#mode1").remove();
     $("#mode2").remove();
     newdiv.innerHTML = "<div id='mode1'><u>"+mFor1x+" + "+mFor1y+"i<br> "+mFor2x+"x + "+mFor2y+"i</u></div>";
     newdiv2.innerHTML = "<div id='mode2'><u>"+mBack1x+" + "+mBack1y+"i<br> "+mBack2x+"x + "+mBack2y+"i</u></div>";
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
     //alert("Variables assigned. Crystal created; layers including ambients = "+layers);
}
     

 