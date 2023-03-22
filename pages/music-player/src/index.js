const [videoButton] = document.getElementsByClassName("start");
const [timeline] = document.getElementsByClassName("timeline");
const [video] = document.getElementsByTagName("video");
const [currentTime] = document.getElementsByClassName("currentTime");
const [duration] = document.getElementsByClassName("duration");
const [percentage] = document.getElementsByClassName("percentage");
const [seekObj] = document.getElementsByClassName("seekObj");
const [playlist] = document.getElementsByClassName("playlist");
const [volumeButton] = document.getElementsByClassName("vol");

const url = "http://127.0.0.1:3000/";

const commands = {
  start: async () => {
    videoButton.className = "pause";
    video.play().catch(() => {});
  },
  pause: () => {
    videoButton.className = "start";
    video.pause();
  },
  vol: () => {
    volumeButton.className = "unmute";
    video.muted = true;
  },
  unmute: () => {
    volumeButton.className = "vol";
    video.muted = false;
  },
};

function createSongElement(song_id, title, songDuration, thumbnail) {
  return `
        <li>
          <a href="?watch=${song_id}">
            <img src=${thumbnail} alt="thumbnail">
            <p class="text">${title}</p>
            <p class="time">${songDuration}</p>
          </a>
        </li>
      `;
}

async function getRelatedSongs() {
  const response = await fetch(`${url}songs`, {
    mode: "cors",
  });

  const songs = await response.json();

  let playlistSongs = "";

  songs.forEach(({ song_id, title, duration: songDuration, thumbnail }) => {
    const songElement = createSongElement(
      song_id,
      title,
      songDuration,
      thumbnail
    );

    playlistSongs += songElement;
  });

  for (let i = 0; i < 5; i++) {
    playlistSongs += playlistSongs;
  }

  playlist.innerHTML = playlistSongs;
}

function calculatePercentPlayed() {
  const percentagePlayed =
    (video.currentTime / video.duration).toFixed(2) * 100;
  percentage.style.width = `${percentagePlayed}%`;
}

function calculateCurrentValue(currentTime) {
  const currentMinute = Math.floor(currentTime / 60);
  const currentSeconds = (currentTime % 60).toFixed();
  const currentTimeFormatted = `${String(currentMinute).padStart(
    2,
    "0"
  )}:${String(currentSeconds).padStart(2, "0")}`;

  return currentTimeFormatted;
}

function seek(e) {
  const percent = e.offsetX / this.offsetWidth;
  video.currentTime = percent * video.duration;
}

function updateProgressBar() {
  currentTime.innerHTML = calculateCurrentValue(video.currentTime);
  calculatePercentPlayed();
}

videoButton.onclick = () => {
  commands[videoButton.className]();
};

volumeButton.onclick = () => {
  commands[volumeButton.className]();
};

volumeButton.onmouseenter = () => {
  volumeButton.type = "range";
};
volumeButton.onmouseleave = () => {
  volumeButton.type = "button";
};

video.onended = () => {
  videoButton.classList.remove("pause");
  percentage.style.width = 0;
  currentTime.innerHTML = "00:00";
};

video.addEventListener("timeupdate", updateProgressBar);

window.addEventListener("load", async () => {
  const { search } = new URL(window.location.href);

  video.src = `${url}song${search}`;

  await Promise.all([
    getRelatedSongs(),
    new Promise((resolve) => {
      video.onloadedmetadata = () => {
        duration.innerHTML = calculateCurrentValue(video.duration);
        resolve();
      };
    }),
  ]);
});

seekObj.addEventListener("click", seek.bind(seekObj));
