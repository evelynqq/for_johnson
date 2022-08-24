app.controller('LayoutCtrl', ['$scope', '$element', '$window', '$http', '$interval', '$location', 'signalrService', '$timeout',
    function ($scope, $element, $window, $http, $interval, $location, signalrService, $timeout) {
        // 取得語系(偷偷藏在html的属性里)
        moment.locale($("html").attr('moment-lang'));
        // 統一預設時區
        moment.tz.setDefault("Asia/Taipei");

        // #region 美東時間設定
        // 取得主机的美东时间(偷偷藏在html的属性里) 丢正确格式给moment
        $scope.meiDonNow = moment($("html").attr('meidon-time').replace(/\//g, '-'));

        //每秒更新一次
        $interval(function () {
            $scope.meiDonNow.add(1, 'seconds');
        }, 990);

        //廣播取得時間
        signalrService.on('updateMeidonNow', function (data) {
            $scope.meiDonNow = moment(data);
        });
        // #endregion 美東時間設定

        //讀取CDN資料 QQ，在線客服，電話，信箱
        $http.post('/Cdn/GetContactList')
            .then(function (resp) {
                var data = resp.data;
                $scope.ContactInfo = data;

                //#region 彈窗效果
                $timeout(function () {
                    //彈窗設定
                    $(function () {

                        //如果沒有彈窗或沒有彈窗顯示頁面設定，bye~
                        if (data.Dialog == undefined || data.DialogPage == undefined) {
                            return;
                        }

                        //那些頁面要顯示彈窗效果，轉成陣列
                        var pager = data.DialogPage.split(",");

                        //取得彈窗
                        var $this = $("#ad-dialog");
                        var img = new Image();
                        img.src = data.Dialog;

                        img.onload = function () {
                            var imgWidth = this.width;

                            $.each(pager, function (index, value) {
                                //如果當前頁面有設定就顯示彈窗
                                if (window.location.pathname == value) {
                                    $("#ad-dialog").dialog({
                                        width: imgWidth + 8,
                                        modals: true,
                                        buttons: {
                                            //footer的關閉按鈕
                                            '关闭': function () {
                                                $this.dialog("close");
                                            }
                                        },
                                        open: function (event, ui) {
                                            //幾秒後是否要關閉 1000ms = 1s
                                            setTimeout(function () {
                                                $this.dialog("close");
                                            }, 50000);
                                        },
                                        position: {
                                            //調整彈窗位置
                                            //my: "center top",
                                            //at: "center top+183"
                                        }
                                    });
                                };
                            });
                        };
                    });
                });
                //#endregion 彈窗效果
            });

        //抓取 跑馬燈資訊內容
        $http.post('/Home/GetLastMarquee')
            .then(function (resp) {
                var data = resp.data;
                $scope.newsBags = data;
            });

        /* 跑馬燈 click 事件, 彈出「跑馬燈資訊」 */
        $scope.newsClick = function () {
            $scope.isMarqueeShowClass = true;
        };

        /* 關「跑馬燈資訊」 click 事件 */
        $scope.closeMarquee = function () {
            $scope.isMarqueeShowClass = false;
        };

        /* 新手教程 click 事件 */
        $scope.noviceClick = function () {
            var novice = $window.open('http://pk3755.com/', '_open', 'width=1490,height=650');
            novice.focus();
        };

        /* 在線客服 click 事件 */
        $scope.lineChatClick = function () {
            var linechat = $window.open($scope.ContactInfo.Live800Link, '_open', 'width=1015,height=580');
            linechat.focus();
        };

        /* 企業 QQ click 事件 */
        $scope.qqClick = function (val) {
            var qq = window.open('http://wpa.qq.com/msgrd?v=3&uin=' + val + '&site=qq&menu=yes', '_open', 'width=588,height=486');
            qq.focus();
        };

        /* 免費試玩 click 事件 */
        $scope.FreePlayClick = function () {
            var freePlay = window.open('/Trial/Apply');
            freePlay.focus();
        };

        /* GPK賓果教學影片 click  事件*/
        $scope.GpkBingoClick = function () {
            var bingo = window.open('http://gpk-gameinfo.com/GALAXYonline.mp4', '_open', 'width=588,height=486');
            bingo.focus();
        }

        /* 實地賭場  click 事件 */
        $scope.liveCasinoClick = function () {
            var casino = window.open('http://gpk-gameinfo.com/Live_casino/', '_blank', 'width=1000,height=800');
            casino.focus();
        };

        /* 代理登入 click 事件 */
        $scope.AgentLoginClick = function () {
            var AgentLogin = $window.open($scope.ContactInfo.AgentLogin, '_blank');
            AgentLogin.focus();
        };

        /* 註冊 click 事件 */
        $scope.RegisterClick = function () {
            var Register = $window.open('/Register', '_parent');
            Register.focus();
        };

        /* 代理註冊 click 事件 */
        $scope.AgentApplyClick = function () {
            var AgentApply = $window.open('/AgentApply', '_parent');
            AgentApply.focus();
        };

        /* 點擊收藏 click 事件 */
        $scope.addFavoriteClick = function () {
            var url = 'http://' + $location.host();
            var title = $(document).prop('title');
            try {
                window.external.addFavorite(url, title);
            } catch (e) {
                try {
                    window.sidebar.addPanel(title, url, '');
                } catch (e) {
                    alert("请按 Ctrl+D 键添加到收藏夹", 'notice');
                }
            }
        };

        //设为首页 click事件
        $scope.addHomePageClick = function () {
            var url = 'http://' + $location.host();
            if (document.all) {
                document.body.style.behavior = 'url(#default#homepage)';
                document.body.setHomePage(url);
            } else {
                alert('您的浏览器目前不支援此功能！');
            }
        };
    }
]);