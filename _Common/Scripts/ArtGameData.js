// JSON GameData
function getArtGameData(lobby) {
    // 真人
    if (lobby == "live") {
        json =
            '[{"code":"AllBetReal","vcode":"AB","name":"AB真人"},{"code":"AgBr","vcode":"AG","name":"AG真人"},{"code":"BbinaLive","vcode":"BBIN","name":"BBIN真人"},{"code":"BgReal","vcode":"BG","name":"BG真人"},{"code":"EBetReal","vcode":"eBET","name":"EBET真人"},{"code":"EvoReal","vcode":"EVO","name":"EVO真人"},{"code":"GdReal","vcode":"GD","name":"GD真人"},{"code":"GpiLive","vcode":"GPI","name":"GPI真人"},{"code":"HgaReal","vcode":"HG","name":"HG真人"},{"code":"OgaReal","vcode":"OG","name":"OG真人"},{"code":"PtaReal","vcode":"PT","name":"PT真人"},{"code":"PtbReal","vcode":"PT","name":"PT真人"},{"code":"PtaLive","vcode":"PT","name":"PT真人"},{"code":"MgaReal","vcode":"MG","name":"MG 真人"},{"code":"SaReal","vcode":"SA","name":"SA真人"},{"code":"SbLive","vcode":"TGP","name":"申博真人"},{"code":"SunbetReal","vcode":"TGP","name":"申博真人"},{"code":"WmReal","vcode":"WM","name":"完美真人"},{"code":"RyReal","vcode":"RY","name":"Royal皇家真人"},{"code":"Ry2Real","vcode":"RY","name":"新RY皇家真人"}]';
        return json;
    }

    // 電子
    if (lobby == "game") {
        json =
            '[{"code":"AgHtml","vcode":"AG","name":"AG电子"},{"code":"BbinaSlot","vcode":"BBIN","name":"BBIN电子"},{"code":"Cq9Html","vcode":"CQ9","name":"传奇电子"},{"code":"FsHtml","vcode":"FG","name":"FG乐游电子"},{"code":"GaHtml","vcode":"GA","name":"GA电子"},{"code":"GnsHtml","vcode":"GNS","name":"GNS电子"},{"code":"GpiHtml","vcode":"GPI","name":"GPI电子"},{"code":"GpiFlash","vcode":"GPI","name":"GPI电子"},{"code":"HabaHtml","vcode":"HB","name":"HB电子"},{"code":"IsbHtml","vcode":"ISB","name":"ISB电子"},{"code":"JdbHtml","vcode":"JDB168","name":"JDB电子"},{"code":"LgHtml","vcode":"LG","name":"LG赛马游戏"},{"code":"MgaHtml","vcode":"MG","name":"MG电子"},{"code":"MgaFlash","vcode":"MG","name":"MG电子"},{"code":"MwHtml","vcode":"MW","name":"MW电子"},{"code":"MwSlot","vcode":"MW","name":"MW电子"},{"code":"NeHtml","vcode":"NE","name":"NE电子"},{"code":"Ne2Slot","vcode":"NE","name":"新NE电子"},{"code":"PgHtml","vcode":"PG","name":"PG电子"},{"code":"PngHtml","vcode":"PNG","name":"PNG电子"},{"code":"PrgHtml","vcode":"PP","name":"PP王者电子"},{"code":"PrgFlash","vcode":"PP","name":"PP王者电子"},{"code":"PtaHtml","vcode":"PT","name":"PT电子"},{"code":"PtaFlash","vcode":"PT","name":"PT电子"},{"code":"PtbSlot","vcode":"PT","name":"PT电子"},{"code":"PtsHtml","vcode":"PTS","name":"PTS电子"},{"code":"SgHtml","vcode":"SG","name":"SG电子"},{"code":"SgFlash","vcode":"SG","name":"SG电子"},{"code":"RtHtml","vcode":"TGP","name":"RT电子"},{"code":"TpgHtml","vcode":"TPG","name":"TPG电子"},{"code":"AeSlot","vcode":"AE","name":"AE阿米巴電子"},{"code":"JpSlot","vcode":"JP","name":"Justplay電子"},{"code":"RtgSlot","vcode":"RTG","name":"RTG電子"},{"code":"QtSlot","vcode":"QT","name":"QTech電子"},{"code":"PsSlot","vcode":"PS","name":"PlayStar玩星電子"},{"code":"Pg1Slot","vcode":"PG1","name":"PG電子"},{"code":"GanSlot","vcode":"GMT","name":"GMT电子"},{"code":"BgSlot","vcode":"BG","name":"BG电子"}]'; //,{"code":"VrSlot","vcode":"VR","name":"VR电子"},{"code":"HbSlot","vcode":"HB","name":"HABANARO電子"}
        return json;
    }

    // 彩票
    if (lobby == "lottery") {
        json =
            '[{"code":"BbinaLottery","vcode":"BBIN","name":"BBIN彩票"},{"code":"IgLottery","vcode":"IG","name":"IG彩票"},{"code":"IgLotto","vcode":"IG","name":"IG六合彩"},{"code":"IgaLottery","vcode":"IGA","name":"IG彩票"},{"code":"IgaLotto","vcode":"IGA","name":"IG六合彩"},{"code":"LxLottery","vcode":"LX","name":"LX利鑫彩票"},{"code":"VrLottery","vcode":"VR","name":"VR竞速彩票"},{"code":"AplLottery","vcode":"APL","name":"阿波罗彩票"},{"code":"G1Lottery","vcode":"G1","name":"G1彩票"},{"code":"G1aLottery","vcode":"G1A","name":"Gone彩票"},{"code":"GbLottery","vcode":"GB","name":"GB彩票"},{"code":"GblLottery","vcode":"GBL","name":"GB彩票"},{"code":"SgwLottery","vcode":"SGW","name":"SGWin双赢彩票"},{"code":"BgLottery","vcode":"BG","name":"BG彩票"},{"code":"Ig1Lottery","vcode":"IG1","name":"IG彩票"},{"code":"Ig1Lotto","vcode":"IG1","name":"IG六合彩"}]';
        return json;
    }

    // 棋牌
    if (lobby == "board") {
        json =
            '[{"code":"City761Board","vcode":"761City","name":"棋乐游"},{"code":"JdbBoard","vcode":"JDB172","name":"JDB 夺宝棋牌"},{"code":"KgHtml","vcode":"KG","name":"开元棋牌"},{"code":"LegBoard","vcode":"LEG","name":"乐游棋牌"},{"code":"JsBoard","vcode":"JS","name":"JS金龙棋牌"},{"code":"VgBoard","vcode":"VG","name":"VG財神棋牌"},{ "code": "KyBoard", "vcode": "KY", "name": "KY開元棋牌" },{"code":"LcBoard","vcode":"LC","name":"LC龙城棋牌"},{"code":"T365Board","vcode":"T365","name":"365棋牌"},{"code":"YgBoard","vcode":"YG","name":"YG易遊棋牌"},{"code":"AsBoard","vcode":"AS","name":"AS真人棋牌"},{"code":"TyBoard","vcode":"TY","name":"天一棋牌"},{"code":"Cq9Board","vcode":"CQ9","name":"CQ9棋牌"}]';
        return json;
    }

    // 电竞
    if (lobby == "esport") {
        json =
            '[{"code":"EsbEsport","vcode":"ESB","name":"ESB电竞"},{"code":"Esb1Esport","vcode":"ESB1","name":"ESB电竞"},{"code":"SabaESport","vcode":"Saba","name":"沙巴电竞"},{"code":"HcEsport","vcode":"HC","name":"皇朝电竞"},{"code":"CmdEsport","vcode":"CMD","name":"CMD电竞"},{"code":"SabaaEsport","vcode":"Saba","name":"沙巴电竞"},{"code":"E88Esport","vcode":"E88","name":"小金电竞"},{"code":"GbEsport","vcode":"GB","name":"GB电竞"},{"code":"GbsEsport","vcode":"GBS","name":"GB电竞"},{"code":"LeEsport","vcode":"LE","name":"LE傳奇电竞"},{"code":"AviaEsport","vcode":"AVIA","name":"AVIA泛亚电竞"},{"code":"Cq9Esport","vcode":"CQ9","name":"CQ9电竞"},{"code":"TfEsport","vcode":"TF","name":"TF雷火电竞"}]';
        return json;
    }

    // 体育
    if (lobby == "sport") {
        json =
            '[{"code":"SingSport","vcode":"3Sing","name":"三昇体育"},{"code":"Sing2Sport","vcode":"3Sing","name":"三昇体育"},{"code":"AgSport","vcode":"AG","name":"AG体育"},{"code":"BbinaSport","vcode":"BBIN","name":"BBIN体育"},{"code":"CmdSport","vcode":"CMD","name":"CMD体育"},{"code":"IboSport","vcode":"CR","name":"CR体育"},{"code":"HLSport","vcode":"HL","name":"希爾体育"},{"code":"ImaSport","vcode":"IMA","name":"IM体育"},{"code":"M8Sport","vcode":"M8","name":"M8体育"},{"code":"SabaaSport","vcode":"Saba","name":"沙巴体育"},{"code":"SababSport","vcode":"Saba","name":"沙巴体育"},{"code":"SV388Sport","vcode":"SV388","name":"斗鸡"},{"code":"HRBSport","vcode":"HRB","name":"赛马"},{"code":"ZfbSport","vcode":"ZFB","name":"众发反波胆"},{"code":"E88Sport","vcode":"E88","name":"小金体育"},{"code":"GbSport","vcode":"GB","name":"GB体育"},{"code":"GbsSport","vcode":"GBS","name":"GB体育"},{"code":"QtSport","vcode":"QT","name":"QTech虛擬体育"},{"code":"BtiSport","vcode":"BTI","name":"BTi体育"},{"code":"Cq9Sport","vcode":"CQ9","name":"CQ9体育"},{"code":"EsbEsport","vcode":"ESB","name":"ESB电竞"},{"code":"Esb1Esport","vcode":"ESB1","name":"ESB电竞"},{"code":"SabaESport","vcode":"Saba","name":"沙巴电竞"},{"code":"HcEsport","vcode":"HC","name":"皇朝电竞"},{"code":"CmdEsport","vcode":"CMD","name":"CMD电竞"},{"code":"SabaaEsport","vcode":"Saba","name":"沙巴电竞"},{"code":"E88Esport","vcode":"E88","name":"小金电竞"},{"code":"GbEsport","vcode":"GB","name":"GB电竞"},{"code":"GbsEsport","vcode":"GBS","name":"GB电竞"},{"code":"LeEsport","vcode":"LE","name":"LE傳奇电竞"},{"code":"AviaEsport","vcode":"AVIA","name":"AVIA泛亚电竞"},{"code":"Cq9Esport","vcode":"CQ9","name":"CQ9电竞"},{"code":"TfEsport","vcode":"TF","name":"TF雷火电竞"}]';
        return json;
    }

    // 捕魚
    if (lobby == "fish") {
        json =
            '[{"code":"City761Fish","vcode":"761City","name":"棋乐游 李逵劈鱼"},{"code":"AgHsr","vcode":"AG","name":"AG捕鱼王"},{"code":"BbFish30","vcode":"BBIN","name":"BBIN捕鱼达人"},{"code":"BbFish38","vcode":"BBIN","name":"BBIN捕鱼大师"},{"code":"Cq9Fish","vcode":"CQ9","name":"CQ9皇金渔场"},{"code":"FsFishBeauty","vcode":"FG","name":"FG美人捕鱼"},{"code":"FsFishThunder","vcode":"FG","name":"FG雷霆战警"},{"code":"FsFishBird","vcode":"FG","name":"FG捕鸟达人"},{"code":"FsFishHappy","vcode":"FG","name":"FG欢乐捕鱼"},{"code":"FsFishEveryDay","vcode":"FG","name":"FG天天捕鱼"},{"code":"GnsFish","vcode":"GNS","name":"GNS寻宝捕鱼王"},{"code":"JdbFishMoney","vcode":"JDB168","name":"JDB财神捕鱼"},{"code":"JdbFish","vcode":"JDB169","name":"JDB龙王捕鱼"},{"code":"Jdb2Fish","vcode":"JDB170","name":"JDB龙王捕鱼2"},{"code":"MwFish","vcode":"MW","name":"MW千炮捕鱼"},{"code":"PgFish","vcode":"PG","name":"PG鱼王争霸"},{"code":"Pg2Fish","vcode":"PG","name":"PG全民捕鱼"},{"code":"PtFish","vcode":"PT","name":"PT深海大赢家"},{"code":"PtsFish","vcode":"PTS","name":"PTS捕鱼多福"},{"code":"TpgFish","vcode":"TPG","name":"TPG 4D捕魚"},{"code":"QtFish","vcode":"QT","name":"QT海杀2"},{"code":"Qt2Fish","vcode":"QT","name":"QT老虎捕鱼"},{"code":"RtgFish","vcode":"RTG","name":"RTG捕魚"},{"code":"TpgFish","vcode":"TPG","name":"TPG 4D捕魚"},{"code":"PsFish","vcode":"PS","name":"PlayStar捕魚"},{"code":"Tpg2Fish","vcode":"TPG2","name":"金多多捕鱼360"},{"code":"Tpg3Fish","vcode":"TPG3","name":"多彩捕鱼360"},{"code":"BgFish","vcode":"BG","name":"BG捕魚"}]'; //,{"code":"UgFish","vcode":"UG","name":"UG捕鱼天下"}
        return json;
    }
}

