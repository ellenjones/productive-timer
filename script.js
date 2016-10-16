var loader = document.getElementById('loader'),
  alpha = 0,
  pi = Math.PI,
  totalMinutes = 0;

function setTime() {
  //document.getElementById('set').disabled = true;
  document.getElementById('timeset').style.display = "none";
  document.getElementById('timer').style.display = "block";
  preTarget = document.getElementById('setPreTarget').value;
  target = document.getElementById('setTarget').value;
  postTarget = document.getElementById('setPostTarget').value;
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
  path = document.getElementById(path);
  console.log('path:',path);
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
  var t = ((totalMinutes * 1000) / 6); /*divide by 6 to get minutes because 360/60 = 6*/
  alpha++;

  console.log("minutes", totalMinutes.value, "t", t, "alpha", alpha);

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

document.getElementById('excellentMinus').onclick = function(){
  field = document.getElementById('setPreTarget');
  field.value = +field.value - 1;
  if (field.value < 0)  {
	field.value = 0
	field.style.color = 'red';
  }; 
};

document.getElementById('excellentPlus').onclick = function(){
  field = document.getElementById('setPreTarget');
  field.value = +field.value + 1;
  if (field.value > 0) {
	field.style.color = 'purple';
  };
};

document.getElementById('goodMinus').onclick = function(){
  field = document.getElementById('setTarget');
  field.value = +field.value - 1;
  if (field.value < 0)  {
	field.value = 0
	field.style.color = 'red';
  }; 
};

document.getElementById('goodPlus').onclick = function(){
  var field = document.getElementById('setTarget');
  field.value = +field.value + 1;
  if (field.value > 0) {
	field.style.color = 'green';
  };
};

document.getElementById('improveMinus').onclick = function(){
  field = document.getElementById('setPostTarget');
  field.value = +field.value - 1;
  if (field.value < 0)  {
	field.value = 0
	field.style.color = 'red';
  }; 
};

document.getElementById('improvePlus').onclick = function(){
  var field = document.getElementById('setPostTarget');
  field.value = +field.value + 1;
  if (field.value > 0) {
	field.style.color = 'olive';
  };
};

document.getElementById('timer').onclick = function() {
  location.reload();
};


/* Set Colored Sections and Start Timer */
document.getElementById('set').onclick = function(){
  setTime();
};

document.getElementById('setPostTarget').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    setTime();
  }
});

document.getElementById('set').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    setTime();
  }
});