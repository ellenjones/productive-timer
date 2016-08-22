var loader = document.getElementById('loader'),
  alpha = 0,
  pi = Math.PI;

function draw(id) {

  path = document.getElementById('path' + id)

  alpha1 = document.getElementById('start' + id).value;
  alpha2 = document.getElementById('stop' + id).value;
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
  var minutes = document.getElementById('minutes');

  var t = ((minutes.value * 1000) / 6); /*divide by 6 to get minutes because 360/60 = 6*/
  alpha++;

  console.log("minutes", minutes.value);
  console.log("t", t);
  console.log("alpha", alpha);



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
    document.getElementById('loader').style.fill = "#b50000";
  }
  loader.setAttribute("d", anim);

};

document.getElementById('startTimer').onclick = function() {
  timer()
};




document.getElementById('draw1').onclick = function() {
  draw(1)
};

document.getElementById('draw2').onclick = function() {
  draw(2)
};

document.getElementById('draw3').onclick = function() {
  draw(3)
};

document.getElementById('stop1').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    draw(1);
    draw(2);
    draw(3);
  }
});

document.getElementById('stop2').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    draw(1);
    draw(2);
    draw(3);
  }
});

document.getElementById('stop3').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    draw(1);
    draw(2);
    draw(3);
  }
});

document.getElementById('minutes').addEventListener('keyup', function(event) {
  event.preventDefault();
  if (event.keyCode == 13) {
    timer();
  }
});
