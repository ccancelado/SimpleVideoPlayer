var video, playPauseBtn, muteBtn, fullscreenBtn, seekbar, currentTime, totalTime, volumeSlider;

function initializePlayer() {
    video = document.getElementById('theVideo');
    playPauseBtn = document.getElementById('playPauseButton');
    muteBtn = document.getElementById('muteButton');
    seekbar = document.getElementById('seekbar');
    currentTime = document.getElementById('currentTime');
    totalTime = document.getElementById('totalTime');
    volumeSlider = document.getElementById('volumeSlider');
    fullscreenBtn = document.getElementById('fullscreenButton');

    playPauseBtn.addEventListener('click', playPause, false);
    seekbar.addEventListener('change', videoSeek, false);
    video.addEventListener('timeupdate', seekTimeUpdate, false);
    muteBtn.addEventListener('click', mute, false);
    volumeSlider.addEventListener('change', setVolume, false);
    fullscreenBtn.addEventListener('click', toogleFullscreen, false);
}

function playPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.style.backgroundImage = "url('images/pause.png')";
    } else {
        video.pause();
        playPauseBtn.style.backgroundImage = "url('images/play.png')";
    }
}

function mute() {
    if (video.muted) {
        video.muted = false;
        muteBtn.style.backgroundImage = "url('images/mute.png')";
        volumeSlider.value = 100;
    } else {
        video.muted = true;
        muteBtn.style.backgroundImage = "url('images/unmute.png')";
        volumeSlider.value = 0;
    }
}

function videoSeek() {
    var seekto = video.duration * (seekbar.value / 100);
    video.currentTime = seekto;
}

function seekTimeUpdate() {
    var newTime = video.currentTime * (100 / video.duration);
    seekbar.value = newTime;

    setCurrentTime();
    setTotalTime();
}

function setCurrentTime() {
    var currentMins = Math.floor(video.currentTime / 60);
    var currentSecs = Math.floor(video.currentTime - (currentMins * 60))
    currentTime.innerHTML = currentMins + " : " + currentSecs;
}

function setTotalTime() {
    var totalMins = Math.floor(video.duration / 60);
    var totalSecs = Math.floor(video.duration - (totalMins * 60))
    totalTime.innerHTML = totalMins + " : " + totalSecs;
}

function setVolume() {
    video.volume = volumeSlider.value / 100;
}

function toogleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
}

window.onload = initializePlayer;