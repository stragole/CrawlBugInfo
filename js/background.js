chrome.contextMenus.create({
	title: "百万Bug，点击就送",
	contexts: ['page'],
	documentUrlPatterns: ['http://jira.meitu.com/*'],
	onclick: function() {
		sendMessageToContentScript({
			cmd: 'crawl',
		}, function(response) {});
	}
});

chrome.contextMenus.create({
	title: "我只要 BugID",
	contexts: ['page'],
	documentUrlPatterns: ['http://jira.meitu.com/*'],
	onclick: function() {
		sendMessageToContentScript({
			cmd: 'bug_id',
		}, function(response) {});
	}
});

function sendMessageToContentScript(message, callback) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
			if (callback) callback(response);
		});
	});
}