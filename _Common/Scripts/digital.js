// @name
// <tag digital @parms></tag>
// <digital @parms></digital>
//
// @description
// 使用于会跳动的数据 彩金、在线人数、注册人数、投注量......
//
// @parms
//  1. 最小值 (必填)
//     digital-min="100"
//  2. 最大值 (如果是区间内跳动:必填，随时间增加:非必填)
//     digital-max="200"
//  3. 多久跳一次 (单位ms，预设1~5秒随机跳动)
//     time="1000"
//  4. 数据前的文字 (预设没文字)
//     word="CNY"
//  5. 不要小数点两位 (预设有小数点两位)
//     not-point
//  6. 不要千分位 (预设有千分位)
//     not-thousandth
//  7. 随时间增加 (预设区间内跳动)
//     add
//  8. 随时间增加设定调动区间的最小值 (预设1)
//     add-min
//  9. 随时间增加设定调动区间的最大值 (预设10)
//     add-max
//  10. 小数点只要一位数
//     one-digital
//
//  @example
//      HTML:
//
//      会在1000~2000内随机跳动，需其他设定再自行增加
//      <span digital digital-min="1000" digital-max="2000"></span>
//
//      从1000开始随时间增加，并不要小数，通常可用在人数，不用设最大值
//      <span digital digital-min="1000" add not-point></span>
//

app.directive('digital', ['$interval', function ($interval) {
    // 数据要random范围内的数字
    function range(min, max) {
        // Math.floor 无条件舍去 避免min max被进位
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {
            // 设定参数
            var min = parseInt(attrs.digitalMin), // 最小值
                max = parseInt(attrs.digitalMax), // 最大值
                time = parseInt(attrs.time) ? parseInt(attrs.time) : range(1000, 5000), // 多久跳一次 -> 预设 1~5 秒随机跳
                word = attrs.word ? attrs.word : '', // 数字前加文字 -> 预设没文字
                point = $(element)[0].hasAttribute('not-point') ? '' : '.' + range(10, 99), // 小数点两位数 -> 预设小数点两位数
                oneDigital = $(element)[0].hasAttribute('one-digital'), // 小数点只要一位数
                addMin = parseInt(attrs.addMin) ? parseInt(attrs.addMin) : 1, // 随时间往上跳动的数字跳动范围最小值 -> 预设 1
                addMax = parseInt(attrs.addMax) ? parseInt(attrs.addMax) : 10; // 随时间往上跳动的数字跳动范围最大值 -> 预设 10

            //隨機初始化最小值
            if ($(element)[0].hasAttribute('random-min')) {
                min += range(addMin, addMax);;
            }

            // 格式化千分位 -> 预设有千分位
            if ($(element)[0].hasAttribute('not-thousandth')) {
                var thousand = function (number) {
                    return number;
                };
            } else {
                var thousand = function (number) {
                    var regexNum = number.toString();
                    // \d [0-9]
                    // + 一字元以上
                    // {3} 抓三个字元
                    var pattern = /(\d+)(\d{3})/;
                    // 如果pattern匹配为true 递回将字串用逗号隔开
                    while (pattern.test(regexNum)) {
                        regexNum = regexNum.replace(pattern, "$1,$2");
                    };
                    return regexNum;
                };
            };

            // 有一位数属性，小数点改成一位
            if (oneDigital) {
                point = '.' + range(1, 9);
            };

            // 随时间增加 or 区间内随机跳动 -> 预设区间内随机跳动
            if ($(element)[0].hasAttribute('add')) {
                // 有add属性数据随时间增加 不用设最大值
                $(element).html(word + thousand(min) + point);
                $interval(function () {
                    // 随机增加1~10的数字
                    var addNum = range(addMin, addMax);
                    min += addNum;
                    // 重新 random point
                    if ($(element)[0].hasAttribute('not-point')) {
                        point = '';
                    } else {
                        // 有一位数属性，小数点改成一位
                        point = oneDigital ? '.' + range(1, 9) : '.' + range(10, 99);
                    };
                    // 印出来啰 ~
                    $(element).html(word + thousand(min) + point);
                }, time);
            } else {
                // 没add属性 跑区间内随机跳动
                $(element).html(word + thousand(range(min, max)) + point);
                $interval(function () {
                    // 重新 random point
                    if ($(element)[0].hasAttribute('not-point')) {
                        point = '';
                    } else {
                        // 有一位数属性，小数点改成一位
                        point = oneDigital ? '.' + range(1, 9) : '.' + range(10, 99);
                    };
                    // 印出来啰 ~
                    $(element).html(word + thousand(range(min, max)) + point);
                }, time);
            };
        }
    }
}]);