app.controller('HomeCtrl', ['$scope', '$element', '$window', '$http', '$interval',
    function ($scope, $element, $window, $http, $interval) {
        var intervalNumber;
        var length;

        function intervalChangeImg() {
            if (intervalNumber) {
                $interval.cancel(intervalNumber);
            }

            intervalNumber = $interval(function () {
                if ($scope.selectedImg == length) {
                    $scope.selectedImg = 1;
                } else {
                    $scope.selectedImg = $scope.selectedImg + 1;
                }
            }, 8000);
        }

        /* 连结到优惠专区 */
        $scope.slideBannerClick = function () {
            $window.open('/Promotion', '_self', 'resizable,scrollbars=yes');
        };

        $http.post("/Cdn/GetSlider")
            .then(function (resp) {
                var data = resp.data;
                length = data.length;

                // 清空slideImgs
                $scope.slideImgs = [];

                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        // 处理imgsrc，取代字串中CDN2網址，串接CICD用的字串，塞入imgsrc
                        $scope.slideImgs.push('/Cdn2Redirect/' + data[i]);
                    }
                }

                intervalChangeImg();
            });

        $scope.changeSelected = function (index) {
            $scope.selectedImg = index + 1;

            intervalChangeImg();
        };
    }
]);