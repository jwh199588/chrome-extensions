$('.options_content_radio').click(e => {


    var event = $(e.currentTarget).find("input");
    if (event.attr("checked") == "checked") {
        event.removeAttr("checked");
    } else {
        event.prop('checked', 'true');
    }
})
$('.options_time_radio').click(e => {


    var event = $(e.currentTarget).find("input");
    event.prop('checked', 'true');
})
$('.option_refresh').click(e => {

    var event = $(e.currentTarget).find("input");
    if (event.attr("checked") == "checked") {
        event.removeAttr("checked");
    } else {
        event.prop('checked', 'true');
    }
})


// 清理数据
$('#option_clearData').click(e => {

    //获取当前页面的地址
    chrome.tabs.getSelected(null, function (tab) {

        //解析url
        var domains = tab.url.split('/'); //以“/”进行分割
        var tabId = tab.id;
        var domain = domains[2].split(":")
        if ((domain[0] != undefined) && (domain[0] != null)) {
            if (tab.url.indexOf("http://") != -1) {
                clearData("http://" + domain[0], tabId);
            } else if (tab.url.indexOf("https://") != -1) {
                clearData("https://" + domain[0], tabId);
            }

        }
    });
})

//清理全部页面 ，只判断时间，不判断类型
$('#option_clearDataAll').click(e => {

    var params = findSetting();

    chrome.browsingData.remove({
        "since": params.time
    }, {
        "cookies": true,
        "appcache": true, //网站的缓存数据
        "cache": true,
        "history": true,
        "downloads": true,
        "fileSystems": true,
        "indexedDB": true,
        "localStorage": true
    }, clearSuccess(null, null));
})

//保存数据
$('#option_saveSetting').click(e => {

    saveChange();

})


//删除数据
function clearData(domainUrl, tabId) {

    var params = findSetting();

    var dom = [domainUrl]
    //清理内容
    var clearData = {
        "cookies": params.cookie ? params.cookie : false,
        "appcache": true, //网站的缓存数据
        "cache": params.cache ? params.cache : false
    }

    chrome.browsingData.remove({
        "origins": dom,
        "since": params.time
    }, clearData, clearSuccess(tabId, params.reloadHtml));


}

function clearSuccess(tabId, reloadHtml) {

    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'img/icon_128.png',
        title: '清除缓存',
        message: '清除缓存成功,刷新页面'
    }, reloadPage(tabId, reloadHtml));


}

//重新加载页面
function reloadPage(tabId, reloadHtml) {

    if (reloadHtml) {
        chrome.tabs.reload(tabId);
    }

}

//页面加载完成的时候，加载配置
$(document).ready(function () {

    renderingPage();

})
//获取所有的cookie
// chrome.cookies.getAll({}, function (cookies) {

// });