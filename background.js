chrome.webNavigation.onCompleted.addListener(function(tab) {

    fetch(`https://thetruestory.news/api/first?lang=ru&limit=${12}&offset=${0}`)
    .then(response => response.json())
    .then(commits => {
        chrome.scripting.executeScript({
            target: { tabId: tab.tabId },
            func: (data) => {tts_main_page(data)},
            args: [commits]
        });
    });


}, {url: [{urlMatches : 'https://dzen.ru/news\?'}]});


chrome.webNavigation.onCompleted.addListener(function(tab) {
    
    var url = new URL(tab.url);
    var cluster_id = url.searchParams.get("cluster_id");

    fetch(`https://thetruestory.news/api/${cluster_id}?limit=1000`)
    .then(response => response.json())
    .then(commits => {
        chrome.scripting.executeScript({
            target: { tabId: tab.tabId },
            func: (data)=>{tts_cluster_page(data)},
            args: [commits]
        });
    });


}, {url: [{urlMatches : 'https://dzen.ru/news/story/thetruestory'}]});