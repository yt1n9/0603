let video;
let poseNet;
let poses = [];
let leftWrist, rightWrist;
let word = "";
let wordX, wordY;
let score = 0;
let words = ["AI", "VR", "AR", "Coding", "STEAM", "EdTech", "IoT", "BigData"];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
  });

  nextWord();
}

function modelReady() {
  console.log("PoseNet ready");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();

  // 顯示單字
  fill(255, 204, 0);
  textSize(48);
  textAlign(CENTER, CENTER);
  text(word, wordX, wordY);

  // 顯示分數
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text("分數: " + score, 10, 10);

  // 判斷雙手是否同時碰到單字
  if (leftWrist && rightWrist) {
    let d1 = dist(leftWrist.x, leftWrist.y, wordX, wordY);
    let d2 = dist(rightWrist.x, rightWrist.y, wordX, wordY);
    if (d1 < 60 && d2 < 60) {
      score++;
      nextWord();
    }
  }
}

function drawKeypoints() {
  if (poses.length > 0) {
    let pose = poses[0].pose;
    leftWrist = pose.leftWrist;
    rightWrist = pose.rightWrist;

    fill(0, 255, 0);
    noStroke();
    ellipse(leftWrist.x, leftWrist.y, 20, 20);
    ellipse(rightWrist.x, rightWrist.y, 20, 20);
  }
}

function nextWord() {
  word = random(words);
  wordX = random(100, width - 100);
  wordY = random(100, height - 100);
}
