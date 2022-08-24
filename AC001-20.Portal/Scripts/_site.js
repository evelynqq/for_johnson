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

app.directive('winnerInfo', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.winnerInfo = [
                { 'name': 'fzm***4879', 'game': '￥21', 'money': '￥8950' },
                { 'name': 'lol***4659', 'game': '￥80', 'money': '￥15780' },
                { 'name': 'jpw***66', 'game': '￥23', 'money': '￥13780.00' },
                { 'name': 'hp***688', 'game': '￥100', 'money': '￥78980' },
                { 'name': 'pp***784', 'game': '￥15', 'money': '￥20650' },
                { 'name': 'jie***96', 'game': '￥80', 'money': '￥68549' },
                { 'name': 'd***85741', 'game': '￥38', 'money': '￥4598' },
                { 'name': 'jc***568', 'game': '￥80', 'money': '￥26500' },
                { 'name': 'ly***596', 'game': '￥66', 'money': '￥19680' },
                { 'name': 'cj***7554', 'game': '￥200', 'money': '￥38560' },
                { 'name': 'yu***3356', 'game': '￥120', 'money': '￥18890' },
                { 'name': 'a****li', 'game': '￥20000', 'money': '￥19000' },
                { 'name': 'ch****en', 'game': '￥10000', 'money': '￥9500' },
                { 'name': '88****lx', 'game': '￥10000', 'money': '￥9500' },
                { 'name': 'mi****091', 'game': '￥8000', 'money': '￥7600' },
                { 'name': 'l****11', 'game': '￥15000', 'money': '￥14250' },
                { 'name': 'lp****21', 'game': '￥12000', 'money': '￥11400' },
                { 'name': 'zk****88', 'game': '￥24000', 'money': '￥22800' },
                { 'name': 'bl****6', 'game': '￥15000', 'money': '￥14250' },
                { 'name': 'fe****26', 'game': '￥25000', 'money': '￥23750' },
                { 'name': 'zx****95', 'game': '￥9000', 'money': '￥8550' },
                { 'name': 'y1****ye', 'game': '￥10000', 'money': '￥9500' },
                { 'name': 'ly****ai1', 'game': '￥16000', 'money': '￥15200' },
                { 'name': 'mi****07', 'game': '￥18000', 'money': '￥17100' },
                { 'name': 'hu****23', 'game': '￥10000', 'money': '￥9500' },
                { 'name': 'ch****53', 'game': '￥16000', 'money': '￥15200' },
                { 'name': 'qi****18', 'game': '￥30000', 'money': '￥28500' },
                { 'name': 'zh****p11', 'game': '￥28000', 'money': '￥26600' },
                { 'name': 'sh****u3', 'game': '￥18000', 'money': '￥17100' }
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
                        interTime: 20
                    });
                });
            }
        }
    }
}]);