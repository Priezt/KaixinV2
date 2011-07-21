chrome.tabs.onUpdated.addListener(checkForValidUrl);

function checkForValidUrl(tabId, changeInfo, tab){
	if(tab.url.indexOf("http://www.kaixin001.com/home") >= 0){
		console.log("found kaixin tab");
		chrome.pageAction.show(tabId);
	}
}

