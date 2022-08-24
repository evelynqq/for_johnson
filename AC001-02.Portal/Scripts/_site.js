// ng-app
var app = angular.module('portalApp', ["ui.bootstrap", "ngAnimate", "slotGame", "lobbyNav"]);

app.controller('slotBoardCtrl', ['$scope', function ($scope) {
    var list = ['mg', 'pt', 'ag', 'bb', 'sg', 'hb', 'agfish', 'pp', 'gpi', 'mwfish', 'cq9', 'gns', 'mw', 'jdb', 'ne', 'rt', 'ga'];

    $scope.index = 0;

    $scope.prev = function () {
        $scope.index = ($scope.index - 1) % list.length;

        if ($scope.index < 0) {
            $scope.index = list.length - 1;
        }
    }

    $scope.next = function () {
        $scope.index = ($scope.index + 1) % list.length;
    }
}]);

app.directive('winnerList', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.winnerList = [
                { 'name': 'yi88***6', 'game': '抢劫银行', 'money': '364256.89' },
                { 'name': 'lgjj***e', 'game': '古怪猴子', 'money': '627689.85' },
                { 'name': 'k8kk***9', 'game': '千炮捕鱼', 'money': '654308.9' },
                { 'name': 'zhyy***3', 'game': '杰克高手', 'money': '453698.07' },
                { 'name': 'zq00***s', 'game': '狂欢夜', 'money': '567499.09' },
                { 'name': 'yasf***a', 'game': '伴娘', 'money': '35823.21' },
                { 'name': 'wyq4***6', 'game': '108好汉', 'money': '70465.67' },
                { 'name': 'lce8***d', 'game': '熊之舞', 'money': '436436.76' },
                { 'name': 'lilo***1', 'game': '108好汉', 'money': '552734.43' },
                { 'name': 'yx11***o', 'game': '招财鞭炮', 'money': '496321.21' },
                { 'name': 'q306***9', 'game': '花花公子', 'money': '424235.98' },
                { 'name': 'feng***4', 'game': '打破大银行', 'money': '192167.32' },
                { 'name': 'zxin***7', 'game': '淑女之夜', 'money': '654932.67' },
                { 'name': 'H854***r', 'game': '抢劫银行', 'money': '436679.09' },
                { 'name': 'gaol***w', 'game': '幸运双星', 'money': '67582.31' },
                { 'name': 'a187***h', 'game': '108好汉', 'money': '165431.02' },
                { 'name': 'A7de***f', 'game': '心跳时刻', 'money': '234534.63' },
                { 'name': 'guoh***d', 'game': '星光之吻', 'money': '743324.87' },
                { 'name': 'sjwa***s', 'game': '银行抢匪2', 'money': '665230.76' },
                { 'name': 'cuio***a', 'game': '飞龙在天', 'money': '468131.44' },
                { 'name': 'b124***b', 'game': '大明帝国', 'money': '599008.08' },
                { 'name': 'gu9m***9', 'game': '招财进宝', 'money': '546673.22' },
                { 'name': 'q10q***p', 'game': '热力宝石', 'money': '64756.44' },
                { 'name': 'mark***1', 'game': '伴娘', 'money': '478875.47' },
                { 'name': 'zzz1***q', 'game': '熊之舞', 'money': '650131.13' },
                { 'name': 'ddyy***a', 'game': '108好汉', 'money': '749936.57' },
                { 'name': 'xiet***n', 'game': '湛蓝深海', 'money': '499565.67' },
                { 'name': 'kk26***l', 'game': '花花公子', 'money': '369783.42' },
                { 'name': 'acxe***g', 'game': '打破大银行', 'money': '679953.51' },
                { 'name': 'q11r***8', 'game': '古怪猴子', 'money': '649427.78' },
                { 'name': 'cyfg***4', 'game': '抢劫银行', 'money': '289960.98' },
                { 'name': 's14z***j', 'game': '千炮捕鱼', 'money': '512726.43' },
                { 'name': 'zhao***8', 'game': '6红胡子和科', 'money': '1214045' },
                { 'name': 'ggsy***w', 'game': '森林宝藏', 'money': '284702.14' }
            ];

            if ($window.location.pathname == '/' && element.hasClass('winner-banner')) {
                element.remove();
            } else {
                angular.element(function () {
                    element.slide({
                        mainCell: '.winner-wrapper',
                        autoPlay: true,
                        vis: parseInt(attrs.vis) || 1,
                        effect: 'topMarquee',
                        interTime: 50
                    });
                });
            }
        }
    }
}]);

$(document).ready(function () {
    //跑馬燈外掛  參考：http://aamirafridi.com/jquery/jquery-marquee-plugin
    //使用class 供應其他頁面不同跑馬燈需要時可以使用
    //如果同時不同頁面需要其他效果，請建新的
    //最新消息使用
    $('.marqueen').marquee({
        //speed in milliseconds of the marquee
        duration: 12500,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right' or 'up' or 'right'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false,
        //hover over marquee to pause
        pauseOnHover: true
    });
});