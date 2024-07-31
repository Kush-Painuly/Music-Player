
document.addEventListener("DOMContentLoaded", () => {
  let songsObj = [
    {
      id: 1,
      name: "Piano Lift",
      artist: "SoundUniverseStudio",
      img: "./assests/song1.jpg",
      audio: "./Songs/song1.mp3",
    },
    {
      id: 2,
      name: "Lofi Lofu",
      artist: "Lofi Lofumm",
      img: "./assests/song2.jpg",
      audio: "./Songs/song2.mp3",
    },
    {
      id: 3,
      name: "Nature UpLift",
      artist: "Lofi Naturix",
      img: "./assests/song3.jpg",
      audio: "./Songs/song3.mp3",
    },
    {
      id: 4,
      name: "Dancing in the Stars",
      artist: "Sniper74",
      img: "./assests/song4.jpg",
      audio: "./Songs/song4.mp3",
    },
  ];

  let currentSongIndex = 0;
  let progress = document.querySelector("#progress");
  let song = document.querySelector("#song");
  let ctrlIcon = document.querySelector("#ctrlicon");
  let songName = document.querySelector(".songName");
  let artistName = document.querySelector(".artistName");
  let songImage = document.querySelector(".song-image");


  const loadSong = (index) => {
    const songObj = songsObj[index];
    song.src = songObj.audio;
    songName.textContent = songObj.name;
    artistName.textContent = songObj.artist;
    songImage.src = songObj.img;

    song.onloadedmetadata = function () {
      progress.max = song.duration;
      progress.value = song.currentTime;
    };
  };

  const playPause = () => {
    if (ctrlIcon.classList.contains("fa-pause")) {
      song.pause();
      ctrlIcon.classList.remove("fa-pause");
      ctrlIcon.classList.add("fa-play");
    } else {
      song.play();
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    }
  };

  setInterval(() => {
    if (!song.paused) {
      progress.value = song.currentTime;
    }
  }, 500);

  progress.addEventListener("input", function () {
    song.currentTime = progress.value;
    if (song.paused) {
      song.play();
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    }
  });

  const prevList = () => {
    currentSongIndex =
      (currentSongIndex - 1 + songsObj.length) % songsObj.length;
    loadSong(currentSongIndex);
    playPause();
  };

  const nextList = () => {
    currentSongIndex = (currentSongIndex + 1) % songsObj.length;
    loadSong(currentSongIndex);
    playPause();
  };

  loadSong(currentSongIndex);

  document.querySelector("#prevList").addEventListener("click", prevList);
  document.querySelector("#nextList").addEventListener("click", nextList);
  document
    .querySelector("#play-pause-btn")
    .addEventListener("click", playPause);
});
