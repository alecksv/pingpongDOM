"use strict";
// =============================================GLOBAL VARs===
var wrapper = document.createElement("div");
wrapper.setAttribute(
  "style",
  "display: flex; justify-content: space-between; width:600px; margin:50px auto;"
);
// =============================================CREATE BUTTON START===
var buttonStart = document.createElement("button");
buttonStart.setAttribute("id", "buttonStart");
buttonStart.textContent = "START";
buttonStart.setAttribute(
  "style",
  "margin-right:10px; padding: 10px; border: 2px solid #423b0d; width: 100px; height: 50px; background-color: #08a60e; color: #fff; font-size: 24px; border-radius: 5px;  box-shadow: 10px 10px 15px rgba(0,0,0,0.5);"
);
// ==============================================CREATE SCORETABLE===
var player = "";
var player1 = 0;
var player2 = 0;
var spanScoreTable = document.createElement("span");
spanScoreTable.setAttribute(
  "style",
  "margin:10px; padding: 0px; font-size: 56px; font-weight:900;"
);
spanScoreTable.innerHTML = `${player1} : ${player2}`;

// =============================================CREATE BUTTON STOP===
var buttonStop = document.createElement("button");
buttonStop.setAttribute("id", "buttonStop");
buttonStop.textContent = "PAUSE";
buttonStop.setAttribute(
  "style",
  "margin-left:10px; padding: 10px; border: 2px solid #423b0d; width: 100px; height: 50px; background-color: #e33112; color: #fff; font-size: 24px; border-radius: 5px;  box-shadow: 10px 10px 15px rgba(0,0,0,0.5);"
);

// ================================================CREATE PLAYGROUND===
var playground = document.createElement("div");
playground.setAttribute("id", "playground");
playground.setAttribute(
  "style",
  "margin:0 auto; border: 2px solid #423b0d; width: 600px; height: 400px; background-color: #f2d75c;box-shadow: 10px 10px 15px rgba(0,0,0,0.5); position: relative; display: flex;"
);
var playgroundHeight = 400;
var playgroundWidth = 600;

//  ============================================== CREATE TEXT-WINNER ===
var textWinner = document.createElement("div");
textWinner.setAttribute(
  "style",
  "font-size: 70px; font-weight:900; color: #fc0352; z-index: 10; margin: auto;"
);
var whoWin = "";
textWinner.innerHTML = `${whoWin}`;
//  ============================================== createElements ===
function createElements() {
  document.body.append(wrapper);
  wrapper.append(buttonStart);
  wrapper.append(spanScoreTable);
  wrapper.append(buttonStop);
  document.body.append(playground);
  playground.append(textWinner);
}
createElements();
// ================================================== NEW VARIANT WITH CLASS ===
function Rocket(
  _width,
  _height,
  _backgroundColor,
  _position,
  _posX,
  _posY,
  _speedRocket,
  _flag,
  _timerId
) {
  this.width = _width;
  this.height = _height;
  this.backgroundColor = _backgroundColor;
  this.position = _position;
  this.posX = _posX;
  this.posY = _posY;
  this.speedRocket = _speedRocket;
  this.flag = _flag;
  this.timerId = _timerId;
  this.createRocket = function () {
    this.create = document.createElement("div");
    this.create.style.width = this.width + "px";
    this.create.style.height = this.height + "px";
    this.create.style.backgroundColor = this.backgroundColor;
    this.create.style.position = this.position;
    this.create.style.left = this.posX + "px";
    this.create.style.top = this.posY + "px";
    playground.appendChild(this.create);
  };
  this.updateRocket = function () {
    this.create.style.top = this.posY + "px";
  };
}

var rocket1 = new Rocket(10, 80, "#871403", "absolute", 0, 160, 8, "stop", 0);
var rocket2 = new Rocket(10, 80, "#074008", "absolute", 590, 160, 8, "stop", 0);

