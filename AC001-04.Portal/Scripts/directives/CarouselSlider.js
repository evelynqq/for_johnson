// #region carouselSlider Directive
//
// @name
// <tag carousel-slider parms></tag>
//
// @description
// 使用 superSlider Plugins 达到效果
// 提供子选单和电子游艺画面使用左右箭头的旋转效果
//
// @parms
// 1. 设置每页显示游戏城的数量
//    super-vis="7"
// 2. 设置旋转效果
//    super-effect="leftLoop"
// 3. 是否自动轮播
//    super-play="true"
// 4. 毫秒；自动运行间隔。当effect为无缝滚动(topMarquee/leftMarquee)时，相当于运行速度。 预设2500ms
//    super-inter-time
// 5. 毫秒；切换效果持续时间（一次切换效果执行所用的时间长度）。预设500ms
//    super-delay-time
//
// @example
// HTML:
// <div carousel-slider
//      super-vis="8"
//      super-play="true"
//      super-effect="leftLoop">
//     <span class="prev"></span>
//     <span class="next"></span>
//     <div class="main-cell">
//         <ul class="game-list" ng-init="show='mg'">
//            <li>...略..</li>
//         </ul>
//     </div>
// </div>
// CSS：
//  请自行处理
//
// #endregion carouselSlider Directive
app.directive('carouselSlider', ['$timeout', '$compile', function ($timeout, $compile) {

    // 暂存 ng-init
    var scopeInit = [];
    var i = 0;

    var initState = true;
    return {
        restrict: 'A',
        // 利用优先权设定挡住ng-init(priority:450)
        // 防止SuperSilde记录到已被启用的样式
        priority: 451,
        // 舍弃timeout，采用Drictive元件生命周期
        link: {
            // 元件初始化
            pre: function preLink(scope, iElement, iAttrs, controller) {

                if (iAttrs.ngInit) {
                    // 暂存 ng-init
                    scopeInit.push(iAttrs.ngInit);
                    // 清空 ng-init
                    iAttrs.ngInit = "";
                }
            },

            // 元件存活后，开始执行任务
            post: function postLink(scope, element, attrs, controller) {
                var dataLength = parseInt(attrs.dataLength);
                $timeout(function () {

                    $(element).slide({
                        autoPage: true,
                        mainCell: '.main-cell >',
                        effect: attrs.superEffect || 'leftLoop',
                        autoPlay: !(attrs.superPlay === 'false'),
                        vis: parseInt(attrs.superVis) || 5,

                        interTime: parseInt(attrs.superInterTime) || 2500,
                        delayTime: parseInt(attrs.superDelayTime) || 500,
                        mouseOverStop: false,
                        opp: false,
                        pnLoop: false,
                        // SuperSilde 官方自带生命周期控制程式入口
                        // 该入口在效果套用前执行
                        startFun: function (index, navObjSize, slider, hontai, conBox, tarObj, prevBtn, nextBtn) {

                            // 若Drictive第一次执行，初始化scope
                            if (initState) {
                                for (var scope_index = 0; scope_index < scopeInit.length; scope_index++) {
                                    scope.$eval(scopeInit[scope_index]);
                                }
                                // 更改directive状态
                                initState = false;

                            }

                        }
                    });
                }, 1);
            }
        }

    };
}]);