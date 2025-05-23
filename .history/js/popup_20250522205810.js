document.addEventListener('DOMContentLoaded', () => {
  const startVideoButton = document.querySelector('button#start_video');
  const stopVideoButton = document.querySelector('button#stop_video');

  if (startVideoButton) {
    startVideoButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'request_recording' },
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
              console.log(chrome.runtime.lastError, 'error line 14');
            }
          }
        );
      });
    });
  }

  if (stopVideoButton) {
    stopVideoButton.addEventListener('click', () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: 'stopvideo' },
          function (response) {
            if (!chrome.runtime.lastError) {
              console.log(response);
            } else {
              console.log(chrome.runtime.lastError, 'error line 27');
            }
          }
        );
      });
    });
  }
});
