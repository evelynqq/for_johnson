// ng-app
var app = angular.module('portalApp', ["ui.bootstrap", "ngAnimate", "slotGame", "lobbyNav"]);

// 登入后弹出最新公告
app.directive('postDialog', function () {
    return {
        restrict: 'A',
        scope: '=',
        link: function (scope) {
            if (angular.isDefined(scope.$root.user) && scope.$root.user.isLogin) {
                // 检查登入后是否已显示过公告
                var postShown = localStorage.getItem('postShown');
                if (postShown !== 'true') {
                    scope.isMarqueeShowClass = true;
                    // 显示过了设为 true 避免下次再显示
                    localStorage.setItem('postShown', 'true');
                }
            } else {
                // 未登入时将 postShown 设为 false，避免下次登入时有残留值
                localStorage.setItem('postShown', 'false');
            }
        }
    }
});

// #region FishSwing Directive
//
// @name
// <tag fish-swing @parms></tag>
// <fish-swing @parms></fish-swing>
//
// @description
// 在需要的画面中添加鱼的元件
// 若是fish-random 设为false，则会鱼游动范围会局限于上层元件，并左右游动
// 
// @parms 
//  1. 设置鱼的速度
//     fish-speed="300" 
//  2. 设置动画速度
//     fish-frame="750" 
//  3. 设置鱼的图片
//     fish-image="/CdnRedirect/Web.Portal/@ViewBag.WebSiteName/Content/Views/Shared/images/service_ag_fish.gif"
//  4. 设置鱼图片的宽度
//     fish-width="370"
//  5. 设置鱼图片的高度
//     fish-height="223"
//  6. 设置鱼在图片的向量之X轴单位量
//     fish-vector-x="-1"
//  7. 设置鱼在图片的向量之Y轴单位量
//     fish-vector-y="-0.78"
//  8. 设置鱼的转动角度范围
//     fish-deg-range="150"
//  9. 设置进入的游戏城
//     fish-lobby="toAGFish()"
//  10. 设置鱼缸ID
//     fish-id="service-agfish"
//  11. 设置鱼缸讯息
//     fish-info="快速进入AG捕鱼王"
//  12. 设置鱼缸讯息颜色
//     fish-info-color="#000"
//  13. 设置z-index
//     fish-zindex="9999"
//  14 设置鱼是否随机在视窗中游泳
//     fish-random="true"
//  15. 设置鱼图片的缩放
//     fish-scale="0.67"
//  16. 给固定形态的初始角度
//     fish-fixed-deg="-10"
//
//  @example
//      HTML:
//
//     <fish-swing fish-speed="300"
//                 fish-frame="750"
//                 fish-image="/CdnRedirect/Web.Portal/@ViewBag.WebSiteName/Content/Views/Shared/images/service_ag_fish.gif"
//                 fish-width="370"
//                 fish-height="223"
//                 fish-vector-x="-1"
//                 fish-vector-y="-0.78"
//                 fish-deg-range="150"
//                 fish-lobby="toAGFish()"
//                 fish-id="service-agfish"
//                 fish-info="快速进入AG捕鱼王"
//                 fish-info-color="#000"
//                 fish-zindex="9999"
//                 fish-random="true"
//                 fish-fixed-deg="-10"
//                 fish-scale = "0.67"></fish-swing>
//
app.directive('fishSwing', ['$compile', '$interval', '$document', function ($compile, $interval, $document) {

    // 设置鱼缸尺寸之函式
    var scene = function (set_width, set_height) {
        var width = set_width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var height = set_height || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        return {
            width: width,
            height: height
        };
    };

    // 随机整数产生
    var getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    return {
        restrict: 'AE',
        link: function (scope, element, attrs) {

            // 设置动画速度
            var _frame = attrs.fishFrame || getRandomInt(700, 800);

            // 设定鱼缸
            var _container = angular.element(element);

            // 设置鱼随机移动与否
            var _random_move = JSON.parse(attrs.fishRandom || true);

            // 设置鱼的速度
            var _speed = attrs.fishSpeed || getRandomInt(300, 450);

            // 设置鱼的图片
            var _image = attrs.fishImage || '/CdnRedirect/Web.Portal/AF001-02.Portal/Content/Views/Shared/images/service_ag_fish.gif';

            // 设置鱼图片的缩放
            var _scale = attrs.fishScale || 0.67;

            // 设置鱼图片的宽度
            var _width = (attrs.fishWidth || 370) * _scale;

            // 设置鱼图片的高度
            var _height = (attrs.fishHeight || 223) * _scale;

            // 设置鱼在图片的向量之X轴单位量
            var _vector_x = attrs.fishVectorX || -1;

            // 设置鱼在图片的向量之Y轴单位量
            var _vector_y = attrs.fishVectorX || -0.78;

            // 设置鱼的转动角度范围
            var _deg_range = attrs.fishDegRange || 150;

            // 设置进入的游戏城
            var _toLobby = attrs.fishLobby || 'toAGFish()';

            // 设置鱼缸ID
            var _css_id = attrs.fishId || 'Service-AGFish';

            // 设置鱼缸讯息
            var _info = attrs.fishInfo || '快速进入AG捕鱼王';

            // 设置鱼缸讯息颜色
            var _info_color = attrs.fishInfoColor || '#fff';

            // 设置鱼缸大小
            var _tank = scene(attrs.fishTankWidth, attrs.fishTankHeight);

            // 设置z-index
            var _zindex = attrs.fishZindex || '9999';

            // 固定用角度初值
            var fixed_deg = attrs.fishFixedDeg || -10;

            // Interval 的乘载变数
            var timer = false;

            // 鱼图像样式
            var fish_image_style = {
                'display': 'block',
                'position': 'relative',
                'margin': '0 auto',
                'width': _width + 'px',
                '_height': _height + 'px',
                'vertical-align': 'middle'
            };

            // 母元素样式
            _tank = scene(element.parent()[0].offsetWidth, element.parent()[0].offsetHeight);
            element.css({
                'display': 'block',
                'position': 'absolute',
                'top': 0,
                'left': 0
            });

            // 调整宽高以最大的为主要值
            if (_width > _height) {
                fish_image_style.margin = (_width - _height) / 2 + 'px auto';
                _height = _width;
            } else {
                fish_image_style.margin = (_height - _width) / 2 + 'px auto';
                _width = _height;
            }

            // 鱼的实体
            var fish = {
                old_position: {
                    x: 0,
                    y: 0
                },

                // 随机在萤幕中产生 || 固定型的会设为物件中心
                new_position: {
                    x: (_random_move == true) ? getRandomInt(_width, (_tank.width - _width * 2)) : _tank.width / 2 - _width / 2,
                    y: (_random_move == true) ? getRandomInt(_height, (_tank.height - _height * 2)) : _tank.height / 2 - _height / 2
                },
                old_angle: 0,

                // 随机给个角度 || 固定型的会设为固定值
                new_angle: (_random_move == true) ? getRandomInt(-180, 180) : Math.atan2(_vector_y * Math.sin((Math.PI * fixed_deg) / 180), _vector_x * Math.cos((Math.PI * fixed_deg) / 180)) * (180 / Math.PI),
                contant_style: {
                    'position': 'absolute',
                    'top': _tank.height / 2 + 'px',
                    'left': _tank.width / 2 + 'px',
                    'width': _width + 'px',
                    'height': _height + 'px',
                    'z-index': '9999',
                    'transition': _frame / 1000 + 's ease-out'
                },
                fish_style: {
                    'display': 'block',
                    'position': 'absolute',
                    'top': '0',
                    'left': '0',
                    'width': _width + 'px',
                    'height': _height + 'px',
                    'line-height': _height + 'px',
                    'transform': 'rotate(45deg);',
                    'transform-origin': 'center center',
                    'transition': _frame / 1000 + 's ease-out'
                },
                image_style: fish_image_style,
                info_style: {
                    'position': 'absolute',
                    'bottom': '0',
                    'left': '0',
                    'width': '100%',
                    'color': _info_color,
                    'font-size': '14px',
                    'font-family': '\'Microsoft Yahei\'',
                    'line-height': '16px',
                    'text-shadow': '0px 0px 10px #000',
                    'text-align': 'center'
                }
            };

            // 改变样式之方程式
            var setFishStyle = function (fish) {
                // 更新鱼缸样式在实体中
                fish.contant_style.top = fish.new_position.y + 'px';
                fish.contant_style.left = fish.new_position.x + 'px';

                // 更新鱼的样式在实体中
                fish.fish_style.transform = 'rotate(' + fish.new_angle + 'deg)';
                fish.fish_style['transform-origin'] = 'center center';

                // 更新鱼的实体数据
                fish.old_angle = fish.new_angle;
                fish.old_position = fish.new_position;
            };

            // 第一次渲染之方程式
            var templateHTML = function (fish) {
                setFishStyle(fish);
                return '<aisde fish-contant>' +
                    '<div fish-instance ng-controller="LobbiesCtrl" ng-click="' + _toLobby + '">' +
                    '<img fish-image src="' + _image + '"></img>' +
                    '</div>' +
                    '<div fish-info ng-style="info_style" ng-show="infoShow" ng-controller="LobbiesCtrl" ng-click="' + _toLobby + '">' +
                    _info +
                    '</div>' +
                    '</aisde>';
            };

            // 渲染鱼
            _container.append(angular.element($compile(templateHTML(fish))(scope)));

            // 重复产生渲染方程式
            var generatorHTML = function (fish) {
                // make style
                setFishStyle(fish);

                // add to HTML
                FishStyleToHTML(fish);
            };

            // 产生随机型位置
            var randomPosition = function (fish) {
                // 随机角度偏移量
                var temp_angle = ((fish.old_angle) + getRandomInt(-_deg_range / 2, _deg_range / 2));

                // 产生Sin和Cos值
                // 其中转换角度变成弧度
                // http://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
                var sin = Math.sin((Math.PI * temp_angle) / 180);
                var cos = Math.cos((Math.PI * temp_angle) / 180);

                // 产生新的位置
                // CSS的Y轴和笛卡尔平面的Y轴是相反方向，因为需要转换向量
                // 藉由三角函数产生X轴偏移量与Y轴偏移量
                // X轴偏移量 为 旧位置加上 X轴向量、速度和角度COS值
                // Y轴偏移量 为 旧位置加上 Y轴向量、速度和角度SIN值
                var temp_position = {
                    x: fish.old_position.x + _vector_x * _speed * cos,
                    y: fish.old_position.y + _vector_y * _speed * sin
                };

                // 限制X轴偏移量 太小设置为零 太大设置为萤幕最大值 否则维持原样
                if (temp_position.x > _tank.width - _width || temp_position.x < 0) {
                    if (temp_position.x < 0) {
                        fish.new_position.x = 0;
                    } else {
                        fish.new_position.x = _tank.width - _width;
                    }
                } else {
                    fish.new_position.x = temp_position.x;
                }

                // 限制Y轴偏移量 太小设置为零 太大设置为萤幕最大值 否则维持原样
                if (temp_position.y > _tank.height - _height || temp_position.y < 0) {
                    if (temp_position.y < 0) {
                        fish.new_position.y = 0;
                    } else {
                        fish.new_position.y = _tank.height - _height;
                    }
                } else {
                    fish.new_position.y = temp_position.y;
                }

                // 针对样式改变方程式产生新的角度, 并限制角度再 (-180, 180)
                fish.new_angle = (temp_angle % 181);
            };

            // 产生固定型位置
            var fixedPosition = function (fish) {
                var temp_angle = fish.old_angle;
                // 鱼缸范围内左右活动
                if (fish.old_position.x < -_width) {
                    temp_angle = temp_angle + 180;
                }
                if (fish.old_position.x > _tank.width) {
                    temp_angle = temp_angle - 180;
                }

                // 产生Sin和Cos值
                // 其中转换角度变成弧度
                // http://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians
                var sin = Math.sin((Math.PI * temp_angle) / 180);
                var cos = Math.cos((Math.PI * temp_angle) / 180);

                // 产生新的位置
                // CSS的Y轴和笛卡尔平面的Y轴是相反方向，因为需要转换向量
                // 藉由三角函数产生X轴偏移量与Y轴偏移量
                // X轴偏移量 为 旧位置加上 X轴向量、速度和角度COS值
                // Y轴偏移量 为 旧位置加上 Y轴向量、速度和角度SIN值
                var temp_position = {
                    x: fish.old_position.x + _vector_x * _speed * cos,
                    y: fish.old_position.y + _vector_y * _speed * sin
                };

                fish.new_position.x = temp_position.x;
                fish.new_position.y = _tank.height / 2 - _height / 2;

                // 针对样式改变方程式产生新的角度, 并限制角度再 (-180, 180)
                fish.new_angle = (temp_angle % 181);
            };

            // 开始游动方程式
            var fishStart = function () {
                // 若 interval 没有设置 就设置他
                if (!timer) {
                    timer = $interval(function () {
                        // 判断鱼是否为随机活动
                        if (_random_move == true) {
                            randomPosition(fish);
                        } else {
                            fixedPosition(fish);
                        }
                        // 重新渲染鱼
                        generatorHTML(fish);
                    }, _frame);
                }
            };

            // 停止游动方程式
            var fishStop = function () {
                // 若 interval 设置 就取消他
                if (timer) {
                    $interval.cancel(timer);
                    timer = false;
                }
            };

            // 添加样式给鱼
            var FishStyleToHTML = function (fish) {
                // 添加鱼缸的样式
                element.find('[fish-contant]').css(fish.contant_style);
                // 添加鱼的样式
                element.find('[fish-instance]').css(fish.fish_style);
                // 添加鱼图像的样式
                element.find('[fish-image]').css(fish.image_style);
                // 添加讯息的样式
                element.find('[fish-info]').css(fish.info_style);
            };

            // 添加滑鼠进入事件
            element.on('mouseenter', function (event) {
                // 显示讯息
                scope.infoShow = true;
                // 停止鱼的游动
                fishStop();
            });

            // 添加滑鼠离开事件
            element.on('mouseleave', function (event) {
                // 关闭讯息
                scope.infoShow = false;
                // 启动鱼的游动
                fishStart();
            });

            // 鱼开始游了
            fishStart();
        }
    }
}]);
// #endregion

