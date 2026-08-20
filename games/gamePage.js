function playGame(game){
  document.getElementById("pButton").remove();
  document.getElementById("gOverlay").remove();

  const gameWindow=document.createElement("iframe");
  
  var test="Donalia3"
  gameWindow.src=`https://assets.kingjaw.com/Games/${test}/GameBuild/index.html`;
  gameWindow.width="960"; gameWindow.height="800";
  gameWindow.scrolling="none";
  gameWindow.frameBorder=0;
  gameWindow.setAttribute("allow","fullscreen");
  gameWindow.setAttribute("allowfullscreen","true");

  document.getElementById("centered").appendChild(gameWindow); 
}