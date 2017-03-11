define(["add_bounced", "native"],function(add_bounced, native) {　
    //添加弹框
    add_bounced.add_bounced();
    //关闭弹框
    add_bounced.close_tip();
    //ajax规则
    var baseUrl = "https://o.qfpay.com";
    var uploadFileUrl = "https://o2.qfpay.com";

    var userAgentQYB;
    native.getDeviceInfo({}, function (cb) {
        userAgentQYB = "QYB" + "/" + cb.appver + " " + cb.phonemodel + "/" + cb.os + " " + cb.network;
    });
    
    function ajax_rule(url, type, dataType, data, zhecengid, success_func, error_func) {
        var requestUrl = '';
        if (url !== "/util/v1/uploadfile")
        {
            requestUrl = baseUrl + url + '?' +'format=cors';
        }else {
            requestUrl = uploadFileUrl + url;
        }
        if (url.indexOf('https://qudao.qfpay.com') > -1){
            requestUrl = url + '?' +'format=cors' ;
        }
        $.ajax({
            url: requestUrl,
            type: type,
            dataType: dataType,
            data: data,
            beforeSend: function(xhr) {
                $('#load_small_bg').show();
                // $(zhecengid).show();
                // $('#load_small_bg').show();
                if (userAgentQYB !== null && userAgentQYB !== undefined){
                    xhr.setRequestHeader("User-Agent", "userAgentQYB");
                }
            },
            success: function(data) {
                if (data.respcd != '0000') {
                    $('#alert_alert').show();
                    $(zhecengid).show();
                    if (!data['respmsg']) {
                        $('#alert_alert .alert_con_br').html(data['resperr']);
                    } else {
                        $('#alert_alert .alert_con_br').html(data['respmsg']);
                    }
                    if (error_func) {
                        error_func();
                    }
                } else {
                    // console.log('success---ing');
                    var return_data = data.data;
                    if(success_func){
                        success_func(return_data);
                    }                    
                    // $(zhecengid).hide();
                    // $('.load').hide();
                }
            },
            error: function(data) {
                $('#alert_alert').show();
                $(zhecengid).show();
                //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
                $('#alert_alert .alert_con_br').html('网络超时!');
            },
            complete: function() {
                $('#load_small_bg').hide();
                // $('#load_small_bg').hide();
            }
        });
    }
    return {
        ajax_rule: ajax_rule,
    };　
});
