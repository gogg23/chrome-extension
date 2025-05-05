console.log('Hi, i have been injected whoopie!!!');

Chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_recording') {
    console.log('request recording');
  }
});
