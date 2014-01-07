var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var TargetDivForPhoto
// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {

    var DivImage = document.getElementById(TargetDivForPhoto);
    DivImage.style.display = 'block';    // Unhide image elements
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    DivImage.src = "data:image/jpeg;base64," + imageData;
}


function ClearImage(DivForPhoto) {

    var DivImage = document.getElementById(DivForPhoto);
    // Show the captured photo
    // The inline CSS rules are used to resize the image
    DivImage.src = "";
}

function onFail(message) {
    alert('Camera Capture Failed : ' + message);
}

function capturePhoto(vDivId) {
    TargetDivForPhoto = vDivId;
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: destinationType.DATA_URL });
}


function InitializeCamera() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}
// Cordova is ready to be used!
//

