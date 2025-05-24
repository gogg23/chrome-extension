console.log('Hi, i have been injected whoopie!!!');

var recorder = null; 
function onAccessApproved(stream) {
  recorder = new MediaRecorder(stream);

  recorder.start();

  recorder.onstop = function () {
    stream.getTracks().forEach(function (track) {
      if (track.readyState=== 'live') {
        track.stop();
      }
  })
     
  recorder.ondataavailable = function (event) {
    let recorderBlob = event.data;
    let url = URL.createObjectURL(recorderBlob); 
    
    let a = document.createElement('a');

    a.style.display = 'none';
    a.href = url; 
    a.download = '
  }

  }
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_recording') {
    console.log('request recording');

    sendResponse(`processed:${message.action}`);

    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        width: 9999999999,
        height: 9999999999,
      }
    }).then((stream) => {
      onAccessApproved(stream);
    });
  }
});
