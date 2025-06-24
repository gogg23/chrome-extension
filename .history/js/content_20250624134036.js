let mediaRecorder;
let recordedChunks = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'request_recording') {
    startRecording()
      .then(() => {
        sendResponse({ status: 'recording_started' });
      })
      .catch((err) => {
        console.error('Recording failed:', err);
        sendResponse({ status: 'error', error: err.message });
      });
    return true; // keeps sendResponse alive for async
  }

  if (message.action === 'stopvideo') {
    stopRecording();
    sendResponse({ status: 'recording_stopped' });
  }
});

async function startRecording() {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: 'screen' },
    audio: true,
  });

  mediaRecorder = new MediaRecorder(stream);
  recordedChunks = [];

  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm',
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'recorded-video.webm';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}
