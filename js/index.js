$(document).ready(() => {
	$('#add-btn').on('click', addSoundEle);
});

var soundPanels = [];


function addSoundEle() {
	var soundPanel = $(
		'<div style="top: 20px; left: 20px" class="panel panel-default sound-panel">' +
		'<div class="crosshair">+</div>' +
		'<input type="file" onchange="fileUpload(event)"/>' +
		'<button class="btn btn-default" onclick="play(event)">Play</button>' +
		'<button class="btn btn-default" onclick="pause(event)">Pause</button>' +
		'</div>'
	);

	soundPanel.draggable({ handle: ".crosshair", drag: onMove });

	soundPanel.data('id', soundPanels.length);
	soundPanels.push({
		panel: soundPanel,
		x: 0,
		y: 0
	});

	var panelId = $('#space').append(soundPanel)
}

function onMove(event) {
	var target = event.target;
	var X = event.pageX;
	var Y = event.pageY;

	var panelId = $(target).data('id');

	soundPanels[panelId].X = (X - 200)/100;
	soundPanels[panelId].Z = (Y - 200)/100;

	if(soundPanels[panelId].howl) {
		soundPanels[panelId].howl.pos(soundPanels[panelId].X, 1, soundPanels[panelId].Z);
	}
}

function fileUpload(event){
	var file = event.srcElement.files[0];
	var reader = new FileReader();

	var panelId = $(event.srcElement.parentNode).data('id');

	reader.addEventListener("load", function () {
		var data = reader.result;
		soundPanels[panelId].howl = new Howl({
			src: [data],
			loop: true,
			pannerAttr: {
				distanceModel: 'linear'
			}
		});
		soundPanels[panelId].howl.pos(soundPanels[panelId].X, 1, soundPanels[panelId].Z);
	}, false);

	if (file) {
		reader.readAsDataURL(file);
	}
}

function play(event) {
	var panelId = $(event.srcElement.parentNode).data('id');
	soundPanels[panelId].howl.play();
}

function pause(event) {
	var panelId = $(event.srcElement.parentNode).data('id');
	soundPanels[panelId].howl.pause();
}