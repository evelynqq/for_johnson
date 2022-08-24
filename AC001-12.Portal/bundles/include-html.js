$(function() {
    // 載入頁頭頁尾
    $("#header").load("../Shared/_Layout.html #header>div");
    $("#banner").load("../Shared/_Layout.html #banner>");
    $("aside").load("../Shared/_LayoutAside.html aside>");
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
    // for view
    var navLobby = '';
    var navRow = 10;
    var navRank = false;
    var navFrame = '<ol>*</ol>';
    var navPosition = '';
    var navMore = null;
    var navViewList = '';

    // json
    var navJson = '[{"getList":"css","code":"game","position":"name","view":"#navGame"},{"getList":"navcss","code":"board","position":"name","view":"#navBoard"},{"getList":"navcss","code":"live","position":"vcode真人","view":"#navLive"},{"getList":"navcss","code":"sport","position":"name","view":"#navSport"},{"getList":"navcss","code":"lottery","position":"name","view":"#navLottery"}]';
    var navList = JSON.parse(navJson);
    
    $.each(navList, function(i, v) {
        navLobby = v.code;
        navPosition = '<li game-box="code">' + v.position + '</li>';
        navViewList = getViewList(navLobby, navRow, navRank, navFrame, navPosition, navMore);
        $(navViewList).prependTo(v.view +' .subnav');
    });
});