// layout 左下飘窗做淡入淡出用之directive
app.directive('customSlideOpacity', ['$interval', function ($interval) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            // 初始化重复器
            var intervalNumber;

            // 设定轮播图长度
            var slideLength = parseInt(attrs.slideLength) || 2;

            // 第一章轮播图编号
            scope.selectedSlide = 1;

            // 轮播
            function intervalChangeImg() {
                if (intervalNumber) {
                    $interval.cancel(intervalNumber);
                }

                intervalNumber = $interval(function () {
                    if (scope.selectedSlide == slideLength) {
                        scope.selectedSlide = 1;
                    } else {
                        scope.selectedSlide = scope.selectedSlide + 1;
                    }
                }, 3000);
            }

            intervalChangeImg();
        }
    }
}]);

// 掛載Cute-Slider套件
app.directive('customCuteslider', [function () {
    return {
        link: function (scope, element, attrs) {
            // 初始标记
            var slideInitial = true;

            // 监控slideImg有没有回来
            attrs.$observe('customCuteslider', function (interpolatedValue) {
                if (interpolatedValue != '' && slideInitial) {
                    // 做一次就把开关关闭
                    slideInitial = false;
                    // 添加效果
                    bindCuteslider(scope.slideImgs);
                }
            });

            // 挂载轮播图
            function bindCuteslider(slideImgs) {
                for (var i = 0; i < slideImgs.length; i++) {
                    // 处理imgsrc，取代字串中CDN2网址，串接CICD用的字串，塞入imgsrc
                    slideImgs[i] = '/Cdn2Redirect/' + slideImgs[i];
                }

                $.map(slideImgs, function (item) {
                    $("#imgNames").append(
                        $("<li>", {}).attr('data-delay', 6).attr('data-src', 6).attr('data-trans3d', 'tr6,tr17,tr22,tr23,tr26,tr27,tr29,tr32,tr34,tr35,tr53,tr54,tr62,tr63,tr4,tr13').attr('data-trans2d', 'tr6,tr17,tr22,tr23,tr26,tr27,tr29,tr32,tr34,tr35,tr53,tr54,tr62,tr63,tr4,tr13').append(
                            $("<img>", { src: item }).attr('data-src', item).attr('data-thumb', item),
                            $("<a>", { href: '/Promotion' }).attr('data-type', 'link')
                        )
                    )
                });

                var cuteslider3 = new Cute.Slider();
                cuteslider3.setup("cuteslider_3", "cuteslider_3_wrapper");
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_START, function (event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_END, function (event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.WATING, function (event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.CHANGE_NEXT_SLIDE, function (event) { });
                cuteslider3.api.addEventListener(Cute.SliderEvent.WATING_FOR_NEXT, function (event) { });
            }
        }
    }
}]);

// 优惠页tab调整
app.directive('promotionTab', ['$timeout', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            var listener = scope.$watch('categories',
                function (newValues, oldValues) {
                    if (newValues) {

                        // 计算间隔
                        $timeout(function () {
                            calcDistance(newValues.length);
                        });

                        // 取消监控
                        listener();
                    }
                });

            function calcDistance(count) {
                var margin = ($('#un-lobby ul.navtab').width() - count * 130) / (count - 1);
                $('#un-lobby ul.navtab > li + li').css('margin-left', margin + 'px');
            };
        }
    }
}]);

