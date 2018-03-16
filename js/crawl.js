chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.cmd == "crawl") {
		if (tryCrawling() == false) {
			alert("这里没有你要找的八阿哥。");
		}
	} else if (request.cmd == "bug_id") {
		if (justBugID() == false) {
			alert("并找不到啊。");
		}
	}
});

// 抓BugID
function crawlBugID() {
	return document.querySelector("a#key-val.issue-link");
}

// 抓BugDes
function crawlBugDes() {
	return document.querySelector("h1#summary-val");
}

// 只要 BugID
function justBugID() {
	// ID
	var bugid_node = crawlBugID();
	if (bugid_node) {
		var text = bugid_node.innerText;
		copyTextToClipboard(text);
		notifyIfNeeded(function(){
			alert("已复制「" + text + "」");
		});
		return true;
	} else {
		return false;
	}
}

// 抓取完整的提交模板所需信息
function tryCrawling() {
	// ID
	var bugid_node = crawlBugID();
	// Des
	var bugdes_node = crawlBugDes();

	return assembleBugInfo(bugid_node, bugdes_node);
}

function assembleBugInfo(bid_node, bdes_node) {
	if (bid_node && bdes_node) {
		var burl = window.location.protocol + "//" + window.location.host + bid_node.getAttribute("href");
		var text = "【Bugfix-" + bid_node.innerText + "】" + bdes_node.innerText + "\n\n" +
			"【URL】：" + burl + "\n" +
			"【产生原因】：" + "\n" +
			"【解决方案】：" + "\n" +
			"【影响范围】：该Bug本身";
		copyTextToClipboard(text);
		notifyIfNeeded(function(){
			alert("已复制，赶紧去提交，还有千万个Bug在等着你！\n" +
			"(不相信的话自己再复制一遍也行)\n\n" + text);
		});
		return true;
	} else {
		return false;
	}
}

// 复制到剪切板
function copyTextToClipboard(text) {
	var copyFrom = document.createElement("textarea");
	copyFrom.textContent = text;
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(copyFrom);
	copyFrom.select();
	document.execCommand('copy');
	body.removeChild(copyFrom);
}

// 按需通知
function notifyIfNeeded(alertt) {
		chrome.storage.local.get({
		silence: false
	}, function(items) {
		if (!items.silence) {
			alertt();
		}
	});
}