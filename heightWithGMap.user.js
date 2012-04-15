// ==UserScript==
// @name          height with google map
// @namespace     http://ryoff.com/
// @include       http://maps.google.*
// ==/UserScript==

(function() {
    //初期設定
    document.getElementById('map').addEventListener("mousemove", check_trigger, false);
    var point = "";
    var nowLoading = 0;
    var liEle = document.createElement("li");
    liEle.setAttribute("id","heightViewErea");
    liEle.style.position = "relative";
    liEle.style.top = "1px";
    document.getElementById('links').firstChild.insertBefore(liEle, document.getElementById('links').firstChild.firstChild);

    function check_trigger() {
        if (nowLoading == 1) {
            return false;
        }
        if (document.getElementById('link').href.match(/\&ll\=([0-9\.]+,[0-9\.]+)/)) {
            var nowPoint = RegExp.$1;
            if (point == nowPoint) {
                return false;
            }
            else {
                nowLoading = 1;
                point = nowPoint;
                document.getElementById("heightViewErea").innerHTML = " loading... ";
                get_height_by_api(nowPoint);
            }
        }
    }
    function get_height_by_api(nowPoint) {
        var url = "http://lab.uribou.net/ll2h/?ll=" + nowPoint + "&jsonp=view_height";
        GM_xmlhttpRequest({method: "GET", url: url, onload: function(res) {
            eval('(' + res.responseText + ')');
        }});
    }
    function view_height(api_json) {
        if (api_json["error"] == 0) {
            height2html(api_json["height"]);
        }
        termination();
    }
    function height2html(height) {
        document.getElementById("heightViewErea").innerHTML = height + " M ";
    }
    function termination() {
        nowLoading = 0;
        return false;
    }
})();
