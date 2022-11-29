const listFetches = [];

function BackgroundFetch() {
    if (!new.target) {
        return new BackgroundFetch();
    }

    listFetches.push(this);
    __obj_id = listFetches.length-1;

    this.onreadystatechange = null;

    this.send = function(url, options = null){
        chrome.runtime.sendMessage({obj_id: __obj_id, url: url, options: options});
    }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    listFetches[request.obj_id].onreadystatechange(request.data);
});