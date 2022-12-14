var Sprite3D = Sprite3D || {
    isSupported: function () {
        if (!this._isInit)
            this._init();
        return this._isSupported
    },
    stage: function (e) {
        if (!this._isInit)
            this._init();
        var t, n;
        if (e) {
            t = e;
            n = e.style;
            if (n.position === "static")
                n.position = "relative"
        } else {
            t = document.createElement("div");
            n = t.style;
            n.position = "absolute";
            n.margin = "0px";
            n.padding = "0px"
        }
        n[this._browserPrefix + "Perspective"] = "800px";
        n[this._browserPrefix + "Transform"] = "translateZ(0px)";
        n[this._browserPrefix + "TransformStyle"] = "preserve-3d";
        return this.create(t)
    },
    create: function (e) {
        if (!this._isInit)
            this._init();
        if (arguments.length === 0) {
            e = document.createElement("div");
            e.style.margin = "0px";
            e.style.padding = "0px";
            e.style.position = "absolute"
        } else if (typeof e === "string") {
            var t = e;
            e = document.createElement("div");
            e.style.margin = "0px";
            e.style.padding = "0px";
            e.style.position = "absolute";
            this._handleStringArgument(e, t)
        } else if (e.style.position == "static") {
            e.style.position = "relative"
        }
        e.style[this._browserPrefix + "TransformStyle"] = "preserve-3d";
        e.style[this._transformProperty] = "translateZ(0px)";
        e.style[this._browserPrefix + "BackfaceVisibility"] = "hidden";
        for (prop in this._props) {
            if (this._props.hasOwnProperty(prop)) {
                e[prop] = this._props[prop]
            }
        }
        e._string = ["translate3d(", 0, "px,", 0, "px,", 0, "px) ", "rotateX(", 0, "deg) ", "rotateY(", 0, "deg) ", "rotateZ(", 0, "deg) ", "scale3d(", 1, ", ", 1, ", ", 1, ") "];
        e._positions = [1, 3, 5, 8, 11, 14, 17, 19, 21];
        e._ox = 0;
        e._oy = 0;
        e._oz = 0;
        return e
    },
    box: function (e, t, n, r) {
        if (!this._isInit)
            this._init();
        var i = this.create();
        if (arguments.length === 1) {
            t = e;
            n = e
        } else if (arguments.length === 2 && typeof arguments[1] === "string") {
            this._handleStringArgument(i, arguments[1]);
            t = e;
            n = e
        } else if (r && typeof r === "string") {
            this._handleStringArgument(i, r)
        }
        var s = e * .5
            , o = t * .5
            , u = n * .5;
        i.appendChild(Sprite3D.create(".front").position(-s, -o, u).size(e, t).update());
        i.appendChild(Sprite3D.create(".back").position(-s, -o, -u).size(e, t).rotationY(180).update());
        i.appendChild(Sprite3D.create(".left").position(-s - u, -o, 0).size(n, t).rotationY(-90).update());
        i.appendChild(Sprite3D.create(".right").position(s - u, -o, 0).size(n, t).rotationY(90).update());
        i.appendChild(Sprite3D.create(".bottom").position(-s, o - u, 0).size(e, n).rotationX(-90).update());
        i.appendChild(Sprite3D.create(".top").position(-s, -o - u, 0).size(e, n).rotationX(90).update());
        return i
    },
    prefix: function (e) {
        return Sprite3D._browserPrefix + e
    },
    _isInit: false,
    _isSupported: false,
    _browserPrefix: "webkit",
    _transformProperty: "webkitTransform",
    _init: function () {
        var e = document.createElement("div"), t = ["", "webkit", "Moz", "O", "ms"], n = t.length, r;
        Sprite3D._isInit = true;
        for (r = 0; r < n; r++) {
            if (t[r] + "Perspective" in e.style) {
                Sprite3D._transformProperty = t[r] + "Transform";
                Sprite3D._isSupported = true;
                Sprite3D._browserPrefix = t[r];
                if (r == 2)
                    Sprite3D._props.update = Sprite3D._props.updateJoin;
                return true
            }
        }
        return false
    },
    _handleStringArgument: function (e, t) {
        switch (t[0]) {
            case ".":
                e.className = t.substr(1);
                break;
            case "#":
                e.id = t.substr(1);
                break;
            default:
                e.id = t;
                break
        }
    },
    _props: {
        x: function (e) {
            if (arguments.length) {
                this._string[this._positions[0]] = e - this._ox;
                return this
            } else {
                return this._string[this._positions[0]] + this._ox
            }
        },
        y: function (e) {
            if (arguments.length) {
                this._string[this._positions[1]] = e - this._oy;
                return this
            } else {
                return this._string[this._positions[1]] + this._oy
            }
        },
        z: function (e) {
            if (arguments.length) {
                this._string[this._positions[2]] = e - this._oz;
                return this
            } else {
                return this._string[this._positions[2]] + this._oz
            }
        },
        position: function (e, t, n) {
            this._string[this._positions[0]] = e - this._ox;
            this._string[this._positions[1]] = t - this._oy;
            if (arguments.length >= 3)
                this._string[this._positions[2]] = n - this._oz;
            return this
        },
        move: function (e, t, n) {
            this._string[this._positions[0]] += e;
            this._string[this._positions[1]] += t;
            if (arguments.length >= 3)
                this._string[this._positions[2]] += n;
            return this
        },
        rotationX: function (e) {
            if (arguments.length) {
                this._string[this._positions[3]] = e;
                return this
            } else {
                return this._string[this._positions[3]]
            }
        },
        rotationY: function (e) {
            if (arguments.length) {
                this._string[this._positions[4]] = e;
                return this
            } else {
                return this._string[this._positions[4]]
            }
        },
        rotationZ: function (e) {
            if (arguments.length) {
                this._string[this._positions[5]] = e;
                return this
            } else {
                return this._string[this._positions[5]]
            }
        },
        rotation: function (e, t, n) {
            this._string[this._positions[3]] = e;
            this._string[this._positions[4]] = t;
            this._string[this._positions[5]] = n;
            return this
        },
        rotate: function (e, t, n) {
            this._string[this._positions[3]] += e;
            this._string[this._positions[4]] += t;
            this._string[this._positions[5]] += n;
            return this
        },
        scaleX: function (e) {
            if (arguments.length) {
                this._string[this._positions[6]] = e;
                return this
            } else {
                return this._string[this._positions[6]]
            }
        },
        scaleY: function (e) {
            if (arguments.length) {
                this._string[this._positions[7]] = e;
                return this
            } else {
                return this._string[this._positions[7]]
            }
        },
        scaleZ: function (e) {
            if (arguments.length) {
                this._string[this._positions[8]] = e;
                return this
            } else {
                return this._string[this._positions[8]]
            }
        },
        scale: function (e, t, n) {
            switch (arguments.length) {
                case 0:
                    return this._string[this._positions[6]];
                case 1:
                    this._string[this._positions[6]] = e;
                    this._string[this._positions[7]] = e;
                    this._string[this._positions[8]] = e;
                    return this;
                case 2:
                    this._string[this._positions[6]] = e;
                    this._string[this._positions[7]] = t;
                    return this;
                case 3:
                    this._string[this._positions[6]] = e;
                    this._string[this._positions[7]] = t;
                    this._string[this._positions[8]] = n;
                    return this
            }
            return this
        },
        origin: function (e, t, n) {
            if (typeof e === "string") {
                var r = window.getComputedStyle(this, null);
                console.log(r);
                console.log("w:" + r.getPropertyValue("width") + " || h: " + r.height)
            } else {
                if (arguments.length < 3)
                    n = 0;
                this._string[this._positions[0]] += this._ox - e;
                this._string[this._positions[1]] += this._oy - t;
                this._string[this._positions[2]] += this._oz - n;
                this._ox = e;
                this._oy = t;
                this._oz = n
            }
            return this
        },
        transformOrigin: function (e, t) {
            this.style[Sprite3D._browserPrefix + "TransformOrigin"] = (Number(e) ? e + "px" : e) + " " + (Number(t) ? t + "px" : t);
            return this
        },
        transformString: function (e) {
            var t = e.toLowerCase().split(" ")
                , n = t.length
                , r = 0
                , i = []
                , s = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                , o = 0;
            for (r; r < n; r++) {
                switch (t[r]) {
                    case "p":
                    case "position":
                    case "translate":
                        o = i.push("translate3d(", this._string[this._positions[0]], "px,", this._string[this._positions[1]], "px,", this._string[this._positions[2]], "px) ");
                        s[0] = o - 6;
                        s[1] = o - 4;
                        s[2] = o - 2;
                        break;
                    case "rx":
                    case "rotatex":
                    case "rotationx":
                        o = i.push("rotateX(", this._string[this._positions[3]], "deg) ");
                        s[3] = o - 2;
                        break;
                    case "ry":
                    case "rotatey":
                    case "rotationy":
                        o = i.push("rotateY(", this._string[this._positions[4]], "deg) ");
                        s[4] = o - 2;
                        break;
                    case "rz":
                    case "rotatez":
                    case "rotationz":
                        o = i.push("rotateZ(", this._string[this._positions[5]], "deg) ");
                        s[5] = o - 2;
                        break;
                    case "s":
                    case "scale":
                        o = i.push("scale3d(", this._string[this._positions[6]], ",", this._string[this._positions[7]], ",", this._string[this._positions[8]], ") ");
                        s[6] = o - 6;
                        s[7] = o - 4;
                        s[8] = o - 2;
                        break
                }
            }
            this._string = i;
            this._positions = s;
            return this
        },
        updateJoin: function () {
            this.style[Sprite3D._transformProperty] = this._string.join("");
            return this
        },
        update: function () {
            var e = "";
            this._string.every(function (t) {
                e += t;
                return true
            });
            this.style[Sprite3D._transformProperty] = e;
            return this
        },
        perspective: function (e) {
            switch (arguments.length) {
                case 0:
                    return this.style[Sprite3D._browserPrefix + "Perspective"];
                case 1:
                    this.style[Sprite3D._browserPrefix + "Perspective"] = typeof e === "string" ? e : e + "px";
                    return this
            }
        },
        css: function (e, t) {
            switch (arguments.length) {
                case 0:
                    return this.style;
                case 1:
                    return this.style[e];
                case 2:
                    this.style[e] = t;
                    return this;
                case 3:
                    this.style[Sprite3D._browserPrefix + e] = t;
                    return this
            }
        },
        html: function (e) {
            if (arguments.length) {
                this.innerHTML = e;
                return this
            } else {
                return this.innerHTML
            }
            return this
        },
        size: function (e, t) {
            this.style.width = Number(e) ? e + "px" : e;
            this.style.height = Number(t) ? t + "px" : t;
            return this
        },
        bind: function (e) {
            if (typeof e === "object") {
                for (var t in e) {
                    this.addEventListener(t, e[t], false)
                }
            } else if (arguments.length === 2) {
                this.addEventListener(arguments[0], arguments[1], false)
            }
            return this
        },
        unbind: function (e) {
            if (typeof e === "object") {
                for (var t in e) {
                    this.removeEventListener(t, e[t], false)
                }
            } else if (arguments.length === 2) {
                this.removeEventListener(arguments[0], arguments[1], false)
            }
            return this
        },
        tileWidth: 0,
        tileHeight: 0,
        tileSize: function (e, t) {
            this.tileWidth = e;
            this.tileHeight = t;
            return this
        },
        tilePosition: function (e, t) {
            this.style.backgroundPosition = "-" + e * this.tileWidth + "px -" + t * this.tileHeight + "px";
            return this
        },
        set: function (e, t) {
            this[e] = t;
            return this
        }
    }
};
Aroma.Vector3D = function (e, t, n) {
    this.x = e;
    this.y = t;
    this.z = n
}
    ;