// JSON AsideData
function getAsideData() {
    json =
        '[{"name":"关于我们","url":"../AboutUS/index.html","code":"AboutUS","css":"about-us"},{ "name": "联络我们", "url": "../Contact/index.html", "code": "Contact", "css": "contact" },{ "name": "合作伙伴", "url": "../Partner/index.html", "code": "Partner", "css": "partner" },{ "name": "充值帮助", "url": "../How/Deposit.html", "code": "Deposit", "css": "how-deposit" },{ "name": "提款帮助", "url": "../How/Withdrawal.html", "code": "Withdrawal", "css": "hot-withdraw" },{ "name": "常见问题", "url": "../FAQ/index.html", "code": "FAQ", "css": "faq" },{ "name": "责任博彩", "url": "../ResponsibleGambling/index.html", "code": "ResponsibleGambling", "css": "responsible" },{ "name": "免费试玩", "url": "../Trial/Apply.html", "code": "Trial", "css": "trial" },{ "name": "客户端", "url": "http://client.0a0w.com/", "code": "Client", "css": "client" }]';
    return json;
}

// JSON AccountNavData
function getAccountNavData() {
    json =
        '[{"name":"投注记录","url":"../BetRecord/index.html","code":"BetRecord"},{"name":"线上取款","url":"../WithdrawApplication/index.html","code":"WithdrawApplication"},{"name":"线上存款","url":"../Deposit/index.html","code":"Deposit"},{"name":"交易记录","url":"../Transaction/index.html","code":"Transaction"},{"name":"修改取款密码","url":"../Account/ChangeMoneyPassword.html","code":"ChangeMoneyPassword"},{"name":"修改密码","url":"../Account/ChangePassword.html","code":"ChangePassword"},{"name":"推荐好友","url":"../Mgm/index.html","code":"Mgm"}]';
    return json;
}

// JSON PageData
function getPageData() {
    json =
        '[{"name":"关于我们","page":"AboutUS"},{"name":"投注记录","page":"BetRecord"},{"name":"修改取款密码","page":"ChangeMoneyPassword"},{"name":"修改密码","page":"ChangePassword"},{"name":"联络我们","page":"Contact"},{"name":"线上存款","page":"Deposit"},{"name":"线上存款","page":"Deposit_2"},{"name":"常见问题","page":"FAQ"},{"name":"充值帮助","page":"HowDeposit"},{"name":"提款帮助","page":"HowWithdrawal"},{"name":"推荐奖励","page":"Mgm"},{"name":"合作伙伴","page":"Partner"},{"name":"优惠活动","page":"Promotion"},{"name":"责任博彩","page":"ResponsibleGambling"},{"name":"站内信","page":"SiteMail"},{"name":"交易记录","page":"Transaction"},{"name":"线上取款","page":"WithdrawApplication"},{"name":"註冊頁","page":"Register"}]';
    return json;
}