$(document).ready(() => {
	$('#add-btn').on('click', addSecondCow);

	$('#person').draggable({
		start: function(){ufoHum.play()} ,
		stop: function(){ufoHum.pause()},
		drag: (event) => {
			var target = event.target;

			var left = parseInt($(target).css('left'));
			var width = parseInt($(target).css('width'));
			var top = parseInt($(target).css('top'));
			var height = parseInt($(target).css('height'));

			playerX = (left + width/2 - 200)/100;
			playerZ = (top + height/2 - 200)/100;

			var distanceToCow = Math.abs(playerX - cow.X) + Math.abs(playerZ - cow.Z);

			if(distanceToCow < 0.2 && !cow.found) {
				cow.howl.pause();
				cow.panel.show();

				cow.found = true;
				cow.howl = new Howl({
					src: ['sound/death' + (Math.round(Math.random() * 4) + 1) + '.wav'],
					autoplay: true,
					pannerAttr: {
						distanceModel: 'inverse'
					}
				})
			}

			if(cow2) {
				var distanceToCow2 = Math.abs(playerX - cow2.X) + Math.abs(playerZ - cow2.Z);

				if (distanceToCow2 < 0.2 && !cow2.found) {
					cow2.howl.pause();
					cow2.panel.show();

					cow2.found = true;
					cow2.howl = new Howl({
						src: ['sound/death' + (Math.round(Math.random() * 4) + 1) + '.wav'],
						autoplay: true,
						pannerAttr: {
							distanceModel: 'inverse'
						}
					})
				}
			}

			Howler.pos(playerX, 1, playerZ);
		}
	});

	addSoundEle();
});

var cow = {};

var cow2 = null;

var playerX = 0;
var playerZ = 0;

var ufoHum = new Howl({
			src: ['sound/ufoHum.mp3'],
			autoplay: false,
			loop:true,
			pannerAttr: {
				distanceModel: 'inverse'
			}
});


function addSecondCow() {
	cow2 = createCow();
	$('#add-btn').hide();
}

function addSoundEle() {
	cow = createCow();
}


function createCow() {
	var soundPanel = $(
		'<div style="top: 0px; left: 0px; display:none" class="sound-panel">' +
		'<div class="crosshair"><img src="css/cow.png"></div>' +
		'</div>'
	);

	$('#space').append(soundPanel);

	var innerCow = {
		X: (Math.random() * 4) - 2,
		Z: (Math.random() * 4) - 2,
		howl: new Howl({
			src: ['sound/cow.mp3'],
			autoplay: true,
			loop: true,
			pannerAttr: {
				distanceModel: 'inverse'
			}
		})
	};

	soundPanel.css({top: innerCow.Z * 100 + 200 - 20, left: innerCow.X * 100 + 200 - 6});

	innerCow.panel = soundPanel;

	innerCow.howl.pos(innerCow.X, 1, innerCow.Z);

	return innerCow;
}