Aroma.Vector3D.prototype.toString = function () {
    return String("[" + this.x + " ," + this.y + " ," + this.z + "]")
}
    ;
Aroma.Vector3D.dotProduct = function (e, t) {
    return e.x * t.x + e.y * t.y + e.z * t.z
}
    ;
Aroma.Vector3D.rotate = function (e, t, n, r) {
    e = Aroma.Vector3D.rotateAxis(e, "x", t);
    e = Aroma.Vector3D.rotateAxis(e, "y", n);
    e = Aroma.Vector3D.rotateAxis(e, "z", r);
    return e
}
    ;
Aroma.Vector3D.rotateAxis = function (e, t, n) {
    n = n * Math.PI / 180;
    var r = Math.cos(n);
    var i = Math.sin(n);
    switch (t) {
        case "x":
            return new Aroma.Vector3D(e.x, e.y * r - e.z * i, e.y * i + e.z * r);
            break;
        case "y":
            return new Aroma.Vector3D(e.z * i + e.x * r, e.y, e.z * r - e.x * i);
            break;
        case "z":
            return new Aroma.Vector3D(e.x * r - e.y * i, e.x * i + e.y * r, e.z);
            break
    }
}
    ;
Aroma.CSS3DView = function (e, t) {
    Aroma.AbstractView.call(this, e, t);
    this.viewport = document.createElement("div");
    this.viewport.style.overflow = "hidden";
    this.sort = true;
    this.stage = Sprite3D.stage();
    this.alignstage = function () {
        this.stage.style.position = "relative";
        this.stage.style.left = (this.vpWidth - this.width) / 2 + "px";
        this.stage.style.top = (this.vpHeight - this.height) / 2 + "px"
    }
}
    ;
