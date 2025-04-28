//chrome
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^https:/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId},
            files: ['./content.js']
        }).then(() => {
            console.log('We have injected the content script!'                
            }).catch((err) => {
                console.log(err, "error in background.js line 10");
            });
            }
});
