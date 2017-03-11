/**
 * Created by mac on 17/3/7.
 */
define(function () {
    function fileImgUrl(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url;
    }

    return {
        fileImgUrl:fileImgUrl,
    };
});