/* eslint-disable */
//prettier-ignore
module.exports = {
  name: "@yarnpkg/plugin-workspace-tools",
  factory: function (require) {
    var plugin = (() => {
      var wr = Object.create, me = Object.defineProperty, Sr = Object.defineProperties,
        vr = Object.getOwnPropertyDescriptor, Hr = Object.getOwnPropertyDescriptors, $r = Object.getOwnPropertyNames,
        et = Object.getOwnPropertySymbols, kr = Object.getPrototypeOf, tt = Object.prototype.hasOwnProperty,
        Tr = Object.prototype.propertyIsEnumerable;
      var rt = (e, t, r) => t in e ? me(e, t, {enumerable: !0, configurable: !0, writable: !0, value: r}) : e[t] = r,
        B = (e, t) => {
          for (var r in t || (t = {})) tt.call(t, r) && rt(e, r, t[r]);
          if (et) for (var r of et(t)) Tr.call(t, r) && rt(e, r, t[r]);
          return e
        }, Q = (e, t) => Sr(e, Hr(t)), Lr = e => me(e, "__esModule", {value: !0});
      var K = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports), Or = (e, t) => {
        for (var r in t) me(e, r, {get: t[r], enumerable: !0})
      }, Nr = (e, t, r) => {
        if (t && typeof t == "object" || typeof t == "function") for (let n of $r(t)) !tt.call(e, n) && n !== "default" && me(e, n, {
          get: () => t[n],
          enumerable: !(r = vr(t, n)) || r.enumerable
        });
        return e
      }, X = e => Nr(Lr(me(e != null ? wr(kr(e)) : {}, "default", e && e.__esModule && "default" in e ? {
        get: () => e.default,
        enumerable: !0
      } : {value: e, enumerable: !0})), e);
      var $e = K(te => {
        "use strict";
        te.isInteger = e => typeof e == "number" ? Number.isInteger(e) : typeof e == "string" && e.trim() !== "" ? Number.isInteger(Number(e)) : !1;
        te.find = (e, t) => e.nodes.find(r => r.type === t);
        te.exceedsLimit = (e, t, r = 1, n) => n === !1 || !te.isInteger(e) || !te.isInteger(t) ? !1 : (Number(t) - Number(e)) / Number(r) >= n;
        te.escapeNode = (e, t = 0, r) => {
          let n = e.nodes[t];
          !n || (r && n.type === r || n.type === "open" || n.type === "close") && n.escaped !== !0 && (n.value = "\\" + n.value, n.escaped = !0)
        };
        te.encloseBrace = e => e.type !== "brace" ? !1 : e.commas >> 0 + e.ranges >> 0 == 0 ? (e.invalid = !0, !0) : !1;
        te.isInvalidBrace = e => e.type !== "brace" ? !1 : e.invalid === !0 || e.dollar ? !0 : e.commas >> 0 + e.ranges >> 0 == 0 || e.open !== !0 || e.close !== !0 ? (e.invalid = !0, !0) : !1;
        te.isOpenOrClose = e => e.type === "open" || e.type === "close" ? !0 : e.open === !0 || e.close === !0;
        te.reduce = e => e.reduce((t, r) => (r.type === "text" && t.push(r.value), r.type === "range" && (r.type = "text"), t), []);
        te.flatten = (...e) => {
          let t = [], r = n => {
            for (let s = 0; s < n.length; s++) {
              let a = n[s];
              Array.isArray(a) ? r(a, t) : a !== void 0 && t.push(a)
            }
            return t
          };
          return r(e), t
        }
      });
      var ke = K((is, at) => {
        "use strict";
        var it = $e();
        at.exports = (e, t = {}) => {
          let r = (n, s = {}) => {
            let a = t.escapeInvalid && it.isInvalidBrace(s), i = n.invalid === !0 && t.escapeInvalid === !0, o = "";
            if (n.value) return (a || i) && it.isOpenOrClose(n) ? "\\" + n.value : n.value;
            if (n.value) return n.value;
            if (n.nodes) for (let h of n.nodes) o += r(h);
            return o
          };
          return r(e)
        }
      });
      var ct = K((os, ot) => {
        "use strict";
        ot.exports = function (e) {
          return typeof e == "number" ? e - e == 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1
        }
      });
      var At = K((cs, ut) => {
        "use strict";
        var lt = ct(), pe = (e, t, r) => {
          if (lt(e) === !1) throw new TypeError("toRegexRange: expected the first argument to be a number");
          if (t === void 0 || e === t) return String(e);
          if (lt(t) === !1) throw new TypeError("toRegexRange: expected the second argument to be a number.");
          let n = B({relaxZeros: !0}, r);
          typeof n.strictZeros == "boolean" && (n.relaxZeros = n.strictZeros === !1);
          let s = String(n.relaxZeros), a = String(n.shorthand), i = String(n.capture), o = String(n.wrap),
            h = e + ":" + t + "=" + s + a + i + o;
          if (pe.cache.hasOwnProperty(h)) return pe.cache[h].result;
          let g = Math.min(e, t), f = Math.max(e, t);
          if (Math.abs(g - f) === 1) {
            let R = e + "|" + t;
            return n.capture ? `(${R})` : n.wrap === !1 ? R : `(?:${R})`
          }
          let A = ft(e) || ft(t), p = {min: e, max: t, a: g, b: f}, k = [], y = [];
          if (A && (p.isPadded = A, p.maxLen = String(p.max).length), g < 0) {
            let R = f < 0 ? Math.abs(f) : 1;
            y = pt(R, Math.abs(g), p, n), g = p.a = 0
          }
          return f >= 0 && (k = pt(g, f, p, n)), p.negatives = y, p.positives = k, p.result = Ir(y, k, n), n.capture === !0 ? p.result = `(${p.result})` : n.wrap !== !1 && k.length + y.length > 1 && (p.result = `(?:${p.result})`), pe.cache[h] = p, p.result
        };

        function Ir(e, t, r) {
          let n = Pe(e, t, "-", !1, r) || [], s = Pe(t, e, "", !1, r) || [], a = Pe(e, t, "-?", !0, r) || [];
          return n.concat(a).concat(s).join("|")
        }

        function Mr(e, t) {
          let r = 1, n = 1, s = ht(e, r), a = new Set([t]);
          for (; e <= s && s <= t;) a.add(s), r += 1, s = ht(e, r);
          for (s = dt(t + 1, n) - 1; e < s && s <= t;) a.add(s), n += 1, s = dt(t + 1, n) - 1;
          return a = [...a], a.sort(Br), a
        }

        function Ur(e, t, r) {
          if (e === t) return {pattern: e, count: [], digits: 0};
          let n = Pr(e, t), s = n.length, a = "", i = 0;
          for (let o = 0; o < s; o++) {
            let [h, g] = n[o];
            h === g ? a += h : h !== "0" || g !== "9" ? a += Dr(h, g, r) : i++
          }
          return i && (a += r.shorthand === !0 ? "\\d" : "[0-9]"), {pattern: a, count: [i], digits: s}
        }

        function pt(e, t, r, n) {
          let s = Mr(e, t), a = [], i = e, o;
          for (let h = 0; h < s.length; h++) {
            let g = s[h], f = Ur(String(i), String(g), n), A = "";
            if (!r.isPadded && o && o.pattern === f.pattern) {
              o.count.length > 1 && o.count.pop(), o.count.push(f.count[0]), o.string = o.pattern + gt(o.count), i = g + 1;
              continue
            }
            r.isPadded && (A = Gr(g, r, n)), f.string = A + f.pattern + gt(f.count), a.push(f), i = g + 1, o = f
          }
          return a
        }

        function Pe(e, t, r, n, s) {
          let a = [];
          for (let i of e) {
            let {string: o} = i;
            !n && !mt(t, "string", o) && a.push(r + o), n && mt(t, "string", o) && a.push(r + o)
          }
          return a
        }

        function Pr(e, t) {
          let r = [];
          for (let n = 0; n < e.length; n++) r.push([e[n], t[n]]);
          return r
        }

        function Br(e, t) {
          return e > t ? 1 : t > e ? -1 : 0
        }

        function mt(e, t, r) {
          return e.some(n => n[t] === r)
        }

        function ht(e, t) {
          return Number(String(e).slice(0, -t) + "9".repeat(t))
        }

        function dt(e, t) {
          return e - e % Math.pow(10, t)
        }

        function gt(e) {
          let [t = 0, r = ""] = e;
          return r || t > 1 ? `{${t + (r ? "," + r : "")}}` : ""
        }

        function Dr(e, t, r) {
          return `[${e}${t - e == 1 ? "" : "-"}${t}]`
        }

        function ft(e) {
          return /^-?(0+)\d/.test(e)
        }

        function Gr(e, t, r) {
          if (!t.isPadded) return e;
          let n = Math.abs(t.maxLen - String(e).length), s = r.relaxZeros !== !1;
          switch (n) {
            case 0:
              return "";
            case 1:
              return s ? "0?" : "0";
            case 2:
              return s ? "0{0,2}" : "00";
            default:
              return s ? `0{0,${n}}` : `0{${n}}`
          }
        }

        pe.cache = {};
        pe.clearCache = () => pe.cache = {};
        ut.exports = pe
      });
      var Ge = K((us, Rt) => {
        "use strict";
        var qr = require("util"), yt = At(), bt = e => e !== null && typeof e == "object" && !Array.isArray(e),
          Kr = e => t => e === !0 ? Number(t) : String(t),
          De = e => typeof e == "number" || typeof e == "string" && e !== "", Re = e => Number.isInteger(+e),
          Ue = e => {
            let t = `${e}`, r = -1;
            if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
            for (; t[++r] === "0";) ;
            return r > 0
          }, Wr = (e, t, r) => typeof e == "string" || typeof t == "string" ? !0 : r.stringify === !0,
          jr = (e, t, r) => {
            if (t > 0) {
              let n = e[0] === "-" ? "-" : "";
              n && (e = e.slice(1)), e = n + e.padStart(n ? t - 1 : t, "0")
            }
            return r === !1 ? String(e) : e
          }, _t = (e, t) => {
            let r = e[0] === "-" ? "-" : "";
            for (r && (e = e.slice(1), t--); e.length < t;) e = "0" + e;
            return r ? "-" + e : e
          }, Fr = (e, t) => {
            e.negatives.sort((i, o) => i < o ? -1 : i > o ? 1 : 0), e.positives.sort((i, o) => i < o ? -1 : i > o ? 1 : 0);
            let r = t.capture ? "" : "?:", n = "", s = "", a;
            return e.positives.length && (n = e.positives.join("|")), e.negatives.length && (s = `-(${r}${e.negatives.join("|")})`), n && s ? a = `${n}|${s}` : a = n || s, t.wrap ? `(${r}${a})` : a
          }, Et = (e, t, r, n) => {
            if (r) return yt(e, t, B({wrap: !1}, n));
            let s = String.fromCharCode(e);
            if (e === t) return s;
            let a = String.fromCharCode(t);
            return `[${s}-${a}]`
          }, xt = (e, t, r) => {
            if (Array.isArray(e)) {
              let n = r.wrap === !0, s = r.capture ? "" : "?:";
              return n ? `(${s}${e.join("|")})` : e.join("|")
            }
            return yt(e, t, r)
          }, Ct = (...e) => new RangeError("Invalid range arguments: " + qr.inspect(...e)), wt = (e, t, r) => {
            if (r.strictRanges === !0) throw Ct([e, t]);
            return []
          }, Qr = (e, t) => {
            if (t.strictRanges === !0) throw new TypeError(`Expected step "${e}" to be a number`);
            return []
          }, Xr = (e, t, r = 1, n = {}) => {
            let s = Number(e), a = Number(t);
            if (!Number.isInteger(s) || !Number.isInteger(a)) {
              if (n.strictRanges === !0) throw Ct([e, t]);
              return []
            }
            s === 0 && (s = 0), a === 0 && (a = 0);
            let i = s > a, o = String(e), h = String(t), g = String(r);
            r = Math.max(Math.abs(r), 1);
            let f = Ue(o) || Ue(h) || Ue(g), A = f ? Math.max(o.length, h.length, g.length) : 0,
              p = f === !1 && Wr(e, t, n) === !1, k = n.transform || Kr(p);
            if (n.toRegex && r === 1) return Et(_t(e, A), _t(t, A), !0, n);
            let y = {negatives: [], positives: []}, R = T => y[T < 0 ? "negatives" : "positives"].push(Math.abs(T)),
              _ = [], x = 0;
            for (; i ? s >= a : s <= a;) n.toRegex === !0 && r > 1 ? R(s) : _.push(jr(k(s, x), A, p)), s = i ? s - r : s + r, x++;
            return n.toRegex === !0 ? r > 1 ? Fr(y, n) : xt(_, null, B({wrap: !1}, n)) : _
          }, Zr = (e, t, r = 1, n = {}) => {
            if (!Re(e) && e.length > 1 || !Re(t) && t.length > 1) return wt(e, t, n);
            let s = n.transform || (p => String.fromCharCode(p)), a = `${e}`.charCodeAt(0), i = `${t}`.charCodeAt(0),
              o = a > i, h = Math.min(a, i), g = Math.max(a, i);
            if (n.toRegex && r === 1) return Et(h, g, !1, n);
            let f = [], A = 0;
            for (; o ? a >= i : a <= i;) f.push(s(a, A)), a = o ? a - r : a + r, A++;
            return n.toRegex === !0 ? xt(f, null, {wrap: !1, options: n}) : f
          }, Te = (e, t, r, n = {}) => {
            if (t == null && De(e)) return [e];
            if (!De(e) || !De(t)) return wt(e, t, n);
            if (typeof r == "function") return Te(e, t, 1, {transform: r});
            if (bt(r)) return Te(e, t, 0, r);
            let s = B({}, n);
            return s.capture === !0 && (s.wrap = !0), r = r || s.step || 1, Re(r) ? Re(e) && Re(t) ? Xr(e, t, r, s) : Zr(e, t, Math.max(Math.abs(r), 1), s) : r != null && !bt(r) ? Qr(r, s) : Te(e, t, 1, r)
          };
        Rt.exports = Te
      });
      var Ht = K((ls, St) => {
        "use strict";
        var Yr = Ge(), vt = $e(), zr = (e, t = {}) => {
          let r = (n, s = {}) => {
            let a = vt.isInvalidBrace(s), i = n.invalid === !0 && t.escapeInvalid === !0, o = a === !0 || i === !0,
              h = t.escapeInvalid === !0 ? "\\" : "", g = "";
            if (n.isOpen === !0 || n.isClose === !0) return h + n.value;
            if (n.type === "open") return o ? h + n.value : "(";
            if (n.type === "close") return o ? h + n.value : ")";
            if (n.type === "comma") return n.prev.type === "comma" ? "" : o ? n.value : "|";
            if (n.value) return n.value;
            if (n.nodes && n.ranges > 0) {
              let f = vt.reduce(n.nodes), A = Yr(...f, Q(B({}, t), {wrap: !1, toRegex: !0}));
              if (A.length !== 0) return f.length > 1 && A.length > 1 ? `(${A})` : A
            }
            if (n.nodes) for (let f of n.nodes) g += r(f, n);
            return g
          };
          return r(e)
        };
        St.exports = zr
      });
      var Tt = K((ps, $t) => {
        "use strict";
        var Vr = Ge(), kt = ke(), he = $e(), fe = (e = "", t = "", r = !1) => {
          let n = [];
          if (e = [].concat(e), t = [].concat(t), !t.length) return e;
          if (!e.length) return r ? he.flatten(t).map(s => `{${s}}`) : t;
          for (let s of e) if (Array.isArray(s)) for (let a of s) n.push(fe(a, t, r)); else for (let a of t) r === !0 && typeof a == "string" && (a = `{${a}}`), n.push(Array.isArray(a) ? fe(s, a, r) : s + a);
          return he.flatten(n)
        }, Jr = (e, t = {}) => {
          let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit, n = (s, a = {}) => {
            s.queue = [];
            let i = a, o = a.queue;
            for (; i.type !== "brace" && i.type !== "root" && i.parent;) i = i.parent, o = i.queue;
            if (s.invalid || s.dollar) {
              o.push(fe(o.pop(), kt(s, t)));
              return
            }
            if (s.type === "brace" && s.invalid !== !0 && s.nodes.length === 2) {
              o.push(fe(o.pop(), ["{}"]));
              return
            }
            if (s.nodes && s.ranges > 0) {
              let A = he.reduce(s.nodes);
              if (he.exceedsLimit(...A, t.step, r)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
              let p = Vr(...A, t);
              p.length === 0 && (p = kt(s, t)), o.push(fe(o.pop(), p)), s.nodes = [];
              return
            }
            let h = he.encloseBrace(s), g = s.queue, f = s;
            for (; f.type !== "brace" && f.type !== "root" && f.parent;) f = f.parent, g = f.queue;
            for (let A = 0; A < s.nodes.length; A++) {
              let p = s.nodes[A];
              if (p.type === "comma" && s.type === "brace") {
                A === 1 && g.push(""), g.push("");
                continue
              }
              if (p.type === "close") {
                o.push(fe(o.pop(), g, h));
                continue
              }
              if (p.value && p.type !== "open") {
                g.push(fe(g.pop(), p.value));
                continue
              }
              p.nodes && n(p, s)
            }
            return g
          };
          return he.flatten(n(e))
        };
        $t.exports = Jr
      });
      var Ot = K((fs, Lt) => {
        "use strict";
        Lt.exports = {
          MAX_LENGTH: 1024 * 64,
          CHAR_0: "0",
          CHAR_9: "9",
          CHAR_UPPERCASE_A: "A",
          CHAR_LOWERCASE_A: "a",
          CHAR_UPPERCASE_Z: "Z",
          CHAR_LOWERCASE_Z: "z",
          CHAR_LEFT_PARENTHESES: "(",
          CHAR_RIGHT_PARENTHESES: ")",
          CHAR_ASTERISK: "*",
          CHAR_AMPERSAND: "&",
          CHAR_AT: "@",
          CHAR_BACKSLASH: "\\",
          CHAR_BACKTICK: "`",
          CHAR_CARRIAGE_RETURN: "\r",
          CHAR_CIRCUMFLEX_ACCENT: "^",
          CHAR_COLON: ":",
          CHAR_COMMA: ",",
          CHAR_DOLLAR: "$",
          CHAR_DOT: ".",
          CHAR_DOUBLE_QUOTE: '"',
          CHAR_EQUAL: "=",
          CHAR_EXCLAMATION_MARK: "!",
          CHAR_FORM_FEED: "\f",
          CHAR_FORWARD_SLASH: "/",
          CHAR_HASH: "#",
          CHAR_HYPHEN_MINUS: "-",
          CHAR_LEFT_ANGLE_BRACKET: "<",
          CHAR_LEFT_CURLY_BRACE: "{",
          CHAR_LEFT_SQUARE_BRACKET: "[",
          CHAR_LINE_FEED: `
`,
          CHAR_NO_BREAK_SPACE: "\xA0",
          CHAR_PERCENT: "%",
          CHAR_PLUS: "+",
          CHAR_QUESTION_MARK: "?",
          CHAR_RIGHT_ANGLE_BRACKET: ">",
          CHAR_RIGHT_CURLY_BRACE: "}",
          CHAR_RIGHT_SQUARE_BRACKET: "]",
          CHAR_SEMICOLON: ";",
          CHAR_SINGLE_QUOTE: "'",
          CHAR_SPACE: " ",
          CHAR_TAB: "	",
          CHAR_UNDERSCORE: "_",
          CHAR_VERTICAL_LINE: "|",
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
        }
      });
      var Pt = K((hs, Nt) => {
        "use strict";
        var en = ke(), {
          MAX_LENGTH: It,
          CHAR_BACKSLASH: qe,
          CHAR_BACKTICK: tn,
          CHAR_COMMA: rn,
          CHAR_DOT: nn,
          CHAR_LEFT_PARENTHESES: sn,
          CHAR_RIGHT_PARENTHESES: an,
          CHAR_LEFT_CURLY_BRACE: on,
          CHAR_RIGHT_CURLY_BRACE: cn,
          CHAR_LEFT_SQUARE_BRACKET: Bt,
          CHAR_RIGHT_SQUARE_BRACKET: Mt,
          CHAR_DOUBLE_QUOTE: un,
          CHAR_SINGLE_QUOTE: ln,
          CHAR_NO_BREAK_SPACE: pn,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: fn
        } = Ot(), hn = (e, t = {}) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          let r = t || {}, n = typeof r.maxLength == "number" ? Math.min(It, r.maxLength) : It;
          if (e.length > n) throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${n})`);
          let s = {type: "root", input: e, nodes: []}, a = [s], i = s, o = s, h = 0, g = e.length, f = 0, A = 0, p,
            k = {}, y = () => e[f++], R = _ => {
              if (_.type === "text" && o.type === "dot" && (o.type = "text"), o && o.type === "text" && _.type === "text") {
                o.value += _.value;
                return
              }
              return i.nodes.push(_), _.parent = i, _.prev = o, o = _, _
            };
          for (R({type: "bos"}); f < g;) if (i = a[a.length - 1], p = y(), !(p === fn || p === pn)) {
            if (p === qe) {
              R({type: "text", value: (t.keepEscaping ? p : "") + y()});
              continue
            }
            if (p === Mt) {
              R({type: "text", value: "\\" + p});
              continue
            }
            if (p === Bt) {
              h++;
              let _ = !0, x;
              for (; f < g && (x = y());) {
                if (p += x, x === Bt) {
                  h++;
                  continue
                }
                if (x === qe) {
                  p += y();
                  continue
                }
                if (x === Mt && (h--, h === 0)) break
              }
              R({type: "text", value: p});
              continue
            }
            if (p === sn) {
              i = R({type: "paren", nodes: []}), a.push(i), R({type: "text", value: p});
              continue
            }
            if (p === an) {
              if (i.type !== "paren") {
                R({type: "text", value: p});
                continue
              }
              i = a.pop(), R({type: "text", value: p}), i = a[a.length - 1];
              continue
            }
            if (p === un || p === ln || p === tn) {
              let _ = p, x;
              for (t.keepQuotes !== !0 && (p = ""); f < g && (x = y());) {
                if (x === qe) {
                  p += x + y();
                  continue
                }
                if (x === _) {
                  t.keepQuotes === !0 && (p += x);
                  break
                }
                p += x
              }
              R({type: "text", value: p});
              continue
            }
            if (p === on) {
              A++;
              let _ = o.value && o.value.slice(-1) === "$" || i.dollar === !0;
              i = R({
                type: "brace",
                open: !0,
                close: !1,
                dollar: _,
                depth: A,
                commas: 0,
                ranges: 0,
                nodes: []
              }), a.push(i), R({type: "open", value: p});
              continue
            }
            if (p === cn) {
              if (i.type !== "brace") {
                R({type: "text", value: p});
                continue
              }
              let _ = "close";
              i = a.pop(), i.close = !0, R({type: _, value: p}), A--, i = a[a.length - 1];
              continue
            }
            if (p === rn && A > 0) {
              if (i.ranges > 0) {
                i.ranges = 0;
                let _ = i.nodes.shift();
                i.nodes = [_, {type: "text", value: en(i)}]
              }
              R({type: "comma", value: p}), i.commas++;
              continue
            }
            if (p === nn && A > 0 && i.commas === 0) {
              let _ = i.nodes;
              if (A === 0 || _.length === 0) {
                R({type: "text", value: p});
                continue
              }
              if (o.type === "dot") {
                if (i.range = [], o.value += p, o.type = "range", i.nodes.length !== 3 && i.nodes.length !== 5) {
                  i.invalid = !0, i.ranges = 0, o.type = "text";
                  continue
                }
                i.ranges++, i.args = [];
                continue
              }
              if (o.type === "range") {
                _.pop();
                let x = _[_.length - 1];
                x.value += o.value + p, o = x, i.ranges--;
                continue
              }
              R({type: "dot", value: p});
              continue
            }
            R({type: "text", value: p})
          }
          do if (i = a.pop(), i.type !== "root") {
            i.nodes.forEach(T => {
              T.nodes || (T.type === "open" && (T.isOpen = !0), T.type === "close" && (T.isClose = !0), T.nodes || (T.type = "text"), T.invalid = !0)
            });
            let _ = a[a.length - 1], x = _.nodes.indexOf(i);
            _.nodes.splice(x, 1, ...i.nodes)
          } while (a.length > 0);
          return R({type: "eos"}), s
        };
        Nt.exports = hn
      });
      var Gt = K((ds, Dt) => {
        "use strict";
        var Ut = ke(), dn = Ht(), gn = Tt(), mn = Pt(), V = (e, t = {}) => {
          let r = [];
          if (Array.isArray(e)) for (let n of e) {
            let s = V.create(n, t);
            Array.isArray(s) ? r.push(...s) : r.push(s)
          } else r = [].concat(V.create(e, t));
          return t && t.expand === !0 && t.nodupes === !0 && (r = [...new Set(r)]), r
        };
        V.parse = (e, t = {}) => mn(e, t);
        V.stringify = (e, t = {}) => typeof e == "string" ? Ut(V.parse(e, t), t) : Ut(e, t);
        V.compile = (e, t = {}) => (typeof e == "string" && (e = V.parse(e, t)), dn(e, t));
        V.expand = (e, t = {}) => {
          typeof e == "string" && (e = V.parse(e, t));
          let r = gn(e, t);
          return t.noempty === !0 && (r = r.filter(Boolean)), t.nodupes === !0 && (r = [...new Set(r)]), r
        };
        V.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? V.compile(e, t) : V.expand(e, t);
        Dt.exports = V
      });
      var ye = K((gs, qt) => {
        "use strict";
        var An = require("path"), ie = "\\\\/", Kt = `[^${ie}]`, ce = "\\.", Rn = "\\+", yn = "\\?", Le = "\\/",
          bn = "(?=.)", Wt = "[^/]", Ke = `(?:${Le}|$)`, jt = `(?:^|${Le})`, We = `${ce}{1,2}${Ke}`, _n = `(?!${ce})`,
          En = `(?!${jt}${We})`, xn = `(?!${ce}{0,1}${Ke})`, Cn = `(?!${We})`, wn = `[^.${Le}]`, Sn = `${Wt}*?`, Ft = {
            DOT_LITERAL: ce,
            PLUS_LITERAL: Rn,
            QMARK_LITERAL: yn,
            SLASH_LITERAL: Le,
            ONE_CHAR: bn,
            QMARK: Wt,
            END_ANCHOR: Ke,
            DOTS_SLASH: We,
            NO_DOT: _n,
            NO_DOTS: En,
            NO_DOT_SLASH: xn,
            NO_DOTS_SLASH: Cn,
            QMARK_NO_DOT: wn,
            STAR: Sn,
            START_ANCHOR: jt
          }, vn = Q(B({}, Ft), {
            SLASH_LITERAL: `[${ie}]`,
            QMARK: Kt,
            STAR: `${Kt}*?`,
            DOTS_SLASH: `${ce}{1,2}(?:[${ie}]|$)`,
            NO_DOT: `(?!${ce})`,
            NO_DOTS: `(?!(?:^|[${ie}])${ce}{1,2}(?:[${ie}]|$))`,
            NO_DOT_SLASH: `(?!${ce}{0,1}(?:[${ie}]|$))`,
            NO_DOTS_SLASH: `(?!${ce}{1,2}(?:[${ie}]|$))`,
            QMARK_NO_DOT: `[^.${ie}]`,
            START_ANCHOR: `(?:^|[${ie}])`,
            END_ANCHOR: `(?:[${ie}]|$)`
          }), Hn = {
            alnum: "a-zA-Z0-9",
            alpha: "a-zA-Z",
            ascii: "\\x00-\\x7F",
            blank: " \\t",
            cntrl: "\\x00-\\x1F\\x7F",
            digit: "0-9",
            graph: "\\x21-\\x7E",
            lower: "a-z",
            print: "\\x20-\\x7E ",
            punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
            space: " \\t\\r\\n\\v\\f",
            upper: "A-Z",
            word: "A-Za-z0-9_",
            xdigit: "A-Fa-f0-9"
          };
        qt.exports = {
          MAX_LENGTH: 1024 * 64,
          POSIX_REGEX_SOURCE: Hn,
          REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
          REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
          REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
          REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
          REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
          REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
          REPLACEMENTS: {"***": "*", "**/**": "**", "**/**/**": "**"},
          CHAR_0: 48,
          CHAR_9: 57,
          CHAR_UPPERCASE_A: 65,
          CHAR_LOWERCASE_A: 97,
          CHAR_UPPERCASE_Z: 90,
          CHAR_LOWERCASE_Z: 122,
          CHAR_LEFT_PARENTHESES: 40,
          CHAR_RIGHT_PARENTHESES: 41,
          CHAR_ASTERISK: 42,
          CHAR_AMPERSAND: 38,
          CHAR_AT: 64,
          CHAR_BACKWARD_SLASH: 92,
          CHAR_CARRIAGE_RETURN: 13,
          CHAR_CIRCUMFLEX_ACCENT: 94,
          CHAR_COLON: 58,
          CHAR_COMMA: 44,
          CHAR_DOT: 46,
          CHAR_DOUBLE_QUOTE: 34,
          CHAR_EQUAL: 61,
          CHAR_EXCLAMATION_MARK: 33,
          CHAR_FORM_FEED: 12,
          CHAR_FORWARD_SLASH: 47,
          CHAR_GRAVE_ACCENT: 96,
          CHAR_HASH: 35,
          CHAR_HYPHEN_MINUS: 45,
          CHAR_LEFT_ANGLE_BRACKET: 60,
          CHAR_LEFT_CURLY_BRACE: 123,
          CHAR_LEFT_SQUARE_BRACKET: 91,
          CHAR_LINE_FEED: 10,
          CHAR_NO_BREAK_SPACE: 160,
          CHAR_PERCENT: 37,
          CHAR_PLUS: 43,
          CHAR_QUESTION_MARK: 63,
          CHAR_RIGHT_ANGLE_BRACKET: 62,
          CHAR_RIGHT_CURLY_BRACE: 125,
          CHAR_RIGHT_SQUARE_BRACKET: 93,
          CHAR_SEMICOLON: 59,
          CHAR_SINGLE_QUOTE: 39,
          CHAR_SPACE: 32,
          CHAR_TAB: 9,
          CHAR_UNDERSCORE: 95,
          CHAR_VERTICAL_LINE: 124,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
          SEP: An.sep,
          extglobChars(e) {
            return {
              "!": {type: "negate", open: "(?:(?!(?:", close: `))${e.STAR})`},
              "?": {type: "qmark", open: "(?:", close: ")?"},
              "+": {type: "plus", open: "(?:", close: ")+"},
              "*": {type: "star", open: "(?:", close: ")*"},
              "@": {type: "at", open: "(?:", close: ")"}
            }
          },
          globChars(e) {
            return e === !0 ? vn : Ft
          }
        }
      });
      var be = K(Z => {
        "use strict";
        var $n = require("path"), kn = process.platform === "win32", {
          REGEX_BACKSLASH: Tn,
          REGEX_REMOVE_BACKSLASH: Ln,
          REGEX_SPECIAL_CHARS: On,
          REGEX_SPECIAL_CHARS_GLOBAL: Nn
        } = ye();
        Z.isObject = e => e !== null && typeof e == "object" && !Array.isArray(e);
        Z.hasRegexChars = e => On.test(e);
        Z.isRegexChar = e => e.length === 1 && Z.hasRegexChars(e);
        Z.escapeRegex = e => e.replace(Nn, "\\$1");
        Z.toPosixSlashes = e => e.replace(Tn, "/");
        Z.removeBackslashes = e => e.replace(Ln, t => t === "\\" ? "" : t);
        Z.supportsLookbehinds = () => {
          let e = process.version.slice(1).split(".").map(Number);
          return e.length === 3 && e[0] >= 9 || e[0] === 8 && e[1] >= 10
        };
        Z.isWindows = e => e && typeof e.windows == "boolean" ? e.windows : kn === !0 || $n.sep === "\\";
        Z.escapeLast = (e, t, r) => {
          let n = e.lastIndexOf(t, r);
          return n === -1 ? e : e[n - 1] === "\\" ? Z.escapeLast(e, t, n - 1) : `${e.slice(0, n)}\\${e.slice(n)}`
        };
        Z.removePrefix = (e, t = {}) => {
          let r = e;
          return r.startsWith("./") && (r = r.slice(2), t.prefix = "./"), r
        };
        Z.wrapOutput = (e, t = {}, r = {}) => {
          let n = r.contains ? "" : "^", s = r.contains ? "" : "$", a = `${n}(?:${e})${s}`;
          return t.negated === !0 && (a = `(?:^(?!${a}).*$)`), a
        }
      });
      var er = K((As, Qt) => {
        "use strict";
        var Xt = be(), {
          CHAR_ASTERISK: je,
          CHAR_AT: In,
          CHAR_BACKWARD_SLASH: _e,
          CHAR_COMMA: Bn,
          CHAR_DOT: Fe,
          CHAR_EXCLAMATION_MARK: Qe,
          CHAR_FORWARD_SLASH: Zt,
          CHAR_LEFT_CURLY_BRACE: Xe,
          CHAR_LEFT_PARENTHESES: Ze,
          CHAR_LEFT_SQUARE_BRACKET: Mn,
          CHAR_PLUS: Pn,
          CHAR_QUESTION_MARK: Yt,
          CHAR_RIGHT_CURLY_BRACE: Dn,
          CHAR_RIGHT_PARENTHESES: zt,
          CHAR_RIGHT_SQUARE_BRACKET: Un
        } = ye(), Vt = e => e === Zt || e === _e, Jt = e => {
          e.isPrefix !== !0 && (e.depth = e.isGlobstar ? Infinity : 1)
        }, Gn = (e, t) => {
          let r = t || {}, n = e.length - 1, s = r.parts === !0 || r.scanToEnd === !0, a = [], i = [], o = [], h = e,
            g = -1, f = 0, A = 0, p = !1, k = !1, y = !1, R = !1, _ = !1, x = !1, T = !1, O = !1, W = !1, G = !1,
            ne = 0, E, b, C = {value: "", depth: 0, isGlob: !1}, M = () => g >= n, l = () => h.charCodeAt(g + 1),
            H = () => (E = b, h.charCodeAt(++g));
          for (; g < n;) {
            b = H();
            let I;
            if (b === _e) {
              T = C.backslashes = !0, b = H(), b === Xe && (x = !0);
              continue
            }
            if (x === !0 || b === Xe) {
              for (ne++; M() !== !0 && (b = H());) {
                if (b === _e) {
                  T = C.backslashes = !0, H();
                  continue
                }
                if (b === Xe) {
                  ne++;
                  continue
                }
                if (x !== !0 && b === Fe && (b = H()) === Fe) {
                  if (p = C.isBrace = !0, y = C.isGlob = !0, G = !0, s === !0) continue;
                  break
                }
                if (x !== !0 && b === Bn) {
                  if (p = C.isBrace = !0, y = C.isGlob = !0, G = !0, s === !0) continue;
                  break
                }
                if (b === Dn && (ne--, ne === 0)) {
                  x = !1, p = C.isBrace = !0, G = !0;
                  break
                }
              }
              if (s === !0) continue;
              break
            }
            if (b === Zt) {
              if (a.push(g), i.push(C), C = {value: "", depth: 0, isGlob: !1}, G === !0) continue;
              if (E === Fe && g === f + 1) {
                f += 2;
                continue
              }
              A = g + 1;
              continue
            }
            if (r.noext !== !0 && (b === Pn || b === In || b === je || b === Yt || b === Qe) === !0 && l() === Ze) {
              if (y = C.isGlob = !0, R = C.isExtglob = !0, G = !0, b === Qe && g === f && (W = !0), s === !0) {
                for (; M() !== !0 && (b = H());) {
                  if (b === _e) {
                    T = C.backslashes = !0, b = H();
                    continue
                  }
                  if (b === zt) {
                    y = C.isGlob = !0, G = !0;
                    break
                  }
                }
                continue
              }
              break
            }
            if (b === je) {
              if (E === je && (_ = C.isGlobstar = !0), y = C.isGlob = !0, G = !0, s === !0) continue;
              break
            }
            if (b === Yt) {
              if (y = C.isGlob = !0, G = !0, s === !0) continue;
              break
            }
            if (b === Mn) {
              for (; M() !== !0 && (I = H());) {
                if (I === _e) {
                  T = C.backslashes = !0, H();
                  continue
                }
                if (I === Un) {
                  k = C.isBracket = !0, y = C.isGlob = !0, G = !0;
                  break
                }
              }
              if (s === !0) continue;
              break
            }
            if (r.nonegate !== !0 && b === Qe && g === f) {
              O = C.negated = !0, f++;
              continue
            }
            if (r.noparen !== !0 && b === Ze) {
              if (y = C.isGlob = !0, s === !0) {
                for (; M() !== !0 && (b = H());) {
                  if (b === Ze) {
                    T = C.backslashes = !0, b = H();
                    continue
                  }
                  if (b === zt) {
                    G = !0;
                    break
                  }
                }
                continue
              }
              break
            }
            if (y === !0) {
              if (G = !0, s === !0) continue;
              break
            }
          }
          r.noext === !0 && (R = !1, y = !1);
          let w = h, j = "", c = "";
          f > 0 && (j = h.slice(0, f), h = h.slice(f), A -= f), w && y === !0 && A > 0 ? (w = h.slice(0, A), c = h.slice(A)) : y === !0 ? (w = "", c = h) : w = h, w && w !== "" && w !== "/" && w !== h && Vt(w.charCodeAt(w.length - 1)) && (w = w.slice(0, -1)), r.unescape === !0 && (c && (c = Xt.removeBackslashes(c)), w && T === !0 && (w = Xt.removeBackslashes(w)));
          let u = {
            prefix: j,
            input: e,
            start: f,
            base: w,
            glob: c,
            isBrace: p,
            isBracket: k,
            isGlob: y,
            isExtglob: R,
            isGlobstar: _,
            negated: O,
            negatedExtglob: W
          };
          if (r.tokens === !0 && (u.maxDepth = 0, Vt(b) || i.push(C), u.tokens = i), r.parts === !0 || r.tokens === !0) {
            let I;
            for (let $ = 0; $ < a.length; $++) {
              let ee = I ? I + 1 : f, se = a[$], z = e.slice(ee, se);
              r.tokens && ($ === 0 && f !== 0 ? (i[$].isPrefix = !0, i[$].value = j) : i[$].value = z, Jt(i[$]), u.maxDepth += i[$].depth), ($ !== 0 || z !== "") && o.push(z), I = se
            }
            if (I && I + 1 < e.length) {
              let $ = e.slice(I + 1);
              o.push($), r.tokens && (i[i.length - 1].value = $, Jt(i[i.length - 1]), u.maxDepth += i[i.length - 1].depth)
            }
            u.slashes = a, u.parts = o
          }
          return u
        };
        Qt.exports = Gn
      });
      var sr = K((Rs, tr) => {
        "use strict";
        var Oe = ye(), J = be(), {
          MAX_LENGTH: Ne,
          POSIX_REGEX_SOURCE: qn,
          REGEX_NON_SPECIAL_CHARS: Kn,
          REGEX_SPECIAL_CHARS_BACKREF: Wn,
          REPLACEMENTS: rr
        } = Oe, jn = (e, t) => {
          if (typeof t.expandRange == "function") return t.expandRange(...e, t);
          e.sort();
          let r = `[${e.join("-")}]`;
          try {
            new RegExp(r)
          } catch (n) {
            return e.map(s => J.escapeRegex(s)).join("..")
          }
          return r
        }, de = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, nr = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          e = rr[e] || e;
          let r = B({}, t), n = typeof r.maxLength == "number" ? Math.min(Ne, r.maxLength) : Ne, s = e.length;
          if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`);
          let a = {type: "bos", value: "", output: r.prepend || ""}, i = [a], o = r.capture ? "" : "?:",
            h = J.isWindows(t), g = Oe.globChars(h), f = Oe.extglobChars(g), {
              DOT_LITERAL: A,
              PLUS_LITERAL: p,
              SLASH_LITERAL: k,
              ONE_CHAR: y,
              DOTS_SLASH: R,
              NO_DOT: _,
              NO_DOT_SLASH: x,
              NO_DOTS_SLASH: T,
              QMARK: O,
              QMARK_NO_DOT: W,
              STAR: G,
              START_ANCHOR: ne
            } = g, E = m => `(${o}(?:(?!${ne}${m.dot ? R : A}).)*?)`, b = r.dot ? "" : _, C = r.dot ? O : W,
            M = r.bash === !0 ? E(r) : G;
          r.capture && (M = `(${M})`), typeof r.noext == "boolean" && (r.noextglob = r.noext);
          let l = {
            input: e,
            index: -1,
            start: 0,
            dot: r.dot === !0,
            consumed: "",
            output: "",
            prefix: "",
            backtrack: !1,
            negated: !1,
            brackets: 0,
            braces: 0,
            parens: 0,
            quotes: 0,
            globstar: !1,
            tokens: i
          };
          e = J.removePrefix(e, l), s = e.length;
          let H = [], w = [], j = [], c = a, u, I = () => l.index === s - 1, $ = l.peek = (m = 1) => e[l.index + m],
            ee = l.advance = () => e[++l.index] || "", se = () => e.slice(l.index + 1), z = (m = "", L = 0) => {
              l.consumed += m, l.index += L
            }, Ce = m => {
              l.output += m.output != null ? m.output : m.value, z(m.value)
            }, xr = () => {
              let m = 1;
              for (; $() === "!" && ($(2) !== "(" || $(3) === "?");) ee(), l.start++, m++;
              return m % 2 == 0 ? !1 : (l.negated = !0, l.start++, !0)
            }, we = m => {
              l[m]++, j.push(m)
            }, ue = m => {
              l[m]--, j.pop()
            }, v = m => {
              if (c.type === "globstar") {
                let L = l.braces > 0 && (m.type === "comma" || m.type === "brace"),
                  d = m.extglob === !0 || H.length && (m.type === "pipe" || m.type === "paren");
                m.type !== "slash" && m.type !== "paren" && !L && !d && (l.output = l.output.slice(0, -c.output.length), c.type = "star", c.value = "*", c.output = M, l.output += c.output)
              }
              if (H.length && m.type !== "paren" && (H[H.length - 1].inner += m.value), (m.value || m.output) && Ce(m), c && c.type === "text" && m.type === "text") {
                c.value += m.value, c.output = (c.output || "") + m.value;
                return
              }
              m.prev = c, i.push(m), c = m
            }, Se = (m, L) => {
              let d = Q(B({}, f[L]), {conditions: 1, inner: ""});
              d.prev = c, d.parens = l.parens, d.output = l.output;
              let S = (r.capture ? "(" : "") + d.open;
              we("parens"), v({type: m, value: L, output: l.output ? "" : y}), v({
                type: "paren",
                extglob: !0,
                value: ee(),
                output: S
              }), H.push(d)
            }, Cr = m => {
              let L = m.close + (r.capture ? ")" : ""), d;
              if (m.type === "negate") {
                let S = M;
                m.inner && m.inner.length > 1 && m.inner.includes("/") && (S = E(r)), (S !== M || I() || /^\)+$/.test(se())) && (L = m.close = `)$))${S}`), m.inner.includes("*") && (d = se()) && /^\.[^\\/.]+$/.test(d) && (L = m.close = `)${d})${S})`), m.prev.type === "bos" && (l.negatedExtglob = !0)
              }
              v({type: "paren", extglob: !0, value: u, output: L}), ue("parens")
            };
          if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
            let m = !1,
              L = e.replace(Wn, (d, S, P, F, q, Me) => F === "\\" ? (m = !0, d) : F === "?" ? S ? S + F + (q ? O.repeat(q.length) : "") : Me === 0 ? C + (q ? O.repeat(q.length) : "") : O.repeat(P.length) : F === "." ? A.repeat(P.length) : F === "*" ? S ? S + F + (q ? M : "") : M : S ? d : `\\${d}`);
            return m === !0 && (r.unescape === !0 ? L = L.replace(/\\/g, "") : L = L.replace(/\\+/g, d => d.length % 2 == 0 ? "\\\\" : d ? "\\" : "")), L === e && r.contains === !0 ? (l.output = e, l) : (l.output = J.wrapOutput(L, l, t), l)
          }
          for (; !I();) {
            if (u = ee(), u === "\0") continue;
            if (u === "\\") {
              let d = $();
              if (d === "/" && r.bash !== !0 || d === "." || d === ";") continue;
              if (!d) {
                u += "\\", v({type: "text", value: u});
                continue
              }
              let S = /^\\+/.exec(se()), P = 0;
              if (S && S[0].length > 2 && (P = S[0].length, l.index += P, P % 2 != 0 && (u += "\\")), r.unescape === !0 ? u = ee() : u += ee(), l.brackets === 0) {
                v({type: "text", value: u});
                continue
              }
            }
            if (l.brackets > 0 && (u !== "]" || c.value === "[" || c.value === "[^")) {
              if (r.posix !== !1 && u === ":") {
                let d = c.value.slice(1);
                if (d.includes("[") && (c.posix = !0, d.includes(":"))) {
                  let S = c.value.lastIndexOf("["), P = c.value.slice(0, S), F = c.value.slice(S + 2), q = qn[F];
                  if (q) {
                    c.value = P + q, l.backtrack = !0, ee(), !a.output && i.indexOf(c) === 1 && (a.output = y);
                    continue
                  }
                }
              }
              (u === "[" && $() !== ":" || u === "-" && $() === "]") && (u = `\\${u}`), u === "]" && (c.value === "[" || c.value === "[^") && (u = `\\${u}`), r.posix === !0 && u === "!" && c.value === "[" && (u = "^"), c.value += u, Ce({value: u});
              continue
            }
            if (l.quotes === 1 && u !== '"') {
              u = J.escapeRegex(u), c.value += u, Ce({value: u});
              continue
            }
            if (u === '"') {
              l.quotes = l.quotes === 1 ? 0 : 1, r.keepQuotes === !0 && v({type: "text", value: u});
              continue
            }
            if (u === "(") {
              we("parens"), v({type: "paren", value: u});
              continue
            }
            if (u === ")") {
              if (l.parens === 0 && r.strictBrackets === !0) throw new SyntaxError(de("opening", "("));
              let d = H[H.length - 1];
              if (d && l.parens === d.parens + 1) {
                Cr(H.pop());
                continue
              }
              v({type: "paren", value: u, output: l.parens ? ")" : "\\)"}), ue("parens");
              continue
            }
            if (u === "[") {
              if (r.nobracket === !0 || !se().includes("]")) {
                if (r.nobracket !== !0 && r.strictBrackets === !0) throw new SyntaxError(de("closing", "]"));
                u = `\\${u}`
              } else we("brackets");
              v({type: "bracket", value: u});
              continue
            }
            if (u === "]") {
              if (r.nobracket === !0 || c && c.type === "bracket" && c.value.length === 1) {
                v({type: "text", value: u, output: `\\${u}`});
                continue
              }
              if (l.brackets === 0) {
                if (r.strictBrackets === !0) throw new SyntaxError(de("opening", "["));
                v({type: "text", value: u, output: `\\${u}`});
                continue
              }
              ue("brackets");
              let d = c.value.slice(1);
              if (c.posix !== !0 && d[0] === "^" && !d.includes("/") && (u = `/${u}`), c.value += u, Ce({value: u}), r.literalBrackets === !1 || J.hasRegexChars(d)) continue;
              let S = J.escapeRegex(c.value);
              if (l.output = l.output.slice(0, -c.value.length), r.literalBrackets === !0) {
                l.output += S, c.value = S;
                continue
              }
              c.value = `(${o}${S}|${c.value})`, l.output += c.value;
              continue
            }
            if (u === "{" && r.nobrace !== !0) {
              we("braces");
              let d = {
                type: "brace",
                value: u,
                output: "(",
                outputIndex: l.output.length,
                tokensIndex: l.tokens.length
              };
              w.push(d), v(d);
              continue
            }
            if (u === "}") {
              let d = w[w.length - 1];
              if (r.nobrace === !0 || !d) {
                v({type: "text", value: u, output: u});
                continue
              }
              let S = ")";
              if (d.dots === !0) {
                let P = i.slice(), F = [];
                for (let q = P.length - 1; q >= 0 && (i.pop(), P[q].type !== "brace"); q--) P[q].type !== "dots" && F.unshift(P[q].value);
                S = jn(F, r), l.backtrack = !0
              }
              if (d.comma !== !0 && d.dots !== !0) {
                let P = l.output.slice(0, d.outputIndex), F = l.tokens.slice(d.tokensIndex);
                d.value = d.output = "\\{", u = S = "\\}", l.output = P;
                for (let q of F) l.output += q.output || q.value
              }
              v({type: "brace", value: u, output: S}), ue("braces"), w.pop();
              continue
            }
            if (u === "|") {
              H.length > 0 && H[H.length - 1].conditions++, v({type: "text", value: u});
              continue
            }
            if (u === ",") {
              let d = u, S = w[w.length - 1];
              S && j[j.length - 1] === "braces" && (S.comma = !0, d = "|"), v({type: "comma", value: u, output: d});
              continue
            }
            if (u === "/") {
              if (c.type === "dot" && l.index === l.start + 1) {
                l.start = l.index + 1, l.consumed = "", l.output = "", i.pop(), c = a;
                continue
              }
              v({type: "slash", value: u, output: k});
              continue
            }
            if (u === ".") {
              if (l.braces > 0 && c.type === "dot") {
                c.value === "." && (c.output = A);
                let d = w[w.length - 1];
                c.type = "dots", c.output += u, c.value += u, d.dots = !0;
                continue
              }
              if (l.braces + l.parens === 0 && c.type !== "bos" && c.type !== "slash") {
                v({type: "text", value: u, output: A});
                continue
              }
              v({type: "dot", value: u, output: A});
              continue
            }
            if (u === "?") {
              if (!(c && c.value === "(") && r.noextglob !== !0 && $() === "(" && $(2) !== "?") {
                Se("qmark", u);
                continue
              }
              if (c && c.type === "paren") {
                let S = $(), P = u;
                if (S === "<" && !J.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
                (c.value === "(" && !/[!=<:]/.test(S) || S === "<" && !/<([!=]|\w+>)/.test(se())) && (P = `\\${u}`), v({
                  type: "text",
                  value: u,
                  output: P
                });
                continue
              }
              if (r.dot !== !0 && (c.type === "slash" || c.type === "bos")) {
                v({type: "qmark", value: u, output: W});
                continue
              }
              v({type: "qmark", value: u, output: O});
              continue
            }
            if (u === "!") {
              if (r.noextglob !== !0 && $() === "(" && ($(2) !== "?" || !/[!=<:]/.test($(3)))) {
                Se("negate", u);
                continue
              }
              if (r.nonegate !== !0 && l.index === 0) {
                xr();
                continue
              }
            }
            if (u === "+") {
              if (r.noextglob !== !0 && $() === "(" && $(2) !== "?") {
                Se("plus", u);
                continue
              }
              if (c && c.value === "(" || r.regex === !1) {
                v({type: "plus", value: u, output: p});
                continue
              }
              if (c && (c.type === "bracket" || c.type === "paren" || c.type === "brace") || l.parens > 0) {
                v({type: "plus", value: u});
                continue
              }
              v({type: "plus", value: p});
              continue
            }
            if (u === "@") {
              if (r.noextglob !== !0 && $() === "(" && $(2) !== "?") {
                v({type: "at", extglob: !0, value: u, output: ""});
                continue
              }
              v({type: "text", value: u});
              continue
            }
            if (u !== "*") {
              (u === "$" || u === "^") && (u = `\\${u}`);
              let d = Kn.exec(se());
              d && (u += d[0], l.index += d[0].length), v({type: "text", value: u});
              continue
            }
            if (c && (c.type === "globstar" || c.star === !0)) {
              c.type = "star", c.star = !0, c.value += u, c.output = M, l.backtrack = !0, l.globstar = !0, z(u);
              continue
            }
            let m = se();
            if (r.noextglob !== !0 && /^\([^?]/.test(m)) {
              Se("star", u);
              continue
            }
            if (c.type === "star") {
              if (r.noglobstar === !0) {
                z(u);
                continue
              }
              let d = c.prev, S = d.prev, P = d.type === "slash" || d.type === "bos",
                F = S && (S.type === "star" || S.type === "globstar");
              if (r.bash === !0 && (!P || m[0] && m[0] !== "/")) {
                v({type: "star", value: u, output: ""});
                continue
              }
              let q = l.braces > 0 && (d.type === "comma" || d.type === "brace"),
                Me = H.length && (d.type === "pipe" || d.type === "paren");
              if (!P && d.type !== "paren" && !q && !Me) {
                v({type: "star", value: u, output: ""});
                continue
              }
              for (; m.slice(0, 3) === "/**";) {
                let ve = e[l.index + 4];
                if (ve && ve !== "/") break;
                m = m.slice(3), z("/**", 3)
              }
              if (d.type === "bos" && I()) {
                c.type = "globstar", c.value += u, c.output = E(r), l.output = c.output, l.globstar = !0, z(u);
                continue
              }
              if (d.type === "slash" && d.prev.type !== "bos" && !F && I()) {
                l.output = l.output.slice(0, -(d.output + c.output).length), d.output = `(?:${d.output}`, c.type = "globstar", c.output = E(r) + (r.strictSlashes ? ")" : "|$)"), c.value += u, l.globstar = !0, l.output += d.output + c.output, z(u);
                continue
              }
              if (d.type === "slash" && d.prev.type !== "bos" && m[0] === "/") {
                let ve = m[1] !== void 0 ? "|$" : "";
                l.output = l.output.slice(0, -(d.output + c.output).length), d.output = `(?:${d.output}`, c.type = "globstar", c.output = `${E(r)}${k}|${k}${ve})`, c.value += u, l.output += d.output + c.output, l.globstar = !0, z(u + ee()), v({
                  type: "slash",
                  value: "/",
                  output: ""
                });
                continue
              }
              if (d.type === "bos" && m[0] === "/") {
                c.type = "globstar", c.value += u, c.output = `(?:^|${k}|${E(r)}${k})`, l.output = c.output, l.globstar = !0, z(u + ee()), v({
                  type: "slash",
                  value: "/",
                  output: ""
                });
                continue
              }
              l.output = l.output.slice(0, -c.output.length), c.type = "globstar", c.output = E(r), c.value += u, l.output += c.output, l.globstar = !0, z(u);
              continue
            }
            let L = {type: "star", value: u, output: M};
            if (r.bash === !0) {
              L.output = ".*?", (c.type === "bos" || c.type === "slash") && (L.output = b + L.output), v(L);
              continue
            }
            if (c && (c.type === "bracket" || c.type === "paren") && r.regex === !0) {
              L.output = u, v(L);
              continue
            }
            (l.index === l.start || c.type === "slash" || c.type === "dot") && (c.type === "dot" ? (l.output += x, c.output += x) : r.dot === !0 ? (l.output += T, c.output += T) : (l.output += b, c.output += b), $() !== "*" && (l.output += y, c.output += y)), v(L)
          }
          for (; l.brackets > 0;) {
            if (r.strictBrackets === !0) throw new SyntaxError(de("closing", "]"));
            l.output = J.escapeLast(l.output, "["), ue("brackets")
          }
          for (; l.parens > 0;) {
            if (r.strictBrackets === !0) throw new SyntaxError(de("closing", ")"));
            l.output = J.escapeLast(l.output, "("), ue("parens")
          }
          for (; l.braces > 0;) {
            if (r.strictBrackets === !0) throw new SyntaxError(de("closing", "}"));
            l.output = J.escapeLast(l.output, "{"), ue("braces")
          }
          if (r.strictSlashes !== !0 && (c.type === "star" || c.type === "bracket") && v({
            type: "maybe_slash",
            value: "",
            output: `${k}?`
          }), l.backtrack === !0) {
            l.output = "";
            for (let m of l.tokens) l.output += m.output != null ? m.output : m.value, m.suffix && (l.output += m.suffix)
          }
          return l
        };
        nr.fastpaths = (e, t) => {
          let r = B({}, t), n = typeof r.maxLength == "number" ? Math.min(Ne, r.maxLength) : Ne, s = e.length;
          if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`);
          e = rr[e] || e;
          let a = J.isWindows(t), {
              DOT_LITERAL: i,
              SLASH_LITERAL: o,
              ONE_CHAR: h,
              DOTS_SLASH: g,
              NO_DOT: f,
              NO_DOTS: A,
              NO_DOTS_SLASH: p,
              STAR: k,
              START_ANCHOR: y
            } = Oe.globChars(a), R = r.dot ? A : f, _ = r.dot ? p : f, x = r.capture ? "" : "?:",
            T = {negated: !1, prefix: ""}, O = r.bash === !0 ? ".*?" : k;
          r.capture && (O = `(${O})`);
          let W = b => b.noglobstar === !0 ? O : `(${x}(?:(?!${y}${b.dot ? g : i}).)*?)`, G = b => {
            switch (b) {
              case"*":
                return `${R}${h}${O}`;
              case".*":
                return `${i}${h}${O}`;
              case"*.*":
                return `${R}${O}${i}${h}${O}`;
              case"*/*":
                return `${R}${O}${o}${h}${_}${O}`;
              case"**":
                return R + W(r);
              case"**/*":
                return `(?:${R}${W(r)}${o})?${_}${h}${O}`;
              case"**/*.*":
                return `(?:${R}${W(r)}${o})?${_}${O}${i}${h}${O}`;
              case"**/.*":
                return `(?:${R}${W(r)}${o})?${i}${h}${O}`;
              default: {
                let C = /^(.*?)\.(\w+)$/.exec(b);
                if (!C) return;
                let M = G(C[1]);
                return M ? M + i + C[2] : void 0
              }
            }
          }, ne = J.removePrefix(e, T), E = G(ne);
          return E && r.strictSlashes !== !0 && (E += `${o}?`), E
        };
        tr.exports = nr
      });
      var ir = K((ys, ar) => {
        "use strict";
        var Fn = require("path"), Qn = er(), Ye = sr(), ze = be(), Xn = ye(),
          Zn = e => e && typeof e == "object" && !Array.isArray(e), D = (e, t, r = !1) => {
            if (Array.isArray(e)) {
              let f = e.map(p => D(p, t, r));
              return p => {
                for (let k of f) {
                  let y = k(p);
                  if (y) return y
                }
                return !1
              }
            }
            let n = Zn(e) && e.tokens && e.input;
            if (e === "" || typeof e != "string" && !n) throw new TypeError("Expected pattern to be a non-empty string");
            let s = t || {}, a = ze.isWindows(t), i = n ? D.compileRe(e, t) : D.makeRe(e, t, !1, !0), o = i.state;
            delete i.state;
            let h = () => !1;
            if (s.ignore) {
              let f = Q(B({}, t), {ignore: null, onMatch: null, onResult: null});
              h = D(s.ignore, f, r)
            }
            let g = (f, A = !1) => {
              let {isMatch: p, match: k, output: y} = D.test(f, i, t, {glob: e, posix: a}),
                R = {glob: e, state: o, regex: i, posix: a, input: f, output: y, match: k, isMatch: p};
              return typeof s.onResult == "function" && s.onResult(R), p === !1 ? (R.isMatch = !1, A ? R : !1) : h(f) ? (typeof s.onIgnore == "function" && s.onIgnore(R), R.isMatch = !1, A ? R : !1) : (typeof s.onMatch == "function" && s.onMatch(R), A ? R : !0)
            };
            return r && (g.state = o), g
          };
        D.test = (e, t, r, {glob: n, posix: s} = {}) => {
          if (typeof e != "string") throw new TypeError("Expected input to be a string");
          if (e === "") return {isMatch: !1, output: ""};
          let a = r || {}, i = a.format || (s ? ze.toPosixSlashes : null), o = e === n, h = o && i ? i(e) : e;
          return o === !1 && (h = i ? i(e) : e, o = h === n), (o === !1 || a.capture === !0) && (a.matchBase === !0 || a.basename === !0 ? o = D.matchBase(e, t, r, s) : o = t.exec(h)), {
            isMatch: Boolean(o),
            match: o,
            output: h
          }
        };
        D.matchBase = (e, t, r, n = ze.isWindows(r)) => (t instanceof RegExp ? t : D.makeRe(t, r)).test(Fn.basename(e));
        D.isMatch = (e, t, r) => D(t, r)(e);
        D.parse = (e, t) => Array.isArray(e) ? e.map(r => D.parse(r, t)) : Ye(e, Q(B({}, t), {fastpaths: !1}));
        D.scan = (e, t) => Qn(e, t);
        D.compileRe = (e, t, r = !1, n = !1) => {
          if (r === !0) return e.output;
          let s = t || {}, a = s.contains ? "" : "^", i = s.contains ? "" : "$", o = `${a}(?:${e.output})${i}`;
          e && e.negated === !0 && (o = `^(?!${o}).*$`);
          let h = D.toRegex(o, t);
          return n === !0 && (h.state = e), h
        };
        D.makeRe = (e, t = {}, r = !1, n = !1) => {
          if (!e || typeof e != "string") throw new TypeError("Expected a non-empty string");
          let s = {negated: !1, fastpaths: !0};
          return t.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (s.output = Ye.fastpaths(e, t)), s.output || (s = Ye(e, t)), D.compileRe(s, t, r, n)
        };
        D.toRegex = (e, t) => {
          try {
            let r = t || {};
            return new RegExp(e, r.flags || (r.nocase ? "i" : ""))
          } catch (r) {
            if (t && t.debug === !0) throw r;
            return /$^/
          }
        };
        D.constants = Xn;
        ar.exports = D
      });
      var cr = K((bs, or) => {
        "use strict";
        or.exports = ir()
      });
      var hr = K((_s, ur) => {
        "use strict";
        var lr = require("util"), pr = Gt(), oe = cr(), Ve = be(), fr = e => e === "" || e === "./", N = (e, t, r) => {
          t = [].concat(t), e = [].concat(e);
          let n = new Set, s = new Set, a = new Set, i = 0, o = f => {
            a.add(f.output), r && r.onResult && r.onResult(f)
          };
          for (let f = 0; f < t.length; f++) {
            let A = oe(String(t[f]), Q(B({}, r), {onResult: o}), !0), p = A.state.negated || A.state.negatedExtglob;
            p && i++;
            for (let k of e) {
              let y = A(k, !0);
              !(p ? !y.isMatch : y.isMatch) || (p ? n.add(y.output) : (n.delete(y.output), s.add(y.output)))
            }
          }
          let g = (i === t.length ? [...a] : [...s]).filter(f => !n.has(f));
          if (r && g.length === 0) {
            if (r.failglob === !0) throw new Error(`No matches found for "${t.join(", ")}"`);
            if (r.nonull === !0 || r.nullglob === !0) return r.unescape ? t.map(f => f.replace(/\\/g, "")) : t
          }
          return g
        };
        N.match = N;
        N.matcher = (e, t) => oe(e, t);
        N.isMatch = (e, t, r) => oe(t, r)(e);
        N.any = N.isMatch;
        N.not = (e, t, r = {}) => {
          t = [].concat(t).map(String);
          let n = new Set, s = [], a = o => {
            r.onResult && r.onResult(o), s.push(o.output)
          }, i = N(e, t, Q(B({}, r), {onResult: a}));
          for (let o of s) i.includes(o) || n.add(o);
          return [...n]
        };
        N.contains = (e, t, r) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          if (Array.isArray(t)) return t.some(n => N.contains(e, n, r));
          if (typeof t == "string") {
            if (fr(e) || fr(t)) return !1;
            if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t)) return !0
          }
          return N.isMatch(e, t, Q(B({}, r), {contains: !0}))
        };
        N.matchKeys = (e, t, r) => {
          if (!Ve.isObject(e)) throw new TypeError("Expected the first argument to be an object");
          let n = N(Object.keys(e), t, r), s = {};
          for (let a of n) s[a] = e[a];
          return s
        };
        N.some = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = oe(String(s), r);
            if (n.some(i => a(i))) return !0
          }
          return !1
        };
        N.every = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = oe(String(s), r);
            if (!n.every(i => a(i))) return !1
          }
          return !0
        };
        N.all = (e, t, r) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          return [].concat(t).every(n => oe(n, r)(e))
        };
        N.capture = (e, t, r) => {
          let n = Ve.isWindows(r),
            a = oe.makeRe(String(e), Q(B({}, r), {capture: !0})).exec(n ? Ve.toPosixSlashes(t) : t);
          if (a) return a.slice(1).map(i => i === void 0 ? "" : i)
        };
        N.makeRe = (...e) => oe.makeRe(...e);
        N.scan = (...e) => oe.scan(...e);
        N.parse = (e, t) => {
          let r = [];
          for (let n of [].concat(e || [])) for (let s of pr(String(n), t)) r.push(oe.parse(s, t));
          return r
        };
        N.braces = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return t && t.nobrace === !0 || !/\{.*\}/.test(e) ? [e] : pr(e, t)
        };
        N.braceExpand = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return N.braces(e, Q(B({}, t), {expand: !0}))
        };
        ur.exports = N
      });
      var gr = K((Es, dr) => {
        "use strict";
        dr.exports = (e, ...t) => new Promise(r => {
          r(e(...t))
        })
      });
      var Ar = K((xs, Je) => {
        "use strict";
        var Yn = gr(), mr = e => {
          if (e < 1) throw new TypeError("Expected `concurrency` to be a number from 1 and up");
          let t = [], r = 0, n = () => {
            r--, t.length > 0 && t.shift()()
          }, s = (o, h, ...g) => {
            r++;
            let f = Yn(o, ...g);
            h(f), f.then(n, n)
          }, a = (o, h, ...g) => {
            r < e ? s(o, h, ...g) : t.push(s.bind(null, o, h, ...g))
          }, i = (o, ...h) => new Promise(g => a(o, g, ...h));
          return Object.defineProperties(i, {activeCount: {get: () => r}, pendingCount: {get: () => t.length}}), i
        };
        Je.exports = mr;
        Je.exports.default = mr
      });
      var Vn = {};
      Or(Vn, {default: () => es});
      var He = X(require("@yarnpkg/cli")), ae = X(require("@yarnpkg/core")), nt = X(require("@yarnpkg/core")),
        le = X(require("clipanion")), Ae = class extends He.BaseCommand {
          constructor() {
            super(...arguments);
            this.json = le.Option.Boolean("--json", !1, {description: "Format the output as an NDJSON stream"});
            this.production = le.Option.Boolean("--production", !1, {description: "Only install regular dependencies by omitting dev dependencies"});
            this.all = le.Option.Boolean("-A,--all", !1, {description: "Install the entire project"});
            this.workspaces = le.Option.Rest()
          }

          async execute() {
            let t = await ae.Configuration.find(this.context.cwd, this.context.plugins), {
              project: r,
              workspace: n
            } = await ae.Project.find(t, this.context.cwd), s = await ae.Cache.find(t);
            await r.restoreInstallState({restoreResolutions: !1});
            let a;
            if (this.all) a = new Set(r.workspaces); else if (this.workspaces.length === 0) {
              if (!n) throw new He.WorkspaceRequiredError(r.cwd, this.context.cwd);
              a = new Set([n])
            } else a = new Set(this.workspaces.map(o => r.getWorkspaceByIdent(nt.structUtils.parseIdent(o))));
            for (let o of a) for (let h of this.production ? ["dependencies"] : ae.Manifest.hardDependencies) for (let g of o.manifest.getForScope(h).values()) {
              let f = r.tryWorkspaceByDescriptor(g);
              f !== null && a.add(f)
            }
            for (let o of r.workspaces) a.has(o) ? this.production && o.manifest.devDependencies.clear() : (o.manifest.installConfig = o.manifest.installConfig || {}, o.manifest.installConfig.selfReferences = !1, o.manifest.dependencies.clear(), o.manifest.devDependencies.clear(), o.manifest.peerDependencies.clear(), o.manifest.scripts.clear());
            return (await ae.StreamReport.start({
              configuration: t,
              json: this.json,
              stdout: this.context.stdout,
              includeLogs: !0
            }, async o => {
              await r.install({cache: s, report: o, persistProject: !1})
            })).exitCode()
          }
        };
      Ae.paths = [["workspaces", "focus"]], Ae.usage = le.Command.Usage({
        category: "Workspace-related commands",
        description: "install a single workspace and its dependencies",
        details: "\n      This command will run an install as if the specified workspaces (and all other workspaces they depend on) were the only ones in the project. If no workspaces are explicitly listed, the active one will be assumed.\n\n      Note that this command is only very moderately useful when using zero-installs, since the cache will contain all the packages anyway - meaning that the only difference between a full install and a focused install would just be a few extra lines in the `.pnp.cjs` file, at the cost of introducing an extra complexity.\n\n      If the `-A,--all` flag is set, the entire project will be installed. Combine with `--production` to replicate the old `yarn install --production`.\n    "
      });
      var st = Ae;
      var Ie = X(require("@yarnpkg/cli")), ge = X(require("@yarnpkg/core")), Ee = X(require("@yarnpkg/core")),
        Y = X(require("@yarnpkg/core")), Rr = X(require("@yarnpkg/plugin-git")), U = X(require("clipanion")),
        Be = X(hr()), yr = X(require("os")), br = X(Ar()), re = X(require("typanion")),
        xe = class extends Ie.BaseCommand {
          constructor() {
            super(...arguments);
            this.recursive = U.Option.Boolean("-R,--recursive", !1, {description: "Find packages via dependencies/devDependencies instead of using the workspaces field"});
            this.from = U.Option.Array("--from", [], {description: "An array of glob pattern idents from which to base any recursion"});
            this.all = U.Option.Boolean("-A,--all", !1, {description: "Run the command on all workspaces of a project"});
            this.verbose = U.Option.Boolean("-v,--verbose", !1, {description: "Prefix each output line with the name of the originating workspace"});
            this.parallel = U.Option.Boolean("-p,--parallel", !1, {description: "Run the commands in parallel"});
            this.interlaced = U.Option.Boolean("-i,--interlaced", !1, {description: "Print the output of commands in real-time instead of buffering it"});
            this.jobs = U.Option.String("-j,--jobs", {
              description: "The maximum number of parallel tasks that the execution will be limited to; or `unlimited`",
              validator: re.isOneOf([re.isEnum(["unlimited"]), re.applyCascade(re.isNumber(), [re.isInteger(), re.isAtLeast(1)])])
            });
            this.topological = U.Option.Boolean("-t,--topological", !1, {description: "Run the command after all workspaces it depends on (regular) have finished"});
            this.topologicalDev = U.Option.Boolean("--topological-dev", !1, {description: "Run the command after all workspaces it depends on (regular + dev) have finished"});
            this.include = U.Option.Array("--include", [], {description: "An array of glob pattern idents; only matching workspaces will be traversed"});
            this.exclude = U.Option.Array("--exclude", [], {description: "An array of glob pattern idents; matching workspaces won't be traversed"});
            this.publicOnly = U.Option.Boolean("--no-private", {description: "Avoid running the command on private workspaces"});
            this.since = U.Option.String("--since", {
              description: "Only include workspaces that have been changed since the specified ref.",
              tolerateBoolean: !0
            });
            this.commandName = U.Option.String();
            this.args = U.Option.Proxy()
          }

          async execute() {
            let t = await ge.Configuration.find(this.context.cwd, this.context.plugins), {
              project: r,
              workspace: n
            } = await ge.Project.find(t, this.context.cwd);
            if (!this.all && !n) throw new Ie.WorkspaceRequiredError(r.cwd, this.context.cwd);
            await r.restoreInstallState();
            let s = this.cli.process([this.commandName, ...this.args]),
              a = s.path.length === 1 && s.path[0] === "run" && typeof s.scriptName != "undefined" ? s.scriptName : null;
            if (s.path.length === 0) throw new U.UsageError("Invalid subcommand name for iteration - use the 'run' keyword if you wish to execute a script");
            let i = this.all ? r.topLevelWorkspace : n,
              o = this.since ? Array.from(await Rr.gitUtils.fetchChangedWorkspaces({
                ref: this.since,
                project: r
              })) : [i, ...this.from.length > 0 ? i.getRecursiveWorkspaceChildren() : []],
              h = E => Be.default.isMatch(Y.structUtils.stringifyIdent(E.locator), this.from),
              g = this.from.length > 0 ? o.filter(h) : o,
              f = new Set([...g, ...g.map(E => [...this.recursive ? this.since ? E.getRecursiveWorkspaceDependents() : E.getRecursiveWorkspaceDependencies() : E.getRecursiveWorkspaceChildren()]).flat()]),
              A = [], p = !1;
            if (a == null ? void 0 : a.includes(":")) {
              for (let E of r.workspaces) if (E.manifest.scripts.has(a) && (p = !p, p === !1)) break
            }
            for (let E of f) a && !E.manifest.scripts.has(a) && !p && !(await ge.scriptUtils.getWorkspaceAccessibleBinaries(E)).has(a) || a === process.env.npm_lifecycle_event && E.cwd === n.cwd || this.include.length > 0 && !Be.default.isMatch(Y.structUtils.stringifyIdent(E.locator), this.include) || this.exclude.length > 0 && Be.default.isMatch(Y.structUtils.stringifyIdent(E.locator), this.exclude) || this.publicOnly && E.manifest.private === !0 || A.push(E);
            let k = this.parallel ? this.jobs === "unlimited" ? Infinity : this.jobs || Math.max(1, (0, yr.cpus)().length / 2) : 1,
              y = k === 1 ? !1 : this.parallel, R = y ? this.interlaced : !0, _ = (0, br.default)(k), x = new Map,
              T = new Set, O = 0, W = null, G = !1,
              ne = await Ee.StreamReport.start({configuration: t, stdout: this.context.stdout}, async E => {
                let b = async (C, {commandIndex: M}) => {
                  if (G) return -1;
                  !y && this.verbose && M > 1 && E.reportSeparator();
                  let l = zn(C, {configuration: t, verbose: this.verbose, commandIndex: M}), [H, w] = _r(E, {
                    prefix: l,
                    interlaced: R
                  }), [j, c] = _r(E, {prefix: l, interlaced: R});
                  try {
                    this.verbose && E.reportInfo(null, `${l} Process started`);
                    let u = Date.now(),
                      I = await this.cli.run([this.commandName, ...this.args], {cwd: C.cwd, stdout: H, stderr: j}) || 0;
                    H.end(), j.end(), await w, await c;
                    let $ = Date.now();
                    if (this.verbose) {
                      let ee = t.get("enableTimers") ? `, completed in ${Y.formatUtils.pretty(t, $ - u, Y.formatUtils.Type.DURATION)}` : "";
                      E.reportInfo(null, `${l} Process exited (exit code ${I})${ee}`)
                    }
                    return I === 130 && (G = !0, W = I), I
                  } catch (u) {
                    throw H.end(), j.end(), await w, await c, u
                  }
                };
                for (let C of A) x.set(C.anchoredLocator.locatorHash, C);
                for (; x.size > 0 && !E.hasErrors();) {
                  let C = [];
                  for (let [H, w] of x) {
                    if (T.has(w.anchoredDescriptor.descriptorHash)) continue;
                    let j = !0;
                    if (this.topological || this.topologicalDev) {
                      let c = this.topologicalDev ? new Map([...w.manifest.dependencies, ...w.manifest.devDependencies]) : w.manifest.dependencies;
                      for (let u of c.values()) {
                        let I = r.tryWorkspaceByDescriptor(u);
                        if (j = I === null || !x.has(I.anchoredLocator.locatorHash), !j) break
                      }
                    }
                    if (!!j && (T.add(w.anchoredDescriptor.descriptorHash), C.push(_(async () => {
                      let c = await b(w, {commandIndex: ++O});
                      return x.delete(H), T.delete(w.anchoredDescriptor.descriptorHash), c
                    })), !y)) break
                  }
                  if (C.length === 0) {
                    let H = Array.from(x.values()).map(w => Y.structUtils.prettyLocator(t, w.anchoredLocator)).join(", ");
                    E.reportError(Ee.MessageName.CYCLIC_DEPENDENCIES, `Dependency cycle detected (${H})`);
                    return
                  }
                  let l = (await Promise.all(C)).find(H => H !== 0);
                  W === null && (W = typeof l != "undefined" ? 1 : W), (this.topological || this.topologicalDev) && typeof l != "undefined" && E.reportError(Ee.MessageName.UNNAMED, "The command failed for workspaces that are depended upon by other workspaces; can't satisfy the dependency graph")
                }
              });
            return W !== null ? W : ne.exitCode()
          }
        };
      xe.paths = [["workspaces", "foreach"]], xe.usage = U.Command.Usage({
        category: "Workspace-related commands",
        description: "run a command on all workspaces",
        details: "\n      This command will run a given sub-command on current and all its descendant workspaces. Various flags can alter the exact behavior of the command:\n\n      - If `-p,--parallel` is set, the commands will be ran in parallel; they'll by default be limited to a number of parallel tasks roughly equal to half your core number, but that can be overridden via `-j,--jobs`, or disabled by setting `-j unlimited`.\n\n      - If `-p,--parallel` and `-i,--interlaced` are both set, Yarn will print the lines from the output as it receives them. If `-i,--interlaced` wasn't set, it would instead buffer the output from each process and print the resulting buffers only after their source processes have exited.\n\n      - If `-t,--topological` is set, Yarn will only run the command after all workspaces that it depends on through the `dependencies` field have successfully finished executing. If `--topological-dev` is set, both the `dependencies` and `devDependencies` fields will be considered when figuring out the wait points.\n\n      - If `-A,--all` is set, Yarn will run the command on all the workspaces of a project. By default yarn runs the command only on current and all its descendant workspaces.\n\n      - If `-R,--recursive` is set, Yarn will find workspaces to run the command on by recursively evaluating `dependencies` and `devDependencies` fields, instead of looking at the `workspaces` fields.\n\n      - If `--from` is set, Yarn will use the packages matching the 'from' glob as the starting point for any recursive search.\n\n      - If `--since` is set, Yarn will only run the command on workspaces that have been modified since the specified ref. By default Yarn will use the refs specified by the `changesetBaseRefs` configuration option.\n\n      - The command may apply to only some workspaces through the use of `--include` which acts as a whitelist. The `--exclude` flag will do the opposite and will be a list of packages that mustn't execute the script. Both flags accept glob patterns (if valid Idents and supported by [micromatch](https://github.com/micromatch/micromatch)). Make sure to escape the patterns, to prevent your own shell from trying to expand them.\n\n      Adding the `-v,--verbose` flag will cause Yarn to print more information; in particular the name of the workspace that generated the output will be printed at the front of each line.\n\n      If the command is `run` and the script being run does not exist the child workspace will be skipped without error.\n    ",
        examples: [["Publish current and all descendant packages", "yarn workspaces foreach npm publish --tolerate-republish"], ["Run build script on current and all descendant packages", "yarn workspaces foreach run build"], ["Run build script on current and all descendant packages in parallel, building package dependencies first", "yarn workspaces foreach -pt run build"], ["Run build script on several packages and all their dependencies, building dependencies first", "yarn workspaces foreach -ptR --from '{workspace-a,workspace-b}' run build"]]
      });
      var Er = xe;

      function _r(e, {prefix: t, interlaced: r}) {
        let n = e.createStreamReporter(t), s = new Y.miscUtils.DefaultStream;
        s.pipe(n, {end: !1}), s.on("finish", () => {
          n.end()
        });
        let a = new Promise(o => {
          n.on("finish", () => {
            o(s.active)
          })
        });
        if (r) return [s, a];
        let i = new Y.miscUtils.BufferStream;
        return i.pipe(s, {end: !1}), i.on("finish", () => {
          s.end()
        }), [i, a]
      }

      function zn(e, {configuration: t, commandIndex: r, verbose: n}) {
        if (!n) return null;
        let s = Y.structUtils.convertToIdent(e.locator), i = `[${Y.structUtils.stringifyIdent(s)}]:`,
          o = ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D", "#CCE2A3"], h = o[r % o.length];
        return Y.formatUtils.pretty(t, i, h)
      }

      var Jn = {commands: [st, Er]}, es = Jn;
      return Vn;
    })();
    /*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
    /*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    /*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    return plugin;
  }
};