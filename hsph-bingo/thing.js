function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
let squares = ["Answer can be found in the puzzle or on website",
"Writing team ≤ 4 people",
"Guess whether this pre-written hint will be useful!",
"Puzzle that involves Vigenere",
"Crossword clues that don't work",
"Puzzles are worth different point values for no reason",
"Answer submission via Google Forms",
"All puzzles released at once in a single file",
"Unnecessarily colorblind-unfriendly puzzle",
"Cash prize",
"Puzzle that involves a criss-cross (NOT a crossword)",
"Final ranking based on accuracy",
"No metapuzzle",
"Text provided as a picture for no reason",
"≥ 50% of puzzles written by the same person",
"Puzzle that involves Caesar shift",
"\"More registrations than expected\"",
"Unannounced errata",
"File / presentation metadata leaks puzzle info",
"Answer submission is case-sensitive",
"Puzzle answer that really, really should have been enumerated",
"Puzzles posted as Google Docs",
"Puzzle requires signing up to third-party site or downloading software to solve",
"Contains a Sudoku",
"Inconsistent fonts or font sizes across puzzles",
"Individual non-thematic clue that strongly suggests the writer's fandoms",
"Mod 26",
"Clue via partially italicized/bolded/uppercase title or flavor",
"URL shortener",
"Unsorted list in arbitrary order",
"Misuse of the word \"anagram\"",
"Explicit link to easily Googleable reference data",
"Paratext in ALL CAPS",
"Half the things face or are aligned the other way for no reason",
"Exactly one thing extracts a different number of letters",
"Visible photo compression artifacts",
"Jump from zero to more than two of bold/italics/all caps",
"Visible image editing artifacts",
"Puzzle depends on false assumptions about how it renders on solvers' screens",
"Google Sheets leaderboard",
"A = 0, B = 1...",
"#00ff00 (lime green) or #00ffff (cyan)",
"Unnecessary digits of precision",
"Extra last step to transform the answer even though there's no meta",
"HTML file you have to download and view",
"Errata with errata",
"Calibri or Arial",
"MS Paint illustrations",
">50% of the puzzle info gets discarded",
"Wrong file uploaded",
"Explicit instructions for producing a final answer from intermediate work",];

shuffleArray(squares);

let tds = document.getElementsByTagName('td');
for (let i = 0; i < tds.length; i++) {
	if (tds[i].textContent === '') {
		// let div = document.createElement('div');
		// div.textContent = squares[i];
		// tds[i].appendChild(div);
		tds[i].textContent = squares[i];
	}
}

//https://stackoverflow.com/questions/29927803/how-to-check-all-elements-in-row-column-clicked-bingo-game/29930841 thank you for this terrible solution
winners = [
  ["a1","b1","c1","d1","e1"],
  ["a2","b2","c2","d2","e2"],
  ["a3","b3","c3","d3","e3"],
  ["a4","b4","c4","d4","e4"],
  ["a5","b5","c5","d5","e5"],
  ["a1","a2","a3","a4","a5"],
  ["b1","b2","b3","b4","b5"],
  ["c1","c2","c3","c4","c5"],
  ["d1","d2","d3","d4","d5"],
  ["e1","e2","e3","e4","e5"],
  ["a1","b2","c3","d4","e5"],
  ["e1","d2","c3","b4","a5"],
]
//https://www.reddit.com/r/javascript/comments/1033xq/q_how_to_change_background_color_of_table_cells/
var cells = document.getElementsByTagName('td');
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", clickyClick);
}

function clickyClick() {
  if(this.value == "on"){
    this.value = "off";
    this.style.backgroundColor = "";
  } else {
    this.value = "on";
    this.style.backgroundColor = 'yellow';
  }
  for(var i = 0; i < winners.length; i++) {
    var win = winners[i];
    var ons = 0;

    for(var j = 0; j < 5; j++) {
        if(document.getElementById(win[j]).value == "on") {
            ons++;
        }
    }

    if (ons==5 && win.includes(this.id)){
      alert("epic bingo");
    }
  }
}