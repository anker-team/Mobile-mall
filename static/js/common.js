var ARRAY_WEEK_CN = ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d"];
var HTML5_DEFAULT_IMG_300x300 = "/images/html5/default_300x300.gif";
var HTML5_DEFAULT_IMG_220x220 = "/images/html5/default_220x220.gif";
window.m_prefix = "m.jd.com_";
window.m_cityId = "cityId";
window.m_userCity = "userCity";
window.m_categoryId = "categoryId";
window.m_userCityDetail = "userCityDetail";
window.m_longitudeLatitude = "longitudeLatitude";
window.m_timeout = 1000 * 20;
window.m_waitText = "&#21162;&#21147;&#21152;&#36733;&#20013;&#46;&#46;&#46;";
function isNotBlank(a) {
    if (a == undefined || a == null || a == "null" || a == "undefined") {
        return false
    }
    return true
}
function isDigital(b) {
    var a = /^\d$/;
    return a.test(b)
}
function textLimit(d, c, b) {
    if (!d) {
        return false
    }
    var a = d.trim().length;
    if (a < c || a > b) {
        return false
    }
    return true
}
function testEmail(b) {
    var a = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z][a-z.]{2,8}$/;
    return a.test(b)
}
function testGeolocation() {
    if (!!navigator.geolocation) {
        testGeolocation = function() {
            return true
        };
        return testGeolocation()
    }
    testGeolocation = function() {
        return false
    };
    return testGeolocation()
}
function testStorage() {
    return testSessionStorage() || testLocalStorage()
}
function testSessionStorage() {
    if (!!window.sessionStorage) {
        testSessionStorage = function() {
            return true
        }
    } else {
        testSessionStorage = function() {
            return false
        }
    }
    return testSessionStorage()
}
function testLocalStorage() {
    if (!!window.localStorage) {
        testLocalStorage = function() {
            return true
        }
    } else {
        testLocalStorage = function() {
            return false
        }
    }
    return testLocalStorage()
}
function json(v) {
    return eval("(" + v + ")")
}
function testPhone(b) {
    var a = /^1\d{10}$/;
    return a.test(b)
}
function createSpinner() {
    var a = {lines: 12, length: 6, width: 4, radius: 10, color: "#333", speed: 1, trail: 60, shadow: false, hwaccel: false};
    return new Spinner(a)
}
var addWare = function(b, g, f, c, j, d) {
    if (isNotBlank(f) && f) {
        var k = $("#newOrderServer").val();
        var h = "/cart/addDirOrder.json?wareId=" + b + "&num=" + g + (isNotBlank(f) && f ? "&isAjax=" + f : "") + "&resourceType=" + c + "&resourceValue=" + j + (isNotBlank(d) && (d != "") ? "&sid=" + d : "");
        var m = jQuery.get(h, function() {
            if (k == "true") {
                window.location.href = "/norder/order.action?wareId=" + b + "&enterOrder=true" + (isNotBlank(d) && (d != "") ? "&sid=" + $("#sid").val() : "")
            } else {
                window.location.href = "/order/order.action?wareId=" + b + "&enterOrder=true&yys=false&from=0" + (isNotBlank(d) && (d != "") ? "&sid=" + $("#sid").val() : "")
            }
        })
    } else {
        var e = createSpinner();
        $("#spinner2").show();
        e.spin($("#spinner2")[0]);
        if ($("#_mask")) {
            $("#_mask").remove()
        }
        var l = ((document.body || document.documentElement).clientHeight + 20) + "px";
        var a = "100%";
        var n = document.createElement("div");
        n.setAttribute("id", "_mask");
        n.setAttribute("style", "position:absolute;left:0px;top:0px;background-color:rgb(20, 20, 20);filter:alpha(opacity=60);opacity: 0.6;width:" + a + ";height:" + l + ";z-index:9998;");
        (document.body || document.documentElement).appendChild(n);
        var i = "add.json?wareId=" + b + "&num=" + g + (isNotBlank(f) && f ? "&isAjax=" + f : "") + "&resourceType=" + c + "&resourceValue=" + j + (isNotBlank(d) && (d != "") ? "&sid=" + d : "");
        var m = ajax(i, function(p) {
            e.stop();
            $("#spinner2").hide();
            var r = 100;
            var q = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var s = document.documentElement.clientHeight || document.body.clientHeight;
            document.getElementById("cart").style.bottom = ((s - r) / 2 - q) + "px";
            var o = JSON.parse(p).sid;
            $("#sid").val(o);
            $("#goCart").click(function() {
                $("#_mask").hide();
                $("#cart").hide();
                window.location.href = "/cart/cart.action?sid=" + o
            });
            $("#cart").show()
        })
    }
};
var xmlHttp;
var ajax = function(b, e, d) {
    if (b.length == 0) {
        return""
    }
    xmlHttp = c();
    if (xmlHttp == null) {
        return false
    }
    b = b + "&ran=" + Math.random();
    xmlHttp.onreadystatechange = a;
    xmlHttp.open("GET", b, true);
    xmlHttp.send(null);
    function a() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            e.call(this, xmlHttp.responseText, d)
        }
    }
    function c() {
        var f = null;
        try {
            f = new XMLHttpRequest()
        } catch (g) {
            try {
                f = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (g) {
                f = new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        return f
    }
    return true
};
var addCart = function(h, a) {
    var d = $("#resourceType").val();
    var c = $("#resourceValue").val();
    if (d == null || d == "" || typeof (d) == undefined) {
        d = "unknown"
    }
    if (c == null || c == "" || typeof (c) == undefined) {
        c = "unknown"
    }
    if (!testLocalStorage()) {
        if (!!a) {
            location.href = "/cart/add.action?sid=" + a + "&wareId=" + h + "&resourceType=" + d + "&resourceValue=" + c
        } else {
            location.href = "/cart/add.action?wareId=" + h + "&resourceType=" + d + "&resourceValue=" + c
        }
        return
    }
    var e = window.localStorage.getItem("cartItem");
    if (e != null) {
        var g = JSON.parse(e);
        for (var b = 0; b <= g.length; b++) {
            if (g[b] != null && g[b].id == h) {
                g[b].num += 1;
                break
            } else {
                if (b == g.length) {
                    var f = new Object();
                    f.id = h;
                    f.num = 1;
                    f.resourceType = d;
                    f.resourceValue = c;
                    g[g.length] = f;
                    break
                }
            }
        }
    } else {
        g = new Array();
        var f = new Object();
        f.id = h;
        f.num = 1;
        f.resourceType = d;
        f.resourceValue = c;
        g[0] = f
    }
    window.localStorage.setItem("cartItem", JSON.stringify(g));
    updateToolBar()
};
var getCart = function() {
    if (!testLocalStorage()) {
        return
    }
    return window.localStorage.getItem("cartItem")
};
var clearCart = function() {
    if (!testLocalStorage()) {
        return
    }
    window.localStorage.removeItem("cartItem");
    updateToolBar()
};
var delCart = function(g, b, c, a) {
    if (!testLocalStorage()) {
        if (!!b) {
            location.href = "/cart/remove.action?sid=" + b + "&wareId=" + g + "&num=" + c
        } else {
            location.href = "/cart/remove.action?wareId=" + g + "&num=" + c
        }
        return
    }
    var e = window.localStorage.getItem("cartItem");
    if (e != null) {
        var f = JSON.parse(e);
        for (var d = 0; d < f.length; d++) {
            if (f[d].id == g) {
                f.splice(d, 1);
                break
            }
        }
        window.localStorage.setItem("cartItem", JSON.stringify(f))
    }
    if (a) {
        syncCart(b, true)
    }
    updateToolBar()
};
var updateCart = function(f, b, a) {
    if (!testLocalStorage()) {
        if (!!a) {
            location.href = "/cart/modify.action?sid=" + a + "&wareId=" + f + "&num=" + b
        } else {
            location.href = "/cart/modify.action?wareId=" + f + "&num=" + b
        }
        return
    }
    var d = window.localStorage.getItem("cartItem");
    if (d != null) {
        var e = JSON.parse(d);
        for (var c = 0; c < e.length; c++) {
            if (e[c].id == f) {
                e[c].num = Number(b);
                break
            }
        }
        window.localStorage.setItem("cartItem", JSON.stringify(e))
    }
    updateToolBar()
};
var updateToolBar = function(b) {
    if (!testLocalStorage()) {
        return
    }
    var d = 0;
    var c = window.localStorage.getItem("cartItem");
    if (c != null) {
        var e = JSON.parse(c);
        if (e != null) {
            for (var a = 0; a < e.length; a++) {
                d += Number(e[a].num)
            }
        }
    }
    if (d != 0) {
        $("#html5_cart_img").attr("src", "/images/html5/cartm.png");
        $("#html5_cart_img").attr("height", "22");
        $("#html5_cart_img").attr("width", "26")
    } else {
        $("#html5_cart_img").attr("src", "/images/html5/cart.png");
        $("#html5_cart_img").attr("height", "21");
        $("#html5_cart_img").attr("width", "22")
    }
};
var syncCart = function(sid, jump, callback) {
    var sourceType = $("#resourceType").val();
    var sourceValue = $("#resourceValue").val();
    if (sourceType == null || sourceType == "" || typeof (sourceType) == undefined) {
        sourceType = "unknown"
    }
    if (sourceValue == null || sourceValue == "" || typeof (sourceValue) == undefined) {
        sourceValue = "unknown"
    }
    if (!testLocalStorage()) {
        if (!!sid) {
            location.href = "/cart/cart.action?sid=" + sid + "&resourceType=" + sourceType + "&resourceValue=" + sourceValue
        } else {
            location.href = "/cart/cart.action?resourceType=" + sourceType + "&resourceValue=" + sourceValue
        }
        return
    }
    var paraJson = getCart();
    if (paraJson == null) {
        paraJson = ""
    }
    jQuery.get("/cart/update.json?sid=" + sid, {updatejson: paraJson}, function(data) {
        if (sid == "") {
            sid = data.sid
        }
        cartdata = eval("(" + data.cartDetail + ")");
        refreshLocalCart(cartdata, sid);
        if (jump || getCart() == null) {
            if (!!sid) {
                location.href = "/cart/cart.action?sid=" + sid
            } else {
                location.href = "/cart/cart.action"
            }
        } else {
            var oriPrice = cartdata.price - cartdata.discount;
            var realPrice = oriPrice - cartdata.rePrice;
            $("#cart_oriPrice").text(oriPrice.toFixed(2));
            $("#cart_rePrice").text(cartdata.rePrice.toFixed(2));
            $("#cart_realPrice").text(realPrice.toFixed(2));
            $("#cart_totalnum").text(cartdata.num);
            if (cartdata.message != null && cartdata.message != "") {
                $("#pay_tip").text(cartdata.message);
                $("#pay_tip_div").show()
            } else {
                $("#pay_tip_div").hide()
            }
        }
        if (callback != null) {
            $("#sid").val(sid);
            callback()
        }
    }, "json")
};
var refreshLocalCart = function(d, a) {
    if (typeof (d) != "undefined" && d != null) {
        if (d.skus != null && d.skus.length > 0) {
            for (var c = 0; c < d.skus.length; c++) {
                addCart(d.skus[c].Id, a);
                updateCart(d.skus[c].Id, d.skus[c].Num, a)
            }
        }
        if (d.suits != null && d.suits.length > 0) {
            for (var b = 0; b < d.suits.length; b++) {
                if (d.suits[b].Skus != null && d.suits[b].Skus.length > 0) {
                    for (var c = 0; c < d.suits[b].Skus.length; c++) {
                        addCart(d.suits[b].Skus[c].Id, a);
                        updateCart(d.suits[b].Skus[c].Id, d.suits[b].Skus[c].Num, a)
                    }
                }
            }
        }
        if (d.gifts != null && d.gifts.length > 0) {
            for (var c = 0; c < d.gifts.length; c++) {
                addCart(d.gifts[c].MainSku.Id, a);
                updateCart(d.gifts[c].MainSku.Id, d.gifts[c].MainSku.Num, a)
            }
        }
    }
};
function urlEncode(c, a, d) {
    var b = "";
    var e = c.split(".");
    b = b + e[0];
    if (d && d.length) {
        d.forEach(function(f) {
            b = b + "-";
            if (f && f != -1 && f != "-1") {
                b = b + f
            } else {
                b = b + "0"
            }
        })
    }
    b = b + "." + e[1];
    if (!!a) {
        if (/\?/.test(b)) {
            b = b + "&sid=" + a
        } else {
            b = b + "?sid=" + a
        }
    }
    return b
}
function hideWait(b, a) {
    a.stop();
    b.hide();
    b.next().show();
    $("header").show();
    $("footer").show()
}
function showWait(b, a) {
    b.show();
    b.next().hide();
    $("header").hide();
    $("footer").hide();
    a.spin(b[0])
}
function createPicMove(a, b, c) {
    var g = function(j) {
        return"string" == typeof j ? document.getElementById(j) : j
    };
    var d = function(j, l) {
        for (var k in l) {
            j[k] = l[k]
        }
        return j
    };
    var f = function(j) {
        return j.currentStyle || document.defaultView.getComputedStyle(j, null)
    };
    var i = function(l, j) {
        var k = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return j.apply(l, k.concat(Array.prototype.slice.call(arguments)))
        }
    };
    var e = {Quart: {easeOut: function(k, j, m, l) {
                return -m * ((k = k / l - 1) * k * k * k - 1) + j
            }}, Back: {easeOut: function(k, j, n, m, l) {
                if (l == undefined) {
                    l = 1.70158
                }
                return n * ((k = k / m - 1) * k * ((l + 1) * k + l) + 1) + j
            }}, Bounce: {easeOut: function(k, j, m, l) {
                if ((k /= l) < (1 / 2.75)) {
                    return m * (7.5625 * k * k) + j
                } else {
                    if (k < (2 / 2.75)) {
                        return m * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + j
                    } else {
                        if (k < (2.5 / 2.75)) {
                            return m * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + j
                        } else {
                            return m * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + j
                        }
                    }
                }
            }}};
    var h = function(k, n, m, l) {
        this._slider = g(n);
        this._container = g(k);
        this._timer = null;
        this._count = Math.abs(m);
        this._target = 0;
        this._t = this._b = this._c = 0;
        this.Index = 0;
        this.SetOptions(l);
        this.Auto = !!this.options.Auto;
        this.Duration = Math.abs(this.options.Duration);
        this.Time = Math.abs(this.options.Time);
        this.Pause = Math.abs(this.options.Pause);
        this.Tween = this.options.Tween;
        this.onStart = this.options.onStart;
        this.onFinish = this.options.onFinish;
        var j = !!this.options.Vertical;
        this._css = j ? "top" : "left";
        var o = f(this._container).position;
        o == "relative" || o == "absolute" || (this._container.style.position = "relative");
        this._container.style.overflow = "hidden";
        this._slider.style.position = "absolute";
        this.Change = this.options.Change ? this.options.Change : this._slider[j ? "offsetHeight" : "offsetWidth"] / this._count
    };
    h.prototype = {SetOptions: function(j) {
            this.options = {Vertical: true, Auto: true, Change: 0, Duration: 50, Time: 10, Pause: 4000, onStart: function() {
                }, onFinish: function() {
                }, Tween: e.Quart.easeOut};
            d(this.options, j || {})
        }, Run: function(j) {
            j == undefined && (j = this.Index);
            j < 0 && (j = this._count - 1) || j >= this._count && (j = 0);
            this._target = -Math.abs(this.Change) * (this.Index = j);
            this._t = 0;
            this._b = parseInt(f(this._slider)[this.options.Vertical ? "top" : "left"]);
            this._c = this._target - this._b;
            this.onStart();
            this.Move()
        }, Move: function() {
            clearTimeout(this._timer);
            if (this._c && this._t < this.Duration) {
                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                this._timer = setTimeout(i(this, this.Move), this.Time)
            } else {
                this.MoveTo(this._target);
                this.Auto && (this._timer = setTimeout(i(this, this.Next), this.Pause))
            }
        }, MoveTo: function(j) {
            this._slider.style[this._css] = j + "px"
        }, Next: function() {
            this.Run(++this.Index)
        }, Previous: function() {
            this.Run(--this.Index)
        }, Stop: function() {
            clearTimeout(this._timer);
            this.MoveTo(this._target)
        }};
    return new h(a, b, c, {Vertical: false})
}
function bind(c, a) {
    var b = Array.prototype.slice.call(arguments).slice(2);
    return function() {
        return a.apply(c, b.concat(Array.prototype.slice.call(arguments)))
    }
}
function userLocation(c, b) {
    function a(d, g) {
        var f = "&#33719;&#21462;&#22833;&#36133;<a onclick='getUserLocation();' style='color:blue;font-size:0.8125em;padding-left:15px;' href=''>&#26356;&#26032;</a>";
        $("#" + c).html(m_waitText);
        var e = window.setTimeout(function() {
            $("#" + c).html(f)
        }, window.m_timeout);
        if (testGeolocation()) {
            navigator.geolocation.getCurrentPosition(function(h) {
                var j = h.coords.latitude;
                var i = h.coords.longitude;
                jQuery.get("/tuan/location.json", {latitude: j, longitude: i}, bind(this, function(m, n) {
                    if (n.status) {
                        window.clearTimeout(e);
                        if (n.cityId) {
                            var k = n.location.city + n.location.subCity;
                            var l = n.location.fullNames;
                            if (testStorage()) {
                                setCityId(n.cityId);
                                setLongitudeLatitude(j + "," + i);
                                setUserCity(k);
                                setUserCityDetail(l)
                            }
                            l = l + "<span  style='color:blue;font-size:0.875em;padding-left:15px;' href=''>&#26356;&#26032;</span>";
                            k = k + "<span  style='color:blue;font-size:0.875em;padding-left:15px;' href=''>&#26356;&#26032;</span>";
                            if (!!m) {
                                $("#" + c).html(k)
                            } else {
                                $("#" + c).html(l)
                            }
                        } else {
                            $("#" + c).html(f)
                        }
                    }
                }, d), "json")
            }, function() {
                $("#" + c).html(f);
                window.clearTimeout(e)
            }, {timeout: 5000})
        }
        g.preventDefault()
    }
    if (!!b) {
        $("#" + b).click(bind(this, a, b))
    } else {
        $("#" + c).click(bind(this, a, b))
    }
}
function registerUnloadEvent(b, a) {
    document.body.onunload = function() {
        hideWait(b, a)
    }
}
function writeTipVal(a) {
    if (a != "") {
        $("#keyword").val(a);
        $("#shelper").html("");
        $("#searchForm").submit()
    }
}
function closeTip() {
    $("#shelper").html("");
    $("#shelper").hide()
}
var old_keyword = "";
var old_keyword2 = "";
function searchTipContent() {
    var a = $("#keyword").val().trim();
    if (a == "") {
        old_keyword = "";
        $("#shelper").html("");
        $("#shelper").hide()
    } else {
        if (a == old_keyword || a == old_keyword2) {
        } else {
            $("#shelper").show();
            $("#keyword").removeAttr("style");
            a = $("#keyword").val().trim();
            old_keyword = a;
            jQuery.get("/ware/searchTip.action?", {keyword: a}, function(b) {
                if (b != null) {
                    $("#shelper").html(b)
                } else {
                    $("#shelper").html("")
                }
            })
        }
    }
    setTimeout("searchTipContent()", 500)
}
$(function() {
    $(".search input").attr("autocomplete", "off");
    if (jQuery("#keyword").length > 0) {
        old_keyword = $("#keyword").val().trim();
        searchTipContent();
        old_keyword2 = old_keyword;
        $("#keyword").focus(function() {
            if (old_keyword2 == $("#keyword").val().trim()) {
                $("#keyword").val("")
            }
        });
        $("#keyword").blur(function() {
            if ($("#keyword").val().trim() == "") {
                $("#keyword").val(old_keyword2);
                $("#keyword").attr("style", "color:#999999;")
            }
        })
    }
});
function getCityId() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_cityId)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_cityId)
        }
    }
    return a || 0
}
function getUserCity() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_userCity)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_userCity)
        }
    }
    return a || null
}
function getUserCityDetail() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_userCityDetail)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_userCityDetail)
        }
    }
    return a || null
}
function getCategoryId() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_categoryId)
    } else {
        if (testSessionStorage) {
            a = window.sessionStorage.getItem(m_prefix + m_categoryId)
        }
    }
    return a || 0
}
function getLongitudeLatitude() {
    var a;
    if (testSessionStorage()) {
        a = window.sessionStorage.getItem(m_prefix + m_longitudeLatitude)
    }
    return a || null
}
function setCityId(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_cityId, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_cityId, a)
            }
        }
    }
}
function setUserCity(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_userCity, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_userCity, a)
            }
        }
    }
}
function setUserCityDetail(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_userCityDetail, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_userCityDetail, a)
            }
        }
    }
}
function setCategoryId(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_categoryId, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_categoryId, a)
            }
        }
    }
}
function setLongitudeLatitude(a) {
    if (!!a) {
        if (testSessionStorage()) {
            window.sessionStorage.setItem(m_prefix + m_longitudeLatitude, a)
        }
    }
}
function goTuanIndex(a) {
    var g, c;
    try {
        g = getCityId();
        c = getCategoryId()
    } catch (d) {
    }
    !!g || (g = 0);
    !!c || (c = 0);
    var f = [g, c, 0, 0, 1];
    var b = urlEncode("/tuan/index.html", a, f);
    return b || "#"
}
function priceTransform(a) {
    try {
        return parseFloat(a).toFixed(1)
    } catch (b) {
        return a
    }
    return a
}
function getDiscount(d, c) {
    var b = (d - c).toString();
    var a = b.indexOf(".");
    if (a > 0) {
        b = b.substring(0, b.indexOf(".") + 2)
    }
    return b
}
document.ontouchend = function() {
    $("#hideInput").remove();
    $("#con_more").append('<label style="height:0px;font-size:0pt;" id="hideInput">&nbsp;</label>')
};
function strlen(d) {
    var a = 0;
    for (var b = 0; b < d.length; b++) {
        var e = d.charCodeAt(b);
        if ((e >= 1 && e <= 126) || (65376 <= e && e <= 65439)) {
            a++
        } else {
            a += 2
        }
    }
    return a
}
function changePage(b, c) {
    var a = document.paging;
    !!a.startSpinner && a.startSpinner();
    jQuery.get(b, {page: c}, function(d) {
        a.set("page", c);
        a.show();
        a.callbackFun(d)
    }, "json")
}
function Paging(a) {
    document.paging = this;
    this.component = jQuery("#" + a.fillId);
    this.startSpinner = a.startSpinner;
    this.stopSpinner = a.stopSpinner;
    this.num = parseInt(a.num, 10) || 5;
    this.count = parseInt(a.count, 10);
    this.page = parseInt(a.page, 10);
    this.totalPage = parseInt(a.totalPage, 10);
    this.message = a.message || "&#26242;&#26080;&#25968;&#25454;";
    this.url = a.url || "";
    this.callbackFun = a.callback1;
    this.isShowBotton = a.isShowBotton;
    this.isShowNum = a.isShowNum;
    if (this.isShowBotton == undefined) {
        this.isShowBotton = true
    }
    if (this.isShowNum == undefined) {
        this.isShowNum = true
    }
    this.set = function(b, c) {
        this[b] = c
    };
    this.show = function() {
        this.component.empty();
        if (!!this.count && this.count > 0) {
            if (!!this.isShowBotton && this.totalPage > 1) {
                if (this.page <= this.totalPage && this.page > 1) {
                    this.component.append('<a class="pre" onclick=changePage("' + this.url + '",' + ((this.page - 1)) + ");><span></span>&#19978;&#19968;&#39029;</a>")
                } else {
                    this.component.append('<a class="dis-buttom"  "style=color:gray;">&#19978;&#19968;&#39029;</a>')
                }
                this.component.append("&nbsp;&nbsp;" + this.page + "/" + this.totalPage + "&nbsp;&nbsp;&nbsp;");
                if (this.page < this.totalPage) {
                    this.component.append('<a class="next" onclick=changePage("' + this.url + '",' + (this.page + 1) + ")>&#19979;&#19968;&#39029;<span></span></a>")
                } else {
                    this.component.append('<a class="dis-buttom" "style=color:gray;">&#19979;&#19968;&#39029;</a>')
                }
                this.component.append(" <br /><br />")
            }
            if (!!this.isShowNum && this.totalPage > 2) {
                if (this.totalPage < this.num) {
                    for (var c = 1; c <= this.totalPage; c++) {
                        if (this.page == c) {
                            this.component.append('<a  style="color:gray;">&nbsp;&nbsp;&nbsp;' + c + "&nbsp;&nbsp;&nbsp;</a>")
                        } else {
                            this.component.append('<a onclick=changePage("' + this.url + '",' + c + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + c + "&nbsp;&nbsp;&nbsp;</a>")
                        }
                    }
                } else {
                    var b = Math.floor(this.num / 2);
                    var f = this.totalPage - this.page;
                    var e = 0;
                    var d = 0;
                    if (this.page <= b) {
                        e = this.page - 1;
                        d = this.num - this.page
                    } else {
                        if (f >= b) {
                            if (this.num & 1) {
                                e = b
                            } else {
                                e = b - 1
                            }
                            d = b
                        } else {
                            e = this.num - f - 1;
                            d = f
                        }
                    }
                    for (var c = e; c >= 1; c--) {
                        this.component.append('<a onclick=changePage("' + this.url + '",' + (this.page - c) + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + (this.page - c) + "&nbsp;&nbsp;&nbsp;</a>")
                    }
                    this.component.append('<a style="color:gray;">&nbsp;&nbsp;&nbsp;' + this.page + "&nbsp;&nbsp;&nbsp;</a>");
                    for (var c = 1; c <= d; c++) {
                        this.component.append('<a onclick=changePage("' + this.url + '",' + (this.page + c) + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + (this.page + c) + "&nbsp;&nbsp;&nbsp;</a>")
                    }
                }
            }
        } else {
            this.component.append('<div class="item radius" style="margin-top:20px;">' + this.message + "</div>")
        }
        this.component.append(" <br /><br />")
    }
}
function pageBack() {
    var a = window.location.href;
    if (/#top/.test(a)) {
        window.history.go(-2);
        window.location.load(window.location.href)
    } else {
        window.history.back();
        window.location.load(window.location.href)
    }
}
function backPassLoginPage() {
    if (window.name == "login") {
        window.name = "";
        window.history.go(-2)
    } else {
        window.history.back()
    }
}
Date.prototype.dateAdd = function(interval, number) {
    var d = this;
    var k = {y: "FullYear", q: "Month", m: "Month", w: "Date", d: "Date", h: "Hours", n: "Minutes", s: "Seconds", ms: "MilliSeconds"};
    var n = {q: 3, w: 7};
    eval("d.set" + k[interval] + "(d.get" + k[interval] + "()+" + ((n[interval] || 1) * number) + ")");
    return d
};
Date.prototype.dateDiff = function(b, a) {
    var g = this, e = {}, c = g.getTime(), f = a.getTime();
    e.y = a.getFullYear() - g.getFullYear();
    e.q = e.y * 4 + Math.floor(a.getMonth() / 4) - Math.floor(g.getMonth() / 4);
    e.m = e.y * 12 + a.getMonth() - g.getMonth();
    e.ms = a.getTime() - g.getTime();
    e.w = Math.floor((f + 345600000) / (604800000)) - Math.floor((c + 345600000) / (604800000));
    e.d = Math.floor(f / 86400000) - Math.floor(c / 86400000);
    e.h = Math.floor(f / 3600000) - Math.floor(c / 3600000);
    e.n = Math.floor(f / 60000) - Math.floor(c / 60000);
    e.s = Math.floor(f / 1000) - Math.floor(c / 1000);
    return e[b]
};
var getDate = function(a) {
    var f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a);
    var c = parseInt(f[1], 10);
    var e = parseInt(f[2], 10) - 1;
    var b = parseInt(f[3], 10);
    var d = new Date();
    d.setFullYear(c);
    d.setMonth(e);
    d.setDate(b);
    return d
};
function clearHistory() {
    localStorage.removeItem("searchhistory");
    $("#shelper").html("");
    $("#shelper").hide()
}
function cancelHotWord() {
    $("#newkeyword").val("");
    $("#newkeyword").focus()
}
function writeSuggestion(a) {
    if (a != "") {
        $("#newkeyword").val(a);
        $("#shelper").html("");
        addSearchHistory(a);
        $("#searchForm").submit()
    }
}
function closeSuggestion() {
    $("#shelper").html("");
    $("#shelper").hide()
}
var global_searbox_focus = false;
var search_old = "";
var search_old2 = "";
function searchSuggestionContent() {
    var l = $("#newkeyword").val().trim().replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "");
    if (l == "") {
        search_old = "";
        $("#shelper").html("");
        $("#shelper").hide();
        var i = "searchhistory";
        var c = localStorage.getItem(i);
        if (c != null) {
            if (c.length > 0) {
                c = decodeURIComponent(c);
                var g = c.split("|");
                if (g != null && g.length > 0) {
                    var j = "<ul>";
                    for (var k = 0; k < g.length; k++) {
                        if (g[k] != "") {
                            j += "<li><a onclick=\"writeSuggestion('" + g[k] + '\')" href="javascript:void(0);" ' + (search_old == g[k] ? 'class="on"' : "") + ">" + makeSearchName(g[k]) + "</a></li>"
                        }
                    }
                    j += '</ul><div class="new-tbl-type"><a href="javascript:void(0);" onclick="clearHistory()" class="new-tbl-cell">&#28165;&#38500;&#21382;&#21490;&#35760;&#24405;</a><span class="new-bar"></span><a href="javascript:void(0)" onclick="closeTip()" class="new-tbl-cell">&#20851;&#38381;</a></div>';
                    $("#shelper").html(j);
                    if (global_searbox_focus) {
                        $("#shelper").show()
                    }
                } else {
                    $("#shelper").html("");
                    $("#shelper").hide()
                }
            } else {
                $("#shelper").html("");
                $("#shelper").hide()
            }
        }
    } else {
        if (l == search_old || l == search_old2) {
        } else {
            l = $("#newkeyword").val().trim().replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "");
            search_old = l;
            jQuery.get("/ware/searchSuggestion.action?", {keyword: l}, function(a) {
                if (a != null) {
                    $("#shelper").html(a);
                    $("#shelper").show()
                } else {
                    $("#shelper").html("");
                    $("#shelper").hide()
                }
            })
        }
    }
    setTimeout("searchSuggestionContent()", 500)
}
function addSearchHistory(b) {
    if (jQuery.trim(b).length > 0) {
        b = b.replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "");
        var k = b + "|";
        var d = "searchhistory";
        var f = localStorage.getItem(d);
        var e = 0;
        if (f != null) {
            f = decodeURIComponent(f);
            var j = f.split("|");
            for (var c = 0; c < j.length; c++) {
                if (c == (e != 0 ? 5 : 4)) {
                    break
                }
                b = makeSearchName(b);
                j[c] = makeSearchName(j[c]);
                if (j[c] != b) {
                    k += (j[c] + "|")
                } else {
                    e++
                }
            }
        }
        localStorage.setItem("searchhistory", encodeURIComponent(k))
    }
}
function makeSearchName(a) {
    if (a.length >= 30) {
        a = a.substring(0, 30)
    }
    return a
}
$(function() {
    $(".search input").attr("autocomplete", "off");
    if (jQuery("#newkeyword").length > 0) {
        search_old = $("#newkeyword").val().trim().replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "");
        searchSuggestionContent();
        search_old2 = search_old;
        $("#newkeyword").focus(function() {
            global_searbox_focus = true;
            if (search_old2 == $("#newkeyword").val().trim().replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "") && $("#newkeyword").attr("cleardefault") != "no") {
                $("#newkeyword").val("")
            }
        });
        $("#newkeyword").blur(function() {
            global_searbox_focus = false;
            if ($("#newkeyword").val().trim() == "") {
                $("#newkeyword").val(search_old2);
                $("#newkeyword").attr("style", "color:#999999;")
            }
        })
    }
    if ($("#btnJdkey")) {
        $("#btnJdkey").click(function() {
            if ($("#jdkey").css("display") == "none") {
                $("#jdkey").show()
            } else {
                $("#jdkey").hide()
            }
        })
    }
    var a = window.location.href.replace(/(^http:\/\/)|(\/*$)/g, "");
    if (a.indexOf("/") < 0 || (a.split("/").length <= 2 && a.indexOf("/index") >= 0)) {
        $("#jdkey .new-tbl-cell").eq(0).children().addClass("on")
    }
    if (a.indexOf("/category/all.html") > -1) {
        $("#jdkey .new-tbl-cell").eq(1).children().addClass("on")
    }
    if (a.indexOf("/cart/cart.action") > -1) {
        $("#jdkey .new-tbl-cell").eq(2).children().addClass("on")
    }
    if (a.indexOf("/user/") > -1) {
        $("#jdkey .new-tbl-cell").eq(3).children().addClass("on")
    }
    if ($("#btnJdBox")) {
        $("#btnJdBox").click(function() {
            $("#_jdBox").hide();
            $("#_jdSearch").show();
            $("#newkeyword").focus()
        })
    }
    if ($("#_cancelSearch")) {
        $("#_cancelSearch").click(function() {
            closeSuggestion();
            $("#_jdSearch").hide();
            $("#_jdBox").show()
        })
    }
    $("#search_new").click(function() {
        var b = $("#newkeyword").val();
        b = b.replace(new RegExp(/<script>/g), "").replace(new RegExp(/<\/script>/g), "");
        addSearchHistory(b);
        $("#newkeyword").val(b);
        $("#searchForm").submit()
    });
    $("#newkeyword").focus(function() {
        $("#shelper").html("");
        $("#shelper").hide()
    })
});
(function(a) {
    var b = function() {
        var h = $(a).height();
        var g = $("img[imgsrc]");
        var f = $(a).scrollTop();
        for (var d = 0, c = g.size(); d < c; d++) {
            currentObj = $(g[d]);
            var e = currentObj.offset().top - h - 200;
            if (parseInt(f) >= parseInt(e)) {
                currentObj.attr("src", currentObj.attr("imgsrc"));
                currentObj.removeAttr("imgsrc")
            }
        }
    };
    $(function() {
        b()
    });
    a.onscroll = b;
    a.onresize = b
})(window);
(function(f) {
    var a = {mainStayId: "mainStay", mainLayoutId: "mainLayout", transitionDual: 0.4};
    var h;
    function i() {
        if (h == "") {
            h = "#!" + a.mainStayId
        }
        return h
    }
    function d(j) {
        h = j
    }
    function e() {
        return f.location.hash
    }
    function b() {
        var j = e();
        if (j == "" || j == "#" || j == "#!") {
            return"#!" + a.mainStayId
        }
        return j
    }
    function c(j) {
        if (j.length > 2 && j.indexOf("#!") == 0) {
            return j.substring(2)
        }
        return""
    }
    function g() {
        var l = i();
        var k = b();
        if (l.indexOf("#!") < 0 || k.indexOf("#!") < 0) {
            return
        }
        if (l != "#!" + a.mainStayId && k != "#!" + a.mainStayId) {
            document.getElementById(a.mainStayId).style.display = "none"
        }
        if (!document.getElementById(a.mainLayoutId)) {
            return
        }
        var j = document.getElementById(a.mainLayoutId).getAttribute("style");
        j = j == null ? "" : j;
        document.getElementById(a.mainLayoutId).setAttribute("style", j + "width:200%;-webkit-transform:translate3d(" + (k == "#!" + a.mainStayId ? "-50%" : "0px") + ",0px,0px);");
        document.getElementById(c(k)).style.display = "";
        setTimeout(function() {
            document.getElementById(a.mainLayoutId).setAttribute("style", j + "width:200%;-webkit-transform:translateX(" + (k == "#!" + a.mainStayId ? "0px" : "-50%") + ");-webkit-transition:" + a.transitionDual + "s ease-out;transition:" + a.transitionDual + "s ease-out;")
        }, 10);
        setTimeout(function() {
            if (l != k) {
                document.getElementById(c(l)).style.display = "none"
            }
            var m;
            if (navigator && navigator.userAgent) {
                m = navigator.userAgent.toUpperCase()
            }
            document.getElementById(a.mainLayoutId).setAttribute("style", j);
            f.scrollTo(0, 0)
        }, a.transitionDual * 1000);
        d(e())
    }
    $(function() {
        d(f.location.hash);
        if ("onhashchange" in f && (document.documentMode === undefined || document.documentMode > 7)) {
            f.onhashchange = g
        } else {
            f.onclick = function() {
            }
        }
        if ($("#" + a.mainStayId)) {
            if ($("#" + a.mainStayId).css("display") != "none" && f.location.hash.indexOf("#!") > -1 && f.location.hash != "" && f.location.hash != "#" + a.mainStayId) {
                var j = f.location.href;
                j = j.substring(0, j.indexOf("#!"));
                f.history.pushState(null, "", j)
            }
        }
    })
})(window);
(function(b) {
    var a;
    if (navigator && navigator.userAgent) {
        a = navigator.userAgent.toUpperCase()
    }
    $(function() {
        if (a.indexOf("ANDROID") > -1) {
            $("body").addClass("a")
        } else {
            if (a.indexOf("IPHONE") > -1) {
                $("body").addClass("s")
            }
        }
    })
})(window);
$(function() {
    var a;
    if (navigator && navigator.userAgent) {
        a = navigator.userAgent.toUpperCase()
    }
    if (a && a.indexOf("UC") > -1) {
        $("#toPcHome").hide()
    }
});
var anima = function(e, d, h, a, g) {
    var b = e / d;
    var f = a - h;
    var c = function(j) {
        var i = h + j / d * f;
        g.apply(null, [j, i]);
        if (j < d) {
            setTimeout(function() {
                c(j + 1)
            }, b)
        }
    };
    c(0)
};
function loadHB(a, c, r, l) {
    var i = new MCommonHeaderBottom();
    var q = {hrederId: "m_common_header", title: r, sid: c, isShowShortCut: false, selectedShortCut: "4"};
    i.header(q);
    var j = "Item";
    var n = "view-ware";
    var k = $("#resourceType").val();
    var b = $("#resourceValue").val();
    if (k != "" && k != null && k != "unknown") {
        j = k
    }
    if (b != "" && b != null && b != "unknown") {
        n = b
    }
    var m = $("#computControul").val();
    if (m != "" && "true" == m && k != "M_APP_SAOMA") {
        n = "MWEIXIN_PRODUCTFLOAT_VALUE";
        j = "MWEIXIN_PRODUCTFLOAT_TYPE"
    }
    var o = "openApp.jdMobile://virtual";
    var d = {category: "jump", des: "productDetail", skuId: a, sourceType: j, sourceValue: n};
    var p = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx";
    var h = "";
    var g = "http://h5.m.jd.com/active/download/download.html?channel=jd-msx";
    if (a != "" && a != null && a >= 10000000 && a <= 19999999) {
        o = 'openapp.jdebook://communication?params={"type":"1"}';
        d = "";
        g = "http://e.m.jd.com/jdread.html";
        p = "http://e.m.jd.com/jdread.html";
        h = "\u4e0b\u8f7d\u4eac\u4e1c\u9605\u8bfb\u5ba2\u6237\u7aef<br>\u7cbe\u5f69\u597d\u4e66\u514d\u8d39\u770b"
    }
    var e = {downAppURl: p, downWeixin: g, inteneUrl: o, inteneUrlParams: d, noRecord: true};
    var f = {tipId: "m_common_tip", sid: c, isfloat: false, isAlwayShow: true, downloadAppPlugIn: e, copyWrite: h, onClickTrynow: function() {
        }, onClickTipX: function() {
        }};
    i.jdTip(f)
}
function showMessage(b) {
    var d = null;
    var c;
    var a = {addHtml: function() {
            var e = '<div class="message-floor" id="messageBox">';
            e += '<div class="messge-box">';
            e += '<div class="messge-box-icon"><i class="message-toast-icon ' + b.cls + '"></i></div>';
            e += '<div class="messge-box-content">' + b.message + "</div>";
            e += "</div>";
            e += "</div>";
            $("body").append(e)
        }, adjustHeight: function() {
            $(c).find(".messge-box")[0].style.marginTop = -($(c).find(".messge-box")[0].offsetHeight) / 2 + "px";
            $(c).find(".messge-box")[0].style.marginLeft = -($(c).find(".messge-box")[0].offsetWidth) / 2 + "px"
        }, setInfo: function() {
            $(c).find(".messge-box-content").text(b.message);
            $(c).find(".messge-box").width(b.width + "px");
            $(c).find(".messge-box").height(b.height + "px");
            $(c).find(".bottom-focus-icon").attr("class", "bottom-focus-icon " + b.cls)
        }};
    if ($("#messageBox").length == 0) {
        a.addHtml()
    }
    c = document.getElementById("messageBox");
    a.setInfo();
    c.style.display = "block";
    c.style.visibility = "hidden";
    a.adjustHeight();
    c.style.visibility = "visible";
    if (d != null) {
        clearTimeout(d)
    }
    d = setTimeout(function() {
        c.style.display = "none";
        d = null
    }, b.duration)
}
function showYYsMessage(b) {
    var d = null;
    var c;
    var a = {addHtml: function() {
            var e = '<div class="message-floor" id="messageBox">';
            e += '<div class="messge-box">';
            e += '<div class="messge-box-icon"><i class="bottom-focus-icon ' + b.cls + '"></i></div>';
            e += '<div class="messge-box-content">' + b.message + "</div>";
            e += "</div>";
            e += "</div>";
            $("body").append(e)
        }, adjustHeight: function() {
            var e = document.documentElement.clientHeight;
            $(c).find(".messge-box")[0].style.marginTop = (e - b.height) / 2 + "px"
        }, setInfo: function() {
            $(c).find(".messge-box-content").text(b.message);
            $(c).find(".messge-box").width(b.width + "px");
            $(c).find(".messge-box").height(b.height + "px");
            $(c).find(".bottom-focus-icon").attr("class", "bottom-focus-icon " + b.cls)
        }};
    if ($("#messageBox").length == 0) {
        a.addHtml()
    }
    c = document.getElementById("messageBox");
    a.adjustHeight();
    a.setInfo();
    c.style.display = "block";
    if (d != null) {
        clearTimeout(d)
    }
    d = setTimeout(function() {
        c.style.display = "none";
        d = null
    }, b.duration)
}
function addNumberShow(b) {
    if (b == null || b == undefined || b.length == 0 || b == 0) {
        return
    }
    var a = parseInt(b);
    if (a > 99) {
        a = 99 + "+"
    }
    var c = $("#carNum");
    c.text(a);
    c.addClass("heart-fill-anim");
    var d = null;
    if (d != null) {
        clearTimeout(d);
        d = null
    }
    d = setTimeout(function() {
        $(c[0]).attr("class", "order-numbers");
        clearTimeout(d);
        d = null
    }, 1000)
}
function focusOnSC() {
    var b = {cls: "succee-icon", duration: 1000, message: "\u53d6\u6d88\u5173\u6ce8", height: 88};
    var c = document.getElementById("focusOn");
    var a = {controlFocus: function() {
            var f = c.querySelector(".bottom-focus-icon");
            var e = f.className;
            var g = null;
            if (e.indexOf("focus-out") == -1) {
                c.innerHTML = a.runOffHtml();
                if (g != null) {
                    clearTimeout(g);
                    g = null
                }
                g = setTimeout(function() {
                    c.innerHTML = a.emptyHeartHtml();
                    f.className = e.replace("focus-on", "focus-out");
                    $(c).find(".bottom-focus-icon").removeClass("heart-fill-anim");
                    clearTimeout(g);
                    g = null
                }, 1000)
            } else {
                f.className = e.replace("focus-out", "focus-on");
                $(c).find(".bottom-focus-icon").attr("class", "bottom-focus-icon focus-on heart-fill-anim");
                $(c).find(".focus-info").text("\u5df2\u5173\u6ce8")
            }
        }, runOffHtml: function() {
            var e = '<div class="focus-icon">';
            e += '<i class="bottom-focus-icon focus-out-left"></i>';
            e += '<i class="bottom-focus-icon focus-out-right"></i>';
            e += "</div>";
            e += '<span class="focus-info">\u5173\u6ce8</span>';
            return e
        }, emptyHeartHtml: function() {
            var e = '<div class="focus-icon">';
            e += '<i class="bottom-focus-icon focus-out"></i>';
            e += "</div>";
            e += '<span class="focus-info">\u5173\u6ce8</span>';
            return e
        }};
    var d = function() {
        a.controlFocus()
    };
    return d()
}
;