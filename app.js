const tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'cfOa1a8hYP8',
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	event.target.seekTo(96);
	event.target.playVideo();
}

let done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		setTimeout(stopVideo, 0);
		done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}

const form = document.querySelector('#search-form');
form.addEventListener('submit', (event) => {
	event.preventDefault();
	const input = document.querySelector('.search input[name="url"]');
	const videoURL = new URL(input.value.trim());
	const minutes = Number(document.querySelector('.search input[name="time-minutes"]').value);
	const seconds = Number(document.querySelector('.search input[name="time-seconds"]').value);
	player.loadVideoById(videoURL.searchParams.get('v'));
	playAt(
		new Date().setTime(new Date('January 01, 2020 00:00:00').getTime() - (minutes * 60 + seconds) * 1000),
		// new Date().setTime(new Date('December 29, 2019 12:05:30').getTime() - (minutes * 60 + seconds) * 1000),
		function() {
			console.log('to play');
			player.playVideo();
		}
	);
});

function playAt(time, callback) {
	var currentTime = new Date().getTime();
	if (currentTime > time) {
		console.error('Giratiempos?');
		return false;
	}
	setTimeout(callback, time - currentTime);
	return true;
}