// 项目要固定在第四个
app.directive('customCarouselSlider', ['$timeout', '$compile', function ($timeout, $compile) {

    // 暂存 ng-init
    var scopeInit = [];

    // carouselSlider 是否为初始化
    var initState = true;

    return {
        restrict: 'A',

        // 利用优先权设定挡住ng-init(priority:450)
        // 防止SuperSilde记录到已被启用的样式
        priority: 451,

        // 舍弃timeout，采用Drictive元件生命周期
        compile: function compile(tElement, tAttrs, transclude) {
            return {
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

                    var list = [];

                    element.find('li').each(function () {
                        list.push($(this).attr('class'));
                    });

                    $(element).slide({
                        mainCell: '.main-cell >',
                        autoPage: false,
                        effect: attrs.superEffect || 'leftLoop',
                        autoPlay: !(attrs.superPlay === 'false'),
                        vis: parseInt(attrs.superVis) || 5,
                        trigger: 'click',
                        mouseOverStop: false,
                        opp: false,

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

                            // 编译元件内HTML
                            var slideElement = $compile(conBox.html())(scope);

                            // 重新填充HTML给SuperSilde
                            conBox.empty().append(slideElement);

                            // Task69121 追加要把项目固定在第四个                               
                            scope.show = list[(index + 3) % 16];
                        }
                    });
                }
            }
        }
    }
}]);

