/**
 * 开启幸运转盘
 * @example 普通用法
 * <ANY id="service-luckywheel" class="open-luckywheel" open-luckywheel></ANY>
 *
 * @example 特殊用法
 * <ANY id="service-luckywheel" open-luckywheel class="open-luckywheel"
 *     luckywheel-noimage="false"  要不要显示为飘窗
 *     luckywheel-src="../../../../_Common/Content/Views/LuckyWheel/luckeywheel_service.png"  图片网址
 *     luckywheel-width="100%"  弹窗视窗的宽度
 *     luckywheel-height="100%" 弹窗视窗的高度
 *     ></ANY>
 *
 * @example 不是飘窗的时候
 * <ANY open-luckywheel ng-click="openLuckywheel" luckywheel-noimage="true"></ANY>
 *
 *
 * 注意：若是没有活动时，directive会把自己给隐藏起来
 *
 * @style structure
 * 目前样式是依赖类别改变，所以你可以透过权重改变飘窗样式
 * 元件结构：
 *     #service-luckywheel
 *         img.openluckywheel-image
 *         span.close-luckywheel
 */

app.directive("openLuckywheel", [
  "$compile",
  "$window",
  "$http",
  function ($compile, $window, $http) {
    return {
      restrict: "A",
      link: function (scope, element, attrs) {
        scope.hasLuckywheel = false;

        // 视窗的长宽
        var width = attrs.luckywheelWidth || screen.width;
        var height = attrs.luckywheelHeight || screen.height;

        // 不需要图片加其他连结
        var noImage = attrs.luckywheelNoimage === "true" || false;

        // 飘窗样式
        var serviceStyle = [
          "display:inline-block;",
          "position:fixed;",
          "top:auto;",
          "left:0;",
          "right:auto;",
          "bottom:0;",
          "z-index:999;",
        ];

        // 关闭按钮样式
        var closeButtonStyle = [
          "position:absolute;",
          "display:block;",
          "top:0;",
          "right:0;",
          "height:26px;",
          "width:26px;",
          "cursor:pointer;",
          "background:url('/CdnRedirect//Web.Portal/_Common/Content/Views/Shared/images/close.png') no-repeat center center;",
        ];

        // 路口图片
        var imgSrc =
          attrs.luckywheelSrc ||
          "../../../../_Common/Content/Views/LuckyWheel/serviceLuckywheel.png";
        var serviceStyle =
          "<style>.open-luckywheel{" +
          serviceStyle.join("") +
          "}.open-luckywheel>.close-luckywheel{" +
          closeButtonStyle.join("") +
          "}</style>";
        var imgHtml =
          '<img ng-click="openLuckywheel()" class="openluckywheel-image" src="' +
          imgSrc +
          '">' +
          "</img>";
        var closeButtonHtml =
          '<span class="close-luckywheel" ng-click="closedLuckywheel()"></span>';
        var serviceHtml = serviceStyle + imgHtml + closeButtonHtml;
        serviceHtml = imgHtml;

        // 询问有无活动
        $http.post("/LuckyWheel/GetEventInfo", {}).then(function (result) {
          if (!result && !result.data) {
            // 转盘API坏掉了
            angular.element(element).css("display", "none");
            return;
          }

          if (!result.data.isSuccess && !result.data.response) {
            // 转盘没有开启，不做任何事情
            angular.element(element).css("display", "none");
            return;
          }

          noImage ? "" : element.append($compile(serviceHtml)(scope));

          scope.hasLuckywheel = true;

          // 开启幸运转盘用之函式
          scope.openLuckywheel = function () {
            var luckywheel = $window.open(
              "/LuckyWheel",
              "_luckywheel",
              "width=" + width + ",height=" + height
            );
            luckywheel.moveTo(0, 0);
            luckywheel.focus();
          };

          scope.closedLuckywheel = function () {
            angular.element(element).css("display", "none");
          };
        });
      },
    };
  },
]);
