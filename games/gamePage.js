gameName=sessionStorage.getItem("game");
gameEngine=sessionStorage.getItem("engine");

document.getElementById("titleText").innerHTML=gameName;

history.pushState({ game: remnoveSpaces(gameName) }, "", `/games/${removeSpaces(gameName)}`);
document.title = gameName;

document.getElementById("pButton").setAttribute('onclick',`playGame(removeSpaces('${gameName}'))`);

console.log(document.getElementById("pButton").getAttribute('onclick'));
console.log("anythig");

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
  
  gameWindow.src=`https://assets.kingjaw.com/Games/${game}/index.html`;
  if (gameEngine=="Unity"){
  gameWindow.width="960"; gameWindow.height="800";
  }
  else if (gameEngine=="Scratch"){
      gameWindow.width="864"; gameWindow.height="648";  
  }
  gameWindow.scrolling="none";
  gameWindow.frameBorder=0;
  gameWindow.setAttribute("allow","fullscreen");
  gameWindow.setAttribute("allowfullscreen","true");
  gameWindow.setAttribute("style","margin-top: 70px;");

  document.getElementById("centered").appendChild(gameWindow); 
}