Aroma.CSS3DView.prototype = new Aroma.AbstractView;
Aroma.CSS3DView.prototype.constructor = Aroma.CSS3DView;
Aroma.CSS3DView.prototype.setup = function () {
    this.stage.perspective(1500);
    this.stage.style[Sprite3D._browserPrefix + "PerspectiveOrigin"] = "50% 50%";
    this.stage.style[Sprite3D._browserPrefix + "TransformStyle"] = "";
    this.viewport.appendChild(this.stage)
}
    ;
Aroma.CSS3DView.prototype.setSize = function (e, t) {
    Aroma.AbstractView.prototype.setSize.call(this, e, t);
    this.stage.style.width = e + "px";
    this.stage.style.height = t + "px";
    this.alignstage()
}
    ;
Aroma.CSS3DView.prototype.setViewPortSize = function (e, t) {
    this.vpWidth = e;
    this.vpHeight = t;
    this.viewport.style.width = e + "px";
    this.viewport.style.height = t + "px";
    this.alignstage()
}
    ;
Aroma.CSS3DView.prototype.dispose = function () {
    this.stage.setAttribute("style", "");
    Aroma.AbstractView.prototype.dispose.call(this)
}
    ;
Aroma.CSS3DView.prototype.getPieceAt = function (e, t, n) {
    var r = this.posToID(e, t);
    if (this._pieceList[r] != null)
        return this._pieceList[r];
    var i = new Aroma.CSS3DCube;
    var s = this.getPieceBounds(e, t);
    i.col = e;
    i.row = t;
    i.bounds = s;
    i.view = this;
    i.stage = this.stage;
    n.piece = i;
    ConcatObject.concat(i.options, n.getPieceOptions());
    i.setup(this.newSource, this.oldSource);
    this.stage.appendChild(i.cube);
    this._pieceList[r] = i;
    return i
}
    ;
