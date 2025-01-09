import * as Ir from "vue";
import { openBlock as O, createElementBlock as z, normalizeClass as ne, unref as y, renderSlot as D, computed as B, ref as P, shallowRef as _o, watch as J, getCurrentScope as rn, onScopeDispose as on, shallowReadonly as it, getCurrentInstance as Ne, toRef as Wt, camelize as So, defineComponent as q, Comment as Hs, mergeProps as G, cloneVNode as Ws, h as ke, toRefs as _e, reactive as tr, watchEffect as de, markRaw as dt, createBlock as M, withCtx as A, nextTick as ue, createCommentVNode as ie, Fragment as Te, renderList as Rt, resolveDynamicComponent as ht, onMounted as Ce, createVNode as T, withModifiers as xe, normalizeProps as nr, guardReactiveProps as rr, Teleport as or, onBeforeUnmount as sr, createTextVNode as ee, withKeys as Eo, effectScope as ar, toHandlerKey as Gs, onUnmounted as ir, withDirectives as Co, createElementVNode as V, isRef as et, vModelSelect as Ks, inject as lr, provide as Ao, customRef as Js, onBeforeUpdate as Xs, onUpdated as Ys, normalizeStyle as sn, mergeDefaults as Zs, watchPostEffect as Qs, readonly as ea, toValue as ce, vModelText as ta, resolveComponent as W, toDisplayString as pe, hasInjectionContext as na, isReactive as ur, toRaw as ra, createApp as oa } from "vue";
function Oo(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Oo(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function ko() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Oo(e)) && (r && (r += " "), r += t);
  return r;
}
const cr = "-", sa = (e) => {
  const t = ia(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(cr);
      return i[0] === "" && i.length !== 1 && i.shift(), Ro(i, t) || aa(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const d = n[a] || [];
      return i && r[a] ? [...d, ...r[a]] : d;
    }
  };
}, Ro = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ro(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(cr);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, Lr = /^\[(.+)\]$/, aa = (e) => {
  if (Lr.test(e)) {
    const t = Lr.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, ia = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ua(Object.entries(e.classGroups), n).forEach(([s, a]) => {
    Fn(a, r, s, t);
  }), r;
}, Fn = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : Vr(t, o);
      s.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (la(o)) {
        Fn(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      Fn(a, Vr(t, s), n, r);
    });
  });
}, Vr = (e, t) => {
  let n = e;
  return t.split(cr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, la = (e) => e.isThemeGetter, ua = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [n, o];
}) : e, ca = (e) => {
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
}, To = "!", da = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const d = [];
    let c = 0, l = 0, u;
    for (let h = 0; h < i.length; h++) {
      let g = i[h];
      if (c === 0) {
        if (g === o && (r || i.slice(h, h + s) === t)) {
          d.push(i.slice(l, h)), l = h + s;
          continue;
        }
        if (g === "/") {
          u = h;
          continue;
        }
      }
      g === "[" ? c++ : g === "]" && c--;
    }
    const f = d.length === 0 ? i : i.substring(l), p = f.startsWith(To), m = p ? f.substring(1) : f, v = u && u > l ? u - l : void 0;
    return {
      modifiers: d,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: v
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: a
  }) : a;
}, fa = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, pa = (e) => ({
  cache: ca(e.cacheSize),
  parseClassName: da(e),
  ...sa(e)
}), ma = /\s+/, ha = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(ma);
  let i = "";
  for (let d = a.length - 1; d >= 0; d -= 1) {
    const c = a[d], {
      modifiers: l,
      hasImportantModifier: u,
      baseClassName: f,
      maybePostfixModifierPosition: p
    } = n(c);
    let m = !!p, v = r(m ? f.substring(0, p) : f);
    if (!v) {
      if (!m) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (v = r(f), !v) {
        i = c + (i.length > 0 ? " " + i : i);
        continue;
      }
      m = !1;
    }
    const h = fa(l).join(":"), g = u ? h + To : h, _ = g + v;
    if (s.includes(_))
      continue;
    s.push(_);
    const b = o(v, m);
    for (let C = 0; C < b.length; ++C) {
      const S = b[C];
      s.push(g + S);
    }
    i = c + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function ya() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Po(t)) && (r && (r += " "), r += n);
  return r;
}
const Po = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Po(e[r])) && (n && (n += " "), n += t);
  return n;
};
function va(e, ...t) {
  let n, r, o, s = a;
  function a(d) {
    const c = t.reduce((l, u) => u(l), e());
    return n = pa(c), r = n.cache.get, o = n.cache.set, s = i, i(d);
  }
  function i(d) {
    const c = r(d);
    if (c)
      return c;
    const l = ha(d, n);
    return o(d, l), l;
  }
  return function() {
    return s(ya.apply(null, arguments));
  };
}
const K = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, No = /^\[(?:([a-z-]+):)?(.+)\]$/i, ga = /^\d+\/\d+$/, ba = /* @__PURE__ */ new Set(["px", "full", "screen"]), wa = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xa = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, _a = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Sa = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ea = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Me = (e) => ft(e) || ba.has(e) || ga.test(e), Fe = (e) => yt(e, "length", Na), ft = (e) => !!e && !Number.isNaN(Number(e)), En = (e) => yt(e, "number", ft), St = (e) => !!e && Number.isInteger(Number(e)), Ca = (e) => e.endsWith("%") && ft(e.slice(0, -1)), F = (e) => No.test(e), qe = (e) => wa.test(e), Aa = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Oa = (e) => yt(e, Aa, Bo), ka = (e) => yt(e, "position", Bo), Ra = /* @__PURE__ */ new Set(["image", "url"]), Ta = (e) => yt(e, Ra, Da), Pa = (e) => yt(e, "", Ba), Et = () => !0, yt = (e, t, n) => {
  const r = No.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Na = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  xa.test(e) && !_a.test(e)
), Bo = () => !1, Ba = (e) => Sa.test(e), Da = (e) => Ea.test(e), Ma = () => {
  const e = K("colors"), t = K("spacing"), n = K("blur"), r = K("brightness"), o = K("borderColor"), s = K("borderRadius"), a = K("borderSpacing"), i = K("borderWidth"), d = K("contrast"), c = K("grayscale"), l = K("hueRotate"), u = K("invert"), f = K("gap"), p = K("gradientColorStops"), m = K("gradientColorStopPositions"), v = K("inset"), h = K("margin"), g = K("opacity"), _ = K("padding"), b = K("saturate"), C = K("scale"), S = K("sepia"), R = K("skew"), x = K("space"), I = K("translate"), L = () => ["auto", "contain", "none"], E = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", F, t], N = () => [F, t], U = () => ["", Me, Fe], j = () => ["auto", ft, F], oe = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], Y = () => ["solid", "dashed", "dotted", "double", "none"], se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], Q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], H = () => ["", "0", F], at = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], fe = () => [ft, F];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Et],
      spacing: [Me, Fe],
      blur: ["none", "", qe, F],
      brightness: fe(),
      borderColor: [e],
      borderRadius: ["none", "", "full", qe, F],
      borderSpacing: N(),
      borderWidth: U(),
      contrast: fe(),
      grayscale: H(),
      hueRotate: fe(),
      invert: H(),
      gap: N(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ca, Fe],
      inset: k(),
      margin: k(),
      opacity: fe(),
      padding: N(),
      saturate: fe(),
      scale: fe(),
      sepia: H(),
      skew: fe(),
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
        columns: [qe]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": at()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": at()
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
        object: [...oe(), F]
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
        inset: [v]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [v]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [v]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [v]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [v]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [v]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [v]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [v]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [v]
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
        z: ["auto", St, F]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: k()
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
        order: ["first", "last", "none", St, F]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Et]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", St, F]
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
        "grid-rows": [Et]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [St, F]
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
          screen: [qe]
        }, qe]
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
        text: ["base", qe, Fe]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", En]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Et]
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
        "line-clamp": ["none", ft, En]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Me, F]
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
        "placeholder-opacity": [g]
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
        "text-opacity": [g]
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
        decoration: ["auto", "from-font", Me, Fe]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Me, F]
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
        "bg-opacity": [g]
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
        bg: [...oe(), ka]
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
        bg: ["auto", "cover", "contain", Oa]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ta]
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
        "border-opacity": [g]
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
        "divide-opacity": [g]
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
        "outline-offset": [Me, F]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Me, Fe]
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
        ring: U()
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
        "ring-opacity": [g]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Me, Fe]
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
        shadow: ["", "inner", "none", qe, Pa]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Et]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...se(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": se()
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
        "drop-shadow": ["", "none", qe, F]
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
        "backdrop-opacity": [g]
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
        duration: fe()
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
        delay: fe()
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
        rotate: [St, F]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [I]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [I]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [R]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [R]
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
        stroke: [Me, Fe, En]
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
}, Ia = /* @__PURE__ */ va(Ma);
function Z(...e) {
  return Ia(ko(e));
}
const Do = {
  __name: "Card",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(
        y(Z)(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          t.class
        )
      )
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, La = {
  __name: "CardHeader",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(y(Z)("flex flex-col gap-y-1.5 p-6", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, Va = {
  __name: "CardTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("h3", {
      class: ne(
        y(Z)("text-2xl font-semibold leading-none tracking-tight", t.class)
      )
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, $a = {
  __name: "CardDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("p", {
      class: ne(y(Z)("text-sm text-muted-foreground", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, Mo = {
  __name: "CardContent",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(y(Z)("p-6 pt-0", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, Fa = ["top", "right", "bottom", "left"], ze = Math.min, ye = Math.max, Xt = Math.round, Ft = Math.floor, Re = (e) => ({
  x: e,
  y: e
}), qa = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ja = {
  start: "end",
  end: "start"
};
function qn(e, t, n) {
  return ye(e, ze(t, n));
}
function Le(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ve(e) {
  return e.split("-")[0];
}
function vt(e) {
  return e.split("-")[1];
}
function dr(e) {
  return e === "x" ? "y" : "x";
}
function fr(e) {
  return e === "y" ? "height" : "width";
}
function Ue(e) {
  return ["top", "bottom"].includes(Ve(e)) ? "y" : "x";
}
function pr(e) {
  return dr(Ue(e));
}
function za(e, t, n) {
  n === void 0 && (n = !1);
  const r = vt(e), o = pr(e), s = fr(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Yt(a)), [a, Yt(a)];
}
function Ua(e) {
  const t = Yt(e);
  return [jn(e), t, jn(t)];
}
function jn(e) {
  return e.replace(/start|end/g, (t) => ja[t]);
}
function Ha(e, t, n) {
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
function Wa(e, t, n, r) {
  const o = vt(e);
  let s = Ha(Ve(e), n === "start", r);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(jn)))), s;
}
function Yt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => qa[t]);
}
function Ga(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Io(e) {
  return typeof e != "number" ? Ga(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Zt(e) {
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
function $r(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Ue(t), a = pr(t), i = fr(a), d = Ve(t), c = s === "y", l = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, f = r[i] / 2 - o[i] / 2;
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
  switch (vt(t)) {
    case "start":
      p[a] -= f * (n && c ? -1 : 1);
      break;
    case "end":
      p[a] += f * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const Ka = async (e, t, n) => {
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
  } = $r(c, r, d), f = r, p = {}, m = 0;
  for (let v = 0; v < i.length; v++) {
    const {
      name: h,
      fn: g
    } = i[v], {
      x: _,
      y: b,
      data: C,
      reset: S
    } = await g({
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
    } = $r(c, f, d)), v = -1);
  }
  return {
    x: l,
    y: u,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Tt(e, t) {
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
  } = Le(t, e), m = Io(p), h = i[f ? u === "floating" ? "reference" : "floating" : u], g = Zt(await s.getClippingRect({
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
  }, S = Zt(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: _,
    offsetParent: b,
    strategy: d
  }) : _);
  return {
    top: (g.top - S.top + m.top) / C.y,
    bottom: (S.bottom - g.bottom + m.bottom) / C.y,
    left: (g.left - S.left + m.left) / C.x,
    right: (S.right - g.right + m.right) / C.x
  };
}
const Ja = (e) => ({
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
    } = Le(e, t) || {};
    if (c == null)
      return {};
    const u = Io(l), f = {
      x: n,
      y: r
    }, p = pr(o), m = fr(p), v = await a.getDimensions(c), h = p === "y", g = h ? "top" : "left", _ = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", C = s.reference[m] + s.reference[p] - f[p] - s.floating[m], S = f[p] - s.reference[p], R = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let x = R ? R[b] : 0;
    (!x || !await (a.isElement == null ? void 0 : a.isElement(R))) && (x = i.floating[b] || s.floating[m]);
    const I = C / 2 - S / 2, L = x / 2 - v[m] / 2 - 1, E = ze(u[g], L), k = ze(u[_], L), N = E, U = x - v[m] - k, j = x / 2 - v[m] / 2 + I, oe = qn(N, j, U), Y = !d.arrow && vt(o) != null && j !== oe && s.reference[m] / 2 - (j < N ? E : k) - v[m] / 2 < 0, se = Y ? j < N ? j - N : j - U : 0;
    return {
      [p]: f[p] + se,
      data: {
        [p]: oe,
        centerOffset: j - oe - se,
        ...Y && {
          alignmentOffset: se
        }
      },
      reset: Y
    };
  }
}), Xa = function(e) {
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
        flipAlignment: v = !0,
        ...h
      } = Le(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const g = Ve(o), _ = Ue(i), b = Ve(i) === i, C = await (d.isRTL == null ? void 0 : d.isRTL(c.floating)), S = f || (b || !v ? [Yt(i)] : Ua(i)), R = m !== "none";
      !f && R && S.push(...Wa(i, v, m, C));
      const x = [i, ...S], I = await Tt(t, h), L = [];
      let E = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (l && L.push(I[g]), u) {
        const j = za(o, a, C);
        L.push(I[j[0]], I[j[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: L
      }], !L.every((j) => j <= 0)) {
        var k, N;
        const j = (((k = s.flip) == null ? void 0 : k.index) || 0) + 1, oe = x[j];
        if (oe)
          return {
            data: {
              index: j,
              overflows: E
            },
            reset: {
              placement: oe
            }
          };
        let Y = (N = E.filter((se) => se.overflows[0] <= 0).sort((se, Q) => se.overflows[1] - Q.overflows[1])[0]) == null ? void 0 : N.placement;
        if (!Y)
          switch (p) {
            case "bestFit": {
              var U;
              const se = (U = E.filter((Q) => {
                if (R) {
                  const H = Ue(Q.placement);
                  return H === _ || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  H === "y";
                }
                return !0;
              }).map((Q) => [Q.placement, Q.overflows.filter((H) => H > 0).reduce((H, at) => H + at, 0)]).sort((Q, H) => Q[1] - H[1])[0]) == null ? void 0 : U[0];
              se && (Y = se);
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
function Fr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function qr(e) {
  return Fa.some((t) => e[t] >= 0);
}
const Ya = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Le(e, t);
      switch (r) {
        case "referenceHidden": {
          const s = await Tt(t, {
            ...o,
            elementContext: "reference"
          }), a = Fr(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: qr(a)
            }
          };
        }
        case "escaped": {
          const s = await Tt(t, {
            ...o,
            altBoundary: !0
          }), a = Fr(s, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: qr(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Za(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Ve(n), i = vt(n), d = Ue(n) === "y", c = ["left", "top"].includes(a) ? -1 : 1, l = s && d ? -1 : 1, u = Le(t, e);
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
const Qa = function(e) {
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
      } = t, d = await Za(t, e);
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
}, ei = function(e) {
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
              x: g,
              y: _
            } = h;
            return {
              x: g,
              y: _
            };
          }
        },
        ...d
      } = Le(e, t), c = {
        x: n,
        y: r
      }, l = await Tt(t, d), u = Ue(Ve(o)), f = dr(u);
      let p = c[f], m = c[u];
      if (s) {
        const h = f === "y" ? "top" : "left", g = f === "y" ? "bottom" : "right", _ = p + l[h], b = p - l[g];
        p = qn(_, p, b);
      }
      if (a) {
        const h = u === "y" ? "top" : "left", g = u === "y" ? "bottom" : "right", _ = m + l[h], b = m - l[g];
        m = qn(_, m, b);
      }
      const v = i.fn({
        ...t,
        [f]: p,
        [u]: m
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r,
          enabled: {
            [f]: s,
            [u]: a
          }
        }
      };
    }
  };
}, ti = function(e) {
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
      } = Le(e, t), l = {
        x: n,
        y: r
      }, u = Ue(o), f = dr(u);
      let p = l[f], m = l[u];
      const v = Le(i, t), h = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (d) {
        const b = f === "y" ? "height" : "width", C = s.reference[f] - s.floating[b] + h.mainAxis, S = s.reference[f] + s.reference[b] - h.mainAxis;
        p < C ? p = C : p > S && (p = S);
      }
      if (c) {
        var g, _;
        const b = f === "y" ? "width" : "height", C = ["top", "left"].includes(Ve(o)), S = s.reference[u] - s.floating[b] + (C && ((g = a.offset) == null ? void 0 : g[u]) || 0) + (C ? 0 : h.crossAxis), R = s.reference[u] + s.reference[b] + (C ? 0 : ((_ = a.offset) == null ? void 0 : _[u]) || 0) - (C ? h.crossAxis : 0);
        m < S ? m = S : m > R && (m = R);
      }
      return {
        [f]: p,
        [u]: m
      };
    }
  };
}, ni = function(e) {
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
      } = Le(e, t), l = await Tt(t, c), u = Ve(o), f = vt(o), p = Ue(o) === "y", {
        width: m,
        height: v
      } = s.floating;
      let h, g;
      u === "top" || u === "bottom" ? (h = u, g = f === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (g = u, h = f === "end" ? "top" : "bottom");
      const _ = v - l.top - l.bottom, b = m - l.left - l.right, C = ze(v - l[h], _), S = ze(m - l[g], b), R = !t.middlewareData.shift;
      let x = C, I = S;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (I = b), (r = t.middlewareData.shift) != null && r.enabled.y && (x = _), R && !f) {
        const E = ye(l.left, 0), k = ye(l.right, 0), N = ye(l.top, 0), U = ye(l.bottom, 0);
        p ? I = m - 2 * (E !== 0 || k !== 0 ? E + k : ye(l.left, l.right)) : x = v - 2 * (N !== 0 || U !== 0 ? N + U : ye(l.top, l.bottom));
      }
      await d({
        ...t,
        availableWidth: I,
        availableHeight: x
      });
      const L = await a.getDimensions(i.floating);
      return m !== L.width || v !== L.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function an() {
  return typeof window < "u";
}
function ot(e) {
  return mr(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ve(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Be(e) {
  var t;
  return (t = (mr(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function mr(e) {
  return an() ? e instanceof Node || e instanceof ve(e).Node : !1;
}
function Se(e) {
  return an() ? e instanceof Element || e instanceof ve(e).Element : !1;
}
function Pe(e) {
  return an() ? e instanceof HTMLElement || e instanceof ve(e).HTMLElement : !1;
}
function jr(e) {
  return !an() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ve(e).ShadowRoot;
}
function Dt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ee(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function ri(e) {
  return ["table", "td", "th"].includes(ot(e));
}
function ln(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function hr(e) {
  const t = yr(), n = Se(e) ? Ee(e) : e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function oi(e) {
  let t = He(e);
  for (; Pe(t) && !mt(t); ) {
    if (hr(t))
      return t;
    if (ln(t))
      return null;
    t = He(t);
  }
  return null;
}
function yr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function mt(e) {
  return ["html", "body", "#document"].includes(ot(e));
}
function Ee(e) {
  return ve(e).getComputedStyle(e);
}
function un(e) {
  return Se(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function He(e) {
  if (ot(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    jr(e) && e.host || // Fallback.
    Be(e)
  );
  return jr(t) ? t.host : t;
}
function Lo(e) {
  const t = He(e);
  return mt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Pe(t) && Dt(t) ? t : Lo(t);
}
function Pt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Lo(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ve(o);
  if (s) {
    const i = zn(a);
    return t.concat(a, a.visualViewport || [], Dt(o) ? o : [], i && n ? Pt(i) : []);
  }
  return t.concat(o, Pt(o, [], n));
}
function zn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Vo(e) {
  const t = Ee(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Pe(e), s = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, i = Xt(n) !== s || Xt(r) !== a;
  return i && (n = s, r = a), {
    width: n,
    height: r,
    $: i
  };
}
function vr(e) {
  return Se(e) ? e : e.contextElement;
}
function pt(e) {
  const t = vr(e);
  if (!Pe(t))
    return Re(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = Vo(t);
  let a = (s ? Xt(n.width) : n.width) / r, i = (s ? Xt(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const si = /* @__PURE__ */ Re(0);
function $o(e) {
  const t = ve(e);
  return !yr() || !t.visualViewport ? si : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ai(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ve(e) ? !1 : t;
}
function tt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = vr(e);
  let a = Re(1);
  t && (r ? Se(r) && (a = pt(r)) : a = pt(e));
  const i = ai(s, n, r) ? $o(s) : Re(0);
  let d = (o.left + i.x) / a.x, c = (o.top + i.y) / a.y, l = o.width / a.x, u = o.height / a.y;
  if (s) {
    const f = ve(s), p = r && Se(r) ? ve(r) : r;
    let m = f, v = zn(m);
    for (; v && r && p !== m; ) {
      const h = pt(v), g = v.getBoundingClientRect(), _ = Ee(v), b = g.left + (v.clientLeft + parseFloat(_.paddingLeft)) * h.x, C = g.top + (v.clientTop + parseFloat(_.paddingTop)) * h.y;
      d *= h.x, c *= h.y, l *= h.x, u *= h.y, d += b, c += C, m = ve(v), v = zn(m);
    }
  }
  return Zt({
    width: l,
    height: u,
    x: d,
    y: c
  });
}
function gr(e, t) {
  const n = un(e).scrollLeft;
  return t ? t.left + n : tt(Be(e)).left + n;
}
function Fo(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    gr(e, r)
  )), s = r.top + t.scrollTop;
  return {
    x: o,
    y: s
  };
}
function ii(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const s = o === "fixed", a = Be(r), i = t ? ln(t.floating) : !1;
  if (r === a || i && s)
    return n;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Re(1);
  const l = Re(0), u = Pe(r);
  if ((u || !u && !s) && ((ot(r) !== "body" || Dt(a)) && (d = un(r)), Pe(r))) {
    const p = tt(r);
    c = pt(r), l.x = p.x + r.clientLeft, l.y = p.y + r.clientTop;
  }
  const f = a && !u && !s ? Fo(a, d, !0) : Re(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - d.scrollLeft * c.x + l.x + f.x,
    y: n.y * c.y - d.scrollTop * c.y + l.y + f.y
  };
}
function li(e) {
  return Array.from(e.getClientRects());
}
function ui(e) {
  const t = Be(e), n = un(e), r = e.ownerDocument.body, o = ye(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ye(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + gr(e);
  const i = -n.scrollTop;
  return Ee(r).direction === "rtl" && (a += ye(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
function ci(e, t) {
  const n = ve(e), r = Be(e), o = n.visualViewport;
  let s = r.clientWidth, a = r.clientHeight, i = 0, d = 0;
  if (o) {
    s = o.width, a = o.height;
    const c = yr();
    (!c || c && t === "fixed") && (i = o.offsetLeft, d = o.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: i,
    y: d
  };
}
function di(e, t) {
  const n = tt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = Pe(e) ? pt(e) : Re(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, d = o * s.x, c = r * s.y;
  return {
    width: a,
    height: i,
    x: d,
    y: c
  };
}
function zr(e, t, n) {
  let r;
  if (t === "viewport")
    r = ci(e, n);
  else if (t === "document")
    r = ui(Be(e));
  else if (Se(t))
    r = di(t, n);
  else {
    const o = $o(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Zt(r);
}
function qo(e, t) {
  const n = He(e);
  return n === t || !Se(n) || mt(n) ? !1 : Ee(n).position === "fixed" || qo(n, t);
}
function fi(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Pt(e, [], !1).filter((i) => Se(i) && ot(i) !== "body"), o = null;
  const s = Ee(e).position === "fixed";
  let a = s ? He(e) : e;
  for (; Se(a) && !mt(a); ) {
    const i = Ee(a), d = hr(a);
    !d && i.position === "fixed" && (o = null), (s ? !d && !o : !d && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Dt(a) && !d && qo(e, a)) ? r = r.filter((l) => l !== a) : o = i, a = He(a);
  }
  return t.set(e, r), r;
}
function pi(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? ln(t) ? [] : fi(t, this._c) : [].concat(n), r], i = a[0], d = a.reduce((c, l) => {
    const u = zr(t, l, o);
    return c.top = ye(u.top, c.top), c.right = ze(u.right, c.right), c.bottom = ze(u.bottom, c.bottom), c.left = ye(u.left, c.left), c;
  }, zr(t, i, o));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function mi(e) {
  const {
    width: t,
    height: n
  } = Vo(e);
  return {
    width: t,
    height: n
  };
}
function hi(e, t, n) {
  const r = Pe(t), o = Be(t), s = n === "fixed", a = tt(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = Re(0);
  if (r || !r && !s)
    if ((ot(t) !== "body" || Dt(o)) && (i = un(t)), r) {
      const f = tt(t, !0, s, t);
      d.x = f.x + t.clientLeft, d.y = f.y + t.clientTop;
    } else o && (d.x = gr(o));
  const c = o && !r && !s ? Fo(o, i) : Re(0), l = a.left + i.scrollLeft - d.x - c.x, u = a.top + i.scrollTop - d.y - c.y;
  return {
    x: l,
    y: u,
    width: a.width,
    height: a.height
  };
}
function Cn(e) {
  return Ee(e).position === "static";
}
function Ur(e, t) {
  if (!Pe(e) || Ee(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Be(e) === n && (n = n.ownerDocument.body), n;
}
function jo(e, t) {
  const n = ve(e);
  if (ln(e))
    return n;
  if (!Pe(e)) {
    let o = He(e);
    for (; o && !mt(o); ) {
      if (Se(o) && !Cn(o))
        return o;
      o = He(o);
    }
    return n;
  }
  let r = Ur(e, t);
  for (; r && ri(r) && Cn(r); )
    r = Ur(r, t);
  return r && mt(r) && Cn(r) && !hr(r) ? n : r || oi(e) || n;
}
const yi = async function(e) {
  const t = this.getOffsetParent || jo, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: hi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function vi(e) {
  return Ee(e).direction === "rtl";
}
const gi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ii,
  getDocumentElement: Be,
  getClippingRect: pi,
  getOffsetParent: jo,
  getElementRects: yi,
  getClientRects: li,
  getDimensions: mi,
  getScale: pt,
  isElement: Se,
  isRTL: vi
};
function bi(e, t) {
  let n = null, r;
  const o = Be(e);
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
    const p = Ft(l), m = Ft(o.clientWidth - (c + u)), v = Ft(o.clientHeight - (l + f)), h = Ft(c), _ = {
      rootMargin: -p + "px " + -m + "px " + -v + "px " + -h + "px",
      threshold: ye(0, ze(1, d)) || 1
    };
    let b = !0;
    function C(S) {
      const R = S[0].intersectionRatio;
      if (R !== d) {
        if (!b)
          return a();
        R ? a(!1, R) : r = setTimeout(() => {
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
function wi(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = r, c = vr(e), l = o || s ? [...c ? Pt(c) : [], ...Pt(t)] : [];
  l.forEach((g) => {
    o && g.addEventListener("scroll", n, {
      passive: !0
    }), s && g.addEventListener("resize", n);
  });
  const u = c && i ? bi(c, n) : null;
  let f = -1, p = null;
  a && (p = new ResizeObserver((g) => {
    let [_] = g;
    _ && _.target === c && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var b;
      (b = p) == null || b.observe(t);
    })), n();
  }), c && !d && p.observe(c), p.observe(t));
  let m, v = d ? tt(e) : null;
  d && h();
  function h() {
    const g = tt(e);
    v && (g.x !== v.x || g.y !== v.y || g.width !== v.width || g.height !== v.height) && n(), v = g, m = requestAnimationFrame(h);
  }
  return n(), () => {
    var g;
    l.forEach((_) => {
      o && _.removeEventListener("scroll", n), s && _.removeEventListener("resize", n);
    }), u == null || u(), (g = p) == null || g.disconnect(), p = null, d && cancelAnimationFrame(m);
  };
}
const xi = Qa, _i = ei, Hr = Xa, Si = ni, Ei = Ya, Ci = Ja, Ai = ti, Oi = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: gi,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return Ka(e, t, {
    ...o,
    platform: s
  });
};
function qt(e, t, n) {
  return Array.isArray(e) ? (e.length = Math.max(e.length, t), e.splice(t, 1, n), n) : (e[t] = n, n);
}
function An(e, t) {
  if (Array.isArray(e)) {
    e.splice(t, 1);
    return;
  }
  delete e[t];
}
function ki(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Un(e) {
  if (ki(e)) {
    const t = e.$el;
    return mr(t) && ot(t) === "#comment" ? null : t;
  }
  return e;
}
function ct(e) {
  return typeof e == "function" ? e() : y(e);
}
function Ri(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Un(ct(e.element));
      return n == null ? {} : Ci({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function zo(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Wr(e, t) {
  const n = zo(e);
  return Math.round(t * n) / n;
}
function Ti(e, t, n) {
  n === void 0 && (n = {});
  const r = n.whileElementsMounted, o = B(() => {
    var x;
    return (x = ct(n.open)) != null ? x : !0;
  }), s = B(() => ct(n.middleware)), a = B(() => {
    var x;
    return (x = ct(n.placement)) != null ? x : "bottom";
  }), i = B(() => {
    var x;
    return (x = ct(n.strategy)) != null ? x : "absolute";
  }), d = B(() => {
    var x;
    return (x = ct(n.transform)) != null ? x : !0;
  }), c = B(() => Un(e.value)), l = B(() => Un(t.value)), u = P(0), f = P(0), p = P(i.value), m = P(a.value), v = _o({}), h = P(!1), g = B(() => {
    const x = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!l.value)
      return x;
    const I = Wr(l.value, u.value), L = Wr(l.value, f.value);
    return d.value ? {
      ...x,
      transform: "translate(" + I + "px, " + L + "px)",
      ...zo(l.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: I + "px",
      top: L + "px"
    };
  });
  let _;
  function b() {
    if (c.value == null || l.value == null)
      return;
    const x = o.value;
    Oi(c.value, l.value, {
      middleware: s.value,
      placement: a.value,
      strategy: i.value
    }).then((I) => {
      u.value = I.x, f.value = I.y, p.value = I.strategy, m.value = I.placement, v.value = I.middlewareData, h.value = x !== !1;
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
  function R() {
    o.value || (h.value = !1);
  }
  return J([s, a, i, o], b, {
    flush: "sync"
  }), J([c, l], S, {
    flush: "sync"
  }), J(o, R, {
    flush: "sync"
  }), rn() && on(C), {
    x: it(u),
    y: it(f),
    strategy: it(p),
    placement: it(m),
    middlewareData: it(v),
    isPositioned: it(h),
    floatingStyles: g,
    update: b
  };
}
function he(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
  return [(o) => {
    const s = lr(r, o);
    if (s || s === null)
      return s;
    throw new Error(
      `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (o) => (Ao(r, o), o)];
}
function Uo(e, t, n) {
  const r = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(o);
}
function Gr(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(n, Math.max(t, e));
}
function br(e) {
  return e == null;
}
function Pi(e, t) {
  var n;
  const r = _o();
  return de(() => {
    r.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), ea(r);
}
function wr(e) {
  return rn() ? (on(e), !0) : !1;
}
function Ni(e) {
  let t = !1, n;
  const r = ar(!0);
  return (...o) => (t || (n = r.run(() => e(...o)), t = !0), n);
}
function Bi(e) {
  let t = 0, n, r;
  const o = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...s) => (t += 1, n || (r = ar(!0), n = r.run(() => e(...s))), wr(o), n);
}
function Ze(e) {
  return typeof e == "function" ? e() : y(e);
}
const Ge = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Di = (e) => typeof e < "u", Mi = Object.prototype.toString, Ii = (e) => Mi.call(e) === "[object Object]", Li = () => {
}, Kr = /* @__PURE__ */ Vi();
function Vi() {
  var e, t;
  return Ge && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function $i(e) {
  return Ne();
}
function Fi(e, t = 1e4) {
  return Js((n, r) => {
    let o = Ze(e), s;
    const a = () => setTimeout(() => {
      o = Ze(e), r();
    }, Ze(t));
    return wr(() => {
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
function qi(e, t) {
  $i() && sr(e, t);
}
function $e(e) {
  var t;
  const n = Ze(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const xr = Ge ? window : void 0;
function Qt(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = xr) : [t, n, r, o] = e, !t)
    return Li;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((l) => l()), s.length = 0;
  }, i = (l, u, f, p) => (l.addEventListener(u, f, p), () => l.removeEventListener(u, f, p)), d = J(
    () => [$e(t), Ze(o)],
    ([l, u]) => {
      if (a(), !l)
        return;
      const f = Ii(u) ? { ...u } : u;
      s.push(
        ...n.flatMap((p) => r.map((m) => i(l, p, m, f)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    d(), a();
  };
  return wr(c), c;
}
function ji(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function zi(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: o = xr,
    eventName: s = "keydown",
    passive: a = !1,
    dedupe: i = !1
  } = r, d = ji(t);
  return Qt(o, s, (c) => {
    c.repeat && Ze(i) || d(c) && n(c);
  }, a);
}
function Ui() {
  const e = P(!1), t = Ne();
  return t && Ce(() => {
    e.value = !0;
  }, t), e;
}
function Hi(e) {
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
  } = r, p = Ne(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let v = c;
  t || (t = "modelValue"), v = v || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : Hi(b) : b, g = () => Di(e[t]) ? h(e[t]) : u, _ = (b) => {
    f ? f(b) && m(v, b) : m(v, b);
  };
  if (d) {
    const b = g(), C = P(b);
    let S = !1;
    return J(
      () => e[t],
      (R) => {
        S || (S = !0, C.value = h(R), ue(() => S = !1));
      }
    ), J(
      C,
      (R) => {
        !S && (R !== e[t] || l) && _(R);
      },
      { deep: l }
    ), C;
  } else
    return B({
      get() {
        return g();
      },
      set(b) {
        _(b);
      }
    });
}
function _r(e) {
  return e ? e.flatMap((t) => t.type === Te ? _r(t.children) : [t]) : [];
}
function On(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Hn(e, t, n = ".", r) {
  if (!On(t))
    return Hn(e, {}, n);
  const o = Object.assign({}, t);
  for (const s in e) {
    if (s === "__proto__" || s === "constructor")
      continue;
    const a = e[s];
    a != null && (Array.isArray(a) && Array.isArray(o[s]) ? o[s] = [...a, ...o[s]] : On(a) && On(o[s]) ? o[s] = Hn(
      a,
      o[s],
      (n ? `${n}.` : "") + s.toString()
    ) : o[s] = a);
  }
  return o;
}
function Wi(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, r) => Hn(n, r, ""), {})
  );
}
const Gi = Wi(), [cn, hp] = he("ConfigProvider");
let Ki = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Ji = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Ki[Math.random() * 64 | 0];
  return t;
};
const Xi = Bi(() => {
  const e = P(/* @__PURE__ */ new Map()), t = P(), n = B(() => {
    for (const a of e.value.values())
      if (a)
        return !0;
    return !1;
  }), r = cn({
    scrollBody: P(!0)
  });
  let o = null;
  const s = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Kr && (o == null || o()), t.value = void 0;
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
    const c = window.innerWidth - document.documentElement.clientWidth, l = { padding: c, margin: 0 }, u = (d = r.scrollBody) != null && d.value ? typeof r.scrollBody.value == "object" ? Gi({
      padding: r.scrollBody.value.padding === !0 ? c : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? c : r.scrollBody.value.margin
    }, l) : l : { padding: 0, margin: 0 };
    c > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${c}px`), document.body.style.overflow = "hidden"), Kr && (o = Qt(
      document,
      "touchmove",
      (f) => Zi(f),
      { passive: !1 }
    )), ue(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function Yi(e) {
  const t = Ji(6), n = Xi();
  n.value.set(t, e ?? !1);
  const r = B({
    get: () => n.value.get(t) ?? !1,
    set: (o) => n.value.set(t, o)
  });
  return qi(() => {
    n.value.delete(t);
  }), r;
}
function Ho(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Ho(n);
  }
}
function Zi(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && Ho(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
const Qi = "data-radix-vue-collection-item";
function dn(e, t = Qi) {
  const n = Symbol();
  return { createCollection: (r) => {
    const o = P([]);
    function s() {
      const a = $e(r);
      return a ? o.value = Array.from(
        a.querySelectorAll(`[${t}]:not([data-disabled])`)
      ) : o.value = [];
    }
    return Xs(() => {
      o.value = [];
    }), Ce(s), Ys(s), J(() => r == null ? void 0 : r.value, s, { immediate: !0 }), Ao(n, o), o;
  }, injectCollection: () => lr(n, P([])) };
}
function Sr(e) {
  const t = cn({
    dir: P("ltr")
  });
  return B(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function el(e) {
  const t = Ne(), n = t == null ? void 0 : t.type.emits, r = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((o) => {
    r[Gs(So(o))] = (...s) => e(o, ...s);
  }), r;
}
let kn = 0;
function tl() {
  de((e) => {
    if (!Ge)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? Jr()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? Jr()
    ), kn++, e(() => {
      kn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), kn--;
    });
  });
}
function Jr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function Er(e) {
  return B(() => {
    var t;
    return Ze(e) ? !!((t = $e(e)) != null && t.closest("form")) : !0;
  });
}
function Ke(e) {
  const t = Ne(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, s) => {
    const a = (t == null ? void 0 : t.type.props[s]).default;
    return a !== void 0 && (o[s] = a), o;
  }, {}), r = Wt(e);
  return B(() => {
    const o = {}, s = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(s).forEach((a) => {
      o[So(a)] = s[a];
    }), Object.keys({ ...n, ...o }).reduce((a, i) => (r.value[i] !== void 0 && (a[i] = r.value[i]), a), {});
  });
}
function Mt(e, t) {
  const n = Ke(e), r = t ? el(t) : {};
  return B(() => ({
    ...n.value,
    ...r
  }));
}
function te() {
  const e = Ne(), t = P(), n = B(() => {
    var a, i;
    return ["#text", "#comment"].includes((a = t.value) == null ? void 0 : a.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : $e(t);
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
var nl = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, lt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), zt = {}, Rn = 0, Wo = function(e) {
  return e && (e.host || Wo(e.parentNode));
}, rl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Wo(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, ol = function(e, t, n, r) {
  var o = rl(t, Array.isArray(e) ? e : [e]);
  zt[n] || (zt[n] = /* @__PURE__ */ new WeakMap());
  var s = zt[n], a = [], i = /* @__PURE__ */ new Set(), d = new Set(o), c = function(u) {
    !u || i.has(u) || (i.add(u), c(u.parentNode));
  };
  o.forEach(c);
  var l = function(u) {
    !u || d.has(u) || Array.prototype.forEach.call(u.children, function(f) {
      if (i.has(f))
        l(f);
      else
        try {
          var p = f.getAttribute(r), m = p !== null && p !== "false", v = (lt.get(f) || 0) + 1, h = (s.get(f) || 0) + 1;
          lt.set(f, v), s.set(f, h), a.push(f), v === 1 && m && jt.set(f, !0), h === 1 && f.setAttribute(n, "true"), m || f.setAttribute(r, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", f, g);
        }
    });
  };
  return l(t), i.clear(), Rn++, function() {
    a.forEach(function(u) {
      var f = lt.get(u) - 1, p = s.get(u) - 1;
      lt.set(u, f), s.set(u, p), f || (jt.has(u) || u.removeAttribute(r), jt.delete(u)), p || u.removeAttribute(n);
    }), Rn--, Rn || (lt = /* @__PURE__ */ new WeakMap(), lt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), zt = {});
  };
}, sl = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = nl(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), ol(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
function al(e) {
  let t;
  J(() => $e(e), (n) => {
    n ? t = sl(n) : t && t();
  }), ir(() => {
    t && t();
  });
}
let il = 0;
function Cr(e, t = "radix") {
  const n = cn({ useId: void 0 });
  return Ir.useId ? `${t}-${Ir.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++il}`;
}
function ll(e) {
  const t = P(), n = B(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.width) ?? 0;
  }), r = B(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.height) ?? 0;
  });
  return Ce(() => {
    const o = $e(e);
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
function ul(e, t) {
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
const cl = "data-item-text";
function Go(e) {
  const t = Fi("", 1e3);
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
          textValue: ((f = (u.querySelector(`[${cl}]`) ?? u).textContent) == null ? void 0 : f.trim()) ?? ""
        };
      }), i = a.find((u) => u.ref === s), d = a.map((u) => u.textValue), c = fl(d, t.value, i == null ? void 0 : i.textValue), l = a.find((u) => u.textValue === c);
      return l && l.ref.focus(), l == null ? void 0 : l.ref;
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function dl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function fl(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((i) => i === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let s = dl(e, Math.max(o, 0));
  r.length === 1 && (s = s.filter((i) => i !== n));
  const a = s.find(
    (i) => i.toLowerCase().startsWith(r.toLowerCase())
  );
  return a !== n ? a : void 0;
}
const Ar = q({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r, o;
      if (!n.default)
        return null;
      const s = _r(n.default()), a = s.findIndex((l) => l.type !== Hs);
      if (a === -1)
        return s;
      const i = s[a];
      (r = i.props) == null || delete r.ref;
      const d = i.props ? G(t, i.props) : t;
      t.class && (o = i.props) != null && o.class && delete i.props.class;
      const c = Ws(i, d);
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
    return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => ke(r, t) : r !== "template" ? () => ke(e.as, t, { default: n.default }) : () => ke(Ar, t, { default: n.default });
  }
});
function Or() {
  const e = P(), t = B(() => {
    var n, r;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : $e(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function pl(e, t) {
  var n;
  const r = P({}), o = P("none"), s = P(e), a = e.value ? "mounted" : "unmounted";
  let i;
  const d = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? xr, { state: c, dispatch: l } = ul(a, {
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
    var g;
    if (Ge) {
      const _ = new CustomEvent(h, { bubbles: !1, cancelable: !1 });
      (g = t.value) == null || g.dispatchEvent(_);
    }
  };
  J(
    e,
    async (h, g) => {
      var _;
      const b = g !== h;
      if (await ue(), b) {
        const C = o.value, S = Ut(t.value);
        h ? (l("MOUNT"), u("enter"), S === "none" && u("after-enter")) : S === "none" || ((_ = r.value) == null ? void 0 : _.display) === "none" ? (l("UNMOUNT"), u("leave"), u("after-leave")) : g && C !== S ? (l("ANIMATION_OUT"), u("leave")) : (l("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const f = (h) => {
    const g = Ut(t.value), _ = g.includes(
      h.animationName
    ), b = c.value === "mounted" ? "enter" : "leave";
    if (h.target === t.value && _ && (u(`after-${b}`), l("ANIMATION_END"), !s.value)) {
      const C = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = d == null ? void 0 : d.setTimeout(() => {
        var S;
        ((S = t.value) == null ? void 0 : S.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = C);
      });
    }
    h.target === t.value && g === "none" && l("ANIMATION_END");
  }, p = (h) => {
    h.target === t.value && (o.value = Ut(t.value));
  }, m = J(
    t,
    (h, g) => {
      h ? (r.value = getComputedStyle(h), h.addEventListener("animationstart", p), h.addEventListener("animationcancel", f), h.addEventListener("animationend", f)) : (l("ANIMATION_END"), d == null || d.clearTimeout(i), g == null || g.removeEventListener("animationstart", p), g == null || g.removeEventListener("animationcancel", f), g == null || g.removeEventListener("animationend", f));
    },
    { immediate: !0 }
  ), v = J(c, () => {
    const h = Ut(t.value);
    o.value = c.value === "mounted" ? h : "none";
  });
  return ir(() => {
    m(), v();
  }), {
    isPresent: B(
      () => ["mounted", "unmountSuspended"].includes(c.value)
    )
  };
}
function Ut(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const Ko = q({
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
    const { present: o, forceMount: s } = _e(e), a = P(), { isPresent: i } = pl(o, a);
    n({ present: i });
    let d = t.default({ present: i });
    d = _r(d || []);
    const c = Ne();
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
    return () => s.value || o.value || i.value ? ke(t.default({ present: i })[0], {
      ref: (l) => {
        const u = $e(l);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? a.value = u.firstElementChild : a.value = u), u;
      }
    }) : null;
  }
}), ml = /* @__PURE__ */ q({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ui();
    return (n, r) => y(t) || n.forceMount ? (O(), M(or, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      D(n.$slots, "default")
    ], 8, ["to", "disabled"])) : ie("", !0);
  }
}), hl = "dismissableLayer.pointerDownOutside", yl = "dismissableLayer.focusOutside";
function Jo(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), r = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && r === n || o.indexOf(r) < o.indexOf(n));
}
function vl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = P(!1), s = P(() => {
  });
  return de((a) => {
    if (!Ge)
      return;
    const i = async (c) => {
      const l = c.target;
      if (t != null && t.value) {
        if (Jo(t.value, l)) {
          o.value = !1;
          return;
        }
        if (c.target && !o.value) {
          let u = function() {
            Uo(
              hl,
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
function gl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = P(!1);
  return de((s) => {
    if (!Ge)
      return;
    const a = async (i) => {
      t != null && t.value && (await ue(), !(!t.value || Jo(t.value, i.target)) && i.target && !o.value && Uo(
        yl,
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
const Ie = tr({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), bl = /* @__PURE__ */ q({
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
      const m = Array.from(i.value), [v] = [...Ie.layersWithOutsidePointerEventsDisabled].slice(-1), h = m.indexOf(v);
      return d.value >= h;
    }), u = vl(async (m) => {
      const v = [...Ie.branches].some(
        (h) => h == null ? void 0 : h.contains(m.target)
      );
      !l.value || v || (r("pointerDownOutside", m), r("interactOutside", m), await ue(), m.defaultPrevented || r("dismiss"));
    }, s), f = gl((m) => {
      [...Ie.branches].some(
        (v) => v == null ? void 0 : v.contains(m.target)
      ) || (r("focusOutside", m), r("interactOutside", m), m.defaultPrevented || r("dismiss"));
    }, s);
    zi("Escape", (m) => {
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
    }), (m, v) => (O(), M(y(X), {
      ref: y(o),
      "as-child": m.asChild,
      as: m.as,
      "data-dismissable-layer": "",
      style: sn({
        pointerEvents: c.value ? l.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: y(f).onFocusCapture,
      onBlurCapture: y(f).onBlurCapture,
      onPointerdownCapture: y(u).onPointerDownCapture
    }, {
      default: A(() => [
        D(m.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Tn = "focusScope.autoFocusOnMount", Pn = "focusScope.autoFocusOnUnmount", Xr = { bubbles: !1, cancelable: !0 };
function wl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (je(r, { select: t }), document.activeElement !== n)
      return !0;
}
function xl(e) {
  const t = Xo(e), n = Yr(t, e), r = Yr(t.reverse(), e);
  return [n, r];
}
function Xo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Yr(e, t) {
  for (const n of e)
    if (!_l(n, { upTo: t }))
      return n;
}
function _l(e, { upTo: t }) {
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
function Sl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function je(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Sl(e) && t && e.select();
  }
}
const El = Ni(() => P([]));
function Cl() {
  const e = El();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Zr(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Zr(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Zr(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Al(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Ol = /* @__PURE__ */ q({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, r = t, { currentRef: o, currentElement: s } = te(), a = P(null), i = Cl(), d = tr({
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
        const g = h.target;
        u.contains(g) ? a.value = g : je(a.value, { select: !0 });
      }
      function p(h) {
        if (d.paused || !u)
          return;
        const g = h.relatedTarget;
        g !== null && (u.contains(g) || je(a.value, { select: !0 }));
      }
      function m(h) {
        u.contains(a.value) || je(u);
      }
      document.addEventListener("focusin", f), document.addEventListener("focusout", p);
      const v = new MutationObserver(m);
      u && v.observe(u, { childList: !0, subtree: !0 }), l(() => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", p), v.disconnect();
      });
    }), de(async (l) => {
      const u = s.value;
      if (await ue(), !u)
        return;
      i.add(d);
      const f = document.activeElement;
      if (!u.contains(f)) {
        const p = new CustomEvent(Tn, Xr);
        u.addEventListener(Tn, (m) => r("mountAutoFocus", m)), u.dispatchEvent(p), p.defaultPrevented || (wl(Al(Xo(u)), {
          select: !0
        }), document.activeElement === f && je(u));
      }
      l(() => {
        u.removeEventListener(Tn, (v) => r("mountAutoFocus", v));
        const p = new CustomEvent(Pn, Xr), m = (v) => {
          r("unmountAutoFocus", v);
        };
        u.addEventListener(Pn, m), u.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || je(f ?? document.body, { select: !0 }), u.removeEventListener(Pn, m), i.remove(d);
        }, 0);
      });
    });
    function c(l) {
      if (!n.loop && !n.trapped || d.paused)
        return;
      const u = l.key === "Tab" && !l.altKey && !l.ctrlKey && !l.metaKey, f = document.activeElement;
      if (u && f) {
        const p = l.currentTarget, [m, v] = xl(p);
        m && v ? !l.shiftKey && f === v ? (l.preventDefault(), n.loop && je(m, { select: !0 })) : l.shiftKey && f === m && (l.preventDefault(), n.loop && je(v, { select: !0 })) : f === p && l.preventDefault();
      }
    }
    return (l, u) => (O(), M(y(X), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": l.asChild,
      as: l.as,
      onKeydown: c
    }, {
      default: A(() => [
        D(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Qr(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [Yo, kl] = he("PopperRoot"), Rl = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = P();
    return kl({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, r) => D(n.$slots, "default");
  }
}), Tl = /* @__PURE__ */ q({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = te(), o = Yo();
    return de(() => {
      o.onAnchorChange(t.element ?? r.value);
    }), (s, a) => (O(), M(y(X), {
      ref: y(n),
      as: s.as,
      "as-child": s.asChild
    }, {
      default: A(() => [
        D(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Pl(e) {
  return e !== null;
}
function Nl(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, r, o;
      const { placement: s, rects: a, middlewareData: i } = t, d = ((n = i.arrow) == null ? void 0 : n.centerOffset) !== 0, c = d ? 0 : e.arrowWidth, l = d ? 0 : e.arrowHeight, [u, f] = Wn(s), p = { start: "0%", center: "50%", end: "100%" }[f], m = (((r = i.arrow) == null ? void 0 : r.x) ?? 0) + c / 2, v = (((o = i.arrow) == null ? void 0 : o.y) ?? 0) + l / 2;
      let h = "", g = "";
      return u === "bottom" ? (h = d ? p : `${m}px`, g = `${-l}px`) : u === "top" ? (h = d ? p : `${m}px`, g = `${a.floating.height + l}px`) : u === "right" ? (h = `${-l}px`, g = d ? p : `${v}px`) : u === "left" && (h = `${a.floating.width + l}px`, g = d ? p : `${v}px`), { data: { x: h, y: g } };
    }
  };
}
function Wn(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Bl = {
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
}, [yp, Dl] = he("PopperContent"), Ml = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ Zs({
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
    ...Bl
  }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Yo(), { forwardRef: s, currentElement: a } = te(), i = P(), d = P(), { width: c, height: l } = ll(d), u = B(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), f = B(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), p = B(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), m = B(() => ({
      padding: f.value,
      boundary: p.value.filter(Pl),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), v = Pi(() => [
      xi({
        mainAxis: n.sideOffset + l.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Hr({
        ...m.value
      }),
      n.avoidCollisions && _i({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? Ai() : void 0,
        ...m.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Hr({
        ...m.value
      }),
      Si({
        ...m.value,
        apply: ({ elements: E, rects: k, availableWidth: N, availableHeight: U }) => {
          const { width: j, height: oe } = k.reference, Y = E.floating.style;
          Y.setProperty(
            "--radix-popper-available-width",
            `${N}px`
          ), Y.setProperty(
            "--radix-popper-available-height",
            `${U}px`
          ), Y.setProperty(
            "--radix-popper-anchor-width",
            `${j}px`
          ), Y.setProperty(
            "--radix-popper-anchor-height",
            `${oe}px`
          );
        }
      }),
      d.value && Ri({ element: d.value, padding: n.arrowPadding }),
      Nl({
        arrowWidth: c.value,
        arrowHeight: l.value
      }),
      n.hideWhenDetached && Ei({ strategy: "referenceHidden", ...m.value })
    ]), { floatingStyles: h, placement: g, isPositioned: _, middlewareData: b } = Ti(
      o.anchor,
      i,
      {
        strategy: "fixed",
        placement: u,
        whileElementsMounted: (...E) => wi(...E, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: v
      }
    ), C = B(
      () => Wn(g.value)[0]
    ), S = B(
      () => Wn(g.value)[1]
    );
    Qs(() => {
      _.value && r("placed");
    });
    const R = B(
      () => {
        var E;
        return ((E = b.value.arrow) == null ? void 0 : E.centerOffset) !== 0;
      }
    ), x = P("");
    de(() => {
      a.value && (x.value = window.getComputedStyle(a.value).zIndex);
    });
    const I = B(() => {
      var E;
      return ((E = b.value.arrow) == null ? void 0 : E.x) ?? 0;
    }), L = B(() => {
      var E;
      return ((E = b.value.arrow) == null ? void 0 : E.y) ?? 0;
    });
    return Dl({
      placedSide: C,
      onArrowChange: (E) => d.value = E,
      arrowX: I,
      arrowY: L,
      shouldHideArrow: R
    }), (E, k) => {
      var N, U, j;
      return O(), z("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: sn({
          ...y(h),
          transform: y(_) ? y(h).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: x.value,
          "--radix-popper-transform-origin": [
            (N = y(b).transformOrigin) == null ? void 0 : N.x,
            (U = y(b).transformOrigin) == null ? void 0 : U.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((j = y(b).hide) == null ? void 0 : j.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        T(y(X), G({ ref: y(s) }, E.$attrs, {
          "as-child": n.asChild,
          as: E.as,
          "data-side": C.value,
          "data-align": S.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: y(_) ? void 0 : "none"
          }
        }), {
          default: A(() => [
            D(E.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Il = /* @__PURE__ */ q({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return te(), (t, n) => (O(), M(y(X), {
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
      default: A(() => [
        D(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Ll = "data-radix-vue-collection-item", [kr, Vl] = he("CollectionProvider");
function $l(e = Ll) {
  const t = P(/* @__PURE__ */ new Map()), n = P(), r = Vl({
    collectionRef: n,
    itemMap: t,
    attrName: e
  }), { getItems: o } = Zo(r), s = B(() => Array.from(r.itemMap.value.values())), a = B(() => r.itemMap.value.size);
  return { getItems: o, reactiveItems: s, itemMapSize: a };
}
const Fl = q({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = kr(), { primitiveElement: r, currentElement: o } = Or();
    return J(o, () => {
      n.collectionRef.value = o.value;
    }), () => ke(Ar, { ref: r }, t);
  }
}), ql = q({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = kr(), { primitiveElement: o, currentElement: s } = Or();
    return de((a) => {
      if (s.value) {
        const i = dt(s.value);
        r.itemMap.value.set(i, { ref: s.value, value: e.value }), a(() => r.itemMap.value.delete(i));
      }
    }), () => ke(Ar, { ...n, [r.attrName]: "", ref: o }, t);
  }
});
function Zo(e) {
  const t = e ?? kr();
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
function jl(e) {
  const t = cn({
    nonce: P()
  });
  return B(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const zl = "rovingFocusGroup.onEntryFocus", Ul = { bubbles: !1, cancelable: !0 }, Hl = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Wl(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Gl(e, t, n) {
  const r = Wl(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Hl[r];
}
function Qo(e, t = !1, n) {
  const r = (n == null ? void 0 : n.activeElement) ?? document.activeElement;
  for (const o of e)
    if (o === r || (o.focus({ preventScroll: t }), document.activeElement !== r))
      return;
}
function Kl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const [Jl, Xl] = he("RovingFocusGroup"), Yl = /* @__PURE__ */ q({
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
    const r = e, o = n, { loop: s, orientation: a, dir: i } = _e(r), d = Sr(i), c = We(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), l = P(!1), u = P(!1), f = P(0), { getItems: p } = $l();
    function m(h) {
      const g = !u.value;
      if (h.currentTarget && h.target === h.currentTarget && g && !l.value) {
        const _ = new CustomEvent(zl, Ul);
        if (h.currentTarget.dispatchEvent(_), o("entryFocus", _), !_.defaultPrevented) {
          const b = p().map((x) => x.ref).filter((x) => x.dataset.disabled !== ""), C = b.find((x) => x.getAttribute("data-active") === "true"), S = b.find(
            (x) => x.id === c.value
          ), R = [C, S, ...b].filter(
            Boolean
          );
          Qo(R, r.preventScrollOnEntryFocus);
        }
      }
      u.value = !1;
    }
    function v() {
      setTimeout(() => {
        u.value = !1;
      }, 1);
    }
    return t({
      getItems: p
    }), Xl({
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
    }), (h, g) => (O(), M(y(Fl), null, {
      default: A(() => [
        T(y(X), {
          tabindex: l.value || f.value === 0 ? -1 : 0,
          "data-orientation": y(a),
          as: h.as,
          "as-child": h.asChild,
          dir: y(d),
          style: { outline: "none" },
          onMousedown: g[0] || (g[0] = (_) => u.value = !0),
          onMouseup: v,
          onFocus: m,
          onBlur: g[1] || (g[1] = (_) => l.value = !1)
        }, {
          default: A(() => [
            D(h.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
}), Zl = /* @__PURE__ */ q({
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
    const t = e, n = Jl(), r = B(() => t.tabStopId || Cr()), o = B(
      () => n.currentTabStopId.value === r.value
    ), { getItems: s } = Zo(), { primitiveElement: a, currentElement: i } = Or(), d = B(() => {
      var l;
      return (l = i.value) == null ? void 0 : l.getRootNode();
    });
    Ce(() => {
      t.focusable && n.onFocusableItemAdd();
    }), ir(() => {
      t.focusable && n.onFocusableItemRemove();
    });
    function c(l) {
      if (l.key === "Tab" && l.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (l.target !== l.currentTarget)
        return;
      const u = Gl(
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
          f = n.loop.value ? Kl(f, p + 1) : f.slice(p + 1);
        }
        ue(() => Qo(f, !1, d.value));
      }
    }
    return (l, u) => (O(), M(y(ql), null, {
      default: A(() => [
        T(y(X), {
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
          default: A(() => [
            D(l.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), Ql = /* @__PURE__ */ q({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(e) {
    const t = e;
    return te(), (n, r) => (O(), M(y(X), G(t, {
      onMousedown: r[0] || (r[0] = (o) => {
        !o.defaultPrevented && o.detail > 1 && o.preventDefault();
      })
    }), {
      default: A(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Nt = 100, [eu, tu] = he("ProgressRoot"), Rr = (e) => typeof e == "number";
function nu(e, t) {
  return br(e) || Rr(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Nt} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function ru(e) {
  return Rr(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Nt}\`.`
  ), Nt);
}
const ou = /* @__PURE__ */ q({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: Nt },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * Nt)}%` },
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
        const d = nu(i, n.max);
        d !== i && (await ue(), o.value = d);
      },
      { immediate: !0 }
    ), J(
      () => n.max,
      (i) => {
        const d = ru(n.max);
        d !== i && (s.value = d);
      },
      { immediate: !0 }
    );
    const a = B(() => br(o.value) ? "indeterminate" : o.value === s.value ? "complete" : "loading");
    return tu({
      modelValue: o,
      max: s,
      progressState: a
    }), (i, d) => (O(), M(y(X), {
      "as-child": i.asChild,
      as: i.as,
      "aria-valuemax": y(s),
      "aria-valuemin": 0,
      "aria-valuenow": Rr(y(o)) ? y(o) : void 0,
      "aria-valuetext": i.getValueLabel(y(o), y(s)),
      "aria-label": i.getValueLabel(y(o), y(s)),
      role: "progressbar",
      "data-state": a.value,
      "data-value": y(o) ?? void 0,
      "data-max": y(s)
    }, {
      default: A(() => [
        D(i.$slots, "default", { modelValue: y(o) })
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), su = /* @__PURE__ */ q({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = eu();
    return te(), (r, o) => {
      var s;
      return O(), M(y(X), G(t, {
        "data-state": y(n).progressState.value,
        "data-value": ((s = y(n).modelValue) == null ? void 0 : s.value) ?? void 0,
        "data-max": y(n).max.value
      }), {
        default: A(() => [
          D(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), [au, iu] = he("RadioGroupRoot"), lu = /* @__PURE__ */ q({
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
    }), { disabled: a, loop: i, orientation: d, name: c, required: l, dir: u } = _e(n), f = Sr(u);
    return iu({
      modelValue: s,
      changeModelValue: (p) => {
        s.value = p;
      },
      disabled: a,
      loop: i,
      orientation: d,
      name: c == null ? void 0 : c.value,
      required: l
    }), (p, m) => (O(), M(y(Yl), {
      "as-child": "",
      orientation: y(d),
      dir: y(f),
      loop: y(i)
    }, {
      default: A(() => [
        T(y(X), {
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
          default: A(() => [
            D(p.$slots, "default", { modelValue: y(s) })
          ]),
          _: 3
        }, 8, ["data-disabled", "as-child", "as", "required", "aria-orientation", "aria-required", "dir", "name"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
}), uu = ["value", "checked", "name", "disabled", "required"], cu = /* @__PURE__ */ q({
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
    }), { value: o } = _e(n), { forwardRef: s, currentElement: a } = te(), i = Er(a), d = B(() => {
      var l;
      return n.id && a.value ? ((l = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : l.innerText) ?? n.value : void 0;
    });
    function c(l) {
      r.value = !0, i.value && l.stopPropagation();
    }
    return (l, u) => (O(), M(y(X), G(l.$attrs, {
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
      onClick: xe(c, ["stop"])
    }), {
      default: A(() => [
        D(l.$slots, "default", { checked: y(r) }),
        y(i) ? (O(), z("input", {
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
        }, null, 8, uu)) : ie("", !0)
      ]),
      _: 3
    }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]));
  }
}), [du, fu] = he("RadioGroupItem"), pu = /* @__PURE__ */ q({
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
    const t = e, { forwardRef: n, currentElement: r } = te(), o = au(), s = B(() => o.disabled.value || t.disabled), a = B(() => o.required.value || t.required), i = B(() => {
      var u;
      return ((u = o.modelValue) == null ? void 0 : u.value) === t.value;
    });
    fu({ disabled: s, checked: i });
    const d = P(!1), c = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    Qt("keydown", (u) => {
      c.includes(u.key) && (d.value = !0);
    }), Qt("keyup", () => {
      d.value = !1;
    });
    function l() {
      setTimeout(() => {
        var u;
        d.value && ((u = r.value) == null || u.click());
      }, 0);
    }
    return (u, f) => (O(), M(y(Zl), {
      checked: i.value,
      disabled: s.value,
      "as-child": "",
      focusable: !s.value,
      active: i.value
    }, {
      default: A(() => [
        T(cu, G({ ...u.$attrs, ...t }, {
          ref: y(n),
          checked: i.value,
          required: a.value,
          disabled: s.value,
          "onUpdate:checked": f[0] || (f[0] = (p) => y(o).changeModelValue(u.value)),
          onKeydown: f[1] || (f[1] = Eo(xe(() => {
          }, ["prevent"]), ["enter"])),
          onFocus: l
        }), {
          default: A(() => [
            D(u.$slots, "default")
          ]),
          _: 3
        }, 16, ["checked", "required", "disabled"])
      ]),
      _: 3
    }, 8, ["checked", "disabled", "focusable", "active"]));
  }
}), mu = /* @__PURE__ */ q({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const { forwardRef: t } = te(), n = du();
    return (r, o) => (O(), M(y(Ko), {
      present: r.forceMount || y(n).checked.value
    }, {
      default: A(() => [
        T(y(X), G({
          ref: y(t),
          "data-state": y(n).checked.value ? "checked" : "unchecked",
          "data-disabled": y(n).disabled.value ? "" : void 0,
          "as-child": r.asChild,
          as: r.as
        }, r.$attrs), {
          default: A(() => [
            D(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), hu = ["default-value"], yu = /* @__PURE__ */ q({
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
    const t = e, { value: n } = _e(t), r = P();
    return (o, s) => (O(), M(y(Il), { "as-child": "" }, {
      default: A(() => [
        Co(V("select", G({
          ref_key: "selectElement",
          ref: r
        }, t, {
          "onUpdate:modelValue": s[0] || (s[0] = (a) => et(n) ? n.value = a : null),
          "default-value": y(n)
        }), [
          D(o.$slots, "default")
        ], 16, hu), [
          [Ks, y(n)]
        ])
      ]),
      _: 3
    }));
  }
}), vu = {
  key: 0,
  value: ""
}, [gt, es] = he("SelectRoot"), [gu, bu] = he("SelectRoot"), wu = /* @__PURE__ */ q({
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
    }), a = P(), i = P(), d = P({
      x: 0,
      y: 0
    }), c = P(!1), { required: l, disabled: u, dir: f } = _e(n), p = Sr(f);
    es({
      triggerElement: a,
      onTriggerChange: (g) => {
        a.value = g;
      },
      valueElement: i,
      onValueElementChange: (g) => {
        i.value = g;
      },
      valueElementHasChildren: c,
      onValueElementHasChildrenChange: (g) => {
        c.value = g;
      },
      contentId: "",
      modelValue: o,
      onValueChange: (g) => {
        o.value = g;
      },
      open: s,
      required: l,
      onOpenChange: (g) => {
        s.value = g;
      },
      dir: p,
      triggerPointerDownPosRef: d,
      disabled: u
    });
    const m = Er(a), v = P(/* @__PURE__ */ new Set()), h = B(() => Array.from(v.value).map((g) => {
      var _;
      return (_ = g.props) == null ? void 0 : _.value;
    }).join(";"));
    return bu({
      onNativeOptionAdd: (g) => {
        v.value.add(g);
      },
      onNativeOptionRemove: (g) => {
        v.value.delete(g);
      }
    }), (g, _) => (O(), M(y(Rl), null, {
      default: A(() => [
        D(g.$slots, "default", {
          modelValue: y(o),
          open: y(s)
        }),
        y(m) ? (O(), M(yu, G({ key: h.value }, g.$attrs, {
          "aria-hidden": "true",
          tabindex: "-1",
          required: y(l),
          name: g.name,
          autocomplete: g.autocomplete,
          disabled: y(u),
          value: y(o),
          onChange: _[0] || (_[0] = (b) => o.value = b.target.value)
        }), {
          default: A(() => [
            y(o) === void 0 ? (O(), z("option", vu)) : ie("", !0),
            (O(!0), z(Te, null, Rt(Array.from(v.value), (b) => (O(), M(ht(b), G({ ref_for: !0 }, b.props, {
              key: b.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : ie("", !0)
      ]),
      _: 3
    }));
  }
}), xu = [" ", "Enter", "ArrowUp", "ArrowDown"], _u = [" ", "Enter"], we = 10;
function Su(e) {
  return e === "" || br(e);
}
const Eu = /* @__PURE__ */ q({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, n = gt(), r = B(() => {
      var p;
      return ((p = n.disabled) == null ? void 0 : p.value) || t.disabled;
    }), { forwardRef: o, currentElement: s } = te();
    n.contentId || (n.contentId = Cr(void 0, "radix-vue-select-content")), Ce(() => {
      n.triggerElement = s;
    });
    const { injectCollection: a } = dn(), i = a(), { search: d, handleTypeaheadSearch: c, resetTypeahead: l } = Go(i);
    function u() {
      r.value || (n.onOpenChange(!0), l());
    }
    function f(p) {
      u(), n.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, m) => (O(), M(y(Tl), { "as-child": "" }, {
      default: A(() => {
        var v, h, g, _;
        return [
          T(y(X), {
            ref: y(o),
            role: "combobox",
            type: p.as === "button" ? "button" : void 0,
            "aria-controls": y(n).contentId,
            "aria-expanded": y(n).open.value || !1,
            "aria-required": (v = y(n).required) == null ? void 0 : v.value,
            "aria-autocomplete": "none",
            disabled: r.value,
            dir: (h = y(n)) == null ? void 0 : h.dir.value,
            "data-state": (g = y(n)) != null && g.open.value ? "open" : "closed",
            "data-disabled": r.value ? "" : void 0,
            "data-placeholder": y(Su)((_ = y(n).modelValue) == null ? void 0 : _.value) ? "" : void 0,
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
            onPointerup: m[2] || (m[2] = xe(
              (b) => {
                b.pointerType === "touch" && f(b);
              },
              ["prevent"]
            )),
            onKeydown: m[3] || (m[3] = (b) => {
              const C = y(d) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && C && b.key === " " || (y(c)(b.key), y(xu).includes(b.key) && (u(), b.preventDefault()));
            })
          }, {
            default: A(() => [
              D(p.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), Cu = /* @__PURE__ */ q({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), M(y(ml), nr(rr(t)), {
      default: A(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [Tr, Au] = he("SelectItemAlignedPosition"), Ou = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, { injectCollection: o } = dn(), s = gt(), a = st(), i = o(), d = P(!1), c = P(!0), l = P(), { forwardRef: u, currentElement: f } = te(), { viewport: p, selectedItem: m, selectedItemText: v, focusSelectedItem: h } = a;
    function g() {
      if (s.triggerElement.value && s.valueElement.value && l.value && f.value && p != null && p.value && m != null && m.value && v != null && v.value) {
        const C = s.triggerElement.value.getBoundingClientRect(), S = f.value.getBoundingClientRect(), R = s.valueElement.value.getBoundingClientRect(), x = v.value.getBoundingClientRect();
        if (s.dir.value !== "rtl") {
          const Je = x.left - S.left, De = R.left - Je, _t = C.left - De, Xe = C.width + _t, xn = Math.max(Xe, S.width), _n = window.innerWidth - we, Sn = Gr(De, we, Math.max(we, _n - xn));
          l.value.style.minWidth = `${Xe}px`, l.value.style.left = `${Sn}px`;
        } else {
          const Je = S.right - x.right, De = window.innerWidth - R.right - Je, _t = window.innerWidth - C.right - De, Xe = C.width + _t, xn = Math.max(Xe, S.width), _n = window.innerWidth - we, Sn = Gr(
            De,
            we,
            Math.max(we, _n - xn)
          );
          l.value.style.minWidth = `${Xe}px`, l.value.style.right = `${Sn}px`;
        }
        const I = i.value, L = window.innerHeight - we * 2, E = p.value.scrollHeight, k = window.getComputedStyle(f.value), N = Number.parseInt(
          k.borderTopWidth,
          10
        ), U = Number.parseInt(k.paddingTop, 10), j = Number.parseInt(
          k.borderBottomWidth,
          10
        ), oe = Number.parseInt(
          k.paddingBottom,
          10
        ), Y = N + U + E + oe + j, se = Math.min(
          m.value.offsetHeight * 5,
          Y
        ), Q = window.getComputedStyle(p.value), H = Number.parseInt(Q.paddingTop, 10), at = Number.parseInt(
          Q.paddingBottom,
          10
        ), fe = C.top + C.height / 2 - we, js = L - fe, wn = m.value.offsetHeight / 2, zs = m.value.offsetTop + wn, $t = N + U + zs, Us = Y - $t;
        if ($t <= fe) {
          const Je = m.value === I[I.length - 1];
          l.value.style.bottom = "0px";
          const De = f.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, _t = Math.max(
            js,
            wn + (Je ? at : 0) + De + j
          ), Xe = $t + _t;
          l.value.style.height = `${Xe}px`;
        } else {
          const Je = m.value === I[0];
          l.value.style.top = "0px";
          const De = Math.max(
            fe,
            N + p.value.offsetTop + (Je ? H : 0) + wn
          ) + Us;
          l.value.style.height = `${De}px`, p.value.scrollTop = $t - fe + p.value.offsetTop;
        }
        l.value.style.margin = `${we}px 0`, l.value.style.minHeight = `${se}px`, l.value.style.maxHeight = `${L}px`, r("placed"), requestAnimationFrame(() => d.value = !0);
      }
    }
    const _ = P("");
    Ce(async () => {
      await ue(), g(), f.value && (_.value = window.getComputedStyle(f.value).zIndex);
    });
    function b(C) {
      C && c.value === !0 && (g(), h == null || h(), c.value = !1);
    }
    return Au({
      contentWrapper: l,
      shouldExpandOnScrollRef: d,
      onScrollButtonChange: b
    }), (C, S) => (O(), z("div", {
      ref_key: "contentWrapperElement",
      ref: l,
      style: sn({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: _.value
      })
    }, [
      T(y(X), G({
        ref: y(u),
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...C.$attrs, ...n }), {
        default: A(() => [
          D(C.$slots, "default")
        ]),
        _: 3
      }, 16)
    ], 4));
  }
}), ku = /* @__PURE__ */ q({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: we },
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
    return (n, r) => (O(), M(y(Ml), G(y(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: A(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), bt = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [st, Ru] = he("SelectContent"), Tu = /* @__PURE__ */ q({
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
    const n = e, r = t, o = gt();
    tl(), Yi(n.bodyLock);
    const { createCollection: s } = dn(), a = P();
    al(a);
    const i = s(a), { search: d, handleTypeaheadSearch: c } = Go(i), l = P(), u = P(), f = P(), p = P(!1), m = P(!1);
    function v() {
      u.value && a.value && Qr([u.value, a.value]);
    }
    J(p, () => {
      v();
    });
    const { onOpenChange: h, triggerPointerDownPosRef: g } = o;
    de((S) => {
      if (!a.value)
        return;
      let R = { x: 0, y: 0 };
      const x = (L) => {
        var E, k;
        R = {
          x: Math.abs(
            Math.round(L.pageX) - (((E = g.value) == null ? void 0 : E.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(L.pageY) - (((k = g.value) == null ? void 0 : k.y) ?? 0)
          )
        };
      }, I = (L) => {
        var E;
        L.pointerType !== "touch" && (R.x <= 10 && R.y <= 10 ? L.preventDefault() : (E = a.value) != null && E.contains(L.target) || h(!1), document.removeEventListener("pointermove", x), g.value = null);
      };
      g.value !== null && (document.addEventListener("pointermove", x), document.addEventListener("pointerup", I, {
        capture: !0,
        once: !0
      })), S(() => {
        document.removeEventListener("pointermove", x), document.removeEventListener("pointerup", I, {
          capture: !0
        });
      });
    });
    function _(S) {
      const R = S.ctrlKey || S.altKey || S.metaKey;
      if (S.key === "Tab" && S.preventDefault(), !R && S.key.length === 1 && c(S.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(S.key)) {
        let x = i.value;
        if (["ArrowUp", "End"].includes(S.key) && (x = x.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(S.key)) {
          const I = S.target, L = x.indexOf(I);
          x = x.slice(L + 1);
        }
        setTimeout(() => Qr(x)), S.preventDefault();
      }
    }
    const b = B(() => n.position === "popper" ? n : {}), C = Ke(b.value);
    return Ru({
      content: a,
      viewport: l,
      onViewportChange: (S) => {
        l.value = S;
      },
      itemRefCallback: (S, R, x) => {
        var I, L;
        const E = !m.value && !x;
        (((I = o.modelValue) == null ? void 0 : I.value) !== void 0 && ((L = o.modelValue) == null ? void 0 : L.value) === R || E) && (u.value = S, E && (m.value = !0));
      },
      selectedItem: u,
      selectedItemText: f,
      onItemLeave: () => {
        var S;
        (S = a.value) == null || S.focus();
      },
      itemTextRefCallback: (S, R, x) => {
        var I, L;
        const E = !m.value && !x;
        (((I = o.modelValue) == null ? void 0 : I.value) !== void 0 && ((L = o.modelValue) == null ? void 0 : L.value) === R || E) && (f.value = S);
      },
      focusSelectedItem: v,
      position: n.position,
      isPositioned: p,
      searchRef: d
    }), (S, R) => (O(), M(y(Ol), {
      "as-child": "",
      onMountAutoFocus: R[6] || (R[6] = xe(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: R[7] || (R[7] = (x) => {
        var I;
        r("closeAutoFocus", x), !x.defaultPrevented && ((I = y(o).triggerElement.value) == null || I.focus({ preventScroll: !0 }), x.preventDefault());
      })
    }, {
      default: A(() => [
        T(y(bl), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: R[2] || (R[2] = xe(() => {
          }, ["prevent"])),
          onDismiss: R[3] || (R[3] = (x) => y(o).onOpenChange(!1)),
          onEscapeKeyDown: R[4] || (R[4] = (x) => r("escapeKeyDown", x)),
          onPointerDownOutside: R[5] || (R[5] = (x) => r("pointerDownOutside", x))
        }, {
          default: A(() => [
            (O(), M(ht(
              S.position === "popper" ? ku : Ou
            ), G({ ...S.$attrs, ...y(C) }, {
              id: y(o).contentId,
              ref: (x) => {
                a.value = y($e)(x);
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
              onContextmenu: R[0] || (R[0] = xe(() => {
              }, ["prevent"])),
              onPlaced: R[1] || (R[1] = (x) => p.value = !0),
              onKeydown: _
            }), {
              default: A(() => [
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
}), Pu = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return es(e.context), (t, n) => D(t.$slots, "default");
  }
}), Nu = { key: 1 }, Bu = /* @__PURE__ */ q({
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
    const n = e, r = Mt(n, t), o = gt(), s = P();
    Ce(() => {
      s.value = new DocumentFragment();
    });
    const a = P(), i = B(() => n.forceMount || o.open.value);
    return (d, c) => {
      var l;
      return i.value ? (O(), M(y(Ko), {
        key: 0,
        ref_key: "presenceRef",
        ref: a,
        present: !0
      }, {
        default: A(() => [
          T(Tu, nr(rr({ ...y(r), ...d.$attrs })), {
            default: A(() => [
              D(d.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !((l = a.value) != null && l.present) && s.value ? (O(), z("div", Nu, [
        (O(), M(or, { to: s.value }, [
          T(Pu, { context: y(o) }, {
            default: A(() => [
              D(d.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : ie("", !0);
    };
  }
}), [ts, Du] = he("SelectItem"), Mu = /* @__PURE__ */ q({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { disabled: n } = _e(t), r = gt(), o = st(bt), { forwardRef: s, currentElement: a } = te(), i = B(() => {
      var v;
      return ((v = r.modelValue) == null ? void 0 : v.value) === t.value;
    }), d = P(!1), c = P(t.textValue ?? ""), l = Cr(void 0, "radix-vue-select-item-text");
    async function u(v) {
      await ue(), !(v != null && v.defaultPrevented) && (n.value || (r.onValueChange(t.value), r.onOpenChange(!1)));
    }
    async function f(v) {
      var h;
      await ue(), !v.defaultPrevented && (n.value ? (h = o.onItemLeave) == null || h.call(o) : v.currentTarget.focus({ preventScroll: !0 }));
    }
    async function p(v) {
      var h;
      await ue(), !v.defaultPrevented && v.currentTarget === document.activeElement && ((h = o.onItemLeave) == null || h.call(o));
    }
    async function m(v) {
      var h;
      await ue(), !(v.defaultPrevented || ((h = o.searchRef) == null ? void 0 : h.value) !== "" && v.key === " ") && (_u.includes(v.key) && u(), v.key === " " && v.preventDefault());
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
    }), Du({
      value: t.value,
      disabled: n,
      textId: l,
      isSelected: i,
      onItemTextChange: (v) => {
        c.value = ((c.value || (v == null ? void 0 : v.textContent)) ?? "").trim();
      }
    }), (v, h) => (O(), M(y(X), {
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
      as: v.as,
      "as-child": v.asChild,
      onFocus: h[0] || (h[0] = (g) => d.value = !0),
      onBlur: h[1] || (h[1] = (g) => d.value = !1),
      onPointerup: u,
      onPointerdown: h[2] || (h[2] = (g) => {
        g.currentTarget.focus({ preventScroll: !0 });
      }),
      onTouchend: h[3] || (h[3] = xe(() => {
      }, ["prevent", "stop"])),
      onPointermove: f,
      onPointerleave: p,
      onKeydown: m
    }, {
      default: A(() => [
        D(v.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), Iu = /* @__PURE__ */ q({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = ts();
    return (r, o) => y(n).isSelected.value ? (O(), M(y(X), G({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: A(() => [
        D(r.$slots, "default")
      ]),
      _: 3
    }, 16)) : ie("", !0);
  }
}), Lu = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = gt(), r = st(bt), o = gu(), s = ts(), { forwardRef: a, currentElement: i } = te(), d = B(() => {
      var c;
      return ke("option", {
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
    }), sr(() => {
      o.onNativeOptionRemove(d.value);
    }), (c, l) => (O(), z(Te, null, [
      T(y(X), G({
        id: y(s).textId,
        ref: y(a)
      }, { ...t, ...c.$attrs }, { "data-item-text": "" }), {
        default: A(() => [
          D(c.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      y(s).isSelected.value && y(n).valueElement.value && !y(n).valueElementHasChildren.value ? (O(), M(or, {
        key: 0,
        to: y(n).valueElement.value
      }, [
        D(c.$slots, "default")
      ], 8, ["to"])) : ie("", !0)
    ], 64));
  }
}), Vu = /* @__PURE__ */ q({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { nonce: n } = _e(t), r = jl(n), o = st(bt), s = o.position === "item-aligned" ? Tr() : void 0, { forwardRef: a, currentElement: i } = te();
    Ce(() => {
      o == null || o.onViewportChange(i.value);
    });
    const d = P(0);
    function c(l) {
      const u = l.currentTarget, { shouldExpandOnScrollRef: f, contentWrapper: p } = s ?? {};
      if (f != null && f.value && p != null && p.value) {
        const m = Math.abs(d.value - u.scrollTop);
        if (m > 0) {
          const v = window.innerHeight - we * 2, h = Number.parseFloat(
            p.value.style.minHeight
          ), g = Number.parseFloat(p.value.style.height), _ = Math.max(h, g);
          if (_ < v) {
            const b = _ + m, C = Math.min(v, b), S = b - C;
            p.value.style.height = `${C}px`, p.value.style.bottom === "0px" && (u.scrollTop = S > 0 ? S : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      d.value = u.scrollTop;
    }
    return (l, u) => (O(), z(Te, null, [
      T(y(X), G({
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
        default: A(() => [
          D(l.$slots, "default")
        ]),
        _: 3
      }, 16),
      T(y(X), {
        as: "style",
        nonce: y(r)
      }, {
        default: A(() => [
          ee(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
}), ns = /* @__PURE__ */ q({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(e, { emit: t }) {
    const n = t, { injectCollection: r } = dn(), o = r(), s = st(bt), a = P(null);
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
    return sr(() => i()), (l, u) => {
      var f;
      return O(), M(y(X), G({
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
        default: A(() => [
          D(l.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
}), $u = /* @__PURE__ */ q({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = st(bt), n = t.position === "item-aligned" ? Tr() : void 0, { forwardRef: r, currentElement: o } = te(), s = P(!1);
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
    }), (a, i) => s.value ? (O(), M(ns, {
      key: 0,
      ref: y(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = y(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop - c.value.offsetHeight);
      })
    }, {
      default: A(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : ie("", !0);
  }
}), Fu = /* @__PURE__ */ q({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = st(bt), n = t.position === "item-aligned" ? Tr() : void 0, { forwardRef: r, currentElement: o } = te(), s = P(!1);
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
    }), (a, i) => s.value ? (O(), M(ns, {
      key: 0,
      ref: y(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: d, selectedItem: c } = y(t);
        d != null && d.value && c != null && c.value && (d.value.scrollTop = d.value.scrollTop + c.value.offsetHeight);
      })
    }, {
      default: A(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 512)) : ie("", !0);
  }
}), qu = /* @__PURE__ */ q({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return (t, n) => (O(), M(y(X), {
      "aria-hidden": "true",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: A(() => [
        D(t.$slots, "default", {}, () => [
          ee("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function ju() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
ju();
const zu = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [Uu, Hu] = he("SwitchRoot"), Wu = /* @__PURE__ */ q({
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
    const n = e, r = t, { disabled: o } = _e(n), s = We(n, "checked", r, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function a() {
      o.value || (s.value = !s.value);
    }
    const { forwardRef: i, currentElement: d } = te(), c = Er(d), l = B(() => {
      var u;
      return n.id && d.value ? (u = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : u.innerText : void 0;
    });
    return Hu({
      checked: s,
      toggleCheck: a,
      disabled: o
    }), (u, f) => (O(), z(Te, null, [
      T(y(X), G(u.$attrs, {
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
        onKeydown: Eo(xe(a, ["prevent"]), ["enter"])
      }), {
        default: A(() => [
          D(u.$slots, "default", { checked: y(s) })
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      y(c) ? (O(), z("input", {
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
      }, null, 8, zu)) : ie("", !0)
    ], 64));
  }
}), Gu = /* @__PURE__ */ q({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = Uu();
    return te(), (n, r) => {
      var o;
      return O(), M(y(X), {
        "data-state": (o = y(t).checked) != null && o.value ? "checked" : "unchecked",
        "data-disabled": y(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: A(() => [
          D(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
}), Ku = {
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
    const o = Mt(e, t);
    return (s, a) => (O(), M(y(wu), nr(rr(y(o))), {
      default: A(() => [
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
const Ju = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ht = {
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
const Xu = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: s, class: a, ...i }, { slots: d }) => ke(
  "svg",
  {
    ...Ht,
    width: e || Ht.width,
    height: e || Ht.height,
    stroke: r || Ht.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${Ju(s ?? "icon")}`],
    ...i
  },
  [...o.map((c) => ke(...c)), ...d.default ? [d.default()] : []]
);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = (e, t) => (n, { slots: r }) => ke(
  Xu,
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
const Yu = ae("ArrowLeftIcon", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zu = ae("ArrowRightIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = ae("BikeIcon", [
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
const os = ae("BusIcon", [
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
const Pr = ae("CarIcon", [
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
const Qu = ae("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ss = ae("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = ae("ChevronUpIcon", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tc = ae("CircleAlertIcon", [
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
const nc = ae("CircleIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rc = ae("DropletIcon", [
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
const oc = ae("FootprintsIcon", [
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
const sc = ae("FuelIcon", [
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
const ac = ae("LeafIcon", [
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
const as = ae("TramFrontIcon", [
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
const ic = ae("TreesIcon", [
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
const lc = ae("ZapIcon", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), uc = {
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
    return (o, s) => (O(), M(y(Eu), G(y(r), {
      class: y(Z)(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start",
        t.class
      )
    }), {
      default: A(() => [
        D(o.$slots, "default"),
        T(y(qu), { "as-child": "" }, {
          default: A(() => [
            T(y(ss), { class: "w-4 h-4 opacity-50 shrink-0" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, cc = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, dc = {
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
    return (o, s) => (O(), M(y(Mu), G(y(r), {
      class: y(Z)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: A(() => [
        V("span", cc, [
          T(y(Iu), null, {
            default: A(() => [
              T(y(Qu), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        T(y(Lu), null, {
          default: A(() => [
            D(o.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, fc = {
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
    return (o, s) => (O(), M(y(Fu), G(y(r), {
      class: y(Z)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: A(() => [
        D(o.$slots, "default", {}, () => [
          T(y(ss), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, pc = {
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
    return (o, s) => (O(), M(y($u), G(y(r), {
      class: y(Z)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: A(() => [
        D(o.$slots, "default", {}, () => [
          T(y(ec), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, mc = /* @__PURE__ */ Object.assign({
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
    }), s = Mt(o, r);
    return (a, i) => (O(), M(y(Cu), null, {
      default: A(() => [
        T(y(Bu), G({ ...y(s), ...a.$attrs }, {
          class: y(Z)(
            "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: A(() => [
            T(y(pc)),
            T(y(Vu), {
              class: ne(
                y(Z)(
                  "p-1",
                  e.position === "popper" && "h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"
                )
              )
            }, {
              default: A(() => [
                D(a.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"]),
            T(y(fc))
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), hc = {
  __name: "CardFooter",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(y(Z)("flex items-center p-6 pt-0", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, eo = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, to = ko, is = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return to(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((c) => {
    const l = n == null ? void 0 : n[c], u = s == null ? void 0 : s[c];
    if (l === null) return null;
    const f = eo(l) || eo(u);
    return o[c][f];
  }), i = n && Object.entries(n).reduce((c, l) => {
    let [u, f] = l;
    return f === void 0 || (c[u] = f), c;
  }, {}), d = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((c, l) => {
    let { class: u, className: f, ...p } = l;
    return Object.entries(p).every((m) => {
      let [v, h] = m;
      return Array.isArray(h) ? h.includes({
        ...s,
        ...i
      }[v]) : {
        ...s,
        ...i
      }[v] === h;
    }) ? [
      ...c,
      u,
      f
    ] : c;
  }, []);
  return to(e, a, d, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, yc = is(
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
), fn = {
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
    return (n, r) => (O(), M(y(X), {
      as: e.as,
      "as-child": e.asChild,
      class: ne(y(Z)(y(yc)({ variant: e.variant, size: e.size }), t.class))
    }, {
      default: A(() => [
        D(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}, pn = {
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
    return (r, o) => (O(), M(y(Ql), G(n.value, {
      class: y(Z)(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t.class
      )
    }), {
      default: A(() => [
        D(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
};
function ls(e) {
  return rn() ? (on(e), !0) : !1;
}
const vc = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const gc = (e) => typeof e < "u", bc = (e) => e != null, Nn = () => {
};
function wc(e, t = !1, n = "Timeout") {
  return new Promise((r, o) => {
    setTimeout(t ? () => o(n) : r, e);
  });
}
function us(e) {
  return e;
}
function xc(e) {
  return Array.isArray(e) ? e : [e];
}
const cs = vc ? window : void 0;
function Bn(e) {
  var t;
  const n = ce(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function _c() {
  const e = P(!1), t = Ne();
  return t && Ce(() => {
    e.value = !0;
  }, t), e;
}
function Sc(e) {
  const t = _c();
  return B(() => (t.value, !!e()));
}
function Ec(e) {
  return JSON.parse(JSON.stringify(e));
}
function Cc(e, t, n = {}) {
  const {
    root: r,
    rootMargin: o = "0px",
    threshold: s = 0,
    window: a = cs,
    immediate: i = !0
  } = n, d = Sc(() => a && "IntersectionObserver" in a), c = B(() => {
    const m = ce(e);
    return xc(m).map(Bn).filter(bc);
  });
  let l = Nn;
  const u = P(i), f = d.value ? J(
    () => [c.value, Bn(r), u.value],
    ([m, v]) => {
      if (l(), !u.value || !m.length)
        return;
      const h = new IntersectionObserver(
        t,
        {
          root: Bn(v),
          rootMargin: o,
          threshold: s
        }
      );
      m.forEach((g) => g && h.observe(g)), l = () => {
        h.disconnect(), l = Nn;
      };
    },
    { immediate: i, flush: "post" }
  ) : Nn, p = () => {
    l(), f(), u.value = !1;
  };
  return ls(p), {
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
function Ac(e, t = {}) {
  const {
    window: n = cs,
    scrollTarget: r,
    threshold: o = 0,
    rootMargin: s
  } = t, a = P(!1);
  return Cc(
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
      rootMargin: ce(s)
    }
  ), a;
}
const Oc = {
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
}, kc = /* @__PURE__ */ Object.assign({}, { linear: us }, Oc);
function Rc([e, t, n, r]) {
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
function no(e, t, n) {
  return e + n * (t - e);
}
function Dn(e) {
  return (typeof e == "number" ? [e] : e) || [];
}
function Tc(e, t, n, r = {}) {
  var o, s;
  const a = ce(t), i = ce(n), d = Dn(a), c = Dn(i), l = (o = ce(r.duration)) != null ? o : 1e3, u = Date.now(), f = Date.now() + l, p = typeof r.transition == "function" ? r.transition : (s = ce(r.transition)) != null ? s : us, m = typeof p == "function" ? p : Rc(p);
  return new Promise((v) => {
    e.value = a;
    const h = () => {
      var g;
      if ((g = r.abort) != null && g.call(r)) {
        v();
        return;
      }
      const _ = Date.now(), b = m((_ - u) / l), C = Dn(e.value).map((S, R) => no(d[R], c[R], b));
      Array.isArray(e.value) ? e.value = C.map((S, R) => {
        var x, I;
        return no((x = d[R]) != null ? x : 0, (I = c[R]) != null ? I : 0, b);
      }) : typeof e.value == "number" && (e.value = C[0]), _ < f ? requestAnimationFrame(h) : (e.value = i, v());
    };
    h();
  });
}
function Pc(e, t = {}) {
  let n = 0;
  const r = () => {
    const s = ce(e);
    return typeof s == "number" ? s : s.map(ce);
  }, o = P(r());
  return J(r, async (s) => {
    var a, i;
    if (ce(t.disabled))
      return;
    const d = ++n;
    if (t.delay && await wc(ce(t.delay)), d !== n)
      return;
    const c = Array.isArray(s) ? s.map(ce) : ce(s);
    (a = t.onStarted) == null || a.call(t), await Tc(o, o.value, c, {
      ...t,
      abort: () => {
        var l;
        return d !== n || ((l = t.abort) == null ? void 0 : l.call(t));
      }
    }), (i = t.onFinished) == null || i.call(t);
  }, { deep: !0 }), J(() => ce(t.disabled), (s) => {
    s && (n++, o.value = r());
  }), ls(() => {
    n++;
  }), B(() => ce(t.disabled) ? r() : o.value);
}
function Nc(e, t, n, r = {}) {
  var o, s, a;
  const {
    clone: i = !1,
    passive: d = !1,
    eventName: c,
    deep: l = !1,
    defaultValue: u,
    shouldEmit: f
  } = r, p = Ne(), m = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((a = (s = p == null ? void 0 : p.proxy) == null ? void 0 : s.$emit) == null ? void 0 : a.bind(p == null ? void 0 : p.proxy));
  let v = c;
  v = v || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : Ec(b) : b, g = () => gc(e[t]) ? h(e[t]) : u, _ = (b) => {
    f ? f(b) && m(v, b) : m(v, b);
  };
  if (d) {
    const b = g(), C = P(b);
    let S = !1;
    return J(
      () => e[t],
      (R) => {
        S || (S = !0, C.value = h(R), ue(() => S = !1));
      }
    ), J(
      C,
      (R) => {
        !S && (R !== e[t] || l) && _(R);
      },
      { deep: l }
    ), C;
  } else
    return B({
      get() {
        return g();
      },
      set(b) {
        _(b);
      }
    });
}
const ds = {
  __name: "Input",
  props: {
    defaultValue: { type: [String, Number], required: !1 },
    modelValue: { type: [String, Number], required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = Nc(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (s, a) => Co((O(), z("input", {
      "onUpdate:modelValue": a[0] || (a[0] = (i) => et(o) ? o.value = i : null),
      class: ne(
        y(Z)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          n.class
        )
      )
    }, null, 2)), [
      [ta, y(o)]
    ]);
  }
}, Bc = {
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
    return (r, o) => (O(), M(y(ou), G(n.value, {
      class: y(Z)(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        t.class
      )
    }), {
      default: A(() => [
        T(y(su), {
          class: "h-full w-full flex-1 bg-primary transition-all",
          style: sn(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, fs = {
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
    }), s = Mt(o, r);
    return (a, i) => (O(), M(y(Wu), G(y(s), {
      class: y(Z)(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: A(() => [
        T(y(Gu), {
          class: ne(
            y(Z)(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5"
            )
          )
        }, {
          default: A(() => [
            D(a.$slots, "thumb")
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, It = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Dc = {
  name: "CalculationRoute",
  components: { Switch: fs, Input: ds, Label: pn },
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
}, Mc = { class: "flex justify-between" }, Ic = { className: "flex items-center space-x-2" }, Lc = { class: "grid items-center w-full gap-8" }, Vc = { class: "flex flex-col space-y-1.5" }, $c = { class: "flex flex-col space-y-1.5" };
function Fc(e, t, n, r, o, s) {
  const a = W("Label"), i = W("Switch"), d = W("Input");
  return O(), z("div", null, [
    V("form", {
      ref: "form",
      onSubmit: t[3] || (t[3] = xe((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-6"
    }, [
      V("div", Mc, [
        T(a, {
          for: "calculation-type",
          class: "text-base font-medium"
        }, {
          default: A(() => t[4] || (t[4] = [
            ee("Berechnungsmodus")
          ])),
          _: 1
        }),
        V("div", Ic, [
          T(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: A(() => t[5] || (t[5] = [
              ee("Einfach")
            ])),
            _: 1
          }),
          T(i, {
            id: "calculation-type",
            checked: o.localAdvancedCalculation,
            "onUpdate:checked": t[0] || (t[0] = (c) => o.localAdvancedCalculation = c)
          }, null, 8, ["checked"]),
          T(a, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: A(() => t[6] || (t[6] = [
              ee("Detailliert")
            ])),
            _: 1
          })
        ])
      ]),
      V("div", Lc, [
        V("div", Vc, [
          T(a, { for: "startLocation" }, {
            default: A(() => t[7] || (t[7] = [
              ee("Startort")
            ])),
            _: 1
          }),
          T(d, {
            id: "startLocation",
            placeholder: "Startort",
            modelValue: o.data.startLocation,
            "onUpdate:modelValue": t[1] || (t[1] = (c) => o.data.startLocation = c),
            required: ""
          }, null, 8, ["modelValue"])
        ]),
        V("div", $c, [
          T(a, { for: "endLocation" }, {
            default: A(() => t[8] || (t[8] = [
              ee("Zielort")
            ])),
            _: 1
          }),
          T(d, {
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
const qc = /* @__PURE__ */ It(Dc, [["render", Fc]]), ps = {
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
    }), s = Mt(o, r);
    return (a, i) => (O(), M(y(lu), G({
      class: y(Z)("grid gap-2", n.class)
    }, y(s)), {
      default: A(() => [
        D(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, ms = {
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
    return (o, s) => (O(), M(y(pu), G(y(r), {
      class: y(Z)(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      )
    }), {
      default: A(() => [
        T(y(mu), { class: "flex items-center justify-center" }, {
          default: A(() => [
            T(y(nc), { class: "h-2.5 w-2.5 fill-current text-current" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, jc = {
  name: "CalculationTransportMedium",
  components: { RadioGroupItem: ms, RadioGroup: ps, Button: fn, Label: pn, Car: Pr, Bus: os, Bike: rs, Train: as, Footprints: oc },
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
}, zc = ["for"], Uc = { class: "text-sm font-medium" };
function Hc(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup");
  return O(), z("div", null, [
    V("form", {
      ref: "form",
      onSubmit: t[1] || (t[1] = xe((...c) => s.validateInput && s.validateInput(...c), ["prevent"])),
      class: "space-y-4"
    }, [
      T(a, null, {
        default: A(() => t[2] || (t[2] = [
          ee("Transportmittel")
        ])),
        _: 1
      }),
      T(d, {
        modelValue: o.data.transportMode,
        "onUpdate:modelValue": t[0] || (t[0] = (c) => o.data.transportMode = c),
        class: "grid grid-cols-2 gap-4 sm:grid-cols-4"
      }, {
        default: A(() => [
          (O(!0), z(Te, null, Rt(o.transportModes, (c) => (O(), z("label", {
            key: c,
            for: `radio-${c}`,
            class: ne(["flex flex-col items-center justify-center h-24 p-4 border rounded-lg cursor-pointer transition-all", {
              "bg-primary text-white": o.data.transportMode === c
            }])
          }, [
            T(i, {
              id: `radio-${c}`,
              value: c,
              class: "hidden",
              required: ""
            }, null, 8, ["id", "value"]),
            (O(), M(ht(o.icons[c]), { class: "h-8 w-8 mb-2" })),
            V("span", Uc, pe(s.capitalize(c)), 1)
          ], 10, zc))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 544)
  ]);
}
const Wc = /* @__PURE__ */ It(jc, [["render", Hc]]), Gc = {
  name: "CalculationFuel",
  components: { RadioGroupItem: ms, RadioGroup: ps, Button: fn, Label: pn, Fuel: sc, Droplet: rc, Zap: lc, Car: Pr },
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
}, Kc = ["for"], Jc = { class: "text-sm font-medium" }, Xc = { key: 0 }, Yc = ["for"], Zc = { class: "text-sm font-medium" };
function Qc(e, t, n, r, o, s) {
  const a = W("Label"), i = W("RadioGroupItem"), d = W("RadioGroup"), c = W("Car");
  return O(), z("div", null, [
    V("form", {
      ref: "form",
      onSubmit: t[2] || (t[2] = xe((...l) => s.validateInput && s.validateInput(...l), ["prevent"])),
      class: "space-y-6"
    }, [
      V("div", null, [
        T(a, { class: "mb-2 block" }, {
          default: A(() => t[3] || (t[3] = [
            ee("Kraftstoff")
          ])),
          _: 1
        }),
        T(d, {
          modelValue: o.data.fuelType,
          "onUpdate:modelValue": t[0] || (t[0] = (l) => o.data.fuelType = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: A(() => [
            (O(!0), z(Te, null, Rt(s.availableFuels, (l) => (O(), z("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.fuelType === l,
                "border-gray-300": o.data.fuelType !== l
              }])
            }, [
              T(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              (O(), M(ht(s.icons[l]), { class: "h-6 w-6 mb-2" })),
              V("span", Jc, pe(s.capitalize(l)), 1)
            ], 10, Kc))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      o.data.transportMode === "car" ? (O(), z("div", Xc, [
        T(a, { class: "mb-2 block" }, {
          default: A(() => t[4] || (t[4] = [
            ee("Fahrzeuggröße")
          ])),
          _: 1
        }),
        T(d, {
          modelValue: o.data.vehicleSize,
          "onUpdate:modelValue": t[1] || (t[1] = (l) => o.data.vehicleSize = l),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: A(() => [
            (O(!0), z(Te, null, Rt(s.vehicleSizes, (l) => (O(), z("label", {
              key: l,
              for: `radio-${l}`,
              class: ne(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.vehicleSize === l,
                "border-gray-300": o.data.vehicleSize !== l
              }])
            }, [
              T(i, {
                id: `radio-${l}`,
                value: l,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              T(c, {
                class: ne(s.sizeIconClass(l))
              }, null, 8, ["class"]),
              V("span", Zc, pe(s.sizeTranslations[l]), 1)
            ], 10, Yc))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])) : ie("", !0)
    ], 544)
  ]);
}
const ed = /* @__PURE__ */ It(Gc, [["render", Qc]]), td = {
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
    const t = P(null), n = e, r = P(n.direction === "down" ? n.value : 0), o = Pc(r, {
      delay: n.delay,
      duration: n.duration,
      transition: kc[n.transition]
    }), s = B(() => new Intl.NumberFormat("en-US", {
      minimumFractionDigits: n.decimalPlaces,
      maximumFractionDigits: n.decimalPlaces
    }).format(Number(o.value.toFixed(n.decimalPlaces)))), a = Ac(t, {
      threshold: 0
    });
    return J(
      a,
      (i) => {
        i && (r.value = n.direction === "down" ? 0 : n.value);
      },
      { immediate: !0 }
    ), (i, d) => (O(), z("span", {
      ref_key: "spanRef",
      ref: t,
      class: ne(y(Z)("inline-block tabular-nums text-black dark:text-white tracking-wider", n.class))
    }, pe(s.value), 3));
  }
}, nd = {
  name: "CalculationResult",
  components: { NumberTicker: td, Button: fn, CardContent: Mo, Card: Do, Leaf: ac, Trees: ic, Car: Pr, Train: as, Bus: os, Bike: rs },
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
}, rd = { class: "space-y-6 text-center" }, od = { class: "grid gap-8 md:grid-cols-2" }, sd = { class: "flex items-center justify-center mb-4" }, ad = { class: "text-5xl font-bold text-red-700 mb-4" }, id = { class: "text-lg" }, ld = { class: "flex items-center justify-center mb-4" }, ud = { class: "text-3xl font-bold text-green-700 mb-4" }, cd = { class: "mt-8" }, dd = { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, fd = { class: "flex items-center justify-center mb-2" }, pd = { class: "text-lg font-semibold mb-2" }, md = { class: "text-lg font-bold text-gray-900" }, hd = { class: "text-sm text-gray-700" };
function yd(e, t, n, r, o, s) {
  const a = W("Leaf"), i = W("NumberTicker"), d = W("CardContent"), c = W("Card"), l = W("Trees"), u = W("Button");
  return O(), z("div", rd, [
    t[10] || (t[10] = V("h2", { class: "text-3xl font-bold mb-8" }, "Ihre CO2-Bilanz", -1)),
    V("div", od, [
      T(c, { class: "bg-gradient-to-br from-red-100 to-orange-100 hover:scale-105 duration-300" }, {
        default: A(() => [
          T(d, { class: "p-6" }, {
            default: A(() => [
              V("div", sd, [
                T(a, { class: "h-12 w-12 text-red-600 mr-4" }),
                t[0] || (t[0] = V("h3", { class: "text-2xl font-semibold" }, "CO2-Emission", -1))
              ]),
              V("p", ad, [
                T(i, {
                  class: "text-red-700",
                  "decimal-places": 2,
                  duration: 2e3,
                  value: o.result.emission
                }, null, 8, ["value"]),
                t[1] || (t[1] = V("span", { class: "text-2xl ml-2" }, "kg", -1))
              ]),
              V("p", id, " Ihre Reise von " + pe(o.data.startLocation) + " nach " + pe(o.data.endLocation) + " verursacht diese Menge an CO2-Emissionen. ", 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      T(c, { class: "bg-gradient-to-br from-green-100 to-emerald-100 hover:scale-105 duration-300" }, {
        default: A(() => [
          T(d, { class: "p-6" }, {
            default: A(() => [
              V("div", ld, [
                T(l, { class: "h-12 w-12 text-green-600 mr-4" }),
                t[2] || (t[2] = V("h3", { class: "text-2xl font-semibold" }, "Baum-Äquivalent", -1))
              ]),
              V("p", ud, [
                T(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  value: o.result.yearsToBind.years
                }, null, 8, ["value"]),
                t[3] || (t[3] = V("span", { class: "text-2xl ml-2" }, "Jahr(e), ", -1)),
                T(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 500,
                  value: o.result.yearsToBind.months
                }, null, 8, ["value"]),
                t[4] || (t[4] = V("span", { class: "text-2xl ml-2" }, "Monat(e), ", -1)),
                T(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 1e3,
                  value: o.result.yearsToBind.days
                }, null, 8, ["value"]),
                t[5] || (t[5] = V("span", { class: "text-2xl ml-2" }, "Tag(e)", -1))
              ]),
              t[6] || (t[6] = V("p", { class: "text-lg" }, " So lange braucht eine typische Buche, um diese Menge CO2 zu binden. ", -1))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    V("div", cd, [
      t[7] || (t[7] = V("h3", { class: "text-2xl font-semibold mb-4" }, "Vergleich mit anderen Transportmitteln", -1)),
      V("div", dd, [
        (O(!0), z(Te, null, Rt(o.dummy, (f, p) => (O(), M(c, {
          key: p,
          class: "bg-gray-100 hover:scale-105 duration-300"
        }, {
          default: A(() => [
            T(d, { class: "p-4" }, {
              default: A(() => [
                V("div", fd, [
                  (O(), M(ht(s.icons[f.transportMediumDTO.transportMediumName] || "Leaf"), { class: "h-8 w-8 text-gray-600" }))
                ]),
                V("h4", pd, pe(f.transportMediumDTO.transportMediumName) + " (" + pe(f.transportMediumDTO.transportMediumFuel) + ") ", 1),
                V("p", md, pe(f.emission.toFixed(2)) + " kg CO2 ", 1),
                V("p", hd, " Bindungszeit: " + pe(s.formatYearsToBind(f.yearsToBind)), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ]),
    V("div", null, [
      t[9] || (t[9] = V("div", { className: "mt-8 text-xs text-gray-500 flex items-center justify-center" }, " Entwickelt von Kleemann und Siemens Software GbR ", -1)),
      T(u, {
        onClick: s.resetCalculation,
        class: "mt-4"
      }, {
        default: A(() => t[8] || (t[8] = [
          ee("Neue Berechnung")
        ])),
        _: 1
      }, 8, ["onClick"])
    ])
  ]);
}
const vd = /* @__PURE__ */ It(nd, [["render", yd]]), gd = {
  __name: "AlertDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(y(Z)("text-sm [&_p]:leading-relaxed", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, bd = {
  __name: "AlertTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("h5", {
      class: ne(y(Z)("mb-1 font-medium leading-none tracking-tight", t.class))
    }, [
      D(n.$slots, "default")
    ], 2));
  }
}, wd = is(
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
), xd = {
  __name: "Alert",
  props: {
    class: { type: null, required: !1 },
    variant: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (O(), z("div", {
      class: ne(y(Z)(y(wd)({ variant: e.variant }), t.class)),
      role: "alert"
    }, [
      D(n.$slots, "default")
    ], 2));
  }
};
/*!
 * pinia v2.3.0
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let At;
const en = (e) => At = e, _d = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function nt(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var kt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(kt || (kt = {}));
const Ot = typeof window < "u";
function hs(e, t) {
  for (const n in t) {
    const r = t[n];
    if (!(n in e))
      continue;
    const o = e[n];
    nt(o) && nt(r) && !et(r) && !ur(r) ? e[n] = hs(o, r) : e[n] = r;
  }
  return e;
}
const ys = () => {
};
function ro(e, t, n, r = ys) {
  e.push(t);
  const o = () => {
    const s = e.indexOf(t);
    s > -1 && (e.splice(s, 1), r());
  };
  return !n && rn() && on(o), o;
}
function ut(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Sd = (e) => e(), oo = Symbol(), Mn = Symbol();
function Gn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((n, r) => e.set(r, n)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n))
      continue;
    const r = t[n], o = e[n];
    nt(o) && nt(r) && e.hasOwnProperty(n) && !et(r) && !ur(r) ? e[n] = Gn(o, r) : e[n] = r;
  }
  return e;
}
const Ed = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Cd(e) {
  return !nt(e) || !e.hasOwnProperty(Ed);
}
const { assign: be } = Object;
function so(e) {
  return !!(et(e) && e.effect);
}
function ao(e, t, n, r) {
  const { state: o, actions: s, getters: a } = t, i = n.state.value[e];
  let d;
  function c() {
    !i && (process.env.NODE_ENV === "production" || !r) && (n.state.value[e] = o ? o() : {});
    const l = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      _e(P(o ? o() : {}).value)
    ) : _e(n.state.value[e]);
    return be(l, s, Object.keys(a || {}).reduce((u, f) => (process.env.NODE_ENV !== "production" && f in l && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${f}" in store "${e}".`), u[f] = dt(B(() => {
      en(n);
      const p = n._s.get(e);
      return a[f].call(p, p);
    })), u), {}));
  }
  return d = Kn(e, c, t, n, r, !0), d;
}
function Kn(e, t, n = {}, r, o, s) {
  let a;
  const i = be({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const d = { deep: !0 };
  process.env.NODE_ENV !== "production" && (d.onTrigger = (E) => {
    c ? p = E : c == !1 && !x._hotUpdating && (Array.isArray(p) ? p.push(E) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let c, l, u = [], f = [], p;
  const m = r.state.value[e];
  !s && !m && (process.env.NODE_ENV === "production" || !o) && (r.state.value[e] = {});
  const v = P({});
  let h;
  function g(E) {
    let k;
    c = l = !1, process.env.NODE_ENV !== "production" && (p = []), typeof E == "function" ? (E(r.state.value[e]), k = {
      type: kt.patchFunction,
      storeId: e,
      events: p
    }) : (Gn(r.state.value[e], E), k = {
      type: kt.patchObject,
      payload: E,
      storeId: e,
      events: p
    });
    const N = h = Symbol();
    ue().then(() => {
      h === N && (c = !0);
    }), l = !0, ut(u, k, r.state.value[e]);
  }
  const _ = s ? function() {
    const { state: k } = n, N = k ? k() : {};
    this.$patch((U) => {
      be(U, N);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${e}" is built using the setup syntax and does not implement $reset().`);
    } : ys
  );
  function b() {
    a.stop(), u = [], f = [], r._s.delete(e);
  }
  const C = (E, k = "") => {
    if (oo in E)
      return E[Mn] = k, E;
    const N = function() {
      en(r);
      const U = Array.from(arguments), j = [], oe = [];
      function Y(H) {
        j.push(H);
      }
      function se(H) {
        oe.push(H);
      }
      ut(f, {
        args: U,
        name: N[Mn],
        store: x,
        after: Y,
        onError: se
      });
      let Q;
      try {
        Q = E.apply(this && this.$id === e ? this : x, U);
      } catch (H) {
        throw ut(oe, H), H;
      }
      return Q instanceof Promise ? Q.then((H) => (ut(j, H), H)).catch((H) => (ut(oe, H), Promise.reject(H))) : (ut(j, Q), Q);
    };
    return N[oo] = !0, N[Mn] = k, N;
  }, S = /* @__PURE__ */ dt({
    actions: {},
    getters: {},
    state: [],
    hotState: v
  }), R = {
    _p: r,
    // _s: scope,
    $id: e,
    $onAction: ro.bind(null, f),
    $patch: g,
    $reset: _,
    $subscribe(E, k = {}) {
      const N = ro(u, E, k.detached, () => U()), U = a.run(() => J(() => r.state.value[e], (j) => {
        (k.flush === "sync" ? l : c) && E({
          storeId: e,
          type: kt.direct,
          events: p
        }, j);
      }, be({}, d, k)));
      return N;
    },
    $dispose: b
  }, x = tr(process.env.NODE_ENV !== "production" || process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ot ? be(
    {
      _hmrPayload: S,
      _customProperties: dt(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    R
    // must be added later
    // setupStore
  ) : R);
  r._s.set(e, x);
  const L = (r._a && r._a.runWithContext || Sd)(() => r._e.run(() => (a = ar()).run(() => t({ action: C }))));
  for (const E in L) {
    const k = L[E];
    if (et(k) && !so(k) || ur(k))
      process.env.NODE_ENV !== "production" && o ? qt(v.value, E, Wt(L, E)) : s || (m && Cd(k) && (et(k) ? k.value = m[E] : Gn(k, m[E])), r.state.value[e][E] = k), process.env.NODE_ENV !== "production" && S.state.push(E);
    else if (typeof k == "function") {
      const N = process.env.NODE_ENV !== "production" && o ? k : C(k, E);
      L[E] = N, process.env.NODE_ENV !== "production" && (S.actions[E] = k), i.actions[E] = k;
    } else process.env.NODE_ENV !== "production" && so(k) && (S.getters[E] = s ? (
      // @ts-expect-error
      n.getters[E]
    ) : k, Ot && (L._getters || // @ts-expect-error: same
    (L._getters = dt([]))).push(E));
  }
  if (be(x, L), be(ra(x), L), Object.defineProperty(x, "$state", {
    get: () => process.env.NODE_ENV !== "production" && o ? v.value : r.state.value[e],
    set: (E) => {
      if (process.env.NODE_ENV !== "production" && o)
        throw new Error("cannot set hotState");
      g((k) => {
        be(k, E);
      });
    }
  }), process.env.NODE_ENV !== "production" && (x._hotUpdate = dt((E) => {
    x._hotUpdating = !0, E._hmrPayload.state.forEach((k) => {
      if (k in x.$state) {
        const N = E.$state[k], U = x.$state[k];
        typeof N == "object" && nt(N) && nt(U) ? hs(N, U) : E.$state[k] = U;
      }
      qt(x, k, Wt(E.$state, k));
    }), Object.keys(x.$state).forEach((k) => {
      k in E.$state || An(x, k);
    }), c = !1, l = !1, r.state.value[e] = Wt(E._hmrPayload, "hotState"), l = !0, ue().then(() => {
      c = !0;
    });
    for (const k in E._hmrPayload.actions) {
      const N = E[k];
      qt(x, k, C(N, k));
    }
    for (const k in E._hmrPayload.getters) {
      const N = E._hmrPayload.getters[k], U = s ? (
        // special handling of options api
        B(() => (en(r), N.call(x, x)))
      ) : N;
      qt(x, k, U);
    }
    Object.keys(x._hmrPayload.getters).forEach((k) => {
      k in E._hmrPayload.getters || An(x, k);
    }), Object.keys(x._hmrPayload.actions).forEach((k) => {
      k in E._hmrPayload.actions || An(x, k);
    }), x._hmrPayload = E._hmrPayload, x._getters = E._getters, x._hotUpdating = !1;
  })), process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ot) {
    const E = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((k) => {
      Object.defineProperty(x, k, be({ value: x[k] }, E));
    });
  }
  return r._p.forEach((E) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Ot) {
      const k = a.run(() => E({
        store: x,
        app: r._a,
        pinia: r,
        options: i
      }));
      Object.keys(k || {}).forEach((N) => x._customProperties.add(N)), be(x, k);
    } else
      be(x, a.run(() => E({
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
function Ad(e, t, n) {
  let r, o;
  const s = typeof t == "function";
  r = e, o = s ? n : t;
  function a(i, d) {
    const c = na();
    if (i = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && At && At._testing ? null : i) || (c ? lr(_d, null) : null), i && en(i), process.env.NODE_ENV !== "production" && !At)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    i = At, i._s.has(r) || (s ? Kn(r, t, o, i) : ao(r, o, i), process.env.NODE_ENV !== "production" && (a._pinia = i));
    const l = i._s.get(r);
    if (process.env.NODE_ENV !== "production" && d) {
      const u = "__hot:" + r, f = s ? Kn(u, t, o, i, !0) : ao(u, be({}, o), i, !0);
      d._hotUpdate(f), delete i.state.value[u], i._s.delete(u);
    }
    if (process.env.NODE_ENV !== "production" && Ot) {
      const u = Ne();
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
function vs(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Od } = Object.prototype, { getPrototypeOf: Nr } = Object, mn = /* @__PURE__ */ ((e) => (t) => {
  const n = Od.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Ae = (e) => (e = e.toLowerCase(), (t) => mn(t) === e), hn = (e) => (t) => typeof t === e, { isArray: wt } = Array, Bt = hn("undefined");
function kd(e) {
  return e !== null && !Bt(e) && e.constructor !== null && !Bt(e.constructor) && ge(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const gs = Ae("ArrayBuffer");
function Rd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && gs(e.buffer), t;
}
const Td = hn("string"), ge = hn("function"), bs = hn("number"), yn = (e) => e !== null && typeof e == "object", Pd = (e) => e === !0 || e === !1, Gt = (e) => {
  if (mn(e) !== "object")
    return !1;
  const t = Nr(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Nd = Ae("Date"), Bd = Ae("File"), Dd = Ae("Blob"), Md = Ae("FileList"), Id = (e) => yn(e) && ge(e.pipe), Ld = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ge(e.append) && ((t = mn(e)) === "formdata" || // detect form-data instance
  t === "object" && ge(e.toString) && e.toString() === "[object FormData]"));
}, Vd = Ae("URLSearchParams"), [$d, Fd, qd, jd] = ["ReadableStream", "Request", "Response", "Headers"].map(Ae), zd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Lt(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), wt(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const s = n ? Object.getOwnPropertyNames(e) : Object.keys(e), a = s.length;
    let i;
    for (r = 0; r < a; r++)
      i = s[r], t.call(null, e[i], i, e);
  }
}
function ws(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const Ye = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, xs = (e) => !Bt(e) && e !== Ye;
function Jn() {
  const { caseless: e } = xs(this) && this || {}, t = {}, n = (r, o) => {
    const s = e && ws(t, o) || o;
    Gt(t[s]) && Gt(r) ? t[s] = Jn(t[s], r) : Gt(r) ? t[s] = Jn({}, r) : wt(r) ? t[s] = r.slice() : t[s] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Lt(arguments[r], n);
  return t;
}
const Ud = (e, t, n, { allOwnKeys: r } = {}) => (Lt(t, (o, s) => {
  n && ge(o) ? e[s] = vs(o, n) : e[s] = o;
}, { allOwnKeys: r }), e), Hd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Wd = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Gd = (e, t, n, r) => {
  let o, s, a;
  const i = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; )
      a = o[s], (!r || r(a, e, t)) && !i[a] && (t[a] = e[a], i[a] = !0);
    e = n !== !1 && Nr(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Kd = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Jd = (e) => {
  if (!e) return null;
  if (wt(e)) return e;
  let t = e.length;
  if (!bs(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Xd = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Nr(Uint8Array)), Yd = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const s = o.value;
    t.call(e, s[0], s[1]);
  }
}, Zd = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, Qd = Ae("HTMLFormElement"), ef = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), io = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), tf = Ae("RegExp"), _s = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Lt(n, (o, s) => {
    let a;
    (a = t(o, s, e)) !== !1 && (r[s] = a || o);
  }), Object.defineProperties(e, r);
}, nf = (e) => {
  _s(e, (t, n) => {
    if (ge(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ge(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, rf = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((s) => {
      n[s] = !0;
    });
  };
  return wt(e) ? r(e) : r(String(e).split(t)), n;
}, of = () => {
}, sf = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, In = "abcdefghijklmnopqrstuvwxyz", lo = "0123456789", Ss = {
  DIGIT: lo,
  ALPHA: In,
  ALPHA_DIGIT: In + In.toUpperCase() + lo
}, af = (e = 16, t = Ss.ALPHA_DIGIT) => {
  let n = "";
  const { length: r } = t;
  for (; e--; )
    n += t[Math.random() * r | 0];
  return n;
};
function lf(e) {
  return !!(e && ge(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const uf = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (yn(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const s = wt(r) ? [] : {};
        return Lt(r, (a, i) => {
          const d = n(a, o + 1);
          !Bt(d) && (s[i] = d);
        }), t[o] = void 0, s;
      }
    }
    return r;
  };
  return n(e, 0);
}, cf = Ae("AsyncFunction"), df = (e) => e && (yn(e) || ge(e)) && ge(e.then) && ge(e.catch), Es = ((e, t) => e ? setImmediate : t ? ((n, r) => (Ye.addEventListener("message", ({ source: o, data: s }) => {
  o === Ye && s === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), Ye.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  ge(Ye.postMessage)
), ff = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ye) : typeof process < "u" && process.nextTick || Es, w = {
  isArray: wt,
  isArrayBuffer: gs,
  isBuffer: kd,
  isFormData: Ld,
  isArrayBufferView: Rd,
  isString: Td,
  isNumber: bs,
  isBoolean: Pd,
  isObject: yn,
  isPlainObject: Gt,
  isReadableStream: $d,
  isRequest: Fd,
  isResponse: qd,
  isHeaders: jd,
  isUndefined: Bt,
  isDate: Nd,
  isFile: Bd,
  isBlob: Dd,
  isRegExp: tf,
  isFunction: ge,
  isStream: Id,
  isURLSearchParams: Vd,
  isTypedArray: Xd,
  isFileList: Md,
  forEach: Lt,
  merge: Jn,
  extend: Ud,
  trim: zd,
  stripBOM: Hd,
  inherits: Wd,
  toFlatObject: Gd,
  kindOf: mn,
  kindOfTest: Ae,
  endsWith: Kd,
  toArray: Jd,
  forEachEntry: Yd,
  matchAll: Zd,
  isHTMLForm: Qd,
  hasOwnProperty: io,
  hasOwnProp: io,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: _s,
  freezeMethods: nf,
  toObjectSet: rf,
  toCamelCase: ef,
  noop: of,
  toFiniteNumber: sf,
  findKey: ws,
  global: Ye,
  isContextDefined: xs,
  ALPHABET: Ss,
  generateString: af,
  isSpecCompliantForm: lf,
  toJSONObject: uf,
  isAsyncFn: cf,
  isThenable: df,
  setImmediate: Es,
  asap: ff
};
function $(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
w.inherits($, Error, {
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
const Cs = $.prototype, As = {};
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
  As[e] = { value: e };
});
Object.defineProperties($, As);
Object.defineProperty(Cs, "isAxiosError", { value: !0 });
$.from = (e, t, n, r, o, s) => {
  const a = Object.create(Cs);
  return w.toFlatObject(e, a, function(d) {
    return d !== Error.prototype;
  }, (i) => i !== "isAxiosError"), $.call(a, e.message, t, n, r, o), a.cause = e, a.name = e.name, s && Object.assign(a, s), a;
};
const pf = null;
function Xn(e) {
  return w.isPlainObject(e) || w.isArray(e);
}
function Os(e) {
  return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function uo(e, t, n) {
  return e ? e.concat(t).map(function(o, s) {
    return o = Os(o), !n && s ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function mf(e) {
  return w.isArray(e) && !e.some(Xn);
}
const hf = w.toFlatObject(w, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function vn(e, t, n) {
  if (!w.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = w.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(v, h) {
    return !w.isUndefined(h[v]);
  });
  const r = n.metaTokens, o = n.visitor || l, s = n.dots, a = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && w.isSpecCompliantForm(t);
  if (!w.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (w.isDate(m))
      return m.toISOString();
    if (!d && w.isBlob(m))
      throw new $("Blob is not supported. Use a Buffer instead.");
    return w.isArrayBuffer(m) || w.isTypedArray(m) ? d && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function l(m, v, h) {
    let g = m;
    if (m && !h && typeof m == "object") {
      if (w.endsWith(v, "{}"))
        v = r ? v : v.slice(0, -2), m = JSON.stringify(m);
      else if (w.isArray(m) && mf(m) || (w.isFileList(m) || w.endsWith(v, "[]")) && (g = w.toArray(m)))
        return v = Os(v), g.forEach(function(b, C) {
          !(w.isUndefined(b) || b === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? uo([v], C, s) : a === null ? v : v + "[]",
            c(b)
          );
        }), !1;
    }
    return Xn(m) ? !0 : (t.append(uo(h, v, s), c(m)), !1);
  }
  const u = [], f = Object.assign(hf, {
    defaultVisitor: l,
    convertValue: c,
    isVisitable: Xn
  });
  function p(m, v) {
    if (!w.isUndefined(m)) {
      if (u.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + v.join("."));
      u.push(m), w.forEach(m, function(g, _) {
        (!(w.isUndefined(g) || g === null) && o.call(
          t,
          g,
          w.isString(_) ? _.trim() : _,
          v,
          f
        )) === !0 && p(g, v ? v.concat(_) : [_]);
      }), u.pop();
    }
  }
  if (!w.isObject(e))
    throw new TypeError("data must be an object");
  return p(e), t;
}
function co(e) {
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
function Br(e, t) {
  this._pairs = [], e && vn(e, this, t);
}
const ks = Br.prototype;
ks.append = function(t, n) {
  this._pairs.push([t, n]);
};
ks.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, co);
  } : co;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function yf(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Rs(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || yf;
  w.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let s;
  if (o ? s = o(t, n) : s = w.isURLSearchParams(t) ? t.toString() : new Br(t, n).toString(r), s) {
    const a = e.indexOf("#");
    a !== -1 && (e = e.slice(0, a)), e += (e.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return e;
}
class fo {
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
const Ts = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, vf = typeof URLSearchParams < "u" ? URLSearchParams : Br, gf = typeof FormData < "u" ? FormData : null, bf = typeof Blob < "u" ? Blob : null, wf = {
  isBrowser: !0,
  classes: {
    URLSearchParams: vf,
    FormData: gf,
    Blob: bf
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Dr = typeof window < "u" && typeof document < "u", Yn = typeof navigator == "object" && navigator || void 0, xf = Dr && (!Yn || ["ReactNative", "NativeScript", "NS"].indexOf(Yn.product) < 0), _f = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Sf = Dr && window.location.href || "http://localhost", Ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Dr,
  hasStandardBrowserEnv: xf,
  hasStandardBrowserWebWorkerEnv: _f,
  navigator: Yn,
  origin: Sf
}, Symbol.toStringTag, { value: "Module" })), le = {
  ...Ef,
  ...wf
};
function Cf(e, t) {
  return vn(e, new le.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, s) {
      return le.isNode && w.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Af(e) {
  return w.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Of(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let s;
  for (r = 0; r < o; r++)
    s = n[r], t[s] = e[s];
  return t;
}
function Ps(e) {
  function t(n, r, o, s) {
    let a = n[s++];
    if (a === "__proto__") return !0;
    const i = Number.isFinite(+a), d = s >= n.length;
    return a = !a && w.isArray(o) ? o.length : a, d ? (w.hasOwnProp(o, a) ? o[a] = [o[a], r] : o[a] = r, !i) : ((!o[a] || !w.isObject(o[a])) && (o[a] = []), t(n, r, o[a], s) && w.isArray(o[a]) && (o[a] = Of(o[a])), !i);
  }
  if (w.isFormData(e) && w.isFunction(e.entries)) {
    const n = {};
    return w.forEachEntry(e, (r, o) => {
      t(Af(r), o, n, 0);
    }), n;
  }
  return null;
}
function kf(e, t, n) {
  if (w.isString(e))
    try {
      return (t || JSON.parse)(e), w.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (0, JSON.stringify)(e);
}
const Vt = {
  transitional: Ts,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, s = w.isObject(t);
    if (s && w.isHTMLForm(t) && (t = new FormData(t)), w.isFormData(t))
      return o ? JSON.stringify(Ps(t)) : t;
    if (w.isArrayBuffer(t) || w.isBuffer(t) || w.isStream(t) || w.isFile(t) || w.isBlob(t) || w.isReadableStream(t))
      return t;
    if (w.isArrayBufferView(t))
      return t.buffer;
    if (w.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let i;
    if (s) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Cf(t, this.formSerializer).toString();
      if ((i = w.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return vn(
          i ? { "files[]": t } : t,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return s || o ? (n.setContentType("application/json", !1), kf(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Vt.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (w.isResponse(t) || w.isReadableStream(t))
      return t;
    if (t && w.isString(t) && (r && !this.responseType || o)) {
      const a = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (i) {
        if (a)
          throw i.name === "SyntaxError" ? $.from(i, $.ERR_BAD_RESPONSE, this, null, this.response) : i;
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
    FormData: le.classes.FormData,
    Blob: le.classes.Blob
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
  Vt.headers[e] = {};
});
const Rf = w.toObjectSet([
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
]), Tf = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(a) {
    o = a.indexOf(":"), n = a.substring(0, o).trim().toLowerCase(), r = a.substring(o + 1).trim(), !(!n || t[n] && Rf[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, po = Symbol("internals");
function Ct(e) {
  return e && String(e).trim().toLowerCase();
}
function Kt(e) {
  return e === !1 || e == null ? e : w.isArray(e) ? e.map(Kt) : String(e);
}
function Pf(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const Nf = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Ln(e, t, n, r, o) {
  if (w.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!w.isString(t)) {
    if (w.isString(r))
      return t.indexOf(r) !== -1;
    if (w.isRegExp(r))
      return r.test(t);
  }
}
function Bf(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Df(e, t) {
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
      (!u || o[u] === void 0 || c === !0 || c === void 0 && o[u] !== !1) && (o[u || d] = Kt(i));
    }
    const a = (i, d) => w.forEach(i, (c, l) => s(c, l, d));
    if (w.isPlainObject(t) || t instanceof this.constructor)
      a(t, n);
    else if (w.isString(t) && (t = t.trim()) && !Nf(t))
      a(Tf(t), n);
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
          return Pf(o);
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
      return !!(r && this[r] !== void 0 && (!n || Ln(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function s(a) {
      if (a = Ct(a), a) {
        const i = w.findKey(r, a);
        i && (!n || Ln(r, r[i], i, n)) && (delete r[i], o = !0);
      }
    }
    return w.isArray(t) ? t.forEach(s) : s(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const s = n[r];
      (!t || Ln(this, this[s], s, t, !0)) && (delete this[s], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return w.forEach(this, (o, s) => {
      const a = w.findKey(r, s);
      if (a) {
        n[a] = Kt(o), delete n[s];
        return;
      }
      const i = t ? Bf(s) : String(s).trim();
      i !== s && delete n[s], n[i] = Kt(o), r[i] = !0;
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
    const r = (this[po] = this[po] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function s(a) {
      const i = Ct(a);
      r[i] || (Df(o, a), r[i] = !0);
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
function Vn(e, t) {
  const n = this || Vt, r = t || n, o = me.from(r.headers);
  let s = r.data;
  return w.forEach(e, function(i) {
    s = i.call(n, s, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), s;
}
function Ns(e) {
  return !!(e && e.__CANCEL__);
}
function xt(e, t, n) {
  $.call(this, e ?? "canceled", $.ERR_CANCELED, t, n), this.name = "CanceledError";
}
w.inherits(xt, $, {
  __CANCEL__: !0
});
function Bs(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new $(
    "Request failed with status code " + n.status,
    [$.ERR_BAD_REQUEST, $.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Mf(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function If(e, t) {
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
function Lf(e, t) {
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
const tn = (e, t, n = 3) => {
  let r = 0;
  const o = If(50, 250);
  return Lf((s) => {
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
}, mo = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, ho = (e) => (...t) => w.asap(() => e(...t)), Vf = le.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, le.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(le.origin),
  le.navigator && /(msie|trident)/i.test(le.navigator.userAgent)
) : () => !0, $f = le.hasStandardBrowserEnv ? (
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
function Ff(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function qf(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Ds(e, t) {
  return e && !Ff(t) ? qf(e, t) : t;
}
const yo = (e) => e instanceof me ? { ...e } : e;
function rt(e, t) {
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
    headers: (c, l, u) => o(yo(c), yo(l), u, !0)
  };
  return w.forEach(Object.keys(Object.assign({}, e, t)), function(l) {
    const u = d[l] || o, f = u(e[l], t[l], l);
    w.isUndefined(f) && u !== i || (n[l] = f);
  }), n;
}
const Ms = (e) => {
  const t = rt({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: s, headers: a, auth: i } = t;
  t.headers = a = me.from(a), t.url = Rs(Ds(t.baseURL, t.url), e.params, e.paramsSerializer), i && a.set(
    "Authorization",
    "Basic " + btoa((i.username || "") + ":" + (i.password ? unescape(encodeURIComponent(i.password)) : ""))
  );
  let d;
  if (w.isFormData(n)) {
    if (le.hasStandardBrowserEnv || le.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((d = a.getContentType()) !== !1) {
      const [c, ...l] = d ? d.split(";").map((u) => u.trim()).filter(Boolean) : [];
      a.setContentType([c || "multipart/form-data", ...l].join("; "));
    }
  }
  if (le.hasStandardBrowserEnv && (r && w.isFunction(r) && (r = r(t)), r || r !== !1 && Vf(t.url))) {
    const c = o && s && $f.read(s);
    c && a.set(o, c);
  }
  return t;
}, jf = typeof XMLHttpRequest < "u", zf = jf && function(e) {
  return new Promise(function(n, r) {
    const o = Ms(e);
    let s = o.data;
    const a = me.from(o.headers).normalize();
    let { responseType: i, onUploadProgress: d, onDownloadProgress: c } = o, l, u, f, p, m;
    function v() {
      p && p(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(l), o.signal && o.signal.removeEventListener("abort", l);
    }
    let h = new XMLHttpRequest();
    h.open(o.method.toUpperCase(), o.url, !0), h.timeout = o.timeout;
    function g() {
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
      Bs(function(x) {
        n(x), v();
      }, function(x) {
        r(x), v();
      }, S), h = null;
    }
    "onloadend" in h ? h.onloadend = g : h.onreadystatechange = function() {
      !h || h.readyState !== 4 || h.status === 0 && !(h.responseURL && h.responseURL.indexOf("file:") === 0) || setTimeout(g);
    }, h.onabort = function() {
      h && (r(new $("Request aborted", $.ECONNABORTED, e, h)), h = null);
    }, h.onerror = function() {
      r(new $("Network Error", $.ERR_NETWORK, e, h)), h = null;
    }, h.ontimeout = function() {
      let C = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const S = o.transitional || Ts;
      o.timeoutErrorMessage && (C = o.timeoutErrorMessage), r(new $(
        C,
        S.clarifyTimeoutError ? $.ETIMEDOUT : $.ECONNABORTED,
        e,
        h
      )), h = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in h && w.forEach(a.toJSON(), function(C, S) {
      h.setRequestHeader(S, C);
    }), w.isUndefined(o.withCredentials) || (h.withCredentials = !!o.withCredentials), i && i !== "json" && (h.responseType = o.responseType), c && ([f, m] = tn(c, !0), h.addEventListener("progress", f)), d && h.upload && ([u, p] = tn(d), h.upload.addEventListener("progress", u), h.upload.addEventListener("loadend", p)), (o.cancelToken || o.signal) && (l = (b) => {
      h && (r(!b || b.type ? new xt(null, e, h) : b), h.abort(), h = null);
    }, o.cancelToken && o.cancelToken.subscribe(l), o.signal && (o.signal.aborted ? l() : o.signal.addEventListener("abort", l)));
    const _ = Mf(o.url);
    if (_ && le.protocols.indexOf(_) === -1) {
      r(new $("Unsupported protocol " + _ + ":", $.ERR_BAD_REQUEST, e));
      return;
    }
    h.send(s || null);
  });
}, Uf = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const s = function(c) {
      if (!o) {
        o = !0, i();
        const l = c instanceof Error ? c : this.reason;
        r.abort(l instanceof $ ? l : new xt(l instanceof Error ? l.message : l));
      }
    };
    let a = t && setTimeout(() => {
      a = null, s(new $(`timeout ${t} of ms exceeded`, $.ETIMEDOUT));
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
}, Hf = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, Wf = async function* (e, t) {
  for await (const n of Gf(e))
    yield* Hf(n, t);
}, Gf = async function* (e) {
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
}, vo = (e, t, n, r) => {
  const o = Wf(e, t);
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
}, gn = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", Is = gn && typeof ReadableStream == "function", Kf = gn && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), Ls = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, Jf = Is && Ls(() => {
  let e = !1;
  const t = new Request(le.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), go = 64 * 1024, Zn = Is && Ls(() => w.isReadableStream(new Response("").body)), nn = {
  stream: Zn && ((e) => e.body)
};
gn && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !nn[t] && (nn[t] = w.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new $(`Response type '${t}' is not supported`, $.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Xf = async (e) => {
  if (e == null)
    return 0;
  if (w.isBlob(e))
    return e.size;
  if (w.isSpecCompliantForm(e))
    return (await new Request(le.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (w.isArrayBufferView(e) || w.isArrayBuffer(e))
    return e.byteLength;
  if (w.isURLSearchParams(e) && (e = e + ""), w.isString(e))
    return (await Kf(e)).byteLength;
}, Yf = async (e, t) => {
  const n = w.toFiniteNumber(e.getContentLength());
  return n ?? Xf(t);
}, Zf = gn && (async (e) => {
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
  } = Ms(e);
  c = c ? (c + "").toLowerCase() : "text";
  let p = Uf([o, s && s.toAbortSignal()], a), m;
  const v = p && p.unsubscribe && (() => {
    p.unsubscribe();
  });
  let h;
  try {
    if (d && Jf && n !== "get" && n !== "head" && (h = await Yf(l, r)) !== 0) {
      let S = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), R;
      if (w.isFormData(r) && (R = S.headers.get("content-type")) && l.setContentType(R), S.body) {
        const [x, I] = mo(
          h,
          tn(ho(d))
        );
        r = vo(S.body, go, x, I);
      }
    }
    w.isString(u) || (u = u ? "include" : "omit");
    const g = "credentials" in Request.prototype;
    m = new Request(t, {
      ...f,
      signal: p,
      method: n.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: g ? u : void 0
    });
    let _ = await fetch(m);
    const b = Zn && (c === "stream" || c === "response");
    if (Zn && (i || b && v)) {
      const S = {};
      ["status", "statusText", "headers"].forEach((L) => {
        S[L] = _[L];
      });
      const R = w.toFiniteNumber(_.headers.get("content-length")), [x, I] = i && mo(
        R,
        tn(ho(i), !0)
      ) || [];
      _ = new Response(
        vo(_.body, go, x, () => {
          I && I(), v && v();
        }),
        S
      );
    }
    c = c || "text";
    let C = await nn[w.findKey(nn, c) || "text"](_, e);
    return !b && v && v(), await new Promise((S, R) => {
      Bs(S, R, {
        data: C,
        headers: me.from(_.headers),
        status: _.status,
        statusText: _.statusText,
        config: e,
        request: m
      });
    });
  } catch (g) {
    throw v && v(), g && g.name === "TypeError" && /fetch/i.test(g.message) ? Object.assign(
      new $("Network Error", $.ERR_NETWORK, e, m),
      {
        cause: g.cause || g
      }
    ) : $.from(g, g && g.code, e, m);
  }
}), Qn = {
  http: pf,
  xhr: zf,
  fetch: Zf
};
w.forEach(Qn, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const bo = (e) => `- ${e}`, Qf = (e) => w.isFunction(e) || e === null || e === !1, Vs = {
  getAdapter: (e) => {
    e = w.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let s = 0; s < t; s++) {
      n = e[s];
      let a;
      if (r = n, !Qf(n) && (r = Qn[(a = String(n)).toLowerCase()], r === void 0))
        throw new $(`Unknown adapter '${a}'`);
      if (r)
        break;
      o[a || "#" + s] = r;
    }
    if (!r) {
      const s = Object.entries(o).map(
        ([i, d]) => `adapter ${i} ` + (d === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = t ? s.length > 1 ? `since :
` + s.map(bo).join(`
`) : " " + bo(s[0]) : "as no adapter specified";
      throw new $(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: Qn
};
function $n(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new xt(null, e);
}
function wo(e) {
  return $n(e), e.headers = me.from(e.headers), e.data = Vn.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), Vs.getAdapter(e.adapter || Vt.adapter)(e).then(function(r) {
    return $n(e), r.data = Vn.call(
      e,
      e.transformResponse,
      r
    ), r.headers = me.from(r.headers), r;
  }, function(r) {
    return Ns(r) || ($n(e), r && r.response && (r.response.data = Vn.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = me.from(r.response.headers))), Promise.reject(r);
  });
}
const $s = "1.7.9", bn = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  bn[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const xo = {};
bn.transitional = function(t, n, r) {
  function o(s, a) {
    return "[Axios v" + $s + "] Transitional option '" + s + "'" + a + (r ? ". " + r : "");
  }
  return (s, a, i) => {
    if (t === !1)
      throw new $(
        o(a, " has been removed" + (n ? " in " + n : "")),
        $.ERR_DEPRECATED
      );
    return n && !xo[a] && (xo[a] = !0, console.warn(
      o(
        a,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(s, a, i) : !0;
  };
};
bn.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function ep(e, t, n) {
  if (typeof e != "object")
    throw new $("options must be an object", $.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const s = r[o], a = t[s];
    if (a) {
      const i = e[s], d = i === void 0 || a(i, s, e);
      if (d !== !0)
        throw new $("option " + s + " must be " + d, $.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new $("Unknown option " + s, $.ERR_BAD_OPTION);
  }
}
const Jt = {
  assertOptions: ep,
  validators: bn
}, Oe = Jt.validators;
class Qe {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new fo(),
      response: new fo()
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
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = rt(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: s } = n;
    r !== void 0 && Jt.assertOptions(r, {
      silentJSONParsing: Oe.transitional(Oe.boolean),
      forcedJSONParsing: Oe.transitional(Oe.boolean),
      clarifyTimeoutError: Oe.transitional(Oe.boolean)
    }, !1), o != null && (w.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : Jt.assertOptions(o, {
      encode: Oe.function,
      serialize: Oe.function
    }, !0)), Jt.assertOptions(n, {
      baseUrl: Oe.spelling("baseURL"),
      withXsrfToken: Oe.spelling("withXSRFToken")
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
    this.interceptors.request.forEach(function(v) {
      typeof v.runWhen == "function" && v.runWhen(n) === !1 || (d = d && v.synchronous, i.unshift(v.fulfilled, v.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(v) {
      c.push(v.fulfilled, v.rejected);
    });
    let l, u = 0, f;
    if (!d) {
      const m = [wo.bind(this), void 0];
      for (m.unshift.apply(m, i), m.push.apply(m, c), f = m.length, l = Promise.resolve(n); u < f; )
        l = l.then(m[u++], m[u++]);
      return l;
    }
    f = i.length;
    let p = n;
    for (u = 0; u < f; ) {
      const m = i[u++], v = i[u++];
      try {
        p = m(p);
      } catch (h) {
        v.call(this, h);
        break;
      }
    }
    try {
      l = wo.call(this, p);
    } catch (m) {
      return Promise.reject(m);
    }
    for (u = 0, f = c.length; u < f; )
      l = l.then(c[u++], c[u++]);
    return l;
  }
  getUri(t) {
    t = rt(this.defaults, t);
    const n = Ds(t.baseURL, t.url);
    return Rs(n, t.params, t.paramsSerializer);
  }
}
w.forEach(["delete", "get", "head", "options"], function(t) {
  Qe.prototype[t] = function(n, r) {
    return this.request(rt(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
w.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(s, a, i) {
      return this.request(rt(i || {}, {
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
class Mr {
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
      r.reason || (r.reason = new xt(s, a, i), n(r.reason));
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
      token: new Mr(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
}
function tp(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function np(e) {
  return w.isObject(e) && e.isAxiosError === !0;
}
const er = {
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
Object.entries(er).forEach(([e, t]) => {
  er[t] = e;
});
function Fs(e) {
  const t = new Qe(e), n = vs(Qe.prototype.request, t);
  return w.extend(n, Qe.prototype, t, { allOwnKeys: !0 }), w.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return Fs(rt(e, o));
  }, n;
}
const re = Fs(Vt);
re.Axios = Qe;
re.CanceledError = xt;
re.CancelToken = Mr;
re.isCancel = Ns;
re.VERSION = $s;
re.toFormData = vn;
re.AxiosError = $;
re.Cancel = re.CanceledError;
re.all = function(t) {
  return Promise.all(t);
};
re.spread = tp;
re.isAxiosError = np;
re.mergeConfig = rt;
re.AxiosHeaders = me;
re.formToJSON = (e) => Ps(w.isHTMLForm(e) ? new FormData(e) : e);
re.getAdapter = Vs.getAdapter;
re.HttpStatusCode = er;
re.default = re;
const qs = re.create({
  baseURL: "/api",
  timeout: 5e3
}), rp = async (e, t, n) => {
  const r = "emission", o = {
    startLocation: e,
    endLocation: t,
    transportMediumDTO: n
  };
  return (await qs.post(r, o)).data;
}, op = async (e, t, n, r, o) => {
  const s = {
    startLocation: e,
    endLocation: t,
    distance: n,
    transportMediumDTO: r,
    groupEmissionDTO: o
  };
  return (await qs.post("groupEmission", s)).data;
}, sp = /* @__PURE__ */ Ad("calculationStore", {
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
        }, t = await rp(
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
          }, s = await op(
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
}), ap = {
  name: "CalculationStepper",
  components: {
    AlertDescription: gd,
    AlertTitle: bd,
    Alert: xd,
    ArrowLeft: Yu,
    ArrowRight: Zu,
    AlertCircle: tc,
    Switch: fs,
    Progress: Bc,
    Input: ds,
    Label: pn,
    Button: fn,
    CardFooter: hc,
    SelectItem: dc,
    SelectContent: mc,
    SelectTrigger: uc,
    Select: Ku,
    CardContent: Mo,
    CardDescription: $a,
    CardTitle: Va,
    CardHeader: La,
    Card: Do
  },
  setup() {
    return {
      calculationStore: sp()
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
          return qc;
        case 2:
          return Wc;
        case 3:
          return ed;
        case 4:
          return vd;
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
}, ip = { class: "w-full bg-white" }, lp = { class: "mt-2 mb-4" }, up = { class: "w-full" }, cp = { class: "w-full flex justify-between" }, dp = { class: "mt-6 hidden" };
function fp(e, t, n, r, o, s) {
  const a = W("Progress"), i = W("CardHeader"), d = W("CardContent"), c = W("AlertCircle"), l = W("AlertTitle"), u = W("AlertDescription"), f = W("Alert"), p = W("ArrowLeft"), m = W("Button"), v = W("ArrowRight"), h = W("CardFooter"), g = W("Card");
  return O(), z(Te, null, [
    t[11] || (t[11] = V("div", { class: "hidden" }, [
      V("p", null, "CalculationComponent")
    ], -1)),
    V("div", ip, [
      T(g, { class: "max-w-4xl lg:mx-auto m-6" }, {
        default: A(() => [
          T(i, null, {
            default: A(() => [
              V("div", lp, [
                T(a, {
                  modelValue: s.progress,
                  "onUpdate:modelValue": t[0] || (t[0] = (_) => s.progress = _),
                  class: "w-full mx-auto"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }),
          T(d, null, {
            default: A(() => [
              (O(), M(ht(s.currentStep), {
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
          T(h, { class: "w-full flex flex-col px-6 pb-6" }, {
            default: A(() => [
              V("div", up, [
                !s.isCurrentStepValid() && o.step !== o.maxStep ? (O(), M(f, {
                  key: 0,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: A(() => [
                    T(c, { class: "w-4 h-4" }),
                    T(l, null, {
                      default: A(() => t[3] || (t[3] = [
                        ee("Unvollständig")
                      ])),
                      _: 1
                    }),
                    T(u, null, {
                      default: A(() => t[4] || (t[4] = [
                        ee(" Bitte überprüfe deine Eingabedaten vor dem nächsten Schritt. ")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : ie("", !0),
                r.calculationStore.error !== null ? (O(), M(f, {
                  key: 1,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: A(() => [
                    T(c, { class: "w-4 h-4" }),
                    T(l, null, {
                      default: A(() => t[5] || (t[5] = [
                        ee("Fehler")
                      ])),
                      _: 1
                    }),
                    T(u, null, {
                      default: A(() => [
                        ee(pe(r.calculationStore.error), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : ie("", !0)
              ]),
              V("div", cp, [
                o.step > 1 ? (O(), M(m, {
                  key: 0,
                  type: "button",
                  onClick: s.prevStep,
                  variant: "outline"
                }, {
                  default: A(() => [
                    T(p, { class: "mr-2 h-4 w-4" }),
                    t[6] || (t[6] = ee(" Zurück "))
                  ]),
                  _: 1
                }, 8, ["onClick"])) : ie("", !0),
                o.step < o.maxStep && o.step !== o.maxStep - 1 ? (O(), M(m, {
                  key: 1,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: A(() => [
                    t[7] || (t[7] = ee(" Weiter ")),
                    T(v, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : ie("", !0),
                o.step === o.maxStep - 1 ? (O(), M(m, {
                  key: 2,
                  disabled: !s.isCurrentStepValid(),
                  type: "button",
                  onClick: s.nextStep,
                  class: ne(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: A(() => [
                    t[8] || (t[8] = ee(" Berechnen ")),
                    T(v, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : ie("", !0)
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    V("div", dp, [
      ee(pe(this.stepsValidity), 1),
      t[9] || (t[9] = V("br", null, null, -1)),
      ee(" " + pe(this.advancedCalculation), 1),
      t[10] || (t[10] = V("br", null, null, -1)),
      ee(" " + pe(this.calculationData), 1)
    ])
  ], 64);
}
const pp = /* @__PURE__ */ It(ap, [["render", fp]]);
function vp(e) {
  const t = document.querySelector(e);
  if (!t) {
    console.error(`Element mit dem Selector "${e}" nicht gefunden.`);
    return;
  }
  oa(pp).mount(t);
}
export {
  vp as default
};
