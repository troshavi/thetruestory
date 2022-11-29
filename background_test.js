// Subscribe to onVisited event, so that injectSite() is called once at every pageload.
chrome.history.onVisited.addListener(injectSite);

function injectSite(data) {

    chrome.tabs.executeScript({ code: 'PARAMS = ' + 123 + ';' });
    chrome.tabs.executeScript({ file: 'script_test.js' });

}