Aroma.CSS3DView.prototype.sortParts = function () {
    Aroma.AbstractView.prototype.sortParts.call(this);
    for (var e = 0, t = this._pieceList.length; e < t; ++e) {
        this._pieceList[e].cube.style.zIndex = e
    }
}
    ;
Aroma.CSS3DCube = function () {
    Aroma.Piece.call(this);
    this.proxy = null;
    this.cube = null;
    this.stage = null;
    this.depth = 0;
    this.options = {
        flipX: false,
        flipY: false,
        sideColor: 11184810,
        newImageLocation: 1,
        depth: 800
    };
    this.side_dic = {
        right: 3,
        front: 0,
        left: 2,
        back: 1,
        top: 5,
        bottom: 4
    };
    this.getImage = function (e, t, n) {
        var r = new Image;
        r.src = e.src;
        r.style.width = this.view.width + "px";
        r.style.height = this.view.height + "px";
        r.style.position = "relative";
        r.style.left = -this.bounds.x + "px";
        r.style.top = -this.bounds.y + "px";
        if (t) {
            r.style[Sprite3D._browserPrefix + "Transform"] += " rotateX(180deg)";
            r.style.left = -this.view.width + (this.bounds.x + this.bounds.width) + "px"
        }
        if (n) {
            r.style[Sprite3D._browserPrefix + "Transform"] += " rotateY(180deg)";
            r.style.top = -this.view.height + (this.bounds.y + this.bounds.height) + "px"
        }
        return r
    }
}
    ;
