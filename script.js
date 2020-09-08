console.log('Script.js file successfully connected to webpage.');

var ingame = false;

var score = 0;
var distance = 0;

var state_display = document.getElementById('state-name');
var score_display = document.getElementById('score-display');

var map = document.getElementById('map');

var canvas = document.getElementById("canvas");
canvas.width = map.width;
canvas.height = map.height;
var ctx = canvas.getContext('2d');
var canvas_pos = canvas.getBoundingClientRect();

var added_width = Math.floor((document.body.width - canvas.width) / 2);

window.onload = function() {
  //alert('Because of current software bugs, this can only be played in a standard PC browser size.')

  ctx.drawImage(map, 0, 0);
}

canvas.onclick = function(e) {
  console.log("(" + Math.floor(e.clientX - canvas_pos.left) + "," + Math.floor(e.clientY - canvas_pos.top) + ")");
}

var level;
function startGame() {
  console.log('Game Started');
  ingame = true;
  document.getElementById('start-button').style.display = "none";

  level = 0;
  state_display.innerHTML = coords[0].name;
}

function newLevel() {
  level++;

  ctx.drawImage(map, 0, 0);
  document.getElementById('next-button').style.display = "none";

  console.log("Level " + level);
  state_display.innerHTML = coords[level].name;
}

function getDistance(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
canvas.onclick = function(e) {
  console.log("(" + Math.floor(e.clientX - canvas_pos.left) + "," + Math.floor(e.clientY - canvas_pos.top) + ")");
  if(ingame && document.getElementById('next-button').style.display == "none") {
    distance = Math.abs(Math.round(getDistance(e.clientX - canvas_pos.left, coords[level].x, e.clientY - canvas_pos.top, coords[level].y)));

    if(distance < 20) {
      distance = 0;

      ctx.fillStyle = "green";
      ctx.lineWidth = 0;
      ctx.beginPath();
      ctx.arc(coords[level].x, coords[level].y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      coords[level].gotten_right = true;
    } else {
      ctx.fillStyle = "red";
      ctx.lineWidth = 0;
      ctx.beginPath();
      ctx.arc(coords[level].x, coords[level].y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      coords[level].gotten_right = false;
    }

    console.log(distance);
    score += distance;
    score_display.innerHTML = score.toString();

    document.getElementById('next-button').style.display = "block";

    if(level == coords.length - 1) {
      state_display.innerHTML = getEndText(score);
      document.getElementById('next-button').style.display = "none";
      document.getElementById('end-screen').style.display = "block";
      document.getElementById('below-text').style.display = "none";

      coords.forEach(drawCircles);
    }

    //if(!level < coords.length) {
      //newLevel(level);
    //}
  }
}

function drawCircles(item, index) {
  if(coords[index].gotten_right) {
    ctx.fillStyle = "green";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(coords[index].x, coords[index].y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  } else if(!coords[index].gotten_right) {
    ctx.fillStyle = "red";
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.arc(coords[index].x, coords[index].y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

function getEndText(s) {
  if(s < 115) {
    return "Awesome! You got a score of " + s.toString() + "!";
  }
  else if(s < 175) {
    return "Good! You got a score of " + s.toString() + "!";
  }
  else if(s < 250) {
    return "Better luck next time, your score was good, but it was only " + s.toString() + "!";
  }
  else {
    return "Oof. You really need to work on your geography skills. Your score was a whopping " + s.toString() + "!";
  }
}
