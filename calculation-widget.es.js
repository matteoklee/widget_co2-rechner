import * as Or from "vue";
import { openBlock as A, createElementBlock as V, normalizeClass as ne, unref as y, renderSlot as I, computed as B, ref as T, shallowRef as po, watch as J, getCurrentScope as Xt, onScopeDispose as Yt, shallowReadonly as st, getCurrentInstance as Le, toRef as qs, camelize as mo, defineComponent as $, Comment as $s, mergeProps as G, cloneVNode as Vs, h as Ae, toRefs as Te, reactive as Jn, watchEffect as de, markRaw as Xn, createBlock as N, withCtx as _, nextTick as ce, createCommentVNode as se, Fragment as Re, renderList as Et, resolveDynamicComponent as pt, onMounted as Ce, createVNode as O, withModifiers as we, normalizeProps as Yn, guardReactiveProps as Zn, Teleport as Qn, onBeforeUnmount as er, createTextVNode as Q, withKeys as ho, effectScope as Zt, toHandlerKey as js, onUnmounted as tr, withDirectives as yo, createElementVNode as L, isRef as dt, vModelSelect as zs, inject as nr, provide as go, customRef as Us, onBeforeUpdate as Hs, onUpdated as Ws, normalizeStyle as Qt, mergeDefaults as Gs, watchPostEffect as Ks, readonly as Js, toValue as ue, vModelText as Xs, resolveComponent as W, toDisplayString as pe, hasInjectionContext as Ys, isReactive as vo, toRaw as Zs, createApp as Qs } from "vue";
function bo(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = bo(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function wo() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = bo(e)) && (r && (r += " "), r += t);
  return r;
}
const rr = "-", ea = (e) => {
  const t = na(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(rr);
      return i[0] === "" && i.length !== 1 && i.shift(), xo(i, t) || ta(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const d = n[a] || [];
      return i && r[a] ? [...d, ...r[a]] : d;
    }
  };
}, xo = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? xo(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(rr);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, Tr = /^\[(.+)\]$/, ta = (e) => {
  if (Tr.test(e)) {
    const t = Tr.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, na = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return oa(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    In(a, r, s, t);
  }), r;
}, In = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Pr(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (ra(o)) {
        In(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      In(a, Pr(t, s), n, r);
    });
  });
}, Pr = (e, t) => {
  let n = e;
  return t.split(rr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, ra = (e) => e.isThemeGetter, oa = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, sa = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (s, a) => {
    n.set(s, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = n.get(s);
      if (a !== void 0)
        return a;
      if ((a = r.get(s)) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      n.has(s) ? n.set(s, a) : o(s, a);
    }
  };
}, So = "!", aa = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const d = [];
    let c = 0, l = 0, u;
    for (let h = 0; h < i.length; h++) {
      let v = i[h];
      if (c === 0) {
        if (v === o && (r || i.slice(h, h + s) === t)) {
          d.push(i.slice(l, h)), l = h + s;
          continue;
        }
        if (v === "/") {
          u = h;
          continue;
        }
      }
      v === "[" ? c++ : v === "]" && c--;
    }
    const f = d.length === 0 ? i : i.substring(l), p = f.startsWith(So), m = p ? f.substring(1) : f, g = u && u > l ? u - l : void 0;
    return {
      modifiers: d,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, ia = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, la = (e) => ({
  cache: sa(e.cacheSize),
  parseClassName: aa(e),
  ...ea(e)
}), ua = /\s+/, ca = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(ua);
  let i = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const c = a[d], {
      modifiers: l,
      hasImportantModifier: u,
      baseClassName: f,
      maybePostfixModifierPosition: p
    } = n(c);
    let m = !!p, g = r(m ? f.substring(0, p) : f);
    if (!g) {
      if (!m) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(f), !g) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      m = !1;
    }
    const h = ia(l).join(":"), v = u ? h + So : h, x = v + g;
    if (s.includes(x))
      continue;
    s.push(x);
    const b = o(g, m);
    for (let C = 0; C < b.length; ++C) {
      const S = b[C];
      s.push(v + S);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function da() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Co(t)) && (r && (r += " "), r += n);
  return r;
}
const Co = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Co(e[r])) && (n && (n += " "), n += t);
  return n;
};
function fa(e, ...t) {
  let n, r, o, s = a;
  function a(d) {
    const c = t.reduce((l, u) => u(l), e());
    return n = la(c), r = n.cache.get, o = n.cache.set, s = i, i(d);
  }
  function i(d) {
    const c = r(d);
    if (c)
      return c;
    const l = ca(d, n);
    return o(d, l), l;
  }
  return function() {
    return s(da.apply(null, arguments));
  };
}
const K = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, _o = /^\[(?:([a-z-]+):)?(.+)\]$/i, pa = /^\d+\/\d+$/, ma = /* @__PURE__ */ new Set(["px", "full", "screen"]), ha = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ya = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ga = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, va = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, ba = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Me = (e) => ut(e) || ma.has(e) || pa.test(e), qe = (e) => mt(e, "length", ka), ut = (e) => !!e && !Number.isNaN(Number(e)), bn = (e) => mt(e, "number", ut), xt = (e) => !!e && Number.isInteger(Number(e)), wa = (e) => e.endsWith("%") && ut(e.slice(0, -1)), q = (e) => _o.test(e), $e = (e) => ha.test(e), xa = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Sa = (e) => mt(e, xa, Eo), Ca = (e) => mt(e, "position", Eo), _a = /* @__PURE__ */ new Set(["image", "url"]), Ea = (e) => mt(e, _a, Oa), Aa = (e) => mt(e, "", Ra), St = () => !0, mt = (e, t, n) => {
  const r = _o.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ka = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ya.test(e) && !ga.test(e)
), Eo = () => !1, Ra = (e) => va.test(e), Oa = (e) => ba.test(e), Ta = () => {
  const e = K("colors"), t = K("spacing"), n = K("blur"), r = K("brightness"), o = K("borderColor"), s = K("borderRadius"), a = K("borderSpacing"), i = K("borderWidth"), d = K("contrast"), c = K("grayscale"), l = K("hueRotate"), u = K("invert"), f = K("gap"), p = K("gradientColorStops"), m = K("gradientColorStopPositions"), g = K("inset"), h = K("margin"), v = K("opacity"), x = K("padding"), b = K("saturate"), C = K("scale"), S = K("sepia"), k = K("skew"), E = K("space"), R = K("translate"), P = () => ["auto", "contain", "none"], M = () => ["auto", "hidden", "clip", "visible", "scroll"], j = () => ["auto", q, t], D = () => [q, t], Z = () => ["", Me, qe], z = () => ["auto", ut, q], ie = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], U = () => ["solid", "dashed", "dotted", "double", "none"], H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], le = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], oe = () => ["", "0", q], ot = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], fe = () => [ut, q];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [St],
      spacing: [Me, qe],
      blur: ["none", "", $e, q],
      brightness: fe(),
      borderColor: [e],
      borderRadius: ["none", "", "full", $e, q],
      borderSpacing: D(),
      borderWidth: Z(),
      contrast: fe(),
      grayscale: oe(),
      hueRotate: fe(),
      invert: oe(),
      gap: D(),
      gradientColorStops: [e],
      gradientColorStopPositions: [wa, qe],
      inset: j(),
      margin: j(),
      opacity: fe(),
      padding: D(),
      saturate: fe(),
      scale: fe(),
      sepia: oe(),
      skew: fe(),
      space: D(),
      translate: D()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", q]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [$e]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ot()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ot()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...ie(), q]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: P()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": P()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": P()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", xt, q]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: j()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: oe()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: oe()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", xt, q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [St]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", xt, q]
        }, q]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": z()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": z()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [St]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [xt, q]
        }, q]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": z()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": z()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", q]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", q]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...le()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...le(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...le(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [h]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [h]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [h]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [h]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [h]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [h]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [h]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [h]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [h]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [E]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [E]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", q, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [q, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [q, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [$e]
        }, $e]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [q, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [q, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", $e, qe]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", bn]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [St]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", ut, bn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Me, q]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", q]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", q]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [v]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [v]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...U(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Me, qe]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Me, q]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: D()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", q]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", q]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [v]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...ie(), Ca]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Sa]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ea]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [m]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [p]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [v]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...U(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [v]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: U()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...U()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Me, q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Me, qe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: Z()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [v]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Me, qe]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", $e, Aa]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [St]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [v]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...H(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": H()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [d]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", $e, q]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [l]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [u]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [b]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [S]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [d]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [l]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [u]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [v]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [b]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", q]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: fe()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: fe()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", q]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [C]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [C]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [C]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [xt, q]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [R]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [R]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [k]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [k]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", q]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", q]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": D()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": D()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": D()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": D()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": D()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": D()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": D()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": D()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": D()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": D()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": D()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": D()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": D()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": D()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": D()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": D()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": D()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": D()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", q]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Me, qe, bn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Pa = /* @__PURE__ */ fa(Ta);
