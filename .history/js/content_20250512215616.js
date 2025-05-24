console.log('Hi, i have been injected whoopie!!!');

Chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_recording') {
    console.log('request recording');

    sendResponse(`processed:${message.action}`);

    navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: {
        width: 1920,
        height: 1080,
      },
    });
  }
});
