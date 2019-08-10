var Blynk = require('blynk-library');

var AUTH = 'T31H4HONHz5ou6cmPHVS3twRMJtkq2Jq';

const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

var blynk = new Blynk.Blynk(AUTH, options = {
  connector : new Blynk.TcpClient()
});
var term = new blynk.WidgetTerminal(3);
const si = require('systeminformation');
var v1 = new blynk.VirtualPin(1);
var v9 = new blynk.VirtualPin(9);

si.cpu(function(data) {
    console.log('CPU Information:');
    console.log('- manufucturer: ' + data.manufacturer);
    console.log('- brand: ' + data.brand);
    console.log('- speed: ' + data.speed);
    console.log('- cores: ' + data.cores);
    console.log('- physical cores: ' + data.physicalCores);
    console.log('...');

})




v1.on('write', function(param) {
  console.log('V1:', param[0]);
  si.cpuTemperature(function(data) {
      term.write('CPU Temperature: ' + data.main+ '\n');
  })
});

v9.on('read', function() {
  v9.write(new Date().getSeconds());
});


term.on('write', function(data) {
  if(data=='temp'){
    //term.write('65' + '\n');
    si.cpuTemperature(function(data) {
        term.write('CPU Temperature: ' + data.main+ '\n');
    })
  }
  //term.write('You wrote:' + data + '\n');
  //term.write('You wrote1:' + data + '\n');
  //blynk.notify("HAHA! " + data);
  //v9.write(data);
  //console.log(data[0]);
});

var minutes = 0.5, the_interval = minutes * 60 * 1000;
setInterval(function() {
  //var xtemp;
  si.cpuTemperature(function(data) {
    //xtemp=data.main;
    //console.log(typeof(data.main));
    term.write('CPU Temperature: ' + data.main+ '\n');
    if(data.main>55){
      blynk.notify('CPU Temp warning. Current temp is: ' + data.main);
    }
  })

  console.log("I am doing my check");
  //blynk.notify('CPU Temp warning. Current temp is: ' + xtemp);
  //term.write("I am doing my 1 minutes check"+ '\n');
  // do your stuff here
}, the_interval);
// //S9743595211
