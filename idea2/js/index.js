$(document).ready(() => {
	// $('#add-btn').on('click', addSoundEle);

	$('#person').draggable({
		drag: (event) => {
			var target = event.target;

			var left = parseInt($(target).css('left'));
			var width = parseInt($(target).css('width'));
			var top = parseInt($(target).css('top'));
			var height = parseInt($(target).css('height'));

			playerX = (left + width/2 - 200)/100;
			playerZ = (top + height/2 - 200)/100;

			var distanceToCow = Math.abs(playerX - cow.X) + Math.abs(playerZ - cow.Z);

			console.log([left, width, top, height], [(playerX - cow.X), (playerZ - cow.Z)], distanceToCow);

			if(distanceToCow < 0.2) {
				cow.panel.show();
			}

			Howler.pos(playerX, 1, playerZ);
		}
	});

	addSoundEle();
});

var cow = {};

var playerX = 0;
var playerZ = 0;


function addSoundEle() {
	var soundPanel = $(
		'<div style="top: 0px; left: 0px; display:none" class="sound-panel">' +
		'<div class="crosshair"><img src="css/cow.png"></div>' +
		'</div>'
	);

	$('#space').append(soundPanel);

	cow = {
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

	soundPanel.css({top: cow.Z * 100 + 200 - 20, left: cow.X * 100 + 200 - 6});

	cow.panel = soundPanel;

	cow.howl.pos(cow.X, 1, cow.Z);
}