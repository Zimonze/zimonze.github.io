var rows = 6
var pegs = 4
const colors = ["red","orange","yellow","green","blue","purple"];
var currentRow = 1
var currentPeg = 1
var checked = true
var checks = 0
var code = [];
for (i=0; i<pegs; i++) {
  //random item of array
  code.push(colors[Math.floor(Math.random() * colors.length)]);
}
var guess = [];
var buttonsDisabled = false
function init() {
  buttonsDisabled = false
  currentRow = 1
  currentPeg = 1
  checked = true
  checks = 0
  code = [];
  for (i=0; i<pegs; i++) {
    //random item of array
    code.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  console.log(code);
  guess = [];
  document.getElementById("board").innerHTML = "";
  for (i=1; i<=rows; i++) { //1-rows inclusive
    createRow(i);
  }
  document.getElementById(checks+1).className += " current";
}
function createRow(num) {
  board = document.getElementById("board");
  var row = document.createElement("div");
  row.className = "pegs";
  row.id = num
  row.innerHTML += num
  for (n=1; n<=pegs; n++) { //1-pegs inclusive
    row.innerHTML += "<div id='"+num+"-"+n+"' class='peg'></div>";
  }
  var stones = document.createElement("div");
  stones.className += "stones";
  stones.style.width = Math.ceil(pegs/2)+"em";
  for (n=1;n<=pegs;n++) { //1-pegs inclusive
    stones.innerHTML += ("<div class='stone' style='width:"+100/Math.ceil(pegs/2)+"%' id='stone"+num+"-"+n+"'></div>");
  }
  var checkButton = document.createElement("div");
  checkButton.className = "peg peg-button button check noselect";
  checkButton.innerHTML = "Check";
  checkButton.id = "check"+num;
  checkButton.setAttribute("onclick","check()");
  row.appendChild(stones);
  row.appendChild(checkButton);
  board.appendChild(row);
}
function replacePeg(r,p,color) {
  var oldPeg = document.getElementById(r+"-"+p)
  newPeg = oldPeg.cloneNode();
  newPeg.className = "peg " + color
  document.getElementById(r).replaceChild(newPeg, oldPeg);
}
function step(color) {
  if (buttonsDisabled) {
    return;
  }
  if (checked) {
    if (currentRow == -1) {
      return;
    }
    replacePeg(currentRow, currentPeg, color);
    guess.push(color);
    if (currentPeg==pegs) {
      showCheck(true,currentRow);
      checked = false;
      if (currentRow == rows) {
        currentRow = -1
        currentPeg = 1;
      } else {
        currentRow++;
        currentPeg = 1;
      }
    } else {
      currentPeg++;
    }
  }
}
function check() {
  checked = true;
  checks++;
  var prevRow = currentRow-1 
  document.getElementById(checks).className += " done";
  result = compare(code,guess)
  console.log(code);
  console.log(guess);
  console.log("res",result)
  //get blacks and whites and change stones
  if (checks == rows) {
    var prevRow = rows;
  } else {
    var prevRow = currentRow-1;
  }
  for (i=0;i<result.length;i++) {
    color = result[i];
    stone = document.getElementById("stone"+prevRow+"-"+(i+1));
    stone.style.backgroundColor = color;
  }
  guess = [];      
  //https://stackoverflow.com/a/37377279/10339299
  if (JSON.stringify(result) == JSON.stringify(Array.from(Array(pegs), () => 'black'))) {
    showCheck(false,prevRow);
    document.getElementById("win").innerHTML = "You Win!";
    buttonsDisabled = true;
  } else if (checks == rows) {
    showCheck(false,rows);
    document.getElementById("win").innerHTML = "You Lose!";
    buttonsDisabled = true;
  } else {
    document.getElementById(checks+1).className += " current";showCheck(false,currentRow-1);
  }
}
function showCheck(bool,row) {
  if (bool) {
    document.getElementById("check"+row).style.display = "block";
  } else {
    document.getElementById("check"+row).style.display = "none";
  }
}
function compare(code, guess) {
  mycode = Array.from(code);
  myguess = Array.from(guess);
  result = [];
  for (i=0;i<pegs;i++) {
    if (myguess[i] == mycode[i]){
      result.push("black");
      //placeholders to not match during whites phase
      myguess[i] = "honk";
      mycode[i] = "beep";
      console.log("b",myguess,mycode)
    }
  }
  for (i=0;i<pegs;i++) {
    for (j=0;j<pegs;j++) {
      if (myguess[i] == mycode[j]){
        result.push("white");
        //placeholders to not match later
        myguess[i] = "honk";
        mycode[j] = "beep";
        console.log("w",myguess,mycode)
      }
    }
  }
  return result;
}
function undo() {
  if (buttonsDisabled) {
    return;
  }
  if (currentPeg == 1) {
    if (checked) {
      return;
    } else {
      if (currentRow == -1) {
        currentRow = rows;
      } else {
        currentRow--;
        console.log("Wiejwoijow")
      } 
      replacePeg(currentRow, pegs, "");
      currentPeg = pegs;
      showCheck(false,currentRow);
      checked = true;
    }
  } else if (currentRow == -1) {
    replacePeg(rows, currentPeg, "");
    currentRow = rows;
  } else if (currentPeg > 1) {
    currentPeg--;
    replacePeg(currentRow, currentPeg, "");
  }
  guess.pop();
}