//  ======================================================CREATE BALL ===
var ball = document.createElement("div");
var ballObject = {
  posX: 288,
  posY: 188,
  speedX: 10,
  speedY: 9,
  width: 24,
  height: 24,
  backgroundColor: "#d97518",
  borderRadius: 12,
  position: "absolute",

  createBall: function () {
    ball.setAttribute("id", "ball");
    ball.style.position = this.position;
    ball.style.left = this.posX + "px";
    ball.style.top = this.posY + "px";
    ball.style.width = this.width + "px";
    ball.style.height = this.height + "px";
    ball.style.backgroundColor = this.backgroundColor;
    ball.style.borderRadius = this.borderRadius + "px";
    playground.appendChild(ball);
  },
  //   =============================================== FUNCTION CHANGE COORDINATES OF BALL ===
  update: function () {
    ball.style.left = this.posX + "px";
    ball.style.top = this.posY + "px";
  },
};

// ================================================================ MOVEMENT ===
buttonStart.addEventListener("click", startMove);
buttonStop.addEventListener("click", stopMove);
// ============================================================== START AND STOP BUTTONS ===
var refresh;
function stopMove() {
  buttonStart.disabled = false;
  console.log(buttonStart.disabled);
  if (refresh) {
    clearInterval(refresh);
  }
}
function startMove() {
  buttonStart.disabled = true;

  whoWin = "";
  let timer;
  let begin = 3;
  countdown();
  function countdown() {
    whoWin = begin;
    begin--;
    textWinner.innerHTML = whoWin;
    if (begin < 0) {
      whoWin = "";
      clearTimeout(timer);
      refresh = setInterval(tick, 40);
    } else {
      timer = setTimeout(countdown, 1000);
    }
  }

  console.log(`start - ${whoWin}`);
  ballObject.createBall();
  //   =======================================RANDOM START ===
  if (Math.random() <= 0.5) {
    ballObject.speedX = -ballObject.speedX;
    ballObject.speedY = -ballObject.speedY;
  }
}
// ================================================================== FUNCTION TICK TO BORDERS ===
function tick() {
  //   *********************************************** THERE IS BALL JUMPS AND CHANGES DIRECTIONS ***
  ballObject.posX += ballObject.speedX;

  if (
    ballObject.posX < rocket1.posX + rocket1.width &&
    rocket1.posY + rocket1.height > ballObject.posY &&
    ballObject.posY > rocket1.posY
  ) {
    ballObject.speedX = -ballObject.speedX;
    ballObject.posX = ballObject.width + rocket1.width;
  }
  if (
    ballObject.posX > rocket2.posX - ballObject.width &&
    rocket2.posY < ballObject.posY &&
    ballObject.posY < rocket2.posY + rocket2.height
  ) {
    ballObject.speedX = -ballObject.speedX;
    ballObject.posX = rocket2.posX - ballObject.width;
  }

  //   ===================================================== DID BALL GO OUT TO THE RIGHT SIDE?=== SCORE ===

  if (player1 == 5) {
    whoWin = "PLAYER 1 WIN";
    setTimeout(startGameOver, 500);
  }
  if (player2 == 5) {
    whoWin = "PLAYER 2 WIN";
    setTimeout(startGameOver, 500);
  }
  // ****** FUNCTION MAKE SCORE 0:0 AND REPLACE ROCKETS TO THE BEGINNING PLACE***
  function startGameOver() {
    if (refresh) {
      clearInterval(refresh);
    }
    player1 = 0;
    player2 = 0;
    ballObject.posX = 288;
    ballObject.posY = 188;
    rocket1.posX = 0;
    rocket1.posY = 160;
    rocket2.posX = 590;
    rocket2.posY = 160;
    ballObject.update();
    rocket1.updateRocket();
    rocket2.updateRocket();
  }
  //   ************************* FUNCTION START NEW SETGAME AFTER GOAL ***
  function startAfterGoal() {
    buttonStart.disabled = false;
    if (refresh) {
      clearInterval(refresh);
    }
    ballObject.speedX = 12;
    ballObject.speedY = 11;
    ballObject.posX = 288;
    ballObject.posY = 188;
    rocket1.posX = 0;
    rocket1.posY = 160;
    rocket2.posX = 590;
    rocket2.posY = 160;
    ballObject.update();
    rocket1.updateRocket();
    rocket2.updateRocket();
    startMove();
  }
  spanScoreTable.innerHTML = `${player1} : ${player2}`;
  textWinner.innerHTML = `${whoWin}`;
  // ***********************************************DID BALL GO OUT TO THE LEFT SIDE?***SCORE***
  if (ballObject.posX + ballObject.width > playgroundWidth) {
    ballObject.speedX = -ballObject.speedX;
    ballObject.posX = playgroundWidth - ballObject.width;
    player1 += 1;
    ballObject.speedX = 0;
    ballObject.speedY = 0;
    setTimeout(startAfterGoal, 3000);
  }
  //   ===================================================== DID BALL GO OUT TO THE LEFT SIDE?=== SCORE===
  if (ballObject.posX < 0) {
    ballObject.speedX = -ballObject.speedX;
    ballObject.posX = 0;
    player2 += 1;
    ballObject.speedX = 0;
    ballObject.speedY = 0;
    setTimeout(startAfterGoal, 3000);
  }

  //   =========================================================== DID BALL GO OUT TO DOWN SIDE?===
  ballObject.posY += ballObject.speedY;
  if (ballObject.posY + ballObject.height > playgroundHeight) {
    ballObject.speedY = -ballObject.speedY;
    ballObject.posY = playgroundHeight - ballObject.height;
  }
  //   ============================================================= DID BALL GO OUT TO TOP SIDE?===
  if (ballObject.posY < 0) {
    ballObject.speedY = -ballObject.speedY;
    ballObject.posY = 0;
  }
  // ****************************************************************
  // console.log(rocket1.flag)
  document.addEventListener("keydown", function (event) {
    if (event.key === "Shift" && rocket1.flag === "stop") {
      rocket1.flag = "up";
      doRocketMove(rocket1);
    }
    if (event.key === "Control" && rocket1.flag === "stop") {
      rocket1.flag = "down";
      doRocketMove(rocket1);
    }
    if (event.key === "ArrowDown" && rocket2.flag === "stop") {
      rocket2.flag = "down";
      doRocketMove(rocket2);
    }
    if (event.key === "ArrowUp" && rocket2.flag === "stop") {
      rocket2.flag = "up";
      doRocketMove(rocket2);
    }
  });
  document.addEventListener("keyup", function (event) {
    if (event.key === "Shift" || event.key === "Control") {
      rocket1.flag = "stop";
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      rocket2.flag = "stop";
    }

    clearInterval(rocket1.timerId);
    doRocketMove(rocket1);
    clearInterval(rocket2.timerId);
    doRocketMove(rocket2);
  });

  function doRocketMove(r) {
    if (r.flag === "up") {
      r.timerId = setInterval(() => {
        if (r.posY > 0) {
          r.posY = r.posY - r.speedRocket;
          r.updateRocket();
        } else if (r.flag === "stop") {
          // r.flag = "stop";
          clearInterval(r.timerId);
          r.timerId = 0;
        }
      }, 40);
    }
    if (r.flag === "down") {
      r.timerId = setInterval(() => {
        if (r.posY + r.height < playgroundHeight) {
          r.posY = r.posY + r.speedRocket;
          r.updateRocket();
        } else if (r.flag === "stop") {
          // r.flag = "stop";
          clearInterval(r.timerId);
          r.timerId = 0;
        }
      }, 40);
    }
  }

  ballObject.update();
  rocket1.updateRocket();
  rocket2.updateRocket();
}
// ***************************************************************** MOUSEOVER ****************

buttonStart.addEventListener("mouseover", function (event) {
  event.target.style.color = "#34eba4";
});
buttonStart.addEventListener("mouseout", function (event) {
  event.target.style.color = "white";
});
buttonStop.addEventListener("mouseover", function (event) {
  event.target.style.color = "#34eba4";
});
buttonStop.addEventListener("mouseout", function (event) {
  event.target.style.color = "white";
});
//     =========================================================== CALL FUNCTIONS TO CREATE ===
rocket1.createRocket();
rocket2.createRocket();
ballObject.createBall();
