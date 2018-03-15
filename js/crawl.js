chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.cmd == "crawl") {
		if (tryCrawlFromQuickBoard() == false &&
			tryCrawlFromDetailPage() == false) {
			alert("这里没有你要找的八阿哥。");
		}
	}
});

function _x(STR_XPATH) {
	var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return xresult.snapshotItem(0);
}

function tryCrawlFromQuickBoard() {
	// ID
	var bugid_node = _x("/html[@class='webkit chrome']/body[@id='jira']/div[@id='page']/section[@id='content']/div[@class='aui-page-panel']/div[@class='aui-page-panel-inner']/div[@class='issue-navigator']/div[@class='content']/div[@class='issue-search']/div[@class='details-layout']/div/div[@class='aui-group split-view']/div[@class='aui-item detail-panel']/div[@*]/div[@id='issue-content']/header[@id='stalker']/div[@class='issue-header-content']/header[@class='aui-page-header']/div[@class='aui-page-header-inner']/div[@class='aui-page-header-main']/ol[@class='aui-nav aui-nav-breadcrumbs']/li[2]/a[@id='key-val']")
	// Des
	var bugdes_node = _x("/html[@class='webkit chrome']/body[@id='jira']/div[@id='page']/section[@id='content']/div[@class='aui-page-panel']/div[@class='aui-page-panel-inner']/div[@class='issue-navigator']/div[@class='content']/div[@class='issue-search']/div[@class='details-layout']/div/div[@class='aui-group split-view']/div[@class='aui-item detail-panel']/div[@*]/div[@id='issue-content']/header[@id='stalker']/div[@class='issue-header-content']/header[@class='aui-page-header']/div[@class='aui-page-header-inner']/div[@class='aui-page-header-main']/h1[@id='summary-val']");
	return assembleBugInfo(bugid_node, bugdes_node, null);
}

function tryCrawlFromDetailPage() {
	// ID
	var bugid_node = _x("/html[@class='webkit chrome']/body[@id='jira']/div[@id='page']/section[@id='content']/div[@class='aui-page-panel']/div[@class='aui-page-panel-inner']/div[@class='issue-navigator']/div[@class='content']/div[@class='issue-view']/div[@class='issue-container']/div[@id='issue-content']/header[@id='stalker']/div[@class='issue-header-content']/header[@class='aui-page-header']/div[@class='aui-page-header-inner']/div[@class='aui-page-header-main']/ol[@class='aui-nav aui-nav-breadcrumbs']/li[2]/a[@id='key-val']")
	// Des
	var bugdes_node = _x("/html[@class='webkit chrome']/body[@id='jira']/div[@id='page']/section[@id='content']/div[@class='aui-page-panel']/div[@class='aui-page-panel-inner']/div[@class='issue-navigator']/div[@class='content']/div[@class='issue-view']/div[@class='issue-container']/div[@id='issue-content']/header[@id='stalker']/div[@class='issue-header-content']/header[@class='aui-page-header']/div[@class='aui-page-header-inner']/div[@class='aui-page-header-main']/h1[@id='summary-val']");
	return assembleBugInfo(bugid_node, bugdes_node, window.location.href);
}

function assembleBugInfo(bid_node, bdes_node, burl) {
	if (bid_node && bdes_node) {
		if (burl == null) {
			burl = window.location.protocol + "//" + window.location.host + bid_node.getAttribute("href");
		}
		var text = "【Bugfix-" + bid_node.innerText + "】" + bdes_node.innerText + "\n\n" +
			"【URL】：" + burl + "\n" +
			"【产生原因】：" + "\n" +
			"【解决方案】：" + "\n" +
			"【影响范围】：该Bug本身";
		alert(text);
		return true;
	} else {
		return false;
	}
}