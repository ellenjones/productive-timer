//global variables
var alpha = 0,
 pi = Math.PI;
 totalMinutes = 0;
 loader = document.getElementById('loader');

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

purple = getParameterByName('purple');
green = getParameterByName('green');
yellow = getParameterByName('yellow');



document.getElementById('timeset').addEventListener("load", queryString());

function queryString() {
  console.log('starting querystring');
      if (purple||green||yellow){
        console.log('parameters found in url.');
        console.log('purple: ',purple);
        console.log('green: ',green);
        console.log('yellow: ',yellow)
        setTime();
      }
      else {
        document.getElementById('timeset').style.display = 'block';
        console.log('no parameters in url. continuing.');
      }
    };

//var loader = document.getElementById('loader');

function setTime() {
document.getElementById('timeset').style.display = 'none';
  preTarget = purple;
  target = green;
  postTarget = yellow;
  console.log('preTarget: ' + preTarget, '  target: ' + target, '  postTarget: ' + postTarget);
  
  totalMinutes = (+preTarget) + (+target) + (+postTarget);
  console.log('minutes: ' + totalMinutes);
  
  preTarget = preTarget / totalMinutes;
  target = target / totalMinutes;
  postTarget = postTarget / totalMinutes;
  console.log('fraction of whole circle', preTarget, target, postTarget);

  preTarget = preTarget * 360;
  target = target * 360;
  postTarget = postTarget *360;
  console.log('degrees:', preTarget, target, postTarget);

/*** alphas get their input from here ** */
/*  preTargetStart = 0;
  preTargetStop = preTarget;
  targetStart = preTargetStop;
  targetStop = preTargetStop + target;
  postTargetStart = targetStop;
  postTargetStop = 360; */

  draw('preTarget',0,preTarget);
  draw('target',preTarget,(preTarget + target));
  draw('postTarget',(preTarget + target),360);
  
  timer();
};


function draw(path,startValue,stopValue) {
  console.log('drawing...');
  path = document.getElementById(path);
  console.log('path:',path);
  console.log('start: ' + startValue +' stop: '+ stopValue);
  alpha1 = startValue;
  alpha2 = stopValue;
  var r1 = (alpha1 * pi / 180),
    r2 = (alpha2 * pi / 180),
    xC = Math.sin(r2) * 125,
    yC = Math.cos(r2) * -125,
    xS = Math.sin(r1) * 125,
    yS = Math.cos(r1) * -125,
    mid = (Math.abs((alpha1 - alpha2)) >= 180) ? 1 : 0,
    anim = 'M 0 0 l ' + xS + ' ' + yS + ' A 125 125 1 ' + mid + ' 1 ' + xC + ' ' + yC + ' z';

  path.setAttribute("d", anim);
};


function timer() {
  console.log('starting timer...');
  var t = ((totalMinutes * 1000) / 6); /*divide by 6 to get minutes because 360/60 = 6*/
  alpha++;

  console.log("minutes", totalMinutes, "t", t, "alpha", alpha);

  var r = (alpha * pi / 180),
    x = Math.sin(r) * 125,
    y = Math.cos(r) * -125,
    mid = (alpha >= 180) ? 1 : 0,
    anim = 'M 0 0 v -125 A 125 125 1 ' + mid + ' 1 ' + x + ' ' + y + ' z';
  //[x,y].forEach(function( d ){
  //  d = Math.round( d * 1e3 ) / 1e3;
  //});
  if (alpha < 360) {
    setTimeout(timer, t); //Redraw
  } else {
    anim = "M 0 0 v -125 A 125 125 1 1 1 -.01 -125 z";
    document.getElementById('loader').style.fill = "#000000";
  }
  loader.setAttribute("d", anim);

};

/* Set Colored Sections and Start Timer */
document.getElementById('set').onclick = function(){
  purple = document.getElementById('setPreTarget').value;
  green = document.getElementById('setTarget').value;
  yellow = document.getElementById('setPostTarget').value;
  setTime();
};

document.getElementById('setPostTarget').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    purple = document.getElementById('setPreTarget').value;
    green = document.getElementById('setTarget').value;
    yellow = document.getElementById('setPostTarget').value;
    setTime();
  }
});

document.getElementById('set').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    purple = document.getElementById('setPreTarget').value;
    green = document.getElementById('setTarget').value;
    yellow = document.getElementById('setPostTarget').value;
    setTime();
  }
});