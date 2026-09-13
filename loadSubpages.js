//inclusive on both ends
function randomInt(min, max){
  return Math.round(Math.random()*(max-min))+min;
}
async function makeSubpage(){
  const jsonFile =await fetch('/games/games.json');
  const holder =document.getElementById("gamesHolder");
    if (!jsonFile.ok){
    throw new Error('didnt load games json');
    }
    const gam = await jsonFile.json();
    const games= Object.keys(gam);
    let randGames=[];
    while (randGames.length<3){
      randGame=games[randomInt(0,games.length-1)];
      if (!randGames.includes(randGame)){
        randGames.push(randGame);
      }
    }    
    for (let i=0;i<randGames.length;i++){
    let key=randGames[i];
    let thumbName=gam[key]["thumbnail"];
    let newGame = document.createElement("a");
    newGame.href="/games/game";
    newGame.className="gameThumbnail";
    let cutText=key;
    if (cutText=="A Tale Regarding Fairies"){
      cutText="ATRF";
    }
    newGame.innerHTML=`<img src = "/mainSprites/thumbnails/${thumbName}" alt = "${key}"
    style ="image-rendering: pixelated;">
    <p style="line-height:30px;">${cutText}</p>`;
    newGame.onclick= () => goToGame(key,gam[key]["engine"]);
    holder.append(newGame);
  }
}
makeSubpage();

function goToGame(game,engine){
  sessionStorage.setItem('game',game);
  sessionStorage.setItem('engine',engine);
}
