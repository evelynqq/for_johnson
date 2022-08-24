$(function () {
    // 載入頁頭頁尾
    $("#header").load("../Shared/_Layout.html #header>div");
    $("#content>.hot-top").load("../Shared/_Layout.html #content>.hot-top");
    $("#un-lobby>aside").load("../Shared/_LayoutAside.html aside>");
    $("#footer").load("../Shared/_Layout.html #footer>");

    // 載入head共用項目，於前方載入
    $('<link href="../../../_Common/Content/Views/Shared/custom.css" rel="stylesheet">').prependTo("head");
    $('<link href="../../../_Common/Content/normalize.css" rel="stylesheet">').prependTo("head");

    // 載入head共用項目，於後方載入
    $('<link href="../../../_Common/Content/font-awesome.min.css" rel="stylesheet">').appendTo("head");
    $('<script src="../../../_Common/Scripts/jquery-marquee/jquery.marquee.min.js"></script>').appendTo("head");
    $('<script src="../../../_Common/Scripts/ArtGameData.js"></script>').appendTo("head");
    $('<script src="../../../_Common/Scripts/ArtJs.js"></script>').appendTo("head");
});

// 導覽列
$(window).load(function () {
    // for view
    var navLobby = "";
    var navRow = 7;
    var navRank = false;
    var navFrame = "*";
    var navPosition = "";
    var navMore = null;
    var navViewList = "";

    // json
    var navJson =
        '[{"code":"game","position":"name","view":"#navGame"},{"code":"board","position":"name","view":"#navBoard"},{"code":"live","position":"vcode真人","view":"#navLive"},{"code":"sport","position":"name","view":"#navSport"},{"code":"esport","position":"name","view":"#navEsport"},{"code":"lottery","position":"name","view":"#navLottery"},{"code":"fish","position":"name","view":"#navFish"}]';
    var navList = JSON.parse(navJson);

    $.each(navList, function (i, v) {
        navLobby = v.code;
        navPosition = '<li game-box="code" style="float: left;width: 120px;">' + v.position + '</li>';
        navViewList = getViewList(navLobby, navRow, navRank, navFrame, navPosition, navMore);
        $(navViewList).prependTo(v.view + " .subnav ol");
    });
});