chrome.runtime.onMessage.addListener(function(request, sender) {
    fetch(request.url, request.options)
    .then(response => response.json())
    .then(response =>{
        chrome.tabs.sendMessage(sender.tab.id, 
                {
                    obj_id: request.obj_id,
                    data: response
                }
            );
    });
});