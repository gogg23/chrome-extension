document.getElementById('DOMContentLoaded', () => {
  //GET THE SELECTORS OF THE BUTTONS
});
const startVideoButton = document.querySelector('button#start-button');
const stopVideoButton = document.querySelector('button#stop-button');

//adding event listeners

startVideoButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: 'request_recording' },
      function (response) {
        if (chrome.runtime.lastError) {
          console.log(response);
        }
      }
    );
  });
});
