// to do - fix the durations and enable feature to pause video by the song selector itself
// make it responsive
// Initialize the Variables
let songIndex=1;
let audioElement= new Audio('/content/songs/1.mp3');
let masterPlay=document.querySelector(".masterplay");
let progBar=document.querySelector("#progbar");
progBar.value=0;
let gif=document.querySelector(".gif");
let label=document.querySelector(".label");


let songNames=[
    {songName:'Legion', filePath:"/content/songs/1.mp3",coverPath:"/content/covers/1.jpg"},
    {songName:'Trap', filePath:"/content/songs/2.mp3",coverPath:"/content/covers/2.jpg"},
    {songName:'They Mad', filePath:"/content/songs/3.mp3",coverPath:"/content/covers/3.jpg"},
    {songName:'Plug Walk', filePath:"/content/songs/4.mp3",coverPath:"/content/covers/4.jpg"},
    {songName:'Hunter', filePath:"/content/songs/5.mp3",coverPath:"/content/covers/5.jpg"},
    {songName:'The Safety Dance', filePath:"/content/songs/6.mp3",coverPath:"/content/covers/6.jpg"},
    {songName:'Back It Up', filePath:"/content/songs/7.mp3",coverPath:"/content/covers/7.jpg"},
    {songName:'Listen Up', filePath:"/content/songs/8.mp3",coverPath:"/content/covers/8.jpg"},
    {songName:'Picasso', filePath:"/content/songs/9.mp3",coverPath:"/content/covers/9.jpg"},
    {songName:'True Love', filePath:"/content/songs/10.mp3",coverPath:"/content/covers/10.jpg"},
]


// playing songs
const updateplay=()=>{
    let Play=document.getElementById(songIndex);
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        Play.classList.remove('fa-circle-play');
        Play.classList.add('fa-circle-pause');
        gif.style.opacity='1';
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        Play.classList.add('fa-circle-play');
        Play.classList.remove('fa-circle-pause');
        gif.style.opacity='0';
    }
}
masterPlay.addEventListener('click',updateplay);

// Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    progBar.value=((audioElement.currentTime)*100)/(audioElement.duration);
});

progBar.addEventListener('click',()=>{
    audioElement.currentTime=(progBar.value*audioElement.duration)/100;
});



let songItems=Array.from(document.querySelectorAll(".songitem"));
songItems.forEach((element,i) => {
    let img=element.querySelector("img");
    let title=element.querySelector(".songtitle");
    img.setAttribute('src',songNames[i].coverPath);
    title.innerText=songNames[i].songName;
    // to do next : Set Duration
});


const makeAllplays=()=>{
    Array.from(document.querySelectorAll(".songselector")).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

// individiua buttons
Array.from(document.querySelectorAll(".songselector")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(songIndex!==element.id){
            songIndex=element.id;
            audioElement.src=`/content/songs/${songIndex}.mp3`;
            makeAllplays();
            updateplay();
            label.innerText=songNames[songIndex-1].songName;
        }else{
            updateplay();
        }
    });
});

let next=document.querySelector('.next');
let previous=document.querySelector('.previous');

next.addEventListener('click',()=>{
    if(songIndex!==10){
        songIndex=parseInt(songIndex);
        songIndex+=1;
        label.innerText=songNames[songIndex-1].songName;
        let Play=document.getElementById(songIndex);
        makeAllplays();
        audioElement.src=`/content/songs/${songIndex}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        Play.classList.remove('fa-circle-play');
        Play.classList.add('fa-circle-pause');
        gif.style.opacity='1';
    }
});
previous.addEventListener('click',()=>{
    if(songIndex!==1){
        songIndex=parseInt(songIndex);
        songIndex-=1;
        console.log(songIndex,typeof(songIndex));
        let Play=document.getElementById(songIndex);
        console.log(Play);
        label.innerText=songNames[songIndex-1].songName;
        makeAllplays();
        audioElement.src=`/content/songs/${songIndex}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        Play.classList.remove('fa-circle-play');
        Play.classList.add('fa-circle-pause');
        gif.style.opacity='1';
    }
});