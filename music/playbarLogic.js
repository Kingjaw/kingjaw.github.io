function setUpAudio(){
    var aud = document.getElementById("musicAud");
    var slid = document.getElementById("aud-slider");
    var plause = document.getElementById("playButtImg");

    slid.value=0;
    let clickingBar=false;
    aud.addEventListener("timeupdate", () =>{
        console.log(aud.readyState);
                console.log(aud.duration);

        if (clickingBar==false){
        slid.value= (aud.currentTime / aud.duration)* 100;
        if (slid.value>=100){
            plause.src='/music/assets/pageLoadPlayButton.png';
        }
        }
    });

    //input is on click
    slid.addEventListener("input", () =>{
        aud.pause();
        aud.currentTime= (slid.value / 100)*aud.duration;
        clickingBar=true;
    });
    //change is on release
    slid.addEventListener("change", () =>{
        if (plause.playMode==1){
        aud.play();
        }
        clickingBar=false;
    });
    document.addEventListener('keydown', (event)=>{
        if (event.key==' '){
            event.preventDefault();
            playOrPause();
        }
    });

}

function playOrPause(){
    var aud = document.getElementById("musicAud");
    var plause = document.getElementById("playButtImg");
    if (aud.paused){
        aud.play();
        changePlauseAnim("/music/assets/pauseGif.gif");
        //plause.src = `/music/assets/pauseGif.gif?t=${Date.now()}`;
        plause.playMode=1;
    }else{
        aud.pause();
        changePlauseAnim("/music/assets/playGif.gif");
        //plause.src = `/music/assets/playGif.gif?t=${Date.now()}`;
        plause.playMode=0;
    }
}

function changePlauseAnim(url){
    var plause = document.getElementById("playButtImg");
    const loader = new Image();
  loader.onload = () => {
    plause.src = loader.src;
  };
  loader.src = `${url}?t=${Date.now()}`;
}

//load song names
async function loadSongNames() {
var startingPoint=document.getElementById("leftBarStartImg");
var album = localStorage.getItem("album");
var aud = document.getElementById("musicAud");

const jsonFile =await fetch('/music/music.json');
if (!jsonFile.ok){
throw new Error('didnt load music json');
}
const text = await jsonFile.text();
const mus = JSON.parse(text);

var songsArr=mus[album];

let gotSong=songsArr[0];
let curSong="";
for (let i =0; i<gotSong.length;i++){
    if (gotSong[i]!=" "){
        curSong+=gotSong[i];
    }
}
    aud.src= "https://pub-a04f62f55abb44a9b4a9bbd2c1262dc7.r2.dev/GoblinFightClub.mp3";

songsArr.forEach(song => {
    //Uses song[0] because of structure of the Json
    var newSong = document.createElement("button");
    newSong.style="color: black;";
    newSong.className="songNames"
    newSong.innerHTML=`<h2 >${song[0]}</h2>`;
    newSong.href=`/music/player`;
    newSong.onclick= () => loadSong(song[0]);
    startingPoint.append(newSong);
});
var nowPlaying=document.getElementById("nowPlaying");
nowPlaying.innerHTML=`Now Playing: ${gotSong}`;
}


async function loadSong(song){
  var aud = document.getElementById("musicAud");
  var plause = document.getElementById("playButtImg");
  var slid = document.getElementById("aud-slider");
  localStorage.setItem('song',song)
  slid.value=0;  
  aud.currentTime=0;

    let curSong="";
    for (let i =0; i<song.length;i++){
        if (song[i]!=" "){
            curSong+=song[i];
        }
    }

    aud.src= "https://pub-a04f62f55abb44a9b4a9bbd2c1262dc7.r2.dev/GoblinFightClub.mp3";
  
  slid.value=0;


aud.addEventListener('canplaythrough', () => {
  if (plause.playMode==1)
  {
      aud.play();
  }else{
    //triggers the default play function and manually sets the plauses src
    plause.src="/music/assets/pauseGif.gif";
    aud.play();
    plause.playMode=1;
  }
}, { once: true });

  var nowPlaying=document.getElementById("nowPlaying");
nowPlaying.innerHTML=`Now Playing: ${song}`;

}
