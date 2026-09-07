gameName=sessionStorage.getItem("game");
gameEngine=sessionStorage.getItem("engine");

document.getElementById("titleText").innerHTML=gameName;

function loadGamePage(gameName){
  history.pushState({ game: removeSpaces(gameName) }, "", `/games/${removeSpaces(gameName)}`);
  document.title = gameName;
}

loadGamePage(gameName);

document.getElementById("pButton").setAttribute('onclick',`playGame(removeSpaces('${gameName}'))`);

async function fetchInstructions(){
let insFile=await fetch(`/games/instructions/${removeSpaces(gameName)}.txt`);
if (insFile.ok){
  const text=await insFile.text();
  const lines=text.split('\n');
  lines.forEach(line=>{
  newObj=document.createElement("h3");
  newObj.innerHTML=line;
  document.getElementById("instructions").append(newObj);});
}
else{
  console.log("no instructions found");
  instructTxt=document.getElementById("instrTxt").remove();
  }
}

fetchInstructions();


function playGame(game){
  document.getElementById("pButton").remove();
  document.getElementById("gOverlay").remove();

  const gameWindow=document.createElement("iframe");
  console.log("Game Engine: "+gameEngine);

  gameWindow.src=`https://assets.kingjaw.com/Games/${game}/index.html`;
  if (gameEngine=="Unity"){
    gameWindow.width="960"; gameWindow.height="800";
    console.log("unity width");
  }
  else if (gameEngine=="Scratch"){
    gameWindow.width="864"; gameWindow.height="648";  
    gameWindow.setAttribute("style","margin-top: 70px;");
  }
  gameWindow.scrolling="none";
  gameWindow.frameBorder=0;
  gameWindow.setAttribute("allow","fullscreen");
  gameWindow.setAttribute("allowfullscreen","true");

  document.getElementById("centered").appendChild(gameWindow); 
}