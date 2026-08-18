let musicJSON = null;
async function getMusicJson() {
    if (musicJSON) return musicJSON;
    const jsonFile = await fetch('/music/music.json');
    if (!jsonFile.ok) throw new Error('could not load music.json');
    musicJSON = await jsonFile.json(); // .json() instead of .text() + JSON.parse
    return musicJSON;
}

function setUpAudio(){
    var aud = document.getElementById("musicAud");
    var plause = document.getElementById("playButtImg");
    var slid = document.getElementById("aud-slider");
    var loop = document.getElementById("loopButton");
    slid.value=0;
    let clickingBar=false;
    aud.addEventListener("timeupdate", () =>{
        if (clickingBar==false){
        slid.value= (aud.currentTime / aud.duration)* 100;
        if (aud.currentTime>=aud.duration-0.15){
            if (loop.getAttribute('looping')==0){
            nextSong();
            }
        }
        }
    });

    //input is on click
    slid.addEventListener("input", () =>{
        aud.pause();
        clickingBar=true;
        aud.currentTime = Math.min(
    (slid.value / 100) * aud.duration,
    aud.duration - 0.1
);
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

async function nextSong(){
    var slid = document.getElementById("aud-slider");
    var curSong = sessionStorage.getItem("song");
    var album = sessionStorage.getItem("album");
    //grab the music.json
    console.log("trying to do next song");
    const mus = await getMusicJson();
        for (var i =0;i< mus[album][0].length;i++){
        console.log(curSong);
        console.log(mus[album][0][i]);
        if (curSong==mus[album][0][i]){
            //Load the next song
            if (i<mus[album][0].length-1){
            loadSong(mus[album][0][i+1]);
            }else{
            loadSong(mus[album][0][0]);
            }
        }
    }
}


function playOrPause(){
    var aud = document.getElementById("musicAud");
    var plause = document.getElementById("playButtImg");
    var slid = document.getElementById("aud-slider");
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
var album = sessionStorage.getItem("album");
var aud = document.getElementById("musicAud");
var cover=document.getElementById("albumCover")

const mus = await getMusicJson();

var songsArr=mus[album][0];
cover.src=`/mainSprites/thumbnails/${mus[album][1]}`

let gotSong=songsArr[0];
sessionStorage.setItem('song',gotSong)

aud.src= `https://assets.kingjaw.com/Music/${removeSpaces(album)}/${removeSpaces(gotSong)}.mp3`;
console.log(`https://assets.kingjaw.com/Music/${removeSpaces(album)}/${removeSpaces(gotSong)}.mp3`);
songsArr.forEach(song => {
    var newSong = document.createElement("button");
    newSong.style="color: black;";
    newSong.className="songNames"
    if (song==gotSong){
        newSong.innerHTML=`<h2>--${song}</h2>`;
    }else{
    newSong.innerHTML=`<h2>${song}</h2>`;
    }
    newSong.innerSongName=song;
    newSong.href=`/music/player`;
    newSong.onclick= () => loadSong(song);
    startingPoint.append(newSong);
});
var nowPlaying=document.getElementById("nowPlaying");
nowPlaying.innerHTML=`Now Playing: ${gotSong}`;
}

async function loadSong(song){

    var aud = document.getElementById("musicAud");
    var plause = document.getElementById("playButtImg");
    var slid = document.getElementById("aud-slider");
    var album = sessionStorage.getItem("album");
    sessionStorage.setItem('song',song)
    slid.value=0;  
    aud.currentTime=0;
    aud.src= `https://assets.kingjaw.com/Music/${removeSpaces(album)}/${removeSpaces(song)}.mp3`;
    slid.value=0;
    
    //set one song name to have the little arrow
    //also removes the last song with the arrow
    var songNames=document.getElementsByClassName("songNames");
    for (const songName of songNames){
        innerText=songName.innerHTML.slice(4,-5);
        if (innerText==song){
            songName.innerHTML="<h2>--"+song+"</h2>";
        }
        if (innerText[0]=="-" && songName.innerSongName!=song){
            //sets it to the actual song name
            songName.innerHTML="<h2>"+songName.innerSongName+"</h2>";
        }
    }


function autoStartSong() {
  if (plause.playMode == 1) {
    aud.play();
  } else {
    plause.src = "/music/assets/pauseGif.gif";
    aud.play();
    plause.playMode = 1;
  }
}
autoStartSong();
//if (aud.readyState >= 4) {autoStartSong();}
//else{ aud.addEventListener('canplaythrough', () => {autoStartSong();}, { once: true }); }

  var nowPlaying=document.getElementById("nowPlaying");
nowPlaying.innerHTML=`Now Playing: ${song}`;

}

function loopToggle(){
    const loop=document.getElementById("loopButton");
    const aud=document.getElementById("musicAud");
    if (loop.getAttribute('looping')==0){
        //change it to looping
        loop.children.item(0).src=`/music/assets/LoopIconOn.gif?t=${Date.now()}`;
        loop.setAttribute('looping',1);
        aud.loop=true;
    }else{
        //change it to not looping
        loop.children.item(0).src=`/music/assets/LoopIconOff.gif?t=${Date.now()}`;
        loop.setAttribute('looping',0);
        aud.loop=false;

    }

}