//inclusive on both ends
function randomInt(min, max){
  return Math.round(Math.random()*(max-min))+min;
}
async function makeSubpage(jsonType){
  //jsonType is either "games" or "music"
  const jsonFile =await fetch(`/${jsonType}/${jsonType}.json`);
  const holder =document.getElementById(`${jsonType}Holder`);
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
    let thumbName="";
    if (jsonType=="games"){thumbName=gam[key]["thumbnail"];} else{thumbName=gam[key][1];}
    let newGame = document.createElement("a");
     if (jsonType=="games"){newGame.href="/games/game";}
    else{newGame.href="/music/player"}
    newGame.className="gameThumbnail";
    let cutText=key;
    if (cutText=="A Tale Regarding Fairies"){
      cutText="ATRF";
    }
    newGame.innerHTML=`<img src = "/mainSprites/thumbnails/${thumbName}" alt = "${key}"
    style ="image-rendering: pixelated;">
    <p style="line-height:30px;">${cutText}</p>`;
    if (jsonType=="games"){newGame.onclick= () => goToGame(key,gam[key]["engine"]);}
    else{newGame.onclick= () => goToSong(key);}
    
    holder.append(newGame);
  }
}
makeSubpage("games");
makeSubpage("music");

function goToGame(game,engine){
  sessionStorage.setItem('game',game);
  sessionStorage.setItem('engine',engine);
}

function goToSong(album){
  sessionStorage.setItem("album",album);
}