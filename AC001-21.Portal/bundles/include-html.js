$(function() {
    // 載入頁頭頁尾
    $("#top-header").load("../Shared/_Layout.html #top-header>");
    $("#header").load("../Shared/_Layout.html #header>");
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

// 導覽列
$(window).load(function() {
    var navLobby = '';
    var navRow = 10;
    var navRank = false;
    var navFrame = '';
    var navPosition = '';
    var navMore = null;
    var navViewList = '';

    // json
    var navJson = '[{"code":"live","position":"vcode真人視訊","view":"#navLive .subnav"},{"code":"game","position":"vcode電子遊藝","view":"#navGame .subnav"},{"code":"sport","position":"name","view":"#navSport .subnav"},{"code":"lottery","position":"name","view":"#navLottery .subnav"},{"code":"board","position":"name","view":"#navBoard .subnav"}]';
    var navList = JSON.parse(navJson);

    $.each(navList, function(i, v) {
        navLobby = v.code;
        navPosition = '<li>' + v.position + '</li>';
        navViewList = getViewList(navLobby, navRow, navRank, navFrame, navPosition, navMore);
        $(navViewList).prependTo(v.view);
    });
});