Aroma.CSS3DCube.normals = [new Aroma.Vector3D(0, 0, 1), new Aroma.Vector3D(0, 0, -1), new Aroma.Vector3D(-1, 0, 0), new Aroma.Vector3D(1, 0, 0), new Aroma.Vector3D(0, 1, 0), new Aroma.Vector3D(0, -1, 0)];
Aroma.CSS3DCube.prototype = new Aroma.Piece;
Aroma.CSS3DCube.prototype.constructor = Aroma.CSS3DCube;
Aroma.CSS3DCube.light = true;
Aroma.CSS3DCube.prototype.setup = function (e, t) {
    this.proxy = {
        x: 0,
        y: 0,
        z: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        piece: this
    };
    this.newSource = e;
    this.oldSource = t;
    this.depth = this.options.depth;
    this.bounds.width = this.bounds.width;
    this.bounds.height = this.bounds.height;
    this.bounds.x = this.bounds.x;
    this.bounds.y = this.bounds.y;
    this.cube = Sprite3D.box(this.bounds.width, this.bounds.height, this.depth, "cube");
    this.sides = this.cube.children;
    for (var n = 0; n < 6; ++n) {
        if (n == 0) {
            this.sides[0].style.overflow = "hidden";
            this.sides[0].appendChild(this.getImage(this.oldSource))
        } else if (n == this.options.newImageLocation) {
            this.sides[n].style.overflow = "hidden";
            this.sides[n].appendChild(this.getImage(this.newSource, this.options.flipX, this.options.flipY))
        } else {
            this.sides[n].style.backgroundColor = "#" + this.options.sideColor.toString(16)
        }
    }
    this.origin_x = this.bounds.x + this.bounds.width / 2;
    this.origin_y = this.bounds.y + this.bounds.height / 2;
    this.origin_z = -this.depth >> 1;
    this.cube.style.left = this.origin_x + "px";
    this.cube.style.top = this.origin_y + "px";
    this.cube.z(this.origin_z);
    this.cube.update();
    this.stage.appendChild(this.cube)
}
    ;
Aroma.CSS3DCube.prototype.dispose = function () {
    this.stage.removeChild(this.cube);
    this.cube.html("");
    this.cube = null;
    this.stage = null;
    this.scene = null;
    this.proxy = null
}
    ;
Aroma.CSS3DCube.prototype.proxyUpdate = function () {
    this.piece.cube.x(this.x);
    this.piece.cube.y(this.y);
    this.piece.cube.z(this.z + this.piece.origin_z);
    this.piece.cube.rotationX(-this.rotationX);
    this.piece.cube.rotationY(-this.rotationY);
    this.piece.cube.rotationZ(-this.rotationZ);
    this.piece.cube.update();
    if (Aroma.CSS3DCube.light) {
        for (var e = 1; e < 6; ++e) {
            if (e != this.piece.options.newImageLocation) {
                var t = Aroma.Vector3D.rotate(Aroma.CSS3DCube.normals[e], -this.rotationX, -this.rotationY, -this.rotationZ);
                var n = Aroma.Vector3D.dotProduct(t, Aroma.CSS3DCube.normals[0]) * 50;
                var r = this.piece.options.sideColor;
                if (n < 0)
                    n = 0;
                this.piece.cube.children[e].style.backgroundColor = "rgb(" + parseInt((r & 255) + n) + "," + parseInt((r >> 8 & 255) + n) + "," + parseInt((r >> 16 & 255) + n) + ")";
                t = null
            }
        }
    }
}
