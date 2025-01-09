import * as Qr from "vue";
import { openBlock as A, createElementBlock as U, normalizeClass as ne, unref as g, renderSlot as D, computed as I, ref as P, shallowRef as qo, watch as K, getCurrentScope as vn, onScopeDispose as bn, shallowReadonly as gt, getCurrentInstance as Me, toRef as nn, camelize as jo, defineComponent as q, Comment as xa, mergeProps as G, cloneVNode as _a, h as Pe, toRefs as Ce, reactive as yr, watchEffect as pe, markRaw as Ke, createBlock as B, withCtx as O, nextTick as de, createCommentVNode as ue, Fragment as De, renderList as Lt, resolveDynamicComponent as Ct, onMounted as Te, createVNode as R, withModifiers as Ee, normalizeProps as vr, guardReactiveProps as br, Teleport as wr, onBeforeUnmount as xr, createTextVNode as ee, withKeys as Uo, effectScope as wn, toHandlerKey as Sa, onUnmounted as _r, withDirectives as zo, createElementVNode as $, isRef as ut, vModelSelect as Ea, inject as Sr, provide as Ho, customRef as Ca, onBeforeUpdate as Oa, onUpdated as Aa, normalizeStyle as xn, mergeDefaults as Ta, watchPostEffect as ka, readonly as Ra, toValue as fe, vModelText as Pa, resolveComponent as W, toDisplayString as he, toRaw as $t, hasInjectionContext as Na, isReactive as Er, createApp as Ia } from "vue";
function Wo(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Wo(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Go() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Wo(e)) && (r && (r += " "), r += t);
  return r;
}
const Cr = "-", Da = (e) => {
  const t = Ma(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(Cr);
      return i[0] === "" && i.length !== 1 && i.shift(), Ko(i, t) || Ba(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const d = n[a] || [];
      return i && r[a] ? [...d, ...r[a]] : d;
    }
  };
}, Ko = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ko(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(Cr);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, eo = /^\[(.+)\]$/, Ba = (e) => {
  if (eo.test(e)) {
    const t = eo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ma = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return $a(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    tr(a, r, s, t);
  }), r;
}, tr = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : to(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (La(o)) {
        tr(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      tr(a, to(t, s), n, r);
    });
  });
}, to = (e, t) => {
  let n = e;
  return t.split(Cr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, La = (e) => e.isThemeGetter, $a = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, Va = (e) => {
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
}, Jo = "!", Fa = (e) => {
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
    const f = d.length === 0 ? i : i.substring(l), p = f.startsWith(Jo), m = p ? f.substring(1) : f, y = u && u > l ? u - l : void 0;
    return {
      modifiers: d,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: y
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, qa = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, ja = (e) => ({
  cache: Va(e.cacheSize),
  parseClassName: Fa(e),
  ...Da(e)
}), Ua = /\s+/, za = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(Ua);
  let i = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const c = a[d], {
      modifiers: l,
      hasImportantModifier: u,
      baseClassName: f,
      maybePostfixModifierPosition: p
    } = n(c);
    let m = !!p, y = r(m ? f.substring(0, p) : f);
    if (!y) {
      if (!m) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (y = r(f), !y) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      m = !1;
    }
    const h = qa(l).join(":"), v = u ? h + Jo : h, _ = v + y;
    if (s.includes(_))
      continue;
    s.push(_);
    const b = o(y, m);
    for (let C = 0; C < b.length; ++C) {
      const S = b[C];
      s.push(v + S);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Ha() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Xo(t)) && (r && (r += " "), r += n);
  return r;
}
const Xo = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Xo(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Wa(e, ...t) {
  let n, r, o, s = a;
  function a(d) {
    const c = t.reduce((l, u) => u(l), e());
    return n = ja(c), r = n.cache.get, o = n.cache.set, s = i, i(d);
  }
  function i(d) {
    const c = r(d);
    if (c)
      return c;
    const l = za(d, n);
    return o(d, l), l;
  }
  return function() {
    return s(Ha.apply(null, arguments));
  };
}
const J = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Yo = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ga = /^\d+\/\d+$/, Ka = /* @__PURE__ */ new Set(["px", "full", "screen"]), Ja = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Xa = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ya = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Za = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Qa = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ve = (e) => _t(e) || Ka.has(e) || Ga.test(e), He = (e) => Ot(e, "length", ii), _t = (e) => !!e && !Number.isNaN(Number(e)), Vn = (e) => Ot(e, "number", _t), It = (e) => !!e && Number.isInteger(Number(e)), ei = (e) => e.endsWith("%") && _t(e.slice(0, -1)), F = (e) => Yo.test(e), We = (e) => Ja.test(e), ti = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ni = (e) => Ot(e, ti, Zo), ri = (e) => Ot(e, "position", Zo), oi = /* @__PURE__ */ new Set(["image", "url"]), si = (e) => Ot(e, oi, ui), ai = (e) => Ot(e, "", li), Dt = () => !0, Ot = (e, t, n) => {
  const r = Yo.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, ii = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Xa.test(e) && !Ya.test(e)
), Zo = () => !1, li = (e) => Za.test(e), ui = (e) => Qa.test(e), ci = () => {
  const e = J("colors"), t = J("spacing"), n = J("blur"), r = J("brightness"), o = J("borderColor"), s = J("borderRadius"), a = J("borderSpacing"), i = J("borderWidth"), d = J("contrast"), c = J("grayscale"), l = J("hueRotate"), u = J("invert"), f = J("gap"), p = J("gradientColorStops"), m = J("gradientColorStopPositions"), y = J("inset"), h = J("margin"), v = J("opacity"), _ = J("padding"), b = J("saturate"), C = J("scale"), S = J("sepia"), k = J("skew"), x = J("space"), M = J("translate"), L = () => ["auto", "contain", "none"], E = () => ["auto", "hidden", "clip", "visible", "scroll"], T = () => ["auto", F, t], N = () => [F, t], z = () => ["", Ve, He], j = () => ["auto", _t, F], se = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], Y = () => ["solid", "dashed", "dotted", "double", "none"], ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], H = () => ["", "0", F], ht = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], me = () => [_t, F];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Dt],
      spacing: [Ve, He],
      blur: ["none", "", We, F],
      brightness: me(),
      borderColor: [e],
      borderRadius: ["none", "", "full", We, F],
      borderSpacing: N(),
      borderWidth: z(),
      contrast: me(),
      grayscale: H(),
      hueRotate: me(),
      invert: H(),
      gap: N(),
      gradientColorStops: [e],
      gradientColorStopPositions: [ei, He],
      inset: T(),
      margin: T(),
      opacity: me(),
      padding: N(),
      saturate: me(),
      scale: me(),
      sepia: H(),
      skew: me(),
      space: N(),
      translate: N()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", F]
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
        columns: [We]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": ht()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": ht()
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
        object: [...se(), F]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: E()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": E()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": E()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: L()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": L()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": L()
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
        inset: [y]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [y]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [y]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [y]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [y]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [y]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [y]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [y]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [y]
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
        z: ["auto", It, F]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: T()
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
        flex: ["1", "auto", "initial", "none", F]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: H()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: H()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", It, F]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Dt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", It, F]
        }, F]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": j()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": j()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Dt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [It, F]
        }, F]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": j()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": j()
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
        "auto-cols": ["auto", "min", "max", "fr", F]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", F]
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
        justify: ["normal", ...Q()]
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
        content: ["normal", ...Q(), "baseline"]
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
        "place-content": [...Q(), "baseline"]
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
        p: [_]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [_]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [_]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [_]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [_]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [_]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [_]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [_]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [_]
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
        "space-x": [x]
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
        "space-y": [x]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", F, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [F, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [F, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [We]
        }, We]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [F, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [F, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [F, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [F, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", We, He]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Vn]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Dt]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", F]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", _t, Vn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Ve, F]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", F]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", F]
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
        decoration: [...Y(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Ve, He]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Ve, F]
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
        indent: N()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", F]
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
        content: ["none", F]
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
        bg: [...se(), ri]
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
        bg: ["auto", "cover", "contain", ni]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, si]
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
        border: [...Y(), "hidden"]
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
        divide: Y()
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
        outline: ["", ...Y()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ve, F]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Ve, He]
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
        ring: z()
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
        "ring-offset": [Ve, He]
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
        shadow: ["", "inner", "none", We, ai]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Dt]
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
        "mix-blend": [...ae(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ae()
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
        "drop-shadow": ["", "none", We, F]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", F]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: me()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", F]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: me()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", F]
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
        rotate: [It, F]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [M]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [M]
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
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", F]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", F]
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
        "scroll-m": N()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": N()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": N()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": N()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": N()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": N()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": N()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": N()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": N()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": N()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": N()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": N()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": N()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": N()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": N()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": N()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": N()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": N()
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
        "will-change": ["auto", "scroll", "contents", "transform", F]
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
        stroke: [Ve, He, Vn]
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
}, di = /* @__PURE__ */ Wa(ci);
function Z(...e) {
  return di(Go(e));
}
const Qo = {
  __name: "Card",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(
        g(Z)(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          t.class
        )
      )
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, fi = {
  __name: "CardHeader",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(g(Z)("flex flex-col gap-y-1.5 p-6", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, pi = {
  __name: "CardTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("h3", {
      class: ne(
        g(Z)("text-2xl font-semibold leading-none tracking-tight", t.class)
      )
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, mi = {
  __name: "CardDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("p", {
      class: ne(g(Z)("text-sm text-muted-foreground", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, es = {
  __name: "CardContent",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(g(Z)("p-6 pt-0", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, hi = ["top", "right", "bottom", "left"], Ye = Math.min, ve = Math.max, dn = Math.round, Xt = Math.floor, Ne = (e) => ({
  x: e,
  y: e
}), gi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, yi = {
  start: "end",
  end: "start"
};
function nr(e, t, n) {
  return ve(e, Ye(t, n));
}
function je(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ue(e) {
  return e.split("-")[0];
}
function At(e) {
  return e.split("-")[1];
}
function Or(e) {
  return e === "x" ? "y" : "x";
}
function Ar(e) {
  return e === "y" ? "height" : "width";
}
function Ze(e) {
  return ["top", "bottom"].includes(Ue(e)) ? "y" : "x";
}
function Tr(e) {
  return Or(Ze(e));
}
function vi(e, t, n) {
  n === void 0 && (n = !1);
  const r = At(e), o = Tr(e), s = Ar(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = fn(a)), [a, fn(a)];
}
function bi(e) {
  const t = fn(e);
  return [rr(e), t, rr(t)];
}
function rr(e) {
  return e.replace(/start|end/g, (t) => yi[t]);
}
function wi(e, t, n) {
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
function xi(e, t, n, r) {
  const o = At(e);
  let s = wi(Ue(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(rr)))), s;
}
function fn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => gi[t]);
}
function _i(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ts(e) {
  return typeof e != "number" ? _i(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function pn(e) {
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
function no(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Ze(t), a = Tr(t), i = Ar(a), d = Ue(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
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
  switch (At(t)) {
    case "start":
      p[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[a] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const Si = async (e, t, n) => {
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
  } = no(c, r, d), f = r, p = {}, m = 0;
  for (let y = 0; y < i.length; y++) {
    const {
      name: h,
      fn: v
    } = i[y], {
      x: _,
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
    l = _ ?? l, u = b ?? u, p = {
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
    } = no(c, f, d)), y = -1);
  }
  return {
    x: l,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Vt(e, t) {
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
  } = je(t, e), m = ts(p), h = i[f ? u === "floating" ? "reference" : "floating" : u], v = pn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(h))) == null || n ? h : h.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: c,
    rootBoundary: l,
    strategy: d
  })), _ = u === "floating" ? {
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
  }, S = pn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: _,
    offsetParent: b,
    strategy: d
  }) : _);
  return {
    top: (v.top - S.top + m.top) / C.y,
    bottom: (S.bottom - v.bottom + m.bottom) / C.y,
    left: (v.left - S.left + m.left) / C.x,
    right: (S.right - v.right + m.right) / C.x
  };
}
const Ei = (e) => ({
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
    } = je(e, t) || {};
    if (c == null)
      return {};
    const u = ts(l), f = {
      x: n,
      y: r
    }, p = Tr(o), m = Ar(p), y = await a.getDimensions(c), h = p === "y", v = h ? "top" : "left", _ = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", C = s.reference[m] + s.reference[p] - f[p] - s.floating[m], S = f[p] - s.reference[p], k = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let x = k ? k[b] : 0;
    (!x || !await (a.isElement == null ? void 0 : a.isElement(k))) && (x = i.floating[b] || s.floating[m]);
    const M = C / 2 - S / 2, L = x / 2 - y[m] / 2 - 1, E = Ye(u[v], L), T = Ye(u[_], L), N = E, z = x - y[m] - T, j = x / 2 - y[m] / 2 + M, se = nr(N, j, z), Y = !d.arrow && At(o) != null && j !== se && s.reference[m] / 2 - (j < N ? E : T) - y[m] / 2 < 0, ae = Y ? j < N ? j - N : j - z : 0;
    return {
      [p]: f[p] + ae,
      data: {
        [p]: se,
        centerOffset: j - se - ae,
        ...Y && {
          alignmentOffset: ae
        }
      },
      reset: Y
    };
  }
}), Ci = function(e) {
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
        flipAlignment: y = !0,
        ...h
      } = je(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const v = Ue(o), _ = Ze(i), b = Ue(i) === i, C = await (d.isRTL == null ? void 0 : d.isRTL(c.floating)), S = f || (b || !y ? [fn(i)] : bi(i)), k = m !== "none";
      !f && k && S.push(...xi(i, y, m, C));
      const x = [i, ...S], M = await Vt(t, h), L = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && L.push(M[v]), u) {
        const j = vi(o, a, C);
        L.push(M[j[0]], M[j[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: L
      }], !L.every((j) => j <= 0)) {
        var T, N;
        const j = (((T = s.flip) == null ? void 0 : T.index) || 0) + 1, se = x[j];
        if (se)
          return {
            data: {
              index: j,
              overflows: E
            },
            reset: {
              placement: se
            }
          };
        let Y = (N = E.filter((ae) => ae.overflows[0] <= 0).sort((ae, Q) => ae.overflows[1] - Q.overflows[1])[0]) == null ? void 0 : N.placement;
        if (!Y)
          switch (p) {
            case "bestFit": {
              var z;
              const ae = (z = E.filter((Q) => {
                if (k) {
                  const H = Ze(Q.placement);
                  return H === _ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  H === "y";
                }
                return !0;
              }).map((Q) => [Q.placement, Q.overflows.filter((H) => H > 0).reduce((H, ht) => H + ht, 0)]).sort((Q, H) => Q[1] - H[1])[0]) == null ? void 0 : z[0];
              ae && (Y = ae);
              break;
            }
            case "initialPlacement":
              Y = i;
              break;
          }
        if (o !== Y)
          return {
            reset: {
              placement: Y
            }
          };
      }
      return {};
    }
  };
};
function ro(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function oo(e) {
  return hi.some((t) => e[t] >= 0);
}
const Oi = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = je(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Vt(t, {
            ...o,
            elementContext: "reference"
          }), a = ro(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: oo(a)
            }
          };
        }
        case "escaped": {
          const s = await Vt(t, {
            ...o,
            altBoundary: !0
          }), a = ro(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: oo(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Ai(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Ue(n), i = At(n), d = Ze(n) === "y", c = ["left", "top"].includes(a) ? -1 : 1, l = s && d ? -1 : 1, u = je(t, e);
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
const Ti = function(e) {
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
      } = t, d = await Ai(t, e);
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
}, ki = function(e) {
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
              y: _
            } = h;
            return {
              x: v,
              y: _
            };
          }
        },
        ...d
      } = je(e, t), c = {
        x: n,
        y: r
      }, l = await Vt(t, d), u = Ze(Ue(o)), f = Or(u);
      let p = c[f], m = c[u];
      if (s) {
        const h = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", _ = p + l[h], b = p - l[v];
        p = nr(_, p, b);
      }
      if (a) {
        const h = u === "y" ? "top" : "left", v = u === "y" ? "bottom" : "right", _ = m + l[h], b = m - l[v];
        m = nr(_, m, b);
      }
      const y = i.fn({
        ...t,
        [f]: p,
        [u]: m
      });
      return {
        ...y,
        data: {
          x: y.x - n,
          y: y.y - r,
          enabled: {
            [f]: s,
            [u]: a
          }
        }
      };
    }
  };
}, Ri = function(e) {
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
      } = je(e, t), l = {
        x: n,
        y: r
      }, u = Ze(o), f = Or(u);
      let p = l[f], m = l[u];
      const y = je(i, t), h = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (d) {
        const b = f === "y" ? "height" : "width", C = s.reference[f] - s.floating[b] + h.mainAxis, S = s.reference[f] + s.reference[b] - h.mainAxis;
        p < C ? p = C : p > S && (p = S);
      }
      if (c) {
        var v, _;
        const b = f === "y" ? "width" : "height", C = ["top", "left"].includes(Ue(o)), S = s.reference[u] - s.floating[b] + (C && ((v = a.offset) == null ? void 0 : v[u]) || 0) + (C ? 0 : h.crossAxis), k = s.reference[u] + s.reference[b] + (C ? 0 : ((_ = a.offset) == null ? void 0 : _[u]) || 0) - (C ? h.crossAxis : 0);
        m < S ? m = S : m > k && (m = k);
      }
      return {
        [f]: p,
        [u]: m
      };
    }
  };
}, Pi = function(e) {
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
      } = je(e, t), l = await Vt(t, c), u = Ue(o), f = At(o), p = Ze(o) === "y", {
        width: m,
        height: y
      } = s.floating;
      let h, v;
      u === "top" || u === "bottom" ? (h = u, v = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (v = u, h = f === "end" ? "top" : "bottom");
      const _ = y - l.top - l.bottom, b = m - l.left - l.right, C = Ye(y - l[h], _), S = Ye(m - l[v], b), k = !t.middlewareData.shift;
      let x = C, M = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (M = b), (r = t.middlewareData.shift) != null && r.enabled.y && (x = _), k && !f) {
        const E = ve(l.left, 0), T = ve(l.right, 0), N = ve(l.top, 0), z = ve(l.bottom, 0);
        p ? M = m - 2 * (E !== 0 || T !== 0 ? E + T : ve(l.left, l.right)) : x = y - 2 * (N !== 0 || z !== 0 ? N + z : ve(l.top, l.bottom));
      }
      await d({
        ...t,
        availableWidth: M,
        availableHeight: x
      });
      const L = await a.getDimensions(i.floating);
      return m !== L.width || y !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function _n() {
  return typeof window < "u";
}
function pt(e) {
  return kr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function be(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Le(e) {
  var t;
  return (t = (kr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function kr(e) {
  return _n() ? e instanceof Node || e instanceof be(e).Node : !1;
}
function Oe(e) {
  return _n() ? e instanceof Element || e instanceof be(e).Element : !1;
}
function Be(e) {
  return _n() ? e instanceof HTMLElement || e instanceof be(e).HTMLElement : !1;
}
function so(e) {
  return !_n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof be(e).ShadowRoot;
}
function zt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ae(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Ni(e) {
  return ["table", "td", "th"].includes(pt(e));
}
function Sn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Rr(e) {
  const t = Pr(), n = Oe(e) ? Ae(e) : e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Ii(e) {
  let t = Qe(e);
  for (; Be(t) && !Et(t); ) {
    if (Rr(t))
      return t;
    if (Sn(t))
      return null;
    t = Qe(t);
  }
  return null;
}
function Pr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Et(e) {
  return ["html", "body", "#document"].includes(pt(e));
}
function Ae(e) {
  return be(e).getComputedStyle(e);
}
function En(e) {
  return Oe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Qe(e) {
  if (pt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    so(e) && e.host || // Fallback.
    Le(e)
  );
  return so(t) ? t.host : t;
}
function ns(e) {
  const t = Qe(e);
  return Et(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Be(t) && zt(t) ? t : ns(t);
}
function Ft(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = ns(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = be(o);
  if (s) {
    const i = or(a);
    return t.concat(a, a.visualViewport || [], zt(o) ? o : [], i && n ? Ft(i) : []);
  }
  return t.concat(o, Ft(o, [], n));
}
function or(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function rs(e) {
  const t = Ae(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Be(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = dn(n) !== s || dn(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function Nr(e) {
  return Oe(e) ? e : e.contextElement;
}
function St(e) {
  const t = Nr(e);
  if (!Be(t))
    return Ne(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = rs(t);
  let a = (s ? dn(n.width) : n.width) / r, i = (s ? dn(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const Di = /* @__PURE__ */ Ne(0);
function os(e) {
  const t = be(e);
  return !Pr() || !t.visualViewport ? Di : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Bi(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== be(e) ? !1 : t;
}
function ct(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = Nr(e);
  let a = Ne(1);
  t && (r ? Oe(r) && (a = St(r)) : a = St(e));
  const i = Bi(s, n, r) ? os(s) : Ne(0);
  let d = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, l = o.width / a.x, u = o.height / a.y;
  if (s) {
    const f = be(s), p = r && Oe(r) ? be(r) : r;
    let m = f, y = or(m);
    for (; y && r && p !== m; ) {
      const h = St(y), v = y.getBoundingClientRect(), _ = Ae(y), b = v.left + (y.clientLeft + parseFloat(_.paddingLeft)) * h.x, C = v.top + (y.clientTop + parseFloat(_.paddingTop)) * h.y;
      d *= h.x, c *= h.y, l *= h.x, u *= h.y, d += b, c += C, m = be(y), y = or(m);
    }
  }
  return pn({
    width: l,
    height: u,
    x: d,
    y: c
  });
}
function Ir(e, t) {
  const n = En(e).scrollLeft;
  return t ? t.left + n : ct(Le(e)).left + n;
}
function ss(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Ir(e, r)
  )), s = r.top + t.scrollTop;
  return {
    x: o,
    y: s
  };
}
function Mi(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = Le(r), i = t ? Sn(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Ne(1);
  const l = Ne(0), u = Be(r);
  if ((u || !u && !s) && ((pt(r) !== "body" || zt(a)) && (d = En(r)), Be(r))) {
    const p = ct(r);
    c = St(r), l.x = p.x + r.clientLeft, l.y = p.y + r.clientTop;
  }
  const f = a && !u && !s ? ss(a, d, !0) : Ne(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - d.scrollLeft * c.x + l.x + f.x,
    y: n.y * c.y - d.scrollTop * c.y + l.y + f.y
  };
}
function Li(e) {
  return Array.from(e.getClientRects());
}
function $i(e) {
  const t = Le(e), n = En(e), r = e.ownerDocument.body, o = ve(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ve(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Ir(e);
  const i = -n.scrollTop;
  return Ae(r).direction === "rtl" && (a += ve(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
function Vi(e, t) {
  const n = be(e), r = Le(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, d = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = Pr();
    (!c || c && t === "fixed") && (i = o.offsetLeft, d = o.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: i,
    y: d
  };
}
function Fi(e, t) {
  const n = ct(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Be(e) ? St(e) : Ne(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, d = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: d,
    y: c
  };
}
function ao(e, t, n) {
  let r;
  if (t === "viewport")
    r = Vi(e, n);
  else if (t === "document")
    r = $i(Le(e));
  else if (Oe(t))
    r = Fi(t, n);
  else {
    const o = os(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return pn(r);
}
function as(e, t) {
  const n = Qe(e);
  return n === t || !Oe(n) || Et(n) ? !1 : Ae(n).position === "fixed" || as(n, t);
}
function qi(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ft(e, [], !1).filter((i) => Oe(i) && pt(i) !== "body"), o = null;
  const s = Ae(e).position === "fixed";
  let a = s ? Qe(e) : e;
  for (; Oe(a) && !Et(a); ) {
    const i = Ae(a), d = Rr(a);
    !d && i.position === "fixed" && (o = null), (s ? !d && !o : !d && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || zt(a) && !d && as(e, a)) ? r = r.filter((l) => l !== a) : o = i, a = Qe(a);
  }
  return t.set(e, r), r;
}
function ji(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Sn(t) ? [] : qi(t, this._c) : [].concat(n), r], i = a[0], d = a.reduce((c, l) => {
    const u = ao(t, l, o);
    return c.top = ve(u.top, c.top), c.right = Ye(u.right, c.right), c.bottom = Ye(u.bottom, c.bottom), c.left = ve(u.left, c.left), c;
  }, ao(t, i, o));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function Ui(e) {
  const {
    width: t,
    height: n
  } = rs(e);
  return {
    width: t,
    height: n
  };
}
function zi(e, t, n) {
  const r = Be(t), o = Le(t), s = n === "fixed", a = ct(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = Ne(0);
  if (r || !r && !s)
    if ((pt(t) !== "body" || zt(o)) && (i = En(t)), r) {
      const f = ct(t, !0, s, t);
      d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
    } else o && (d.x = Ir(o));
  const c = o && !r && !s ? ss(o, i) : Ne(0), l = a.left + i.scrollLeft - d.x - c.x, u = a.top + i.scrollTop - d.y - c.y;
  return {
    x: l,
    y: u,
    width: a.width,
    height: a.height
  };
}
function Fn(e) {
  return Ae(e).position === "static";
}
function io(e, t) {
  if (!Be(e) || Ae(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Le(e) === n && (n = n.ownerDocument.body), n;
}
function is(e, t) {
  const n = be(e);
  if (Sn(e))
    return n;
  if (!Be(e)) {
    let o = Qe(e);
    for (; o && !Et(o); ) {
      if (Oe(o) && !Fn(o))
        return o;
      o = Qe(o);
    }
    return n;
  }
  let r = io(e, t);
  for (; r && Ni(r) && Fn(r); )
    r = io(r, t);
  return r && Et(r) && Fn(r) && !Rr(r) ? n : r || Ii(e) || n;
}
const Hi = async function(e) {
  const t = this.getOffsetParent || is, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: zi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Wi(e) {
  return Ae(e).direction === "rtl";
}
const Gi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Mi,
  getDocumentElement: Le,
  getClippingRect: ji,
  getOffsetParent: is,
  getElementRects: Hi,
  getClientRects: Li,
  getDimensions: Ui,
  getScale: St,
  isElement: Oe,
  isRTL: Wi
};
function Ki(e, t) {
  let n = null, r;
  const o = Le(e);
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
    const p = Xt(l), m = Xt(o.clientWidth - (c + u)), y = Xt(o.clientHeight - (l + f)), h = Xt(c), _ = {
      rootMargin: -p + "px " + -m + "px " + -y + "px " + -h + "px",
      threshold: ve(0, Ye(1, d)) || 1
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
        ..._,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(C, _);
    }
    n.observe(e);
  }
  return a(!0), s;
}
function Ji(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = r, c = Nr(e), l = o || s ? [...c ? Ft(c) : [], ...Ft(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), s && v.addEventListener("resize", n);
  });
  const u = c && i ? Ki(c, n) : null;
  let f = -1, p = null;
  a && (p = new ResizeObserver((v) => {
    let [_] = v;
    _ && _.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var b;
      (b = p) == null || b.observe(t);
    })), n();
  }), c && !d && p.observe(c), p.observe(t));
  let m, y = d ? ct(e) : null;
  d && h();
  function h() {
    const v = ct(e);
    y && (v.x !== y.x || v.y !== y.y || v.width !== y.width || v.height !== y.height) && n(), y = v, m = requestAnimationFrame(h);
  }
  return n(), () => {
    var v;
    l.forEach((_) => {
      o && _.removeEventListener("scroll", n), s && _.removeEventListener("resize", n);
    }), u == null || u(), (v = p) == null || v.disconnect(), p = null, d && cancelAnimationFrame(m);
  };
}
const Xi = Ti, Yi = ki, lo = Ci, Zi = Pi, Qi = Oi, el = Ei, tl = Ri, nl = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Gi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Si(e, t, {
    ...o,
    platform: s
  });
};
function Yt(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function qn(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function rl(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function sr(e) {
  if (rl(e)) {
    const t = e.$el;
    return kr(t) && pt(t) === "#comment" ? null : t;
  }
  return e;
}
function wt(e) {
  return typeof e == "function" ? e() : g(e);
}
function ol(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = sr(wt(e.element));
      return n == null ? {} : el({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function ls(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function uo(e, t) {
  const n = ls(e);
  return Math.round(t * n) / n;
}
function sl(e, t, n) {
  n === void 0 && (n = {});
  const r = n.whileElementsMounted, o = I(() => {
    var x;
    return (x = wt(n.open)) != null ? x : !0;
  }), s = I(() => wt(n.middleware)), a = I(() => {
    var x;
    return (x = wt(n.placement)) != null ? x : "bottom";
  }), i = I(() => {
    var x;
    return (x = wt(n.strategy)) != null ? x : "absolute";
  }), d = I(() => {
    var x;
    return (x = wt(n.transform)) != null ? x : !0;
  }), c = I(() => sr(e.value)), l = I(() => sr(t.value)), u = P(0), f = P(0), p = P(i.value), m = P(a.value), y = qo({}), h = P(!1), v = I(() => {
    const x = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!l.value)
      return x;
    const M = uo(l.value, u.value), L = uo(l.value, f.value);
    return d.value ? {
      ...x,
      transform: "translate(" + M + "px, " + L + "px)",
      ...ls(l.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: M + "px",
      top: L + "px"
    };
  });
  let _;
  function b() {
    if (c.value == null || l.value == null)
      return;
    const x = o.value;
    nl(c.value, l.value, {
      middleware: s.value,
      placement: a.value,
      strategy: i.value
    }).then((M) => {
      u.value = M.x, f.value = M.y, p.value = M.strategy, m.value = M.placement, y.value = M.middlewareData, h.value = x !== !1;
    });
  }
  function C() {
    typeof _ == "function" && (_(), _ = void 0);
  }
  function S() {
    if (C(), r === void 0) {
      b();
      return;
    }
    if (c.value != null && l.value != null) {
      _ = r(c.value, l.value, b);
      return;
    }
  }
  function k() {
    o.value || (h.value = !1);
  }
  return K([s, a, i, o], b, {
    flush: "sync"
  }), K([c, l], S, {
    flush: "sync"
  }), K(o, k, {
    flush: "sync"
  }), vn() && bn(C), {
    x: gt(u),
    y: gt(f),
    strategy: gt(p),
    placement: gt(m),
    middlewareData: gt(y),
    isPositioned: gt(h),
    floatingStyles: v,
    update: b
  };
}
function ye(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
  return [(o) => {
    const s = Sr(r, o);
    if (s || s === null)
      return s;
    throw new Error(
      `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (o) => (Ho(r, o), o)];
}
function us(e, t, n) {
  const r = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(o);
}
function co(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(n, Math.max(t, e));
}
function Dr(e) {
  return e == null;
}
function al(e, t) {
  var n;
  const r = qo();
  return pe(() => {
    r.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), Ra(r);
}
function Br(e) {
  return vn() ? (bn(e), !0) : !1;
}
function il(e) {
  let t = !1, n;
  const r = wn(!0);
  return (...o) => (t || (n = r.run(() => e(...o)), t = !0), n);
}
function ll(e) {
  let t = 0, n, r;
  const o = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...s) => (t += 1, n || (r = wn(!0), n = r.run(() => e(...s))), Br(o), n);
}
function it(e) {
  return typeof e == "function" ? e() : g(e);
}
const tt = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ul = (e) => typeof e < "u", cl = Object.prototype.toString, dl = (e) => cl.call(e) === "[object Object]", fl = () => {
}, fo = /* @__PURE__ */ pl();
function pl() {
  var e, t;
  return tt && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function ml(e) {
  return Me();
}
function hl(e, t = 1e4) {
  return Ca((n, r) => {
    let o = it(e), s;
    const a = () => setTimeout(() => {
      o = it(e), r();
    }, it(t));
    return Br(() => {
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
function gl(e, t) {
  ml() && xr(e, t);
}
function ze(e) {
  var t;
  const n = it(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Mr = tt ? window : void 0;
function mn(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = Mr) : [t, n, r, o] = e, !t)
    return fl;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((l) => l()), s.length = 0;
  }, i = (l, u, f, p) => (l.addEventListener(u, f, p), () => l.removeEventListener(u, f, p)), d = K(
    () => [ze(t), it(o)],
    ([l, u]) => {
      if (a(), !l)
        return;
      const f = dl(u) ? { ...u } : u;
      s.push(
        ...n.flatMap((p) => r.map((m) => i(l, p, m, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), a();
  };
  return Br(c), c;
}
function yl(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function vl(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: o = Mr,
    eventName: s = "keydown",
    passive: a = !1,
    dedupe: i = !1
  } = r, d = yl(t);
  return mn(o, s, (c) => {
    c.repeat && it(i) || d(c) && n(c);
  }, a);
}
function bl() {
  const e = P(!1), t = Me();
  return t && Te(() => {
    e.value = !0;
  }, t), e;
}
function wl(e) {
  return JSON.parse(JSON.stringify(e));
}
function et(e, t, n, r = {}) {
  var o, s, a;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: u,
    shouldEmit: f
  } = r, p = Me(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let y = c;
  t || (t = "modelValue"), y = y || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : wl(b) : b, v = () => ul(e[t]) ? h(e[t]) : u, _ = (b) => {
    f ? f(b) && m(y, b) : m(y, b);
  };
  if (d) {
    const b = v(), C = P(b);
    let S = !1;
    return K(
      () => e[t],
      (k) => {
        S || (S = !0, C.value = h(k), de(() => S = !1));
      }
    ), K(
      C,
      (k) => {
        !S && (k !== e[t] || l) && _(k);
      },
      { deep: l }
    ), C;
  } else
    return I({
      get() {
        return v();
      },
      set(b) {
        _(b);
      }
    });
}
function Lr(e) {
  return e ? e.flatMap((t) => t.type === De ? Lr(t.children) : [t]) : [];
}
function jn(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function ar(e, t, n = ".", r) {
  if (!jn(t))
    return ar(e, {}, n);
  const o = Object.assign({}, t);
  for (const s in e) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const a = e[s];
    a != null && (Array.isArray(a) && Array.isArray(o[s]) ? o[s] = [...a, ...o[s]] : jn(a) && jn(o[s]) ? o[s] = ar(
      a,
      o[s],
      (n ? `${n}.` : "") + s.toString()
    ) : o[s] = a);
  }
  return o;
}
function xl(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, r) => ar(n, r, ""), {})
  );
}
const _l = xl(), [Cn, mm] = ye("ConfigProvider");
let Sl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", El = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Sl[Math.random() * 64 | 0];
  return t;
};
const Cl = ll(() => {
  const e = P(/* @__PURE__ */ new Map()), t = P(), n = I(() => {
    for (const a of e.value.values())
      if (a)
        return !0;
    return !1;
  }), r = Cn({
    scrollBody: P(!0)
  });
  let o = null;
  const s = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", fo && (o == null || o()), t.value = void 0;
  };
  return K(n, (a, i) => {
    var d;
    if (!tt)
      return;
    if (!a) {
      i && s();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const c = window.innerWidth - document.documentElement.clientWidth, l = { padding: c, margin: 0 }, u = (d = r.scrollBody) != null && d.value ? typeof r.scrollBody.value == "object" ? _l({
      padding: r.scrollBody.value.padding === !0 ? c : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? c : r.scrollBody.value.margin
    }, l) : l : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), fo && (o = mn(
      document,
      "touchmove",
      (f) => Al(f),
      { passive: !1 }
    )), de(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function Ol(e) {
  const t = El(6), n = Cl();
  n.value.set(t, e ?? !1);
  const r = I({
    get: () => n.value.get(t) ?? !1,
    set: (o) => n.value.set(t, o)
  });
  return gl(() => {
    n.value.delete(t);
  }), r;
}
function cs(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : cs(n);
  }
}
function Al(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && cs(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
const Tl = "data-radix-vue-collection-item";
function On(e, t = Tl) {
  const n = Symbol();
  return { createCollection: (r) => {
    const o = P([]);
    function s() {
      const a = ze(r);
      return a ? o.value = Array.from(
        a.querySelectorAll(`[${t}]:not([data-disabled])`)
      ) : o.value = [];
    }
    return Oa(() => {
      o.value = [];
    }), Te(s), Aa(s), K(() => r == null ? void 0 : r.value, s, { immediate: !0 }), Ho(n, o), o;
  }, injectCollection: () => Sr(n, P([])) };
}
function $r(e) {
  const t = Cn({
    dir: P("ltr")
  });
  return I(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function kl(e) {
  const t = Me(), n = t == null ? void 0 : t.type.emits, r = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((o) => {
    r[Sa(jo(o))] = (...s) => e(o, ...s);
  }), r;
}
let Un = 0;
function Rl() {
  pe((e) => {
    if (!tt)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? po()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? po()
    ), Un++, e(() => {
      Un === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Un--;
    });
  });
}
function po() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function Vr(e) {
  return I(() => {
    var t;
    return it(e) ? !!((t = ze(e)) != null && t.closest("form")) : !0;
  });
}
function nt(e) {
  const t = Me(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, s) => {
    const a = (t == null ? void 0 : t.type.props[s]).default;
    return a !== void 0 && (o[s] = a), o;
  }, {}), r = nn(e);
  return I(() => {
    const o = {}, s = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(s).forEach((a) => {
      o[jo(a)] = s[a];
    }), Object.keys({ ...n, ...o }).reduce((a, i) => (r.value[i] !== void 0 && (a[i] = r.value[i]), a), {});
  });
}
function Ht(e, t) {
  const n = nt(e), r = t ? kl(t) : {};
  return I(() => ({
    ...n.value,
    ...r
  }));
}
function te() {
  const e = Me(), t = P(), n = I(() => {
    var a, i;
    return ["#text", "#comment"].includes((a = t.value) == null ? void 0 : a.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : ze(t);
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
var Pl = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, yt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), Qt = {}, zn = 0, ds = function(e) {
  return e && (e.host || ds(e.parentNode));
}, Nl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ds(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Il = function(e, t, n, r) {
  var o = Nl(t, Array.isArray(e) ? e : [e]);
  Qt[n] || (Qt[n] = /* @__PURE__ */ new WeakMap());
  var s = Qt[n], a = [], i = /* @__PURE__ */ new Set(), d = new Set(o), c = function(u) {
    !u || i.has(u) || (i.add(u), c(u.parentNode));
  };
  o.forEach(c);
  var l = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (i.has(f))
        l(f);
      else
        try {
          var p = f.getAttribute(r), m = p !== null && p !== "false", y = (yt.get(f) || 0) + 1, h = (s.get(f) || 0) + 1;
          yt.set(f, y), s.set(f, h), a.push(f), y === 1 && m && Zt.set(f, !0), h === 1 && f.setAttribute(n, "true"), m || f.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", f, v);
        }
    });
  };
  return l(t), i.clear(), zn++, function() {
    a.forEach(function(u) {
      var f = yt.get(u) - 1, p = s.get(u) - 1;
      yt.set(u, f), s.set(u, p), f || (Zt.has(u) || u.removeAttribute(r), Zt.delete(u)), p || u.removeAttribute(n);
    }), zn--, zn || (yt = /* @__PURE__ */ new WeakMap(), yt = /* @__PURE__ */ new WeakMap(), Zt = /* @__PURE__ */ new WeakMap(), Qt = {});
  };
}, Dl = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Pl(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Il(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
function Bl(e) {
  let t;
  K(() => ze(e), (n) => {
    n ? t = Dl(n) : t && t();
  }), _r(() => {
    t && t();
  });
}
let Ml = 0;
function Fr(e, t = "radix") {
  const n = Cn({ useId: void 0 });
  return Qr.useId ? `${t}-${Qr.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++Ml}`;
}
function Ll(e) {
  const t = P(), n = I(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.width) ?? 0;
  }), r = I(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.height) ?? 0;
  });
  return Te(() => {
    const o = ze(e);
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
function $l(e, t) {
  const n = P(e);
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
const Vl = "data-item-text";
function fs(e) {
  const t = hl("", 1e3);
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
          textValue: ((f = (u.querySelector(`[${Vl}]`) ?? u).textContent) == null ? void 0 : f.trim()) ?? ""
        };
      }), i = a.find((u) => u.ref === s), d = a.map((u) => u.textValue), c = ql(d, t.value, i == null ? void 0 : i.textValue), l = a.find((u) => u.textValue === c);
      return l && l.ref.focus(), l == null ? void 0 : l.ref;
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function Fl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function ql(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((i) => i === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let s = Fl(e, Math.max(o, 0));
  r.length === 1 && (s = s.filter((i) => i !== n));
  const a = s.find(
    (i) => i.toLowerCase().startsWith(r.toLowerCase())
  );
  return a !== n ? a : void 0;
}
const qr = q({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r, o;
      if (!n.default)
        return null;
      const s = Lr(n.default()), a = s.findIndex((l) => l.type !== xa);
      if (a === -1)
        return s;
      const i = s[a];
      (r = i.props) == null || delete r.ref;
      const d = i.props ? G(t, i.props) : t;
      t.class && (o = i.props) != null && o.class && delete i.props.class;
      const c = _a(i, d);
      for (const l in d)
        l.startsWith("on") && (c.props || (c.props = {}), c.props[l] = d[l]);
      return s.length === 1 ? c : (s[a] = c, s);
    };
  }
}), X = q({
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
    return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => Pe(r, t) : r !== "template" ? () => Pe(e.as, t, { default: n.default }) : () => Pe(qr, t, { default: n.default });
  }
});
function jr() {
  const e = P(), t = I(() => {
    var n, r;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : ze(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function jl(e, t) {
  var n;
  const r = P({}), o = P("none"), s = P(e), a = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? Mr, { state: c, dispatch: l } = $l(a, {
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
    if (tt) {
      const _ = new CustomEvent(h, { bubbles: !1, cancelable: !1 });
      (v = t.value) == null || v.dispatchEvent(_);
    }
  };
  K(
    e,
    async (h, v) => {
      var _;
      const b = v !== h;
      if (await de(), b) {
        const C = o.value, S = en(t.value);
        h ? (l("MOUNT"), u("enter"), S === "none" && u("after-enter")) : S === "none" || ((_ = r.value) == null ? void 0 : _.display) === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : v && C !== S ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const f = (h) => {
    const v = en(t.value), _ = v.includes(
      h.animationName
    ), b = c.value === "mounted" ? "enter" : "leave";
    if (h.target === t.value && _ && (u(`after-${b}`), l("ANIMATION_END"), !s.value)) {
      const C = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var S;
        ((S = t.value) == null ? void 0 : S.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = C);
      });
    }
    h.target === t.value && v === "none" && l("ANIMATION_END");
  }, p = (h) => {
    h.target === t.value && (o.value = en(t.value));
  }, m = K(
    t,
    (h, v) => {
      h ? (r.value = getComputedStyle(h), h.addEventListener("animationstart", p), h.addEventListener("animationcancel", f), h.addEventListener("animationend", f)) : (l("ANIMATION_END"), d == null || d.clearTimeout(i), v == null || v.removeEventListener("animationstart", p), v == null || v.removeEventListener("animationcancel", f), v == null || v.removeEventListener("animationend", f));
    },
    { immediate: !0 }
  ), y = K(c, () => {
    const h = en(t.value);
    o.value = c.value === "mounted" ? h : "none";
  });
  return _r(() => {
    m(), y();
  }), {
    isPresent: I(
      () => ["mounted", "unmountSuspended"].includes(c.value)
    )
  };
}
function en(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const ps = q({
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
    const { present: o, forceMount: s } = Ce(e), a = P(), { isPresent: i } = jl(o, a);
    n({ present: i });
    let d = t.default({ present: i });
    d = Lr(d || []);
    const c = Me();
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
    return () => s.value || o.value || i.value ? Pe(t.default({ present: i })[0], {
      ref: (l) => {
        const u = ze(l);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? a.value = u.firstElementChild : a.value = u), u;
      }
    }) : null;
  }
}), Ul = /* @__PURE__ */ q({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = bl();
    return (n, r) => g(t) || n.forceMount ? (A(), B(wr, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      D(n.$slots, "default")
    ], 8, ["to", "disabled"])) : ue("", !0);
  }
}), zl = "dismissableLayer.pointerDownOutside", Hl = "dismissableLayer.focusOutside";
function ms(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), r = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && r === n || o.indexOf(r) < o.indexOf(n));
}
function Wl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = P(!1), s = P(() => {
  });
  return pe((a) => {
    if (!tt)
      return;
    const i = async (c) => {
      const l = c.target;
      if (t != null && t.value) {
        if (ms(t.value, l)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let u = function() {
            us(
              zl,
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
function Gl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = P(!1);
  return pe((s) => {
    if (!tt)
      return;
    const a = async (i) => {
      t != null && t.value && (await de(), !(!t.value || ms(t.value, i.target)) && i.target && !o.value && us(
        Hl,
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
const Fe = yr({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Kl = /* @__PURE__ */ q({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o, currentElement: s } = te(), a = I(
      () => {
        var m;
        return ((m = s.value) == null ? void 0 : m.ownerDocument) ?? globalThis.document;
      }
    ), i = I(() => Fe.layersRoot), d = I(() => s.value ? Array.from(i.value).indexOf(s.value) : -1), c = I(() => Fe.layersWithOutsidePointerEventsDisabled.size > 0), l = I(() => {
      const m = Array.from(i.value), [y] = [...Fe.layersWithOutsidePointerEventsDisabled].slice(-1), h = m.indexOf(y);
      return d.value >= h;
    }), u = Wl(async (m) => {
      const y = [...Fe.branches].some(
        (h) => h == null ? void 0 : h.contains(m.target)
      );
      !l.value || y || (r("pointerDownOutside", m), r("interactOutside", m), await de(), m.defaultPrevented || r("dismiss"));
    }, s), f = Gl((m) => {
      [...Fe.branches].some(
        (y) => y == null ? void 0 : y.contains(m.target)
      ) || (r("focusOutside", m), r("interactOutside", m), m.defaultPrevented || r("dismiss"));
    }, s);
    vl("Escape", (m) => {
      d.value === i.value.size - 1 && (r("escapeKeyDown", m), m.defaultPrevented || r("dismiss"));
    });
    let p;
    return pe((m) => {
      s.value && (n.disableOutsidePointerEvents && (Fe.layersWithOutsidePointerEventsDisabled.size === 0 && (p = a.value.body.style.pointerEvents, a.value.body.style.pointerEvents = "none"), Fe.layersWithOutsidePointerEventsDisabled.add(s.value)), i.value.add(s.value), m(() => {
        n.disableOutsidePointerEvents && Fe.layersWithOutsidePointerEventsDisabled.size === 1 && (a.value.body.style.pointerEvents = p);
      }));
    }), pe((m) => {
      m(() => {
        s.value && (i.value.delete(s.value), Fe.layersWithOutsidePointerEventsDisabled.delete(s.value));
      });
    }), (m, y) => (A(), B(g(X), {
      ref: g(o),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: xn({
        pointerEvents: c.value ? l.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: g(f).onFocusCapture,
      onBlurCapture: g(f).onBlurCapture,
      onPointerdownCapture: g(u).onPointerDownCapture
    }, {
      default: O(() => [
        D(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Hn = "focusScope.autoFocusOnMount", Wn = "focusScope.autoFocusOnUnmount", mo = { bubbles: !1, cancelable: !0 };
function Jl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Ge(r, { select: t }), document.activeElement !== n)
      return !0;
}
function Xl(e) {
  const t = hs(e), n = ho(t, e), r = ho(t.reverse(), e);
  return [n, r];
}
function hs(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function ho(e, t) {
  for (const n of e)
    if (!Yl(n, { upTo: t }))
      return n;
}
function Yl(e, { upTo: t }) {
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
function Zl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ge(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Zl(e) && t && e.select();
  }
}
const Ql = il(() => P([]));
function eu() {
  const e = Ql();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = go(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = go(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function go(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function tu(e) {
  return e.filter((t) => t.tagName !== "A");
}
const nu = /* @__PURE__ */ q({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, r = t, { currentRef: o, currentElement: s } = te(), a = P(null), i = eu(), d = yr({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    pe((l) => {
      if (!tt)
        return;
      const u = s.value;
      if (!n.trapped)
        return;
      function f(h) {
        if (d.paused || !u)
          return;
        const v = h.target;
        u.contains(v) ? a.value = v : Ge(a.value, { select: !0 });
      }
      function p(h) {
        if (d.paused || !u)
          return;
        const v = h.relatedTarget;
        v !== null && (u.contains(v) || Ge(a.value, { select: !0 }));
      }
      function m(h) {
        u.contains(a.value) || Ge(u);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", p);
      const y = new MutationObserver(m);
      u && y.observe(u, { childList: !0, subtree: !0 }), l(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", p), y.disconnect();
      });
    }), pe(async (l) => {
      const u = s.value;
      if (await de(), !u)
        return;
      i.add(d);
      const f = document.activeElement;
      if (!u.contains(f)) {
        const p = new CustomEvent(Hn, mo);
        u.addEventListener(Hn, (m) => r("mountAutoFocus", m)), u.dispatchEvent(p), p.defaultPrevented || (Jl(tu(hs(u)), {
          select: !0
        }), document.activeElement === f && Ge(u));
      }
      l(() => {
        u.removeEventListener(Hn, (y) => r("mountAutoFocus", y));
        const p = new CustomEvent(Wn, mo), m = (y) => {
          r("unmountAutoFocus", y);
        };
        u.addEventListener(Wn, m), u.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || Ge(f ?? document.body, { select: !0 }), u.removeEventListener(Wn, m), i.remove(d);
        }, 0);
      });
    });
    function c(l) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = l.key === "Tab" && !l.altKey && !l.ctrlKey && !l.metaKey, f = document.activeElement;
      if (u && f) {
        const p = l.currentTarget, [m, y] = Xl(p);
        m && y ? !l.shiftKey && f === y ? (l.preventDefault(), n.loop && Ge(m, { select: !0 })) : l.shiftKey && f === m && (l.preventDefault(), n.loop && Ge(y, { select: !0 })) : f === p && l.preventDefault();
      }
    }
    return (l, u) => (A(), B(g(X), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": l.asChild,
      as: l.as,
      onKeydown: c
    }, {
      default: O(() => [
        D(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function yo(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [gs, ru] = ye("PopperRoot"), ou = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = P();
    return ru({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, r) => D(n.$slots, "default");
  }
}), su = /* @__PURE__ */ q({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = te(), o = gs();
    return pe(() => {
      o.onAnchorChange(t.element ?? r.value);
    }), (s, a) => (A(), B(g(X), {
      ref: g(n),
      as: s.as,
      "as-child": s.asChild
    }, {
      default: O(() => [
        D(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function au(e) {
  return e !== null;
}
function iu(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, r, o;
      const { placement: s, rects: a, middlewareData: i } = t, d = ((n = i.arrow) == null ? void 0 : n.centerOffset) !== 0, c = d ? 0 : e.arrowWidth, l = d ? 0 : e.arrowHeight, [u, f] = ir(s), p = { start: "0%", center: "50%", end: "100%" }[f], m = (((r = i.arrow) == null ? void 0 : r.x) ?? 0) + c / 2, y = (((o = i.arrow) == null ? void 0 : o.y) ?? 0) + l / 2;
      let h = "", v = "";
      return u === "bottom" ? (h = d ? p : `${m}px`, v = `${-l}px`) : u === "top" ? (h = d ? p : `${m}px`, v = `${a.floating.height + l}px`) : u === "right" ? (h = `${-l}px`, v = d ? p : `${y}px`) : u === "left" && (h = `${a.floating.width + l}px`, v = d ? p : `${y}px`), { data: { x: h, y: v } };
    }
  };
}
function ir(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const lu = {
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
}, [hm, uu] = ye("PopperContent"), cu = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Ta({
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
    ...lu
  }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = gs(), { forwardRef: s, currentElement: a } = te(), i = P(), d = P(), { width: c, height: l } = Ll(d), u = I(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), f = I(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), p = I(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), m = I(() => ({
      padding: f.value,
      boundary: p.value.filter(au),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), y = al(() => [
      Xi({
        mainAxis: n.sideOffset + l.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && lo({
        ...m.value
      }),
      n.avoidCollisions && Yi({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? tl() : void 0,
        ...m.value
      }),
      !n.prioritizePosition && n.avoidCollisions && lo({
        ...m.value
      }),
      Zi({
        ...m.value,
        apply: ({ elements: E, rects: T, availableWidth: N, availableHeight: z }) => {
          const { width: j, height: se } = T.reference, Y = E.floating.style;
          Y.setProperty(
            "--radix-popper-available-width",
            `${N}px`
          ), Y.setProperty(
            "--radix-popper-available-height",
            `${z}px`
          ), Y.setProperty(
            "--radix-popper-anchor-width",
            `${j}px`
          ), Y.setProperty(
            "--radix-popper-anchor-height",
            `${se}px`
          );
        }
      }),
      d.value && ol({ element: d.value, padding: n.arrowPadding }),
      iu({
        arrowWidth: c.value,
        arrowHeight: l.value
      }),
      n.hideWhenDetached && Qi({ strategy: "referenceHidden", ...m.value })
    ]), { floatingStyles: h, placement: v, isPositioned: _, middlewareData: b } = sl(
      o.anchor,
      i,
      {
        strategy: "fixed",
        placement: u,
        whileElementsMounted: (...E) => Ji(...E, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: y
      }
    ), C = I(
      () => ir(v.value)[0]
    ), S = I(
      () => ir(v.value)[1]
    );
    ka(() => {
      _.value && r("placed");
    });
    const k = I(
      () => {
        var E;
        return ((E = b.value.arrow) == null ? void 0 : E.centerOffset) !== 0;
      }
    ), x = P("");
    pe(() => {
      a.value && (x.value = window.getComputedStyle(a.value).zIndex);
    });
    const M = I(() => {
      var E;
      return ((E = b.value.arrow) == null ? void 0 : E.x) ?? 0;
    }), L = I(() => {
      var E;
      return ((E = b.value.arrow) == null ? void 0 : E.y) ?? 0;
    });
    return uu({
      placedSide: C,
      onArrowChange: (E) => d.value = E,
      arrowX: M,
      arrowY: L,
      shouldHideArrow: k
    }), (E, T) => {
      var N, z, j;
      return A(), U("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: xn({
          ...g(h),
          transform: g(_) ? g(h).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: x.value,
          "--radix-popper-transform-origin": [
            (N = g(b).transformOrigin) == null ? void 0 : N.x,
            (z = g(b).transformOrigin) == null ? void 0 : z.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((j = g(b).hide) == null ? void 0 : j.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        R(g(X), G({ ref: g(s) }, E.$attrs, {
          "as-child": n.asChild,
          as: E.as,
          "data-side": C.value,
          "data-align": S.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: g(_) ? void 0 : "none"
          }
        }), {
          default: O(() => [
            D(E.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), du = /* @__PURE__ */ q({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return te(), (t, n) => (A(), B(g(X), {
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
      default: O(() => [
        D(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), fu = "data-radix-vue-collection-item", [Ur, pu] = ye("CollectionProvider");
function mu(e = fu) {
  const t = P(/* @__PURE__ */ new Map()), n = P(), r = pu({
    collectionRef: n,
    itemMap: t,
    attrName: e
  }), { getItems: o } = ys(r), s = I(() => Array.from(r.itemMap.value.values())), a = I(() => r.itemMap.value.size);
  return { getItems: o, reactiveItems: s, itemMapSize: a };
}
const hu = q({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = Ur(), { primitiveElement: r, currentElement: o } = jr();
    return K(o, () => {
      n.collectionRef.value = o.value;
    }), () => Pe(qr, { ref: r }, t);
  }
}), gu = q({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = Ur(), { primitiveElement: o, currentElement: s } = jr();
    return pe((a) => {
      if (s.value) {
        const i = Ke(s.value);
        r.itemMap.value.set(i, { ref: s.value, value: e.value }), a(() => r.itemMap.value.delete(i));
      }
    }), () => Pe(qr, { ...n, [r.attrName]: "", ref: o }, t);
  }
});
function ys(e) {
  const t = e ?? Ur();
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
function yu(e) {
  const t = Cn({
    nonce: P()
  });
  return I(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const vu = "rovingFocusGroup.onEntryFocus", bu = { bubbles: !1, cancelable: !0 }, wu = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function xu(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function _u(e, t, n) {
  const r = xu(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return wu[r];
}
function vs(e, t = !1, n) {
  const r = (n == null ? void 0 : n.activeElement) ?? document.activeElement;
  for (const o of e)
    if (o === r || (o.focus({ preventScroll: t }), document.activeElement !== r))
      return;
}
function Su(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const [Eu, Cu] = ye("RovingFocusGroup"), Ou = /* @__PURE__ */ q({
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
    const r = e, o = n, { loop: s, orientation: a, dir: i } = Ce(r), d = $r(i), c = et(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), l = P(!1), u = P(!1), f = P(0), { getItems: p } = mu();
    function m(h) {
      const v = !u.value;
      if (h.currentTarget && h.target === h.currentTarget && v && !l.value) {
        const _ = new CustomEvent(vu, bu);
        if (h.currentTarget.dispatchEvent(_), o("entryFocus", _), !_.defaultPrevented) {
          const b = p().map((x) => x.ref).filter((x) => x.dataset.disabled !== ""), C = b.find((x) => x.getAttribute("data-active") === "true"), S = b.find(
            (x) => x.id === c.value
          ), k = [C, S, ...b].filter(
            Boolean
          );
          vs(k, r.preventScrollOnEntryFocus);
        }
      }
      u.value = !1;
    }
    function y() {
      setTimeout(() => {
        u.value = !1;
      }, 1);
    }
    return t({
      getItems: p
    }), Cu({
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
    }), (h, v) => (A(), B(g(hu), null, {
      default: O(() => [
        R(g(X), {
          tabindex: l.value || f.value === 0 ? -1 : 0,
          "data-orientation": g(a),
          as: h.as,
          "as-child": h.asChild,
          dir: g(d),
          style: { outline: "none" },
          onMousedown: v[0] || (v[0] = (_) => u.value = !0),
          onMouseup: y,
          onFocus: m,
          onBlur: v[1] || (v[1] = (_) => l.value = !1)
        }, {
          default: O(() => [
            D(h.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
}), Au = /* @__PURE__ */ q({
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
    const t = e, n = Eu(), r = I(() => t.tabStopId || Fr()), o = I(
      () => n.currentTabStopId.value === r.value
    ), { getItems: s } = ys(), { primitiveElement: a, currentElement: i } = jr(), d = I(() => {
      var l;
      return (l = i.value) == null ? void 0 : l.getRootNode();
    });
    Te(() => {
      t.focusable && n.onFocusableItemAdd();
    }), _r(() => {
      t.focusable && n.onFocusableItemRemove();
    });
    function c(l) {
      if (l.key === "Tab" && l.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (l.target !== l.currentTarget)
        return;
      const u = _u(
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
          f = n.loop.value ? Su(f, p + 1) : f.slice(p + 1);
        }
        de(() => vs(f, !1, d.value));
      }
    }
    return (l, u) => (A(), B(g(gu), null, {
      default: O(() => [
        R(g(X), {
          ref_key: "primitiveElement",
          ref: a,
          tabindex: o.value ? 0 : -1,
          "data-orientation": g(n).orientation.value,
          "data-active": l.active,
          "data-disabled": l.focusable ? void 0 : "",
          as: l.as,
          "as-child": l.asChild,
          onMousedown: u[0] || (u[0] = (f) => {
            l.focusable ? g(n).onItemFocus(r.value) : f.preventDefault();
          }),
          onFocus: u[1] || (u[1] = (f) => g(n).onItemFocus(r.value)),
          onKeydown: c
        }, {
          default: O(() => [
            D(l.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), Tu = /* @__PURE__ */ q({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(e) {
    const t = e;
    return te(), (n, r) => (A(), B(g(X), G(t, {
      onMousedown: r[0] || (r[0] = (o) => {
        !o.defaultPrevented && o.detail > 1 && o.preventDefault();
      })
    }), {
      default: O(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), qt = 100, [ku, Ru] = ye("ProgressRoot"), zr = (e) => typeof e == "number";
function Pu(e, t) {
  return Dr(e) || zr(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${qt} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function Nu(e) {
  return zr(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${qt}\`.`
  ), qt);
}
const Iu = /* @__PURE__ */ q({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: qt },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * qt)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    te();
    const o = et(n, "modelValue", r, {
      passive: n.modelValue === void 0
    }), s = et(n, "max", r, {
      passive: n.max === void 0
    });
    K(
      () => o.value,
      async (i) => {
        const d = Pu(i, n.max);
        d !== i && (await de(), o.value = d);
      },
      { immediate: !0 }
    ), K(
      () => n.max,
      (i) => {
        const d = Nu(n.max);
        d !== i && (s.value = d);
      },
      { immediate: !0 }
    );
    const a = I(() => Dr(o.value) ? "indeterminate" : o.value === s.value ? "complete" : "loading");
    return Ru({
      modelValue: o,
      max: s,
      progressState: a
    }), (i, d) => (A(), B(g(X), {
      "as-child": i.asChild,
      as: i.as,
      "aria-valuemax": g(s),
      "aria-valuemin": 0,
      "aria-valuenow": zr(g(o)) ? g(o) : void 0,
      "aria-valuetext": i.getValueLabel(g(o), g(s)),
      "aria-label": i.getValueLabel(g(o), g(s)),
      role: "progressbar",
      "data-state": a.value,
      "data-value": g(o) ?? void 0,
      "data-max": g(s)
    }, {
      default: O(() => [
        D(i.$slots, "default", { modelValue: g(o) })
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), Du = /* @__PURE__ */ q({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = ku();
    return te(), (r, o) => {
      var s;
      return A(), B(g(X), G(t, {
        "data-state": g(n).progressState.value,
        "data-value": ((s = g(n).modelValue) == null ? void 0 : s.value) ?? void 0,
        "data-max": g(n).max.value
      }), {
        default: O(() => [
          D(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), [Bu, Mu] = ye("RadioGroupRoot"), Lu = /* @__PURE__ */ q({
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
    const n = e, r = t, { forwardRef: o } = te(), s = et(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), { disabled: a, loop: i, orientation: d, name: c, required: l, dir: u } = Ce(n), f = $r(u);
    return Mu({
      modelValue: s,
      changeModelValue: (p) => {
        s.value = p;
      },
      disabled: a,
      loop: i,
      orientation: d,
      name: c == null ? void 0 : c.value,
      required: l
    }), (p, m) => (A(), B(g(Ou), {
      "as-child": "",
      orientation: g(d),
      dir: g(f),
      loop: g(i)
    }, {
      default: O(() => [
        R(g(X), {
          ref: g(o),
          role: "radiogroup",
          "data-disabled": g(a) ? "" : void 0,
          "as-child": p.asChild,
          as: p.as,
          required: g(l),
          "aria-orientation": g(d),
          "aria-required": g(l),
          dir: g(f),
          name: g(c)
        }, {
          default: O(() => [
            D(p.$slots, "default", { modelValue: g(s) })
          ]),
          _: 3
        }, 8, ["data-disabled", "as-child", "as", "required", "aria-orientation", "aria-required", "dir", "name"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
}), $u = ["value", "checked", "name", "disabled", "required"], Vu = /* @__PURE__ */ q({
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
    const n = e, r = et(n, "checked", t, {
      passive: n.checked === void 0
    }), { value: o } = Ce(n), { forwardRef: s, currentElement: a } = te(), i = Vr(a), d = I(() => {
      var l;
      return n.id && a.value ? ((l = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : l.innerText) ?? n.value : void 0;
    });
    function c(l) {
      r.value = !0, i.value && l.stopPropagation();
    }
    return (l, u) => (A(), B(g(X), G(l.$attrs, {
      id: l.id,
      ref: g(s),
      role: "radio",
      type: l.as === "button" ? "button" : void 0,
      as: l.as,
      "aria-checked": g(r),
      "aria-label": d.value,
      "as-child": l.asChild,
      disabled: l.disabled ? "" : void 0,
      "data-state": g(r) ? "checked" : "unchecked",
      "data-disabled": l.disabled ? "" : void 0,
      value: g(o),
      required: l.required,
      name: l.name,
      onClick: Ee(c, ["stop"])
    }), {
      default: O(() => [
        D(l.$slots, "default", { checked: g(r) }),
        g(i) ? (A(), U("input", {
          key: 0,
          type: "radio",
          tabindex: "-1",
          "aria-hidden": "true",
          value: g(o),
          checked: !!g(r),
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
        }, null, 8, $u)) : ue("", !0)
      ]),
      _: 3
    }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]));
  }
}), [Fu, qu] = ye("RadioGroupItem"), ju = /* @__PURE__ */ q({
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
    const t = e, { forwardRef: n, currentElement: r } = te(), o = Bu(), s = I(() => o.disabled.value || t.disabled), a = I(() => o.required.value || t.required), i = I(() => {
      var u;
      return ((u = o.modelValue) == null ? void 0 : u.value) === t.value;
    });
    qu({ disabled: s, checked: i });
    const d = P(!1), c = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    mn("keydown", (u) => {
      c.includes(u.key) && (d.value = !0);
    }), mn("keyup", () => {
      d.value = !1;
    });
    function l() {
      setTimeout(() => {
        var u;
        d.value && ((u = r.value) == null || u.click());
      }, 0);
    }
    return (u, f) => (A(), B(g(Au), {
      checked: i.value,
      disabled: s.value,
      "as-child": "",
      focusable: !s.value,
      active: i.value
    }, {
      default: O(() => [
        R(Vu, G({ ...u.$attrs, ...t }, {
          ref: g(n),
          checked: i.value,
          required: a.value,
          disabled: s.value,
          "onUpdate:checked": f[0] || (f[0] = (p) => g(o).changeModelValue(u.value)),
          onKeydown: f[1] || (f[1] = Uo(Ee(() => {
          }, ["prevent"]), ["enter"])),
          onFocus: l
        }), {
          default: O(() => [
            D(u.$slots, "default")
          ]),
          _: 3
        }, 16, ["checked", "required", "disabled"])
      ]),
      _: 3
    }, 8, ["checked", "disabled", "focusable", "active"]));
  }
}), Uu = /* @__PURE__ */ q({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const { forwardRef: t } = te(), n = Fu();
    return (r, o) => (A(), B(g(ps), {
      present: r.forceMount || g(n).checked.value
    }, {
      default: O(() => [
        R(g(X), G({
          ref: g(t),
          "data-state": g(n).checked.value ? "checked" : "unchecked",
          "data-disabled": g(n).disabled.value ? "" : void 0,
          "as-child": r.asChild,
          as: r.as
        }, r.$attrs), {
          default: O(() => [
            D(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), zu = ["default-value"], Hu = /* @__PURE__ */ q({
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
    const t = e, { value: n } = Ce(t), r = P();
    return (o, s) => (A(), B(g(du), { "as-child": "" }, {
      default: O(() => [
        zo($("select", G({
          ref_key: "selectElement",
          ref: r
        }, t, {
          "onUpdate:modelValue": s[0] || (s[0] = (a) => ut(n) ? n.value = a : null),
          "default-value": g(n)
        }), [
          D(o.$slots, "default")
        ], 16, zu), [
          [Ea, g(n)]
        ])
      ]),
      _: 3
    }));
  }
}), Wu = {
  key: 0,
  value: ""
}, [Tt, bs] = ye("SelectRoot"), [Gu, Ku] = ye("SelectRoot"), Ju = /* @__PURE__ */ q({
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
    const n = e, r = t, o = et(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), s = et(n, "open", r, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), a = P(), i = P(), d = P({
      x: 0,
      y: 0
    }), c = P(!1), { required: l, disabled: u, dir: f } = Ce(n), p = $r(f);
    bs({
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
    const m = Vr(a), y = P(/* @__PURE__ */ new Set()), h = I(() => Array.from(y.value).map((v) => {
      var _;
      return (_ = v.props) == null ? void 0 : _.value;
    }).join(";"));
    return Ku({
      onNativeOptionAdd: (v) => {
        y.value.add(v);
      },
      onNativeOptionRemove: (v) => {
        y.value.delete(v);
      }
    }), (v, _) => (A(), B(g(ou), null, {
      default: O(() => [
        D(v.$slots, "default", {
          modelValue: g(o),
          open: g(s)
        }),
        g(m) ? (A(), B(Hu, G({ key: h.value }, v.$attrs, {
          "aria-hidden": "true",
          tabindex: "-1",
          required: g(l),
          name: v.name,
          autocomplete: v.autocomplete,
          disabled: g(u),
          value: g(o),
          onChange: _[0] || (_[0] = (b) => o.value = b.target.value)
        }), {
          default: O(() => [
            g(o) === void 0 ? (A(), U("option", Wu)) : ue("", !0),
            (A(!0), U(De, null, Lt(Array.from(y.value), (b) => (A(), B(Ct(b), G({ ref_for: !0 }, b.props, {
              key: b.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : ue("", !0)
      ]),
      _: 3
    }));
  }
}), Xu = [" ", "Enter", "ArrowUp", "ArrowDown"], Yu = [" ", "Enter"], _e = 10;
function Zu(e) {
  return e === "" || Dr(e);
}
const Qu = /* @__PURE__ */ q({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, n = Tt(), r = I(() => {
      var p;
      return ((p = n.disabled) == null ? void 0 : p.value) || t.disabled;
    }), { forwardRef: o, currentElement: s } = te();
    n.contentId || (n.contentId = Fr(void 0, "radix-vue-select-content")), Te(() => {
      n.triggerElement = s;
    });
    const { injectCollection: a } = On(), i = a(), { search: d, handleTypeaheadSearch: c, resetTypeahead: l } = fs(i);
    function u() {
      r.value || (n.onOpenChange(!0), l());
    }
    function f(p) {
      u(), n.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, m) => (A(), B(g(su), { "as-child": "" }, {
      default: O(() => {
        var y, h, v, _;
        return [
          R(g(X), {
            ref: g(o),
            role: "combobox",
            type: p.as === "button" ? "button" : void 0,
            "aria-controls": g(n).contentId,
            "aria-expanded": g(n).open.value || !1,
            "aria-required": (y = g(n).required) == null ? void 0 : y.value,
            "aria-autocomplete": "none",
            disabled: r.value,
            dir: (h = g(n)) == null ? void 0 : h.dir.value,
            "data-state": (v = g(n)) != null && v.open.value ? "open" : "closed",
            "data-disabled": r.value ? "" : void 0,
            "data-placeholder": g(Zu)((_ = g(n).modelValue) == null ? void 0 : _.value) ? "" : void 0,
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
            onPointerup: m[2] || (m[2] = Ee(
              (b) => {
                b.pointerType === "touch" && f(b);
              },
              ["prevent"]
            )),
            onKeydown: m[3] || (m[3] = (b) => {
              const C = g(d) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && C && b.key === " " || (g(c)(b.key), g(Xu).includes(b.key) && (u(), b.preventDefault()));
            })
          }, {
            default: O(() => [
              D(p.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), ec = /* @__PURE__ */ q({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), B(g(Ul), vr(br(t)), {
      default: O(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [Hr, tc] = ye("SelectItemAlignedPosition"), nc = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, { injectCollection: o } = On(), s = Tt(), a = mt(), i = o(), d = P(!1), c = P(!0), l = P(), { forwardRef: u, currentElement: f } = te(), { viewport: p, selectedItem: m, selectedItemText: y, focusSelectedItem: h } = a;
    function v() {
      if (s.triggerElement.value && s.valueElement.value && l.value && f.value && p != null && p.value && m != null && m.value && y != null && y.value) {
        const C = s.triggerElement.value.getBoundingClientRect(), S = f.value.getBoundingClientRect(), k = s.valueElement.value.getBoundingClientRect(), x = y.value.getBoundingClientRect();
        if (s.dir.value !== "rtl") {
          const rt = x.left - S.left, $e = k.left - rt, Nt = C.left - $e, ot = C.width + Nt, Mn = Math.max(ot, S.width), Ln = window.innerWidth - _e, $n = co($e, _e, Math.max(_e, Ln - Mn));
          l.value.style.minWidth = `${ot}px`, l.value.style.left = `${$n}px`;
        } else {
          const rt = S.right - x.right, $e = window.innerWidth - k.right - rt, Nt = window.innerWidth - C.right - $e, ot = C.width + Nt, Mn = Math.max(ot, S.width), Ln = window.innerWidth - _e, $n = co(
            $e,
            _e,
            Math.max(_e, Ln - Mn)
          );
          l.value.style.minWidth = `${ot}px`, l.value.style.right = `${$n}px`;
        }
        const M = i.value, L = window.innerHeight - _e * 2, E = p.value.scrollHeight, T = window.getComputedStyle(f.value), N = Number.parseInt(
          T.borderTopWidth,
          10
        ), z = Number.parseInt(T.paddingTop, 10), j = Number.parseInt(
          T.borderBottomWidth,
          10
        ), se = Number.parseInt(
          T.paddingBottom,
          10
        ), Y = N + z + E + se + j, ae = Math.min(
          m.value.offsetHeight * 5,
          Y
        ), Q = window.getComputedStyle(p.value), H = Number.parseInt(Q.paddingTop, 10), ht = Number.parseInt(
          Q.paddingBottom,
          10
        ), me = C.top + C.height / 2 - _e, va = L - me, Bn = m.value.offsetHeight / 2, ba = m.value.offsetTop + Bn, Jt = N + z + ba, wa = Y - Jt;
        if (Jt <= me) {
          const rt = m.value === M[M.length - 1];
          l.value.style.bottom = "0px";
          const $e = f.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, Nt = Math.max(
            va,
            Bn + (rt ? ht : 0) + $e + j
          ), ot = Jt + Nt;
          l.value.style.height = `${ot}px`;
        } else {
          const rt = m.value === M[0];
          l.value.style.top = "0px";
          const $e = Math.max(
            me,
            N + p.value.offsetTop + (rt ? H : 0) + Bn
          ) + wa;
          l.value.style.height = `${$e}px`, p.value.scrollTop = Jt - me + p.value.offsetTop;
        }
        l.value.style.margin = `${_e}px 0`, l.value.style.minHeight = `${ae}px`, l.value.style.maxHeight = `${L}px`, r("placed"), requestAnimationFrame(() => d.value = !0);
      }
    }
    const _ = P("");
    Te(async () => {
      await de(), v(), f.value && (_.value = window.getComputedStyle(f.value).zIndex);
    });
    function b(C) {
      C && c.value === !0 && (v(), h == null || h(), c.value = !1);
    }
    return tc({
      contentWrapper: l,
      shouldExpandOnScrollRef: d,
      onScrollButtonChange: b
    }), (C, S) => (A(), U("div", {
      ref_key: "contentWrapperElement",
      ref: l,
      style: xn({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: _.value
      })
    }, [
      R(g(X), G({
        ref: g(u),
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...C.$attrs, ...n }), {
        default: O(() => [
          D(C.$slots, "default")
        ]),
        _: 3
      }, 16)
    ], 4));
  }
}), rc = /* @__PURE__ */ q({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: _e },
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = nt(e);
    return (n, r) => (A(), B(g(cu), G(g(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: O(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), kt = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [mt, oc] = ye("SelectContent"), sc = /* @__PURE__ */ q({
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
    const n = e, r = t, o = Tt();
    Rl(), Ol(n.bodyLock);
    const { createCollection: s } = On(), a = P();
    Bl(a);
    const i = s(a), { search: d, handleTypeaheadSearch: c } = fs(i), l = P(), u = P(), f = P(), p = P(!1), m = P(!1);
    function y() {
      u.value && a.value && yo([u.value, a.value]);
    }
    K(p, () => {
      y();
    });
    const { onOpenChange: h, triggerPointerDownPosRef: v } = o;
    pe((S) => {
      if (!a.value)
        return;
      let k = { x: 0, y: 0 };
      const x = (L) => {
        var E, T;
        k = {
          x: Math.abs(
            Math.round(L.pageX) - (((E = v.value) == null ? void 0 : E.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(L.pageY) - (((T = v.value) == null ? void 0 : T.y) ?? 0)
          )
        };
      }, M = (L) => {
        var E;
        L.pointerType !== "touch" && (k.x <= 10 && k.y <= 10 ? L.preventDefault() : (E = a.value) != null && E.contains(L.target) || h(!1), document.removeEventListener("pointermove", x), v.value = null);
      };
      v.value !== null && (document.addEventListener("pointermove", x), document.addEventListener("pointerup", M, {
        capture: !0,
        once: !0
      })), S(() => {
        document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", M, {
          capture: !0
        });
      });
    });
    function _(S) {
      const k = S.ctrlKey || S.altKey || S.metaKey;
      if (S.key === "Tab" && S.preventDefault(), !k && S.key.length === 1 && c(S.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(S.key)) {
        let x = i.value;
        if (["ArrowUp", "End"].includes(S.key) && (x = x.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(S.key)) {
          const M = S.target, L = x.indexOf(M);
          x = x.slice(L + 1);
        }
        setTimeout(() => yo(x)), S.preventDefault();
      }
    }
    const b = I(() => n.position === "popper" ? n : {}), C = nt(b.value);
    return oc({
      content: a,
      viewport: l,
      onViewportChange: (S) => {
        l.value = S;
      },
      itemRefCallback: (S, k, x) => {
        var M, L;
        const E = !m.value && !x;
        (((M = o.modelValue) == null ? void 0 : M.value) !== void 0 && ((L = o.modelValue) == null ? void 0 : L.value) === k || E) && (u.value = S, E && (m.value = !0));
      },
      selectedItem: u,
      selectedItemText: f,
      onItemLeave: () => {
        var S;
        (S = a.value) == null || S.focus();
      },
      itemTextRefCallback: (S, k, x) => {
        var M, L;
        const E = !m.value && !x;
        (((M = o.modelValue) == null ? void 0 : M.value) !== void 0 && ((L = o.modelValue) == null ? void 0 : L.value) === k || E) && (f.value = S);
      },
      focusSelectedItem: y,
      position: n.position,
      isPositioned: p,
      searchRef: d
    }), (S, k) => (A(), B(g(nu), {
      "as-child": "",
      onMountAutoFocus: k[6] || (k[6] = Ee(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: k[7] || (k[7] = (x) => {
        var M;
        r("closeAutoFocus", x), !x.defaultPrevented && ((M = g(o).triggerElement.value) == null || M.focus({ preventScroll: !0 }), x.preventDefault());
      })
    }, {
      default: O(() => [
        R(g(Kl), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: k[2] || (k[2] = Ee(() => {
          }, ["prevent"])),
          onDismiss: k[3] || (k[3] = (x) => g(o).onOpenChange(!1)),
          onEscapeKeyDown: k[4] || (k[4] = (x) => r("escapeKeyDown", x)),
          onPointerDownOutside: k[5] || (k[5] = (x) => r("pointerDownOutside", x))
        }, {
          default: O(() => [
            (A(), B(Ct(
              S.position === "popper" ? rc : nc
            ), G({ ...S.$attrs, ...g(C) }, {
              id: g(o).contentId,
              ref: (x) => {
                a.value = g(ze)(x);
              },
              role: "listbox",
              "data-state": g(o).open.value ? "open" : "closed",
              dir: g(o).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: k[0] || (k[0] = Ee(() => {
              }, ["prevent"])),
              onPlaced: k[1] || (k[1] = (x) => p.value = !0),
              onKeydown: _
            }), {
              default: O(() => [
                D(S.$slots, "default")
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
}), ac = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return bs(e.context), (t, n) => D(t.$slots, "default");
  }
}), ic = { key: 1 }, lc = /* @__PURE__ */ q({
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
    const n = e, r = Ht(n, t), o = Tt(), s = P();
    Te(() => {
      s.value = new DocumentFragment();
    });
    const a = P(), i = I(() => n.forceMount || o.open.value);
    return (d, c) => {
      var l;
      return i.value ? (A(), B(g(ps), {
        key: 0,
        ref_key: "presenceRef",
        ref: a,
        present: !0
      }, {
        default: O(() => [
          R(sc, vr(br({ ...g(r), ...d.$attrs })), {
            default: O(() => [
              D(d.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !((l = a.value) != null && l.present) && s.value ? (A(), U("div", ic, [
        (A(), B(wr, { to: s.value }, [
          R(ac, { context: g(o) }, {
            default: O(() => [
              D(d.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : ue("", !0);
    };
  }
}), [ws, uc] = ye("SelectItem"), cc = /* @__PURE__ */ q({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { disabled: n } = Ce(t), r = Tt(), o = mt(kt), { forwardRef: s, currentElement: a } = te(), i = I(() => {
      var y;
      return ((y = r.modelValue) == null ? void 0 : y.value) === t.value;
    }), d = P(!1), c = P(t.textValue ?? ""), l = Fr(void 0, "radix-vue-select-item-text");
    async function u(y) {
      await de(), !(y != null && y.defaultPrevented) && (n.value || (r.onValueChange(t.value), r.onOpenChange(!1)));
    }
    async function f(y) {
      var h;
      await de(), !y.defaultPrevented && (n.value ? (h = o.onItemLeave) == null || h.call(o) : y.currentTarget.focus({ preventScroll: !0 }));
    }
    async function p(y) {
      var h;
      await de(), !y.defaultPrevented && y.currentTarget === document.activeElement && ((h = o.onItemLeave) == null || h.call(o));
    }
    async function m(y) {
      var h;
      await de(), !(y.defaultPrevented || ((h = o.searchRef) == null ? void 0 : h.value) !== "" && y.key === " ") && (Yu.includes(y.key) && u(), y.key === " " && y.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return Te(() => {
      a.value && o.itemRefCallback(
        a.value,
        t.value,
        t.disabled
      );
    }), uc({
      value: t.value,
      disabled: n,
      textId: l,
      isSelected: i,
      onItemTextChange: (y) => {
        c.value = ((c.value || (y == null ? void 0 : y.textContent)) ?? "").trim();
      }
    }), (y, h) => (A(), B(g(X), {
      ref: g(s),
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": g(l),
      "data-highlighted": d.value ? "" : void 0,
      "aria-selected": i.value,
      "data-state": i.value ? "checked" : "unchecked",
      "aria-disabled": g(n) || void 0,
      "data-disabled": g(n) ? "" : void 0,
      tabindex: g(n) ? void 0 : -1,
      as: y.as,
      "as-child": y.asChild,
      onFocus: h[0] || (h[0] = (v) => d.value = !0),
      onBlur: h[1] || (h[1] = (v) => d.value = !1),
      onPointerup: u,
      onPointerdown: h[2] || (h[2] = (v) => {
        v.currentTarget.focus({ preventScroll: !0 });
      }),
      onTouchend: h[3] || (h[3] = Ee(() => {
      }, ["prevent", "stop"])),
      onPointermove: f,
      onPointerleave: p,
      onKeydown: m
    }, {
      default: O(() => [
        D(y.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), dc = /* @__PURE__ */ q({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = ws();
    return (r, o) => g(n).isSelected.value ? (A(), B(g(X), G({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: O(() => [
        D(r.$slots, "default")
      ]),
      _: 3
    }, 16)) : ue("", !0);
  }
}), fc = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = Tt(), r = mt(kt), o = Gu(), s = ws(), { forwardRef: a, currentElement: i } = te(), d = I(() => {
      var c;
      return Pe("option", {
        key: s.value,
        value: s.value,
        disabled: s.disabled.value,
        textContent: (c = i.value) == null ? void 0 : c.textContent
      });
    });
    return Te(() => {
      i.value && (s.onItemTextChange(i.value), r.itemTextRefCallback(
        i.value,
        s.value,
        s.disabled.value
      ), o.onNativeOptionAdd(d.value));
    }), xr(() => {
      o.onNativeOptionRemove(d.value);
    }), (c, l) => (A(), U(De, null, [
      R(g(X), G({
        id: g(s).textId,
        ref: g(a)
      }, { ...t, ...c.$attrs }, { "data-item-text": "" }), {
        default: O(() => [
          D(c.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      g(s).isSelected.value && g(n).valueElement.value && !g(n).valueElementHasChildren.value ? (A(), B(wr, {
        key: 0,
        to: g(n).valueElement.value
      }, [
        D(c.$slots, "default")
      ], 8, ["to"])) : ue("", !0)
    ], 64));
  }
}), pc = /* @__PURE__ */ q({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { nonce: n } = Ce(t), r = yu(n), o = mt(kt), s = o.position === "item-aligned" ? Hr() : void 0, { forwardRef: a, currentElement: i } = te();
    Te(() => {
      o == null || o.onViewportChange(i.value);
    });
    const d = P(0);
    function c(l) {
      const u = l.currentTarget, { shouldExpandOnScrollRef: f, contentWrapper: p } = s ?? {};
      if (f != null && f.value && p != null && p.value) {
        const m = Math.abs(d.value - u.scrollTop);
        if (m > 0) {
          const y = window.innerHeight - _e * 2, h = Number.parseFloat(
            p.value.style.minHeight
          ), v = Number.parseFloat(p.value.style.height), _ = Math.max(h, v);
          if (_ < y) {
            const b = _ + m, C = Math.min(y, b), S = b - C;
            p.value.style.height = `${C}px`, p.value.style.bottom === "0px" && (u.scrollTop = S > 0 ? S : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      d.value = u.scrollTop;
    }
    return (l, u) => (A(), U(De, null, [
      R(g(X), G({
        ref: g(a),
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
        default: O(() => [
          D(l.$slots, "default")
        ]),
        _: 3
      }, 16),
      R(g(X), {
        as: "style",
        nonce: g(r)
      }, {
        default: O(() => [
          ee(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
}), xs = /* @__PURE__ */ q({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(e, { emit: t }) {
    const n = t, { injectCollection: r } = On(), o = r(), s = mt(kt), a = P(null);
    function i() {
      a.value !== null && (window.clearInterval(a.value), a.value = null);
    }
    pe(() => {
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
    return xr(() => i()), (l, u) => {
      var f;
      return A(), B(g(X), G({
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
        default: O(() => [
          D(l.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
}), mc = /* @__PURE__ */ q({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = mt(kt), n = t.position === "item-aligned" ? Hr() : void 0, { forwardRef: r, currentElement: o } = te(), s = P(!1);
    return pe((a) => {
      var i, d;
      if ((i = t.viewport) != null && i.value && (d = t.isPositioned) != null && d.value) {
        let c = function() {
          s.value = l.scrollTop > 0;
        };
        const l = t.viewport.value;
        c(), l.addEventListener("scroll", c), a(() => l.removeEventListener("scroll", c));
      }
    }), K(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (a, i) => s.value ? (A(), B(xs, {
      key: 0,
      ref: g(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = g(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop - c.value.offsetHeight);
      })
    }, {
      default: O(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : ue("", !0);
  }
}), hc = /* @__PURE__ */ q({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = mt(kt), n = t.position === "item-aligned" ? Hr() : void 0, { forwardRef: r, currentElement: o } = te(), s = P(!1);
    return pe((a) => {
      var i, d;
      if ((i = t.viewport) != null && i.value && (d = t.isPositioned) != null && d.value) {
        let c = function() {
          const u = l.scrollHeight - l.clientHeight;
          s.value = Math.ceil(l.scrollTop) < u;
        };
        const l = t.viewport.value;
        c(), l.addEventListener("scroll", c), a(() => l.removeEventListener("scroll", c));
      }
    }), K(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (a, i) => s.value ? (A(), B(xs, {
      key: 0,
      ref: g(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = g(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop + c.value.offsetHeight);
      })
    }, {
      default: O(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : ue("", !0);
  }
}), gc = /* @__PURE__ */ q({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return (t, n) => (A(), B(g(X), {
      "aria-hidden": "true",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: O(() => [
        D(t.$slots, "default", {}, () => [
          ee("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function yc() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
yc();
const vc = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [bc, wc] = ye("SwitchRoot"), xc = /* @__PURE__ */ q({
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
    const n = e, r = t, { disabled: o } = Ce(n), s = et(n, "checked", r, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function a() {
      o.value || (s.value = !s.value);
    }
    const { forwardRef: i, currentElement: d } = te(), c = Vr(d), l = I(() => {
      var u;
      return n.id && d.value ? (u = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : u.innerText : void 0;
    });
    return wc({
      checked: s,
      toggleCheck: a,
      disabled: o
    }), (u, f) => (A(), U(De, null, [
      R(g(X), G(u.$attrs, {
        id: u.id,
        ref: g(i),
        role: "switch",
        type: u.as === "button" ? "button" : void 0,
        value: u.value,
        "aria-label": u.$attrs["aria-label"] || l.value,
        "aria-checked": g(s),
        "aria-required": u.required,
        "data-state": g(s) ? "checked" : "unchecked",
        "data-disabled": g(o) ? "" : void 0,
        "as-child": u.asChild,
        as: u.as,
        disabled: g(o),
        onClick: a,
        onKeydown: Uo(Ee(a, ["prevent"]), ["enter"])
      }), {
        default: O(() => [
          D(u.$slots, "default", { checked: g(s) })
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      g(c) ? (A(), U("input", {
        key: 0,
        type: "checkbox",
        name: u.name,
        tabindex: "-1",
        "aria-hidden": "true",
        disabled: g(o),
        required: u.required,
        value: u.value,
        checked: !!g(s),
        "data-state": g(s) ? "checked" : "unchecked",
        "data-disabled": g(o) ? "" : void 0,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, vc)) : ue("", !0)
    ], 64));
  }
}), _c = /* @__PURE__ */ q({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = bc();
    return te(), (n, r) => {
      var o;
      return A(), B(g(X), {
        "data-state": (o = g(t).checked) != null && o.value ? "checked" : "unchecked",
        "data-disabled": g(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: O(() => [
          D(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
}), Sc = {
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
    const o = Ht(e, t);
    return (s, a) => (A(), B(g(Ju), vr(br(g(o))), {
      default: O(() => [
        D(s.$slots, "default")
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
const Ec = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var tn = {
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
const Cc = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: s, class: a, ...i }, { slots: d }) => Pe(
  "svg",
  {
    ...tn,
    width: e || tn.width,
    height: e || tn.height,
    stroke: r || tn.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${Ec(s ?? "icon")}`],
    ...i
  },
  [...o.map((c) => Pe(...c)), ...d.default ? [d.default()] : []]
);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ie = (e, t) => (n, { slots: r }) => Pe(
  Cc,
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
const Oc = ie("ArrowLeftIcon", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ac = ie("ArrowRightIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _s = ie("BikeIcon", [
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
const Ss = ie("BusIcon", [
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
const Wr = ie("CarIcon", [
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
const Tc = ie("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Es = ie("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kc = ie("ChevronUpIcon", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rc = ie("CircleAlertIcon", [
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
const Pc = ie("CircleIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nc = ie("DropletIcon", [
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
const Ic = ie("FootprintsIcon", [
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
const Dc = ie("FuelIcon", [
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
const Bc = ie("LeafIcon", [
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
const Cs = ie("TramFrontIcon", [
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
const Mc = ie("TreesIcon", [
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
const Lc = ie("ZapIcon", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), $c = {
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = I(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = nt(n);
    return (o, s) => (A(), B(g(Qu), G(g(r), {
      class: g(Z)(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start",
        t.class
      )
    }), {
      default: O(() => [
        D(o.$slots, "default"),
        R(g(gc), { "as-child": "" }, {
          default: O(() => [
            R(g(Es), { class: "w-4 h-4 opacity-50 shrink-0" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Vc = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, Fc = {
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
    const t = e, n = I(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = nt(n);
    return (o, s) => (A(), B(g(cc), G(g(r), {
      class: g(Z)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: O(() => [
        $("span", Vc, [
          R(g(dc), null, {
            default: O(() => [
              R(g(Tc), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        R(g(fc), null, {
          default: O(() => [
            D(o.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, qc = {
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = I(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = nt(n);
    return (o, s) => (A(), B(g(hc), G(g(r), {
      class: g(Z)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: O(() => [
        D(o.$slots, "default", {}, () => [
          R(g(Es), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, jc = {
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = I(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = nt(n);
    return (o, s) => (A(), B(g(mc), G(g(r), {
      class: g(Z)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: O(() => [
        D(o.$slots, "default", {}, () => [
          R(g(kc), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Uc = /* @__PURE__ */ Object.assign({
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
    const n = e, r = t, o = I(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Ht(o, r);
    return (a, i) => (A(), B(g(ec), null, {
      default: O(() => [
        R(g(lc), G({ ...g(s), ...a.$attrs }, {
          class: g(Z)(
            "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: O(() => [
            R(g(jc)),
            R(g(pc), {
              class: ne(
                g(Z)(
                  "p-1",
                  e.position === "popper" && "h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"
                )
              )
            }, {
              default: O(() => [
                D(a.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"]),
            R(g(qc))
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), zc = {
  __name: "CardFooter",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(g(Z)("flex items-center p-6 pt-0", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, vo = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, bo = Go, Os = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return bo(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], u = s == null ? void 0 : s[c];
    if (l === null) return null;
    const f = vo(l) || vo(u);
    return o[c][f];
  }), i = n && Object.entries(n).reduce((c, l) => {
    let [u, f] = l;
    return f === void 0 || (c[u] = f), c;
  }, {}), d = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: u, className: f, ...p } = l;
    return Object.entries(p).every((m) => {
      let [y, h] = m;
      return Array.isArray(h) ? h.includes({
        ...s,
        ...i
      }[y]) : {
        ...s,
        ...i
      }[y] === h;
    }) ? [
      ...c,
      u,
      f
    ] : c;
  }, []);
  return bo(e, a, d, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Hc = Os(
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
), An = {
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
    return (n, r) => (A(), B(g(X), {
      as: e.as,
      "as-child": e.asChild,
      class: ne(g(Z)(g(Hc)({ variant: e.variant, size: e.size }), t.class))
    }, {
      default: O(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}, Tn = {
  __name: "Label",
  props: {
    for: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = I(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (A(), B(g(Tu), G(n.value, {
      class: g(Z)(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t.class
      )
    }), {
      default: O(() => [
        D(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
};
function As(e) {
  return vn() ? (bn(e), !0) : !1;
}
const Wc = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Gc = (e) => typeof e < "u", Kc = (e) => e != null, Gn = () => {
};
function Jc(e, t = !1, n = "Timeout") {
  return new Promise((r, o) => {
    setTimeout(t ? () => o(n) : r, e);
  });
}
function Ts(e) {
  return e;
}
function Xc(e) {
  return Array.isArray(e) ? e : [e];
}
const ks = Wc ? window : void 0;
function Kn(e) {
  var t;
  const n = fe(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function Yc() {
  const e = P(!1), t = Me();
  return t && Te(() => {
    e.value = !0;
  }, t), e;
}
function Zc(e) {
  const t = Yc();
  return I(() => (t.value, !!e()));
}
function Qc(e) {
  return JSON.parse(JSON.stringify(e));
}
function ed(e, t, n = {}) {
  const {
    root: r,
    rootMargin: o = "0px",
    threshold: s = 0,
    window: a = ks,
    immediate: i = !0
  } = n, d = Zc(() => a && "IntersectionObserver" in a), c = I(() => {
    const m = fe(e);
    return Xc(m).map(Kn).filter(Kc);
  });
  let l = Gn;
  const u = P(i), f = d.value ? K(
    () => [c.value, Kn(r), u.value],
    ([m, y]) => {
      if (l(), !u.value || !m.length)
        return;
      const h = new IntersectionObserver(
        t,
        {
          root: Kn(y),
          rootMargin: o,
          threshold: s
        }
      );
      m.forEach((v) => v && h.observe(v)), l = () => {
        h.disconnect(), l = Gn;
      };
    },
    { immediate: i, flush: "post" }
  ) : Gn, p = () => {
    l(), f(), u.value = !1;
  };
  return As(p), {
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
function td(e, t = {}) {
  const {
    window: n = ks,
    scrollTarget: r,
    threshold: o = 0,
    rootMargin: s
  } = t, a = P(!1);
  return ed(
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
      rootMargin: fe(s)
    }
  ), a;
}
const nd = {
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
}, rd = /* @__PURE__ */ Object.assign({}, { linear: Ts }, nd);
function od([e, t, n, r]) {
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
function wo(e, t, n) {
  return e + n * (t - e);
}
function Jn(e) {
  return (typeof e == "number" ? [e] : e) || [];
}
function sd(e, t, n, r = {}) {
  var o, s;
  const a = fe(t), i = fe(n), d = Jn(a), c = Jn(i), l = (o = fe(r.duration)) != null ? o : 1e3, u = Date.now(), f = Date.now() + l, p = typeof r.transition == "function" ? r.transition : (s = fe(r.transition)) != null ? s : Ts, m = typeof p == "function" ? p : od(p);
  return new Promise((y) => {
    e.value = a;
    const h = () => {
      var v;
      if ((v = r.abort) != null && v.call(r)) {
        y();
        return;
      }
      const _ = Date.now(), b = m((_ - u) / l), C = Jn(e.value).map((S, k) => wo(d[k], c[k], b));
      Array.isArray(e.value) ? e.value = C.map((S, k) => {
        var x, M;
        return wo((x = d[k]) != null ? x : 0, (M = c[k]) != null ? M : 0, b);
      }) : typeof e.value == "number" && (e.value = C[0]), _ < f ? requestAnimationFrame(h) : (e.value = i, y());
    };
    h();
  });
}
function ad(e, t = {}) {
  let n = 0;
  const r = () => {
    const s = fe(e);
    return typeof s == "number" ? s : s.map(fe);
  }, o = P(r());
  return K(r, async (s) => {
    var a, i;
    if (fe(t.disabled))
      return;
    const d = ++n;
    if (t.delay && await Jc(fe(t.delay)), d !== n)
      return;
    const c = Array.isArray(s) ? s.map(fe) : fe(s);
    (a = t.onStarted) == null || a.call(t), await sd(o, o.value, c, {
      ...t,
      abort: () => {
        var l;
        return d !== n || ((l = t.abort) == null ? void 0 : l.call(t));
      }
    }), (i = t.onFinished) == null || i.call(t);
  }, { deep: !0 }), K(() => fe(t.disabled), (s) => {
    s && (n++, o.value = r());
  }), As(() => {
    n++;
  }), I(() => fe(t.disabled) ? r() : o.value);
}
function id(e, t, n, r = {}) {
  var o, s, a;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: u,
    shouldEmit: f
  } = r, p = Me(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let y = c;
  y = y || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : Qc(b) : b, v = () => Gc(e[t]) ? h(e[t]) : u, _ = (b) => {
    f ? f(b) && m(y, b) : m(y, b);
  };
  if (d) {
    const b = v(), C = P(b);
    let S = !1;
    return K(
      () => e[t],
      (k) => {
        S || (S = !0, C.value = h(k), de(() => S = !1));
      }
    ), K(
      C,
      (k) => {
        !S && (k !== e[t] || l) && _(k);
      },
      { deep: l }
    ), C;
  } else
    return I({
      get() {
        return v();
      },
      set(b) {
        _(b);
      }
    });
}
const Rs = {
  __name: "Input",
  props: {
    defaultValue: { type: [String, Number], required: !1 },
    modelValue: { type: [String, Number], required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = id(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (s, a) => zo((A(), U("input", {
      "onUpdate:modelValue": a[0] || (a[0] = (i) => ut(o) ? o.value = i : null),
      class: ne(
        g(Z)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          n.class
        )
      )
    }, null, 2)), [
      [Pa, g(o)]
    ]);
  }
}, ld = {
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
    const t = e, n = I(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (A(), B(g(Iu), G(n.value, {
      class: g(Z)(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        t.class
      )
    }), {
      default: O(() => [
        R(g(Du), {
          class: "h-full w-full flex-1 bg-primary transition-all",
          style: xn(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, Ps = {
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
    const n = e, r = t, o = I(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Ht(o, r);
    return (a, i) => (A(), B(g(xc), G(g(s), {
      class: g(Z)(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: O(() => [
        R(g(_c), {
          class: ne(
            g(Z)(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5"
            )
          )
        }, {
          default: O(() => [
            D(a.$slots, "thumb")
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Wt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, ud = {
  name: "CalculationRoute",
  components: { Switch: Ps, Input: Rs, Label: Tn },
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
}, cd = { class: "flex justify-between" }, dd = { className: "flex items-center space-x-2" }, fd = { class: "grid items-center w-full gap-8" }, pd = { class: "flex flex-col space-y-1.5" }, md = { class: "flex flex-col space-y-1.5" };
function hd(e, t, n, r, o, s) {
  const a = W("Label"), i = W("Switch"), d = W("Input");
  return A(), U("div", null, [
    $("form", {
      ref: "form",
      onSubmit: t[3] || (t[3] = Ee((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-6"
    }, [
      $("div", cd, [
        R(a, {
          for: "calculation-type",
          class: "text-base font-medium"
        }, {
          default: O(() => t[4] || (t[4] = [
            ee("Berechnungsmodus")
          ])),
          _: 1
        }),
        $("div", dd, [
          R(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: O(() => t[5] || (t[5] = [
              ee("Einfach")
            ])),
            _: 1
          }),
          R(i, {
            id: "calculation-type",
            checked: o.localAdvancedCalculation,
            "onUpdate:checked": t[0] || (t[0] = (c) => o.localAdvancedCalculation = c)
          }, null, 8, ["checked"]),
          R(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: O(() => t[6] || (t[6] = [
              ee("Detailliert")
            ])),
            _: 1
          })
        ])
      ]),
      $("div", fd, [
        $("div", pd, [
          R(a, { for: "startLocation" }, {
            default: O(() => t[7] || (t[7] = [
              ee("Startort")
            ])),
            _: 1
          }),
          R(d, {
            id: "startLocation",
            placeholder: "Startort",
            modelValue: o.data.startLocation,
            "onUpdate:modelValue": t[1] || (t[1] = (c) => o.data.startLocation = c),
            required: ""
          }, null, 8, ["modelValue"])
        ]),
        $("div", md, [
          R(a, { for: "endLocation" }, {
            default: O(() => t[8] || (t[8] = [
              ee("Zielort")
            ])),
            _: 1
          }),
          R(d, {
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
const gd = /* @__PURE__ */ Wt(ud, [["render", hd]]), Ns = {
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
    const n = e, r = t, o = I(() => {
      const { class: a, ...i } = n;
      return i;
    }), s = Ht(o, r);
    return (a, i) => (A(), B(g(Lu), G({
      class: g(Z)("grid gap-2", n.class)
    }, g(s)), {
      default: O(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Is = {
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
    const t = e, n = I(() => {
      const { class: o, ...s } = t;
      return s;
    }), r = nt(n);
    return (o, s) => (A(), B(g(ju), G(g(r), {
      class: g(Z)(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      )
    }), {
      default: O(() => [
        R(g(Uu), { class: "flex items-center justify-center" }, {
          default: O(() => [
            R(g(Pc), { class: "h-2.5 w-2.5 fill-current text-current" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, yd = {
  name: "CalculationTransportMedium",
  components: { RadioGroupItem: Is, RadioGroup: Ns, Button: An, Label: Tn, Car: Wr, Bus: Ss, Bike: _s, Train: Cs, Footprints: Ic },
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
}, vd = ["for"], bd = { class: "text-sm font-medium" };
function wd(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup");
  return A(), U("div", null, [
    $("form", {
      ref: "form",
      onSubmit: t[1] || (t[1] = Ee((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-4"
    }, [
      R(a, null, {
        default: O(() => t[2] || (t[2] = [
          ee("Transportmittel")
        ])),
        _: 1
      }),
      R(d, {
        modelValue: o.data.transportMode,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => o.data.transportMode = c),
        class: "grid grid-cols-2 gap-4 sm:grid-cols-4"
      }, {
        default: O(() => [
          (A(!0), U(De, null, Lt(o.transportModes, (c) => (A(), U("label", {
            key: c,
            for: `radio-${c}`,
            class: ne(["flex flex-col items-center justify-center h-24 p-4 border rounded-lg cursor-pointer transition-all", {
              "bg-primary text-white": o.data.transportMode === c
            }])
          }, [
            R(i, {
              id: `radio-${c}`,
              value: c,
              class: "hidden",
              required: ""
            }, null, 8, ["id", "value"]),
            (A(), B(Ct(o.icons[c]), { class: "h-8 w-8 mb-2" })),
            $("span", bd, he(s.capitalize(c)), 1)
          ], 10, vd))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 544)
  ]);
}
const xd = /* @__PURE__ */ Wt(yd, [["render", wd]]), _d = {
  name: "CalculationFuel",
  components: { RadioGroupItem: Is, RadioGroup: Ns, Button: An, Label: Tn, Fuel: Dc, Droplet: Nc, Zap: Lc, Car: Wr },
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
}, Sd = ["for"], Ed = { class: "text-sm font-medium" }, Cd = { key: 0 }, Od = ["for"], Ad = { class: "text-sm font-medium" };
function Td(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup"), c = W("Car");
  return A(), U("div", null, [
    $("form", {
      ref: "form",
      onSubmit: t[2] || (t[2] = Ee((...l) => s.validateInput && s.validateInput(...l), ["prevent"])),
      class: "space-y-6"
    }, [
      $("div", null, [
        R(a, { class: "mb-2 block" }, {
          default: O(() => t[3] || (t[3] = [
            ee("Kraftstoff")
          ])),
          _: 1
        }),
        R(d, {
          modelValue: o.data.fuelType,
          "onUpdate:modelValue": t[0] || (t[0] = (l) => o.data.fuelType = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: O(() => [
            (A(!0), U(De, null, Lt(s.availableFuels, (l) => (A(), U("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.fuelType === l,
                "border-gray-300": o.data.fuelType !== l
              }])
            }, [
              R(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              (A(), B(Ct(s.icons[l]), { class: "h-6 w-6 mb-2" })),
              $("span", Ed, he(s.capitalize(l)), 1)
            ], 10, Sd))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      o.data.transportMode === "car" ? (A(), U("div", Cd, [
        R(a, { class: "mb-2 block" }, {
          default: O(() => t[4] || (t[4] = [
            ee("Fahrzeuggröße")
          ])),
          _: 1
        }),
        R(d, {
          modelValue: o.data.vehicleSize,
          "onUpdate:modelValue": t[1] || (t[1] = (l) => o.data.vehicleSize = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: O(() => [
            (A(!0), U(De, null, Lt(s.vehicleSizes, (l) => (A(), U("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.vehicleSize === l,
                "border-gray-300": o.data.vehicleSize !== l
              }])
            }, [
              R(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              R(c, {
                class: ne(s.sizeIconClass(l))
              }, null, 8, ["class"]),
              $("span", Ad, he(s.sizeTranslations[l]), 1)
            ], 10, Od))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])) : ue("", !0)
    ], 544)
  ]);
}
const kd = /* @__PURE__ */ Wt(_d, [["render", Td]]), Rd = {
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
    const t = P(null), n = e, r = P(n.direction === "down" ? n.value : 0), o = ad(r, {
      delay: n.delay,
      duration: n.duration,
      transition: rd[n.transition]
    }), s = I(() => new Intl.NumberFormat("en-US", {
      minimumFractionDigits: n.decimalPlaces,
      maximumFractionDigits: n.decimalPlaces
    }).format(Number(o.value.toFixed(n.decimalPlaces)))), a = td(t, {
      threshold: 0
    });
    return K(
      a,
      (i) => {
        i && (r.value = n.direction === "down" ? 0 : n.value);
      },
      { immediate: !0 }
    ), (i, d) => (A(), U("span", {
      ref_key: "spanRef",
      ref: t,
      class: ne(g(Z)("inline-block tabular-nums text-black dark:text-white tracking-wider", n.class))
    }, he(s.value), 3));
  }
}, Pd = {
  name: "CalculationResult",
  components: { NumberTicker: Rd, Button: An, CardContent: es, Card: Qo, Leaf: Bc, Trees: Mc, Car: Wr, Train: Cs, Bus: Ss, Bike: _s },
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
}, Nd = { class: "space-y-6 text-center" }, Id = { class: "grid gap-8 md:grid-cols-2" }, Dd = { class: "flex items-center justify-center mb-4" }, Bd = { class: "text-5xl font-bold text-red-700 mb-4" }, Md = { class: "text-lg" }, Ld = { class: "flex items-center justify-center mb-4" }, $d = { class: "text-3xl font-bold text-green-700 mb-4" }, Vd = { class: "mt-8" }, Fd = { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, qd = { class: "flex items-center justify-center mb-2" }, jd = { class: "text-lg font-semibold mb-2" }, Ud = { class: "text-lg font-bold text-gray-900" }, zd = { class: "text-sm text-gray-700" };
function Hd(e, t, n, r, o, s) {
  const a = W("Leaf"), i = W("NumberTicker"), d = W("CardContent"), c = W("Card"), l = W("Trees"), u = W("Button");
  return A(), U("div", Nd, [
    t[10] || (t[10] = $("h2", { class: "text-3xl font-bold mb-8" }, "Ihre CO2-Bilanz", -1)),
    $("div", Id, [
      R(c, { class: "bg-gradient-to-br from-red-100 to-orange-100 hover:scale-105 duration-300" }, {
        default: O(() => [
          R(d, { class: "p-6" }, {
            default: O(() => [
              $("div", Dd, [
                R(a, { class: "h-12 w-12 text-red-600 mr-4" }),
                t[0] || (t[0] = $("h3", { class: "text-2xl font-semibold" }, "CO2-Emission", -1))
              ]),
              $("p", Bd, [
                R(i, {
                  class: "text-red-700",
                  "decimal-places": 2,
                  duration: 2e3,
                  value: o.result.emission
                }, null, 8, ["value"]),
                t[1] || (t[1] = $("span", { class: "text-2xl ml-2" }, "kg", -1))
              ]),
              $("p", Md, " Ihre Reise von " + he(o.data.startLocation) + " nach " + he(o.data.endLocation) + " verursacht diese Menge an CO2-Emissionen. ", 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      R(c, { class: "bg-gradient-to-br from-green-100 to-emerald-100 hover:scale-105 duration-300" }, {
        default: O(() => [
          R(d, { class: "p-6" }, {
            default: O(() => [
              $("div", Ld, [
                R(l, { class: "h-12 w-12 text-green-600 mr-4" }),
                t[2] || (t[2] = $("h3", { class: "text-2xl font-semibold" }, "Baum-Äquivalent", -1))
              ]),
              $("p", $d, [
                R(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  value: o.result.yearsToBind.years
                }, null, 8, ["value"]),
                t[3] || (t[3] = $("span", { class: "text-2xl ml-2" }, "Jahr(e), ", -1)),
                R(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 500,
                  value: o.result.yearsToBind.months
                }, null, 8, ["value"]),
                t[4] || (t[4] = $("span", { class: "text-2xl ml-2" }, "Monat(e), ", -1)),
                R(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 1e3,
                  value: o.result.yearsToBind.days
                }, null, 8, ["value"]),
                t[5] || (t[5] = $("span", { class: "text-2xl ml-2" }, "Tag(e)", -1))
              ]),
              t[6] || (t[6] = $("p", { class: "text-lg" }, " So lange braucht eine typische Buche, um diese Menge CO2 zu binden. ", -1))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    $("div", Vd, [
      t[7] || (t[7] = $("h3", { class: "text-2xl font-semibold mb-4" }, "Vergleich mit anderen Transportmitteln", -1)),
      $("div", Fd, [
        (A(!0), U(De, null, Lt(o.dummy, (f, p) => (A(), B(c, {
          key: p,
          class: "bg-gray-100 hover:scale-105 duration-300"
        }, {
          default: O(() => [
            R(d, { class: "p-4" }, {
              default: O(() => [
                $("div", qd, [
                  (A(), B(Ct(s.icons[f.transportMediumDTO.transportMediumName] || "Leaf"), { class: "h-8 w-8 text-gray-600" }))
                ]),
                $("h4", jd, he(f.transportMediumDTO.transportMediumName) + " (" + he(f.transportMediumDTO.transportMediumFuel) + ") ", 1),
                $("p", Ud, he(f.emission.toFixed(2)) + " kg CO2 ", 1),
                $("p", zd, " Bindungszeit: " + he(s.formatYearsToBind(f.yearsToBind)), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ]),
    $("div", null, [
      t[9] || (t[9] = $("div", { className: "mt-8 text-xs text-gray-500 flex items-center justify-center" }, " Entwickelt von Kleemann und Siemens Software GbR ", -1)),
      R(u, {
        onClick: s.resetCalculation,
        class: "mt-4"
      }, {
        default: O(() => t[8] || (t[8] = [
          ee("Neue Berechnung")
        ])),
        _: 1
      }, 8, ["onClick"])
    ])
  ]);
}
const Wd = /* @__PURE__ */ Wt(Pd, [["render", Hd]]), Gd = {
  __name: "AlertDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(g(Z)("text-sm [&_p]:leading-relaxed", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, Kd = {
  __name: "AlertTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("h5", {
      class: ne(g(Z)("mb-1 font-medium leading-none tracking-tight", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, Jd = Os(
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
), Xd = {
  __name: "Alert",
  props: {
    class: { type: null, required: !1 },
    variant: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (A(), U("div", {
      class: ne(g(Z)(g(Jd)({ variant: e.variant }), t.class)),
      role: "alert"
    }, [
      D(n.$slots, "default")
    ], 2));
  }
};
function Yd() {
  return Ds().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Ds() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const Zd = typeof Proxy == "function", Qd = "devtools-plugin:setup", ef = "plugin:settings:set";
let vt, lr;
function tf() {
  var e;
  return vt !== void 0 || (typeof window < "u" && window.performance ? (vt = !0, lr = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (vt = !0, lr = globalThis.perf_hooks.performance) : vt = !1), vt;
}
function nf() {
  return tf() ? lr.now() : Date.now();
}
class rf {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const a in t.settings) {
        const i = t.settings[a];
        r[a] = i.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let s = Object.assign({}, r);
    try {
      const a = localStorage.getItem(o), i = JSON.parse(a);
      Object.assign(s, i);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return s;
      },
      setSettings(a) {
        try {
          localStorage.setItem(o, JSON.stringify(a));
        } catch {
        }
        s = a;
      },
      now() {
        return nf();
      }
    }, n && n.on(ef, (a, i) => {
      a === this.plugin.id && this.fallbacks.setSettings(i);
    }), this.proxiedOn = new Proxy({}, {
      get: (a, i) => this.target ? this.target.on[i] : (...d) => {
        this.onQueue.push({
          method: i,
          args: d
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (a, i) => this.target ? this.target[i] : i === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(i) ? (...d) => (this.targetQueue.push({
        method: i,
        args: d,
        resolve: () => {
        }
      }), this.fallbacks[i](...d)) : (...d) => new Promise((c) => {
        this.targetQueue.push({
          method: i,
          args: d,
          resolve: c
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Bs(e, t) {
  const n = e, r = Ds(), o = Yd(), s = Zd && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !s))
    o.emit(Qd, e, t);
  else {
    const a = s ? new rf(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: a
    }), a && t(a.proxiedTarget);
  }
}
/*!
 * pinia v2.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let Mt;
const jt = (e) => Mt = e, Ms = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function dt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Ie;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Ie || (Ie = {}));
const Je = typeof window < "u", xo = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function of(e, { autoBom: t = !1 } = {}) {
  return t && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function Gr(e, t, n) {
  const r = new XMLHttpRequest();
  r.open("GET", e), r.responseType = "blob", r.onload = function() {
    Vs(r.response, t, n);
  }, r.onerror = function() {
    console.error("could not download file");
  }, r.send();
}
function Ls(e) {
  const t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch {
  }
  return t.status >= 200 && t.status <= 299;
}
function rn(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const n = document.createEvent("MouseEvents");
    n.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(n);
  }
}
const on = typeof navigator == "object" ? navigator : { userAgent: "" }, $s = /Macintosh/.test(on.userAgent) && /AppleWebKit/.test(on.userAgent) && !/Safari/.test(on.userAgent), Vs = Je ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !$s ? sf : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in on ? af : (
      // Fallback to using FileReader and a popup
      lf
    )
  )
) : () => {
};
function sf(e, t = "download", n) {
  const r = document.createElement("a");
  r.download = t, r.rel = "noopener", typeof e == "string" ? (r.href = e, r.origin !== location.origin ? Ls(r.href) ? Gr(e, t, n) : (r.target = "_blank", rn(r)) : rn(r)) : (r.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(r.href);
  }, 4e4), setTimeout(function() {
    rn(r);
  }, 0));
}
function af(e, t = "download", n) {
  if (typeof e == "string")
    if (Ls(e))
      Gr(e, t, n);
    else {
      const r = document.createElement("a");
      r.href = e, r.target = "_blank", setTimeout(function() {
        rn(r);
      });
    }
  else
    navigator.msSaveOrOpenBlob(of(e, n), t);
}
function lf(e, t, n, r) {
  if (r = r || open("", "_blank"), r && (r.document.title = r.document.body.innerText = "downloading..."), typeof e == "string")
    return Gr(e, t, n);
  const o = e.type === "application/octet-stream", s = /constructor/i.test(String(xo.HTMLElement)) || "safari" in xo, a = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((a || o && s || $s) && typeof FileReader < "u") {
    const i = new FileReader();
    i.onloadend = function() {
      let d = i.result;
      if (typeof d != "string")
        throw r = null, new Error("Wrong reader.result type");
      d = a ? d : d.replace(/^data:[^;]*;/, "data:attachment/file;"), r ? r.location.href = d : location.assign(d), r = null;
    }, i.readAsDataURL(e);
  } else {
    const i = URL.createObjectURL(e);
    r ? r.location.assign(i) : location.href = i, r = null, setTimeout(function() {
      URL.revokeObjectURL(i);
    }, 4e4);
  }
}
function oe(e, t) {
  const n = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(n, t) : t === "error" ? console.error(n) : t === "warn" ? console.warn(n) : console.log(n);
}
function Kr(e) {
  return "_a" in e && "install" in e;
}
function Fs() {
  if (!("clipboard" in navigator))
    return oe("Your browser doesn't support the Clipboard API", "error"), !0;
}
function qs(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (oe('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function uf(e) {
  if (!Fs())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), oe("Global state copied to clipboard.");
    } catch (t) {
      if (qs(t))
        return;
      oe("Failed to serialize the state. Check the console for more details.", "error"), console.error(t);
    }
}
async function cf(e) {
  if (!Fs())
    try {
      js(e, JSON.parse(await navigator.clipboard.readText())), oe("Global state pasted from clipboard.");
    } catch (t) {
      if (qs(t))
        return;
      oe("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(t);
    }
}
async function df(e) {
  try {
    Vs(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (t) {
    oe("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(t);
  }
}
let qe;
function ff() {
  qe || (qe = document.createElement("input"), qe.type = "file", qe.accept = ".json");
  function e() {
    return new Promise((t, n) => {
      qe.onchange = async () => {
        const r = qe.files;
        if (!r)
          return t(null);
        const o = r.item(0);
        return t(o ? { text: await o.text(), file: o } : null);
      }, qe.oncancel = () => t(null), qe.onerror = n, qe.click();
    });
  }
  return e;
}
async function pf(e) {
  try {
    const n = await ff()();
    if (!n)
      return;
    const { text: r, file: o } = n;
    js(e, JSON.parse(r)), oe(`Global state imported from "${o.name}".`);
  } catch (t) {
    oe("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(t);
  }
}
function js(e, t) {
  for (const n in t) {
    const r = e.state.value[n];
    r ? Object.assign(r, t[n]) : e.state.value[n] = t[n];
  }
}
function Se(e) {
  return {
    _custom: {
      display: e
    }
  };
}
const Us = "🍍 Pinia (root)", sn = "_root";
function mf(e) {
  return Kr(e) ? {
    id: sn,
    label: Us
  } : {
    id: e.$id,
    label: e.$id
  };
}
function hf(e) {
  if (Kr(e)) {
    const n = Array.from(e._s.keys()), r = e._s;
    return {
      state: n.map((s) => ({
        editable: !0,
        key: s,
        value: e.state.value[s]
      })),
      getters: n.filter((s) => r.get(s)._getters).map((s) => {
        const a = r.get(s);
        return {
          editable: !1,
          key: s,
          value: a._getters.reduce((i, d) => (i[d] = a[d], i), {})
        };
      })
    };
  }
  const t = {
    state: Object.keys(e.$state).map((n) => ({
      editable: !0,
      key: n,
      value: e.$state[n]
    }))
  };
  return e._getters && e._getters.length && (t.getters = e._getters.map((n) => ({
    editable: !1,
    key: n,
    value: e[n]
  }))), e._customProperties.size && (t.customProperties = Array.from(e._customProperties).map((n) => ({
    editable: !0,
    key: n,
    value: e[n]
  }))), t;
}
function gf(e) {
  return e ? Array.isArray(e) ? e.reduce((t, n) => (t.keys.push(n.key), t.operations.push(n.type), t.oldValue[n.key] = n.oldValue, t.newValue[n.key] = n.newValue, t), {
    oldValue: {},
    keys: [],
    operations: [],
    newValue: {}
  }) : {
    operation: Se(e.type),
    key: Se(e.key),
    oldValue: e.oldValue,
    newValue: e.newValue
  } : {};
}
function yf(e) {
  switch (e) {
    case Ie.direct:
      return "mutation";
    case Ie.patchFunction:
      return "$patch";
    case Ie.patchObject:
      return "$patch";
    default:
      return "unknown";
  }
}
let xt = !0;
const an = [], st = "pinia:mutations", le = "pinia", { assign: vf } = Object, hn = (e) => "🍍 " + e;
function bf(e, t) {
  Bs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: an,
    app: e
  }, (n) => {
    typeof n.now != "function" && oe("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), n.addTimelineLayer({
      id: st,
      label: "Pinia 🍍",
      color: 15064968
    }), n.addInspector({
      id: le,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            uf(t);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await cf(t), n.sendInspectorTree(le), n.sendInspectorState(le);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            df(t);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await pf(t), n.sendInspectorTree(le), n.sendInspectorState(le);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (r) => {
            const o = t._s.get(r);
            o ? typeof o.$reset != "function" ? oe(`Cannot reset "${r}" store because it doesn't have a "$reset" method implemented.`, "warn") : (o.$reset(), oe(`Store "${r}" reset.`)) : oe(`Cannot reset "${r}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), n.on.inspectComponent((r, o) => {
      const s = r.componentInstance && r.componentInstance.proxy;
      if (s && s._pStores) {
        const a = r.componentInstance.proxy._pStores;
        Object.values(a).forEach((i) => {
          r.instanceData.state.push({
            type: hn(i.$id),
            key: "state",
            editable: !0,
            value: i._isOptionsAPI ? {
              _custom: {
                value: $t(i.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => i.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(i.$state).reduce((d, c) => (d[c] = i.$state[c], d), {})
            )
          }), i._getters && i._getters.length && r.instanceData.state.push({
            type: hn(i.$id),
            key: "getters",
            editable: !1,
            value: i._getters.reduce((d, c) => {
              try {
                d[c] = i[c];
              } catch (l) {
                d[c] = l;
              }
              return d;
            }, {})
          });
        });
      }
    }), n.on.getInspectorTree((r) => {
      if (r.app === e && r.inspectorId === le) {
        let o = [t];
        o = o.concat(Array.from(t._s.values())), r.rootNodes = (r.filter ? o.filter((s) => "$id" in s ? s.$id.toLowerCase().includes(r.filter.toLowerCase()) : Us.toLowerCase().includes(r.filter.toLowerCase())) : o).map(mf);
      }
    }), globalThis.$pinia = t, n.on.getInspectorState((r) => {
      if (r.app === e && r.inspectorId === le) {
        const o = r.nodeId === sn ? t : t._s.get(r.nodeId);
        if (!o)
          return;
        o && (r.nodeId !== sn && (globalThis.$store = $t(o)), r.state = hf(o));
      }
    }), n.on.editInspectorState((r, o) => {
      if (r.app === e && r.inspectorId === le) {
        const s = r.nodeId === sn ? t : t._s.get(r.nodeId);
        if (!s)
          return oe(`store "${r.nodeId}" not found`, "error");
        const { path: a } = r;
        Kr(s) ? a.unshift("state") : (a.length !== 1 || !s._customProperties.has(a[0]) || a[0] in s.$state) && a.unshift("$state"), xt = !1, r.set(s, a, r.state.value), xt = !0;
      }
    }), n.on.editComponentState((r) => {
      if (r.type.startsWith("🍍")) {
        const o = r.type.replace(/^🍍\s*/, ""), s = t._s.get(o);
        if (!s)
          return oe(`store "${o}" not found`, "error");
        const { path: a } = r;
        if (a[0] !== "state")
          return oe(`Invalid path for store "${o}":
${a}
Only state can be modified.`);
        a[0] = "$state", xt = !1, r.set(s, a, r.state.value), xt = !0;
      }
    });
  });
}
function wf(e, t) {
  an.includes(hn(t.$id)) || an.push(hn(t.$id)), Bs({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: an,
    app: e,
    settings: {
      logStoreChanges: {
        label: "Notify about new/deleted stores",
        type: "boolean",
        defaultValue: !0
      }
      // useEmojis: {
      //   label: 'Use emojis in messages ⚡️',
      //   type: 'boolean',
      //   defaultValue: true,
      // },
    }
  }, (n) => {
    const r = typeof n.now == "function" ? n.now.bind(n) : Date.now;
    t.$onAction(({ after: a, onError: i, name: d, args: c }) => {
      const l = zs++;
      n.addTimelineEvent({
        layerId: st,
        event: {
          time: r(),
          title: "🛫 " + d,
          subtitle: "start",
          data: {
            store: Se(t.$id),
            action: Se(d),
            args: c
          },
          groupId: l
        }
      }), a((u) => {
        Xe = void 0, n.addTimelineEvent({
          layerId: st,
          event: {
            time: r(),
            title: "🛬 " + d,
            subtitle: "end",
            data: {
              store: Se(t.$id),
              action: Se(d),
              args: c,
              result: u
            },
            groupId: l
          }
        });
      }), i((u) => {
        Xe = void 0, n.addTimelineEvent({
          layerId: st,
          event: {
            time: r(),
            logType: "error",
            title: "💥 " + d,
            subtitle: "end",
            data: {
              store: Se(t.$id),
              action: Se(d),
              args: c,
              error: u
            },
            groupId: l
          }
        });
      });
    }, !0), t._customProperties.forEach((a) => {
      K(() => g(t[a]), (i, d) => {
        n.notifyComponentUpdate(), n.sendInspectorState(le), xt && n.addTimelineEvent({
          layerId: st,
          event: {
            time: r(),
            title: "Change",
            subtitle: a,
            data: {
              newValue: i,
              oldValue: d
            },
            groupId: Xe
          }
        });
      }, { deep: !0 });
    }), t.$subscribe(({ events: a, type: i }, d) => {
      if (n.notifyComponentUpdate(), n.sendInspectorState(le), !xt)
        return;
      const c = {
        time: r(),
        title: yf(i),
        data: vf({ store: Se(t.$id) }, gf(a)),
        groupId: Xe
      };
      i === Ie.patchFunction ? c.subtitle = "⤵️" : i === Ie.patchObject ? c.subtitle = "🧩" : a && !Array.isArray(a) && (c.subtitle = a.type), a && (c.data["rawEvent(s)"] = {
        _custom: {
          display: "DebuggerEvent",
          type: "object",
          tooltip: "raw DebuggerEvent[]",
          value: a
        }
      }), n.addTimelineEvent({
        layerId: st,
        event: c
      });
    }, { detached: !0, flush: "sync" });
    const o = t._hotUpdate;
    t._hotUpdate = Ke((a) => {
      o(a), n.addTimelineEvent({
        layerId: st,
        event: {
          time: r(),
          title: "🔥 " + t.$id,
          subtitle: "HMR update",
          data: {
            store: Se(t.$id),
            info: Se("HMR update")
          }
        }
      }), n.notifyComponentUpdate(), n.sendInspectorTree(le), n.sendInspectorState(le);
    });
    const { $dispose: s } = t;
    t.$dispose = () => {
      s(), n.notifyComponentUpdate(), n.sendInspectorTree(le), n.sendInspectorState(le), n.getSettings().logStoreChanges && oe(`Disposed "${t.$id}" store 🗑`);
    }, n.notifyComponentUpdate(), n.sendInspectorTree(le), n.sendInspectorState(le), n.getSettings().logStoreChanges && oe(`"${t.$id}" store installed 🆕`);
  });
}
let zs = 0, Xe;
function _o(e, t, n) {
  const r = t.reduce((o, s) => (o[s] = $t(e)[s], o), {});
  for (const o in r)
    e[o] = function() {
      const s = zs, a = n ? new Proxy(e, {
        get(...d) {
          return Xe = s, Reflect.get(...d);
        },
        set(...d) {
          return Xe = s, Reflect.set(...d);
        }
      }) : e;
      Xe = s;
      const i = r[o].apply(a, arguments);
      return Xe = void 0, i;
    };
}
function xf({ app: e, store: t, options: n }) {
  if (!t.$id.startsWith("__hot:")) {
    if (t._isOptionsAPI = !!n.state, !t._p._testing) {
      _o(t, Object.keys(n.actions), t._isOptionsAPI);
      const r = t._hotUpdate;
      $t(t)._hotUpdate = function(o) {
        r.apply(this, arguments), _o(t, Object.keys(o._hmrPayload.actions), !!t._isOptionsAPI);
      };
    }
    wf(
      e,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      t
    );
  }
}
function _f() {
  const e = wn(!0), t = e.run(() => P({}));
  let n = [], r = [];
  const o = Ke({
    install(s) {
      jt(o), o._a = s, s.provide(Ms, o), s.config.globalProperties.$pinia = o, process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Je && bf(s, o), r.forEach((a) => n.push(a)), r = [];
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
  return process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Je && typeof Proxy < "u" && o.use(xf), o;
}
function Hs(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    dt(o) && dt(r) && !ut(r) && !Er(r) ? e[n] = Hs(o, r) : e[n] = r;
  }
  return e;
}
const Ws = () => {
};
function So(e, t, n, r = Ws) {
  e.push(t);
  const o = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), r());
  };
  return !n && vn() && bn(o), o;
}
function bt(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Sf = (e) => e(), Eo = Symbol(), Xn = Symbol();
function ur(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    dt(o) && dt(r) && e.hasOwnProperty(n) && !ut(r) && !Er(r) ? e[n] = ur(o, r) : e[n] = r;
  }
  return e;
}
const Ef = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Cf(e) {
  return !dt(e) || !e.hasOwnProperty(Ef);
}
const { assign: xe } = Object;
function Co(e) {
  return !!(ut(e) && e.effect);
}
function Oo(e, t, n, r) {
  const { state: o, actions: s, getters: a } = t, i = n.state.value[e];
  let d;
  function c() {
    !i && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = o ? o() : {});
    const l = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      Ce(P(o ? o() : {}).value)
    ) : Ce(n.state.value[e]);
    return xe(l, s, Object.keys(a || {}).reduce((u, f) => (process.env.NODE_ENV !== "production" && f in l && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${f}" in store "${e}".`), u[f] = Ke(I(() => {
      jt(n);
      const p = n._s.get(e);
      return a[f].call(p, p);
    })), u), {}));
  }
  return d = cr(e, c, t, n, r, !0), d;
}
function cr(e, t, n = {}, r, o, s) {
  let a;
  const i = xe({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const d = { deep: !0 };
  process.env.NODE_ENV !== "production" && (d.onTrigger = (E) => {
    c ? p = E : c == !1 && !x._hotUpdating && (Array.isArray(p) ? p.push(E) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, l, u = [], f = [], p;
  const m = r.state.value[e];
  !s && !m && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const y = P({});
  let h;
  function v(E) {
    let T;
    c = l = !1, process.env.NODE_ENV !== "production" && (p = []), typeof E == "function" ? (E(r.state.value[e]), T = {
      type: Ie.patchFunction,
      storeId: e,
      events: p
    }) : (ur(r.state.value[e], E), T = {
      type: Ie.patchObject,
      payload: E,
      storeId: e,
      events: p
    });
    const N = h = Symbol();
    de().then(() => {
      h === N && (c = !0);
    }), l = !0, bt(u, T, r.state.value[e]);
  }
  const _ = s ? function() {
    const { state: T } = n, N = T ? T() : {};
    this.$patch((z) => {
      xe(z, N);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : Ws
  );
  function b() {
    a.stop(), u = [], f = [], r._s.delete(e);
  }
  const C = (E, T = "") => {
    if (Eo in E)
      return E[Xn] = T, E;
    const N = function() {
      jt(r);
      const z = Array.from(arguments), j = [], se = [];
      function Y(H) {
        j.push(H);
      }
      function ae(H) {
        se.push(H);
      }
      bt(f, {
        args: z,
        name: N[Xn],
        store: x,
        after: Y,
        onError: ae
      });
      let Q;
      try {
        Q = E.apply(this && this.$id === e ? this : x, z);
      } catch (H) {
        throw bt(se, H), H;
      }
      return Q instanceof Promise ? Q.then((H) => (bt(j, H), H)).catch((H) => (bt(se, H), Promise.reject(H))) : (bt(j, Q), Q);
    };
    return N[Eo] = !0, N[Xn] = T, N;
  }, S = /* @__PURE__ */ Ke({
    actions: {},
    getters: {},
    state: [],
    hotState: y
  }), k = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: So.bind(null, f),
    $patch: v,
    $reset: _,
    $subscribe(E, T = {}) {
      const N = So(u, E, T.detached, () => z()), z = a.run(() => K(() => r.state.value[e], (j) => {
        (T.flush === "sync" ? l : c) && E({
          storeId: e,
          type: Ie.direct,
          events: p
        }, j);
      }, xe({}, d, T)));
      return N;
    },
    $dispose: b
  }, x = yr(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Je ? xe(
    {
      _hmrPayload: S,
      _customProperties: Ke(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    k
    // must be added later
    // setupStore
  ) : k);
  r._s.set(e, x);
  const L = (r._a && r._a.runWithContext || Sf)(() => r._e.run(() => (a = wn()).run(() => t({ action: C }))));
  for (const E in L) {
    const T = L[E];
    if (ut(T) && !Co(T) || Er(T))
      process.env.NODE_ENV !== "production" && o ? Yt(y.value, E, nn(L, E)) : s || (m && Cf(T) && (ut(T) ? T.value = m[E] : ur(T, m[E])), r.state.value[e][E] = T), process.env.NODE_ENV !== "production" && S.state.push(E);
    else if (typeof T == "function") {
      const N = process.env.NODE_ENV !== "production" && o ? T : C(T, E);
      L[E] = N, process.env.NODE_ENV !== "production" && (S.actions[E] = T), i.actions[E] = T;
    } else process.env.NODE_ENV !== "production" && Co(T) && (S.getters[E] = s ? (
      // @ts-expect-error
      n.getters[E]
    ) : T, Je && (L._getters || // @ts-expect-error: same
    (L._getters = Ke([]))).push(E));
  }
  if (xe(x, L), xe($t(x), L), Object.defineProperty(x, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? y.value : r.state.value[e],
    set: (E) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      v((T) => {
        xe(T, E);
      });
    }
  }), process.env.NODE_ENV !== "production" && (x._hotUpdate = Ke((E) => {
    x._hotUpdating = !0, E._hmrPayload.state.forEach((T) => {
      if (T in x.$state) {
        const N = E.$state[T], z = x.$state[T];
        typeof N == "object" && dt(N) && dt(z) ? Hs(N, z) : E.$state[T] = z;
      }
      Yt(x, T, nn(E.$state, T));
    }), Object.keys(x.$state).forEach((T) => {
      T in E.$state || qn(x, T);
    }), c = !1, l = !1, r.state.value[e] = nn(E._hmrPayload, "hotState"), l = !0, de().then(() => {
      c = !0;
    });
    for (const T in E._hmrPayload.actions) {
      const N = E[T];
      Yt(x, T, C(N, T));
    }
    for (const T in E._hmrPayload.getters) {
      const N = E._hmrPayload.getters[T], z = s ? (
        // special handling of options api
        I(() => (jt(r), N.call(x, x)))
      ) : N;
      Yt(x, T, z);
    }
    Object.keys(x._hmrPayload.getters).forEach((T) => {
      T in E._hmrPayload.getters || qn(x, T);
    }), Object.keys(x._hmrPayload.actions).forEach((T) => {
      T in E._hmrPayload.actions || qn(x, T);
    }), x._hmrPayload = E._hmrPayload, x._getters = E._getters, x._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Je) {
    const E = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((T) => {
      Object.defineProperty(x, T, xe({ value: x[T] }, E));
    });
  }
  return r._p.forEach((E) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Je) {
      const T = a.run(() => E({
        store: x,
        app: r._a,
        pinia: r,
        options: i
      }));
      Object.keys(T || {}).forEach((N) => x._customProperties.add(N)), xe(x, T);
    } else
      xe(x, a.run(() => E({
        store: x,
        app: r._a,
        pinia: r,
        options: i
      })));
  }), process.env.NODE_ENV !== "production" && x.$state && typeof x.$state == "object" && typeof x.$state.constructor == "function" && !x.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${x.$id}".`), m && s && n.hydrate && n.hydrate(x.$state, m), c = !0, l = !0, x;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Of(e, t, n) {
  let r, o;
  const s = typeof t == "function";
  r = e, o = s ? n : t;
  function a(i, d) {
    const c = Na();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && Mt && Mt._testing ? null : i) || (c ? Sr(Ms, null) : null), i && jt(i), process.env.NODE_ENV !== "production" && !Mt)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = Mt, i._s.has(r) || (s ? cr(r, t, o, i) : Oo(r, o, i), process.env.NODE_ENV !== "production" && (a._pinia = i));
    const l = i._s.get(r);
    if (process.env.NODE_ENV !== "production" && d) {
      const u = "__hot:" + r, f = s ? cr(u, t, o, i, !0) : Oo(u, xe({}, o), i, !0);
      d._hotUpdate(f), delete i.state.value[u], i._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && Je) {
      const u = Me();
      if (u && u.proxy && // avoid adding stores that are just built for hot module replacement
      !d) {
        const f = u.proxy, p = "_pStores" in f ? f._pStores : f._pStores = {};
        p[r] = l;
      }
    }
    return l;
  }
  return a.$id = r, a;
}
function Gs(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Af } = Object.prototype, { getPrototypeOf: Jr } = Object, kn = /* @__PURE__ */ ((e) => (t) => {
  const n = Af.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), ke = (e) => (e = e.toLowerCase(), (t) => kn(t) === e), Rn = (e) => (t) => typeof t === e, { isArray: Rt } = Array, Ut = Rn("undefined");
function Tf(e) {
  return e !== null && !Ut(e) && e.constructor !== null && !Ut(e.constructor) && we(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ks = ke("ArrayBuffer");
function kf(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ks(e.buffer), t;
}
const Rf = Rn("string"), we = Rn("function"), Js = Rn("number"), Pn = (e) => e !== null && typeof e == "object", Pf = (e) => e === !0 || e === !1, ln = (e) => {
  if (kn(e) !== "object")
    return !1;
  const t = Jr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Nf = ke("Date"), If = ke("File"), Df = ke("Blob"), Bf = ke("FileList"), Mf = (e) => Pn(e) && we(e.pipe), Lf = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || we(e.append) && ((t = kn(e)) === "formdata" || // detect form-data instance
  t === "object" && we(e.toString) && e.toString() === "[object FormData]"));
}, $f = ke("URLSearchParams"), [Vf, Ff, qf, jf] = ["ReadableStream", "Request", "Response", "Headers"].map(ke), Uf = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Gt(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), Rt(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = s.length;
    let i;
    for (r = 0; r < a; r++)
      i = s[r], t.call(null, e[i], i, e);
  }
}
function Xs(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const at = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ys = (e) => !Ut(e) && e !== at;
function dr() {
  const { caseless: e } = Ys(this) && this || {}, t = {}, n = (r, o) => {
    const s = e && Xs(t, o) || o;
    ln(t[s]) && ln(r) ? t[s] = dr(t[s], r) : ln(r) ? t[s] = dr({}, r) : Rt(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Gt(arguments[r], n);
  return t;
}
const zf = (e, t, n, { allOwnKeys: r } = {}) => (Gt(t, (o, s) => {
  n && we(o) ? e[s] = Gs(o, n) : e[s] = o;
}, { allOwnKeys: r }), e), Hf = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Wf = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Gf = (e, t, n, r) => {
  let o, s, a;
  const i = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      a = o[s], (!r || r(a, e, t)) && !i[a] && (t[a] = e[a], i[a] = !0);
    e = n !== !1 && Jr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Kf = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Jf = (e) => {
  if (!e) return null;
  if (Rt(e)) return e;
  let t = e.length;
  if (!Js(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Xf = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Jr(Uint8Array)), Yf = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, Zf = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Qf = ke("HTMLFormElement"), ep = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), Ao = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), tp = ke("RegExp"), Zs = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Gt(n, (o, s) => {
    let a;
    (a = t(o, s, e)) !== !1 && (r[s] = a || o);
  }), Object.defineProperties(e, r);
}, np = (e) => {
  Zs(e, (t, n) => {
    if (we(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (we(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, rp = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return Rt(e) ? r(e) : r(String(e).split(t)), n;
}, op = () => {
}, sp = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Yn = "abcdefghijklmnopqrstuvwxyz", To = "0123456789", Qs = {
  DIGIT: To,
  ALPHA: Yn,
  ALPHA_DIGIT: Yn + Yn.toUpperCase() + To
}, ap = (e = 16, t = Qs.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function ip(e) {
  return !!(e && we(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const lp = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (Pn(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = Rt(r) ? [] : {};
        return Gt(r, (a, i) => {
          const d = n(a, o + 1);
          !Ut(d) && (s[i] = d);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, up = ke("AsyncFunction"), cp = (e) => e && (Pn(e) || we(e)) && we(e.then) && we(e.catch), ea = ((e, t) => e ? setImmediate : t ? ((n, r) => (at.addEventListener("message", ({ source: o, data: s }) => {
  o === at && s === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), at.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  we(at.postMessage)
), dp = typeof queueMicrotask < "u" ? queueMicrotask.bind(at) : typeof process < "u" && process.nextTick || ea, w = {
  isArray: Rt,
  isArrayBuffer: Ks,
  isBuffer: Tf,
  isFormData: Lf,
  isArrayBufferView: kf,
  isString: Rf,
  isNumber: Js,
  isBoolean: Pf,
  isObject: Pn,
  isPlainObject: ln,
  isReadableStream: Vf,
  isRequest: Ff,
  isResponse: qf,
  isHeaders: jf,
  isUndefined: Ut,
  isDate: Nf,
  isFile: If,
  isBlob: Df,
  isRegExp: tp,
  isFunction: we,
  isStream: Mf,
  isURLSearchParams: $f,
  isTypedArray: Xf,
  isFileList: Bf,
  forEach: Gt,
  merge: dr,
  extend: zf,
  trim: Uf,
  stripBOM: Hf,
  inherits: Wf,
  toFlatObject: Gf,
  kindOf: kn,
  kindOfTest: ke,
  endsWith: Kf,
  toArray: Jf,
  forEachEntry: Yf,
  matchAll: Zf,
  isHTMLForm: Qf,
  hasOwnProperty: Ao,
  hasOwnProp: Ao,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Zs,
  freezeMethods: np,
  toObjectSet: rp,
  toCamelCase: ep,
  noop: op,
  toFiniteNumber: sp,
  findKey: Xs,
  global: at,
  isContextDefined: Ys,
  ALPHABET: Qs,
  generateString: ap,
  isSpecCompliantForm: ip,
  toJSONObject: lp,
  isAsyncFn: up,
  isThenable: cp,
  setImmediate: ea,
  asap: dp
};
function V(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
w.inherits(V, Error, {
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
const ta = V.prototype, na = {};
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
  na[e] = { value: e };
});
Object.defineProperties(V, na);
Object.defineProperty(ta, "isAxiosError", { value: !0 });
V.from = (e, t, n, r, o, s) => {
  const a = Object.create(ta);
  return w.toFlatObject(e, a, function(d) {
    return d !== Error.prototype;
  }, (i) => i !== "isAxiosError"), V.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, s && Object.assign(a, s), a;
};
const fp = null;
function fr(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function ra(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ko(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = ra(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function pp(e) {
  return w.isArray(e) && !e.some(fr);
}
const mp = w.toFlatObject(w, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Nn(e, t, n) {
  if (!w.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = w.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, h) {
    return !w.isUndefined(h[y]);
  });
  const r = n.metaTokens, o = n.visitor || l, s = n.dots, a = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && w.isSpecCompliantForm(t);
  if (!w.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (w.isDate(m))
      return m.toISOString();
    if (!d && w.isBlob(m))
      throw new V("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(m) || w.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function l(m, y, h) {
    let v = m;
    if (m && !h && typeof m == "object") {
      if (w.endsWith(y, "{}"))
        y = r ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (w.isArray(m) && pp(m) || (w.isFileList(m) || w.endsWith(y, "[]")) && (v = w.toArray(m)))
        return y = ra(y), v.forEach(function(b, C) {
          !(w.isUndefined(b) || b === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? ko([y], C, s) : a === null ? y : y + "[]",
            c(b)
          );
        }), !1;
    }
    return fr(m) ? !0 : (t.append(ko(h, y, s), c(m)), !1);
  }
  const u = [], f = Object.assign(mp, {
    defaultVisitor: l,
    convertValue: c,
    isVisitable: fr
  });
  function p(m, y) {
    if (!w.isUndefined(m)) {
      if (u.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      u.push(m), w.forEach(m, function(v, _) {
        (!(w.isUndefined(v) || v === null) && o.call(
          t,
          v,
          w.isString(_) ? _.trim() : _,
          y,
          f
        )) === !0 && p(v, y ? y.concat(_) : [_]);
      }), u.pop();
    }
  }
  if (!w.isObject(e))
    throw new TypeError("data must be an object");
  return p(e), t;
}
function Ro(e) {
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
function Xr(e, t) {
  this._pairs = [], e && Nn(e, this, t);
}
const oa = Xr.prototype;
oa.append = function(t, n) {
  this._pairs.push([t, n]);
};
oa.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Ro);
  } : Ro;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function hp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function sa(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || hp;
  w.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = w.isURLSearchParams(t) ? t.toString() : new Xr(t, n).toString(r), s) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class Po {
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
const aa = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, gp = typeof URLSearchParams < "u" ? URLSearchParams : Xr, yp = typeof FormData < "u" ? FormData : null, vp = typeof Blob < "u" ? Blob : null, bp = {
  isBrowser: !0,
  classes: {
    URLSearchParams: gp,
    FormData: yp,
    Blob: vp
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Yr = typeof window < "u" && typeof document < "u", pr = typeof navigator == "object" && navigator || void 0, wp = Yr && (!pr || ["ReactNative", "NativeScript", "NS"].indexOf(pr.product) < 0), xp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", _p = Yr && window.location.href || "http://localhost", Sp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Yr,
  hasStandardBrowserEnv: wp,
  hasStandardBrowserWebWorkerEnv: xp,
  navigator: pr,
  origin: _p
}, Symbol.toStringTag, { value: "Module" })), ce = {
  ...Sp,
  ...bp
};
function Ep(e, t) {
  return Nn(e, new ce.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, s) {
      return ce.isNode && w.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Cp(e) {
  return w.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Op(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function ia(e) {
  function t(n, r, o, s) {
    let a = n[s++];
    if (a === "__proto__") return !0;
    const i = Number.isFinite(+a), d = s >= n.length;
    return a = !a && w.isArray(o) ? o.length : a, d ? (w.hasOwnProp(o, a) ? o[a] = [o[a], r] : o[a] = r, !i) : ((!o[a] || !w.isObject(o[a])) && (o[a] = []), t(n, r, o[a], s) && w.isArray(o[a]) && (o[a] = Op(o[a])), !i);
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return w.forEachEntry(e, (r, o) => {
      t(Cp(r), o, n, 0);
    }), n;
  }
  return null;
}
function Ap(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const Kt = {
  transitional: aa,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = w.isObject(t);
    if (s && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t))
      return o ? JSON.stringify(ia(t)) : t;
    if (w.isArrayBuffer(t) || w.isBuffer(t) || w.isStream(t) || w.isFile(t) || w.isBlob(t) || w.isReadableStream(t))
      return t;
    if (w.isArrayBufferView(t))
      return t.buffer;
    if (w.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Ep(t, this.formSerializer).toString();
      if ((i = w.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return Nn(
          i ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), Ap(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Kt.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (w.isResponse(t) || w.isReadableStream(t))
      return t;
    if (t && w.isString(t) && (r && !this.responseType || o)) {
      const a = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? V.from(i, V.ERR_BAD_RESPONSE, this, null, this.response) : i;
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
    FormData: ce.classes.FormData,
    Blob: ce.classes.Blob
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
  Kt.headers[e] = {};
});
const Tp = w.toObjectSet([
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
]), kp = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), n = a.substring(0, o).trim().toLowerCase(), r = a.substring(o + 1).trim(), !(!n || t[n] && Tp[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, No = Symbol("internals");
function Bt(e) {
  return e && String(e).trim().toLowerCase();
}
function un(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(un) : String(e);
}
function Rp(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Pp = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Zn(e, t, n, r, o) {
  if (w.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!w.isString(t)) {
    if (w.isString(r))
      return t.indexOf(r) !== -1;
    if (w.isRegExp(r))
      return r.test(t);
  }
}
function Np(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Ip(e, t) {
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
class ge {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function s(i, d, c) {
      const l = Bt(d);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const u = w.findKey(o, l);
      (!u || o[u] === void 0 || c === !0 || c === void 0 && o[u] !== !1) && (o[u || d] = un(i));
    }
    const a = (i, d) => w.forEach(i, (c, l) => s(c, l, d));
    if (w.isPlainObject(t) || t instanceof this.constructor)
      a(t, n);
    else if (w.isString(t) && (t = t.trim()) && !Pp(t))
      a(kp(t), n);
    else if (w.isHeaders(t))
      for (const [i, d] of t.entries())
        s(d, i, r);
    else
      t != null && s(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = Bt(t), t) {
      const r = w.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Rp(o);
        if (w.isFunction(n))
          return n.call(this, o, r);
        if (w.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = Bt(t), t) {
      const r = w.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || Zn(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(a) {
      if (a = Bt(a), a) {
        const i = w.findKey(r, a);
        i && (!n || Zn(r, r[i], i, n)) && (delete r[i], o = !0);
      }
    }
    return w.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Zn(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return w.forEach(this, (o, s) => {
      const a = w.findKey(r, s);
      if (a) {
        n[a] = un(o), delete n[s];
        return;
      }
      const i = t ? Np(s) : String(s).trim();
      i !== s && delete n[s], n[i] = un(o), r[i] = !0;
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
    const r = (this[No] = this[No] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(a) {
      const i = Bt(a);
      r[i] || (Ip(o, a), r[i] = !0);
    }
    return w.isArray(t) ? t.forEach(s) : s(t), this;
  }
}
ge.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
w.reduceDescriptors(ge.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
w.freezeMethods(ge);
function Qn(e, t) {
  const n = this || Kt, r = t || n, o = ge.from(r.headers);
  let s = r.data;
  return w.forEach(e, function(i) {
    s = i.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function la(e) {
  return !!(e && e.__CANCEL__);
}
function Pt(e, t, n) {
  V.call(this, e ?? "canceled", V.ERR_CANCELED, t, n), this.name = "CanceledError";
}
w.inherits(Pt, V, {
  __CANCEL__: !0
});
function ua(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new V(
    "Request failed with status code " + n.status,
    [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Dp(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Bp(e, t) {
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
function Mp(e, t) {
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
const gn = (e, t, n = 3) => {
  let r = 0;
  const o = Bp(50, 250);
  return Mp((s) => {
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
}, Io = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Do = (e) => (...t) => w.asap(() => e(...t)), Lp = ce.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ce.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ce.origin),
  ce.navigator && /(msie|trident)/i.test(ce.navigator.userAgent)
) : () => !0, $p = ce.hasStandardBrowserEnv ? (
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
function Vp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Fp(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ca(e, t) {
  return e && !Vp(t) ? Fp(e, t) : t;
}
const Bo = (e) => e instanceof ge ? { ...e } : e;
function ft(e, t) {
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
    headers: (c, l, u) => o(Bo(c), Bo(l), u, !0)
  };
  return w.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
    const u = d[l] || o, f = u(e[l], t[l], l);
    w.isUndefined(f) && u !== i || (n[l] = f);
  }), n;
}
const da = (e) => {
  const t = ft({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: a, auth: i } = t;
  t.headers = a = ge.from(a), t.url = sa(ca(t.baseURL, t.url), e.params, e.paramsSerializer), i && a.set(
    "Authorization",
    "Basic " + btoa((i.username || "") + ":" + (i.password ? unescape(encodeURIComponent(i.password)) : ""))
  );
  let d;
  if (w.isFormData(n)) {
    if (ce.hasStandardBrowserEnv || ce.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((d = a.getContentType()) !== !1) {
      const [c, ...l] = d ? d.split(";").map((u) => u.trim()).filter(Boolean) : [];
      a.setContentType([c || "multipart/form-data", ...l].join("; "));
    }
  }
  if (ce.hasStandardBrowserEnv && (r && w.isFunction(r) && (r = r(t)), r || r !== !1 && Lp(t.url))) {
    const c = o && s && $p.read(s);
    c && a.set(o, c);
  }
  return t;
}, qp = typeof XMLHttpRequest < "u", jp = qp && function(e) {
  return new Promise(function(n, r) {
    const o = da(e);
    let s = o.data;
    const a = ge.from(o.headers).normalize();
    let { responseType: i, onUploadProgress: d, onDownloadProgress: c } = o, l, u, f, p, m;
    function y() {
      p && p(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function v() {
      if (!h)
        return;
      const b = ge.from(
        "getAllResponseHeaders" in h && h.getAllResponseHeaders()
      ), S = {
        data: !i || i === "text" || i === "json" ? h.responseText : h.response,
        status: h.status,
        statusText: h.statusText,
        headers: b,
        config: e,
        request: h
      };
      ua(function(x) {
        n(x), y();
      }, function(x) {
        r(x), y();
      }, S), h = null;
    }
    "onloadend" in h ? h.onloadend = v : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, h.onabort = function() {
      h && (r(new V("Request aborted", V.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      r(new V("Network Error", V.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let C = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const S = o.transitional || aa;
      o.timeoutErrorMessage && (C = o.timeoutErrorMessage), r(new V(
        C,
        S.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED,
        e,
        h
      )), h = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in h && w.forEach(a.toJSON(), function(C, S) {
      h.setRequestHeader(S, C);
    }), w.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), i && i !== "json" && (h.responseType = o.responseType), c && ([f, m] = gn(c, !0), h.addEventListener("progress", f)), d && h.upload && ([u, p] = gn(d), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", p)), (o.cancelToken || o.signal) && (l = (b) => {
      h && (r(!b || b.type ? new Pt(null, e, h) : b), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const _ = Dp(o.url);
    if (_ && ce.protocols.indexOf(_) === -1) {
      r(new V("Unsupported protocol " + _ + ":", V.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(s || null);
  });
}, Up = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(c) {
      if (!o) {
        o = !0, i();
        const l = c instanceof Error ? c : this.reason;
        r.abort(l instanceof V ? l : new Pt(l instanceof Error ? l.message : l));
      }
    };
    let a = t && setTimeout(() => {
      a = null, s(new V(`timeout ${t} of ms exceeded`, V.ETIMEDOUT));
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
}, zp = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, Hp = async function* (e, t) {
  for await (const n of Wp(e))
    yield* zp(n, t);
}, Wp = async function* (e) {
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
}, Mo = (e, t, n, r) => {
  const o = Hp(e, t);
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
}, In = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", fa = In && typeof ReadableStream == "function", Gp = In && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), pa = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Kp = fa && pa(() => {
  let e = !1;
  const t = new Request(ce.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), Lo = 64 * 1024, mr = fa && pa(() => w.isReadableStream(new Response("").body)), yn = {
  stream: mr && ((e) => e.body)
};
In && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !yn[t] && (yn[t] = w.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new V(`Response type '${t}' is not supported`, V.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Jp = async (e) => {
  if (e == null)
    return 0;
  if (w.isBlob(e))
    return e.size;
  if (w.isSpecCompliantForm(e))
    return (await new Request(ce.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (w.isArrayBufferView(e) || w.isArrayBuffer(e))
    return e.byteLength;
  if (w.isURLSearchParams(e) && (e = e + ""), w.isString(e))
    return (await Gp(e)).byteLength;
}, Xp = async (e, t) => {
  const n = w.toFiniteNumber(e.getContentLength());
  return n ?? Jp(t);
}, Yp = In && (async (e) => {
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
  } = da(e);
  c = c ? (c + "").toLowerCase() : "text";
  let p = Up([o, s && s.toAbortSignal()], a), m;
  const y = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let h;
  try {
    if (d && Kp && n !== "get" && n !== "head" && (h = await Xp(l, r)) !== 0) {
      let S = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), k;
      if (w.isFormData(r) && (k = S.headers.get("content-type")) && l.setContentType(k), S.body) {
        const [x, M] = Io(
          h,
          gn(Do(d))
        );
        r = Mo(S.body, Lo, x, M);
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
    let _ = await fetch(m);
    const b = mr && (c === "stream" || c === "response");
    if (mr && (i || b && y)) {
      const S = {};
      ["status", "statusText", "headers"].forEach((L) => {
        S[L] = _[L];
      });
      const k = w.toFiniteNumber(_.headers.get("content-length")), [x, M] = i && Io(
        k,
        gn(Do(i), !0)
      ) || [];
      _ = new Response(
        Mo(_.body, Lo, x, () => {
          M && M(), y && y();
        }),
        S
      );
    }
    c = c || "text";
    let C = await yn[w.findKey(yn, c) || "text"](_, e);
    return !b && y && y(), await new Promise((S, k) => {
      ua(S, k, {
        data: C,
        headers: ge.from(_.headers),
        status: _.status,
        statusText: _.statusText,
        config: e,
        request: m
      });
    });
  } catch (v) {
    throw y && y(), v && v.name === "TypeError" && /fetch/i.test(v.message) ? Object.assign(
      new V("Network Error", V.ERR_NETWORK, e, m),
      {
        cause: v.cause || v
      }
    ) : V.from(v, v && v.code, e, m);
  }
}), hr = {
  http: fp,
  xhr: jp,
  fetch: Yp
};
w.forEach(hr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const $o = (e) => `- ${e}`, Zp = (e) => w.isFunction(e) || e === null || e === !1, ma = {
  getAdapter: (e) => {
    e = w.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let a;
      if (r = n, !Zp(n) && (r = hr[(a = String(n)).toLowerCase()], r === void 0))
        throw new V(`Unknown adapter '${a}'`);
      if (r)
        break;
      o[a || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(o).map(
        ([i, d]) => `adapter ${i} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? s.length > 1 ? `since :
` + s.map($o).join(`
`) : " " + $o(s[0]) : "as no adapter specified";
      throw new V(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: hr
};
function er(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new Pt(null, e);
}
function Vo(e) {
  return er(e), e.headers = ge.from(e.headers), e.data = Qn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ma.getAdapter(e.adapter || Kt.adapter)(e).then(function(r) {
    return er(e), r.data = Qn.call(
      e,
      e.transformResponse,
      r
    ), r.headers = ge.from(r.headers), r;
  }, function(r) {
    return la(r) || (er(e), r && r.response && (r.response.data = Qn.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = ge.from(r.response.headers))), Promise.reject(r);
  });
}
const ha = "1.7.9", Dn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Dn[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Fo = {};
Dn.transitional = function(t, n, r) {
  function o(s, a) {
    return "[Axios v" + ha + "] Transitional option '" + s + "'" + a + (r ? ". " + r : "");
  }
  return (s, a, i) => {
    if (t === !1)
      throw new V(
        o(a, " has been removed" + (n ? " in " + n : "")),
        V.ERR_DEPRECATED
      );
    return n && !Fo[a] && (Fo[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, a, i) : !0;
  };
};
Dn.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function Qp(e, t, n) {
  if (typeof e != "object")
    throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], a = t[s];
    if (a) {
      const i = e[s], d = i === void 0 || a(i, s, e);
      if (d !== !0)
        throw new V("option " + s + " must be " + d, V.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new V("Unknown option " + s, V.ERR_BAD_OPTION);
  }
}
const cn = {
  assertOptions: Qp,
  validators: Dn
}, Re = cn.validators;
class lt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Po(),
      response: new Po()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = ft(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && cn.assertOptions(r, {
      silentJSONParsing: Re.transitional(Re.boolean),
      forcedJSONParsing: Re.transitional(Re.boolean),
      clarifyTimeoutError: Re.transitional(Re.boolean)
    }, !1), o != null && (w.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : cn.assertOptions(o, {
      encode: Re.function,
      serialize: Re.function
    }, !0)), cn.assertOptions(n, {
      baseUrl: Re.spelling("baseURL"),
      withXsrfToken: Re.spelling("withXSRFToken")
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
    ), n.headers = ge.concat(a, s);
    const i = [];
    let d = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (d = d && y.synchronous, i.unshift(y.fulfilled, y.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(y) {
      c.push(y.fulfilled, y.rejected);
    });
    let l, u = 0, f;
    if (!d) {
      const m = [Vo.bind(this), void 0];
      for (m.unshift.apply(m, i), m.push.apply(m, c), f = m.length, l = Promise.resolve(n); u < f; )
        l = l.then(m[u++], m[u++]);
      return l;
    }
    f = i.length;
    let p = n;
    for (u = 0; u < f; ) {
      const m = i[u++], y = i[u++];
      try {
        p = m(p);
      } catch (h) {
        y.call(this, h);
        break;
      }
    }
    try {
      l = Vo.call(this, p);
    } catch (m) {
      return Promise.reject(m);
    }
    for (u = 0, f = c.length; u < f; )
      l = l.then(c[u++], c[u++]);
    return l;
  }
  getUri(t) {
    t = ft(this.defaults, t);
    const n = ca(t.baseURL, t.url);
    return sa(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function(t) {
  lt.prototype[t] = function(n, r) {
    return this.request(ft(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
w.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, a, i) {
      return this.request(ft(i || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  lt.prototype[t] = n(), lt.prototype[t + "Form"] = n(!0);
});
class Zr {
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
      r.reason || (r.reason = new Pt(s, a, i), n(r.reason));
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
      token: new Zr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function em(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function tm(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const gr = {
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
Object.entries(gr).forEach(([e, t]) => {
  gr[t] = e;
});
function ga(e) {
  const t = new lt(e), n = Gs(lt.prototype.request, t);
  return w.extend(n, lt.prototype, t, { allOwnKeys: !0 }), w.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return ga(ft(e, o));
  }, n;
}
const re = ga(Kt);
re.Axios = lt;
re.CanceledError = Pt;
re.CancelToken = Zr;
re.isCancel = la;
re.VERSION = ha;
re.toFormData = Nn;
re.AxiosError = V;
re.Cancel = re.CanceledError;
re.all = function(t) {
  return Promise.all(t);
};
re.spread = em;
re.isAxiosError = tm;
re.mergeConfig = ft;
re.AxiosHeaders = ge;
re.formToJSON = (e) => ia(w.isHTMLForm(e) ? new FormData(e) : e);
re.getAdapter = ma.getAdapter;
re.HttpStatusCode = gr;
re.default = re;
const ya = re.create({
  baseURL: "/api",
  timeout: 5e3
}), nm = async (e, t, n) => {
  const r = "emission", o = {
    startLocation: e,
    endLocation: t,
    transportMediumDTO: n
  };
  return (await ya.post(r, o)).data;
}, rm = async (e, t, n, r, o) => {
  const s = {
    startLocation: e,
    endLocation: t,
    distance: n,
    transportMediumDTO: r,
    groupEmissionDTO: o
  };
  return (await ya.post("groupEmission", s)).data;
}, om = /* @__PURE__ */ Of("calculationStore", {
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
        }, t = await nm(
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
          }, s = await rm(
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
}), sm = {
  name: "CalculationStepper",
  components: {
    AlertDescription: Gd,
    AlertTitle: Kd,
    Alert: Xd,
    ArrowLeft: Oc,
    ArrowRight: Ac,
    AlertCircle: Rc,
    Switch: Ps,
    Progress: ld,
    Input: Rs,
    Label: Tn,
    Button: An,
    CardFooter: zc,
    SelectItem: Fc,
    SelectContent: Uc,
    SelectTrigger: $c,
    Select: Sc,
    CardContent: es,
    CardDescription: mi,
    CardTitle: pi,
    CardHeader: fi,
    Card: Qo
  },
  setup() {
    return {
      calculationStore: om()
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
          return gd;
        case 2:
          return xd;
        case 3:
          return kd;
        case 4:
          return Wd;
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
}, am = { class: "w-full bg-white" }, im = { class: "mt-2 mb-4" }, lm = { class: "w-full" }, um = { class: "w-full flex justify-between" }, cm = { class: "mt-6 hidden" };
function dm(e, t, n, r, o, s) {
  const a = W("Progress"), i = W("CardHeader"), d = W("CardContent"), c = W("AlertCircle"), l = W("AlertTitle"), u = W("AlertDescription"), f = W("Alert"), p = W("ArrowLeft"), m = W("Button"), y = W("ArrowRight"), h = W("CardFooter"), v = W("Card");
  return A(), U(De, null, [
    t[11] || (t[11] = $("div", { class: "hidden" }, [
      $("p", null, "CalculationComponent")
    ], -1)),
    $("div", am, [
      R(v, { class: "max-w-4xl lg:mx-auto m-6" }, {
        default: O(() => [
          R(i, null, {
            default: O(() => [
              $("div", im, [
                R(a, {
                  modelValue: s.progress,
                  "onUpdate:modelValue": t[0] || (t[0] = (_) => s.progress = _),
                  class: "w-full mx-auto"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }),
          R(d, null, {
            default: O(() => [
              (A(), B(Ct(s.currentStep), {
                required: "",
                advancedCalculation: o.advancedCalculation,
                "onUpdate:advancedCalculation": t[1] || (t[1] = (_) => o.advancedCalculation = _),
                "calculation-data": o.calculationData,
                calculationResult: o.calculationResult,
                dummySimpleResult: o.dummySimpleResult,
                onUpdateData: s.updateData,
                onUpdateValidity: t[2] || (t[2] = (_) => s.updateStepValidity(o.step - 1, _)),
                onResetData: s.resetData,
                onNext: s.nextStep,
                onPrev: s.prevStep
              }, null, 40, ["advancedCalculation", "calculation-data", "calculationResult", "dummySimpleResult", "onUpdateData", "onResetData", "onNext", "onPrev"]))
            ]),
            _: 1
          }),
          R(h, { class: "w-full flex flex-col px-6 pb-6" }, {
            default: O(() => [
              $("div", lm, [
                !s.isCurrentStepValid() && o.step !== o.maxStep ? (A(), B(f, {
                  key: 0,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: O(() => [
                    R(c, { class: "w-4 h-4" }),
                    R(l, null, {
                      default: O(() => t[3] || (t[3] = [
                        ee("Unvollständig")
                      ])),
                      _: 1
                    }),
                    R(u, null, {
                      default: O(() => t[4] || (t[4] = [
                        ee(" Bitte überprüfe deine Eingabedaten vor dem nächsten Schritt. ")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : ue("", !0),
                r.calculationStore.error !== null ? (A(), B(f, {
                  key: 1,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: O(() => [
                    R(c, { class: "w-4 h-4" }),
                    R(l, null, {
                      default: O(() => t[5] || (t[5] = [
                        ee("Fehler")
                      ])),
                      _: 1
                    }),
                    R(u, null, {
                      default: O(() => [
                        ee(he(r.calculationStore.error), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : ue("", !0)
              ]),
              $("div", um, [
                o.step > 1 ? (A(), B(m, {
                  key: 0,
                  type: "button",
                  onClick: s.prevStep,
                  variant: "outline"
                }, {
                  default: O(() => [
                    R(p, { class: "mr-2 h-4 w-4" }),
                    t[6] || (t[6] = ee(" Zurück "))
                  ]),
                  _: 1
                }, 8, ["onClick"])) : ue("", !0),
                o.step < o.maxStep && o.step !== o.maxStep - 1 ? (A(), B(m, {
                  key: 1,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: O(() => [
                    t[7] || (t[7] = ee(" Weiter ")),
                    R(y, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : ue("", !0),
                o.step === o.maxStep - 1 ? (A(), B(m, {
                  key: 2,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: O(() => [
                    t[8] || (t[8] = ee(" Berechnen ")),
                    R(y, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : ue("", !0)
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    $("div", cm, [
      ee(he(this.stepsValidity), 1),
      t[9] || (t[9] = $("br", null, null, -1)),
      ee(" " + he(this.advancedCalculation), 1),
      t[10] || (t[10] = $("br", null, null, -1)),
      ee(" " + he(this.calculationData), 1)
    ])
  ], 64);
}
const fm = /* @__PURE__ */ Wt(sm, [["render", dm]]);
function gm(e) {
  const t = document.querySelector(e);
  if (!t) {
    console.error(`Element mit dem Selector "${e}" nicht gefunden.`);
    return;
  }
  const n = Ia(fm);
  n.use(_f()), n.mount(t);
}
export {
  gm as default
};
