/**
 * Created by mac on 17/3/15.
 */
require(['../require-config'], function() {
    require(["zepto", "ajax_rule","vue", "native"],function($, ajax_rule, vue, native){
        $(document).ready(function() {
            var page = 1;
            var vukk = new vue({
                el: '#wap',
                data: {
                    allRecords: new Array(),
                },
                created: function () {
                    var _this = this;
                    _this.frist_list_page();//获取店铺数据
                },
                methods: {
                    frist_list_page: function () {
                        var _this = this;
                        var listReq = {
                            se_userid: localStorage.getItem("userid"),
                            maxnum: "10",
                            page:''+page
                        };
                        ajax_rule.ajax_rule('/store/v1/api/store_allocate_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                            var recordArr = respData['info'];
                            if (recordArr.length > 0){
                                page = page + 1;
                            }else if (recordArr.length == 0){

                            }
                            for (var i = 0; i < recordArr.length; i++){
                                _this.allRecords.push(recordArr[i]);
                            }
                        });
                    },
                    next_list_page:function () {
                        var _this = this;
                        var listReq = {
                            se_userid: localStorage.getItem("userid"),
                            maxnum: "10",
                            page:''+page
                        };
                        ajax_rule.ajax_rule('/store/v1/api/store_allocate_list', 'GET', 'json', listReq, '.zheceng', function (respData) {
                            var recordArr = respData['info'];
                            if (recordArr.length > 0){
                                page = page + 1;
                            }else if (recordArr.length == 0){

                            }
                            for (var i = 0; i < recordArr.length; i++){
                                _this.allRecords.push(recordArr[i]);
                            }
                        });
                    }
                }
            });

            //注册下拉刷新方法
            native.updateCurrentView(function () {
                page = 1;
                var len = vukk.allRecords.length;
                vukk.allRecords.splice(0, len);
                vukk.next_list_page();
            });

            native.pullUpRefresh(function (resp) {
                vukk.next_list_page();
            });

        });
    });
});