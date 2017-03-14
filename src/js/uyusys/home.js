/**
 * Created by mac on 17/3/11.
 */
require(['../require-config'], function() {
    require(["zepto","vue"],function($, vue){
        $(function() {
            $(document).ready(function() {
                alert("kkkkkk");
                var testData = {
                    message:'vue测试',
                    age:50,
                };

                var vukk = new vue({
                    el:'#app',
                    data:testData,
                });
            });
        });

        });
});



