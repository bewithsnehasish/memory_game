document.addEventListener("DOMContentLoaded", function () {
  const virtualplaybutton = document.getElementById("virtual-playbutton");

//              .:oshdmNMMNmdhs+:`           
//         /ymMMMMMMMMMMMMMMMMMMmy:        
//      `sNMMMMMMMMMMMMMMMMMMMMMMMMNo`     
//     +NMMMMMMMMMMMMMMMMMMMMMMMMMMMMN+    
//    yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMy   
//   oMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMo  
//  /MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/ 
// /MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/
// dMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
// NMMMMMMMMMMMMMmdysoooosydmMMMMMMMMMMMMMm
// MMMMMMMMmy+:.              .:oymMMMMMMMN
// MMMMMMh-                        -dMMMMMM
// MMMMMmoo+++++oo+:     `:+oo+++++oomMMMMM
// NMMNm:`        -odooosdo.        `/NNMMN
// mMMMo            -    -            sMMMd
// yMMm-`           -    -           `-mMMs
// /MMy -.        .-      -.        .- hMM/
// `NMs  `........          ........`  yMN 
//  +MN.                              `mM/ 
//   sMm           `:` `:`            hMy  
//   oMM+  +`   ./@bewithsnehasish/. :MMy  
//   mMMm-:dNdmNMMMMMMMMMMMMMMNmmNd:-hMMM` 
//  :MMMMMMMMMMMMMMNhs+oshNMMMMMMMMMMMMMM+ 
//  yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd 
//  yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMd 
//  /MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs 
//   mMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMN` 
//   -NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM:  
//    -NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM/   
//     .dMmMMMMMMMMMMMMMMMMMMMMMMMMmMm-    
//       odMMMMMMMMMMMMMMMMMMMMMMMMmo`     
//        oMMMMMMMMMMMMMMMMMMMMMMMMh       
//         oNNMMMMMMMMMMMMMMMMMMNMy`       
//          `-/mMMMMMMMMMMMMMMN+-.         
//              -oydNMMMMNdho:  

  // Initialize game variables
  let gameSeq = [];
  let userSeq = [];
  let btns = ["yellow", "red", "purple", "green"];
  let started = false;
  let level = 0;
  let highScore = 0;

  // DOM elements
  let h2 = document.querySelector("h2");
  let allBtns = document.querySelectorAll(".btn");

  // Event listener to start the game on playbutton press
  virtualplaybutton.addEventListener("click", startGame);
  document.addEventListener("keydown", function (event) {
    if (!started && (event.key === " " || event.key === "playbutton")) {
      startGame();
    }
  });

  function startGame() {
    if (!started) {
      console.log("Game is started");
      started = true;
      virtualplaybutton.style.boxShadow = "none";
      virtualplaybutton.style.transition = "transform 500ms ease-in-out";
      virtualplaybutton.style.transform = "translate(5px, 5px)";
      levelUp();
    }
  }

  // Event listener for button click
  for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
  }

  // Flash effect for game buttons
  function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 250);
  }

  // Flash effect for user-selected buttons
  function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
      btn.classList.remove("userFlash");
    }, 250);
  }

  // Level up and generate new sequence
  function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    document.getElementById("h2").style.color="#182848";
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    gameFlash(randomBtn);
  }

  // Check user's button press and sequence
  function btnPress() {
    let btn = this;
    userFlash(btn);

    function checkAns(index) {
      if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
          setTimeout(levelUp, 600);
        }
      } else {
        // Play game over sound
        setTimeout(function(){
          document.getElementById("gameOverSound").play();          
        }, 1)
        highScore = checkHighScore(level);
        h2.innerHTML = `Game Over!<br> <span style='color: #182848;'>YOUR CURRENT SCORE IS: <b>${level}</b>   |   <b>HIGH SCORE: ${highScore}</b></span> <br> Press WANT TO PLAY BUTTON!!! to restart`;
        document.querySelector("body").style.backgroundImage = 'linear-gradient(180deg, #ff0000 17%, #ff0000 100%)';
        setTimeout(function () {
          document.querySelector("body").style.backgroundImage = 'linear-gradient(180deg, #4dabf7 21%, #182848 77%)' ;
        }, 500);
        reset();
      }
    }

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
  }

  // Check and update high score
  function checkHighScore(score) {
    if (score > highScore) {
      highScore = score;
    }
    return highScore;
  }

  // Reset game state
  function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    virtualplaybutton.style.transition = "none";
    virtualplaybutton.style.transform = "none";
  }
});

