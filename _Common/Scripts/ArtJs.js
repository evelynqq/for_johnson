$(window).load(function () {

    //--------------------------------------------------------
    // 登入判斷
    var weblogin = getCookie("weblogin");

    if (weblogin == 0 && weblogin != undefined) {
        // 登入
        $(".is-logout").css("display", "none");
        $(".is-login").css("display", "black");
    } else {
        // 未登入
        $(".is-login").css("display", "none");
        $(".is-logout").css("display", "black");
    }

    //--------------------------------------------------------
    //跑馬燈外掛  參考：http://aamirafridi.com/jquery/jquery-marquee-plugin
    //使用class 供應其他頁面不同跑馬燈需要時可以使用
    //如果同時不同頁面需要其他效果，請建新的
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

    //--------------------------------------------------------
    // Copyright
    var copyright = '聚星 Copyright© 2019 GStargaming All Rights Reserved';

    if ($('#footer-suggest.none').length == 0) {
        $('#footer-suggest').html(copyright);
    }

    //--------------------------------------------------------
    // Footer List & Aside List
    var getFooterList = JSON.parse(getAsideData());
    var footerContent = '';
    var asideContent = '';

    $.each(getFooterList, function (i, v) {
        if (v.code == 'Trial' || v.code == 'Client') {
            footerContent += '<li><a href="' + v.url + '" target="_blank">' + v.name + '</a></li>';
            asideContent += '<li class="aside' + v.code + ' ' + v.css + '"><a href="' + v.url + '" target="_blank">' + v.name + '</a></li>';
        } else {
            footerContent += '<li><a href="' + v.url + '">' + v.name + '</a></li>';
            asideContent += '<li class="aside' + v.code + ' ' + v.css + '"><a href="' + v.url + '">' + v.name + '</a></li>';
        }
    });

    if ($('#footer-nav.none').length == 0) {
        $(footerContent).appendTo('#footer-nav');
    }

    // 判斷aside特殊案例
    var findsidebar = $("#sidebar").find("ul").length;

    if ($('#sidebar.none').length == 0) {
        if (findsidebar != 0) {
            $(asideContent).appendTo('#sidebar ul');
        } else {
            $(asideContent).appendTo('#sidebar');
        }
    }

    //--------------------------------------------------------
    // Add Active
    $.each(getFooterList, function (i, v) {
        var asidecss = 'articles' + v.code;
        var findcss = document.getElementsByClassName(asidecss);

        if (findcss.length != 0) {
            $('.aside' + v.code).addClass('active');
        }
    });

    //--------------------------------------------------------
    // Load Page
    var getPageList = JSON.parse(getPageData());

    $.each(getPageList, function (i, v) {
        $('[data-page=' + v.page + ']').load('../../../_Common/Txt/' + v.page + '.html');
    });

    $('#popup').load('../../../_Common/Txt/popup.html');

    //--------------------------------------------------------
    // Account Nav List
    var getAccountNavList = JSON.parse(getAccountNavData());
    var accountNavContent = '';
    var judgeAccountNav = $('#account-nav').hasClass('navRemove');

    $.each(getAccountNavList, function (i, v) {
        accountNavContent += '<li title="' + v.name + '"><a href="' + v.url + '">' + v.name + '</a></li>';
    });

    // 判斷需不需要nav
    if (judgeAccountNav != true) {
        $(accountNavContent).prependTo('#account-nav');
    }

    //  關閉 Modal
    $('.modal').click(
        function (e) {
            $('.modal').removeClass('in');
            $('.modal-backdrop').remove();
        }
    );

    $('.modal-dialog').click(
        function (e) {
            e.stopPropagation();
        }
    );
});

// =================================================

// Cookie
function login() {
    document.cookie = "weblogin=0;";
    location.reload();
}

function signOut() {
    document.cookie = "weblogin=1;";
    location.reload();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// =================================================

// News Dialog
function newsClick() {
    $("#marquee-wrapper").addClass('show');
}

function closeMarquee() {
    $("#marquee-wrapper").removeClass('show');
}

// =================================================
// Get View List
// lobby: 各類別大廳(game, live, sport, lotter, board)
// row: 幾個一列(數字)
// rank: 是否需要排成一組一組(false, true)
// frame: 外層結構 * 代表內容(ex.'<ul class="game-list">*</ul>')
// postition: 內容結構 code - 程式代碼， vcode - 遊戲代碼， name - 遊戲名稱(ex.'<li game-box="code"><span>name</span></li>')
// more: 敬請期待結構， 如果沒有則寫null(ex.'<li game-box="more"></li>' or null)
function getViewList(lobby, row, rank, frame, position, more) {
    var getGameList = JSON.parse(getArtGameData(lobby));
    var x = getGameList.length % row;
    var frameArray = frame.split("*");
    var content = '';
    var contentDiv;

    if (rank != true) {
        content += frameArray[0];
    }

    $.each(getGameList, function (i, v) {

        contentDiv = position.replace(/code(?=\")|vcode|name(?!\")/g, function (matchStr) {
            var tokenMap = {
                'code': v.code,
                'vcode': v.vcode,
                'name': v.name
            };
            return tokenMap[matchStr];
        });

        if (i % row == 0 && rank == true) {
            content += frameArray[0];
        };

        content += eval('contentDiv');

        if (i % row == row - 1 && rank == true) {
            content += frameArray[1];
        };
    });

    if (rank == true && x == 0) {
        return content;
    }

    if (more == null || x == 0) {
        content += frameArray[1];
    } else {
        for (var i = row - x; i > 0; i--) {
            content += more;

            if (i == 1) {
                content += frameArray[1];
            }
        }
    }

    return content;
}

// =================================================

//判斷觸控式螢幕跳轉到手機版
$(function () {
    if (isMobile()) {
        var url = window.location.href;
        url = url.replace("Portal", "Mobile");
        url = url.replace("Portal", "Mobile");
        window.location.href = url;
    } else {}
})

//判斷是否為觸控式螢幕
function isMobile() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

// =================================================

// pupup
function popup(url, title, width, height) {
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    var options = '';
    options += ',width=' + width;
    options += ',height=' + height;
    options += ',top=' + top;
    options += ',left=' + left;
    return window.open(url, title, options);
}

// =================================================

// invite Modal
function invitePopup() {
    $('#invite-record').addClass('in');
    $('<div class="modal-backdrop fade in"></div>').appendTo('body');
}

// login Modal
function loginPopup() {
    $('#login-popup').addClass('in');
    $('<div class="modal-backdrop fade in"></div>').appendTo('header');
}

// account Modal
function accountPopup() {
    $('#account-popup').addClass('in');
    $('<div class="modal-backdrop fade in"></div>').appendTo('header');
}

// Register captcha Modal
function captchaPopup() {
    $('#captcha-popup').addClass('in');
}

// Register captcha prev page
function captchaPrevPage(e) {
    console.log($(e));
    $(e).parents('section').removeClass('on').prev().addClass('on');
}

// Register captcha next page
function captchaNextPage(e) {
    $(e).parents('section').removeClass('on').next().addClass('on');
}

// Register captcha reset
function captchaReset() {
    $('#captcha-popup section').removeClass('on').eq(0).addClass('on');
}

// close modal
function modalClose() {
    $('.modal').removeClass('in');
    $('.modal-backdrop').remove();
}