$(document).ready(function () {
    // 首页footer 人数投注数跳动
    setInterval(function () {
        calc();
    }, 4000);

    var calc = function () {
        var t = new Date().getTime() + "";

        var a = parseInt(t.substr(t.length - 8, 8) * 7);
        var b = parseInt(t.substr(t.length - 8, 8) * 6);
        var c = parseInt(t.substr(t.length - 8, 8) * 100);
        a = a / 100;
        b = b / 100;

        $("#num01").html(parseInt(a).toLocaleString());
        $("#num02").html(parseInt(b).toLocaleString());
        $("#num03").html(parseFloat(c).toLocaleString());
    }
    calc();

    // 有登入的话最新消息宽度要做调整
    if ($('#news').attr("data-login") == 'True')
        $('#news').addClass('is-login')

    // layoutAside的active特效
    $("#sidebar li").hover(function () {

        // 定义第几个
        var index = $("#sidebar li").index(this);

        // 滑到就新增active状态
        $(this).toggleClass('active');

        // 滑到谁背景就跟着过去
        $('#sidebar li.bg').stop().animate(
            { "top": 40 * index }, 300, "linear");
    });

    //跑马灯外挂  参考：http://aamirafridi.com/jquery/jquery-marquee-plugin
    //使用class 供应其他页面不同跑马灯需要时可以使用
    //如果同时不同页面需要其他效果，请建新的
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