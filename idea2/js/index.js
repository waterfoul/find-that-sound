$(document).ready(() => {
	$('#add-btn').on('click', addSoundEle);

	$('#person').draggable({ drag: (event) => {
		var target = event.target;
		playerX = (event.pageX - 200)/100;
		playerZ = (event.pageY - 200)/100;

		Howler.pos(playerX, 1, playerZ);
	} });
});

var soundPanels = [];

var playerX = 0;
var playerZ = 0;


function addSoundEle() {
	var soundPanel = $(
		'<div style="top: 0px; left: 0px" class="panel panel-default sound-panel">' +
		'<div class="crosshair">+</div>' +
		'<button class="btn btn-default" onclick="play(event)">Play</button>' +
		'<button class="btn btn-default" onclick="pause(event)">Pause</button>' +
		'</div>'
	);

	soundPanel.data('id', soundPanels.length);

	var panelObj = {
		X: (Math.random() * 4) - 2,
		Z: (Math.random() * 4) - 2,
		howl: new Howl({
			src: ['sound/coin-spin-light.mp3'],
			loop: true,
			pannerAttr: {
				distanceModel: 'linear'
			}
		})
	};

	soundPanels.push(panelObj);

	soundPanel.css({top: panelObj.Z * 100 + 200, left: panelObj.X * 100 + 200});

	// soundPanel.draggable({
	// 	handle: ".crosshair",
	// 	drag: onMove
	// });

	panelObj.panel = soundPanel;

	var panelId = $('#space').append(soundPanel)
}

function onMove(event) {
	var target = event.target;
	var X = event.pageX;
	var Y = event.pageY;

	var panelId = $(target).data('id');

	soundPanels[panelId].X = (X - 200)/100;
	soundPanels[panelId].Z = (Y - 200)/100;

	soundPanels[panelId].howl.pos(soundPanels[panelId].X, 1, soundPanels[panelId].Z);
}

function play(event) {
	var panelId = $(event.srcElement.parentNode).data('id');
	soundPanels[panelId].howl.play();
	soundPanels[panelId].howl.pos(soundPanels[panelId].X, 1, soundPanels[panelId].Z);
}

function pause(event) {
	var panelId = $(event.srcElement.parentNode).data('id');
	soundPanels[panelId].howl.pause();
}