$(function() {
    // 載入頁頭頁尾
    $("#header").load("../Shared/_Layout.html #header>");
    $("#nav").load("../Shared/_Layout.html #nav>");
    $("#news").load("../Shared/_Layout.html #news>");
    $("#un-lobby>aside").load("../Shared/_LayoutAside.html aside>");
    $("#footer").load("../Shared/_Layout.html #footer>");

    // 載入head共用項目，於前方載入
    $('<link href="../../../_Common/Content/Views/Shared/custom.css" rel="stylesheet">').prependTo('head');
    $('<link href="../../../_Common/Content/normalize.css" rel="stylesheet">').prependTo('head');

    // 載入head共用項目，於後方載入
    $('<link href="../../../_Common/Content/font-awesome.min.css" rel="stylesheet">').appendTo('head');
    $('<script src="../../../_Common/Scripts/jquery-marquee/jquery.marquee.min.js"></script>').appendTo('head');
    $('<script src="../../../_Common/Scripts/ArtGameData.js"></script>').appendTo('head');    
    $('<script src="../../../_Common/Scripts/ArtJs.js"></script>').appendTo('head');
})