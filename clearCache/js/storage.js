var storage = chrome.storage.local;


//保存配置
function saveChange() {

    var params = findSetting();
    var defaultSetting = JSON.stringify(params);
    //

    //保持数据
    storage.set({
        'optionSetting': defaultSetting
    }, function () {
        chrome.notifications.create(null, {
            type: 'basic',
            iconUrl: 'img/icon_128.png',
            title: '',
            message: '配置成功保存'
        });

    });

}

//获取配置
function renderingPage() {

    storage.get('optionSetting', function (setting) {
        debugger
        var optionSetting = setting.optionSetting;
        if (optionSetting.length > 0) {
            //获取配置
            var params = JSON.parse(optionSetting)
            //如果有配置的话，删除默认checked
            var checkedInputs = $(document).find(("input:checked"));
            for (var index = 0; index < checkedInputs.length; index++) {
                var elem = $(checkedInputs[index]);
                elem.removeAttr("checked");
            }

            for (var key in params) {
                var domHtml = $(document).find("input[name=" + key + "]")
                if (domHtml && domHtml.length > 0) {
                    for (var index = 0; index < domHtml.length; index++) {
                        var elem = $(domHtml[index]);
                        var value = elem.val();
                        if (value.toString() == params[key].toString()) {
                            elem.attr("checked", true);
                            break;
                        }
                    }

                }
            }
        }
    })
}

//从当前页面中读取数据
function findSetting() {
    var params = {};
    //删除内容
    var clearContentList = $(".options_content_radio").find(">input:checked");
    if (clearContentList && clearContentList.length > 0) {
        for (var index = 0; index < clearContentList.length; index++) {
                params[$(clearContentList[index]).attr("name")] = true;
        }
    }
    //删除时长
    var clearTimeList = $(".options_time_radio").find(">input:checked");
    if (clearTimeList && clearTimeList.length > 0) {
        for (var index = 0; index < clearTimeList.length; index++) {
            params["time"] = parseInt($(clearTimeList[index]).val());
        }
    }
    //是否刷新任务
    var clearRefresh = $(".option_refresh").find(">input");

    if (clearRefresh.attr("checked") == "checked") {
        params["reloadHtml"] = true;
    } else {
        params["reloadHtml"] = false;
    }

    return params;
}