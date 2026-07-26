function playGame(){
  document.getElementById("pButton").remove();
  document.getElementById("gOverlay").remove();

  const gameWindow=document.createElement("iframe");
  
  gameWindow.src="GameBuild/index.html";
  gameWindow.width="960"; gameWindow.height="800";
  gameWindow.scrolling="none";
  gameWindow.frameBorder=0;
  document.getElementById("centered").appendChild(gameWindow); 
}