//This script handles loading new music and games to be displayed on the home page every day
async function fetchShit(){
    const jsonFile =await fetch('/games/games.json');
    if (!jsonFile.ok){
    throw new Error('didnt load games json');
    }
    gam=jsonFile.json();
  
    jsonFile =await fetch('/music/music.json');
    if (!jsonFile.ok){
    throw new Error('didnt load music json');
    }
    gam=jsonFile.json();

}