function Y(...e) {
  return Pa(wo(e));
}
const Ao = {
  __name: "Card",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(
        y(Y)(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          t.class
        )
      )
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, Ba = {
  __name: "CardHeader",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(y(Y)("flex flex-col gap-y-1.5 p-6", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, Ma = {
  __name: "CardTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("h3", {
      class: ne(
        y(Y)("text-2xl font-semibold leading-none tracking-tight", t.class)
      )
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, Ia = {
  __name: "CardDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("p", {
      class: ne(y(Y)("text-sm text-muted-foreground", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, ko = {
  __name: "CardContent",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(y(Y)("p-6 pt-0", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, Na = ["top", "right", "bottom", "left"], ze = Math.min, ye = Math.max, Ut = Math.round, Dt = Math.floor, ke = (e) => ({
  x: e,
  y: e
}), Da = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, La = {
  start: "end",
  end: "start"
};
function Nn(e, t, n) {
  return ye(e, ze(t, n));
}
function Ne(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function De(e) {
  return e.split("-")[0];
}
function ht(e) {
  return e.split("-")[1];
}
function or(e) {
  return e === "x" ? "y" : "x";
}
function sr(e) {
  return e === "y" ? "height" : "width";
}
function Ue(e) {
  return ["top", "bottom"].includes(De(e)) ? "y" : "x";
}
function ar(e) {
  return or(Ue(e));
}
function Fa(e, t, n) {
  n === void 0 && (n = !1);
  const r = ht(e), o = ar(e), s = sr(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Ht(a)), [a, Ht(a)];
}
function qa(e) {
  const t = Ht(e);
  return [Dn(e), t, Dn(t)];
}
function Dn(e) {
  return e.replace(/start|end/g, (t) => La[t]);
}
function $a(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], s = ["top", "bottom"], a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? s : a;
    default:
      return [];
  }
}
function Va(e, t, n, r) {
  const o = ht(e);
  let s = $a(De(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Dn)))), s;
}
function Ht(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Da[t]);
}
function ja(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ro(e) {
  return typeof e != "number" ? ja(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Wt(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function Br(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Ue(t), a = ar(t), i = sr(a), d = De(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
  let p;
  switch (d) {
    case "top":
      p = {
        x: l,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: l,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (ht(t)) {
    case "start":
      p[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[a] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const za = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = n, i = s.filter(Boolean), d = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: u
  } = Br(c, r, d), f = r, p = {}, m = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: h,
      fn: v
    } = i[g], {
      x,
      y: b,
      data: C,
      reset: S
    } = await v({
      x: l,
      y: u,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: p,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = x ?? l, u = b ?? u, p = {
      ...p,
      [h]: {
        ...p[h],
        ...C
      }
    }, S && m <= 50 && (m++, typeof S == "object" && (S.placement && (f = S.placement), S.rects && (c = S.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: l,
      y: u
    } = Br(c, f, d)), g = -1);
  }
  return {
    x: l,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function At(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: d
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: u = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = Ne(t, e), m = Ro(p), h = i[f ? u === "floating" ? "reference" : "floating" : u], v = Wt(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(h))) == null || n ? h : h.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: d
  })), x = u === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), C = await (s.isElement == null ? void 0 : s.isElement(b)) ? await (s.getScale == null ? void 0 : s.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = Wt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: x,
    offsetParent: b,
    strategy: d
  }) : x);
  return {
    top: (v.top - S.top + m.top) / C.y,
    bottom: (S.bottom - v.bottom + m.bottom) / C.y,
    left: (v.left - S.left + m.left) / C.x,
    right: (S.right - v.right + m.right) / C.x
  };
}
const Ua = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: d
    } = t, {
      element: c,
      padding: l = 0
    } = Ne(e, t) || {};
    if (c == null)
      return {};
    const u = Ro(l), f = {
      x: n,
      y: r
    }, p = ar(o), m = sr(p), g = await a.getDimensions(c), h = p === "y", v = h ? "top" : "left", x = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", C = s.reference[m] + s.reference[p] - f[p] - s.floating[m], S = f[p] - s.reference[p], k = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let E = k ? k[b] : 0;
    (!E || !await (a.isElement == null ? void 0 : a.isElement(k))) && (E = i.floating[b] || s.floating[m]);
    const R = C / 2 - S / 2, P = E / 2 - g[m] / 2 - 1, M = ze(u[v], P), j = ze(u[x], P), D = M, Z = E - g[m] - j, z = E / 2 - g[m] / 2 + R, ie = Nn(D, z, Z), U = !d.arrow && ht(o) != null && z !== ie && s.reference[m] / 2 - (z < D ? M : j) - g[m] / 2 < 0, H = U ? z < D ? z - D : z - Z : 0;
    return {
      [p]: f[p] + H,
      data: {
        [p]: ie,
        centerOffset: z - ie - H,
        ...U && {
          alignmentOffset: H
        }
      },
      reset: U
    };
  }
}), Ha = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: d,
        elements: c
      } = t, {
        mainAxis: l = !0,
        crossAxis: u = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...h
      } = Ne(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = De(o), x = Ue(i), b = De(i) === i, C = await (d.isRTL == null ? void 0 : d.isRTL(c.floating)), S = f || (b || !g ? [Ht(i)] : qa(i)), k = m !== "none";
      !f && k && S.push(...Va(i, g, m, C));
      const E = [i, ...S], R = await At(t, h), P = [];
      let M = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && P.push(R[v]), u) {
        const z = Fa(o, a, C);
        P.push(R[z[0]], R[z[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: P
      }], !P.every((z) => z <= 0)) {
        var j, D;
        const z = (((j = s.flip) == null ? void 0 : j.index) || 0) + 1, ie = E[z];
        if (ie)
          return {
            data: {
              index: z,
              overflows: M
            },
            reset: {
              placement: ie
            }
          };
        let U = (D = M.filter((H) => H.overflows[0] <= 0).sort((H, le) => H.overflows[1] - le.overflows[1])[0]) == null ? void 0 : D.placement;
        if (!U)
          switch (p) {
            case "bestFit": {
              var Z;
              const H = (Z = M.filter((le) => {
                if (k) {
                  const oe = Ue(le.placement);
                  return oe === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  oe === "y";
                }
                return !0;
              }).map((le) => [le.placement, le.overflows.filter((oe) => oe > 0).reduce((oe, ot) => oe + ot, 0)]).sort((le, oe) => le[1] - oe[1])[0]) == null ? void 0 : Z[0];
              H && (U = H);
              break;
            }
            case "initialPlacement":
              U = i;
              break;
          }
        if (o !== U)
          return {
            reset: {
              placement: U
            }
          };
      }
      return {};
    }
  };
};
function Mr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ir(e) {
  return Na.some((t) => e[t] >= 0);
}
const Wa = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ne(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await At(t, {
            ...o,
            elementContext: "reference"
          }), a = Mr(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Ir(a)
            }
          };
        }
        case "escaped": {
          const s = await At(t, {
            ...o,
            altBoundary: !0
          }), a = Mr(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Ir(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Ga(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = De(n), i = ht(n), d = Ue(n) === "y", c = ["left", "top"].includes(a) ? -1 : 1, l = s && d ? -1 : 1, u = Ne(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: m
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return i && typeof m == "number" && (p = i === "end" ? m * -1 : m), d ? {
    x: p * l,
    y: f * c
  } : {
    x: f * c,
    y: p * l
  };
}
const Ka = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: i
      } = t, d = await Ga(t, e);
      return a === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + d.x,
        y: s + d.y,
        data: {
          ...d,
          placement: a
        }
      };
    }
  };
}, Ja = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: i = {
          fn: (h) => {
            let {
              x: v,
              y: x
            } = h;
            return {
              x: v,
              y: x
            };
          }
        },
        ...d
      } = Ne(e, t), c = {
        x: n,
        y: r
      }, l = await At(t, d), u = Ue(De(o)), f = or(u);
      let p = c[f], m = c[u];
      if (s) {
        const h = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", x = p + l[h], b = p - l[v];
        p = Nn(x, p, b);
      }
      if (a) {
        const h = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", x = m + l[h], b = m - l[v];
        m = Nn(x, m, b);
      }
      const g = i.fn({
        ...t,
        [f]: p,
        [u]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [f]: s,
            [u]: a
          }
        }
      };
    }
  };
}, Xa = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: d = !0,
        crossAxis: c = !0
      } = Ne(e, t), l = {
        x: n,
        y: r
      }, u = Ue(o), f = or(u);
      let p = l[f], m = l[u];
      const g = Ne(i, t), h = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (d) {
        const b = f === "y" ? "height" : "width", C = s.reference[f] - s.floating[b] + h.mainAxis, S = s.reference[f] + s.reference[b] - h.mainAxis;
        p < C ? p = C : p > S && (p = S);
      }
      if (c) {
        var v, x;
        const b = f === "y" ? "width" : "height", C = ["top", "left"].includes(De(o)), S = s.reference[u] - s.floating[b] + (C && ((v = a.offset) == null ? void 0 : v[u]) || 0) + (C ? 0 : h.crossAxis), k = s.reference[u] + s.reference[b] + (C ? 0 : ((x = a.offset) == null ? void 0 : x[u]) || 0) - (C ? h.crossAxis : 0);
        m < S ? m = S : m > k && (m = k);
      }
      return {
        [f]: p,
        [u]: m
      };
    }
  };
}, Ya = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: d = () => {
        },
        ...c
      } = Ne(e, t), l = await At(t, c), u = De(o), f = ht(o), p = Ue(o) === "y", {
        width: m,
        height: g
      } = s.floating;
      let h, v;
      u === "top" || u === "bottom" ? (h = u, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = u, h = f === "end" ? "top" : "bottom");
      const x = g - l.top - l.bottom, b = m - l.left - l.right, C = ze(g - l[h], x), S = ze(m - l[v], b), k = !t.middlewareData.shift;
      let E = C, R = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = b), (r = t.middlewareData.shift) != null && r.enabled.y && (E = x), k && !f) {
        const M = ye(l.left, 0), j = ye(l.right, 0), D = ye(l.top, 0), Z = ye(l.bottom, 0);
        p ? R = m - 2 * (M !== 0 || j !== 0 ? M + j : ye(l.left, l.right)) : E = g - 2 * (D !== 0 || Z !== 0 ? D + Z : ye(l.top, l.bottom));
      }
      await d({
        ...t,
        availableWidth: R,
        availableHeight: E
      });
      const P = await a.getDimensions(i.floating);
      return m !== P.width || g !== P.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function en() {
  return typeof window < "u";
}
function nt(e) {
  return ir(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ge(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Pe(e) {
  var t;
  return (t = (ir(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ir(e) {
  return en() ? e instanceof Node || e instanceof ge(e).Node : !1;
}
function xe(e) {
  return en() ? e instanceof Element || e instanceof ge(e).Element : !1;
}
function Oe(e) {
  return en() ? e instanceof HTMLElement || e instanceof ge(e).HTMLElement : !1;
}
function Nr(e) {
  return !en() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ge(e).ShadowRoot;
}
function Tt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Se(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Za(e) {
  return ["table", "td", "th"].includes(nt(e));
}
function tn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function lr(e) {
  const t = ur(), n = xe(e) ? Se(e) : e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Qa(e) {
  let t = He(e);
  for (; Oe(t) && !ft(t); ) {
    if (lr(t))
      return t;
    if (tn(t))
      return null;
    t = He(t);
  }
  return null;
}
function ur() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ft(e) {
  return ["html", "body", "#document"].includes(nt(e));
}
function Se(e) {
  return ge(e).getComputedStyle(e);
}
function nn(e) {
  return xe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function He(e) {
  if (nt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Nr(e) && e.host || // Fallback.
    Pe(e)
  );
  return Nr(t) ? t.host : t;
}
function Oo(e) {
  const t = He(e);
  return ft(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Oe(t) && Tt(t) ? t : Oo(t);
}
function kt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Oo(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ge(o);
  if (s) {
    const i = Ln(a);
    return t.concat(a, a.visualViewport || [], Tt(o) ? o : [], i && n ? kt(i) : []);
  }
  return t.concat(o, kt(o, [], n));
}
function Ln(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function To(e) {
  const t = Se(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Oe(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = Ut(n) !== s || Ut(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function cr(e) {
  return xe(e) ? e : e.contextElement;
}
function ct(e) {
  const t = cr(e);
  if (!Oe(t))
    return ke(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = To(t);
  let a = (s ? Ut(n.width) : n.width) / r, i = (s ? Ut(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const ei = /* @__PURE__ */ ke(0);
function Po(e) {
  const t = ge(e);
  return !ur() || !t.visualViewport ? ei : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ti(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ge(e) ? !1 : t;
}
function et(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = cr(e);
  let a = ke(1);
  t && (r ? xe(r) && (a = ct(r)) : a = ct(e));
  const i = ti(s, n, r) ? Po(s) : ke(0);
  let d = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, l = o.width / a.x, u = o.height / a.y;
  if (s) {
    const f = ge(s), p = r && xe(r) ? ge(r) : r;
    let m = f, g = Ln(m);
    for (; g && r && p !== m; ) {
      const h = ct(g), v = g.getBoundingClientRect(), x = Se(g), b = v.left + (g.clientLeft + parseFloat(x.paddingLeft)) * h.x, C = v.top + (g.clientTop + parseFloat(x.paddingTop)) * h.y;
      d *= h.x, c *= h.y, l *= h.x, u *= h.y, d += b, c += C, m = ge(g), g = Ln(m);
    }
  }
  return Wt({
    width: l,
    height: u,
    x: d,
    y: c
  });
}
function dr(e, t) {
  const n = nn(e).scrollLeft;
  return t ? t.left + n : et(Pe(e)).left + n;
}
function Bo(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    dr(e, r)
  )), s = r.top + t.scrollTop;
  return {
    x: o,
    y: s
  };
}
function ni(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = Pe(r), i = t ? tn(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ke(1);
  const l = ke(0), u = Oe(r);
  if ((u || !u && !s) && ((nt(r) !== "body" || Tt(a)) && (d = nn(r)), Oe(r))) {
    const p = et(r);
    c = ct(r), l.x = p.x + r.clientLeft, l.y = p.y + r.clientTop;
  }
  const f = a && !u && !s ? Bo(a, d, !0) : ke(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - d.scrollLeft * c.x + l.x + f.x,
    y: n.y * c.y - d.scrollTop * c.y + l.y + f.y
  };
}
function ri(e) {
  return Array.from(e.getClientRects());
}
function oi(e) {
  const t = Pe(e), n = nn(e), r = e.ownerDocument.body, o = ye(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ye(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + dr(e);
  const i = -n.scrollTop;
  return Se(r).direction === "rtl" && (a += ye(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
function si(e, t) {
  const n = ge(e), r = Pe(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, d = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = ur();
    (!c || c && t === "fixed") && (i = o.offsetLeft, d = o.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: i,
    y: d
  };
}
function ai(e, t) {
  const n = et(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Oe(e) ? ct(e) : ke(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, d = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: d,
    y: c
  };
}
function Dr(e, t, n) {
  let r;
  if (t === "viewport")
    r = si(e, n);
  else if (t === "document")
    r = oi(Pe(e));
  else if (xe(t))
    r = ai(t, n);
  else {
    const o = Po(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Wt(r);
}
function Mo(e, t) {
  const n = He(e);
  return n === t || !xe(n) || ft(n) ? !1 : Se(n).position === "fixed" || Mo(n, t);
}
function ii(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = kt(e, [], !1).filter((i) => xe(i) && nt(i) !== "body"), o = null;
  const s = Se(e).position === "fixed";
  let a = s ? He(e) : e;
  for (; xe(a) && !ft(a); ) {
    const i = Se(a), d = lr(a);
    !d && i.position === "fixed" && (o = null), (s ? !d && !o : !d && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Tt(a) && !d && Mo(e, a)) ? r = r.filter((l) => l !== a) : o = i, a = He(a);
  }
  return t.set(e, r), r;
}
function li(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? tn(t) ? [] : ii(t, this._c) : [].concat(n), r], i = a[0], d = a.reduce((c, l) => {
    const u = Dr(t, l, o);
    return c.top = ye(u.top, c.top), c.right = ze(u.right, c.right), c.bottom = ze(u.bottom, c.bottom), c.left = ye(u.left, c.left), c;
  }, Dr(t, i, o));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function ui(e) {
  const {
    width: t,
    height: n
  } = To(e);
  return {
    width: t,
    height: n
  };
}
function ci(e, t, n) {
  const r = Oe(t), o = Pe(t), s = n === "fixed", a = et(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = ke(0);
  if (r || !r && !s)
    if ((nt(t) !== "body" || Tt(o)) && (i = nn(t)), r) {
      const f = et(t, !0, s, t);
      d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
    } else o && (d.x = dr(o));
  const c = o && !r && !s ? Bo(o, i) : ke(0), l = a.left + i.scrollLeft - d.x - c.x, u = a.top + i.scrollTop - d.y - c.y;
  return {
    x: l,
    y: u,
    width: a.width,
    height: a.height
  };
}
function wn(e) {
  return Se(e).position === "static";
}
function Lr(e, t) {
  if (!Oe(e) || Se(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Pe(e) === n && (n = n.ownerDocument.body), n;
}
function Io(e, t) {
  const n = ge(e);
  if (tn(e))
    return n;
  if (!Oe(e)) {
    let o = He(e);
    for (; o && !ft(o); ) {
      if (xe(o) && !wn(o))
        return o;
      o = He(o);
    }
    return n;
  }
  let r = Lr(e, t);
  for (; r && Za(r) && wn(r); )
    r = Lr(r, t);
  return r && ft(r) && wn(r) && !lr(r) ? n : r || Qa(e) || n;
}
const di = async function(e) {
  const t = this.getOffsetParent || Io, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: ci(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function fi(e) {
  return Se(e).direction === "rtl";
}
const pi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ni,
  getDocumentElement: Pe,
  getClippingRect: li,
  getOffsetParent: Io,
  getElementRects: di,
  getClientRects: ri,
  getDimensions: ui,
  getScale: ct,
  isElement: xe,
  isRTL: fi
};
function mi(e, t) {
  let n = null, r;
  const o = Pe(e);
  function s() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function a(i, d) {
    i === void 0 && (i = !1), d === void 0 && (d = 1), s();
    const {
      left: c,
      top: l,
      width: u,
      height: f
    } = e.getBoundingClientRect();
    if (i || t(), !u || !f)
      return;
    const p = Dt(l), m = Dt(o.clientWidth - (c + u)), g = Dt(o.clientHeight - (l + f)), h = Dt(c), x = {
      rootMargin: -p + "px " + -m + "px " + -g + "px " + -h + "px",
      threshold: ye(0, ze(1, d)) || 1
    };
    let b = !0;
    function C(S) {
      const k = S[0].intersectionRatio;
      if (k !== d) {
        if (!b)
          return a();
        k ? a(!1, k) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      b = !1;
    }
    try {
      n = new IntersectionObserver(C, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, x);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function hi(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = r, c = cr(e), l = o || s ? [...c ? kt(c) : [], ...kt(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const u = c && i ? mi(c, n) : null;
  let f = -1, p = null;
  a && (p = new ResizeObserver((v) => {
    let [x] = v;
    x && x.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var b;
      (b = p) == null || b.observe(t);
    })), n();
  }), c && !d && p.observe(c), p.observe(t));
  let m, g = d ? et(e) : null;
  d && h();
  function h() {
    const v = et(e);
    g && (v.x !== g.x || v.y !== g.y || v.width !== g.width || v.height !== g.height) && n(), g = v, m = requestAnimationFrame(h);
  }
  return n(), () => {
    var v;
    l.forEach((x) => {
      o && x.removeEventListener("scroll", n), s && x.removeEventListener("resize", n);
    }), u == null || u(), (v = p) == null || v.disconnect(), p = null, d && cancelAnimationFrame(m);
  };
}
const yi = Ka, gi = Ja, Fr = Ha, vi = Ya, bi = Wa, wi = Ua, xi = Xa, Si = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: pi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return za(e, t, {
    ...o,
    platform: s
  });
};
function Ci(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Fn(e) {
  if (Ci(e)) {
    const t = e.$el;
    return ir(t) && nt(t) === "#comment" ? null : t;
  }
  return e;
}
function lt(e) {
  return typeof e == "function" ? e() : y(e);
}
function _i(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Fn(lt(e.element));
      return n == null ? {} : wi({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function No(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function qr(e, t) {
  const n = No(e);
  return Math.round(t * n) / n;
}
function Ei(e, t, n) {
  n === void 0 && (n = {});
  const r = n.whileElementsMounted, o = B(() => {
    var E;
    return (E = lt(n.open)) != null ? E : !0;
  }), s = B(() => lt(n.middleware)), a = B(() => {
    var E;
    return (E = lt(n.placement)) != null ? E : "bottom";
  }), i = B(() => {
    var E;
    return (E = lt(n.strategy)) != null ? E : "absolute";
  }), d = B(() => {
    var E;
    return (E = lt(n.transform)) != null ? E : !0;
  }), c = B(() => Fn(e.value)), l = B(() => Fn(t.value)), u = T(0), f = T(0), p = T(i.value), m = T(a.value), g = po({}), h = T(!1), v = B(() => {
    const E = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!l.value)
      return E;
    const R = qr(l.value, u.value), P = qr(l.value, f.value);
    return d.value ? {
      ...E,
      transform: "translate(" + R + "px, " + P + "px)",
      ...No(l.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: R + "px",
      top: P + "px"
    };
  });
  let x;
  function b() {
    if (c.value == null || l.value == null)
      return;
    const E = o.value;
    Si(c.value, l.value, {
      middleware: s.value,
      placement: a.value,
      strategy: i.value
    }).then((R) => {
      u.value = R.x, f.value = R.y, p.value = R.strategy, m.value = R.placement, g.value = R.middlewareData, h.value = E !== !1;
    });
  }
  function C() {
    typeof x == "function" && (x(), x = void 0);
  }
  function S() {
    if (C(), r === void 0) {
      b();
      return;
    }
    if (c.value != null && l.value != null) {
      x = r(c.value, l.value, b);
      return;
    }
  }
  function k() {
    o.value || (h.value = !1);
  }
  return J([s, a, i, o], b, {
    flush: "sync"
  }), J([c, l], S, {
    flush: "sync"
  }), J(o, k, {
    flush: "sync"
  }), Xt() && Yt(C), {
    x: st(u),
    y: st(f),
    strategy: st(p),
    placement: st(m),
    middlewareData: st(g),
    isPositioned: st(h),
    floatingStyles: v,
    update: b
  };
}
function he(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
  return [(o) => {
    const s = nr(r, o);
    if (s || s === null)
      return s;
    throw new Error(
      `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (o) => (go(r, o), o)];
}
function Do(e, t, n) {
  const r = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(o);
}
function $r(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(n, Math.max(t, e));
}
function fr(e) {
  return e == null;
}
function Ai(e, t) {
  var n;
  const r = po();
  return de(() => {
    r.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), Js(r);
}
function pr(e) {
  return Xt() ? (Yt(e), !0) : !1;
}
function ki(e) {
  let t = !1, n;
  const r = Zt(!0);
  return (...o) => (t || (n = r.run(() => e(...o)), t = !0), n);
}
function Ri(e) {
  let t = 0, n, r;
  const o = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...s) => (t += 1, n || (r = Zt(!0), n = r.run(() => e(...s))), pr(o), n);
}
function Ze(e) {
  return typeof e == "function" ? e() : y(e);
}
const Ge = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Oi = (e) => typeof e < "u", Ti = Object.prototype.toString, Pi = (e) => Ti.call(e) === "[object Object]", Bi = () => {
}, Vr = /* @__PURE__ */ Mi();
function Mi() {
  var e, t;
  return Ge && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Ii(e) {
  return Le();
}
function Ni(e, t = 1e4) {
  return Us((n, r) => {
    let o = Ze(e), s;
    const a = () => setTimeout(() => {
      o = Ze(e), r();
    }, Ze(t));
    return pr(() => {
      clearTimeout(s);
    }), {
      get() {
        return n(), o;
      },
      set(i) {
        o = i, r(), clearTimeout(s), s = a();
      }
    };
  });
}
function Di(e, t) {
  Ii() && er(e, t);
}
function Fe(e) {
  var t;
  const n = Ze(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const mr = Ge ? window : void 0;
function Gt(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = mr) : [t, n, r, o] = e, !t)
    return Bi;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((l) => l()), s.length = 0;
  }, i = (l, u, f, p) => (l.addEventListener(u, f, p), () => l.removeEventListener(u, f, p)), d = J(
    () => [Fe(t), Ze(o)],
    ([l, u]) => {
      if (a(), !l)
        return;
      const f = Pi(u) ? { ...u } : u;
      s.push(
        ...n.flatMap((p) => r.map((m) => i(l, p, m, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), a();
  };
  return pr(c), c;
}
function Li(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Fi(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: o = mr,
    eventName: s = "keydown",
    passive: a = !1,
    dedupe: i = !1
  } = r, d = Li(t);
  return Gt(o, s, (c) => {
    c.repeat && Ze(i) || d(c) && n(c);
  }, a);
}
function qi() {
  const e = T(!1), t = Le();
  return t && Ce(() => {
    e.value = !0;
  }, t), e;
}
function $i(e) {
  return JSON.parse(JSON.stringify(e));
}
function We(e, t, n, r = {}) {
  var o, s, a;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: u,
    shouldEmit: f
  } = r, p = Le(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let g = c;
  t || (t = "modelValue"), g = g || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : $i(b) : b, v = () => Oi(e[t]) ? h(e[t]) : u, x = (b) => {
    f ? f(b) && m(g, b) : m(g, b);
  };
  if (d) {
    const b = v(), C = T(b);
    let S = !1;
    return J(
      () => e[t],
      (k) => {
        S || (S = !0, C.value = h(k), ce(() => S = !1));
      }
    ), J(
      C,
      (k) => {
        !S && (k !== e[t] || l) && x(k);
      },
      { deep: l }
    ), C;
  } else
    return B({
      get() {
        return v();
      },
      set(b) {
        x(b);
      }
    });
}
function hr(e) {
  return e ? e.flatMap((t) => t.type === Re ? hr(t.children) : [t]) : [];
}
function xn(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function qn(e, t, n = ".", r) {
  if (!xn(t))
    return qn(e, {}, n);
  const o = Object.assign({}, t);
  for (const s in e) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const a = e[s];
    a != null && (Array.isArray(a) && Array.isArray(o[s]) ? o[s] = [...a, ...o[s]] : xn(a) && xn(o[s]) ? o[s] = qn(
      a,
      o[s],
      (n ? `${n}.` : "") + s.toString()
    ) : o[s] = a);
  }
  return o;
}
function Vi(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, r) => qn(n, r, ""), {})
  );
}
const ji = Vi(), [rn, pp] = he("ConfigProvider");
let zi = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Ui = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += zi[Math.random() * 64 | 0];
  return t;
};
const Hi = Ri(() => {
  const e = T(/* @__PURE__ */ new Map()), t = T(), n = B(() => {
    for (const a of e.value.values())
      if (a)
        return !0;
    return !1;
  }), r = rn({
    scrollBody: T(!0)
  });
  let o = null;
  const s = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Vr && (o == null || o()), t.value = void 0;
  };
  return J(n, (a, i) => {
    var d;
    if (!Ge)
      return;
    if (!a) {
      i && s();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, l = { padding: c, margin: 0 }, u = (d = r.scrollBody) != null && d.value ? typeof r.scrollBody.value == "object" ? ji({
      padding: r.scrollBody.value.padding === !0 ? c : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? c : r.scrollBody.value.margin
    }, l) : l : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Vr && (o = Gt(
      document,
      "touchmove",
      (f) => Gi(f),
      { passive: !1 }
    )), ce(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function Wi(e) {
  const t = Ui(6), n = Hi();
  n.value.set(t, e ?? !1);
  const r = B({
    get: () => n.value.get(t) ?? !1,
    set: (o) => n.value.set(t, o)
  });
  return Di(() => {
    n.value.delete(t);
  }), r;
}
function Lo(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Lo(n);
  }
}
function Gi(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && Lo(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
const Ki = "data-radix-vue-collection-item";
function on(e, t = Ki) {
  const n = Symbol();
  return { createCollection: (r) => {
    const o = T([]);
    function s() {
      const a = Fe(r);
      return a ? o.value = Array.from(
        a.querySelectorAll(`[${t}]:not([data-disabled])`)
      ) : o.value = [];
    }
    return Hs(() => {
      o.value = [];
    }), Ce(s), Ws(s), J(() => r == null ? void 0 : r.value, s, { immediate: !0 }), go(n, o), o;
  }, injectCollection: () => nr(n, T([])) };
}
function yr(e) {
  const t = rn({
    dir: T("ltr")
  });
  return B(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function Ji(e) {
  const t = Le(), n = t == null ? void 0 : t.type.emits, r = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((o) => {
    r[js(mo(o))] = (...s) => e(o, ...s);
  }), r;
}
let Sn = 0;
function Xi() {
  de((e) => {
    if (!Ge)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? jr()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? jr()
    ), Sn++, e(() => {
      Sn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Sn--;
    });
  });
}
function jr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function gr(e) {
  return B(() => {
    var t;
    return Ze(e) ? !!((t = Fe(e)) != null && t.closest("form")) : !0;
  });
}
function Ke(e) {
  const t = Le(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, s) => {
    const a = (t == null ? void 0 : t.type.props[s]).default;
    return a !== void 0 && (o[s] = a), o;
  }, {}), r = qs(e);
  return B(() => {
    const o = {}, s = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(s).forEach((a) => {
      o[mo(a)] = s[a];
    }), Object.keys({ ...n, ...o }).reduce((a, i) => (r.value[i] !== void 0 && (a[i] = r.value[i]), a), {});
  });
}
function Pt(e, t) {
  const n = Ke(e), r = t ? Ji(t) : {};
  return B(() => ({
    ...n.value,
    ...r
  }));
}
function te() {
  const e = Le(), t = T(), n = B(() => {
    var a, i;
    return ["#text", "#comment"].includes((a = t.value) == null ? void 0 : a.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : Fe(t);
  }), r = Object.assign({}, e.exposed), o = {};
  for (const a in e.props)
    Object.defineProperty(o, a, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[a]
    });
  if (Object.keys(r).length > 0)
    for (const a in r)
      Object.defineProperty(o, a, {
        enumerable: !0,
        configurable: !0,
        get: () => r[a]
      });
  Object.defineProperty(o, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = o;
  function s(a) {
    t.value = a, !(a instanceof Element || !a) && (Object.defineProperty(o, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => a.$el
    }), e.exposed = o);
  }
  return { forwardRef: s, currentRef: t, currentElement: n };
}
var Yi = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, at = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Ft = {}, Cn = 0, Fo = function(e) {
  return e && (e.host || Fo(e.parentNode));
}, Zi = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Fo(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Qi = function(e, t, n, r) {
  var o = Zi(t, Array.isArray(e) ? e : [e]);
  Ft[n] || (Ft[n] = /* @__PURE__ */ new WeakMap());
  var s = Ft[n], a = [], i = /* @__PURE__ */ new Set(), d = new Set(o), c = function(u) {
    !u || i.has(u) || (i.add(u), c(u.parentNode));
  };
  o.forEach(c);
  var l = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (i.has(f))
        l(f);
      else
        try {
          var p = f.getAttribute(r), m = p !== null && p !== "false", g = (at.get(f) || 0) + 1, h = (s.get(f) || 0) + 1;
          at.set(f, g), s.set(f, h), a.push(f), g === 1 && m && Lt.set(f, !0), h === 1 && f.setAttribute(n, "true"), m || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return l(t), i.clear(), Cn++, function() {
    a.forEach(function(u) {
      var f = at.get(u) - 1, p = s.get(u) - 1;
      at.set(u, f), s.set(u, p), f || (Lt.has(u) || u.removeAttribute(r), Lt.delete(u)), p || u.removeAttribute(n);
    }), Cn--, Cn || (at = /* @__PURE__ */ new WeakMap(), at = /* @__PURE__ */ new WeakMap(), Lt = /* @__PURE__ */ new WeakMap(), Ft = {});
  };
}, el = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Yi(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Qi(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
function tl(e) {
  let t;
  J(() => Fe(e), (n) => {
    n ? t = el(n) : t && t();
  }), tr(() => {
    t && t();
  });
}
let nl = 0;
function vr(e, t = "radix") {
  const n = rn({ useId: void 0 });
  return Or.useId ? `${t}-${Or.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++nl}`;
}
function rl(e) {
  const t = T(), n = B(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.width) ?? 0;
  }), r = B(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.height) ?? 0;
  });
  return Ce(() => {
    const o = Fe(e);
    if (o) {
      t.value = { width: o.offsetWidth, height: o.offsetHeight };
      const s = new ResizeObserver((a) => {
        if (!Array.isArray(a) || !a.length)
          return;
        const i = a[0];
        let d, c;
        if ("borderBoxSize" in i) {
          const l = i.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          d = u.inlineSize, c = u.blockSize;
        } else
          d = o.offsetWidth, c = o.offsetHeight;
        t.value = { width: d, height: c };
      });
      return s.observe(o, { box: "border-box" }), () => s.unobserve(o);
    } else
      t.value = void 0;
  }), {
    width: n,
    height: r
  };
}
function ol(e, t) {
  const n = T(e);
  function r(o) {
    return t[n.value][o] ?? n.value;
  }
  return {
    state: n,
    dispatch: (o) => {
      n.value = r(o);
    }
  };
}
const sl = "data-item-text";
function qo(e) {
  const t = Ni("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (n, r) => {
      if (!(e != null && e.value) && !r)
        return;
      t.value = t.value + n;
      const o = (e == null ? void 0 : e.value) ?? r, s = document.activeElement, a = o.map((u) => {
        var f;
        return {
          ref: u,
          textValue: ((f = (u.querySelector(`[${sl}]`) ?? u).textContent) == null ? void 0 : f.trim()) ?? ""
        };
      }), i = a.find((u) => u.ref === s), d = a.map((u) => u.textValue), c = il(d, t.value, i == null ? void 0 : i.textValue), l = a.find((u) => u.textValue === c);
      return l && l.ref.focus(), l == null ? void 0 : l.ref;
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function al(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function il(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((i) => i === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let s = al(e, Math.max(o, 0));
  r.length === 1 && (s = s.filter((i) => i !== n));
  const a = s.find(
    (i) => i.toLowerCase().startsWith(r.toLowerCase())
  );
  return a !== n ? a : void 0;
}
const br = $({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r, o;
      if (!n.default)
        return null;
      const s = hr(n.default()), a = s.findIndex((l) => l.type !== $s);
      if (a === -1)
        return s;
      const i = s[a];
      (r = i.props) == null || delete r.ref;
      const d = i.props ? G(t, i.props) : t;
      t.class && (o = i.props) != null && o.class && delete i.props.class;
      const c = Vs(i, d);
      for (const l in d)
        l.startsWith("on") && (c.props || (c.props = {}), c.props[l] = d[l]);
      return s.length === 1 ? c : (s[a] = c, s);
    };
  }
}), X = $({
  name: "Primitive",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const r = e.asChild ? "template" : e.as;
    return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => Ae(r, t) : r !== "template" ? () => Ae(e.as, t, { default: n.default }) : () => Ae(br, t, { default: n.default });
  }
});
function wr() {
  const e = T(), t = B(() => {
    var n, r;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : Fe(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function ll(e, t) {
  var n;
  const r = T({}), o = T("none"), s = T(e), a = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? mr, { state: c, dispatch: l } = ol(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), u = (h) => {
    var v;
    if (Ge) {
      const x = new CustomEvent(h, { bubbles: !1, cancelable: !1 });
      (v = t.value) == null || v.dispatchEvent(x);
    }
  };
  J(
    e,
    async (h, v) => {
      var x;
      const b = v !== h;
      if (await ce(), b) {
        const C = o.value, S = qt(t.value);
        h ? (l("MOUNT"), u("enter"), S === "none" && u("after-enter")) : S === "none" || ((x = r.value) == null ? void 0 : x.display) === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : v && C !== S ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const f = (h) => {
    const v = qt(t.value), x = v.includes(
      h.animationName
    ), b = c.value === "mounted" ? "enter" : "leave";
    if (h.target === t.value && x && (u(`after-${b}`), l("ANIMATION_END"), !s.value)) {
      const C = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var S;
        ((S = t.value) == null ? void 0 : S.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = C);
      });
    }
    h.target === t.value && v === "none" && l("ANIMATION_END");
  }, p = (h) => {
    h.target === t.value && (o.value = qt(t.value));
  }, m = J(
    t,
    (h, v) => {
      h ? (r.value = getComputedStyle(h), h.addEventListener("animationstart", p), h.addEventListener("animationcancel", f), h.addEventListener("animationend", f)) : (l("ANIMATION_END"), d == null || d.clearTimeout(i), v == null || v.removeEventListener("animationstart", p), v == null || v.removeEventListener("animationcancel", f), v == null || v.removeEventListener("animationend", f));
    },
    { immediate: !0 }
  ), g = J(c, () => {
    const h = qt(t.value);
    o.value = c.value === "mounted" ? h : "none";
  });
  return tr(() => {
    m(), g();
  }), {
    isPresent: B(
      () => ["mounted", "unmountSuspended"].includes(c.value)
    )
  };
}
function qt(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const $o = $({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: !0
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var r;
    const { present: o, forceMount: s } = Te(e), a = T(), { isPresent: i } = ll(o, a);
    n({ present: i });
    let d = t.default({ present: i });
    d = hr(d || []);
    const c = Le();
    if (d && (d == null ? void 0 : d.length) > 1) {
      const l = (r = c == null ? void 0 : c.parent) != null && r.type.name ? `<${c.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${l}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((u) => `  - ${u}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => s.value || o.value || i.value ? Ae(t.default({ present: i })[0], {
      ref: (l) => {
        const u = Fe(l);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? a.value = u.firstElementChild : a.value = u), u;
      }
    }) : null;
  }
}), ul = /* @__PURE__ */ $({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = qi();
    return (n, r) => y(t) || n.forceMount ? (A(), N(Qn, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      I(n.$slots, "default")
    ], 8, ["to", "disabled"])) : se("", !0);
  }
}), cl = "dismissableLayer.pointerDownOutside", dl = "dismissableLayer.focusOutside";
function Vo(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), r = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && r === n || o.indexOf(r) < o.indexOf(n));
}
function fl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = T(!1), s = T(() => {
  });
  return de((a) => {
    if (!Ge)
      return;
    const i = async (c) => {
      const l = c.target;
      if (t != null && t.value) {
        if (Vo(t.value, l)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let u = function() {
            Do(
              cl,
              e,
              f
            );
          };
          const f = { originalEvent: c };
          c.pointerType === "touch" ? (r.removeEventListener("click", s.value), s.value = u, r.addEventListener("click", s.value, {
            once: !0
          })) : u();
        } else
          r.removeEventListener("click", s.value);
        o.value = !1;
      }
    }, d = window.setTimeout(() => {
      r.addEventListener("pointerdown", i);
    }, 0);
    a(() => {
      window.clearTimeout(d), r.removeEventListener("pointerdown", i), r.removeEventListener("click", s.value);
    });
  }), {
    onPointerDownCapture: () => o.value = !0
  };
}
function pl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = T(!1);
  return de((s) => {
    if (!Ge)
      return;
    const a = async (i) => {
      t != null && t.value && (await ce(), !(!t.value || Vo(t.value, i.target)) && i.target && !o.value && Do(
        dl,
        e,
        { originalEvent: i }
      ));
    };
    r.addEventListener("focusin", a), s(() => r.removeEventListener("focusin", a));
  }), {
    onFocusCapture: () => o.value = !0,
    onBlurCapture: () => o.value = !1
  };
}
const Ie = Jn({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), ml = /* @__PURE__ */ $({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o, currentElement: s } = te(), a = B(
      () => {
        var m;
        return ((m = s.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = B(() => Ie.layersRoot), d = B(() => s.value ? Array.from(i.value).indexOf(s.value) : -1), c = B(() => Ie.layersWithOutsidePointerEventsDisabled.size > 0), l = B(() => {
      const m = Array.from(i.value), [g] = [...Ie.layersWithOutsidePointerEventsDisabled].slice(-1), h = m.indexOf(g);
      return d.value >= h;
    }), u = fl(async (m) => {
      const g = [...Ie.branches].some(
        (h) => h == null ? void 0 : h.contains(m.target)
      );
      !l.value || g || (r("pointerDownOutside", m), r("interactOutside", m), await ce(), m.defaultPrevented || r("dismiss"));
    }, s), f = pl((m) => {
      [...Ie.branches].some(
        (g) => g == null ? void 0 : g.contains(m.target)
      ) || (r("focusOutside", m), r("interactOutside", m), m.defaultPrevented || r("dismiss"));
    }, s);
    Fi("Escape", (m) => {
      d.value === i.value.size - 1 && (r("escapeKeyDown", m), m.defaultPrevented || r("dismiss"));
    });
    let p;
    return de((m) => {
      s.value && (n.disableOutsidePointerEvents && (Ie.layersWithOutsidePointerEventsDisabled.size === 0 && (p = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), Ie.layersWithOutsidePointerEventsDisabled.add(s.value)), i.value.add(s.value), m(() => {
        n.disableOutsidePointerEvents && Ie.layersWithOutsidePointerEventsDisabled.size === 1 && (a.value.body.style.pointerEvents = p);
      }));
    }), de((m) => {
      m(() => {
        s.value && (i.value.delete(s.value), Ie.layersWithOutsidePointerEventsDisabled.delete(s.value));
      });
    }), (m, g) => (A(), N(y(X), {
      ref: y(o),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: Qt({
        pointerEvents: c.value ? l.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: y(f).onFocusCapture,
      onBlurCapture: y(f).onBlurCapture,
      onPointerdownCapture: y(u).onPointerDownCapture
    }, {
      default: _(() => [
        I(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), _n = "focusScope.autoFocusOnMount", En = "focusScope.autoFocusOnUnmount", zr = { bubbles: !1, cancelable: !0 };
function hl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Ve(r, { select: t }), document.activeElement !== n)
      return !0;
}
function yl(e) {
  const t = jo(e), n = Ur(t, e), r = Ur(t.reverse(), e);
  return [n, r];
}
function jo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ur(e, t) {
  for (const n of e)
    if (!gl(n, { upTo: t }))
      return n;
}
function gl(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t !== void 0 && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}
function vl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ve(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && vl(e) && t && e.select();
  }
}
const bl = ki(() => T([]));
function wl() {
  const e = bl();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Hr(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Hr(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Hr(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function xl(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Sl = /* @__PURE__ */ $({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, r = t, { currentRef: o, currentElement: s } = te(), a = T(null), i = wl(), d = Jn({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    de((l) => {
      if (!Ge)
        return;
      const u = s.value;
      if (!n.trapped)
        return;
      function f(h) {
        if (d.paused || !u)
          return;
        const v = h.target;
        u.contains(v) ? a.value = v : Ve(a.value, { select: !0 });
      }
      function p(h) {
        if (d.paused || !u)
          return;
        const v = h.relatedTarget;
        v !== null && (u.contains(v) || Ve(a.value, { select: !0 }));
      }
      function m(h) {
        u.contains(a.value) || Ve(u);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", p);
      const g = new MutationObserver(m);
      u && g.observe(u, { childList: !0, subtree: !0 }), l(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", p), g.disconnect();
      });
    }), de(async (l) => {
      const u = s.value;
      if (await ce(), !u)
        return;
      i.add(d);
      const f = document.activeElement;
      if (!u.contains(f)) {
        const p = new CustomEvent(_n, zr);
        u.addEventListener(_n, (m) => r("mountAutoFocus", m)), u.dispatchEvent(p), p.defaultPrevented || (hl(xl(jo(u)), {
          select: !0
        }), document.activeElement === f && Ve(u));
      }
      l(() => {
        u.removeEventListener(_n, (g) => r("mountAutoFocus", g));
        const p = new CustomEvent(En, zr), m = (g) => {
          r("unmountAutoFocus", g);
        };
        u.addEventListener(En, m), u.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || Ve(f ?? document.body, { select: !0 }), u.removeEventListener(En, m), i.remove(d);
        }, 0);
      });
    });
    function c(l) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = l.key === "Tab" && !l.altKey && !l.ctrlKey && !l.metaKey, f = document.activeElement;
      if (u && f) {
        const p = l.currentTarget, [m, g] = yl(p);
        m && g ? !l.shiftKey && f === g ? (l.preventDefault(), n.loop && Ve(m, { select: !0 })) : l.shiftKey && f === m && (l.preventDefault(), n.loop && Ve(g, { select: !0 })) : f === p && l.preventDefault();
      }
    }
    return (l, u) => (A(), N(y(X), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": l.asChild,
      as: l.as,
      onKeydown: c
    }, {
      default: _(() => [
        I(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Wr(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [zo, Cl] = he("PopperRoot"), _l = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = T();
    return Cl({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, r) => I(n.$slots, "default");
  }
}), El = /* @__PURE__ */ $({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = te(), o = zo();
    return de(() => {
      o.onAnchorChange(t.element ?? r.value);
    }), (s, a) => (A(), N(y(X), {
      ref: y(n),
      as: s.as,
      "as-child": s.asChild
    }, {
      default: _(() => [
        I(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Al(e) {
  return e !== null;
}
function kl(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, r, o;
      const { placement: s, rects: a, middlewareData: i } = t, d = ((n = i.arrow) == null ? void 0 : n.centerOffset) !== 0, c = d ? 0 : e.arrowWidth, l = d ? 0 : e.arrowHeight, [u, f] = $n(s), p = { start: "0%", center: "50%", end: "100%" }[f], m = (((r = i.arrow) == null ? void 0 : r.x) ?? 0) + c / 2, g = (((o = i.arrow) == null ? void 0 : o.y) ?? 0) + l / 2;
      let h = "", v = "";
      return u === "bottom" ? (h = d ? p : `${m}px`, v = `${-l}px`) : u === "top" ? (h = d ? p : `${m}px`, v = `${a.floating.height + l}px`) : u === "right" ? (h = `${-l}px`, v = d ? p : `${g}px`) : u === "left" && (h = `${a.floating.width + l}px`, v = d ? p : `${g}px`), { data: { x: h, y: v } };
    }
  };
}
function $n(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Rl = {
  side: "bottom",
  sideOffset: 0,
  align: "center",
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: !0,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: !1,
  updatePositionStrategy: "optimized",
  prioritizePosition: !1
}, [mp, Ol] = he("PopperContent"), Tl = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Gs({
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  }, {
    ...Rl
  }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = zo(), { forwardRef: s, currentElement: a } = te(), i = T(), d = T(), { width: c, height: l } = rl(d), u = B(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), f = B(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), p = B(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), m = B(() => ({
      padding: f.value,
      boundary: p.value.filter(Al),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), g = Ai(() => [
      yi({
        mainAxis: n.sideOffset + l.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Fr({
        ...m.value
      }),
      n.avoidCollisions && gi({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? xi() : void 0,
        ...m.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Fr({
        ...m.value
      }),
      vi({
        ...m.value,
        apply: ({ elements: M, rects: j, availableWidth: D, availableHeight: Z }) => {
          const { width: z, height: ie } = j.reference, U = M.floating.style;
          U.setProperty(
            "--radix-popper-available-width",
            `${D}px`
          ), U.setProperty(
            "--radix-popper-available-height",
            `${Z}px`
          ), U.setProperty(
            "--radix-popper-anchor-width",
            `${z}px`
          ), U.setProperty(
            "--radix-popper-anchor-height",
            `${ie}px`
          );
        }
      }),
      d.value && _i({ element: d.value, padding: n.arrowPadding }),
      kl({
        arrowWidth: c.value,
        arrowHeight: l.value
      }),
      n.hideWhenDetached && bi({ strategy: "referenceHidden", ...m.value })
    ]), { floatingStyles: h, placement: v, isPositioned: x, middlewareData: b } = Ei(
      o.anchor,
      i,
      {
        strategy: "fixed",
        placement: u,
        whileElementsMounted: (...M) => hi(...M, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: g
      }
    ), C = B(
      () => $n(v.value)[0]
    ), S = B(
      () => $n(v.value)[1]
    );
    Ks(() => {
      x.value && r("placed");
    });
    const k = B(
      () => {
        var M;
        return ((M = b.value.arrow) == null ? void 0 : M.centerOffset) !== 0;
      }
    ), E = T("");
    de(() => {
      a.value && (E.value = window.getComputedStyle(a.value).zIndex);
    });
    const R = B(() => {
      var M;
      return ((M = b.value.arrow) == null ? void 0 : M.x) ?? 0;
    }), P = B(() => {
      var M;
      return ((M = b.value.arrow) == null ? void 0 : M.y) ?? 0;
    });
    return Ol({
      placedSide: C,
      onArrowChange: (M) => d.value = M,
      arrowX: R,
      arrowY: P,
      shouldHideArrow: k
    }), (M, j) => {
      var D, Z, z;
      return A(), V("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: Qt({
          ...y(h),
          transform: y(x) ? y(h).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: E.value,
          "--radix-popper-transform-origin": [
            (D = y(b).transformOrigin) == null ? void 0 : D.x,
            (Z = y(b).transformOrigin) == null ? void 0 : Z.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((z = y(b).hide) == null ? void 0 : z.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        O(y(X), G({ ref: y(s) }, M.$attrs, {
          "as-child": n.asChild,
          as: M.as,
          "data-side": C.value,
          "data-align": S.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: y(x) ? void 0 : "none"
          }
        }), {
          default: _(() => [
            I(M.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Pl = /* @__PURE__ */ $({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return te(), (t, n) => (A(), N(y(X), {
      as: t.as,
      "as-child": t.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: _(() => [
        I(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Bl = "data-radix-vue-collection-item", [xr, Ml] = he("CollectionProvider");
function Il(e = Bl) {
  const t = T(/* @__PURE__ */ new Map()), n = T(), r = Ml({
    collectionRef: n,
    itemMap: t,
    attrName: e
  }), { getItems: o } = Uo(r), s = B(() => Array.from(r.itemMap.value.values())), a = B(() => r.itemMap.value.size);
  return { getItems: o, reactiveItems: s, itemMapSize: a };
}
const Nl = $({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = xr(), { primitiveElement: r, currentElement: o } = wr();
    return J(o, () => {
      n.collectionRef.value = o.value;
    }), () => Ae(br, { ref: r }, t);
  }
}), Dl = $({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = xr(), { primitiveElement: o, currentElement: s } = wr();
    return de((a) => {
      if (s.value) {
        const i = Xn(s.value);
        r.itemMap.value.set(i, { ref: s.value, value: e.value }), a(() => r.itemMap.value.delete(i));
      }
    }), () => Ae(br, { ...n, [r.attrName]: "", ref: o }, t);
  }
});
function Uo(e) {
  const t = e ?? xr();
  return { getItems: () => {
    const n = t.collectionRef.value;
    if (!n)
      return [];
    const r = Array.from(n.querySelectorAll(`[${t.attrName}]`));
    return Array.from(t.itemMap.value.values()).sort(
      (o, s) => r.indexOf(o.ref) - r.indexOf(s.ref)
    );
  } };
}
function Ll(e) {
  const t = rn({
    nonce: T()
  });
  return B(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const Fl = "rovingFocusGroup.onEntryFocus", ql = { bubbles: !1, cancelable: !0 }, $l = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Vl(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function jl(e, t, n) {
  const r = Vl(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return $l[r];
}
function Ho(e, t = !1, n) {
  const r = (n == null ? void 0 : n.activeElement) ?? document.activeElement;
  for (const o of e)
    if (o === r || (o.focus({ preventScroll: t }), document.activeElement !== r))
      return;
}
function zl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const [Ul, Hl] = he("RovingFocusGroup"), Wl = /* @__PURE__ */ $({
  __name: "RovingFocusGroup",
  props: {
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: !1 },
    currentTabStopId: {},
    defaultCurrentTabStopId: {},
    preventScrollOnEntryFocus: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = n, { loop: s, orientation: a, dir: i } = Te(r), d = yr(i), c = We(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), l = T(!1), u = T(!1), f = T(0), { getItems: p } = Il();
    function m(h) {
      const v = !u.value;
      if (h.currentTarget && h.target === h.currentTarget && v && !l.value) {
        const x = new CustomEvent(Fl, ql);
        if (h.currentTarget.dispatchEvent(x), o("entryFocus", x), !x.defaultPrevented) {
          const b = p().map((E) => E.ref).filter((E) => E.dataset.disabled !== ""), C = b.find((E) => E.getAttribute("data-active") === "true"), S = b.find(
            (E) => E.id === c.value
          ), k = [C, S, ...b].filter(
            Boolean
          );
          Ho(k, r.preventScrollOnEntryFocus);
        }
      }
      u.value = !1;
    }
    function g() {
      setTimeout(() => {
        u.value = !1;
      }, 1);
    }
    return t({
      getItems: p
    }), Hl({
      loop: s,
      dir: d,
      orientation: a,
      currentTabStopId: c,
      onItemFocus: (h) => {
        c.value = h;
      },
      onItemShiftTab: () => {
        l.value = !0;
      },
      onFocusableItemAdd: () => {
        f.value++;
      },
      onFocusableItemRemove: () => {
        f.value--;
      }
    }), (h, v) => (A(), N(y(Nl), null, {
      default: _(() => [
        O(y(X), {
          tabindex: l.value || f.value === 0 ? -1 : 0,
          "data-orientation": y(a),
          as: h.as,
          "as-child": h.asChild,
          dir: y(d),
          style: { outline: "none" },
          onMousedown: v[0] || (v[0] = (x) => u.value = !0),
          onMouseup: g,
          onFocus: m,
          onBlur: v[1] || (v[1] = (x) => l.value = !1)
        }, {
          default: _(() => [
            I(h.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
}), Gl = /* @__PURE__ */ $({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: !0 },
    active: { type: Boolean, default: !0 },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = Ul(), r = B(() => t.tabStopId || vr()), o = B(
      () => n.currentTabStopId.value === r.value
    ), { getItems: s } = Uo(), { primitiveElement: a, currentElement: i } = wr(), d = B(() => {
      var l;
      return (l = i.value) == null ? void 0 : l.getRootNode();
    });
    Ce(() => {
      t.focusable && n.onFocusableItemAdd();
    }), tr(() => {
      t.focusable && n.onFocusableItemRemove();
    });
    function c(l) {
      if (l.key === "Tab" && l.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (l.target !== l.currentTarget)
        return;
      const u = jl(
        l,
        n.orientation.value,
        n.dir.value
      );
      if (u !== void 0) {
        if (l.metaKey || l.ctrlKey || l.altKey || !t.allowShiftKey && l.shiftKey)
          return;
        l.preventDefault();
        let f = [...s().map((p) => p.ref).filter((p) => p.dataset.disabled !== "")];
        if (u === "last")
          f.reverse();
        else if (u === "prev" || u === "next") {
          u === "prev" && f.reverse();
          const p = f.indexOf(
            l.currentTarget
          );
          f = n.loop.value ? zl(f, p + 1) : f.slice(p + 1);
        }
        ce(() => Ho(f, !1, d.value));
      }
    }
    return (l, u) => (A(), N(y(Dl), null, {
      default: _(() => [
        O(y(X), {
          ref_key: "primitiveElement",
          ref: a,
          tabindex: o.value ? 0 : -1,
          "data-orientation": y(n).orientation.value,
          "data-active": l.active,
          "data-disabled": l.focusable ? void 0 : "",
          as: l.as,
          "as-child": l.asChild,
          onMousedown: u[0] || (u[0] = (f) => {
            l.focusable ? y(n).onItemFocus(r.value) : f.preventDefault();
          }),
          onFocus: u[1] || (u[1] = (f) => y(n).onItemFocus(r.value)),
          onKeydown: c
        }, {
          default: _(() => [
            I(l.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), Kl = /* @__PURE__ */ $({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(e) {
    const t = e;
    return te(), (n, r) => (A(), N(y(X), G(t, {
      onMousedown: r[0] || (r[0] = (o) => {
        !o.defaultPrevented && o.detail > 1 && o.preventDefault();
      })
    }), {
      default: _(() => [
        I(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Rt = 100, [Jl, Xl] = he("ProgressRoot"), Sr = (e) => typeof e == "number";
function Yl(e, t) {
  return fr(e) || Sr(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Rt} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function Zl(e) {
  return Sr(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Rt}\`.`
  ), Rt);
}
const Ql = /* @__PURE__ */ $({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: Rt },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * Rt)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    te();
    const o = We(n, "modelValue", r, {
      passive: n.modelValue === void 0
    }), s = We(n, "max", r, {
      passive: n.max === void 0
    });
    J(
      () => o.value,
      async (i) => {
        const d = Yl(i, n.max);
        d !== i && (await ce(), o.value = d);
      },
      { immediate: !0 }
    ), J(
      () => n.max,
      (i) => {
        const d = Zl(n.max);
        d !== i && (s.value = d);
      },
      { immediate: !0 }
    );
    const a = B(() => fr(o.value) ? "indeterminate" : o.value === s.value ? "complete" : "loading");
    return Xl({
      modelValue: o,
      max: s,
      progressState: a
    }), (i, d) => (A(), N(y(X), {
      "as-child": i.asChild,
      as: i.as,
      "aria-valuemax": y(s),
      "aria-valuemin": 0,
      "aria-valuenow": Sr(y(o)) ? y(o) : void 0,
      "aria-valuetext": i.getValueLabel(y(o), y(s)),
      "aria-label": i.getValueLabel(y(o), y(s)),
      role: "progressbar",
      "data-state": a.value,
      "data-value": y(o) ?? void 0,
      "data-max": y(s)
    }, {
      default: _(() => [
        I(i.$slots, "default", { modelValue: y(o) })
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), eu = /* @__PURE__ */ $({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = Jl();
    return te(), (r, o) => {
      var s;
      return A(), N(y(X), G(t, {
        "data-state": y(n).progressState.value,
        "data-value": ((s = y(n).modelValue) == null ? void 0 : s.value) ?? void 0,
        "data-max": y(n).max.value
      }), {
        default: _(() => [
          I(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), [tu, nu] = he("RadioGroupRoot"), ru = /* @__PURE__ */ $({
  __name: "RadioGroupRoot",
  props: {
    modelValue: {},
    defaultValue: {},
    disabled: { type: Boolean, default: !1 },
    name: {},
    required: { type: Boolean, default: !1 },
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: !0 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o } = te(), s = We(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), { disabled: a, loop: i, orientation: d, name: c, required: l, dir: u } = Te(n), f = yr(u);
    return nu({
      modelValue: s,
      changeModelValue: (p) => {
        s.value = p;
      },
      disabled: a,
      loop: i,
      orientation: d,
      name: c == null ? void 0 : c.value,
      required: l
    }), (p, m) => (A(), N(y(Wl), {
      "as-child": "",
      orientation: y(d),
      dir: y(f),
      loop: y(i)
    }, {
      default: _(() => [
        O(y(X), {
          ref: y(o),
          role: "radiogroup",
          "data-disabled": y(a) ? "" : void 0,
          "as-child": p.asChild,
          as: p.as,
          required: y(l),
          "aria-orientation": y(d),
          "aria-required": y(l),
          dir: y(f),
          name: y(c)
        }, {
          default: _(() => [
            I(p.$slots, "default", { modelValue: y(s) })
          ]),
          _: 3
        }, 8, ["data-disabled", "as-child", "as", "required", "aria-orientation", "aria-required", "dir", "name"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
}), ou = ["value", "checked", "name", "disabled", "required"], su = /* @__PURE__ */ $({
  __name: "Radio",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean },
    checked: { type: Boolean, default: void 0 },
    name: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, r = We(n, "checked", t, {
      passive: n.checked === void 0
    }), { value: o } = Te(n), { forwardRef: s, currentElement: a } = te(), i = gr(a), d = B(() => {
      var l;
      return n.id && a.value ? ((l = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : l.innerText) ?? n.value : void 0;
    });
    function c(l) {
      r.value = !0, i.value && l.stopPropagation();
    }
    return (l, u) => (A(), N(y(X), G(l.$attrs, {
      id: l.id,
      ref: y(s),
      role: "radio",
      type: l.as === "button" ? "button" : void 0,
      as: l.as,
      "aria-checked": y(r),
      "aria-label": d.value,
      "as-child": l.asChild,
      disabled: l.disabled ? "" : void 0,
      "data-state": y(r) ? "checked" : "unchecked",
      "data-disabled": l.disabled ? "" : void 0,
      value: y(o),
      required: l.required,
      name: l.name,
      onClick: we(c, ["stop"])
    }), {
      default: _(() => [
        I(l.$slots, "default", { checked: y(r) }),
        y(i) ? (A(), V("input", {
          key: 0,
          type: "radio",
          tabindex: "-1",
          "aria-hidden": "true",
          value: y(o),
          checked: !!y(r),
          name: l.name,
          disabled: l.disabled,
          required: l.required,
          style: {
            transform: "translateX(-100%)",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
          }
        }, null, 8, ou)) : se("", !0)
      ]),
      _: 3
    }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]));
  }
}), [au, iu] = he("RadioGroupItem"), lu = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "RadioGroupItem",
  props: {
    id: {},
    value: {},
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean },
    name: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = te(), o = tu(), s = B(() => o.disabled.value || t.disabled), a = B(() => o.required.value || t.required), i = B(() => {
      var u;
      return ((u = o.modelValue) == null ? void 0 : u.value) === t.value;
    });
    iu({ disabled: s, checked: i });
    const d = T(!1), c = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    Gt("keydown", (u) => {
      c.includes(u.key) && (d.value = !0);
    }), Gt("keyup", () => {
      d.value = !1;
    });
    function l() {
      setTimeout(() => {
        var u;
        d.value && ((u = r.value) == null || u.click());
      }, 0);
    }
    return (u, f) => (A(), N(y(Gl), {
      checked: i.value,
      disabled: s.value,
      "as-child": "",
      focusable: !s.value,
      active: i.value
    }, {
      default: _(() => [
        O(su, G({ ...u.$attrs, ...t }, {
          ref: y(n),
          checked: i.value,
          required: a.value,
          disabled: s.value,
          "onUpdate:checked": f[0] || (f[0] = (p) => y(o).changeModelValue(u.value)),
          onKeydown: f[1] || (f[1] = ho(we(() => {
          }, ["prevent"]), ["enter"])),
          onFocus: l
        }), {
          default: _(() => [
            I(u.$slots, "default")
          ]),
          _: 3
        }, 16, ["checked", "required", "disabled"])
      ]),
      _: 3
    }, 8, ["checked", "disabled", "focusable", "active"]));
  }
}), uu = /* @__PURE__ */ $({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const { forwardRef: t } = te(), n = au();
    return (r, o) => (A(), N(y($o), {
      present: r.forceMount || y(n).checked.value
    }, {
      default: _(() => [
        O(y(X), G({
          ref: y(t),
          "data-state": y(n).checked.value ? "checked" : "unchecked",
          "data-disabled": y(n).disabled.value ? "" : void 0,
          "as-child": r.asChild,
          as: r.as
        }, r.$attrs), {
          default: _(() => [
            I(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), cu = ["default-value"], du = /* @__PURE__ */ $({
  __name: "BubbleSelect",
  props: {
    autocomplete: {},
    autofocus: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    multiple: { type: Boolean },
    name: {},
    required: { type: Boolean },
    size: {},
    value: {}
  },
  setup(e) {
    const t = e, { value: n } = Te(t), r = T();
    return (o, s) => (A(), N(y(Pl), { "as-child": "" }, {
      default: _(() => [
        yo(L("select", G({
          ref_key: "selectElement",
          ref: r
        }, t, {
          "onUpdate:modelValue": s[0] || (s[0] = (a) => dt(n) ? n.value = a : null),
          "default-value": y(n)
        }), [
          I(o.$slots, "default")
        ], 16, cu), [
          [zs, y(n)]
        ])
      ]),
      _: 3
    }));
  }
}), fu = {
  key: 0,
  value: ""
}, [yt, Wo] = he("SelectRoot"), [pu, mu] = he("SelectRoot"), hu = /* @__PURE__ */ $({
  __name: "SelectRoot",
  props: {
    open: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean },
    defaultValue: { default: "" },
    modelValue: { default: void 0 },
    dir: {},
    name: {},
    autocomplete: {},
    disabled: { type: Boolean },
    required: { type: Boolean }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = We(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), s = We(n, "open", r, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = T(), i = T(), d = T({
      x: 0,
      y: 0
    }), c = T(!1), { required: l, disabled: u, dir: f } = Te(n), p = yr(f);
    Wo({
      triggerElement: a,
      onTriggerChange: (v) => {
        a.value = v;
      },
      valueElement: i,
      onValueElementChange: (v) => {
        i.value = v;
      },
      valueElementHasChildren: c,
      onValueElementHasChildrenChange: (v) => {
        c.value = v;
      },
      contentId: "",
      modelValue: o,
      onValueChange: (v) => {
        o.value = v;
      },
      open: s,
      required: l,
      onOpenChange: (v) => {
        s.value = v;
      },
      dir: p,
      triggerPointerDownPosRef: d,
      disabled: u
    });
    const m = gr(a), g = T(/* @__PURE__ */ new Set()), h = B(() => Array.from(g.value).map((v) => {
      var x;
      return (x = v.props) == null ? void 0 : x.value;
    }).join(";"));
    return mu({
      onNativeOptionAdd: (v) => {
        g.value.add(v);
      },
      onNativeOptionRemove: (v) => {
        g.value.delete(v);
      }
    }), (v, x) => (A(), N(y(_l), null, {
      default: _(() => [
        I(v.$slots, "default", {
          modelValue: y(o),
          open: y(s)
        }),
        y(m) ? (A(), N(du, G({ key: h.value }, v.$attrs, {
          "aria-hidden": "true",
          tabindex: "-1",
          required: y(l),
          name: v.name,
          autocomplete: v.autocomplete,
          disabled: y(u),
          value: y(o),
          onChange: x[0] || (x[0] = (b) => o.value = b.target.value)
        }), {
          default: _(() => [
            y(o) === void 0 ? (A(), V("option", fu)) : se("", !0),
            (A(!0), V(Re, null, Et(Array.from(g.value), (b) => (A(), N(pt(b), G({ ref_for: !0 }, b.props, {
              key: b.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : se("", !0)
      ]),
      _: 3
    }));
  }
}), yu = [" ", "Enter", "ArrowUp", "ArrowDown"], gu = [" ", "Enter"], be = 10;
function vu(e) {
  return e === "" || fr(e);
}
const bu = /* @__PURE__ */ $({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, n = yt(), r = B(() => {
      var p;
      return ((p = n.disabled) == null ? void 0 : p.value) || t.disabled;
    }), { forwardRef: o, currentElement: s } = te();
    n.contentId || (n.contentId = vr(void 0, "radix-vue-select-content")), Ce(() => {
      n.triggerElement = s;
    });
    const { injectCollection: a } = on(), i = a(), { search: d, handleTypeaheadSearch: c, resetTypeahead: l } = qo(i);
    function u() {
      r.value || (n.onOpenChange(!0), l());
    }
    function f(p) {
      u(), n.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, m) => (A(), N(y(El), { "as-child": "" }, {
      default: _(() => {
        var g, h, v, x;
        return [
          O(y(X), {
            ref: y(o),
            role: "combobox",
            type: p.as === "button" ? "button" : void 0,
            "aria-controls": y(n).contentId,
            "aria-expanded": y(n).open.value || !1,
            "aria-required": (g = y(n).required) == null ? void 0 : g.value,
            "aria-autocomplete": "none",
            disabled: r.value,
            dir: (h = y(n)) == null ? void 0 : h.dir.value,
            "data-state": (v = y(n)) != null && v.open.value ? "open" : "closed",
            "data-disabled": r.value ? "" : void 0,
            "data-placeholder": y(vu)((x = y(n).modelValue) == null ? void 0 : x.value) ? "" : void 0,
            "as-child": p.asChild,
            as: p.as,
            onClick: m[0] || (m[0] = (b) => {
              var C;
              (C = b == null ? void 0 : b.currentTarget) == null || C.focus();
            }),
            onPointerdown: m[1] || (m[1] = (b) => {
              if (b.pointerType === "touch")
                return b.preventDefault();
              const C = b.target;
              C.hasPointerCapture(b.pointerId) && C.releasePointerCapture(b.pointerId), b.button === 0 && b.ctrlKey === !1 && (f(b), b.preventDefault());
            }),
            onPointerup: m[2] || (m[2] = we(
              (b) => {
                b.pointerType === "touch" && f(b);
              },
              ["prevent"]
            )),
            onKeydown: m[3] || (m[3] = (b) => {
              const C = y(d) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && C && b.key === " " || (y(c)(b.key), y(yu).includes(b.key) && (u(), b.preventDefault()));
            })
          }, {
            default: _(() => [
              I(p.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), wu = /* @__PURE__ */ $({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), N(y(ul), Yn(Zn(t)), {
      default: _(() => [
        I(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [Cr, xu] = he("SelectItemAlignedPosition"), Su = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, { injectCollection: o } = on(), s = yt(), a = rt(), i = o(), d = T(!1), c = T(!0), l = T(), { forwardRef: u, currentElement: f } = te(), { viewport: p, selectedItem: m, selectedItemText: g, focusSelectedItem: h } = a;
    function v() {
      if (s.triggerElement.value && s.valueElement.value && l.value && f.value && p != null && p.value && m != null && m.value && g != null && g.value) {
        const C = s.triggerElement.value.getBoundingClientRect(), S = f.value.getBoundingClientRect(), k = s.valueElement.value.getBoundingClientRect(), E = g.value.getBoundingClientRect();
        if (s.dir.value !== "rtl") {
          const Je = E.left - S.left, Be = k.left - Je, wt = C.left - Be, Xe = C.width + wt, yn = Math.max(Xe, S.width), gn = window.innerWidth - be, vn = $r(Be, be, Math.max(be, gn - yn));
          l.value.style.minWidth = `${Xe}px`, l.value.style.left = `${vn}px`;
        } else {
          const Je = S.right - E.right, Be = window.innerWidth - k.right - Je, wt = window.innerWidth - C.right - Be, Xe = C.width + wt, yn = Math.max(Xe, S.width), gn = window.innerWidth - be, vn = $r(
            Be,
            be,
            Math.max(be, gn - yn)
          );
          l.value.style.minWidth = `${Xe}px`, l.value.style.right = `${vn}px`;
        }
        const R = i.value, P = window.innerHeight - be * 2, M = p.value.scrollHeight, j = window.getComputedStyle(f.value), D = Number.parseInt(
          j.borderTopWidth,
          10
        ), Z = Number.parseInt(j.paddingTop, 10), z = Number.parseInt(
          j.borderBottomWidth,
          10
        ), ie = Number.parseInt(
          j.paddingBottom,
          10
        ), U = D + Z + M + ie + z, H = Math.min(
          m.value.offsetHeight * 5,
          U
        ), le = window.getComputedStyle(p.value), oe = Number.parseInt(le.paddingTop, 10), ot = Number.parseInt(
          le.paddingBottom,
          10
        ), fe = C.top + C.height / 2 - be, Ds = P - fe, hn = m.value.offsetHeight / 2, Ls = m.value.offsetTop + hn, Nt = D + Z + Ls, Fs = U - Nt;
        if (Nt <= fe) {
          const Je = m.value === R[R.length - 1];
          l.value.style.bottom = "0px";
          const Be = f.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, wt = Math.max(
            Ds,
            hn + (Je ? ot : 0) + Be + z
          ), Xe = Nt + wt;
          l.value.style.height = `${Xe}px`;
        } else {
          const Je = m.value === R[0];
          l.value.style.top = "0px";
          const Be = Math.max(
            fe,
            D + p.value.offsetTop + (Je ? oe : 0) + hn
          ) + Fs;
          l.value.style.height = `${Be}px`, p.value.scrollTop = Nt - fe + p.value.offsetTop;
        }
        l.value.style.margin = `${be}px 0`, l.value.style.minHeight = `${H}px`, l.value.style.maxHeight = `${P}px`, r("placed"), requestAnimationFrame(() => d.value = !0);
      }
    }
    const x = T("");
    Ce(async () => {
      await ce(), v(), f.value && (x.value = window.getComputedStyle(f.value).zIndex);
    });
    function b(C) {
      C && c.value === !0 && (v(), h == null || h(), c.value = !1);
    }
    return xu({
      contentWrapper: l,
      shouldExpandOnScrollRef: d,
      onScrollButtonChange: b
    }), (C, S) => (A(), V("div", {
      ref_key: "contentWrapperElement",
      ref: l,
      style: Qt({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: x.value
      })
    }, [
      O(y(X), G({
        ref: y(u),
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...C.$attrs, ...n }), {
        default: _(() => [
          I(C.$slots, "default")
        ]),
        _: 3
      }, 16)
    ], 4));
  }
}), Cu = /* @__PURE__ */ $({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: be },
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = Ke(e);
    return (n, r) => (A(), N(y(Tl), G(y(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: _(() => [
        I(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), gt = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [rt, _u] = he("SelectContent"), Eu = /* @__PURE__ */ $({
  __name: "SelectContentImpl",
  props: {
    position: { default: "item-aligned" },
    bodyLock: { type: Boolean, default: !0 },
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = yt();
    Xi(), Wi(n.bodyLock);
    const { createCollection: s } = on(), a = T();
    tl(a);
    const i = s(a), { search: d, handleTypeaheadSearch: c } = qo(i), l = T(), u = T(), f = T(), p = T(!1), m = T(!1);
    function g() {
      u.value && a.value && Wr([u.value, a.value]);
    }
    J(p, () => {
      g();
    });
    const { onOpenChange: h, triggerPointerDownPosRef: v } = o;
    de((S) => {
      if (!a.value)
        return;
      let k = { x: 0, y: 0 };
      const E = (P) => {
        var M, j;
        k = {
          x: Math.abs(
            Math.round(P.pageX) - (((M = v.value) == null ? void 0 : M.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(P.pageY) - (((j = v.value) == null ? void 0 : j.y) ?? 0)
          )
        };
      }, R = (P) => {
        var M;
        P.pointerType !== "touch" && (k.x <= 10 && k.y <= 10 ? P.preventDefault() : (M = a.value) != null && M.contains(P.target) || h(!1), document.removeEventListener("pointermove", E), v.value = null);
      };
      v.value !== null && (document.addEventListener("pointermove", E), document.addEventListener("pointerup", R, {
        capture: !0,
        once: !0
      })), S(() => {
        document.removeEventListener("pointermove", E), document.removeEventListener("pointerup", R, {
          capture: !0
        });
      });
    });
    function x(S) {
      const k = S.ctrlKey || S.altKey || S.metaKey;
      if (S.key === "Tab" && S.preventDefault(), !k && S.key.length === 1 && c(S.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(S.key)) {
        let E = i.value;
        if (["ArrowUp", "End"].includes(S.key) && (E = E.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(S.key)) {
          const R = S.target, P = E.indexOf(R);
          E = E.slice(P + 1);
        }
        setTimeout(() => Wr(E)), S.preventDefault();
      }
    }
    const b = B(() => n.position === "popper" ? n : {}), C = Ke(b.value);
    return _u({
      content: a,
      viewport: l,
      onViewportChange: (S) => {
        l.value = S;
      },
      itemRefCallback: (S, k, E) => {
        var R, P;
        const M = !m.value && !E;
        (((R = o.modelValue) == null ? void 0 : R.value) !== void 0 && ((P = o.modelValue) == null ? void 0 : P.value) === k || M) && (u.value = S, M && (m.value = !0));
      },
      selectedItem: u,
      selectedItemText: f,
      onItemLeave: () => {
        var S;
        (S = a.value) == null || S.focus();
      },
      itemTextRefCallback: (S, k, E) => {
        var R, P;
        const M = !m.value && !E;
        (((R = o.modelValue) == null ? void 0 : R.value) !== void 0 && ((P = o.modelValue) == null ? void 0 : P.value) === k || M) && (f.value = S);
      },
      focusSelectedItem: g,
      position: n.position,
      isPositioned: p,
      searchRef: d
    }), (S, k) => (A(), N(y(Sl), {
      "as-child": "",
      onMountAutoFocus: k[6] || (k[6] = we(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: k[7] || (k[7] = (E) => {
        var R;
        r("closeAutoFocus", E), !E.defaultPrevented && ((R = y(o).triggerElement.value) == null || R.focus({ preventScroll: !0 }), E.preventDefault());
      })
    }, {
      default: _(() => [
        O(y(ml), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: k[2] || (k[2] = we(() => {
          }, ["prevent"])),
          onDismiss: k[3] || (k[3] = (E) => y(o).onOpenChange(!1)),
          onEscapeKeyDown: k[4] || (k[4] = (E) => r("escapeKeyDown", E)),
          onPointerDownOutside: k[5] || (k[5] = (E) => r("pointerDownOutside", E))
        }, {
          default: _(() => [
            (A(), N(pt(
              S.position === "popper" ? Cu : Su
            ), G({ ...S.$attrs, ...y(C) }, {
              id: y(o).contentId,
              ref: (E) => {
                a.value = y(Fe)(E);
              },
              role: "listbox",
              "data-state": y(o).open.value ? "open" : "closed",
              dir: y(o).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: k[0] || (k[0] = we(() => {
              }, ["prevent"])),
              onPlaced: k[1] || (k[1] = (E) => p.value = !0),
              onKeydown: x
            }), {
              default: _(() => [
                I(S.$slots, "default")
              ]),
              _: 3
            }, 16, ["id", "data-state", "dir", "onKeydown"]))
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), Au = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return Wo(e.context), (t, n) => I(t.$slots, "default");
  }
}), ku = { key: 1 }, Ru = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean },
    position: {},
    bodyLock: { type: Boolean },
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, r = Pt(n, t), o = yt(), s = T();
    Ce(() => {
      s.value = new DocumentFragment();
    });
    const a = T(), i = B(() => n.forceMount || o.open.value);
    return (d, c) => {
      var l;
      return i.value ? (A(), N(y($o), {
        key: 0,
        ref_key: "presenceRef",
        ref: a,
        present: !0
      }, {
        default: _(() => [
          O(Eu, Yn(Zn({ ...y(r), ...d.$attrs })), {
            default: _(() => [
              I(d.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !((l = a.value) != null && l.present) && s.value ? (A(), V("div", ku, [
        (A(), N(Qn, { to: s.value }, [
          O(Au, { context: y(o) }, {
            default: _(() => [
              I(d.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : se("", !0);
    };
  }
}), [Go, Ou] = he("SelectItem"), Tu = /* @__PURE__ */ $({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { disabled: n } = Te(t), r = yt(), o = rt(gt), { forwardRef: s, currentElement: a } = te(), i = B(() => {
      var g;
      return ((g = r.modelValue) == null ? void 0 : g.value) === t.value;
    }), d = T(!1), c = T(t.textValue ?? ""), l = vr(void 0, "radix-vue-select-item-text");
    async function u(g) {
      await ce(), !(g != null && g.defaultPrevented) && (n.value || (r.onValueChange(t.value), r.onOpenChange(!1)));
    }
    async function f(g) {
      var h;
      await ce(), !g.defaultPrevented && (n.value ? (h = o.onItemLeave) == null || h.call(o) : g.currentTarget.focus({ preventScroll: !0 }));
    }
    async function p(g) {
      var h;
      await ce(), !g.defaultPrevented && g.currentTarget === document.activeElement && ((h = o.onItemLeave) == null || h.call(o));
    }
    async function m(g) {
      var h;
      await ce(), !(g.defaultPrevented || ((h = o.searchRef) == null ? void 0 : h.value) !== "" && g.key === " ") && (gu.includes(g.key) && u(), g.key === " " && g.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return Ce(() => {
      a.value && o.itemRefCallback(
        a.value,
        t.value,
        t.disabled
      );
    }), Ou({
      value: t.value,
      disabled: n,
      textId: l,
      isSelected: i,
      onItemTextChange: (g) => {
        c.value = ((c.value || (g == null ? void 0 : g.textContent)) ?? "").trim();
      }
    }), (g, h) => (A(), N(y(X), {
      ref: y(s),
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": y(l),
      "data-highlighted": d.value ? "" : void 0,
      "aria-selected": i.value,
      "data-state": i.value ? "checked" : "unchecked",
      "aria-disabled": y(n) || void 0,
      "data-disabled": y(n) ? "" : void 0,
      tabindex: y(n) ? void 0 : -1,
      as: g.as,
      "as-child": g.asChild,
      onFocus: h[0] || (h[0] = (v) => d.value = !0),
      onBlur: h[1] || (h[1] = (v) => d.value = !1),
      onPointerup: u,
      onPointerdown: h[2] || (h[2] = (v) => {
        v.currentTarget.focus({ preventScroll: !0 });
      }),
      onTouchend: h[3] || (h[3] = we(() => {
      }, ["prevent", "stop"])),
      onPointermove: f,
      onPointerleave: p,
      onKeydown: m
    }, {
      default: _(() => [
        I(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), Pu = /* @__PURE__ */ $({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = Go();
    return (r, o) => y(n).isSelected.value ? (A(), N(y(X), G({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: _(() => [
        I(r.$slots, "default")
      ]),
      _: 3
    }, 16)) : se("", !0);
  }
}), Bu = /* @__PURE__ */ $({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = yt(), r = rt(gt), o = pu(), s = Go(), { forwardRef: a, currentElement: i } = te(), d = B(() => {
      var c;
      return Ae("option", {
        key: s.value,
        value: s.value,
        disabled: s.disabled.value,
        textContent: (c = i.value) == null ? void 0 : c.textContent
      });
    });
    return Ce(() => {
      i.value && (s.onItemTextChange(i.value), r.itemTextRefCallback(
        i.value,
        s.value,
        s.disabled.value
      ), o.onNativeOptionAdd(d.value));
    }), er(() => {
      o.onNativeOptionRemove(d.value);
    }), (c, l) => (A(), V(Re, null, [
      O(y(X), G({
        id: y(s).textId,
        ref: y(a)
      }, { ...t, ...c.$attrs }, { "data-item-text": "" }), {
        default: _(() => [
          I(c.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      y(s).isSelected.value && y(n).valueElement.value && !y(n).valueElementHasChildren.value ? (A(), N(Qn, {
        key: 0,
        to: y(n).valueElement.value
      }, [
        I(c.$slots, "default")
      ], 8, ["to"])) : se("", !0)
    ], 64));
  }
}), Mu = /* @__PURE__ */ $({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { nonce: n } = Te(t), r = Ll(n), o = rt(gt), s = o.position === "item-aligned" ? Cr() : void 0, { forwardRef: a, currentElement: i } = te();
    Ce(() => {
      o == null || o.onViewportChange(i.value);
    });
    const d = T(0);
    function c(l) {
      const u = l.currentTarget, { shouldExpandOnScrollRef: f, contentWrapper: p } = s ?? {};
      if (f != null && f.value && p != null && p.value) {
        const m = Math.abs(d.value - u.scrollTop);
        if (m > 0) {
          const g = window.innerHeight - be * 2, h = Number.parseFloat(
            p.value.style.minHeight
          ), v = Number.parseFloat(p.value.style.height), x = Math.max(h, v);
          if (x < g) {
            const b = x + m, C = Math.min(g, b), S = b - C;
            p.value.style.height = `${C}px`, p.value.style.bottom === "0px" && (u.scrollTop = S > 0 ? S : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      d.value = u.scrollTop;
    }
    return (l, u) => (A(), V(Re, null, [
      O(y(X), G({
        ref: y(a),
        "data-radix-select-viewport": "",
        role: "presentation"
      }, { ...l.$attrs, ...t }, {
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "hidden auto"
        },
        onScroll: c
      }), {
        default: _(() => [
          I(l.$slots, "default")
        ]),
        _: 3
      }, 16),
      O(y(X), {
        as: "style",
        nonce: y(r)
      }, {
        default: _(() => [
          Q(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
}), Ko = /* @__PURE__ */ $({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(e, { emit: t }) {
    const n = t, { injectCollection: r } = on(), o = r(), s = rt(gt), a = T(null);
    function i() {
      a.value !== null && (window.clearInterval(a.value), a.value = null);
    }
    de(() => {
      const l = o.value.find(
        (u) => u === document.activeElement
      );
      l == null || l.scrollIntoView({ block: "nearest" });
    });
    function d() {
      a.value === null && (a.value = window.setInterval(() => {
        n("autoScroll");
      }, 50));
    }
    function c() {
      var l;
      (l = s.onItemLeave) == null || l.call(s), a.value === null && (a.value = window.setInterval(() => {
        n("autoScroll");
      }, 50));
    }
    return er(() => i()), (l, u) => {
      var f;
      return A(), N(y(X), G({
        "aria-hidden": "true",
        style: {
          flexShrink: 0
        }
      }, (f = l.$parent) == null ? void 0 : f.$props, {
        onPointerdown: d,
        onPointermove: c,
        onPointerleave: u[0] || (u[0] = () => {
          i();
        })
      }), {
        default: _(() => [
          I(l.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
}), Iu = /* @__PURE__ */ $({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = rt(gt), n = t.position === "item-aligned" ? Cr() : void 0, { forwardRef: r, currentElement: o } = te(), s = T(!1);
    return de((a) => {
      var i, d;
      if ((i = t.viewport) != null && i.value && (d = t.isPositioned) != null && d.value) {
        let c = function() {
          s.value = l.scrollTop > 0;
        };
        const l = t.viewport.value;
        c(), l.addEventListener("scroll", c), a(() => l.removeEventListener("scroll", c));
      }
    }), J(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (a, i) => s.value ? (A(), N(Ko, {
      key: 0,
      ref: y(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = y(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop - c.value.offsetHeight);
      })
    }, {
      default: _(() => [
        I(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : se("", !0);
  }
}), Nu = /* @__PURE__ */ $({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = rt(gt), n = t.position === "item-aligned" ? Cr() : void 0, { forwardRef: r, currentElement: o } = te(), s = T(!1);
    return de((a) => {
      var i, d;
      if ((i = t.viewport) != null && i.value && (d = t.isPositioned) != null && d.value) {
        let c = function() {
          const u = l.scrollHeight - l.clientHeight;
          s.value = Math.ceil(l.scrollTop) < u;
        };
        const l = t.viewport.value;
        c(), l.addEventListener("scroll", c), a(() => l.removeEventListener("scroll", c));
      }
    }), J(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (a, i) => s.value ? (A(), N(Ko, {
      key: 0,
      ref: y(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = y(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop + c.value.offsetHeight);
      })
    }, {
      default: _(() => [
        I(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : se("", !0);
  }
}), Du = /* @__PURE__ */ $({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return (t, n) => (A(), N(y(X), {
      "aria-hidden": "true",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: _(() => [
        I(t.$slots, "default", {}, () => [
          Q("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Lu() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Lu();
const Fu = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [qu, $u] = he("SwitchRoot"), Vu = /* @__PURE__ */ $({
  __name: "SwitchRoot",
  props: {
    defaultChecked: { type: Boolean },
    checked: { type: Boolean, default: void 0 },
    disabled: { type: Boolean },
    required: { type: Boolean },
    name: {},
    id: {},
    value: { default: "on" },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, r = t, { disabled: o } = Te(n), s = We(n, "checked", r, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function a() {
      o.value || (s.value = !s.value);
    }
    const { forwardRef: i, currentElement: d } = te(), c = gr(d), l = B(() => {
      var u;
      return n.id && d.value ? (u = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : u.innerText : void 0;
    });
    return $u({
      checked: s,
      toggleCheck: a,
      disabled: o
    }), (u, f) => (A(), V(Re, null, [
      O(y(X), G(u.$attrs, {
        id: u.id,
        ref: y(i),
        role: "switch",
        type: u.as === "button" ? "button" : void 0,
        value: u.value,
        "aria-label": u.$attrs["aria-label"] || l.value,
        "aria-checked": y(s),
        "aria-required": u.required,
        "data-state": y(s) ? "checked" : "unchecked",
        "data-disabled": y(o) ? "" : void 0,
        "as-child": u.asChild,
        as: u.as,
        disabled: y(o),
        onClick: a,
        onKeydown: ho(we(a, ["prevent"]), ["enter"])
      }), {
        default: _(() => [
          I(u.$slots, "default", { checked: y(s) })
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      y(c) ? (A(), V("input", {
        key: 0,
        type: "checkbox",
        name: u.name,
        tabindex: "-1",
        "aria-hidden": "true",
        disabled: y(o),
        required: u.required,
        value: u.value,
        checked: !!y(s),
        "data-state": y(s) ? "checked" : "unchecked",
        "data-disabled": y(o) ? "" : void 0,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, Fu)) : se("", !0)
    ], 64));
  }
}), ju = /* @__PURE__ */ $({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = qu();
    return te(), (n, r) => {
      var o;
      return A(), N(y(X), {
        "data-state": (o = y(t).checked) != null && o.value ? "checked" : "unchecked",
        "data-disabled": y(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: _(() => [
          I(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
}), zu = {
  __name: "Select",
  props: {
    open: { type: Boolean, required: !1 },
    defaultOpen: { type: Boolean, required: !1 },
    defaultValue: { type: String, required: !1 },
    modelValue: { type: String, required: !1 },
    dir: { type: String, required: !1 },
    name: { type: String, required: !1 },
    autocomplete: { type: String, required: !1 },
    disabled: { type: Boolean, required: !1 },
    required: { type: Boolean, required: !1 }
  },
  emits: ["update:modelValue", "update:open"],
  setup(e, { emit: t }) {
    const o = Pt(e, t);
    return (s, a) => (A(), N(y(hu), Yn(Zn(y(o))), {
      default: _(() => [
        I(s.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
};
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var $t = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hu = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: s, class: a, ...i }, { slots: d }) => Ae(
  "svg",
  {
    ...$t,
    width: e || $t.width,
    height: e || $t.height,
    stroke: r || $t.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${Uu(s ?? "icon")}`],
    ...i
  },
  [...o.map((c) => Ae(...c)), ...d.default ? [d.default()] : []]
);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = (e, t) => (n, { slots: r }) => Ae(
  Hu,
  {
    ...n,
    iconNode: t,
    name: e
  },
  r
);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wu = re("ArrowLeftIcon", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gu = re("ArrowRightIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jo = re("BikeIcon", [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5", key: "15x4ox" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5", key: "1noe27" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2", key: "1npguv" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xo = re("BusIcon", [
  ["path", { d: "M8 6v6", key: "18i7km" }],
  ["path", { d: "M15 6v6", key: "1sg6z9" }],
  ["path", { d: "M2 12h19.6", key: "de5uta" }],
  [
    "path",
    {
      d: "M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",
      key: "1wwztk"
    }
  ],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }],
  ["path", { d: "M9 18h5", key: "lrx6i" }],
  ["circle", { cx: "16", cy: "18", r: "2", key: "1v4tcr" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = re("CarIcon", [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ku = re("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yo = re("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ju = re("ChevronUpIcon", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xu = re("CircleAlertIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yu = re("CircleIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zu = re("DropletIcon", [
  [
    "path",
    {
      d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
      key: "c7niix"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qu = re("FootprintsIcon", [
  [
    "path",
    {
      d: "M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z",
      key: "1dudjm"
    }
  ],
  [
    "path",
    {
      d: "M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z",
      key: "l2t8xc"
    }
  ],
  ["path", { d: "M16 17h4", key: "1dejxt" }],
  ["path", { d: "M4 13h4", key: "1bwh8b" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = re("FuelIcon", [
  ["line", { x1: "3", x2: "15", y1: "22", y2: "22", key: "xegly4" }],
  ["line", { x1: "4", x2: "14", y1: "9", y2: "9", key: "xcnuvu" }],
  ["path", { d: "M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18", key: "16j0yd" }],
  [
    "path",
    {
      d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5",
      key: "7cu91f"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tc = re("LeafIcon", [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zo = re("TramFrontIcon", [
  ["rect", { width: "16", height: "16", x: "4", y: "3", rx: "2", key: "1wxw4b" }],
  ["path", { d: "M4 11h16", key: "mpoxn0" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "m8 19-2 3", key: "13i0xs" }],
  ["path", { d: "m18 22-2-3", key: "1p0ohu" }],
  ["path", { d: "M8 15h.01", key: "a7atzg" }],
  ["path", { d: "M16 15h.01", key: "rnfrdf" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nc = re("TreesIcon", [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", key: "1l6gj6" }],
  ["path", { d: "M7 16v6", key: "1a82de" }],
  ["path", { d: "M13 19v3", key: "13sx9i" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
      key: "1sj9kv"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rc = re("ZapIcon", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), oc = {
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = Ke(n);
    return (o, s) => (A(), N(y(bu), G(y(r), {
      class: y(Y)(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start",
        t.class
      )
    }), {
      default: _(() => [
        I(o.$slots, "default"),
        O(y(Du), { "as-child": "" }, {
          default: _(() => [
            O(y(Yo), { class: "w-4 h-4 opacity-50 shrink-0" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, sc = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, ac = {
  __name: "SelectItem",
  props: {
    value: { type: String, required: !0 },
    disabled: { type: Boolean, required: !1 },
    textValue: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = Ke(n);
    return (o, s) => (A(), N(y(Tu), G(y(r), {
      class: y(Y)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: _(() => [
        L("span", sc, [
          O(y(Pu), null, {
            default: _(() => [
              O(y(Ku), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        O(y(Bu), null, {
          default: _(() => [
            I(o.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, ic = {
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = Ke(n);
    return (o, s) => (A(), N(y(Nu), G(y(r), {
      class: y(Y)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: _(() => [
        I(o.$slots, "default", {}, () => [
          O(y(Yo), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, lc = {
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = Ke(n);
    return (o, s) => (A(), N(y(Iu), G(y(r), {
      class: y(Y)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: _(() => [
        I(o.$slots, "default", {}, () => [
          O(y(Ju), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, uc = /* @__PURE__ */ Object.assign({
  inheritAttrs: !1
}, {
  __name: "SelectContent",
  props: {
    forceMount: { type: Boolean, required: !1 },
    position: { type: String, required: !1, default: "popper" },
    bodyLock: { type: Boolean, required: !1 },
    side: { type: null, required: !1 },
    sideOffset: { type: Number, required: !1 },
    align: { type: null, required: !1 },
    alignOffset: { type: Number, required: !1 },
    avoidCollisions: { type: Boolean, required: !1 },
    collisionBoundary: { type: null, required: !1 },
    collisionPadding: { type: [Number, Object], required: !1 },
    arrowPadding: { type: Number, required: !1 },
    sticky: { type: String, required: !1 },
    hideWhenDetached: { type: Boolean, required: !1 },
    updatePositionStrategy: { type: String, required: !1 },
    prioritizePosition: { type: Boolean, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  emits: [
    "closeAutoFocus",
    "escapeKeyDown",
    "pointerDownOutside"
  ],
  setup(e, { emit: t }) {
    const n = e, r = t, o = B(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Pt(o, r);
    return (a, i) => (A(), N(y(wu), null, {
      default: _(() => [
        O(y(Ru), G({ ...y(s), ...a.$attrs }, {
          class: y(Y)(
            "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: _(() => [
            O(y(lc)),
            O(y(Mu), {
              class: ne(
                y(Y)(
                  "p-1",
                  e.position === "popper" && "h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"
                )
              )
            }, {
              default: _(() => [
                I(a.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"]),
            O(y(ic))
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), cc = {
  __name: "CardFooter",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(y(Y)("flex items-center p-6 pt-0", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, Gr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Kr = wo, Qo = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Kr(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], u = s == null ? void 0 : s[c];
    if (l === null) return null;
    const f = Gr(l) || Gr(u);
    return o[c][f];
  }), i = n && Object.entries(n).reduce((c, l) => {
    let [u, f] = l;
    return f === void 0 || (c[u] = f), c;
  }, {}), d = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: u, className: f, ...p } = l;
    return Object.entries(p).every((m) => {
      let [g, h] = m;
      return Array.isArray(h) ? h.includes({
        ...s,
        ...i
      }[g]) : {
        ...s,
        ...i
      }[g] === h;
    }) ? [
      ...c,
      u,
      f
    ] : c;
  }, []);
  return Kr(e, a, d, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, dc = Qo(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), sn = {
  __name: "Button",
  props: {
    variant: { type: null, required: !1 },
    size: { type: null, required: !1 },
    class: { type: null, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1, default: "button" }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), N(y(X), {
      as: e.as,
      "as-child": e.asChild,
      class: ne(y(Y)(y(dc)({ variant: e.variant, size: e.size }), t.class))
    }, {
      default: _(() => [
        I(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}, an = {
  __name: "Label",
  props: {
    for: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (A(), N(y(Kl), G(n.value, {
      class: y(Y)(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t.class
      )
    }), {
      default: _(() => [
        I(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
};
function es(e) {
  return Xt() ? (Yt(e), !0) : !1;
}
const fc = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const pc = (e) => typeof e < "u", mc = (e) => e != null, An = () => {
};
function hc(e, t = !1, n = "Timeout") {
  return new Promise((r, o) => {
    setTimeout(t ? () => o(n) : r, e);
  });
}
function ts(e) {
  return e;
}
function yc(e) {
  return Array.isArray(e) ? e : [e];
}
const ns = fc ? window : void 0;
function kn(e) {
  var t;
  const n = ue(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function gc() {
  const e = T(!1), t = Le();
  return t && Ce(() => {
    e.value = !0;
  }, t), e;
}
function vc(e) {
  const t = gc();
  return B(() => (t.value, !!e()));
}
function bc(e) {
  return JSON.parse(JSON.stringify(e));
}
function wc(e, t, n = {}) {
  const {
    root: r,
    rootMargin: o = "0px",
    threshold: s = 0,
    window: a = ns,
    immediate: i = !0
  } = n, d = vc(() => a && "IntersectionObserver" in a), c = B(() => {
    const m = ue(e);
    return yc(m).map(kn).filter(mc);
  });
  let l = An;
  const u = T(i), f = d.value ? J(
    () => [c.value, kn(r), u.value],
    ([m, g]) => {
      if (l(), !u.value || !m.length)
        return;
      const h = new IntersectionObserver(
        t,
        {
          root: kn(g),
          rootMargin: o,
          threshold: s
        }
      );
      m.forEach((v) => v && h.observe(v)), l = () => {
        h.disconnect(), l = An;
      };
    },
    { immediate: i, flush: "post" }
  ) : An, p = () => {
    l(), f(), u.value = !1;
  };
  return es(p), {
    isSupported: d,
    isActive: u,
    pause() {
      l(), u.value = !1;
    },
    resume() {
      u.value = !0;
    },
    stop: p
  };
}
function xc(e, t = {}) {
  const {
    window: n = ns,
    scrollTarget: r,
    threshold: o = 0,
    rootMargin: s
  } = t, a = T(!1);
  return wc(
    e,
    (i) => {
      let d = a.value, c = 0;
      for (const l of i)
        l.time >= c && (c = l.time, d = l.isIntersecting);
      a.value = d;
    },
    {
      root: r,
      window: n,
      threshold: o,
      rootMargin: ue(s)
    }
  ), a;
}
const Sc = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
}, Cc = /* @__PURE__ */ Object.assign({}, { linear: ts }, Sc);
function _c([e, t, n, r]) {
  const o = (l, u) => 1 - 3 * u + 3 * l, s = (l, u) => 3 * u - 6 * l, a = (l) => 3 * l, i = (l, u, f) => ((o(u, f) * l + s(u, f)) * l + a(u)) * l, d = (l, u, f) => 3 * o(u, f) * l * l + 2 * s(u, f) * l + a(u), c = (l) => {
    let u = l;
    for (let f = 0; f < 4; ++f) {
      const p = d(u, e, n);
      if (p === 0)
        return u;
      const m = i(u, e, n) - l;
      u -= m / p;
    }
    return u;
  };
  return (l) => e === t && n === r ? l : i(c(l), t, r);
}
function Jr(e, t, n) {
  return e + n * (t - e);
}
function Rn(e) {
  return (typeof e == "number" ? [e] : e) || [];
}
function Ec(e, t, n, r = {}) {
  var o, s;
  const a = ue(t), i = ue(n), d = Rn(a), c = Rn(i), l = (o = ue(r.duration)) != null ? o : 1e3, u = Date.now(), f = Date.now() + l, p = typeof r.transition == "function" ? r.transition : (s = ue(r.transition)) != null ? s : ts, m = typeof p == "function" ? p : _c(p);
  return new Promise((g) => {
    e.value = a;
    const h = () => {
      var v;
      if ((v = r.abort) != null && v.call(r)) {
        g();
        return;
      }
      const x = Date.now(), b = m((x - u) / l), C = Rn(e.value).map((S, k) => Jr(d[k], c[k], b));
      Array.isArray(e.value) ? e.value = C.map((S, k) => {
        var E, R;
        return Jr((E = d[k]) != null ? E : 0, (R = c[k]) != null ? R : 0, b);
      }) : typeof e.value == "number" && (e.value = C[0]), x < f ? requestAnimationFrame(h) : (e.value = i, g());
    };
    h();
  });
}
function Ac(e, t = {}) {
  let n = 0;
  const r = () => {
    const s = ue(e);
    return typeof s == "number" ? s : s.map(ue);
  }, o = T(r());
  return J(r, async (s) => {
    var a, i;
    if (ue(t.disabled))
      return;
    const d = ++n;
    if (t.delay && await hc(ue(t.delay)), d !== n)
      return;
    const c = Array.isArray(s) ? s.map(ue) : ue(s);
    (a = t.onStarted) == null || a.call(t), await Ec(o, o.value, c, {
      ...t,
      abort: () => {
        var l;
        return d !== n || ((l = t.abort) == null ? void 0 : l.call(t));
      }
    }), (i = t.onFinished) == null || i.call(t);
  }, { deep: !0 }), J(() => ue(t.disabled), (s) => {
    s && (n++, o.value = r());
  }), es(() => {
    n++;
  }), B(() => ue(t.disabled) ? r() : o.value);
}
function kc(e, t, n, r = {}) {
  var o, s, a;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: u,
    shouldEmit: f
  } = r, p = Le(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let g = c;
  g = g || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : bc(b) : b, v = () => pc(e[t]) ? h(e[t]) : u, x = (b) => {
    f ? f(b) && m(g, b) : m(g, b);
  };
  if (d) {
    const b = v(), C = T(b);
    let S = !1;
    return J(
      () => e[t],
      (k) => {
        S || (S = !0, C.value = h(k), ce(() => S = !1));
      }
    ), J(
      C,
      (k) => {
        !S && (k !== e[t] || l) && x(k);
      },
      { deep: l }
    ), C;
  } else
    return B({
      get() {
        return v();
      },
      set(b) {
        x(b);
      }
    });
}
const rs = {
  __name: "Input",
  props: {
    defaultValue: { type: [String, Number], required: !1 },
    modelValue: { type: [String, Number], required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = kc(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (s, a) => yo((A(), V("input", {
      "onUpdate:modelValue": a[0] || (a[0] = (i) => dt(o) ? o.value = i : null),
      class: ne(
        y(Y)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          n.class
        )
      )
    }, null, 2)), [
      [Xs, y(o)]
    ]);
  }
}, Rc = {
  __name: "Progress",
  props: {
    modelValue: { type: [Number, null], required: !1, default: 0 },
    max: { type: Number, required: !1 },
    getValueLabel: { type: Function, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (A(), N(y(Ql), G(n.value, {
      class: y(Y)(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        t.class
      )
    }), {
      default: _(() => [
        O(y(eu), {
          class: "h-full w-full flex-1 bg-primary transition-all",
          style: Qt(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, os = {
  __name: "Switch",
  props: {
    defaultChecked: { type: Boolean, required: !1 },
    checked: { type: Boolean, required: !1 },
    disabled: { type: Boolean, required: !1 },
    required: { type: Boolean, required: !1 },
    name: { type: String, required: !1 },
    id: { type: String, required: !1 },
    value: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = B(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Pt(o, r);
    return (a, i) => (A(), N(y(Vu), G(y(s), {
      class: y(Y)(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: _(() => [
        O(y(ju), {
          class: ne(
            y(Y)(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5"
            )
          )
        }, {
          default: _(() => [
            I(a.$slots, "thumb")
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Bt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Oc = {
  name: "CalculationRoute",
  components: { Switch: os, Input: rs, Label: an },
  props: {
    advancedCalculation: Boolean,
    calculationData: Object
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      localAdvancedCalculation: this.advancedCalculation,
      data: { ...this.calculationData }
    };
  },
  watch: {
    data: {
      handler(e) {
        this.$emit("update-data", e), this.checkValidity();
      },
      deep: !0
    }
    /*
    localAdvancedCalculation(newValue) {
      this.$emit("update:advancedCalculation", newValue);
    }
     */
  },
  methods: {
    validateInput() {
      this.$refs.form.checkValidity() ? this.$emit("update-validity", !0) : this.$emit("update-validity", !1);
    },
    checkValidity() {
      const e = this.$refs.form;
      this.$emit("update-validity", e.checkValidity());
    }
  },
  mounted() {
    this.checkValidity();
  }
}, Tc = { class: "flex justify-between" }, Pc = { className: "flex items-center space-x-2" }, Bc = { class: "grid items-center w-full gap-8" }, Mc = { class: "flex flex-col space-y-1.5" }, Ic = { class: "flex flex-col space-y-1.5" };
function Nc(e, t, n, r, o, s) {
  const a = W("Label"), i = W("Switch"), d = W("Input");
  return A(), V("div", null, [
    L("form", {
      ref: "form",
      onSubmit: t[3] || (t[3] = we((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-6"
    }, [
      L("div", Tc, [
        O(a, {
          for: "calculation-type",
          class: "text-base font-medium"
        }, {
          default: _(() => t[4] || (t[4] = [
            Q("Berechnungsmodus")
          ])),
          _: 1
        }),
        L("div", Pc, [
          O(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: _(() => t[5] || (t[5] = [
              Q("Einfach")
            ])),
            _: 1
          }),
          O(i, {
            id: "calculation-type",
            checked: o.localAdvancedCalculation,
            "onUpdate:checked": t[0] || (t[0] = (c) => o.localAdvancedCalculation = c)
          }, null, 8, ["checked"]),
          O(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: _(() => t[6] || (t[6] = [
              Q("Detailliert")
            ])),
            _: 1
          })
        ])
      ]),
      L("div", Bc, [
        L("div", Mc, [
          O(a, { for: "startLocation" }, {
            default: _(() => t[7] || (t[7] = [
              Q("Startort")
            ])),
            _: 1
          }),
          O(d, {
            id: "startLocation",
            placeholder: "Startort",
            modelValue: o.data.startLocation,
            "onUpdate:modelValue": t[1] || (t[1] = (c) => o.data.startLocation = c),
            required: ""
          }, null, 8, ["modelValue"])
        ]),
        L("div", Ic, [
          O(a, { for: "endLocation" }, {
            default: _(() => t[8] || (t[8] = [
              Q("Zielort")
            ])),
            _: 1
          }),
          O(d, {
            id: "endLocation",
            placeholder: "Zielort",
            modelValue: o.data.endLocation,
            "onUpdate:modelValue": t[2] || (t[2] = (c) => o.data.endLocation = c),
            required: ""
          }, null, 8, ["modelValue"])
        ])
      ])
    ], 544)
  ]);
}
const Dc = /* @__PURE__ */ Bt(Oc, [["render", Nc]]), ss = {
  __name: "RadioGroup",
  props: {
    modelValue: { type: String, required: !1 },
    defaultValue: { type: String, required: !1 },
    disabled: { type: Boolean, required: !1 },
    name: { type: String, required: !1 },
    required: { type: Boolean, required: !1 },
    orientation: { type: String, required: !1 },
    dir: { type: String, required: !1 },
    loop: { type: Boolean, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = B(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Pt(o, r);
    return (a, i) => (A(), N(y(ru), G({
      class: y(Y)("grid gap-2", n.class)
    }, y(s)), {
      default: _(() => [
        I(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, as = {
  __name: "RadioGroupItem",
  props: {
    id: { type: String, required: !1 },
    value: { type: String, required: !1 },
    disabled: { type: Boolean, required: !1 },
    required: { type: Boolean, required: !1 },
    name: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = B(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = Ke(n);
    return (o, s) => (A(), N(y(lu), G(y(r), {
      class: y(Y)(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      )
    }), {
      default: _(() => [
        O(y(uu), { class: "flex items-center justify-center" }, {
          default: _(() => [
            O(y(Yu), { class: "h-2.5 w-2.5 fill-current text-current" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, Lc = {
  name: "CalculationTransportMedium",
  components: { RadioGroupItem: as, RadioGroup: ss, Button: sn, Label: an, Car: _r, Bus: Xo, Bike: Jo, Train: Zo, Footprints: Qu },
  props: {
    advancedCalculation: Boolean,
    calculationData: Object
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      data: { ...this.calculationData },
      transportModes: ["car", "bus_public", "bus_tour", "bike", "foot", "train"],
      icons: {
        car: "Car",
        bus_public: "Bus",
        bus_tour: "Bus",
        train: "Train",
        bike: "Bike",
        foot: "Footprints"
      }
    };
  },
  methods: {
    capitalize(e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    selectTransportMode(e) {
      this.data.transportMode = e;
    },
    validateInput() {
      this.$refs.form.checkValidity() ? this.$emit("update-validity", !0) : this.$emit("update-validity", !1);
    },
    checkValidity() {
      const e = this.$refs.form;
      this.$emit("update-validity", e.checkValidity());
    }
  },
  watch: {
    data: {
      handler(e) {
        this.$emit("update-data", e), this.checkValidity();
      },
      deep: !0
    }
  }
}, Fc = ["for"], qc = { class: "text-sm font-medium" };
function $c(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup");
  return A(), V("div", null, [
    L("form", {
      ref: "form",
      onSubmit: t[1] || (t[1] = we((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-4"
    }, [
      O(a, null, {
        default: _(() => t[2] || (t[2] = [
          Q("Transportmittel")
        ])),
        _: 1
      }),
      O(d, {
        modelValue: o.data.transportMode,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => o.data.transportMode = c),
        class: "grid grid-cols-2 gap-4 sm:grid-cols-4"
      }, {
        default: _(() => [
          (A(!0), V(Re, null, Et(o.transportModes, (c) => (A(), V("label", {
            key: c,
            for: `radio-${c}`,
            class: ne(["flex flex-col items-center justify-center h-24 p-4 border rounded-lg cursor-pointer transition-all", {
              "bg-primary text-white": o.data.transportMode === c
            }])
          }, [
            O(i, {
              id: `radio-${c}`,
              value: c,
              class: "hidden",
              required: ""
            }, null, 8, ["id", "value"]),
            (A(), N(pt(o.icons[c]), { class: "h-8 w-8 mb-2" })),
            L("span", qc, pe(s.capitalize(c)), 1)
          ], 10, Fc))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 544)
  ]);
}
const Vc = /* @__PURE__ */ Bt(Lc, [["render", $c]]), jc = {
  name: "CalculationFuel",
  components: { RadioGroupItem: as, RadioGroup: ss, Button: sn, Label: an, Fuel: ec, Droplet: Zu, Zap: rc, Car: _r },
  props: {
    advancedCalculation: Boolean,
    calculationData: Object
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      data: { ...this.calculationData }
    };
  },
  watch: {
    data: {
      handler(e) {
        this.$emit("update-data", e), this.validateInput();
      },
      deep: !0
    }
  },
  computed: {
    availableFuels() {
      switch (this.data.transportMode) {
        case "car":
          return ["petrol", "diesel", "electric", "lpg", "phev_diesel", "phev_otto"];
        case "bus_public":
          return ["diesel", "cng"];
        case "train":
          return ["diesel", "electric"];
        default:
          return [];
      }
    },
    vehicleSizes() {
      switch (this.data.fuelType) {
        case "electric":
          return ["small", "medium"];
        case "lpg":
          return ["medium"];
        default:
          return ["small", "medium", "large"];
      }
    },
    icons() {
      return {
        petrol: "Fuel",
        diesel: "Fuel",
        electric: "Zap",
        phev_diesel: "Zap",
        phev_otto: "Zap",
        lpg: "Droplet",
        cng: "Droplet"
      };
    },
    sizeTranslations() {
      return {
        small: "Klein",
        medium: "Mittel",
        large: "Groß"
      };
    }
  },
  methods: {
    validateInput() {
      const t = this.$refs.form.checkValidity();
      this.$emit("update-validity", t);
    },
    selectFuelType(e) {
      this.data.fuelType = e;
    },
    selectVehicleSize(e) {
      this.data.vehicleSize = e;
    },
    capitalize(e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    },
    sizeIconClass(e) {
      return {
        "h-6 w-6 mb-2": !0,
        "scale-75": e === "small",
        "scale-125": e === "large"
      };
    }
  }
}, zc = ["for"], Uc = { class: "text-sm font-medium" }, Hc = { key: 0 }, Wc = ["for"], Gc = { class: "text-sm font-medium" };
function Kc(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup"), c = W("Car");
  return A(), V("div", null, [
    L("form", {
      ref: "form",
      onSubmit: t[2] || (t[2] = we((...l) => s.validateInput && s.validateInput(...l), ["prevent"])),
      class: "space-y-6"
    }, [
      L("div", null, [
        O(a, { class: "mb-2 block" }, {
          default: _(() => t[3] || (t[3] = [
            Q("Kraftstoff")
          ])),
          _: 1
        }),
        O(d, {
          modelValue: o.data.fuelType,
          "onUpdate:modelValue": t[0] || (t[0] = (l) => o.data.fuelType = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: _(() => [
            (A(!0), V(Re, null, Et(s.availableFuels, (l) => (A(), V("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.fuelType === l,
                "border-gray-300": o.data.fuelType !== l
              }])
            }, [
              O(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              (A(), N(pt(s.icons[l]), { class: "h-6 w-6 mb-2" })),
              L("span", Uc, pe(s.capitalize(l)), 1)
            ], 10, zc))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      o.data.transportMode === "car" ? (A(), V("div", Hc, [
        O(a, { class: "mb-2 block" }, {
          default: _(() => t[4] || (t[4] = [
            Q("Fahrzeuggröße")
          ])),
          _: 1
        }),
        O(d, {
          modelValue: o.data.vehicleSize,
          "onUpdate:modelValue": t[1] || (t[1] = (l) => o.data.vehicleSize = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: _(() => [
            (A(!0), V(Re, null, Et(s.vehicleSizes, (l) => (A(), V("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.vehicleSize === l,
                "border-gray-300": o.data.vehicleSize !== l
              }])
            }, [
              O(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              O(c, {
                class: ne(s.sizeIconClass(l))
              }, null, 8, ["class"]),
              L("span", Gc, pe(s.sizeTranslations[l]), 1)
            ], 10, Wc))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])) : se("", !0)
    ], 544)
  ]);
}
const Jc = /* @__PURE__ */ Bt(jc, [["render", Kc]]), Xc = {
  __name: "NumberTicker",
  props: {
    value: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: "up"
    },
    duration: {
      type: Number,
      default: 1e3
    },
    delay: {
      type: Number,
      default: 0
    },
    decimalPlaces: {
      type: Number,
      default: 2
    },
    class: String,
    transition: {
      type: String,
      default: "easeOutCubic"
    }
  },
  setup(e) {
    const t = T(null), n = e, r = T(n.direction === "down" ? n.value : 0), o = Ac(r, {
      delay: n.delay,
      duration: n.duration,
      transition: Cc[n.transition]
    }), s = B(() => new Intl.NumberFormat("en-US", {
      minimumFractionDigits: n.decimalPlaces,
      maximumFractionDigits: n.decimalPlaces
    }).format(Number(o.value.toFixed(n.decimalPlaces)))), a = xc(t, {
      threshold: 0
    });
    return J(
      a,
      (i) => {
        i && (r.value = n.direction === "down" ? 0 : n.value);
      },
      { immediate: !0 }
    ), (i, d) => (A(), V("span", {
      ref_key: "spanRef",
      ref: t,
      class: ne(y(Y)("inline-block tabular-nums text-black dark:text-white tracking-wider", n.class))
    }, pe(s.value), 3));
  }
}, Yc = {
  name: "CalculationResult",
  components: { NumberTicker: Xc, Button: sn, CardContent: ko, Card: Ao, Leaf: tc, Trees: nc, Car: _r, Train: Zo, Bus: Xo, Bike: Jo },
  props: {
    advancedCalculation: Boolean,
    calculationData: Object,
    calculationResult: Object,
    dummySimpleResult: Object
  },
  emits: ["reset-data", "next"],
  data() {
    return {
      data: { ...this.calculationData },
      result: { ...this.calculationResult },
      dummy: { ...this.dummySimpleResult }
    };
  },
  methods: {
    resetCalculation() {
      this.$emit("reset-data", !0);
    },
    formatDistance(e) {
      return `${(e / 1e3).toFixed(1)} km`;
    },
    formatYearsToBind(e) {
      const { years: t, months: n, days: r } = e, o = [];
      return t > 0 && o.push(`${t} Jahr${t > 1 ? "e" : ""}`), n > 0 && o.push(`${n} Monat${n > 1 ? "e" : ""}`), r > 0 && o.push(`${r} Tag${r > 1 ? "e" : ""}`), o.length ? o.join(", ") : "Keine Zeit erforderlich";
    }
  },
  computed: {
    icons() {
      return {
        Pkw: "Car",
        Busreise: "Bus",
        Zug: "Train",
        Fahrrad: "Bike",
        Flugzeug: "Plane"
      };
    }
  }
}, Zc = { class: "space-y-6 text-center" }, Qc = { class: "grid gap-8 md:grid-cols-2" }, ed = { class: "flex items-center justify-center mb-4" }, td = { class: "text-5xl font-bold text-red-700 mb-4" }, nd = { class: "text-lg" }, rd = { class: "flex items-center justify-center mb-4" }, od = { class: "text-3xl font-bold text-green-700 mb-4" }, sd = { class: "mt-8" }, ad = { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, id = { class: "flex items-center justify-center mb-2" }, ld = { class: "text-lg font-semibold mb-2" }, ud = { class: "text-lg font-bold text-gray-900" }, cd = { class: "text-sm text-gray-700" };
function dd(e, t, n, r, o, s) {
  const a = W("Leaf"), i = W("NumberTicker"), d = W("CardContent"), c = W("Card"), l = W("Trees"), u = W("Button");
  return A(), V("div", Zc, [
    t[10] || (t[10] = L("h2", { class: "text-3xl font-bold mb-8" }, "Ihre CO2-Bilanz", -1)),
    L("div", Qc, [
      O(c, { class: "bg-gradient-to-br from-red-100 to-orange-100 hover:scale-105 duration-300" }, {
        default: _(() => [
          O(d, { class: "p-6" }, {
            default: _(() => [
              L("div", ed, [
                O(a, { class: "h-12 w-12 text-red-600 mr-4" }),
                t[0] || (t[0] = L("h3", { class: "text-2xl font-semibold" }, "CO2-Emission", -1))
              ]),
              L("p", td, [
                O(i, {
                  class: "text-red-700",
                  "decimal-places": 2,
                  duration: 2e3,
                  value: o.result.emission
                }, null, 8, ["value"]),
                t[1] || (t[1] = L("span", { class: "text-2xl ml-2" }, "kg", -1))
              ]),
              L("p", nd, " Ihre Reise von " + pe(o.data.startLocation) + " nach " + pe(o.data.endLocation) + " verursacht diese Menge an CO2-Emissionen. ", 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      O(c, { class: "bg-gradient-to-br from-green-100 to-emerald-100 hover:scale-105 duration-300" }, {
        default: _(() => [
          O(d, { class: "p-6" }, {
            default: _(() => [
              L("div", rd, [
                O(l, { class: "h-12 w-12 text-green-600 mr-4" }),
                t[2] || (t[2] = L("h3", { class: "text-2xl font-semibold" }, "Baum-Äquivalent", -1))
              ]),
              L("p", od, [
                O(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  value: o.result.yearsToBind.years
                }, null, 8, ["value"]),
                t[3] || (t[3] = L("span", { class: "text-2xl ml-2" }, "Jahr(e), ", -1)),
                O(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 500,
                  value: o.result.yearsToBind.months
                }, null, 8, ["value"]),
                t[4] || (t[4] = L("span", { class: "text-2xl ml-2" }, "Monat(e), ", -1)),
                O(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 1e3,
                  value: o.result.yearsToBind.days
                }, null, 8, ["value"]),
                t[5] || (t[5] = L("span", { class: "text-2xl ml-2" }, "Tag(e)", -1))
              ]),
              t[6] || (t[6] = L("p", { class: "text-lg" }, " So lange braucht eine typische Buche, um diese Menge CO2 zu binden. ", -1))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    L("div", sd, [
      t[7] || (t[7] = L("h3", { class: "text-2xl font-semibold mb-4" }, "Vergleich mit anderen Transportmitteln", -1)),
      L("div", ad, [
        (A(!0), V(Re, null, Et(o.dummy, (f, p) => (A(), N(c, {
          key: p,
          class: "bg-gray-100 hover:scale-105 duration-300"
        }, {
          default: _(() => [
            O(d, { class: "p-4" }, {
              default: _(() => [
                L("div", id, [
                  (A(), N(pt(s.icons[f.transportMediumDTO.transportMediumName] || "Leaf"), { class: "h-8 w-8 text-gray-600" }))
                ]),
                L("h4", ld, pe(f.transportMediumDTO.transportMediumName) + " (" + pe(f.transportMediumDTO.transportMediumFuel) + ") ", 1),
                L("p", ud, pe(f.emission.toFixed(2)) + " kg CO2 ", 1),
                L("p", cd, " Bindungszeit: " + pe(s.formatYearsToBind(f.yearsToBind)), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ]),
    L("div", null, [
      t[9] || (t[9] = L("div", { className: "mt-8 text-xs text-gray-500 flex items-center justify-center" }, " Entwickelt von Kleemann und Siemens Software GbR ", -1)),
      O(u, {
        onClick: s.resetCalculation,
        class: "mt-4"
      }, {
        default: _(() => t[8] || (t[8] = [
          Q("Neue Berechnung")
        ])),
        _: 1
      }, 8, ["onClick"])
    ])
  ]);
}
const fd = /* @__PURE__ */ Bt(Yc, [["render", dd]]), pd = {
  __name: "AlertDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(y(Y)("text-sm [&_p]:leading-relaxed", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, md = {
  __name: "AlertTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("h5", {
      class: ne(y(Y)("mb-1 font-medium leading-none tracking-tight", t.class))
    }, [
      I(n.$slots, "default")
    ], 2));
  }
}, hd = Qo(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), yd = {
  __name: "Alert",
  props: {
    class: { type: null, required: !1 },
    variant: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), V("div", {
      class: ne(y(Y)(y(hd)({ variant: e.variant }), t.class)),
      role: "alert"
    }, [
      I(n.$slots, "default")
    ], 2));
  }
};
/*!
 * pinia v2.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let is;
const ln = (e) => is = e, ls = (
  /* istanbul ignore next */
  Symbol()
);
function Vn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var _t;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(_t || (_t = {}));
function gd() {
  const e = Zt(!0), t = e.run(() => T({}));
  let n = [], r = [];
  const o = Xn({
    install(s) {
      ln(o), o._a = s, s.provide(ls, o), s.config.globalProperties.$pinia = o, r.forEach((a) => n.push(a)), r = [];
    },
    use(s) {
      return this._a ? n.push(s) : r.push(s), this;
    },
    _p: n,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return o;
}
const us = () => {
};
function Xr(e, t, n, r = us) {
  e.push(t);
  const o = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), r());
  };
  return !n && Xt() && Yt(o), o;
}
function it(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const vd = (e) => e(), Yr = Symbol(), On = Symbol();
function jn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    Vn(o) && Vn(r) && e.hasOwnProperty(n) && !dt(r) && !vo(r) ? e[n] = jn(o, r) : e[n] = r;
  }
  return e;
}
const bd = (
  /* istanbul ignore next */
  Symbol()
);
function wd(e) {
  return !Vn(e) || !e.hasOwnProperty(bd);
}
const { assign: je } = Object;
function xd(e) {
  return !!(dt(e) && e.effect);
}
function Sd(e, t, n, r) {
  const { state: o, actions: s, getters: a } = t, i = n.state.value[e];
  let d;
  function c() {
    i || (n.state.value[e] = o ? o() : {});
    const l = Te(n.state.value[e]);
    return je(l, s, Object.keys(a || {}).reduce((u, f) => (u[f] = Xn(B(() => {
      ln(n);
      const p = n._s.get(e);
      return a[f].call(p, p);
    })), u), {}));
  }
  return d = cs(e, c, t, n, r, !0), d;
}
function cs(e, t, n = {}, r, o, s) {
  let a;
  const i = je({ actions: {} }, n), d = { deep: !0 };
  let c, l, u = [], f = [], p;
  const m = r.state.value[e];
  !s && !m && (r.state.value[e] = {}), T({});
  let g;
  function h(R) {
    let P;
    c = l = !1, typeof R == "function" ? (R(r.state.value[e]), P = {
      type: _t.patchFunction,
      storeId: e,
      events: p
    }) : (jn(r.state.value[e], R), P = {
      type: _t.patchObject,
      payload: R,
      storeId: e,
      events: p
    });
    const M = g = Symbol();
    ce().then(() => {
      g === M && (c = !0);
    }), l = !0, it(u, P, r.state.value[e]);
  }
  const v = s ? function() {
    const { state: P } = n, M = P ? P() : {};
    this.$patch((j) => {
      je(j, M);
    });
  } : (
    /* istanbul ignore next */
    us
  );
  function x() {
    a.stop(), u = [], f = [], r._s.delete(e);
  }
  const b = (R, P = "") => {
    if (Yr in R)
      return R[On] = P, R;
    const M = function() {
      ln(r);
      const j = Array.from(arguments), D = [], Z = [];
      function z(H) {
        D.push(H);
      }
      function ie(H) {
        Z.push(H);
      }
      it(f, {
        args: j,
        name: M[On],
        store: S,
        after: z,
        onError: ie
      });
      let U;
      try {
        U = R.apply(this && this.$id === e ? this : S, j);
      } catch (H) {
        throw it(Z, H), H;
      }
      return U instanceof Promise ? U.then((H) => (it(D, H), H)).catch((H) => (it(Z, H), Promise.reject(H))) : (it(D, U), U);
    };
    return M[Yr] = !0, M[On] = P, M;
  }, C = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: Xr.bind(null, f),
    $patch: h,
    $reset: v,
    $subscribe(R, P = {}) {
      const M = Xr(u, R, P.detached, () => j()), j = a.run(() => J(() => r.state.value[e], (D) => {
        (P.flush === "sync" ? l : c) && R({
          storeId: e,
          type: _t.direct,
          events: p
        }, D);
      }, je({}, d, P)));
      return M;
    },
    $dispose: x
  }, S = Jn(C);
  r._s.set(e, S);
  const E = (r._a && r._a.runWithContext || vd)(() => r._e.run(() => (a = Zt()).run(() => t({ action: b }))));
  for (const R in E) {
    const P = E[R];
    if (dt(P) && !xd(P) || vo(P))
      s || (m && wd(P) && (dt(P) ? P.value = m[R] : jn(P, m[R])), r.state.value[e][R] = P);
    else if (typeof P == "function") {
      const M = b(P, R);
      E[R] = M, i.actions[R] = P;
    }
  }
  return je(S, E), je(Zs(S), E), Object.defineProperty(S, "$state", {
    get: () => r.state.value[e],
    set: (R) => {
      h((P) => {
        je(P, R);
      });
    }
  }), r._p.forEach((R) => {
    je(S, a.run(() => R({
      store: S,
      app: r._a,
      pinia: r,
      options: i
    })));
  }), m && s && n.hydrate && n.hydrate(S.$state, m), c = !0, l = !0, S;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Cd(e, t, n) {
  let r, o;
  const s = typeof t == "function";
  r = e, o = s ? n : t;
  function a(i, d) {
    const c = Ys();
    return i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    i || (c ? nr(ls, null) : null), i && ln(i), i = is, i._s.has(r) || (s ? cs(r, t, o, i) : Sd(r, o, i)), i._s.get(r);
  }
  return a.$id = r, a;
}
function ds(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: _d } = Object.prototype, { getPrototypeOf: Er } = Object, un = /* @__PURE__ */ ((e) => (t) => {
  const n = _d.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), _e = (e) => (e = e.toLowerCase(), (t) => un(t) === e), cn = (e) => (t) => typeof t === e, { isArray: vt } = Array, Ot = cn("undefined");
function Ed(e) {
  return e !== null && !Ot(e) && e.constructor !== null && !Ot(e.constructor) && ve(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const fs = _e("ArrayBuffer");
function Ad(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && fs(e.buffer), t;
}
const kd = cn("string"), ve = cn("function"), ps = cn("number"), dn = (e) => e !== null && typeof e == "object", Rd = (e) => e === !0 || e === !1, Vt = (e) => {
  if (un(e) !== "object")
    return !1;
  const t = Er(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Od = _e("Date"), Td = _e("File"), Pd = _e("Blob"), Bd = _e("FileList"), Md = (e) => dn(e) && ve(e.pipe), Id = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ve(e.append) && ((t = un(e)) === "formdata" || // detect form-data instance
  t === "object" && ve(e.toString) && e.toString() === "[object FormData]"));
}, Nd = _e("URLSearchParams"), [Dd, Ld, Fd, qd] = ["ReadableStream", "Request", "Response", "Headers"].map(_e), $d = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Mt(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), vt(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = s.length;
    let i;
    for (r = 0; r < a; r++)
      i = s[r], t.call(null, e[i], i, e);
  }
}
function ms(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const Ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, hs = (e) => !Ot(e) && e !== Ye;
function zn() {
  const { caseless: e } = hs(this) && this || {}, t = {}, n = (r, o) => {
    const s = e && ms(t, o) || o;
    Vt(t[s]) && Vt(r) ? t[s] = zn(t[s], r) : Vt(r) ? t[s] = zn({}, r) : vt(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Mt(arguments[r], n);
  return t;
}
const Vd = (e, t, n, { allOwnKeys: r } = {}) => (Mt(t, (o, s) => {
  n && ve(o) ? e[s] = ds(o, n) : e[s] = o;
}, { allOwnKeys: r }), e), jd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), zd = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Ud = (e, t, n, r) => {
  let o, s, a;
  const i = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      a = o[s], (!r || r(a, e, t)) && !i[a] && (t[a] = e[a], i[a] = !0);
    e = n !== !1 && Er(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Hd = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Wd = (e) => {
  if (!e) return null;
  if (vt(e)) return e;
  let t = e.length;
  if (!ps(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Gd = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Er(Uint8Array)), Kd = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, Jd = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Xd = _e("HTMLFormElement"), Yd = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), Zr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Zd = _e("RegExp"), ys = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Mt(n, (o, s) => {
    let a;
    (a = t(o, s, e)) !== !1 && (r[s] = a || o);
  }), Object.defineProperties(e, r);
}, Qd = (e) => {
  ys(e, (t, n) => {
    if (ve(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ve(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ef = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return vt(e) ? r(e) : r(String(e).split(t)), n;
}, tf = () => {
}, nf = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Tn = "abcdefghijklmnopqrstuvwxyz", Qr = "0123456789", gs = {
  DIGIT: Qr,
  ALPHA: Tn,
  ALPHA_DIGIT: Tn + Tn.toUpperCase() + Qr
}, rf = (e = 16, t = gs.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function of(e) {
  return !!(e && ve(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const sf = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (dn(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = vt(r) ? [] : {};
        return Mt(r, (a, i) => {
          const d = n(a, o + 1);
          !Ot(d) && (s[i] = d);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, af = _e("AsyncFunction"), lf = (e) => e && (dn(e) || ve(e)) && ve(e.then) && ve(e.catch), vs = ((e, t) => e ? setImmediate : t ? ((n, r) => (Ye.addEventListener("message", ({ source: o, data: s }) => {
  o === Ye && s === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), Ye.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  ve(Ye.postMessage)
), uf = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ye) : typeof process < "u" && process.nextTick || vs, w = {
  isArray: vt,
  isArrayBuffer: fs,
  isBuffer: Ed,
  isFormData: Id,
  isArrayBufferView: Ad,
  isString: kd,
  isNumber: ps,
  isBoolean: Rd,
  isObject: dn,
  isPlainObject: Vt,
  isReadableStream: Dd,
  isRequest: Ld,
  isResponse: Fd,
  isHeaders: qd,
  isUndefined: Ot,
  isDate: Od,
  isFile: Td,
  isBlob: Pd,
  isRegExp: Zd,
  isFunction: ve,
  isStream: Md,
  isURLSearchParams: Nd,
  isTypedArray: Gd,
  isFileList: Bd,
  forEach: Mt,
  merge: zn,
  extend: Vd,
  trim: $d,
  stripBOM: jd,
  inherits: zd,
  toFlatObject: Ud,
  kindOf: un,
  kindOfTest: _e,
  endsWith: Hd,
  toArray: Wd,
  forEachEntry: Kd,
  matchAll: Jd,
  isHTMLForm: Xd,
  hasOwnProperty: Zr,
  hasOwnProp: Zr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ys,
  freezeMethods: Qd,
  toObjectSet: ef,
  toCamelCase: Yd,
  noop: tf,
  toFiniteNumber: nf,
  findKey: ms,
  global: Ye,
  isContextDefined: hs,
  ALPHABET: gs,
  generateString: rf,
  isSpecCompliantForm: of,
  toJSONObject: sf,
  isAsyncFn: af,
  isThenable: lf,
  setImmediate: vs,
  asap: uf
};
function F(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
w.inherits(F, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: w.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const bs = F.prototype, ws = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  ws[e] = { value: e };
});
Object.defineProperties(F, ws);
Object.defineProperty(bs, "isAxiosError", { value: !0 });
F.from = (e, t, n, r, o, s) => {
  const a = Object.create(bs);
  return w.toFlatObject(e, a, function(d) {
    return d !== Error.prototype;
  }, (i) => i !== "isAxiosError"), F.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, s && Object.assign(a, s), a;
};
const cf = null;
function Un(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function xs(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function eo(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = xs(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function df(e) {
  return w.isArray(e) && !e.some(Un);
}
const ff = w.toFlatObject(w, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function fn(e, t, n) {
  if (!w.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = w.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, h) {
    return !w.isUndefined(h[g]);
  });
  const r = n.metaTokens, o = n.visitor || l, s = n.dots, a = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && w.isSpecCompliantForm(t);
  if (!w.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (w.isDate(m))
      return m.toISOString();
    if (!d && w.isBlob(m))
      throw new F("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(m) || w.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function l(m, g, h) {
    let v = m;
    if (m && !h && typeof m == "object") {
      if (w.endsWith(g, "{}"))
        g = r ? g : g.slice(0, -2), m = JSON.stringify(m);
      else if (w.isArray(m) && df(m) || (w.isFileList(m) || w.endsWith(g, "[]")) && (v = w.toArray(m)))
        return g = xs(g), v.forEach(function(b, C) {
          !(w.isUndefined(b) || b === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? eo([g], C, s) : a === null ? g : g + "[]",
            c(b)
          );
        }), !1;
    }
    return Un(m) ? !0 : (t.append(eo(h, g, s), c(m)), !1);
  }
  const u = [], f = Object.assign(ff, {
    defaultVisitor: l,
    convertValue: c,
    isVisitable: Un
  });
  function p(m, g) {
    if (!w.isUndefined(m)) {
      if (u.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      u.push(m), w.forEach(m, function(v, x) {
        (!(w.isUndefined(v) || v === null) && o.call(
          t,
          v,
          w.isString(x) ? x.trim() : x,
          g,
          f
        )) === !0 && p(v, g ? g.concat(x) : [x]);
      }), u.pop();
    }
  }
  if (!w.isObject(e))
    throw new TypeError("data must be an object");
  return p(e), t;
}
function to(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Ar(e, t) {
  this._pairs = [], e && fn(e, this, t);
}
const Ss = Ar.prototype;
Ss.append = function(t, n) {
  this._pairs.push([t, n]);
};
Ss.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, to);
  } : to;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function pf(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Cs(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || pf;
  w.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = w.isURLSearchParams(t) ? t.toString() : new Ar(t, n).toString(r), s) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class no {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    w.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const _s = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, mf = typeof URLSearchParams < "u" ? URLSearchParams : Ar, hf = typeof FormData < "u" ? FormData : null, yf = typeof Blob < "u" ? Blob : null, gf = {
  isBrowser: !0,
  classes: {
    URLSearchParams: mf,
    FormData: hf,
    Blob: yf
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, kr = typeof window < "u" && typeof document < "u", Hn = typeof navigator == "object" && navigator || void 0, vf = kr && (!Hn || ["ReactNative", "NativeScript", "NS"].indexOf(Hn.product) < 0), bf = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", wf = kr && window.location.href || "http://localhost", xf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: kr,
  hasStandardBrowserEnv: vf,
  hasStandardBrowserWebWorkerEnv: bf,
  navigator: Hn,
  origin: wf
}, Symbol.toStringTag, { value: "Module" })), ae = {
  ...xf,
  ...gf
};
function Sf(e, t) {
  return fn(e, new ae.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, s) {
      return ae.isNode && w.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Cf(e) {
  return w.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function _f(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function Es(e) {
  function t(n, r, o, s) {
    let a = n[s++];
    if (a === "__proto__") return !0;
    const i = Number.isFinite(+a), d = s >= n.length;
    return a = !a && w.isArray(o) ? o.length : a, d ? (w.hasOwnProp(o, a) ? o[a] = [o[a], r] : o[a] = r, !i) : ((!o[a] || !w.isObject(o[a])) && (o[a] = []), t(n, r, o[a], s) && w.isArray(o[a]) && (o[a] = _f(o[a])), !i);
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return w.forEachEntry(e, (r, o) => {
      t(Cf(r), o, n, 0);
    }), n;
  }
  return null;
}
function Ef(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const It = {
  transitional: _s,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = w.isObject(t);
    if (s && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t))
      return o ? JSON.stringify(Es(t)) : t;
    if (w.isArrayBuffer(t) || w.isBuffer(t) || w.isStream(t) || w.isFile(t) || w.isBlob(t) || w.isReadableStream(t))
      return t;
    if (w.isArrayBufferView(t))
      return t.buffer;
    if (w.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Sf(t, this.formSerializer).toString();
      if ((i = w.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return fn(
          i ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), Ef(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || It.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (w.isResponse(t) || w.isReadableStream(t))
      return t;
    if (t && w.isString(t) && (r && !this.responseType || o)) {
      const a = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? F.from(i, F.ERR_BAD_RESPONSE, this, null, this.response) : i;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ae.classes.FormData,
    Blob: ae.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
w.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  It.headers[e] = {};
});
const Af = w.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), kf = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), n = a.substring(0, o).trim().toLowerCase(), r = a.substring(o + 1).trim(), !(!n || t[n] && Af[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ro = Symbol("internals");
function Ct(e) {
  return e && String(e).trim().toLowerCase();
}
function jt(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(jt) : String(e);
}
function Rf(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Of = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Pn(e, t, n, r, o) {
  if (w.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!w.isString(t)) {
    if (w.isString(r))
      return t.indexOf(r) !== -1;
    if (w.isRegExp(r))
      return r.test(t);
  }
}
function Tf(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Pf(e, t) {
  const n = w.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, s, a) {
        return this[r].call(this, t, o, s, a);
      },
      configurable: !0
    });
  });
}
class me {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(i, d, c) {
      const l = Ct(d);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const u = w.findKey(o, l);
      (!u || o[u] === void 0 || c === !0 || c === void 0 && o[u] !== !1) && (o[u || d] = jt(i));
    }
    const a = (i, d) => w.forEach(i, (c, l) => s(c, l, d));
    if (w.isPlainObject(t) || t instanceof this.constructor)
      a(t, n);
    else if (w.isString(t) && (t = t.trim()) && !Of(t))
      a(kf(t), n);
    else if (w.isHeaders(t))
      for (const [i, d] of t.entries())
        s(d, i, r);
    else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Ct(t), t) {
      const r = w.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Rf(o);
        if (w.isFunction(n))
          return n.call(this, o, r);
        if (w.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Ct(t), t) {
      const r = w.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Pn(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(a) {
      if (a = Ct(a), a) {
        const i = w.findKey(r, a);
        i && (!n || Pn(r, r[i], i, n)) && (delete r[i], o = !0);
      }
    }
    return w.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Pn(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return w.forEach(this, (o, s) => {
      const a = w.findKey(r, s);
      if (a) {
        n[a] = jt(o), delete n[s];
        return;
      }
      const i = t ? Tf(s) : String(s).trim();
      i !== s && delete n[s], n[i] = jt(o), r[i] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return w.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && w.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[ro] = this[ro] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(a) {
      const i = Ct(a);
      r[i] || (Pf(o, a), r[i] = !0);
    }
    return w.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
me.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
w.reduceDescriptors(me.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
w.freezeMethods(me);
function Bn(e, t) {
  const n = this || It, r = t || n, o = me.from(r.headers);
  let s = r.data;
  return w.forEach(e, function(i) {
    s = i.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function As(e) {
  return !!(e && e.__CANCEL__);
}
function bt(e, t, n) {
  F.call(this, e ?? "canceled", F.ERR_CANCELED, t, n), this.name = "CanceledError";
}
w.inherits(bt, F, {
  __CANCEL__: !0
});
function ks(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new F(
    "Request failed with status code " + n.status,
    [F.ERR_BAD_REQUEST, F.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Bf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Mf(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, s = 0, a;
  return t = t !== void 0 ? t : 1e3, function(d) {
    const c = Date.now(), l = r[s];
    a || (a = c), n[o] = d, r[o] = c;
    let u = s, f = 0;
    for (; u !== o; )
      f += n[u++], u = u % e;
    if (o = (o + 1) % e, o === s && (s = (s + 1) % e), c - a < t)
      return;
    const p = l && c - l;
    return p ? Math.round(f * 1e3 / p) : void 0;
  };
}
function If(e, t) {
  let n = 0, r = 1e3 / t, o, s;
  const a = (c, l = Date.now()) => {
    n = l, o = null, s && (clearTimeout(s), s = null), e.apply(null, c);
  };
  return [(...c) => {
    const l = Date.now(), u = l - n;
    u >= r ? a(c, l) : (o = c, s || (s = setTimeout(() => {
      s = null, a(o);
    }, r - u)));
  }, () => o && a(o)];
}
const Kt = (e, t, n = 3) => {
  let r = 0;
  const o = Mf(50, 250);
  return If((s) => {
    const a = s.loaded, i = s.lengthComputable ? s.total : void 0, d = a - r, c = o(d), l = a <= i;
    r = a;
    const u = {
      loaded: a,
      total: i,
      progress: i ? a / i : void 0,
      bytes: d,
      rate: c || void 0,
      estimated: c && i && l ? (i - a) / c : void 0,
      event: s,
      lengthComputable: i != null,
      [t ? "download" : "upload"]: !0
    };
    e(u);
  }, n);
}, oo = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, so = (e) => (...t) => w.asap(() => e(...t)), Nf = ae.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ae.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ae.origin),
  ae.navigator && /(msie|trident)/i.test(ae.navigator.userAgent)
) : () => !0, Df = ae.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, s) {
      const a = [e + "=" + encodeURIComponent(t)];
      w.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), w.isString(r) && a.push("path=" + r), w.isString(o) && a.push("domain=" + o), s === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Lf(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Ff(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Rs(e, t) {
  return e && !Lf(t) ? Ff(e, t) : t;
}
const ao = (e) => e instanceof me ? { ...e } : e;
function tt(e, t) {
  t = t || {};
  const n = {};
  function r(c, l, u, f) {
    return w.isPlainObject(c) && w.isPlainObject(l) ? w.merge.call({ caseless: f }, c, l) : w.isPlainObject(l) ? w.merge({}, l) : w.isArray(l) ? l.slice() : l;
  }
  function o(c, l, u, f) {
    if (w.isUndefined(l)) {
      if (!w.isUndefined(c))
        return r(void 0, c, u, f);
    } else return r(c, l, u, f);
  }
  function s(c, l) {
    if (!w.isUndefined(l))
      return r(void 0, l);
  }
  function a(c, l) {
    if (w.isUndefined(l)) {
      if (!w.isUndefined(c))
        return r(void 0, c);
    } else return r(void 0, l);
  }
  function i(c, l, u) {
    if (u in t)
      return r(c, l);
    if (u in e)
      return r(void 0, c);
  }
  const d = {
    url: s,
    method: s,
    data: s,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: i,
    headers: (c, l, u) => o(ao(c), ao(l), u, !0)
  };
  return w.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
    const u = d[l] || o, f = u(e[l], t[l], l);
    w.isUndefined(f) && u !== i || (n[l] = f);
  }), n;
}
const Os = (e) => {
  const t = tt({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: a, auth: i } = t;
  t.headers = a = me.from(a), t.url = Cs(Rs(t.baseURL, t.url), e.params, e.paramsSerializer), i && a.set(
    "Authorization",
    "Basic " + btoa((i.username || "") + ":" + (i.password ? unescape(encodeURIComponent(i.password)) : ""))
  );
  let d;
  if (w.isFormData(n)) {
    if (ae.hasStandardBrowserEnv || ae.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((d = a.getContentType()) !== !1) {
      const [c, ...l] = d ? d.split(";").map((u) => u.trim()).filter(Boolean) : [];
      a.setContentType([c || "multipart/form-data", ...l].join("; "));
    }
  }
  if (ae.hasStandardBrowserEnv && (r && w.isFunction(r) && (r = r(t)), r || r !== !1 && Nf(t.url))) {
    const c = o && s && Df.read(s);
    c && a.set(o, c);
  }
  return t;
}, qf = typeof XMLHttpRequest < "u", $f = qf && function(e) {
  return new Promise(function(n, r) {
    const o = Os(e);
    let s = o.data;
    const a = me.from(o.headers).normalize();
    let { responseType: i, onUploadProgress: d, onDownloadProgress: c } = o, l, u, f, p, m;
    function g() {
      p && p(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function v() {
      if (!h)
        return;
      const b = me.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), S = {
        data: !i || i === "text" || i === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: b,
        config: e,
        request: h
      };
      ks(function(E) {
        n(E), g();
      }, function(E) {
        r(E), g();
      }, S), h = null;
    }
    "onloadend" in h ? h.onloadend = v : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, h.onabort = function() {
      h && (r(new F("Request aborted", F.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      r(new F("Network Error", F.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let C = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const S = o.transitional || _s;
      o.timeoutErrorMessage && (C = o.timeoutErrorMessage), r(new F(
        C,
        S.clarifyTimeoutError ? F.ETIMEDOUT : F.ECONNABORTED,
        e,
        h
      )), h = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in h && w.forEach(a.toJSON(), function(C, S) {
      h.setRequestHeader(S, C);
    }), w.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), i && i !== "json" && (h.responseType = o.responseType), c && ([f, m] = Kt(c, !0), h.addEventListener("progress", f)), d && h.upload && ([u, p] = Kt(d), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", p)), (o.cancelToken || o.signal) && (l = (b) => {
      h && (r(!b || b.type ? new bt(null, e, h) : b), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const x = Bf(o.url);
    if (x && ae.protocols.indexOf(x) === -1) {
      r(new F("Unsupported protocol " + x + ":", F.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(s || null);
  });
}, Vf = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(c) {
      if (!o) {
        o = !0, i();
        const l = c instanceof Error ? c : this.reason;
        r.abort(l instanceof F ? l : new bt(l instanceof Error ? l.message : l));
      }
    };
    let a = t && setTimeout(() => {
      a = null, s(new F(`timeout ${t} of ms exceeded`, F.ETIMEDOUT));
    }, t);
    const i = () => {
      e && (a && clearTimeout(a), a = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(s) : c.removeEventListener("abort", s);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", s));
    const { signal: d } = r;
    return d.unsubscribe = () => w.asap(i), d;
  }
}, jf = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, zf = async function* (e, t) {
  for await (const n of Uf(e))
    yield* jf(n, t);
}, Uf = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, io = (e, t, n, r) => {
  const o = zf(e, t);
  let s = 0, a, i = (d) => {
    a || (a = !0, r && r(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: c, value: l } = await o.next();
        if (c) {
          i(), d.close();
          return;
        }
        let u = l.byteLength;
        if (n) {
          let f = s += u;
          n(f);
        }
        d.enqueue(new Uint8Array(l));
      } catch (c) {
        throw i(c), c;
      }
    },
    cancel(d) {
      return i(d), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, pn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Ts = pn && typeof ReadableStream == "function", Hf = pn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Ps = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Wf = Ts && Ps(() => {
  let e = !1;
  const t = new Request(ae.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), lo = 64 * 1024, Wn = Ts && Ps(() => w.isReadableStream(new Response("").body)), Jt = {
  stream: Wn && ((e) => e.body)
};
pn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !Jt[t] && (Jt[t] = w.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new F(`Response type '${t}' is not supported`, F.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Gf = async (e) => {
  if (e == null)
    return 0;
  if (w.isBlob(e))
    return e.size;
  if (w.isSpecCompliantForm(e))
    return (await new Request(ae.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (w.isArrayBufferView(e) || w.isArrayBuffer(e))
    return e.byteLength;
  if (w.isURLSearchParams(e) && (e = e + ""), w.isString(e))
    return (await Hf(e)).byteLength;
}, Kf = async (e, t) => {
  const n = w.toFiniteNumber(e.getContentLength());
  return n ?? Gf(t);
}, Jf = pn && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: o,
    cancelToken: s,
    timeout: a,
    onDownloadProgress: i,
    onUploadProgress: d,
    responseType: c,
    headers: l,
    withCredentials: u = "same-origin",
    fetchOptions: f
  } = Os(e);
  c = c ? (c + "").toLowerCase() : "text";
  let p = Vf([o, s && s.toAbortSignal()], a), m;
  const g = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let h;
  try {
    if (d && Wf && n !== "get" && n !== "head" && (h = await Kf(l, r)) !== 0) {
      let S = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), k;
      if (w.isFormData(r) && (k = S.headers.get("content-type")) && l.setContentType(k), S.body) {
        const [E, R] = oo(
          h,
          Kt(so(d))
        );
        r = io(S.body, lo, E, R);
      }
    }
    w.isString(u) || (u = u ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    m = new Request(t, {
      ...f,
      signal: p,
      method: n.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: v ? u : void 0
    });
    let x = await fetch(m);
    const b = Wn && (c === "stream" || c === "response");
    if (Wn && (i || b && g)) {
      const S = {};
      ["status", "statusText", "headers"].forEach((P) => {
        S[P] = x[P];
      });
      const k = w.toFiniteNumber(x.headers.get("content-length")), [E, R] = i && oo(
        k,
        Kt(so(i), !0)
      ) || [];
      x = new Response(
        io(x.body, lo, E, () => {
          R && R(), g && g();
        }),
        S
      );
    }
    c = c || "text";
    let C = await Jt[w.findKey(Jt, c) || "text"](x, e);
    return !b && g && g(), await new Promise((S, k) => {
      ks(S, k, {
        data: C,
        headers: me.from(x.headers),
        status: x.status,
        statusText: x.statusText,
        config: e,
        request: m
      });
    });
  } catch (v) {
    throw g && g(), v && v.name === "TypeError" && /fetch/i.test(v.message) ? Object.assign(
      new F("Network Error", F.ERR_NETWORK, e, m),
      {
        cause: v.cause || v
      }
    ) : F.from(v, v && v.code, e, m);
  }
}), Gn = {
  http: cf,
  xhr: $f,
  fetch: Jf
};
w.forEach(Gn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const uo = (e) => `- ${e}`, Xf = (e) => w.isFunction(e) || e === null || e === !1, Bs = {
  getAdapter: (e) => {
    e = w.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let a;
      if (r = n, !Xf(n) && (r = Gn[(a = String(n)).toLowerCase()], r === void 0))
        throw new F(`Unknown adapter '${a}'`);
      if (r)
        break;
      o[a || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(o).map(
        ([i, d]) => `adapter ${i} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? s.length > 1 ? `since :
` + s.map(uo).join(`
`) : " " + uo(s[0]) : "as no adapter specified";
      throw new F(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Gn
};
function Mn(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new bt(null, e);
}
function co(e) {
  return Mn(e), e.headers = me.from(e.headers), e.data = Bn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Bs.getAdapter(e.adapter || It.adapter)(e).then(function(r) {
    return Mn(e), r.data = Bn.call(
      e,
      e.transformResponse,
      r
    ), r.headers = me.from(r.headers), r;
  }, function(r) {
    return As(r) || (Mn(e), r && r.response && (r.response.data = Bn.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = me.from(r.response.headers))), Promise.reject(r);
  });
}
const Ms = "1.7.9", mn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  mn[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const fo = {};
mn.transitional = function(t, n, r) {
  function o(s, a) {
    return "[Axios v" + Ms + "] Transitional option '" + s + "'" + a + (r ? ". " + r : "");
  }
  return (s, a, i) => {
    if (t === !1)
      throw new F(
        o(a, " has been removed" + (n ? " in " + n : "")),
        F.ERR_DEPRECATED
      );
    return n && !fo[a] && (fo[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, a, i) : !0;
  };
};
mn.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Yf(e, t, n) {
  if (typeof e != "object")
    throw new F("options must be an object", F.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], a = t[s];
    if (a) {
      const i = e[s], d = i === void 0 || a(i, s, e);
      if (d !== !0)
        throw new F("option " + s + " must be " + d, F.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new F("Unknown option " + s, F.ERR_BAD_OPTION);
  }
}
const zt = {
  assertOptions: Yf,
  validators: mn
}, Ee = zt.validators;
class Qe {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new no(),
      response: new no()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const s = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? s && !String(r.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + s) : r.stack = s;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = tt(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && zt.assertOptions(r, {
      silentJSONParsing: Ee.transitional(Ee.boolean),
      forcedJSONParsing: Ee.transitional(Ee.boolean),
      clarifyTimeoutError: Ee.transitional(Ee.boolean)
    }, !1), o != null && (w.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : zt.assertOptions(o, {
      encode: Ee.function,
      serialize: Ee.function
    }, !0)), zt.assertOptions(n, {
      baseUrl: Ee.spelling("baseURL"),
      withXsrfToken: Ee.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let a = s && w.merge(
      s.common,
      s[n.method]
    );
    s && w.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete s[m];
      }
    ), n.headers = me.concat(a, s);
    const i = [];
    let d = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(n) === !1 || (d = d && g.synchronous, i.unshift(g.fulfilled, g.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(g) {
      c.push(g.fulfilled, g.rejected);
    });
    let l, u = 0, f;
    if (!d) {
      const m = [co.bind(this), void 0];
      for (m.unshift.apply(m, i), m.push.apply(m, c), f = m.length, l = Promise.resolve(n); u < f; )
        l = l.then(m[u++], m[u++]);
      return l;
    }
    f = i.length;
    let p = n;
    for (u = 0; u < f; ) {
      const m = i[u++], g = i[u++];
      try {
        p = m(p);
      } catch (h) {
        g.call(this, h);
        break;
      }
    }
    try {
      l = co.call(this, p);
    } catch (m) {
      return Promise.reject(m);
    }
    for (u = 0, f = c.length; u < f; )
      l = l.then(c[u++], c[u++]);
    return l;
  }
  getUri(t) {
    t = tt(this.defaults, t);
    const n = Rs(t.baseURL, t.url);
    return Cs(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function(t) {
  Qe.prototype[t] = function(n, r) {
    return this.request(tt(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
w.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, a, i) {
      return this.request(tt(i || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  Qe.prototype[t] = n(), Qe.prototype[t + "Form"] = n(!0);
});
class Rr {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(s) {
      n = s;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let s = r._listeners.length;
      for (; s-- > 0; )
        r._listeners[s](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let s;
      const a = new Promise((i) => {
        r.subscribe(i), s = i;
      }).then(o);
      return a.cancel = function() {
        r.unsubscribe(s);
      }, a;
    }, t(function(s, a, i) {
      r.reason || (r.reason = new bt(s, a, i), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Rr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function Zf(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Qf(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const Kn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Kn).forEach(([e, t]) => {
  Kn[t] = e;
});
function Is(e) {
  const t = new Qe(e), n = ds(Qe.prototype.request, t);
  return w.extend(n, Qe.prototype, t, { allOwnKeys: !0 }), w.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return Is(tt(e, o));
  }, n;
}
const ee = Is(It);
ee.Axios = Qe;
ee.CanceledError = bt;
ee.CancelToken = Rr;
ee.isCancel = As;
ee.VERSION = Ms;
ee.toFormData = fn;
ee.AxiosError = F;
ee.Cancel = ee.CanceledError;
ee.all = function(t) {
  return Promise.all(t);
};
ee.spread = Zf;
ee.isAxiosError = Qf;
ee.mergeConfig = tt;
ee.AxiosHeaders = me;
ee.formToJSON = (e) => Es(w.isHTMLForm(e) ? new FormData(e) : e);
ee.getAdapter = Bs.getAdapter;
ee.HttpStatusCode = Kn;
ee.default = ee;
const ep = "https://xrlab.hs-harz.de/co2back/api";
ee.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const Ns = ee.create({
  baseURL: ep,
  timeout: 5e3
}), tp = async (e, t, n) => {
  const r = "emission", o = {
    startLocation: e,
    endLocation: t,
    transportMediumDTO: n
  };
  return (await Ns.post(r, o)).data;
}, np = async (e, t, n, r, o) => {
  const s = {
    startLocation: e,
    endLocation: t,
    distance: n,
    transportMediumDTO: r,
    groupEmissionDTO: o
  };
  return (await Ns.post("groupEmission", s)).data;
}, rp = /* @__PURE__ */ Cd("calculationStore", {
  state: () => ({
    calculationData: {
      startLocation: "",
      endLocation: "",
      transportMode: "",
      fuelType: "",
      vehicleSize: ""
    },
    calculationResult: null,
    calculationSaveResult: null,
    error: null
  }),
  getters: {
    getCalculationData(e) {
      return e.calculationData;
    },
    getCalculationResult(e) {
      return e.calculationResult;
    },
    getCalculationSaveResult(e) {
      return e.calculationSaveResult;
    }
  },
  actions: {
    async calculate() {
      this.clearCalculationError();
      try {
        const e = {
          transportMediumName: this.calculationData.transportMode,
          transportMediumSize: this.calculationData.vehicleSize,
          transportMediumFuel: this.calculationData.fuelType
        }, t = await tp(
          this.calculationData.startLocation,
          this.calculationData.endLocation,
          e
        );
        return this.setCalculationResult(t), t;
      } catch (e) {
        throw console.error("error in calculateEmission:", e), this.error = e, e;
      }
    },
    async save(e, t, n) {
      if (this.clearCalculationError(), this.calculationResult !== null)
        try {
          const r = {
            transportMediumName: this.calculationData.transportMode,
            transportMediumSize: this.calculationData.vehicleSize,
            transportMediumFuel: this.calculationData.fuelType
          }, o = {
            groupEmission: this.calculationResult.emission,
            groupEmissionNickName: e,
            groupEmissionPassPhrase: t,
            groupEmissionSize: n
          }, s = await np(
            this.calculationData.startLocation,
            this.calculationData.endLocation,
            this.calculationResult.distance,
            r,
            o
          );
          return this.setCalculationSaveResult(s), s;
        } catch (r) {
          throw console.error("error in saveEmission:", r), this.error = r, r;
        }
    },
    updateCalculationData(e) {
      Object.assign(this.calculationData, e);
    },
    setCalculationData(e) {
      this.calculationData = e;
    },
    setCalculationResult(e) {
      this.calculationResult = e;
    },
    setCalculationSaveResult(e) {
      this.calculationSaveResult = e;
    },
    clearCalculationError() {
      this.error = null;
    }
  }
}), op = {
  name: "CalculationStepper",
  components: {
    AlertDescription: pd,
    AlertTitle: md,
    Alert: yd,
    ArrowLeft: Wu,
    ArrowRight: Gu,
    AlertCircle: Xu,
    Switch: os,
    Progress: Rc,
    Input: rs,
    Label: an,
    Button: sn,
    CardFooter: cc,
    SelectItem: ac,
    SelectContent: uc,
    SelectTrigger: oc,
    Select: zu,
    CardContent: ko,
    CardDescription: Ia,
    CardTitle: Ma,
    CardHeader: Ba,
    Card: Ao
  },
  setup() {
    return {
      calculationStore: rp()
    };
  },
  data() {
    return {
      step: 1,
      maxStep: 4,
      advancedCalculation: !0,
      stepsValidity: [],
      calculationData: {
        startLocation: "",
        endLocation: "",
        transportMode: "",
        fuelType: "",
        vehicleSize: ""
      },
      calculationResult: null,
      /*
      calculationResult: {
        emission: 44.23,
        distance: 323,
        yearsToBind: {
          years: 1,
          months: 3,
          days: 21
        },
        neededTrees: 0
      },
      */
      dummySimpleResult: [
        {
          transportMediumDTO: {
            transportMediumName: "Pkw",
            transportMediumSize: "mittel",
            transportMediumFuel: "Otto",
            transportMediumFuelConsumption: null
          },
          emission: 45.87713609,
          distance: 314507,
          yearsToBind: {
            years: 3,
            months: 8,
            days: 1
          },
          neededTrees: 4
        },
        {
          transportMediumDTO: {
            transportMediumName: "Busreise",
            transportMediumSize: "default",
            transportMediumFuel: "Default",
            transportMediumFuelConsumption: null
          },
          emission: 10.579386466,
          distance: 314507,
          yearsToBind: {
            years: 0,
            months: 10,
            days: 4
          },
          neededTrees: 1
        },
        {
          transportMediumDTO: {
            transportMediumName: "Fahrrad",
            transportMediumSize: "default",
            transportMediumFuel: "Default",
            transportMediumFuelConsumption: null
          },
          emission: 0,
          distance: 314507,
          yearsToBind: {
            years: 0,
            months: 0,
            days: 0
          },
          neededTrees: 0
        },
        {
          transportMediumDTO: {
            transportMediumName: "Zug",
            transportMediumSize: "default",
            transportMediumFuel: "Diesel",
            transportMediumFuelConsumption: null
          },
          emission: 19.094917102,
          distance: 529033,
          yearsToBind: {
            years: 1,
            months: 6,
            days: 9
          },
          neededTrees: 2
        }
      ]
    };
  },
  computed: {
    progress() {
      return this.step / this.maxStep * 100;
    },
    currentStep() {
      switch (this.step) {
        case 1:
          return Dc;
        case 2:
          return Vc;
        case 3:
          return Jc;
        case 4:
          return fd;
      }
    },
    isFuelAvailable() {
      switch (console.log("TransportMode:" + this.calculationData.transportMode), this.calculationData.transportMode) {
        case "car":
        case "bus_public":
        case "train":
          return console.log("isFuelAvailable: true"), !0;
        default:
          return console.log("isFuelAvailable: false"), !1;
      }
    }
  },
  methods: {
    initializeStepsValidity() {
      this.stepsValidity = Array(this.maxStep - 1).fill(!1);
    },
    updateStepValidity(e, t) {
      this.stepsValidity[e] = t;
    },
    isCurrentStepValid() {
      return console.log("CURRENT STEP: " + this.step + " FROM MAX STEPS: " + this.maxStep), this.stepsValidity[this.step - 1];
    },
    areAllStepsValid() {
      return console.log("areAllStepsValid: " + this.stepsValidity.every((e) => e === !0)), this.stepsValidity.every((e) => e === !0);
    },
    async nextStep() {
      if (!this.isCurrentStepValid()) {
        console.warn("current step is not valid.");
        return;
      }
      if (this.isLastStepBeforeResult()) {
        console.log("LAST STEP BEFORE RESULT"), await this.calculate(), await this.save(), this.step++;
        return;
      }
      if (this.step === 2 && !this.isFuelAvailable) {
        console.log("skipping Step 3 due to unavailable fuel"), this.stepsValidity[2] = !0, await this.calculate(), await this.save(), this.step += 2;
        return;
      }
      this.step++;
    },
    isLastStepBeforeResult() {
      return this.step === this.maxStep - 1;
    },
    prevStep() {
      this.step > 1 && this.step--;
    },
    updateData(e) {
      Object.assign(this.calculationData, e);
    },
    resetData() {
      this.step = 1, Object.assign(this.calculationData, {});
    },
    async calculate() {
      this.areAllStepsValid() && (console.log("calculating emissions ..."), this.calculationStore.setCalculationData(this.calculationData), await this.calculationStore.calculate(), this.calculationResult = this.calculationStore.calculationResult);
    },
    async save() {
      this.calculationResult !== null && await this.calculationStore.save("widgetGroup", "widget-001", 1);
    }
  },
  mounted() {
    this.initializeStepsValidity();
  }
}, sp = { class: "w-full bg-white" }, ap = { class: "mt-2 mb-4" }, ip = { class: "w-full" }, lp = { class: "w-full flex justify-between" }, up = { class: "mt-6 hidden" };
function cp(e, t, n, r, o, s) {
  const a = W("Progress"), i = W("CardHeader"), d = W("CardContent"), c = W("AlertCircle"), l = W("AlertTitle"), u = W("AlertDescription"), f = W("Alert"), p = W("ArrowLeft"), m = W("Button"), g = W("ArrowRight"), h = W("CardFooter"), v = W("Card");
  return A(), V(Re, null, [
    t[11] || (t[11] = L("div", { class: "hidden" }, [
      L("p", null, "CalculationComponent")
    ], -1)),
    L("div", sp, [
      O(v, { class: "max-w-4xl lg:mx-auto m-6" }, {
        default: _(() => [
          O(i, null, {
            default: _(() => [
              L("div", ap, [
                O(a, {
                  modelValue: s.progress,
                  "onUpdate:modelValue": t[0] || (t[0] = (x) => s.progress = x),
                  class: "w-full mx-auto"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }),
          O(d, null, {
            default: _(() => [
              (A(), N(pt(s.currentStep), {
                required: "",
                advancedCalculation: o.advancedCalculation,
                "onUpdate:advancedCalculation": t[1] || (t[1] = (x) => o.advancedCalculation = x),
                "calculation-data": o.calculationData,
                calculationResult: o.calculationResult,
                dummySimpleResult: o.dummySimpleResult,
                onUpdateData: s.updateData,
                onUpdateValidity: t[2] || (t[2] = (x) => s.updateStepValidity(o.step - 1, x)),
                onResetData: s.resetData,
                onNext: s.nextStep,
                onPrev: s.prevStep
              }, null, 40, ["advancedCalculation", "calculation-data", "calculationResult", "dummySimpleResult", "onUpdateData", "onResetData", "onNext", "onPrev"]))
            ]),
            _: 1
          }),
          O(h, { class: "w-full flex flex-col px-6 pb-6" }, {
            default: _(() => [
              L("div", ip, [
                !s.isCurrentStepValid() && o.step !== o.maxStep ? (A(), N(f, {
                  key: 0,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: _(() => [
                    O(c, { class: "w-4 h-4" }),
                    O(l, null, {
                      default: _(() => t[3] || (t[3] = [
                        Q("Unvollständig")
                      ])),
                      _: 1
                    }),
                    O(u, null, {
                      default: _(() => t[4] || (t[4] = [
                        Q(" Bitte überprüfe deine Eingabedaten vor dem nächsten Schritt. ")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : se("", !0),
                r.calculationStore.error !== null ? (A(), N(f, {
                  key: 1,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: _(() => [
                    O(c, { class: "w-4 h-4" }),
                    O(l, null, {
                      default: _(() => t[5] || (t[5] = [
                        Q("Fehler")
                      ])),
                      _: 1
                    }),
                    O(u, null, {
                      default: _(() => [
                        Q(pe(r.calculationStore.error), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : se("", !0)
              ]),
              L("div", lp, [
                o.step > 1 ? (A(), N(m, {
                  key: 0,
                  type: "button",
                  onClick: s.prevStep,
                  variant: "outline"
                }, {
                  default: _(() => [
                    O(p, { class: "mr-2 h-4 w-4" }),
                    t[6] || (t[6] = Q(" Zurück "))
                  ]),
                  _: 1
                }, 8, ["onClick"])) : se("", !0),
                o.step < o.maxStep && o.step !== o.maxStep - 1 ? (A(), N(m, {
                  key: 1,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: _(() => [
                    t[7] || (t[7] = Q(" Weiter ")),
                    O(g, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : se("", !0),
                o.step === o.maxStep - 1 ? (A(), N(m, {
                  key: 2,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: _(() => [
                    t[8] || (t[8] = Q(" Berechnen ")),
                    O(g, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : se("", !0)
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    L("div", up, [
      Q(pe(this.stepsValidity), 1),
      t[9] || (t[9] = L("br", null, null, -1)),
      Q(" " + pe(this.advancedCalculation), 1),
      t[10] || (t[10] = L("br", null, null, -1)),
      Q(" " + pe(this.calculationData), 1)
    ])
  ], 64);
}
const dp = /* @__PURE__ */ Bt(op, [["render", cp]]);
function hp(e) {
  const t = document.querySelector(e);
  if (!t) {
    console.error(`Element mit dem Selector "${e}" nicht gefunden.`);
    return;
  }
  const n = Qs(dp);
  n.use(gd()), n.mount(t);
}
export {
  hp as default
};
