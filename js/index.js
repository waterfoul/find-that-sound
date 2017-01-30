$(document).ready(() => {
	$('#add-btn').on('click', addSoundEle);
});


function addSoundEle() {
	var soundPanel = $('<div style="top: 20px; left: 20px" class="panel panel-default sound-panel"><div class="crosshair">+</div><input type="file" onchange="fileUpload(event)"/></div>');

	soundPanel.draggable({ handle: ".crosshair", drag: onMove });

	$('#space').append(soundPanel)
}

function onMove(event) {
	var target = event.target;
	var X = event.pageX;
	var Y = event.pageY;
	// console.log(target, X, Y);
}

function fileUpload(event){
	var file    = event.srcElement.files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    console.log(reader.result);
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
