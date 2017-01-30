$(document).ready(() => {
	$('#add-btn').on('click', addSoundEle);
});


function addSoundEle() {
	var soundPanel = $('<div style="top: 20px; left: 20px" class="panel panel-default sound-panel"><div class="crosshair">+</div>Stuff</div>');

	soundPanel.draggable({ handle: ".crosshair", drag: onMove });

	$('#space').append(soundPanel)
}

function onMove(event) {
	var target = event.target;
	var X = event.pageX;
	var Y = event.pageY;
	console.log(target, X, Y);
}