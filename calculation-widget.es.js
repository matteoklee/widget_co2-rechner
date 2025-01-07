import * as On from "vue";
import { openBlock as _, createElementBlock as L, normalizeClass as X, unref as f, renderSlot as B, computed as O, ref as T, shallowRef as Xn, watch as H, getCurrentScope as Qt, onScopeDispose as en, shallowReadonly as Ue, getCurrentInstance as Te, toRef as Yr, camelize as Zn, defineComponent as q, Comment as Xr, mergeProps as z, cloneVNode as Zr, h as ye, toRefs as Oe, reactive as Jn, watchEffect as ae, markRaw as Jr, createBlock as P, withCtx as C, nextTick as se, createCommentVNode as oe, Fragment as we, renderList as st, resolveDynamicComponent as Qe, onMounted as ge, createVNode as A, withModifiers as me, normalizeProps as tn, guardReactiveProps as nn, Teleport as rn, onBeforeUnmount as on, createTextVNode as J, withKeys as Qn, effectScope as er, toHandlerKey as Qr, onUnmounted as an, withDirectives as tr, createElementVNode as M, isRef as nr, vModelSelect as eo, inject as rr, provide as or, customRef as to, onBeforeUpdate as no, onUpdated as ro, normalizeStyle as kt, mergeDefaults as oo, watchPostEffect as ao, readonly as lo, toValue as re, vModelText as so, resolveComponent as F, toDisplayString as fe, createApp as io } from "vue";
function ar(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ar(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function lr() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ar(e)) && (r && (r += " "), r += t);
  return r;
}
const ln = "-", uo = (e) => {
  const t = fo(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (l) => {
      const i = l.split(ln);
      return i[0] === "" && i.length !== 1 && i.shift(), sr(i, t) || co(l);
    },
    getConflictingClassGroupIds: (l, i) => {
      const c = n[l] || [];
      return i && r[l] ? [...c, ...r[l]] : c;
    }
  };
}, sr = (e, t) => {
  var l;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? sr(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(ln);
  return (l = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : l.classGroupId;
}, Bn = /^\[(.+)\]$/, co = (e) => {
  if (Bn.test(e)) {
    const t = Bn.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, fo = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return mo(Object.entries(e.classGroups), n).forEach(([a, l]) => {
    Gt(l, r, a, t);
  }), r;
}, Gt = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Pn(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (po(o)) {
        Gt(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, l]) => {
      Gt(l, Pn(t, a), n, r);
    });
  });
}, Pn = (e, t) => {
  let n = e;
  return t.split(ln).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, po = (e) => e.isThemeGetter, mo = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([l, i]) => [t + l, i])) : a);
  return [n, o];
}) : e, vo = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, l) => {
    n.set(a, l), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let l = n.get(a);
      if (l !== void 0)
        return l;
      if ((l = r.get(a)) !== void 0)
        return o(a, l), l;
    },
    set(a, l) {
      n.has(a) ? n.set(a, l) : o(a, l);
    }
  };
}, ir = "!", ho = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, l = (i) => {
    const c = [];
    let d = 0, s = 0, u;
    for (let h = 0; h < i.length; h++) {
      let y = i[h];
      if (d === 0) {
        if (y === o && (r || i.slice(h, h + a) === t)) {
          c.push(i.slice(s, h)), s = h + a;
          continue;
        }
        if (y === "/") {
          u = h;
          continue;
        }
      }
      y === "[" ? d++ : y === "]" && d--;
    }
    const m = c.length === 0 ? i : i.substring(s), p = m.startsWith(ir), v = p ? m.substring(1) : m, g = u && u > s ? u - s : void 0;
    return {
      modifiers: c,
      hasImportantModifier: p,
      baseClassName: v,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: l
  }) : l;
}, go = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, yo = (e) => ({
  cache: vo(e.cacheSize),
  parseClassName: ho(e),
  ...uo(e)
}), bo = /\s+/, wo = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], l = e.trim().split(bo);
  let i = "";
  for (let c = l.length - 1; c >= 0; c -= 1) {
    const d = l[c], {
      modifiers: s,
      hasImportantModifier: u,
      baseClassName: m,
      maybePostfixModifierPosition: p
    } = n(d);
    let v = !!p, g = r(v ? m.substring(0, p) : m);
    if (!g) {
      if (!v) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(m), !g) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      v = !1;
    }
    const h = go(s).join(":"), y = u ? h + ir : h, w = y + g;
    if (a.includes(w))
      continue;
    a.push(w);
    const b = o(g, v);
    for (let k = 0; k < b.length; ++k) {
      const x = b[k];
      a.push(y + x);
    }
    i = d + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function xo() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = ur(t)) && (r && (r += " "), r += n);
  return r;
}
const ur = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = ur(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Co(e, ...t) {
  let n, r, o, a = l;
  function l(c) {
    const d = t.reduce((s, u) => u(s), e());
    return n = yo(d), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const d = r(c);
    if (d)
      return d;
    const s = wo(c, n);
    return o(c, s), s;
  }
  return function() {
    return a(xo.apply(null, arguments));
  };
}
const j = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, dr = /^\[(?:([a-z-]+):)?(.+)\]$/i, _o = /^\d+\/\d+$/, ko = /* @__PURE__ */ new Set(["px", "full", "screen"]), So = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Ao = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Eo = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, To = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Oo = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ke = (e) => Xe(e) || ko.has(e) || _o.test(e), Pe = (e) => et(e, "length", qo), Xe = (e) => !!e && !Number.isNaN(Number(e)), Vt = (e) => et(e, "number", Xe), at = (e) => !!e && Number.isInteger(Number(e)), Bo = (e) => e.endsWith("%") && Xe(e.slice(0, -1)), V = (e) => dr.test(e), Ie = (e) => So.test(e), Po = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Io = (e) => et(e, Po, cr), Mo = (e) => et(e, "position", cr), Ro = /* @__PURE__ */ new Set(["image", "url"]), $o = (e) => et(e, Ro, Lo), Vo = (e) => et(e, "", Do), lt = () => !0, et = (e, t, n) => {
  const r = dr.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, qo = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Ao.test(e) && !Eo.test(e)
), cr = () => !1, Do = (e) => To.test(e), Lo = (e) => Oo.test(e), No = () => {
  const e = j("colors"), t = j("spacing"), n = j("blur"), r = j("brightness"), o = j("borderColor"), a = j("borderRadius"), l = j("borderSpacing"), i = j("borderWidth"), c = j("contrast"), d = j("grayscale"), s = j("hueRotate"), u = j("invert"), m = j("gap"), p = j("gradientColorStops"), v = j("gradientColorStopPositions"), g = j("inset"), h = j("margin"), y = j("opacity"), w = j("padding"), b = j("saturate"), k = j("scale"), x = j("sepia"), E = j("skew"), S = j("space"), R = j("translate"), D = () => ["auto", "contain", "none"], I = () => ["auto", "hidden", "clip", "visible", "scroll"], U = () => ["auto", V, t], $ = () => [V, t], Z = () => ["", ke, Pe], N = () => ["auto", Xe, V], ue = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], K = () => ["solid", "dashed", "dotted", "double", "none"], te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ne = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], ee = () => ["", "0", V], Ge = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], le = () => [Xe, V];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [lt],
      spacing: [ke, Pe],
      blur: ["none", "", Ie, V],
      brightness: le(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Ie, V],
      borderSpacing: $(),
      borderWidth: Z(),
      contrast: le(),
      grayscale: ee(),
      hueRotate: le(),
      invert: ee(),
      gap: $(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Bo, Pe],
      inset: U(),
      margin: U(),
      opacity: le(),
      padding: $(),
      saturate: le(),
      scale: le(),
      sepia: ee(),
      skew: le(),
      space: $(),
      translate: $()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", V]
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
        columns: [Ie]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Ge()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Ge()
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
        object: [...ue(), V]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: I()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": I()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": I()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
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
        z: ["auto", at, V]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: U()
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
        flex: ["1", "auto", "initial", "none", V]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ee()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ee()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", at, V]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [lt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", at, V]
        }, V]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": N()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": N()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [lt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [at, V]
        }, V]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": N()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": N()
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
        "auto-cols": ["auto", "min", "max", "fr", V]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", V]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [m]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [m]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [m]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...ne()]
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
        content: ["normal", ...ne(), "baseline"]
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
        "place-content": [...ne(), "baseline"]
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
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
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
        "space-x": [S]
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
        "space-y": [S]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", V, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [V, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [V, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [Ie]
        }, Ie]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [V, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [V, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [V, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [V, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Ie, Pe]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Vt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [lt]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", V]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Xe, Vt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", ke, V]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", V]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", V]
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
        "placeholder-opacity": [y]
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
        "text-opacity": [y]
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
        decoration: [...K(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", ke, Pe]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", ke, V]
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
        indent: $()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", V]
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
        content: ["none", V]
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
        "bg-opacity": [y]
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
        bg: [...ue(), Mo]
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
        bg: ["auto", "cover", "contain", Io]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, $o]
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
        from: [v]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [v]
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
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
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
        "border-opacity": [y]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...K(), "hidden"]
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
        "divide-opacity": [y]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: K()
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
        outline: ["", ...K()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ke, V]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [ke, Pe]
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
        "ring-opacity": [y]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [ke, Pe]
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
        shadow: ["", "inner", "none", Ie, Vo]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [lt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [y]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...te(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": te()
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
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Ie, V]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [s]
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
        sepia: [x]
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
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [s]
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
        "backdrop-opacity": [y]
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
        "backdrop-sepia": [x]
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
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", V]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: le()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", V]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: le()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", V]
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
        scale: [k]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [k]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [k]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [at, V]
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
        "skew-x": [E]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [E]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", V]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", V]
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
        "scroll-m": $()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": $()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": $()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": $()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": $()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": $()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": $()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": $()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": $()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": $()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": $()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": $()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": $()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": $()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": $()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": $()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": $()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": $()
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
        "will-change": ["auto", "scroll", "contents", "transform", V]
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
        stroke: [ke, Pe, Vt]
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
}, Fo = /* @__PURE__ */ Co(No);
function G(...e) {
  return Fo(lr(e));
}
const fr = {
  __name: "Card",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(
        f(G)(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          t.class
        )
      )
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, zo = {
  __name: "CardHeader",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(f(G)("flex flex-col gap-y-1.5 p-6", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, jo = {
  __name: "CardTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("h3", {
      class: X(
        f(G)("text-2xl font-semibold leading-none tracking-tight", t.class)
      )
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Wo = {
  __name: "CardDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("p", {
      class: X(f(G)("text-sm text-muted-foreground", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, pr = {
  __name: "CardContent",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(f(G)("p-6 pt-0", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Ho = ["top", "right", "bottom", "left"], Re = Math.min, de = Math.max, wt = Math.round, vt = Math.floor, be = (e) => ({
  x: e,
  y: e
}), Go = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Uo = {
  start: "end",
  end: "start"
};
function Ut(e, t, n) {
  return de(e, Re(t, n));
}
function Ae(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ee(e) {
  return e.split("-")[0];
}
function tt(e) {
  return e.split("-")[1];
}
function sn(e) {
  return e === "x" ? "y" : "x";
}
function un(e) {
  return e === "y" ? "height" : "width";
}
function $e(e) {
  return ["top", "bottom"].includes(Ee(e)) ? "y" : "x";
}
function dn(e) {
  return sn($e(e));
}
function Ko(e, t, n) {
  n === void 0 && (n = !1);
  const r = tt(e), o = dn(e), a = un(o);
  let l = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (l = xt(l)), [l, xt(l)];
}
function Yo(e) {
  const t = xt(e);
  return [Kt(e), t, Kt(t)];
}
function Kt(e) {
  return e.replace(/start|end/g, (t) => Uo[t]);
}
function Xo(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], l = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? a : l;
    default:
      return [];
  }
}
function Zo(e, t, n, r) {
  const o = tt(e);
  let a = Xo(Ee(e), n === "start", r);
  return o && (a = a.map((l) => l + "-" + o), t && (a = a.concat(a.map(Kt)))), a;
}
function xt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Go[t]);
}
function Jo(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function mr(e) {
  return typeof e != "number" ? Jo(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Ct(e) {
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
function In(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = $e(t), l = dn(t), i = un(l), c = Ee(t), d = a === "y", s = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, m = r[i] / 2 - o[i] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: s,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: s,
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
  switch (tt(t)) {
    case "start":
      p[l] -= m * (n && d ? -1 : 1);
      break;
    case "end":
      p[l] += m * (n && d ? -1 : 1);
      break;
  }
  return p;
}
const Qo = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: l
  } = n, i = a.filter(Boolean), c = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let d = await l.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: s,
    y: u
  } = In(d, r, c), m = r, p = {}, v = 0;
  for (let g = 0; g < i.length; g++) {
    const {
      name: h,
      fn: y
    } = i[g], {
      x: w,
      y: b,
      data: k,
      reset: x
    } = await y({
      x: s,
      y: u,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: p,
      rects: d,
      platform: l,
      elements: {
        reference: e,
        floating: t
      }
    });
    s = w ?? s, u = b ?? u, p = {
      ...p,
      [h]: {
        ...p[h],
        ...k
      }
    }, x && v <= 50 && (v++, typeof x == "object" && (x.placement && (m = x.placement), x.rects && (d = x.rects === !0 ? await l.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : x.rects), {
      x: s,
      y: u
    } = In(d, m, c)), g = -1);
  }
  return {
    x: s,
    y: u,
    placement: m,
    strategy: o,
    middlewareData: p
  };
};
async function it(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: l,
    elements: i,
    strategy: c
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: s = "viewport",
    elementContext: u = "floating",
    altBoundary: m = !1,
    padding: p = 0
  } = Ae(t, e), v = mr(p), h = i[m ? u === "floating" ? "reference" : "floating" : u], y = Ct(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(h))) == null || n ? h : h.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: d,
    rootBoundary: s,
    strategy: c
  })), w = u === "floating" ? {
    x: r,
    y: o,
    width: l.floating.width,
    height: l.floating.height
  } : l.reference, b = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), k = await (a.isElement == null ? void 0 : a.isElement(b)) ? await (a.getScale == null ? void 0 : a.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, x = Ct(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: w,
    offsetParent: b,
    strategy: c
  }) : w);
  return {
    top: (y.top - x.top + v.top) / k.y,
    bottom: (x.bottom - y.bottom + v.bottom) / k.y,
    left: (y.left - x.left + v.left) / k.x,
    right: (x.right - y.right + v.right) / k.x
  };
}
const ea = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: l,
      elements: i,
      middlewareData: c
    } = t, {
      element: d,
      padding: s = 0
    } = Ae(e, t) || {};
    if (d == null)
      return {};
    const u = mr(s), m = {
      x: n,
      y: r
    }, p = dn(o), v = un(p), g = await l.getDimensions(d), h = p === "y", y = h ? "top" : "left", w = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", k = a.reference[v] + a.reference[p] - m[p] - a.floating[v], x = m[p] - a.reference[p], E = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(d));
    let S = E ? E[b] : 0;
    (!S || !await (l.isElement == null ? void 0 : l.isElement(E))) && (S = i.floating[b] || a.floating[v]);
    const R = k / 2 - x / 2, D = S / 2 - g[v] / 2 - 1, I = Re(u[y], D), U = Re(u[w], D), $ = I, Z = S - g[v] - U, N = S / 2 - g[v] / 2 + R, ue = Ut($, N, Z), K = !c.arrow && tt(o) != null && N !== ue && a.reference[v] / 2 - (N < $ ? I : U) - g[v] / 2 < 0, te = K ? N < $ ? N - $ : N - Z : 0;
    return {
      [p]: m[p] + te,
      data: {
        [p]: ue,
        centerOffset: N - ue - te,
        ...K && {
          alignmentOffset: te
        }
      },
      reset: K
    };
  }
}), ta = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: l,
        initialPlacement: i,
        platform: c,
        elements: d
      } = t, {
        mainAxis: s = !0,
        crossAxis: u = !0,
        fallbackPlacements: m,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...h
      } = Ae(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const y = Ee(o), w = $e(i), b = Ee(i) === i, k = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), x = m || (b || !g ? [xt(i)] : Yo(i)), E = v !== "none";
      !m && E && x.push(...Zo(i, g, v, k));
      const S = [i, ...x], R = await it(t, h), D = [];
      let I = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (s && D.push(R[y]), u) {
        const N = Ko(o, l, k);
        D.push(R[N[0]], R[N[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: D
      }], !D.every((N) => N <= 0)) {
        var U, $;
        const N = (((U = a.flip) == null ? void 0 : U.index) || 0) + 1, ue = S[N];
        if (ue)
          return {
            data: {
              index: N,
              overflows: I
            },
            reset: {
              placement: ue
            }
          };
        let K = ($ = I.filter((te) => te.overflows[0] <= 0).sort((te, ne) => te.overflows[1] - ne.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!K)
          switch (p) {
            case "bestFit": {
              var Z;
              const te = (Z = I.filter((ne) => {
                if (E) {
                  const ee = $e(ne.placement);
                  return ee === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ee === "y";
                }
                return !0;
              }).map((ne) => [ne.placement, ne.overflows.filter((ee) => ee > 0).reduce((ee, Ge) => ee + Ge, 0)]).sort((ne, ee) => ne[1] - ee[1])[0]) == null ? void 0 : Z[0];
              te && (K = te);
              break;
            }
            case "initialPlacement":
              K = i;
              break;
          }
        if (o !== K)
          return {
            reset: {
              placement: K
            }
          };
      }
      return {};
    }
  };
};
function Mn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Rn(e) {
  return Ho.some((t) => e[t] >= 0);
}
const na = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ae(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await it(t, {
            ...o,
            elementContext: "reference"
          }), l = Mn(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: l,
              referenceHidden: Rn(l)
            }
          };
        }
        case "escaped": {
          const a = await it(t, {
            ...o,
            altBoundary: !0
          }), l = Mn(a, n.floating);
          return {
            data: {
              escapedOffsets: l,
              escaped: Rn(l)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function ra(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), l = Ee(n), i = tt(n), c = $e(n) === "y", d = ["left", "top"].includes(l) ? -1 : 1, s = a && c ? -1 : 1, u = Ae(t, e);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: v
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: u.mainAxis || 0,
    crossAxis: u.crossAxis || 0,
    alignmentAxis: u.alignmentAxis
  };
  return i && typeof v == "number" && (p = i === "end" ? v * -1 : v), c ? {
    x: p * s,
    y: m * d
  } : {
    x: m * d,
    y: p * s
  };
}
const oa = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: l,
        middlewareData: i
      } = t, c = await ra(t, e);
      return l === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: l
        }
      };
    }
  };
}, aa = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: l = !1,
        limiter: i = {
          fn: (h) => {
            let {
              x: y,
              y: w
            } = h;
            return {
              x: y,
              y: w
            };
          }
        },
        ...c
      } = Ae(e, t), d = {
        x: n,
        y: r
      }, s = await it(t, c), u = $e(Ee(o)), m = sn(u);
      let p = d[m], v = d[u];
      if (a) {
        const h = m === "y" ? "top" : "left", y = m === "y" ? "bottom" : "right", w = p + s[h], b = p - s[y];
        p = Ut(w, p, b);
      }
      if (l) {
        const h = u === "y" ? "top" : "left", y = u === "y" ? "bottom" : "right", w = v + s[h], b = v - s[y];
        v = Ut(w, v, b);
      }
      const g = i.fn({
        ...t,
        [m]: p,
        [u]: v
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r,
          enabled: {
            [m]: a,
            [u]: l
          }
        }
      };
    }
  };
}, la = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: l
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: d = !0
      } = Ae(e, t), s = {
        x: n,
        y: r
      }, u = $e(o), m = sn(u);
      let p = s[m], v = s[u];
      const g = Ae(i, t), h = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const b = m === "y" ? "height" : "width", k = a.reference[m] - a.floating[b] + h.mainAxis, x = a.reference[m] + a.reference[b] - h.mainAxis;
        p < k ? p = k : p > x && (p = x);
      }
      if (d) {
        var y, w;
        const b = m === "y" ? "width" : "height", k = ["top", "left"].includes(Ee(o)), x = a.reference[u] - a.floating[b] + (k && ((y = l.offset) == null ? void 0 : y[u]) || 0) + (k ? 0 : h.crossAxis), E = a.reference[u] + a.reference[b] + (k ? 0 : ((w = l.offset) == null ? void 0 : w[u]) || 0) - (k ? h.crossAxis : 0);
        v < x ? v = x : v > E && (v = E);
      }
      return {
        [m]: p,
        [u]: v
      };
    }
  };
}, sa = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: l,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...d
      } = Ae(e, t), s = await it(t, d), u = Ee(o), m = tt(o), p = $e(o) === "y", {
        width: v,
        height: g
      } = a.floating;
      let h, y;
      u === "top" || u === "bottom" ? (h = u, y = m === (await (l.isRTL == null ? void 0 : l.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (y = u, h = m === "end" ? "top" : "bottom");
      const w = g - s.top - s.bottom, b = v - s.left - s.right, k = Re(g - s[h], w), x = Re(v - s[y], b), E = !t.middlewareData.shift;
      let S = k, R = x;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (R = b), (r = t.middlewareData.shift) != null && r.enabled.y && (S = w), E && !m) {
        const I = de(s.left, 0), U = de(s.right, 0), $ = de(s.top, 0), Z = de(s.bottom, 0);
        p ? R = v - 2 * (I !== 0 || U !== 0 ? I + U : de(s.left, s.right)) : S = g - 2 * ($ !== 0 || Z !== 0 ? $ + Z : de(s.top, s.bottom));
      }
      await c({
        ...t,
        availableWidth: R,
        availableHeight: S
      });
      const D = await l.getDimensions(i.floating);
      return v !== D.width || g !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function St() {
  return typeof window < "u";
}
function We(e) {
  return cn(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ce(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ce(e) {
  var t;
  return (t = (cn(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function cn(e) {
  return St() ? e instanceof Node || e instanceof ce(e).Node : !1;
}
function ve(e) {
  return St() ? e instanceof Element || e instanceof ce(e).Element : !1;
}
function xe(e) {
  return St() ? e instanceof HTMLElement || e instanceof ce(e).HTMLElement : !1;
}
function $n(e) {
  return !St() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ce(e).ShadowRoot;
}
function ct(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = he(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function ia(e) {
  return ["table", "td", "th"].includes(We(e));
}
function At(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function fn(e) {
  const t = pn(), n = ve(e) ? he(e) : e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function ua(e) {
  let t = Ve(e);
  for (; xe(t) && !Je(t); ) {
    if (fn(t))
      return t;
    if (At(t))
      return null;
    t = Ve(t);
  }
  return null;
}
function pn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Je(e) {
  return ["html", "body", "#document"].includes(We(e));
}
function he(e) {
  return ce(e).getComputedStyle(e);
}
function Et(e) {
  return ve(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ve(e) {
  if (We(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    $n(e) && e.host || // Fallback.
    Ce(e)
  );
  return $n(t) ? t.host : t;
}
function vr(e) {
  const t = Ve(e);
  return Je(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : xe(t) && ct(t) ? t : vr(t);
}
function ut(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = vr(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), l = ce(o);
  if (a) {
    const i = Yt(l);
    return t.concat(l, l.visualViewport || [], ct(o) ? o : [], i && n ? ut(i) : []);
  }
  return t.concat(o, ut(o, [], n));
}
function Yt(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function hr(e) {
  const t = he(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = xe(e), a = o ? e.offsetWidth : n, l = o ? e.offsetHeight : r, i = wt(n) !== a || wt(r) !== l;
  return i && (n = a, r = l), {
    width: n,
    height: r,
    $: i
  };
}
function mn(e) {
  return ve(e) ? e : e.contextElement;
}
function Ze(e) {
  const t = mn(e);
  if (!xe(t))
    return be(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = hr(t);
  let l = (a ? wt(n.width) : n.width) / r, i = (a ? wt(n.height) : n.height) / o;
  return (!l || !Number.isFinite(l)) && (l = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: l,
    y: i
  };
}
const da = /* @__PURE__ */ be(0);
function gr(e) {
  const t = ce(e);
  return !pn() || !t.visualViewport ? da : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ca(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ce(e) ? !1 : t;
}
function je(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = mn(e);
  let l = be(1);
  t && (r ? ve(r) && (l = Ze(r)) : l = Ze(e));
  const i = ca(a, n, r) ? gr(a) : be(0);
  let c = (o.left + i.x) / l.x, d = (o.top + i.y) / l.y, s = o.width / l.x, u = o.height / l.y;
  if (a) {
    const m = ce(a), p = r && ve(r) ? ce(r) : r;
    let v = m, g = Yt(v);
    for (; g && r && p !== v; ) {
      const h = Ze(g), y = g.getBoundingClientRect(), w = he(g), b = y.left + (g.clientLeft + parseFloat(w.paddingLeft)) * h.x, k = y.top + (g.clientTop + parseFloat(w.paddingTop)) * h.y;
      c *= h.x, d *= h.y, s *= h.x, u *= h.y, c += b, d += k, v = ce(g), g = Yt(v);
    }
  }
  return Ct({
    width: s,
    height: u,
    x: c,
    y: d
  });
}
function vn(e, t) {
  const n = Et(e).scrollLeft;
  return t ? t.left + n : je(Ce(e)).left + n;
}
function yr(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    vn(e, r)
  )), a = r.top + t.scrollTop;
  return {
    x: o,
    y: a
  };
}
function fa(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", l = Ce(r), i = t ? At(t.floating) : !1;
  if (r === l || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = be(1);
  const s = be(0), u = xe(r);
  if ((u || !u && !a) && ((We(r) !== "body" || ct(l)) && (c = Et(r)), xe(r))) {
    const p = je(r);
    d = Ze(r), s.x = p.x + r.clientLeft, s.y = p.y + r.clientTop;
  }
  const m = l && !u && !a ? yr(l, c, !0) : be(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - c.scrollLeft * d.x + s.x + m.x,
    y: n.y * d.y - c.scrollTop * d.y + s.y + m.y
  };
}
function pa(e) {
  return Array.from(e.getClientRects());
}
function ma(e) {
  const t = Ce(e), n = Et(e), r = e.ownerDocument.body, o = de(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = de(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let l = -n.scrollLeft + vn(e);
  const i = -n.scrollTop;
  return he(r).direction === "rtl" && (l += de(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: l,
    y: i
  };
}
function va(e, t) {
  const n = ce(e), r = Ce(e), o = n.visualViewport;
  let a = r.clientWidth, l = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, l = o.height;
    const d = pn();
    (!d || d && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: l,
    x: i,
    y: c
  };
}
function ha(e, t) {
  const n = je(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = xe(e) ? Ze(e) : be(1), l = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, d = r * a.y;
  return {
    width: l,
    height: i,
    x: c,
    y: d
  };
}
function Vn(e, t, n) {
  let r;
  if (t === "viewport")
    r = va(e, n);
  else if (t === "document")
    r = ma(Ce(e));
  else if (ve(t))
    r = ha(t, n);
  else {
    const o = gr(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Ct(r);
}
function br(e, t) {
  const n = Ve(e);
  return n === t || !ve(n) || Je(n) ? !1 : he(n).position === "fixed" || br(n, t);
}
function ga(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ut(e, [], !1).filter((i) => ve(i) && We(i) !== "body"), o = null;
  const a = he(e).position === "fixed";
  let l = a ? Ve(e) : e;
  for (; ve(l) && !Je(l); ) {
    const i = he(l), c = fn(l);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || ct(l) && !c && br(e, l)) ? r = r.filter((s) => s !== l) : o = i, l = Ve(l);
  }
  return t.set(e, r), r;
}
function ya(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const l = [...n === "clippingAncestors" ? At(t) ? [] : ga(t, this._c) : [].concat(n), r], i = l[0], c = l.reduce((d, s) => {
    const u = Vn(t, s, o);
    return d.top = de(u.top, d.top), d.right = Re(u.right, d.right), d.bottom = Re(u.bottom, d.bottom), d.left = de(u.left, d.left), d;
  }, Vn(t, i, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function ba(e) {
  const {
    width: t,
    height: n
  } = hr(e);
  return {
    width: t,
    height: n
  };
}
function wa(e, t, n) {
  const r = xe(t), o = Ce(t), a = n === "fixed", l = je(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = be(0);
  if (r || !r && !a)
    if ((We(t) !== "body" || ct(o)) && (i = Et(t)), r) {
      const m = je(t, !0, a, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else o && (c.x = vn(o));
  const d = o && !r && !a ? yr(o, i) : be(0), s = l.left + i.scrollLeft - c.x - d.x, u = l.top + i.scrollTop - c.y - d.y;
  return {
    x: s,
    y: u,
    width: l.width,
    height: l.height
  };
}
function qt(e) {
  return he(e).position === "static";
}
function qn(e, t) {
  if (!xe(e) || he(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Ce(e) === n && (n = n.ownerDocument.body), n;
}
function wr(e, t) {
  const n = ce(e);
  if (At(e))
    return n;
  if (!xe(e)) {
    let o = Ve(e);
    for (; o && !Je(o); ) {
      if (ve(o) && !qt(o))
        return o;
      o = Ve(o);
    }
    return n;
  }
  let r = qn(e, t);
  for (; r && ia(r) && qt(r); )
    r = qn(r, t);
  return r && Je(r) && qt(r) && !fn(r) ? n : r || ua(e) || n;
}
const xa = async function(e) {
  const t = this.getOffsetParent || wr, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: wa(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Ca(e) {
  return he(e).direction === "rtl";
}
const _a = {
  convertOffsetParentRelativeRectToViewportRelativeRect: fa,
  getDocumentElement: Ce,
  getClippingRect: ya,
  getOffsetParent: wr,
  getElementRects: xa,
  getClientRects: pa,
  getDimensions: ba,
  getScale: Ze,
  isElement: ve,
  isRTL: Ca
};
function ka(e, t) {
  let n = null, r;
  const o = Ce(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function l(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const {
      left: d,
      top: s,
      width: u,
      height: m
    } = e.getBoundingClientRect();
    if (i || t(), !u || !m)
      return;
    const p = vt(s), v = vt(o.clientWidth - (d + u)), g = vt(o.clientHeight - (s + m)), h = vt(d), w = {
      rootMargin: -p + "px " + -v + "px " + -g + "px " + -h + "px",
      threshold: de(0, Re(1, c)) || 1
    };
    let b = !0;
    function k(x) {
      const E = x[0].intersectionRatio;
      if (E !== c) {
        if (!b)
          return l();
        E ? l(!1, E) : r = setTimeout(() => {
          l(!1, 1e-7);
        }, 1e3);
      }
      b = !1;
    }
    try {
      n = new IntersectionObserver(k, {
        ...w,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(k, w);
    }
    n.observe(e);
  }
  return l(!0), a;
}
function Sa(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: l = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, d = mn(e), s = o || a ? [...d ? ut(d) : [], ...ut(t)] : [];
  s.forEach((y) => {
    o && y.addEventListener("scroll", n, {
      passive: !0
    }), a && y.addEventListener("resize", n);
  });
  const u = d && i ? ka(d, n) : null;
  let m = -1, p = null;
  l && (p = new ResizeObserver((y) => {
    let [w] = y;
    w && w.target === d && p && (p.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var b;
      (b = p) == null || b.observe(t);
    })), n();
  }), d && !c && p.observe(d), p.observe(t));
  let v, g = c ? je(e) : null;
  c && h();
  function h() {
    const y = je(e);
    g && (y.x !== g.x || y.y !== g.y || y.width !== g.width || y.height !== g.height) && n(), g = y, v = requestAnimationFrame(h);
  }
  return n(), () => {
    var y;
    s.forEach((w) => {
      o && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), u == null || u(), (y = p) == null || y.disconnect(), p = null, c && cancelAnimationFrame(v);
  };
}
const Aa = oa, Ea = aa, Dn = ta, Ta = sa, Oa = na, Ba = ea, Pa = la, Ia = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: _a,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Qo(e, t, {
    ...o,
    platform: a
  });
};
function Ma(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Xt(e) {
  if (Ma(e)) {
    const t = e.$el;
    return cn(t) && We(t) === "#comment" ? null : t;
  }
  return e;
}
function Ye(e) {
  return typeof e == "function" ? e() : f(e);
}
function Ra(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Xt(Ye(e.element));
      return n == null ? {} : Ba({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function xr(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ln(e, t) {
  const n = xr(e);
  return Math.round(t * n) / n;
}
function $a(e, t, n) {
  n === void 0 && (n = {});
  const r = n.whileElementsMounted, o = O(() => {
    var S;
    return (S = Ye(n.open)) != null ? S : !0;
  }), a = O(() => Ye(n.middleware)), l = O(() => {
    var S;
    return (S = Ye(n.placement)) != null ? S : "bottom";
  }), i = O(() => {
    var S;
    return (S = Ye(n.strategy)) != null ? S : "absolute";
  }), c = O(() => {
    var S;
    return (S = Ye(n.transform)) != null ? S : !0;
  }), d = O(() => Xt(e.value)), s = O(() => Xt(t.value)), u = T(0), m = T(0), p = T(i.value), v = T(l.value), g = Xn({}), h = T(!1), y = O(() => {
    const S = {
      position: p.value,
      left: "0",
      top: "0"
    };
    if (!s.value)
      return S;
    const R = Ln(s.value, u.value), D = Ln(s.value, m.value);
    return c.value ? {
      ...S,
      transform: "translate(" + R + "px, " + D + "px)",
      ...xr(s.value) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: p.value,
      left: R + "px",
      top: D + "px"
    };
  });
  let w;
  function b() {
    if (d.value == null || s.value == null)
      return;
    const S = o.value;
    Ia(d.value, s.value, {
      middleware: a.value,
      placement: l.value,
      strategy: i.value
    }).then((R) => {
      u.value = R.x, m.value = R.y, p.value = R.strategy, v.value = R.placement, g.value = R.middlewareData, h.value = S !== !1;
    });
  }
  function k() {
    typeof w == "function" && (w(), w = void 0);
  }
  function x() {
    if (k(), r === void 0) {
      b();
      return;
    }
    if (d.value != null && s.value != null) {
      w = r(d.value, s.value, b);
      return;
    }
  }
  function E() {
    o.value || (h.value = !1);
  }
  return H([a, l, i, o], b, {
    flush: "sync"
  }), H([d, s], x, {
    flush: "sync"
  }), H(o, E, {
    flush: "sync"
  }), Qt() && en(k), {
    x: Ue(u),
    y: Ue(m),
    strategy: Ue(p),
    placement: Ue(v),
    middlewareData: Ue(g),
    isPositioned: Ue(h),
    floatingStyles: y,
    update: b
  };
}
function ie(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
  return [(o) => {
    const a = rr(r, o);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (o) => (or(r, o), o)];
}
function Cr(e, t, n) {
  const r = n.originalEvent.target, o = new CustomEvent(e, {
    bubbles: !1,
    cancelable: !0,
    detail: n
  });
  t && r.addEventListener(e, t, { once: !0 }), r.dispatchEvent(o);
}
function Nn(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(n, Math.max(t, e));
}
function hn(e) {
  return e == null;
}
function Va(e, t) {
  var n;
  const r = Xn();
  return ae(() => {
    r.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), lo(r);
}
function gn(e) {
  return Qt() ? (en(e), !0) : !1;
}
function qa(e) {
  let t = !1, n;
  const r = er(!0);
  return (...o) => (t || (n = r.run(() => e(...o)), t = !0), n);
}
function Da(e) {
  let t = 0, n, r;
  const o = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...a) => (t += 1, n || (r = er(!0), n = r.run(() => e(...a))), gn(o), n);
}
function ze(e) {
  return typeof e == "function" ? e() : f(e);
}
const De = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const La = (e) => typeof e < "u", Na = Object.prototype.toString, Fa = (e) => Na.call(e) === "[object Object]", za = () => {
}, Fn = /* @__PURE__ */ ja();
function ja() {
  var e, t;
  return De && ((e = window == null ? void 0 : window.navigator) == null ? void 0 : e.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((t = window == null ? void 0 : window.navigator) == null ? void 0 : t.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function Wa(e) {
  return Te();
}
function Ha(e, t = 1e4) {
  return to((n, r) => {
    let o = ze(e), a;
    const l = () => setTimeout(() => {
      o = ze(e), r();
    }, ze(t));
    return gn(() => {
      clearTimeout(a);
    }), {
      get() {
        return n(), o;
      },
      set(i) {
        o = i, r(), clearTimeout(a), a = l();
      }
    };
  });
}
function Ga(e, t) {
  Wa() && on(e, t);
}
function Be(e) {
  var t;
  const n = ze(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const yn = De ? window : void 0;
function _t(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = yn) : [t, n, r, o] = e, !t)
    return za;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const a = [], l = () => {
    a.forEach((s) => s()), a.length = 0;
  }, i = (s, u, m, p) => (s.addEventListener(u, m, p), () => s.removeEventListener(u, m, p)), c = H(
    () => [Be(t), ze(o)],
    ([s, u]) => {
      if (l(), !s)
        return;
      const m = Fa(u) ? { ...u } : u;
      a.push(
        ...n.flatMap((p) => r.map((v) => i(s, p, v, m)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    c(), l();
  };
  return gn(d), d;
}
function Ua(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Ka(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: o = yn,
    eventName: a = "keydown",
    passive: l = !1,
    dedupe: i = !1
  } = r, c = Ua(t);
  return _t(o, a, (d) => {
    d.repeat && ze(i) || c(d) && n(d);
  }, l);
}
function Ya() {
  const e = T(!1), t = Te();
  return t && ge(() => {
    e.value = !0;
  }, t), e;
}
function Xa(e) {
  return JSON.parse(JSON.stringify(e));
}
function qe(e, t, n, r = {}) {
  var o, a, l;
  const {
    clone: i = !1,
    passive: c = !1,
    eventName: d,
    deep: s = !1,
    defaultValue: u,
    shouldEmit: m
  } = r, p = Te(), v = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((l = (a = p == null ? void 0 : p.proxy) == null ? void 0 : a.$emit) == null ? void 0 : l.bind(p == null ? void 0 : p.proxy));
  let g = d;
  t || (t = "modelValue"), g = g || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : Xa(b) : b, y = () => La(e[t]) ? h(e[t]) : u, w = (b) => {
    m ? m(b) && v(g, b) : v(g, b);
  };
  if (c) {
    const b = y(), k = T(b);
    let x = !1;
    return H(
      () => e[t],
      (E) => {
        x || (x = !0, k.value = h(E), se(() => x = !1));
      }
    ), H(
      k,
      (E) => {
        !x && (E !== e[t] || s) && w(E);
      },
      { deep: s }
    ), k;
  } else
    return O({
      get() {
        return y();
      },
      set(b) {
        w(b);
      }
    });
}
function bn(e) {
  return e ? e.flatMap((t) => t.type === we ? bn(t.children) : [t]) : [];
}
function Dt(e) {
  if (e === null || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  return t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.iterator in e ? !1 : Symbol.toStringTag in e ? Object.prototype.toString.call(e) === "[object Module]" : !0;
}
function Zt(e, t, n = ".", r) {
  if (!Dt(t))
    return Zt(e, {}, n);
  const o = Object.assign({}, t);
  for (const a in e) {
    if (a === "__proto__" || a === "constructor")
      continue;
    const l = e[a];
    l != null && (Array.isArray(l) && Array.isArray(o[a]) ? o[a] = [...l, ...o[a]] : Dt(l) && Dt(o[a]) ? o[a] = Zt(
      l,
      o[a],
      (n ? `${n}.` : "") + a.toString()
    ) : o[a] = l);
  }
  return o;
}
function Za(e) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((n, r) => Zt(n, r, ""), {})
  );
}
const Ja = Za(), [Tt, qu] = ie("ConfigProvider");
let Qa = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", el = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Qa[Math.random() * 64 | 0];
  return t;
};
const tl = Da(() => {
  const e = T(/* @__PURE__ */ new Map()), t = T(), n = O(() => {
    for (const l of e.value.values())
      if (l)
        return !0;
    return !1;
  }), r = Tt({
    scrollBody: T(!0)
  });
  let o = null;
  const a = () => {
    document.body.style.paddingRight = "", document.body.style.marginRight = "", document.body.style.pointerEvents = "", document.body.style.removeProperty("--scrollbar-width"), document.body.style.overflow = t.value ?? "", Fn && (o == null || o()), t.value = void 0;
  };
  return H(n, (l, i) => {
    var c;
    if (!De)
      return;
    if (!l) {
      i && a();
      return;
    }
    t.value === void 0 && (t.value = document.body.style.overflow);
    const d = window.innerWidth - document.documentElement.clientWidth, s = { padding: d, margin: 0 }, u = (c = r.scrollBody) != null && c.value ? typeof r.scrollBody.value == "object" ? Ja({
      padding: r.scrollBody.value.padding === !0 ? d : r.scrollBody.value.padding,
      margin: r.scrollBody.value.margin === !0 ? d : r.scrollBody.value.margin
    }, s) : s : { padding: 0, margin: 0 };
    d > 0 && (document.body.style.paddingRight = typeof u.padding == "number" ? `${u.padding}px` : String(u.padding), document.body.style.marginRight = typeof u.margin == "number" ? `${u.margin}px` : String(u.margin), document.body.style.setProperty("--scrollbar-width", `${d}px`), document.body.style.overflow = "hidden"), Fn && (o = _t(
      document,
      "touchmove",
      (m) => rl(m),
      { passive: !1 }
    )), se(() => {
      document.body.style.pointerEvents = "none", document.body.style.overflow = "hidden";
    });
  }, { immediate: !0, flush: "sync" }), e;
});
function nl(e) {
  const t = el(6), n = tl();
  n.value.set(t, e ?? !1);
  const r = O({
    get: () => n.value.get(t) ?? !1,
    set: (o) => n.value.set(t, o)
  });
  return Ga(() => {
    n.value.delete(t);
  }), r;
}
function _r(e) {
  const t = window.getComputedStyle(e);
  if (t.overflowX === "scroll" || t.overflowY === "scroll" || t.overflowX === "auto" && e.clientWidth < e.scrollWidth || t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : _r(n);
  }
}
function rl(e) {
  const t = e || window.event, n = t.target;
  return n instanceof Element && _r(n) ? !1 : t.touches.length > 1 ? !0 : (t.preventDefault && t.cancelable && t.preventDefault(), !1);
}
const ol = "data-radix-vue-collection-item";
function Ot(e, t = ol) {
  const n = Symbol();
  return { createCollection: (r) => {
    const o = T([]);
    function a() {
      const l = Be(r);
      return l ? o.value = Array.from(
        l.querySelectorAll(`[${t}]:not([data-disabled])`)
      ) : o.value = [];
    }
    return no(() => {
      o.value = [];
    }), ge(a), ro(a), H(() => r == null ? void 0 : r.value, a, { immediate: !0 }), or(n, o), o;
  }, injectCollection: () => rr(n, T([])) };
}
function wn(e) {
  const t = Tt({
    dir: T("ltr")
  });
  return O(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function al(e) {
  const t = Te(), n = t == null ? void 0 : t.type.emits, r = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((o) => {
    r[Qr(Zn(o))] = (...a) => e(o, ...a);
  }), r;
}
let Lt = 0;
function ll() {
  ae((e) => {
    if (!De)
      return;
    const t = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      t[0] ?? zn()
    ), document.body.insertAdjacentElement(
      "beforeend",
      t[1] ?? zn()
    ), Lt++, e(() => {
      Lt === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((n) => n.remove()), Lt--;
    });
  });
}
function zn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
function xn(e) {
  return O(() => {
    var t;
    return ze(e) ? !!((t = Be(e)) != null && t.closest("form")) : !0;
  });
}
function Le(e) {
  const t = Te(), n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((o, a) => {
    const l = (t == null ? void 0 : t.type.props[a]).default;
    return l !== void 0 && (o[a] = l), o;
  }, {}), r = Yr(e);
  return O(() => {
    const o = {}, a = (t == null ? void 0 : t.vnode.props) ?? {};
    return Object.keys(a).forEach((l) => {
      o[Zn(l)] = a[l];
    }), Object.keys({ ...n, ...o }).reduce((l, i) => (r.value[i] !== void 0 && (l[i] = r.value[i]), l), {});
  });
}
function ft(e, t) {
  const n = Le(e), r = t ? al(t) : {};
  return O(() => ({
    ...n.value,
    ...r
  }));
}
function Y() {
  const e = Te(), t = T(), n = O(() => {
    var l, i;
    return ["#text", "#comment"].includes((l = t.value) == null ? void 0 : l.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : Be(t);
  }), r = Object.assign({}, e.exposed), o = {};
  for (const l in e.props)
    Object.defineProperty(o, l, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[l]
    });
  if (Object.keys(r).length > 0)
    for (const l in r)
      Object.defineProperty(o, l, {
        enumerable: !0,
        configurable: !0,
        get: () => r[l]
      });
  Object.defineProperty(o, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = o;
  function a(l) {
    t.value = l, !(l instanceof Element || !l) && (Object.defineProperty(o, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => l.$el
    }), e.exposed = o);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
var sl = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ke = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), gt = {}, Nt = 0, kr = function(e) {
  return e && (e.host || kr(e.parentNode));
}, il = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = kr(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, ul = function(e, t, n, r) {
  var o = il(t, Array.isArray(e) ? e : [e]);
  gt[n] || (gt[n] = /* @__PURE__ */ new WeakMap());
  var a = gt[n], l = [], i = /* @__PURE__ */ new Set(), c = new Set(o), d = function(u) {
    !u || i.has(u) || (i.add(u), d(u.parentNode));
  };
  o.forEach(d);
  var s = function(u) {
    !u || c.has(u) || Array.prototype.forEach.call(u.children, function(m) {
      if (i.has(m))
        s(m);
      else
        try {
          var p = m.getAttribute(r), v = p !== null && p !== "false", g = (Ke.get(m) || 0) + 1, h = (a.get(m) || 0) + 1;
          Ke.set(m, g), a.set(m, h), l.push(m), g === 1 && v && ht.set(m, !0), h === 1 && m.setAttribute(n, "true"), v || m.setAttribute(r, "true");
        } catch (y) {
          console.error("aria-hidden: cannot operate on ", m, y);
        }
    });
  };
  return s(t), i.clear(), Nt++, function() {
    l.forEach(function(u) {
      var m = Ke.get(u) - 1, p = a.get(u) - 1;
      Ke.set(u, m), a.set(u, p), m || (ht.has(u) || u.removeAttribute(r), ht.delete(u)), p || u.removeAttribute(n);
    }), Nt--, Nt || (Ke = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), ht = /* @__PURE__ */ new WeakMap(), gt = {});
  };
}, dl = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = sl(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), ul(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
function cl(e) {
  let t;
  H(() => Be(e), (n) => {
    n ? t = dl(n) : t && t();
  }), an(() => {
    t && t();
  });
}
let fl = 0;
function Cn(e, t = "radix") {
  const n = Tt({ useId: void 0 });
  return On.useId ? `${t}-${On.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++fl}`;
}
function pl(e) {
  const t = T(), n = O(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.width) ?? 0;
  }), r = O(() => {
    var o;
    return ((o = t.value) == null ? void 0 : o.height) ?? 0;
  });
  return ge(() => {
    const o = Be(e);
    if (o) {
      t.value = { width: o.offsetWidth, height: o.offsetHeight };
      const a = new ResizeObserver((l) => {
        if (!Array.isArray(l) || !l.length)
          return;
        const i = l[0];
        let c, d;
        if ("borderBoxSize" in i) {
          const s = i.borderBoxSize, u = Array.isArray(s) ? s[0] : s;
          c = u.inlineSize, d = u.blockSize;
        } else
          c = o.offsetWidth, d = o.offsetHeight;
        t.value = { width: c, height: d };
      });
      return a.observe(o, { box: "border-box" }), () => a.unobserve(o);
    } else
      t.value = void 0;
  }), {
    width: n,
    height: r
  };
}
function ml(e, t) {
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
const vl = "data-item-text";
function Sr(e) {
  const t = Ha("", 1e3);
  return {
    search: t,
    handleTypeaheadSearch: (n, r) => {
      if (!(e != null && e.value) && !r)
        return;
      t.value = t.value + n;
      const o = (e == null ? void 0 : e.value) ?? r, a = document.activeElement, l = o.map((u) => {
        var m;
        return {
          ref: u,
          textValue: ((m = (u.querySelector(`[${vl}]`) ?? u).textContent) == null ? void 0 : m.trim()) ?? ""
        };
      }), i = l.find((u) => u.ref === a), c = l.map((u) => u.textValue), d = gl(c, t.value, i == null ? void 0 : i.textValue), s = l.find((u) => u.textValue === d);
      return s && s.ref.focus(), s == null ? void 0 : s.ref;
    },
    resetTypeahead: () => {
      t.value = "";
    }
  };
}
function hl(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function gl(e, t, n) {
  const r = t.length > 1 && Array.from(t).every((i) => i === t[0]) ? t[0] : t, o = n ? e.indexOf(n) : -1;
  let a = hl(e, Math.max(o, 0));
  r.length === 1 && (a = a.filter((i) => i !== n));
  const l = a.find(
    (i) => i.toLowerCase().startsWith(r.toLowerCase())
  );
  return l !== n ? l : void 0;
}
const _n = q({
  name: "PrimitiveSlot",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r, o;
      if (!n.default)
        return null;
      const a = bn(n.default()), l = a.findIndex((s) => s.type !== Xr);
      if (l === -1)
        return a;
      const i = a[l];
      (r = i.props) == null || delete r.ref;
      const c = i.props ? z(t, i.props) : t;
      t.class && (o = i.props) != null && o.class && delete i.props.class;
      const d = Zr(i, c);
      for (const s in c)
        s.startsWith("on") && (d.props || (d.props = {}), d.props[s] = c[s]);
      return a.length === 1 ? d : (a[l] = d, a);
    };
  }
}), W = q({
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
    return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => ye(r, t) : r !== "template" ? () => ye(e.as, t, { default: n.default }) : () => ye(_n, t, { default: n.default });
  }
});
function kn() {
  const e = T(), t = O(() => {
    var n, r;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : Be(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function yl(e, t) {
  var n;
  const r = T({}), o = T("none"), a = T(e), l = e.value ? "mounted" : "unmounted";
  let i;
  const c = ((n = t.value) == null ? void 0 : n.ownerDocument.defaultView) ?? yn, { state: d, dispatch: s } = ml(l, {
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
    var y;
    if (De) {
      const w = new CustomEvent(h, { bubbles: !1, cancelable: !1 });
      (y = t.value) == null || y.dispatchEvent(w);
    }
  };
  H(
    e,
    async (h, y) => {
      var w;
      const b = y !== h;
      if (await se(), b) {
        const k = o.value, x = yt(t.value);
        h ? (s("MOUNT"), u("enter"), x === "none" && u("after-enter")) : x === "none" || ((w = r.value) == null ? void 0 : w.display) === "none" ? (s("UNMOUNT"), u("leave"), u("after-leave")) : y && k !== x ? (s("ANIMATION_OUT"), u("leave")) : (s("UNMOUNT"), u("after-leave"));
      }
    },
    { immediate: !0 }
  );
  const m = (h) => {
    const y = yt(t.value), w = y.includes(
      h.animationName
    ), b = d.value === "mounted" ? "enter" : "leave";
    if (h.target === t.value && w && (u(`after-${b}`), s("ANIMATION_END"), !a.value)) {
      const k = t.value.style.animationFillMode;
      t.value.style.animationFillMode = "forwards", i = c == null ? void 0 : c.setTimeout(() => {
        var x;
        ((x = t.value) == null ? void 0 : x.style.animationFillMode) === "forwards" && (t.value.style.animationFillMode = k);
      });
    }
    h.target === t.value && y === "none" && s("ANIMATION_END");
  }, p = (h) => {
    h.target === t.value && (o.value = yt(t.value));
  }, v = H(
    t,
    (h, y) => {
      h ? (r.value = getComputedStyle(h), h.addEventListener("animationstart", p), h.addEventListener("animationcancel", m), h.addEventListener("animationend", m)) : (s("ANIMATION_END"), c == null || c.clearTimeout(i), y == null || y.removeEventListener("animationstart", p), y == null || y.removeEventListener("animationcancel", m), y == null || y.removeEventListener("animationend", m));
    },
    { immediate: !0 }
  ), g = H(d, () => {
    const h = yt(t.value);
    o.value = d.value === "mounted" ? h : "none";
  });
  return an(() => {
    v(), g();
  }), {
    isPresent: O(
      () => ["mounted", "unmountSuspended"].includes(d.value)
    )
  };
}
function yt(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const Ar = q({
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
    const { present: o, forceMount: a } = Oe(e), l = T(), { isPresent: i } = yl(o, l);
    n({ present: i });
    let c = t.default({ present: i });
    c = bn(c || []);
    const d = Te();
    if (c && (c == null ? void 0 : c.length) > 1) {
      const s = (r = d == null ? void 0 : d.parent) != null && r.type.name ? `<${d.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${s}\` for  \`Presence\` component.`,
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
    return () => a.value || o.value || i.value ? ye(t.default({ present: i })[0], {
      ref: (s) => {
        const u = Be(s);
        return typeof (u == null ? void 0 : u.hasAttribute) > "u" || (u != null && u.hasAttribute("data-radix-popper-content-wrapper") ? l.value = u.firstElementChild : l.value = u), u;
      }
    }) : null;
  }
}), bl = /* @__PURE__ */ q({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ya();
    return (n, r) => f(t) || n.forceMount ? (_(), P(rn, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      B(n.$slots, "default")
    ], 8, ["to", "disabled"])) : oe("", !0);
  }
}), wl = "dismissableLayer.pointerDownOutside", xl = "dismissableLayer.focusOutside";
function Er(e, t) {
  const n = t.closest(
    "[data-dismissable-layer]"
  ), r = e.dataset.dismissableLayer === "" ? e : e.querySelector(
    "[data-dismissable-layer]"
  ), o = Array.from(
    e.ownerDocument.querySelectorAll("[data-dismissable-layer]")
  );
  return !!(n && r === n || o.indexOf(r) < o.indexOf(n));
}
function Cl(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = T(!1), a = T(() => {
  });
  return ae((l) => {
    if (!De)
      return;
    const i = async (d) => {
      const s = d.target;
      if (t != null && t.value) {
        if (Er(t.value, s)) {
          o.value = !1;
          return;
        }
        if (d.target && !o.value) {
          let u = function() {
            Cr(
              wl,
              e,
              m
            );
          };
          const m = { originalEvent: d };
          d.pointerType === "touch" ? (r.removeEventListener("click", a.value), a.value = u, r.addEventListener("click", a.value, {
            once: !0
          })) : u();
        } else
          r.removeEventListener("click", a.value);
        o.value = !1;
      }
    }, c = window.setTimeout(() => {
      r.addEventListener("pointerdown", i);
    }, 0);
    l(() => {
      window.clearTimeout(c), r.removeEventListener("pointerdown", i), r.removeEventListener("click", a.value);
    });
  }), {
    onPointerDownCapture: () => o.value = !0
  };
}
function _l(e, t) {
  var n;
  const r = ((n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), o = T(!1);
  return ae((a) => {
    if (!De)
      return;
    const l = async (i) => {
      t != null && t.value && (await se(), !(!t.value || Er(t.value, i.target)) && i.target && !o.value && Cr(
        xl,
        e,
        { originalEvent: i }
      ));
    };
    r.addEventListener("focusin", l), a(() => r.removeEventListener("focusin", l));
  }), {
    onFocusCapture: () => o.value = !0,
    onBlurCapture: () => o.value = !1
  };
}
const Se = Jn({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), kl = /* @__PURE__ */ q({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o, currentElement: a } = Y(), l = O(
      () => {
        var v;
        return ((v = a.value) == null ? void 0 : v.ownerDocument) ?? globalThis.document;
      }
    ), i = O(() => Se.layersRoot), c = O(() => a.value ? Array.from(i.value).indexOf(a.value) : -1), d = O(() => Se.layersWithOutsidePointerEventsDisabled.size > 0), s = O(() => {
      const v = Array.from(i.value), [g] = [...Se.layersWithOutsidePointerEventsDisabled].slice(-1), h = v.indexOf(g);
      return c.value >= h;
    }), u = Cl(async (v) => {
      const g = [...Se.branches].some(
        (h) => h == null ? void 0 : h.contains(v.target)
      );
      !s.value || g || (r("pointerDownOutside", v), r("interactOutside", v), await se(), v.defaultPrevented || r("dismiss"));
    }, a), m = _l((v) => {
      [...Se.branches].some(
        (g) => g == null ? void 0 : g.contains(v.target)
      ) || (r("focusOutside", v), r("interactOutside", v), v.defaultPrevented || r("dismiss"));
    }, a);
    Ka("Escape", (v) => {
      c.value === i.value.size - 1 && (r("escapeKeyDown", v), v.defaultPrevented || r("dismiss"));
    });
    let p;
    return ae((v) => {
      a.value && (n.disableOutsidePointerEvents && (Se.layersWithOutsidePointerEventsDisabled.size === 0 && (p = l.value.body.style.pointerEvents, l.value.body.style.pointerEvents = "none"), Se.layersWithOutsidePointerEventsDisabled.add(a.value)), i.value.add(a.value), v(() => {
        n.disableOutsidePointerEvents && Se.layersWithOutsidePointerEventsDisabled.size === 1 && (l.value.body.style.pointerEvents = p);
      }));
    }), ae((v) => {
      v(() => {
        a.value && (i.value.delete(a.value), Se.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (v, g) => (_(), P(f(W), {
      ref: f(o),
      "as-child": v.asChild,
      as: v.as,
      "data-dismissable-layer": "",
      style: kt({
        pointerEvents: d.value ? s.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: f(m).onFocusCapture,
      onBlurCapture: f(m).onBlurCapture,
      onPointerdownCapture: f(u).onPointerDownCapture
    }, {
      default: C(() => [
        B(v.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
}), Ft = "focusScope.autoFocusOnMount", zt = "focusScope.autoFocusOnUnmount", jn = { bubbles: !1, cancelable: !0 };
function Sl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Me(r, { select: t }), document.activeElement !== n)
      return !0;
}
function Al(e) {
  const t = Tr(e), n = Wn(t, e), r = Wn(t.reverse(), e);
  return [n, r];
}
function Tr(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Wn(e, t) {
  for (const n of e)
    if (!El(n, { upTo: t }))
      return n;
}
function El(e, { upTo: t }) {
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
function Tl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Me(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Tl(e) && t && e.select();
  }
}
const Ol = qa(() => T([]));
function Bl() {
  const e = Ol();
  return {
    add(t) {
      const n = e.value[0];
      t !== n && (n == null || n.pause()), e.value = Hn(e.value, t), e.value.unshift(t);
    },
    remove(t) {
      var n;
      e.value = Hn(e.value, t), (n = e.value[0]) == null || n.resume();
    }
  };
}
function Hn(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Pl(e) {
  return e.filter((t) => t.tagName !== "A");
}
const Il = /* @__PURE__ */ q({
  __name: "FocusScope",
  props: {
    loop: { type: Boolean, default: !1 },
    trapped: { type: Boolean, default: !1 },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["mountAutoFocus", "unmountAutoFocus"],
  setup(e, { emit: t }) {
    const n = e, r = t, { currentRef: o, currentElement: a } = Y(), l = T(null), i = Bl(), c = Jn({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    });
    ae((s) => {
      if (!De)
        return;
      const u = a.value;
      if (!n.trapped)
        return;
      function m(h) {
        if (c.paused || !u)
          return;
        const y = h.target;
        u.contains(y) ? l.value = y : Me(l.value, { select: !0 });
      }
      function p(h) {
        if (c.paused || !u)
          return;
        const y = h.relatedTarget;
        y !== null && (u.contains(y) || Me(l.value, { select: !0 }));
      }
      function v(h) {
        u.contains(l.value) || Me(u);
      }
      document.addEventListener("focusin", m), document.addEventListener("focusout", p);
      const g = new MutationObserver(v);
      u && g.observe(u, { childList: !0, subtree: !0 }), s(() => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", p), g.disconnect();
      });
    }), ae(async (s) => {
      const u = a.value;
      if (await se(), !u)
        return;
      i.add(c);
      const m = document.activeElement;
      if (!u.contains(m)) {
        const p = new CustomEvent(Ft, jn);
        u.addEventListener(Ft, (v) => r("mountAutoFocus", v)), u.dispatchEvent(p), p.defaultPrevented || (Sl(Pl(Tr(u)), {
          select: !0
        }), document.activeElement === m && Me(u));
      }
      s(() => {
        u.removeEventListener(Ft, (g) => r("mountAutoFocus", g));
        const p = new CustomEvent(zt, jn), v = (g) => {
          r("unmountAutoFocus", g);
        };
        u.addEventListener(zt, v), u.dispatchEvent(p), setTimeout(() => {
          p.defaultPrevented || Me(m ?? document.body, { select: !0 }), u.removeEventListener(zt, v), i.remove(c);
        }, 0);
      });
    });
    function d(s) {
      if (!n.loop && !n.trapped || c.paused)
        return;
      const u = s.key === "Tab" && !s.altKey && !s.ctrlKey && !s.metaKey, m = document.activeElement;
      if (u && m) {
        const p = s.currentTarget, [v, g] = Al(p);
        v && g ? !s.shiftKey && m === g ? (s.preventDefault(), n.loop && Me(v, { select: !0 })) : s.shiftKey && m === v && (s.preventDefault(), n.loop && Me(g, { select: !0 })) : m === p && s.preventDefault();
      }
    }
    return (s, u) => (_(), P(f(W), {
      ref_key: "currentRef",
      ref: o,
      tabindex: "-1",
      "as-child": s.asChild,
      as: s.as,
      onKeydown: d
    }, {
      default: C(() => [
        B(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as"]));
  }
});
function Gn(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t))
      return;
}
const [Or, Ml] = ie("PopperRoot"), Rl = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperRoot",
  setup(e) {
    const t = T();
    return Ml({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, r) => B(n.$slots, "default");
  }
}), $l = /* @__PURE__ */ q({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = Y(), o = Or();
    return ae(() => {
      o.onAnchorChange(t.element ?? r.value);
    }), (a, l) => (_(), P(f(W), {
      ref: f(n),
      as: a.as,
      "as-child": a.asChild
    }, {
      default: C(() => [
        B(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Vl(e) {
  return e !== null;
}
function ql(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var n, r, o;
      const { placement: a, rects: l, middlewareData: i } = t, c = ((n = i.arrow) == null ? void 0 : n.centerOffset) !== 0, d = c ? 0 : e.arrowWidth, s = c ? 0 : e.arrowHeight, [u, m] = Jt(a), p = { start: "0%", center: "50%", end: "100%" }[m], v = (((r = i.arrow) == null ? void 0 : r.x) ?? 0) + d / 2, g = (((o = i.arrow) == null ? void 0 : o.y) ?? 0) + s / 2;
      let h = "", y = "";
      return u === "bottom" ? (h = c ? p : `${v}px`, y = `${-s}px`) : u === "top" ? (h = c ? p : `${v}px`, y = `${l.floating.height + s}px`) : u === "right" ? (h = `${-s}px`, y = c ? p : `${g}px`) : u === "left" && (h = `${l.floating.width + s}px`, y = c ? p : `${g}px`), { data: { x: h, y } };
    }
  };
}
function Jt(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const Dl = {
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
}, [Du, Ll] = ie("PopperContent"), Nl = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "PopperContent",
  props: /* @__PURE__ */ oo({
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
    ...Dl
  }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Or(), { forwardRef: a, currentElement: l } = Y(), i = T(), c = T(), { width: d, height: s } = pl(c), u = O(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), m = O(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), p = O(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), v = O(() => ({
      padding: m.value,
      boundary: p.value.filter(Vl),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: p.value.length > 0
    })), g = Va(() => [
      Aa({
        mainAxis: n.sideOffset + s.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && Dn({
        ...v.value
      }),
      n.avoidCollisions && Ea({
        mainAxis: !0,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? Pa() : void 0,
        ...v.value
      }),
      !n.prioritizePosition && n.avoidCollisions && Dn({
        ...v.value
      }),
      Ta({
        ...v.value,
        apply: ({ elements: I, rects: U, availableWidth: $, availableHeight: Z }) => {
          const { width: N, height: ue } = U.reference, K = I.floating.style;
          K.setProperty(
            "--radix-popper-available-width",
            `${$}px`
          ), K.setProperty(
            "--radix-popper-available-height",
            `${Z}px`
          ), K.setProperty(
            "--radix-popper-anchor-width",
            `${N}px`
          ), K.setProperty(
            "--radix-popper-anchor-height",
            `${ue}px`
          );
        }
      }),
      c.value && Ra({ element: c.value, padding: n.arrowPadding }),
      ql({
        arrowWidth: d.value,
        arrowHeight: s.value
      }),
      n.hideWhenDetached && Oa({ strategy: "referenceHidden", ...v.value })
    ]), { floatingStyles: h, placement: y, isPositioned: w, middlewareData: b } = $a(
      o.anchor,
      i,
      {
        strategy: "fixed",
        placement: u,
        whileElementsMounted: (...I) => Sa(...I, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: g
      }
    ), k = O(
      () => Jt(y.value)[0]
    ), x = O(
      () => Jt(y.value)[1]
    );
    ao(() => {
      w.value && r("placed");
    });
    const E = O(
      () => {
        var I;
        return ((I = b.value.arrow) == null ? void 0 : I.centerOffset) !== 0;
      }
    ), S = T("");
    ae(() => {
      l.value && (S.value = window.getComputedStyle(l.value).zIndex);
    });
    const R = O(() => {
      var I;
      return ((I = b.value.arrow) == null ? void 0 : I.x) ?? 0;
    }), D = O(() => {
      var I;
      return ((I = b.value.arrow) == null ? void 0 : I.y) ?? 0;
    });
    return Ll({
      placedSide: k,
      onArrowChange: (I) => c.value = I,
      arrowX: R,
      arrowY: D,
      shouldHideArrow: E
    }), (I, U) => {
      var $, Z, N;
      return _(), L("div", {
        ref_key: "floatingRef",
        ref: i,
        "data-radix-popper-content-wrapper": "",
        style: kt({
          ...f(h),
          transform: f(w) ? f(h).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: S.value,
          "--radix-popper-transform-origin": [
            ($ = f(b).transformOrigin) == null ? void 0 : $.x,
            (Z = f(b).transformOrigin) == null ? void 0 : Z.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((N = f(b).hide) == null ? void 0 : N.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        A(f(W), z({ ref: f(a) }, I.$attrs, {
          "as-child": n.asChild,
          as: I.as,
          "data-side": k.value,
          "data-align": x.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: f(w) ? void 0 : "none"
          }
        }), {
          default: C(() => [
            B(I.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Fl = /* @__PURE__ */ q({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return Y(), (t, n) => (_(), P(f(W), {
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
      default: C(() => [
        B(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), zl = "data-radix-vue-collection-item", [Sn, jl] = ie("CollectionProvider");
function Wl(e = zl) {
  const t = T(/* @__PURE__ */ new Map()), n = T(), r = jl({
    collectionRef: n,
    itemMap: t,
    attrName: e
  }), { getItems: o } = Br(r), a = O(() => Array.from(r.itemMap.value.values())), l = O(() => r.itemMap.value.size);
  return { getItems: o, reactiveItems: a, itemMapSize: l };
}
const Hl = q({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = Sn(), { primitiveElement: r, currentElement: o } = kn();
    return H(o, () => {
      n.collectionRef.value = o.value;
    }), () => ye(_n, { ref: r }, t);
  }
}), Gl = q({
  name: "CollectionItem",
  inheritAttrs: !1,
  props: {
    value: {
      // It accepts any value
      validator: () => !0
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = Sn(), { primitiveElement: o, currentElement: a } = kn();
    return ae((l) => {
      if (a.value) {
        const i = Jr(a.value);
        r.itemMap.value.set(i, { ref: a.value, value: e.value }), l(() => r.itemMap.value.delete(i));
      }
    }), () => ye(_n, { ...n, [r.attrName]: "", ref: o }, t);
  }
});
function Br(e) {
  const t = e ?? Sn();
  return { getItems: () => {
    const n = t.collectionRef.value;
    if (!n)
      return [];
    const r = Array.from(n.querySelectorAll(`[${t.attrName}]`));
    return Array.from(t.itemMap.value.values()).sort(
      (o, a) => r.indexOf(o.ref) - r.indexOf(a.ref)
    );
  } };
}
function Ul(e) {
  const t = Tt({
    nonce: T()
  });
  return O(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const Kl = "rovingFocusGroup.onEntryFocus", Yl = { bubbles: !1, cancelable: !0 }, Xl = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Zl(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Jl(e, t, n) {
  const r = Zl(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Xl[r];
}
function Pr(e, t = !1, n) {
  const r = (n == null ? void 0 : n.activeElement) ?? document.activeElement;
  for (const o of e)
    if (o === r || (o.focus({ preventScroll: t }), document.activeElement !== r))
      return;
}
function Ql(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const [es, ts] = ie("RovingFocusGroup"), ns = /* @__PURE__ */ q({
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
    const r = e, o = n, { loop: a, orientation: l, dir: i } = Oe(r), c = wn(i), d = qe(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), s = T(!1), u = T(!1), m = T(0), { getItems: p } = Wl();
    function v(h) {
      const y = !u.value;
      if (h.currentTarget && h.target === h.currentTarget && y && !s.value) {
        const w = new CustomEvent(Kl, Yl);
        if (h.currentTarget.dispatchEvent(w), o("entryFocus", w), !w.defaultPrevented) {
          const b = p().map((S) => S.ref).filter((S) => S.dataset.disabled !== ""), k = b.find((S) => S.getAttribute("data-active") === "true"), x = b.find(
            (S) => S.id === d.value
          ), E = [k, x, ...b].filter(
            Boolean
          );
          Pr(E, r.preventScrollOnEntryFocus);
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
    }), ts({
      loop: a,
      dir: c,
      orientation: l,
      currentTabStopId: d,
      onItemFocus: (h) => {
        d.value = h;
      },
      onItemShiftTab: () => {
        s.value = !0;
      },
      onFocusableItemAdd: () => {
        m.value++;
      },
      onFocusableItemRemove: () => {
        m.value--;
      }
    }), (h, y) => (_(), P(f(Hl), null, {
      default: C(() => [
        A(f(W), {
          tabindex: s.value || m.value === 0 ? -1 : 0,
          "data-orientation": f(l),
          as: h.as,
          "as-child": h.asChild,
          dir: f(c),
          style: { outline: "none" },
          onMousedown: y[0] || (y[0] = (w) => u.value = !0),
          onMouseup: g,
          onFocus: v,
          onBlur: y[1] || (y[1] = (w) => s.value = !1)
        }, {
          default: C(() => [
            B(h.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
}), rs = /* @__PURE__ */ q({
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
    const t = e, n = es(), r = O(() => t.tabStopId || Cn()), o = O(
      () => n.currentTabStopId.value === r.value
    ), { getItems: a } = Br(), { primitiveElement: l, currentElement: i } = kn(), c = O(() => {
      var s;
      return (s = i.value) == null ? void 0 : s.getRootNode();
    });
    ge(() => {
      t.focusable && n.onFocusableItemAdd();
    }), an(() => {
      t.focusable && n.onFocusableItemRemove();
    });
    function d(s) {
      if (s.key === "Tab" && s.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (s.target !== s.currentTarget)
        return;
      const u = Jl(
        s,
        n.orientation.value,
        n.dir.value
      );
      if (u !== void 0) {
        if (s.metaKey || s.ctrlKey || s.altKey || !t.allowShiftKey && s.shiftKey)
          return;
        s.preventDefault();
        let m = [...a().map((p) => p.ref).filter((p) => p.dataset.disabled !== "")];
        if (u === "last")
          m.reverse();
        else if (u === "prev" || u === "next") {
          u === "prev" && m.reverse();
          const p = m.indexOf(
            s.currentTarget
          );
          m = n.loop.value ? Ql(m, p + 1) : m.slice(p + 1);
        }
        se(() => Pr(m, !1, c.value));
      }
    }
    return (s, u) => (_(), P(f(Gl), null, {
      default: C(() => [
        A(f(W), {
          ref_key: "primitiveElement",
          ref: l,
          tabindex: o.value ? 0 : -1,
          "data-orientation": f(n).orientation.value,
          "data-active": s.active,
          "data-disabled": s.focusable ? void 0 : "",
          as: s.as,
          "as-child": s.asChild,
          onMousedown: u[0] || (u[0] = (m) => {
            s.focusable ? f(n).onItemFocus(r.value) : m.preventDefault();
          }),
          onFocus: u[1] || (u[1] = (m) => f(n).onItemFocus(r.value)),
          onKeydown: d
        }, {
          default: C(() => [
            B(s.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), os = /* @__PURE__ */ q({
  __name: "Label",
  props: {
    for: {},
    asChild: { type: Boolean },
    as: { default: "label" }
  },
  setup(e) {
    const t = e;
    return Y(), (n, r) => (_(), P(f(W), z(t, {
      onMousedown: r[0] || (r[0] = (o) => {
        !o.defaultPrevented && o.detail > 1 && o.preventDefault();
      })
    }), {
      default: C(() => [
        B(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), dt = 100, [as, ls] = ie("ProgressRoot"), An = (e) => typeof e == "number";
function ss(e, t) {
  return hn(e) || An(e) && !Number.isNaN(e) && e <= t && e >= 0 ? e : (console.error(`Invalid prop \`value\` of value \`${e}\` supplied to \`ProgressRoot\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${dt} if no \`max\` prop is set)
  - \`null\`  or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`), null);
}
function is(e) {
  return An(e) && !Number.isNaN(e) && e > 0 ? e : (console.error(
    `Invalid prop \`max\` of value \`${e}\` supplied to \`ProgressRoot\`. Only numbers greater than 0 are valid max values. Defaulting to \`${dt}\`.`
  ), dt);
}
const us = /* @__PURE__ */ q({
  __name: "ProgressRoot",
  props: {
    modelValue: {},
    max: { default: dt },
    getValueLabel: { type: Function, default: (e, t) => `${Math.round(e / t * dt)}%` },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue", "update:max"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    Y();
    const o = qe(n, "modelValue", r, {
      passive: n.modelValue === void 0
    }), a = qe(n, "max", r, {
      passive: n.max === void 0
    });
    H(
      () => o.value,
      async (i) => {
        const c = ss(i, n.max);
        c !== i && (await se(), o.value = c);
      },
      { immediate: !0 }
    ), H(
      () => n.max,
      (i) => {
        const c = is(n.max);
        c !== i && (a.value = c);
      },
      { immediate: !0 }
    );
    const l = O(() => hn(o.value) ? "indeterminate" : o.value === a.value ? "complete" : "loading");
    return ls({
      modelValue: o,
      max: a,
      progressState: l
    }), (i, c) => (_(), P(f(W), {
      "as-child": i.asChild,
      as: i.as,
      "aria-valuemax": f(a),
      "aria-valuemin": 0,
      "aria-valuenow": An(f(o)) ? f(o) : void 0,
      "aria-valuetext": i.getValueLabel(f(o), f(a)),
      "aria-label": i.getValueLabel(f(o), f(a)),
      role: "progressbar",
      "data-state": l.value,
      "data-value": f(o) ?? void 0,
      "data-max": f(a)
    }, {
      default: C(() => [
        B(i.$slots, "default", { modelValue: f(o) })
      ]),
      _: 3
    }, 8, ["as-child", "as", "aria-valuemax", "aria-valuenow", "aria-valuetext", "aria-label", "data-state", "data-value", "data-max"]));
  }
}), ds = /* @__PURE__ */ q({
  __name: "ProgressIndicator",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = as();
    return Y(), (r, o) => {
      var a;
      return _(), P(f(W), z(t, {
        "data-state": f(n).progressState.value,
        "data-value": ((a = f(n).modelValue) == null ? void 0 : a.value) ?? void 0,
        "data-max": f(n).max.value
      }), {
        default: C(() => [
          B(r.$slots, "default")
        ]),
        _: 3
      }, 16, ["data-state", "data-value", "data-max"]);
    };
  }
}), [cs, fs] = ie("RadioGroupRoot"), ps = /* @__PURE__ */ q({
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
    const n = e, r = t, { forwardRef: o } = Y(), a = qe(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), { disabled: l, loop: i, orientation: c, name: d, required: s, dir: u } = Oe(n), m = wn(u);
    return fs({
      modelValue: a,
      changeModelValue: (p) => {
        a.value = p;
      },
      disabled: l,
      loop: i,
      orientation: c,
      name: d == null ? void 0 : d.value,
      required: s
    }), (p, v) => (_(), P(f(ns), {
      "as-child": "",
      orientation: f(c),
      dir: f(m),
      loop: f(i)
    }, {
      default: C(() => [
        A(f(W), {
          ref: f(o),
          role: "radiogroup",
          "data-disabled": f(l) ? "" : void 0,
          "as-child": p.asChild,
          as: p.as,
          required: f(s),
          "aria-orientation": f(c),
          "aria-required": f(s),
          dir: f(m),
          name: f(d)
        }, {
          default: C(() => [
            B(p.$slots, "default", { modelValue: f(a) })
          ]),
          _: 3
        }, 8, ["data-disabled", "as-child", "as", "required", "aria-orientation", "aria-required", "dir", "name"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
}), ms = ["value", "checked", "name", "disabled", "required"], vs = /* @__PURE__ */ q({
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
    const n = e, r = qe(n, "checked", t, {
      passive: n.checked === void 0
    }), { value: o } = Oe(n), { forwardRef: a, currentElement: l } = Y(), i = xn(l), c = O(() => {
      var s;
      return n.id && l.value ? ((s = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : s.innerText) ?? n.value : void 0;
    });
    function d(s) {
      r.value = !0, i.value && s.stopPropagation();
    }
    return (s, u) => (_(), P(f(W), z(s.$attrs, {
      id: s.id,
      ref: f(a),
      role: "radio",
      type: s.as === "button" ? "button" : void 0,
      as: s.as,
      "aria-checked": f(r),
      "aria-label": c.value,
      "as-child": s.asChild,
      disabled: s.disabled ? "" : void 0,
      "data-state": f(r) ? "checked" : "unchecked",
      "data-disabled": s.disabled ? "" : void 0,
      value: f(o),
      required: s.required,
      name: s.name,
      onClick: me(d, ["stop"])
    }), {
      default: C(() => [
        B(s.$slots, "default", { checked: f(r) }),
        f(i) ? (_(), L("input", {
          key: 0,
          type: "radio",
          tabindex: "-1",
          "aria-hidden": "true",
          value: f(o),
          checked: !!f(r),
          name: s.name,
          disabled: s.disabled,
          required: s.required,
          style: {
            transform: "translateX(-100%)",
            position: "absolute",
            pointerEvents: "none",
            opacity: 0,
            margin: 0
          }
        }, null, 8, ms)) : oe("", !0)
      ]),
      _: 3
    }, 16, ["id", "type", "as", "aria-checked", "aria-label", "as-child", "disabled", "data-state", "data-disabled", "value", "required", "name"]));
  }
}), [hs, gs] = ie("RadioGroupItem"), ys = /* @__PURE__ */ q({
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
    const t = e, { forwardRef: n, currentElement: r } = Y(), o = cs(), a = O(() => o.disabled.value || t.disabled), l = O(() => o.required.value || t.required), i = O(() => {
      var u;
      return ((u = o.modelValue) == null ? void 0 : u.value) === t.value;
    });
    gs({ disabled: a, checked: i });
    const c = T(!1), d = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    _t("keydown", (u) => {
      d.includes(u.key) && (c.value = !0);
    }), _t("keyup", () => {
      c.value = !1;
    });
    function s() {
      setTimeout(() => {
        var u;
        c.value && ((u = r.value) == null || u.click());
      }, 0);
    }
    return (u, m) => (_(), P(f(rs), {
      checked: i.value,
      disabled: a.value,
      "as-child": "",
      focusable: !a.value,
      active: i.value
    }, {
      default: C(() => [
        A(vs, z({ ...u.$attrs, ...t }, {
          ref: f(n),
          checked: i.value,
          required: l.value,
          disabled: a.value,
          "onUpdate:checked": m[0] || (m[0] = (p) => f(o).changeModelValue(u.value)),
          onKeydown: m[1] || (m[1] = Qn(me(() => {
          }, ["prevent"]), ["enter"])),
          onFocus: s
        }), {
          default: C(() => [
            B(u.$slots, "default")
          ]),
          _: 3
        }, 16, ["checked", "required", "disabled"])
      ]),
      _: 3
    }, 8, ["checked", "disabled", "focusable", "active"]));
  }
}), bs = /* @__PURE__ */ q({
  __name: "RadioGroupIndicator",
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const { forwardRef: t } = Y(), n = hs();
    return (r, o) => (_(), P(f(Ar), {
      present: r.forceMount || f(n).checked.value
    }, {
      default: C(() => [
        A(f(W), z({
          ref: f(t),
          "data-state": f(n).checked.value ? "checked" : "unchecked",
          "data-disabled": f(n).disabled.value ? "" : void 0,
          "as-child": r.asChild,
          as: r.as
        }, r.$attrs), {
          default: C(() => [
            B(r.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state", "data-disabled", "as-child", "as"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), ws = ["default-value"], xs = /* @__PURE__ */ q({
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
    const t = e, { value: n } = Oe(t), r = T();
    return (o, a) => (_(), P(f(Fl), { "as-child": "" }, {
      default: C(() => [
        tr(M("select", z({
          ref_key: "selectElement",
          ref: r
        }, t, {
          "onUpdate:modelValue": a[0] || (a[0] = (l) => nr(n) ? n.value = l : null),
          "default-value": f(n)
        }), [
          B(o.$slots, "default")
        ], 16, ws), [
          [eo, f(n)]
        ])
      ]),
      _: 3
    }));
  }
}), Cs = {
  key: 0,
  value: ""
}, [nt, Ir] = ie("SelectRoot"), [_s, ks] = ie("SelectRoot"), Ss = /* @__PURE__ */ q({
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
    const n = e, r = t, o = qe(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), a = qe(n, "open", r, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    }), l = T(), i = T(), c = T({
      x: 0,
      y: 0
    }), d = T(!1), { required: s, disabled: u, dir: m } = Oe(n), p = wn(m);
    Ir({
      triggerElement: l,
      onTriggerChange: (y) => {
        l.value = y;
      },
      valueElement: i,
      onValueElementChange: (y) => {
        i.value = y;
      },
      valueElementHasChildren: d,
      onValueElementHasChildrenChange: (y) => {
        d.value = y;
      },
      contentId: "",
      modelValue: o,
      onValueChange: (y) => {
        o.value = y;
      },
      open: a,
      required: s,
      onOpenChange: (y) => {
        a.value = y;
      },
      dir: p,
      triggerPointerDownPosRef: c,
      disabled: u
    });
    const v = xn(l), g = T(/* @__PURE__ */ new Set()), h = O(() => Array.from(g.value).map((y) => {
      var w;
      return (w = y.props) == null ? void 0 : w.value;
    }).join(";"));
    return ks({
      onNativeOptionAdd: (y) => {
        g.value.add(y);
      },
      onNativeOptionRemove: (y) => {
        g.value.delete(y);
      }
    }), (y, w) => (_(), P(f(Rl), null, {
      default: C(() => [
        B(y.$slots, "default", {
          modelValue: f(o),
          open: f(a)
        }),
        f(v) ? (_(), P(xs, z({ key: h.value }, y.$attrs, {
          "aria-hidden": "true",
          tabindex: "-1",
          required: f(s),
          name: y.name,
          autocomplete: y.autocomplete,
          disabled: f(u),
          value: f(o),
          onChange: w[0] || (w[0] = (b) => o.value = b.target.value)
        }), {
          default: C(() => [
            f(o) === void 0 ? (_(), L("option", Cs)) : oe("", !0),
            (_(!0), L(we, null, st(Array.from(g.value), (b) => (_(), P(Qe(b), z({ ref_for: !0 }, b.props, {
              key: b.key ?? ""
            }), null, 16))), 128))
          ]),
          _: 1
        }, 16, ["required", "name", "autocomplete", "disabled", "value"])) : oe("", !0)
      ]),
      _: 3
    }));
  }
}), As = [" ", "Enter", "ArrowUp", "ArrowDown"], Es = [" ", "Enter"], pe = 10;
function Ts(e) {
  return e === "" || hn(e);
}
const Os = /* @__PURE__ */ q({
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, n = nt(), r = O(() => {
      var p;
      return ((p = n.disabled) == null ? void 0 : p.value) || t.disabled;
    }), { forwardRef: o, currentElement: a } = Y();
    n.contentId || (n.contentId = Cn(void 0, "radix-vue-select-content")), ge(() => {
      n.triggerElement = a;
    });
    const { injectCollection: l } = Ot(), i = l(), { search: c, handleTypeaheadSearch: d, resetTypeahead: s } = Sr(i);
    function u() {
      r.value || (n.onOpenChange(!0), s());
    }
    function m(p) {
      u(), n.triggerPointerDownPosRef.value = {
        x: Math.round(p.pageX),
        y: Math.round(p.pageY)
      };
    }
    return (p, v) => (_(), P(f($l), { "as-child": "" }, {
      default: C(() => {
        var g, h, y, w;
        return [
          A(f(W), {
            ref: f(o),
            role: "combobox",
            type: p.as === "button" ? "button" : void 0,
            "aria-controls": f(n).contentId,
            "aria-expanded": f(n).open.value || !1,
            "aria-required": (g = f(n).required) == null ? void 0 : g.value,
            "aria-autocomplete": "none",
            disabled: r.value,
            dir: (h = f(n)) == null ? void 0 : h.dir.value,
            "data-state": (y = f(n)) != null && y.open.value ? "open" : "closed",
            "data-disabled": r.value ? "" : void 0,
            "data-placeholder": f(Ts)((w = f(n).modelValue) == null ? void 0 : w.value) ? "" : void 0,
            "as-child": p.asChild,
            as: p.as,
            onClick: v[0] || (v[0] = (b) => {
              var k;
              (k = b == null ? void 0 : b.currentTarget) == null || k.focus();
            }),
            onPointerdown: v[1] || (v[1] = (b) => {
              if (b.pointerType === "touch")
                return b.preventDefault();
              const k = b.target;
              k.hasPointerCapture(b.pointerId) && k.releasePointerCapture(b.pointerId), b.button === 0 && b.ctrlKey === !1 && (m(b), b.preventDefault());
            }),
            onPointerup: v[2] || (v[2] = me(
              (b) => {
                b.pointerType === "touch" && m(b);
              },
              ["prevent"]
            )),
            onKeydown: v[3] || (v[3] = (b) => {
              const k = f(c) !== "";
              !(b.ctrlKey || b.altKey || b.metaKey) && b.key.length === 1 && k && b.key === " " || (f(d)(b.key), f(As).includes(b.key) && (u(), b.preventDefault()));
            })
          }, {
            default: C(() => [
              B(p.$slots, "default")
            ]),
            _: 3
          }, 8, ["type", "aria-controls", "aria-expanded", "aria-required", "disabled", "dir", "data-state", "data-disabled", "data-placeholder", "as-child", "as"])
        ];
      }),
      _: 3
    }));
  }
}), Bs = /* @__PURE__ */ q({
  __name: "SelectPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), P(f(bl), tn(nn(t)), {
      default: C(() => [
        B(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), [En, Ps] = ie("SelectItemAlignedPosition"), Is = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemAlignedPosition",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, { injectCollection: o } = Ot(), a = nt(), l = He(), i = o(), c = T(!1), d = T(!0), s = T(), { forwardRef: u, currentElement: m } = Y(), { viewport: p, selectedItem: v, selectedItemText: g, focusSelectedItem: h } = l;
    function y() {
      if (a.triggerElement.value && a.valueElement.value && s.value && m.value && p != null && p.value && v != null && v.value && g != null && g.value) {
        const k = a.triggerElement.value.getBoundingClientRect(), x = m.value.getBoundingClientRect(), E = a.valueElement.value.getBoundingClientRect(), S = g.value.getBoundingClientRect();
        if (a.dir.value !== "rtl") {
          const Ne = S.left - x.left, _e = E.left - Ne, ot = k.left - _e, Fe = k.width + ot, Mt = Math.max(Fe, x.width), Rt = window.innerWidth - pe, $t = Nn(_e, pe, Math.max(pe, Rt - Mt));
          s.value.style.minWidth = `${Fe}px`, s.value.style.left = `${$t}px`;
        } else {
          const Ne = x.right - S.right, _e = window.innerWidth - E.right - Ne, ot = window.innerWidth - k.right - _e, Fe = k.width + ot, Mt = Math.max(Fe, x.width), Rt = window.innerWidth - pe, $t = Nn(
            _e,
            pe,
            Math.max(pe, Rt - Mt)
          );
          s.value.style.minWidth = `${Fe}px`, s.value.style.right = `${$t}px`;
        }
        const R = i.value, D = window.innerHeight - pe * 2, I = p.value.scrollHeight, U = window.getComputedStyle(m.value), $ = Number.parseInt(
          U.borderTopWidth,
          10
        ), Z = Number.parseInt(U.paddingTop, 10), N = Number.parseInt(
          U.borderBottomWidth,
          10
        ), ue = Number.parseInt(
          U.paddingBottom,
          10
        ), K = $ + Z + I + ue + N, te = Math.min(
          v.value.offsetHeight * 5,
          K
        ), ne = window.getComputedStyle(p.value), ee = Number.parseInt(ne.paddingTop, 10), Ge = Number.parseInt(
          ne.paddingBottom,
          10
        ), le = k.top + k.height / 2 - pe, Gr = D - le, It = v.value.offsetHeight / 2, Ur = v.value.offsetTop + It, mt = $ + Z + Ur, Kr = K - mt;
        if (mt <= le) {
          const Ne = v.value === R[R.length - 1];
          s.value.style.bottom = "0px";
          const _e = m.value.clientHeight - p.value.offsetTop - p.value.offsetHeight, ot = Math.max(
            Gr,
            It + (Ne ? Ge : 0) + _e + N
          ), Fe = mt + ot;
          s.value.style.height = `${Fe}px`;
        } else {
          const Ne = v.value === R[0];
          s.value.style.top = "0px";
          const _e = Math.max(
            le,
            $ + p.value.offsetTop + (Ne ? ee : 0) + It
          ) + Kr;
          s.value.style.height = `${_e}px`, p.value.scrollTop = mt - le + p.value.offsetTop;
        }
        s.value.style.margin = `${pe}px 0`, s.value.style.minHeight = `${te}px`, s.value.style.maxHeight = `${D}px`, r("placed"), requestAnimationFrame(() => c.value = !0);
      }
    }
    const w = T("");
    ge(async () => {
      await se(), y(), m.value && (w.value = window.getComputedStyle(m.value).zIndex);
    });
    function b(k) {
      k && d.value === !0 && (y(), h == null || h(), d.value = !1);
    }
    return Ps({
      contentWrapper: s,
      shouldExpandOnScrollRef: c,
      onScrollButtonChange: b
    }), (k, x) => (_(), L("div", {
      ref_key: "contentWrapperElement",
      ref: s,
      style: kt({
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        zIndex: w.value
      })
    }, [
      A(f(W), z({
        ref: f(u),
        style: {
          // When we get the height of the content, it includes borders. If we were to set
          // the height without having `boxSizing: 'border-box'` it would be too big.
          boxSizing: "border-box",
          // We need to ensure the content doesn't get taller than the wrapper
          maxHeight: "100%"
        }
      }, { ...k.$attrs, ...n }), {
        default: C(() => [
          B(k.$slots, "default")
        ]),
        _: 3
      }, 16)
    ], 4));
  }
}), Ms = /* @__PURE__ */ q({
  __name: "SelectPopperPosition",
  props: {
    side: {},
    sideOffset: {},
    align: { default: "start" },
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: { default: pe },
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = Le(e);
    return (n, r) => (_(), P(f(Nl), z(f(t), { style: {
      // Ensure border-box for floating-ui calculations
      boxSizing: "border-box",
      "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-select-content-available-width": "var(--radix-popper-available-width)",
      "--radix-select-content-available-height": "var(--radix-popper-available-height)",
      "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
    } }), {
      default: C(() => [
        B(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), rt = {
  onViewportChange: () => {
  },
  itemTextRefCallback: () => {
  },
  itemRefCallback: () => {
  }
}, [He, Rs] = ie("SelectContent"), $s = /* @__PURE__ */ q({
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
    const n = e, r = t, o = nt();
    ll(), nl(n.bodyLock);
    const { createCollection: a } = Ot(), l = T();
    cl(l);
    const i = a(l), { search: c, handleTypeaheadSearch: d } = Sr(i), s = T(), u = T(), m = T(), p = T(!1), v = T(!1);
    function g() {
      u.value && l.value && Gn([u.value, l.value]);
    }
    H(p, () => {
      g();
    });
    const { onOpenChange: h, triggerPointerDownPosRef: y } = o;
    ae((x) => {
      if (!l.value)
        return;
      let E = { x: 0, y: 0 };
      const S = (D) => {
        var I, U;
        E = {
          x: Math.abs(
            Math.round(D.pageX) - (((I = y.value) == null ? void 0 : I.x) ?? 0)
          ),
          y: Math.abs(
            Math.round(D.pageY) - (((U = y.value) == null ? void 0 : U.y) ?? 0)
          )
        };
      }, R = (D) => {
        var I;
        D.pointerType !== "touch" && (E.x <= 10 && E.y <= 10 ? D.preventDefault() : (I = l.value) != null && I.contains(D.target) || h(!1), document.removeEventListener("pointermove", S), y.value = null);
      };
      y.value !== null && (document.addEventListener("pointermove", S), document.addEventListener("pointerup", R, {
        capture: !0,
        once: !0
      })), x(() => {
        document.removeEventListener("pointermove", S), document.removeEventListener("pointerup", R, {
          capture: !0
        });
      });
    });
    function w(x) {
      const E = x.ctrlKey || x.altKey || x.metaKey;
      if (x.key === "Tab" && x.preventDefault(), !E && x.key.length === 1 && d(x.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(x.key)) {
        let S = i.value;
        if (["ArrowUp", "End"].includes(x.key) && (S = S.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(x.key)) {
          const R = x.target, D = S.indexOf(R);
          S = S.slice(D + 1);
        }
        setTimeout(() => Gn(S)), x.preventDefault();
      }
    }
    const b = O(() => n.position === "popper" ? n : {}), k = Le(b.value);
    return Rs({
      content: l,
      viewport: s,
      onViewportChange: (x) => {
        s.value = x;
      },
      itemRefCallback: (x, E, S) => {
        var R, D;
        const I = !v.value && !S;
        (((R = o.modelValue) == null ? void 0 : R.value) !== void 0 && ((D = o.modelValue) == null ? void 0 : D.value) === E || I) && (u.value = x, I && (v.value = !0));
      },
      selectedItem: u,
      selectedItemText: m,
      onItemLeave: () => {
        var x;
        (x = l.value) == null || x.focus();
      },
      itemTextRefCallback: (x, E, S) => {
        var R, D;
        const I = !v.value && !S;
        (((R = o.modelValue) == null ? void 0 : R.value) !== void 0 && ((D = o.modelValue) == null ? void 0 : D.value) === E || I) && (m.value = x);
      },
      focusSelectedItem: g,
      position: n.position,
      isPositioned: p,
      searchRef: c
    }), (x, E) => (_(), P(f(Il), {
      "as-child": "",
      onMountAutoFocus: E[6] || (E[6] = me(() => {
      }, ["prevent"])),
      onUnmountAutoFocus: E[7] || (E[7] = (S) => {
        var R;
        r("closeAutoFocus", S), !S.defaultPrevented && ((R = f(o).triggerElement.value) == null || R.focus({ preventScroll: !0 }), S.preventDefault());
      })
    }, {
      default: C(() => [
        A(f(kl), {
          "as-child": "",
          "disable-outside-pointer-events": "",
          onFocusOutside: E[2] || (E[2] = me(() => {
          }, ["prevent"])),
          onDismiss: E[3] || (E[3] = (S) => f(o).onOpenChange(!1)),
          onEscapeKeyDown: E[4] || (E[4] = (S) => r("escapeKeyDown", S)),
          onPointerDownOutside: E[5] || (E[5] = (S) => r("pointerDownOutside", S))
        }, {
          default: C(() => [
            (_(), P(Qe(
              x.position === "popper" ? Ms : Is
            ), z({ ...x.$attrs, ...f(k) }, {
              id: f(o).contentId,
              ref: (S) => {
                l.value = f(Be)(S);
              },
              role: "listbox",
              "data-state": f(o).open.value ? "open" : "closed",
              dir: f(o).dir.value,
              style: {
                // flex layout so we can place the scroll buttons properly
                display: "flex",
                flexDirection: "column",
                // reset the outline by default as the content MAY get focused
                outline: "none"
              },
              onContextmenu: E[0] || (E[0] = me(() => {
              }, ["prevent"])),
              onPlaced: E[1] || (E[1] = (S) => p.value = !0),
              onKeydown: w
            }), {
              default: C(() => [
                B(x.$slots, "default")
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
}), Vs = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectProvider",
  props: {
    context: {}
  },
  setup(e) {
    return Ir(e.context), (t, n) => B(t.$slots, "default");
  }
}), qs = { key: 1 }, Ds = /* @__PURE__ */ q({
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
    const n = e, r = ft(n, t), o = nt(), a = T();
    ge(() => {
      a.value = new DocumentFragment();
    });
    const l = T(), i = O(() => n.forceMount || o.open.value);
    return (c, d) => {
      var s;
      return i.value ? (_(), P(f(Ar), {
        key: 0,
        ref_key: "presenceRef",
        ref: l,
        present: !0
      }, {
        default: C(() => [
          A($s, tn(nn({ ...f(r), ...c.$attrs })), {
            default: C(() => [
              B(c.$slots, "default")
            ]),
            _: 3
          }, 16)
        ]),
        _: 3
      }, 512)) : !((s = l.value) != null && s.present) && a.value ? (_(), L("div", qs, [
        (_(), P(rn, { to: a.value }, [
          A(Vs, { context: f(o) }, {
            default: C(() => [
              B(c.$slots, "default")
            ]),
            _: 3
          }, 8, ["context"])
        ], 8, ["to"]))
      ])) : oe("", !0);
    };
  }
}), [Mr, Ls] = ie("SelectItem"), Ns = /* @__PURE__ */ q({
  __name: "SelectItem",
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { disabled: n } = Oe(t), r = nt(), o = He(rt), { forwardRef: a, currentElement: l } = Y(), i = O(() => {
      var g;
      return ((g = r.modelValue) == null ? void 0 : g.value) === t.value;
    }), c = T(!1), d = T(t.textValue ?? ""), s = Cn(void 0, "radix-vue-select-item-text");
    async function u(g) {
      await se(), !(g != null && g.defaultPrevented) && (n.value || (r.onValueChange(t.value), r.onOpenChange(!1)));
    }
    async function m(g) {
      var h;
      await se(), !g.defaultPrevented && (n.value ? (h = o.onItemLeave) == null || h.call(o) : g.currentTarget.focus({ preventScroll: !0 }));
    }
    async function p(g) {
      var h;
      await se(), !g.defaultPrevented && g.currentTarget === document.activeElement && ((h = o.onItemLeave) == null || h.call(o));
    }
    async function v(g) {
      var h;
      await se(), !(g.defaultPrevented || ((h = o.searchRef) == null ? void 0 : h.value) !== "" && g.key === " ") && (Es.includes(g.key) && u(), g.key === " " && g.preventDefault());
    }
    if (t.value === "")
      throw new Error(
        "A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return ge(() => {
      l.value && o.itemRefCallback(
        l.value,
        t.value,
        t.disabled
      );
    }), Ls({
      value: t.value,
      disabled: n,
      textId: s,
      isSelected: i,
      onItemTextChange: (g) => {
        d.value = ((d.value || (g == null ? void 0 : g.textContent)) ?? "").trim();
      }
    }), (g, h) => (_(), P(f(W), {
      ref: f(a),
      role: "option",
      "data-radix-vue-collection-item": "",
      "aria-labelledby": f(s),
      "data-highlighted": c.value ? "" : void 0,
      "aria-selected": i.value,
      "data-state": i.value ? "checked" : "unchecked",
      "aria-disabled": f(n) || void 0,
      "data-disabled": f(n) ? "" : void 0,
      tabindex: f(n) ? void 0 : -1,
      as: g.as,
      "as-child": g.asChild,
      onFocus: h[0] || (h[0] = (y) => c.value = !0),
      onBlur: h[1] || (h[1] = (y) => c.value = !1),
      onPointerup: u,
      onPointerdown: h[2] || (h[2] = (y) => {
        y.currentTarget.focus({ preventScroll: !0 });
      }),
      onTouchend: h[3] || (h[3] = me(() => {
      }, ["prevent", "stop"])),
      onPointermove: m,
      onPointerleave: p,
      onKeydown: v
    }, {
      default: C(() => [
        B(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["aria-labelledby", "data-highlighted", "aria-selected", "data-state", "aria-disabled", "data-disabled", "tabindex", "as", "as-child"]));
  }
}), Fs = /* @__PURE__ */ q({
  __name: "SelectItemIndicator",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = Mr();
    return (r, o) => f(n).isSelected.value ? (_(), P(f(W), z({
      key: 0,
      "aria-hidden": "true"
    }, t), {
      default: C(() => [
        B(r.$slots, "default")
      ]),
      _: 3
    }, 16)) : oe("", !0);
  }
}), zs = /* @__PURE__ */ q({
  inheritAttrs: !1,
  __name: "SelectItemText",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = nt(), r = He(rt), o = _s(), a = Mr(), { forwardRef: l, currentElement: i } = Y(), c = O(() => {
      var d;
      return ye("option", {
        key: a.value,
        value: a.value,
        disabled: a.disabled.value,
        textContent: (d = i.value) == null ? void 0 : d.textContent
      });
    });
    return ge(() => {
      i.value && (a.onItemTextChange(i.value), r.itemTextRefCallback(
        i.value,
        a.value,
        a.disabled.value
      ), o.onNativeOptionAdd(c.value));
    }), on(() => {
      o.onNativeOptionRemove(c.value);
    }), (d, s) => (_(), L(we, null, [
      A(f(W), z({
        id: f(a).textId,
        ref: f(l)
      }, { ...t, ...d.$attrs }, { "data-item-text": "" }), {
        default: C(() => [
          B(d.$slots, "default")
        ]),
        _: 3
      }, 16, ["id"]),
      f(a).isSelected.value && f(n).valueElement.value && !f(n).valueElementHasChildren.value ? (_(), P(rn, {
        key: 0,
        to: f(n).valueElement.value
      }, [
        B(d.$slots, "default")
      ], 8, ["to"])) : oe("", !0)
    ], 64));
  }
}), js = /* @__PURE__ */ q({
  __name: "SelectViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { nonce: n } = Oe(t), r = Ul(n), o = He(rt), a = o.position === "item-aligned" ? En() : void 0, { forwardRef: l, currentElement: i } = Y();
    ge(() => {
      o == null || o.onViewportChange(i.value);
    });
    const c = T(0);
    function d(s) {
      const u = s.currentTarget, { shouldExpandOnScrollRef: m, contentWrapper: p } = a ?? {};
      if (m != null && m.value && p != null && p.value) {
        const v = Math.abs(c.value - u.scrollTop);
        if (v > 0) {
          const g = window.innerHeight - pe * 2, h = Number.parseFloat(
            p.value.style.minHeight
          ), y = Number.parseFloat(p.value.style.height), w = Math.max(h, y);
          if (w < g) {
            const b = w + v, k = Math.min(g, b), x = b - k;
            p.value.style.height = `${k}px`, p.value.style.bottom === "0px" && (u.scrollTop = x > 0 ? x : 0, p.value.style.justifyContent = "flex-end");
          }
        }
      }
      c.value = u.scrollTop;
    }
    return (s, u) => (_(), L(we, null, [
      A(f(W), z({
        ref: f(l),
        "data-radix-select-viewport": "",
        role: "presentation"
      }, { ...s.$attrs, ...t }, {
        style: {
          // we use position: 'relative' here on the `viewport` so that when we call
          // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
          // (independent of the scrollUpButton).
          position: "relative",
          flex: 1,
          overflow: "hidden auto"
        },
        onScroll: d
      }), {
        default: C(() => [
          B(s.$slots, "default")
        ]),
        _: 3
      }, 16),
      A(f(W), {
        as: "style",
        nonce: f(r)
      }, {
        default: C(() => [
          J(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-select-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-radix-select-viewport]::-webkit-scrollbar { display: none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
}), Rr = /* @__PURE__ */ q({
  __name: "SelectScrollButtonImpl",
  emits: ["autoScroll"],
  setup(e, { emit: t }) {
    const n = t, { injectCollection: r } = Ot(), o = r(), a = He(rt), l = T(null);
    function i() {
      l.value !== null && (window.clearInterval(l.value), l.value = null);
    }
    ae(() => {
      const s = o.value.find(
        (u) => u === document.activeElement
      );
      s == null || s.scrollIntoView({ block: "nearest" });
    });
    function c() {
      l.value === null && (l.value = window.setInterval(() => {
        n("autoScroll");
      }, 50));
    }
    function d() {
      var s;
      (s = a.onItemLeave) == null || s.call(a), l.value === null && (l.value = window.setInterval(() => {
        n("autoScroll");
      }, 50));
    }
    return on(() => i()), (s, u) => {
      var m;
      return _(), P(f(W), z({
        "aria-hidden": "true",
        style: {
          flexShrink: 0
        }
      }, (m = s.$parent) == null ? void 0 : m.$props, {
        onPointerdown: c,
        onPointermove: d,
        onPointerleave: u[0] || (u[0] = () => {
          i();
        })
      }), {
        default: C(() => [
          B(s.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
}), Ws = /* @__PURE__ */ q({
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = He(rt), n = t.position === "item-aligned" ? En() : void 0, { forwardRef: r, currentElement: o } = Y(), a = T(!1);
    return ae((l) => {
      var i, c;
      if ((i = t.viewport) != null && i.value && (c = t.isPositioned) != null && c.value) {
        let d = function() {
          a.value = s.scrollTop > 0;
        };
        const s = t.viewport.value;
        d(), s.addEventListener("scroll", d), l(() => s.removeEventListener("scroll", d));
      }
    }), H(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (l, i) => a.value ? (_(), P(Rr, {
      key: 0,
      ref: f(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: c, selectedItem: d } = f(t);
        c != null && c.value && d != null && d.value && (c.value.scrollTop = c.value.scrollTop - d.value.offsetHeight);
      })
    }, {
      default: C(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 512)) : oe("", !0);
  }
}), Hs = /* @__PURE__ */ q({
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = He(rt), n = t.position === "item-aligned" ? En() : void 0, { forwardRef: r, currentElement: o } = Y(), a = T(!1);
    return ae((l) => {
      var i, c;
      if ((i = t.viewport) != null && i.value && (c = t.isPositioned) != null && c.value) {
        let d = function() {
          const u = s.scrollHeight - s.clientHeight;
          a.value = Math.ceil(s.scrollTop) < u;
        };
        const s = t.viewport.value;
        d(), s.addEventListener("scroll", d), l(() => s.removeEventListener("scroll", d));
      }
    }), H(o, () => {
      o.value && (n == null || n.onScrollButtonChange(o.value));
    }), (l, i) => a.value ? (_(), P(Rr, {
      key: 0,
      ref: f(r),
      onAutoScroll: i[0] || (i[0] = () => {
        const { viewport: c, selectedItem: d } = f(t);
        c != null && c.value && d != null && d.value && (c.value.scrollTop = c.value.scrollTop + d.value.offsetHeight);
      })
    }, {
      default: C(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 512)) : oe("", !0);
  }
}), Gs = /* @__PURE__ */ q({
  __name: "SelectIcon",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return (t, n) => (_(), P(f(W), {
      "aria-hidden": "true",
      as: t.as,
      "as-child": t.asChild
    }, {
      default: C(() => [
        B(t.$slots, "default", {}, () => [
          J("▼")
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Us() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Us();
const Ks = ["name", "disabled", "required", "value", "checked", "data-state", "data-disabled"], [Ys, Xs] = ie("SwitchRoot"), Zs = /* @__PURE__ */ q({
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
    const n = e, r = t, { disabled: o } = Oe(n), a = qe(n, "checked", r, {
      defaultValue: n.defaultChecked,
      passive: n.checked === void 0
    });
    function l() {
      o.value || (a.value = !a.value);
    }
    const { forwardRef: i, currentElement: c } = Y(), d = xn(c), s = O(() => {
      var u;
      return n.id && c.value ? (u = document.querySelector(`[for="${n.id}"]`)) == null ? void 0 : u.innerText : void 0;
    });
    return Xs({
      checked: a,
      toggleCheck: l,
      disabled: o
    }), (u, m) => (_(), L(we, null, [
      A(f(W), z(u.$attrs, {
        id: u.id,
        ref: f(i),
        role: "switch",
        type: u.as === "button" ? "button" : void 0,
        value: u.value,
        "aria-label": u.$attrs["aria-label"] || s.value,
        "aria-checked": f(a),
        "aria-required": u.required,
        "data-state": f(a) ? "checked" : "unchecked",
        "data-disabled": f(o) ? "" : void 0,
        "as-child": u.asChild,
        as: u.as,
        disabled: f(o),
        onClick: l,
        onKeydown: Qn(me(l, ["prevent"]), ["enter"])
      }), {
        default: C(() => [
          B(u.$slots, "default", { checked: f(a) })
        ]),
        _: 3
      }, 16, ["id", "type", "value", "aria-label", "aria-checked", "aria-required", "data-state", "data-disabled", "as-child", "as", "disabled", "onKeydown"]),
      f(d) ? (_(), L("input", {
        key: 0,
        type: "checkbox",
        name: u.name,
        tabindex: "-1",
        "aria-hidden": "true",
        disabled: f(o),
        required: u.required,
        value: u.value,
        checked: !!f(a),
        "data-state": f(a) ? "checked" : "unchecked",
        "data-disabled": f(o) ? "" : void 0,
        style: {
          transform: "translateX(-100%)",
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }, null, 8, Ks)) : oe("", !0)
    ], 64));
  }
}), Js = /* @__PURE__ */ q({
  __name: "SwitchThumb",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = Ys();
    return Y(), (n, r) => {
      var o;
      return _(), P(f(W), {
        "data-state": (o = f(t).checked) != null && o.value ? "checked" : "unchecked",
        "data-disabled": f(t).disabled.value ? "" : void 0,
        "as-child": n.asChild,
        as: n.as
      }, {
        default: C(() => [
          B(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["data-state", "data-disabled", "as-child", "as"]);
    };
  }
}), Qs = {
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
    const o = ft(e, t);
    return (a, l) => (_(), P(f(Ss), tn(nn(f(o))), {
      default: C(() => [
        B(a.$slots, "default")
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
const ei = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var bt = {
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
const ti = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: a, class: l, ...i }, { slots: c }) => ye(
  "svg",
  {
    ...bt,
    width: e || bt.width,
    height: e || bt.height,
    stroke: r || bt.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${ei(a ?? "icon")}`],
    ...i
  },
  [...o.map((d) => ye(...d)), ...c.default ? [c.default()] : []]
);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q = (e, t) => (n, { slots: r }) => ye(
  ti,
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
const ni = Q("ArrowLeftIcon", [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ri = Q("ArrowRightIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oi = Q("BikeIcon", [
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
const $r = Q("BusIcon", [
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
const Tn = Q("CarIcon", [
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
const ai = Q("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vr = Q("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const li = Q("ChevronUpIcon", [
  ["path", { d: "m18 15-6-6-6 6", key: "153udz" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const si = Q("CircleAlertIcon", [
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
const ii = Q("CircleIcon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ui = Q("DropletIcon", [
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
const di = Q("FuelIcon", [
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
const ci = Q("LeafIcon", [
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
const fi = Q("PlaneIcon", [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qr = Q("TramFrontIcon", [
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
const pi = Q("TreesIcon", [
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
const mi = Q("ZapIcon", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]), vi = {
  __name: "SelectTrigger",
  props: {
    disabled: { type: Boolean, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = O(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Le(n);
    return (o, a) => (_(), P(f(Os), z(f(r), {
      class: f(G)(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start",
        t.class
      )
    }), {
      default: C(() => [
        B(o.$slots, "default"),
        A(f(Gs), { "as-child": "" }, {
          default: C(() => [
            A(f(Vr), { class: "w-4 h-4 opacity-50 shrink-0" })
          ]),
          _: 1
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, hi = { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, gi = {
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
    const t = e, n = O(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Le(n);
    return (o, a) => (_(), P(f(Ns), z(f(r), {
      class: f(G)(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        t.class
      )
    }), {
      default: C(() => [
        M("span", hi, [
          A(f(Fs), null, {
            default: C(() => [
              A(f(ai), { class: "h-4 w-4" })
            ]),
            _: 1
          })
        ]),
        A(f(zs), null, {
          default: C(() => [
            B(o.$slots, "default")
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, yi = {
  __name: "SelectScrollDownButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = O(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Le(n);
    return (o, a) => (_(), P(f(Hs), z(f(r), {
      class: f(G)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: C(() => [
        B(o.$slots, "default", {}, () => [
          A(f(Vr), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, bi = {
  __name: "SelectScrollUpButton",
  props: {
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = O(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Le(n);
    return (o, a) => (_(), P(f(Ws), z(f(r), {
      class: f(G)("flex cursor-default items-center justify-center py-1", t.class)
    }), {
      default: C(() => [
        B(o.$slots, "default", {}, () => [
          A(f(li), { class: "h-4 w-4" })
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, wi = /* @__PURE__ */ Object.assign({
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
    const n = e, r = t, o = O(() => {
      const { class: l, ...i } = n;
      return i;
    }), a = ft(o, r);
    return (l, i) => (_(), P(f(Bs), null, {
      default: C(() => [
        A(f(Ds), z({ ...f(a), ...l.$attrs }, {
          class: f(G)(
            "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            e.position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            n.class
          )
        }), {
          default: C(() => [
            A(f(bi)),
            A(f(js), {
              class: X(
                f(G)(
                  "p-1",
                  e.position === "popper" && "h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]"
                )
              )
            }, {
              default: C(() => [
                B(l.$slots, "default")
              ]),
              _: 3
            }, 8, ["class"]),
            A(f(yi))
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }));
  }
}), xi = {
  __name: "CardFooter",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(f(G)("flex items-center p-6 pt-0", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Un = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Kn = lr, Dr = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Kn(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, l = Object.keys(o).map((d) => {
    const s = n == null ? void 0 : n[d], u = a == null ? void 0 : a[d];
    if (s === null) return null;
    const m = Un(s) || Un(u);
    return o[d][m];
  }), i = n && Object.entries(n).reduce((d, s) => {
    let [u, m] = s;
    return m === void 0 || (d[u] = m), d;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, s) => {
    let { class: u, className: m, ...p } = s;
    return Object.entries(p).every((v) => {
      let [g, h] = v;
      return Array.isArray(h) ? h.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === h;
    }) ? [
      ...d,
      u,
      m
    ] : d;
  }, []);
  return Kn(e, l, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ci = Dr(
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
), Bt = {
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
    return (n, r) => (_(), P(f(W), {
      as: e.as,
      "as-child": e.asChild,
      class: X(f(G)(f(Ci)({ variant: e.variant, size: e.size }), t.class))
    }, {
      default: C(() => [
        B(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}, Pt = {
  __name: "Label",
  props: {
    for: { type: String, required: !1 },
    asChild: { type: Boolean, required: !1 },
    as: { type: null, required: !1 },
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e, n = O(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (_(), P(f(os), z(n.value, {
      class: f(G)(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        t.class
      )
    }), {
      default: C(() => [
        B(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
};
function Lr(e) {
  return Qt() ? (en(e), !0) : !1;
}
const _i = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ki = (e) => typeof e < "u", Si = (e) => e != null, jt = () => {
};
function Ai(e, t = !1, n = "Timeout") {
  return new Promise((r, o) => {
    setTimeout(t ? () => o(n) : r, e);
  });
}
function Nr(e) {
  return e;
}
function Ei(e) {
  return Array.isArray(e) ? e : [e];
}
const Fr = _i ? window : void 0;
function Wt(e) {
  var t;
  const n = re(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function Ti() {
  const e = T(!1), t = Te();
  return t && ge(() => {
    e.value = !0;
  }, t), e;
}
function Oi(e) {
  const t = Ti();
  return O(() => (t.value, !!e()));
}
function Bi(e) {
  return JSON.parse(JSON.stringify(e));
}
function Pi(e, t, n = {}) {
  const {
    root: r,
    rootMargin: o = "0px",
    threshold: a = 0,
    window: l = Fr,
    immediate: i = !0
  } = n, c = Oi(() => l && "IntersectionObserver" in l), d = O(() => {
    const v = re(e);
    return Ei(v).map(Wt).filter(Si);
  });
  let s = jt;
  const u = T(i), m = c.value ? H(
    () => [d.value, Wt(r), u.value],
    ([v, g]) => {
      if (s(), !u.value || !v.length)
        return;
      const h = new IntersectionObserver(
        t,
        {
          root: Wt(g),
          rootMargin: o,
          threshold: a
        }
      );
      v.forEach((y) => y && h.observe(y)), s = () => {
        h.disconnect(), s = jt;
      };
    },
    { immediate: i, flush: "post" }
  ) : jt, p = () => {
    s(), m(), u.value = !1;
  };
  return Lr(p), {
    isSupported: c,
    isActive: u,
    pause() {
      s(), u.value = !1;
    },
    resume() {
      u.value = !0;
    },
    stop: p
  };
}
function Ii(e, t = {}) {
  const {
    window: n = Fr,
    scrollTarget: r,
    threshold: o = 0,
    rootMargin: a
  } = t, l = T(!1);
  return Pi(
    e,
    (i) => {
      let c = l.value, d = 0;
      for (const s of i)
        s.time >= d && (d = s.time, c = s.isIntersecting);
      l.value = c;
    },
    {
      root: r,
      window: n,
      threshold: o,
      rootMargin: re(a)
    }
  ), l;
}
const Mi = {
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
}, Ri = /* @__PURE__ */ Object.assign({}, { linear: Nr }, Mi);
function $i([e, t, n, r]) {
  const o = (s, u) => 1 - 3 * u + 3 * s, a = (s, u) => 3 * u - 6 * s, l = (s) => 3 * s, i = (s, u, m) => ((o(u, m) * s + a(u, m)) * s + l(u)) * s, c = (s, u, m) => 3 * o(u, m) * s * s + 2 * a(u, m) * s + l(u), d = (s) => {
    let u = s;
    for (let m = 0; m < 4; ++m) {
      const p = c(u, e, n);
      if (p === 0)
        return u;
      const v = i(u, e, n) - s;
      u -= v / p;
    }
    return u;
  };
  return (s) => e === t && n === r ? s : i(d(s), t, r);
}
function Yn(e, t, n) {
  return e + n * (t - e);
}
function Ht(e) {
  return (typeof e == "number" ? [e] : e) || [];
}
function Vi(e, t, n, r = {}) {
  var o, a;
  const l = re(t), i = re(n), c = Ht(l), d = Ht(i), s = (o = re(r.duration)) != null ? o : 1e3, u = Date.now(), m = Date.now() + s, p = typeof r.transition == "function" ? r.transition : (a = re(r.transition)) != null ? a : Nr, v = typeof p == "function" ? p : $i(p);
  return new Promise((g) => {
    e.value = l;
    const h = () => {
      var y;
      if ((y = r.abort) != null && y.call(r)) {
        g();
        return;
      }
      const w = Date.now(), b = v((w - u) / s), k = Ht(e.value).map((x, E) => Yn(c[E], d[E], b));
      Array.isArray(e.value) ? e.value = k.map((x, E) => {
        var S, R;
        return Yn((S = c[E]) != null ? S : 0, (R = d[E]) != null ? R : 0, b);
      }) : typeof e.value == "number" && (e.value = k[0]), w < m ? requestAnimationFrame(h) : (e.value = i, g());
    };
    h();
  });
}
function qi(e, t = {}) {
  let n = 0;
  const r = () => {
    const a = re(e);
    return typeof a == "number" ? a : a.map(re);
  }, o = T(r());
  return H(r, async (a) => {
    var l, i;
    if (re(t.disabled))
      return;
    const c = ++n;
    if (t.delay && await Ai(re(t.delay)), c !== n)
      return;
    const d = Array.isArray(a) ? a.map(re) : re(a);
    (l = t.onStarted) == null || l.call(t), await Vi(o, o.value, d, {
      ...t,
      abort: () => {
        var s;
        return c !== n || ((s = t.abort) == null ? void 0 : s.call(t));
      }
    }), (i = t.onFinished) == null || i.call(t);
  }, { deep: !0 }), H(() => re(t.disabled), (a) => {
    a && (n++, o.value = r());
  }), Lr(() => {
    n++;
  }), O(() => re(t.disabled) ? r() : o.value);
}
function Di(e, t, n, r = {}) {
  var o, a, l;
  const {
    clone: i = !1,
    passive: c = !1,
    eventName: d,
    deep: s = !1,
    defaultValue: u,
    shouldEmit: m
  } = r, p = Te(), v = n || (p == null ? void 0 : p.emit) || ((o = p == null ? void 0 : p.$emit) == null ? void 0 : o.bind(p)) || ((l = (a = p == null ? void 0 : p.proxy) == null ? void 0 : a.$emit) == null ? void 0 : l.bind(p == null ? void 0 : p.proxy));
  let g = d;
  g = g || `update:${t.toString()}`;
  const h = (b) => i ? typeof i == "function" ? i(b) : Bi(b) : b, y = () => ki(e[t]) ? h(e[t]) : u, w = (b) => {
    m ? m(b) && v(g, b) : v(g, b);
  };
  if (c) {
    const b = y(), k = T(b);
    let x = !1;
    return H(
      () => e[t],
      (E) => {
        x || (x = !0, k.value = h(E), se(() => x = !1));
      }
    ), H(
      k,
      (E) => {
        !x && (E !== e[t] || s) && w(E);
      },
      { deep: s }
    ), k;
  } else
    return O({
      get() {
        return y();
      },
      set(b) {
        w(b);
      }
    });
}
const zr = {
  __name: "Input",
  props: {
    defaultValue: { type: [String, Number], required: !1 },
    modelValue: { type: [String, Number], required: !1 },
    class: { type: null, required: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = Di(n, "modelValue", t, {
      passive: !0,
      defaultValue: n.defaultValue
    });
    return (a, l) => tr((_(), L("input", {
      "onUpdate:modelValue": l[0] || (l[0] = (i) => nr(o) ? o.value = i : null),
      class: X(
        f(G)(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          n.class
        )
      )
    }, null, 2)), [
      [so, f(o)]
    ]);
  }
}, Li = {
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
    const t = e, n = O(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (_(), P(f(us), z(n.value, {
      class: f(G)(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        t.class
      )
    }), {
      default: C(() => [
        A(f(ds), {
          class: "h-full w-full flex-1 bg-primary transition-all",
          style: kt(`transform: translateX(-${100 - (t.modelValue ?? 0)}%);`)
        }, null, 8, ["style"])
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, jr = {
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
    const n = e, r = t, o = O(() => {
      const { class: l, ...i } = n;
      return i;
    }), a = ft(o, r);
    return (l, i) => (_(), P(f(Zs), z(f(a), {
      class: f(G)(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        n.class
      )
    }), {
      default: C(() => [
        A(f(Js), {
          class: X(
            f(G)(
              "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5"
            )
          )
        }, {
          default: C(() => [
            B(l.$slots, "thumb")
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, pt = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Ni = {
  name: "CalculationRoute",
  components: { Switch: jr, Input: zr, Label: Pt },
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
}, Fi = { class: "flex justify-between" }, zi = { className: "flex items-center space-x-2" }, ji = { class: "grid items-center w-full gap-8" }, Wi = { class: "flex flex-col space-y-1.5" }, Hi = { class: "flex flex-col space-y-1.5" };
function Gi(e, t, n, r, o, a) {
  const l = F("Label"), i = F("Switch"), c = F("Input");
  return _(), L("div", null, [
    M("form", {
      ref: "form",
      onSubmit: t[3] || (t[3] = me((...d) => a.validateInput && a.validateInput(...d), ["prevent"])),
      class: "space-y-6"
    }, [
      M("div", Fi, [
        A(l, {
          for: "calculation-type",
          class: "text-base font-medium"
        }, {
          default: C(() => t[4] || (t[4] = [
            J("Berechnungsmodus")
          ])),
          _: 1
        }),
        M("div", zi, [
          A(l, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: C(() => t[5] || (t[5] = [
              J("Einfach")
            ])),
            _: 1
          }),
          A(i, {
            id: "calculation-type",
            checked: o.localAdvancedCalculation,
            "onUpdate:checked": t[0] || (t[0] = (d) => o.localAdvancedCalculation = d)
          }, null, 8, ["checked"]),
          A(l, {
            for: "calculation-type",
            class: "text-sm"
          }, {
            default: C(() => t[6] || (t[6] = [
              J("Detailliert")
            ])),
            _: 1
          })
        ])
      ]),
      M("div", ji, [
        M("div", Wi, [
          A(l, { for: "startLocation" }, {
            default: C(() => t[7] || (t[7] = [
              J("Startort")
            ])),
            _: 1
          }),
          A(c, {
            id: "startLocation",
            placeholder: "Startort",
            modelValue: o.data.startLocation,
            "onUpdate:modelValue": t[1] || (t[1] = (d) => o.data.startLocation = d),
            required: ""
          }, null, 8, ["modelValue"])
        ]),
        M("div", Hi, [
          A(l, { for: "endLocation" }, {
            default: C(() => t[8] || (t[8] = [
              J("Zielort")
            ])),
            _: 1
          }),
          A(c, {
            id: "endLocation",
            placeholder: "Zielort",
            modelValue: o.data.endLocation,
            "onUpdate:modelValue": t[2] || (t[2] = (d) => o.data.endLocation = d),
            required: ""
          }, null, 8, ["modelValue"])
        ])
      ])
    ], 544)
  ]);
}
const Ui = /* @__PURE__ */ pt(Ni, [["render", Gi]]), Wr = {
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
    const n = e, r = t, o = O(() => {
      const { class: l, ...i } = n;
      return i;
    }), a = ft(o, r);
    return (l, i) => (_(), P(f(ps), z({
      class: f(G)("grid gap-2", n.class)
    }, f(a)), {
      default: C(() => [
        B(l.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}, Hr = {
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
    const t = e, n = O(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Le(n);
    return (o, a) => (_(), P(f(ys), z(f(r), {
      class: f(G)(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        t.class
      )
    }), {
      default: C(() => [
        A(f(bs), { class: "flex items-center justify-center" }, {
          default: C(() => [
            A(f(ii), { class: "h-2.5 w-2.5 fill-current text-current" })
          ]),
          _: 1
        })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}, Ki = {
  name: "CalculationTransportMedium",
  components: { RadioGroupItem: Hr, RadioGroup: Wr, Button: Bt, Label: Pt, Car: Tn, Bus: $r, Plane: fi, Train: qr },
  props: {
    advancedCalculation: Boolean,
    calculationData: Object
  },
  emits: ["update-data", "update-validity"],
  data() {
    return {
      data: { ...this.calculationData },
      transportModes: ["car", "bus", "train", "plane"],
      icons: {
        car: "Car",
        bus: "Bus",
        train: "Train",
        plane: "Plane"
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
}, Yi = ["for"], Xi = { class: "text-sm font-medium" };
function Zi(e, t, n, r, o, a) {
  const l = F("Label"), i = F("RadioGroupItem"), c = F("RadioGroup");
  return _(), L("div", null, [
    M("form", {
      ref: "form",
      onSubmit: t[1] || (t[1] = me((...d) => a.validateInput && a.validateInput(...d), ["prevent"])),
      class: "space-y-4"
    }, [
      A(l, null, {
        default: C(() => t[2] || (t[2] = [
          J("Transportmittel")
        ])),
        _: 1
      }),
      A(c, {
        modelValue: o.data.transportMode,
        "onUpdate:modelValue": t[0] || (t[0] = (d) => o.data.transportMode = d),
        class: "grid grid-cols-2 gap-4 sm:grid-cols-4"
      }, {
        default: C(() => [
          (_(!0), L(we, null, st(o.transportModes, (d) => (_(), L("label", {
            key: d,
            for: `radio-${d}`,
            class: X(["flex flex-col items-center justify-center h-24 p-4 border rounded-lg cursor-pointer transition-all", {
              "bg-primary text-white": o.data.transportMode === d
            }])
          }, [
            A(i, {
              id: `radio-${d}`,
              value: d,
              class: "hidden",
              required: ""
            }, null, 8, ["id", "value"]),
            (_(), P(Qe(o.icons[d]), { class: "h-8 w-8 mb-2" })),
            M("span", Xi, fe(a.capitalize(d)), 1)
          ], 10, Yi))), 128))
        ]),
        _: 1
      }, 8, ["modelValue"])
    ], 544)
  ]);
}
const Ji = /* @__PURE__ */ pt(Ki, [["render", Zi]]), Qi = {
  name: "CalculationFuel",
  components: { RadioGroupItem: Hr, RadioGroup: Wr, Button: Bt, Label: Pt, Fuel: di, Droplet: ui, Zap: mi, Car: Tn },
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
          return ["petrol", "diesel", "electric"];
        case "bus":
          return ["diesel"];
        case "train":
          return ["electric"];
        case "plane":
          return ["kerosene"];
        default:
          return [];
      }
    },
    vehicleSizes() {
      return ["small", "medium", "large"];
    },
    icons() {
      return {
        petrol: "Fuel",
        diesel: "Fuel",
        electric: "Zap",
        kerosene: "Droplet"
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
      const e = this.$refs.form, t = e.checkValidity();
      console.error(e.checkValidity()), this.$emit("update-validity", t);
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
}, eu = ["for"], tu = { class: "text-sm font-medium" }, nu = { key: 0 }, ru = ["for"], ou = { class: "text-sm font-medium" };
function au(e, t, n, r, o, a) {
  const l = F("Label"), i = F("RadioGroupItem"), c = F("RadioGroup"), d = F("Car");
  return _(), L("div", null, [
    M("form", {
      ref: "form",
      onSubmit: t[2] || (t[2] = me((...s) => a.validateInput && a.validateInput(...s), ["prevent"])),
      class: "space-y-6"
    }, [
      M("div", null, [
        A(l, { class: "mb-2 block" }, {
          default: C(() => t[3] || (t[3] = [
            J("Kraftstoff")
          ])),
          _: 1
        }),
        A(c, {
          modelValue: o.data.fuelType,
          "onUpdate:modelValue": t[0] || (t[0] = (s) => o.data.fuelType = s),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: C(() => [
            (_(!0), L(we, null, st(a.availableFuels, (s) => (_(), L("label", {
              key: s,
              for: `radio-${s}`,
              class: X(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.fuelType === s,
                "border-gray-300": o.data.fuelType !== s
              }])
            }, [
              A(i, {
                id: `radio-${s}`,
                value: s,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              (_(), P(Qe(a.icons[s]), { class: "h-6 w-6 mb-2" })),
              M("span", tu, fe(a.capitalize(s)), 1)
            ], 10, eu))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]),
      o.data.transportMode === "car" ? (_(), L("div", nu, [
        A(l, { class: "mb-2 block" }, {
          default: C(() => t[4] || (t[4] = [
            J("Fahrzeuggröße")
          ])),
          _: 1
        }),
        A(c, {
          modelValue: o.data.vehicleSize,
          "onUpdate:modelValue": t[1] || (t[1] = (s) => o.data.vehicleSize = s),
          class: "grid grid-cols-1 sm:grid-cols-3 gap-4",
          "aria-required": "true"
        }, {
          default: C(() => [
            (_(!0), L(we, null, st(a.vehicleSizes, (s) => (_(), L("label", {
              key: s,
              for: `radio-${s}`,
              class: X(["flex flex-col items-center justify-center h-20 p-4 border rounded-lg cursor-pointer transition-all", {
                "bg-primary text-white": o.data.vehicleSize === s,
                "border-gray-300": o.data.vehicleSize !== s
              }])
            }, [
              A(i, {
                id: `radio-${s}`,
                value: s,
                class: "hidden",
                required: ""
              }, null, 8, ["id", "value"]),
              A(d, {
                class: X(a.sizeIconClass(s))
              }, null, 8, ["class"]),
              M("span", ou, fe(a.sizeTranslations[s]), 1)
            ], 10, ru))), 128))
          ]),
          _: 1
        }, 8, ["modelValue"])
      ])) : oe("", !0)
    ], 544)
  ]);
}
const lu = /* @__PURE__ */ pt(Qi, [["render", au]]), su = {
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
    const t = T(null), n = e, r = T(n.direction === "down" ? n.value : 0), o = qi(r, {
      delay: n.delay,
      duration: n.duration,
      transition: Ri[n.transition]
    }), a = O(() => new Intl.NumberFormat("en-US", {
      minimumFractionDigits: n.decimalPlaces,
      maximumFractionDigits: n.decimalPlaces
    }).format(Number(o.value.toFixed(n.decimalPlaces)))), l = Ii(t, {
      threshold: 0
    });
    return H(
      l,
      (i) => {
        i && (r.value = n.direction === "down" ? 0 : n.value);
      },
      { immediate: !0 }
    ), (i, c) => (_(), L("span", {
      ref_key: "spanRef",
      ref: t,
      class: X(f(G)("inline-block tabular-nums text-black dark:text-white tracking-wider", n.class))
    }, fe(a.value), 3));
  }
}, iu = {
  name: "CalculationResult",
  components: { NumberTicker: su, Button: Bt, CardContent: pr, Card: fr, Leaf: ci, Trees: pi, Car: Tn, Train: qr, Bus: $r, Bike: oi },
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
}, uu = { class: "space-y-6 text-center" }, du = { class: "grid gap-8 md:grid-cols-2" }, cu = { class: "flex items-center justify-center mb-4" }, fu = { class: "text-5xl font-bold text-red-700 mb-4" }, pu = { class: "text-lg" }, mu = { class: "flex items-center justify-center mb-4" }, vu = { class: "text-3xl font-bold text-green-700 mb-4" }, hu = { class: "mt-8" }, gu = { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-4" }, yu = { class: "flex items-center justify-center mb-2" }, bu = { class: "text-lg font-semibold mb-2" }, wu = { class: "text-lg font-bold text-gray-900" }, xu = { class: "text-sm text-gray-700" };
function Cu(e, t, n, r, o, a) {
  const l = F("Leaf"), i = F("NumberTicker"), c = F("CardContent"), d = F("Card"), s = F("Trees"), u = F("Button");
  return _(), L("div", uu, [
    t[10] || (t[10] = M("h2", { class: "text-3xl font-bold mb-8" }, "Ihre CO2-Bilanz", -1)),
    M("div", du, [
      A(d, { class: "bg-gradient-to-br from-red-100 to-orange-100 hover:scale-105 duration-300" }, {
        default: C(() => [
          A(c, { class: "p-6" }, {
            default: C(() => [
              M("div", cu, [
                A(l, { class: "h-12 w-12 text-red-600 mr-4" }),
                t[0] || (t[0] = M("h3", { class: "text-2xl font-semibold" }, "CO2-Emission", -1))
              ]),
              M("p", fu, [
                A(i, {
                  class: "text-red-700",
                  "decimal-places": 2,
                  duration: 2e3,
                  value: o.result.emission
                }, null, 8, ["value"]),
                t[1] || (t[1] = M("span", { class: "text-2xl ml-2" }, "kg", -1))
              ]),
              M("p", pu, " Ihre Reise von " + fe(o.data.startLocation) + " nach " + fe(o.data.endLocation) + " verursacht diese Menge an CO2-Emissionen. ", 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      A(d, { class: "bg-gradient-to-br from-green-100 to-emerald-100 hover:scale-105 duration-300" }, {
        default: C(() => [
          A(c, { class: "p-6" }, {
            default: C(() => [
              M("div", mu, [
                A(s, { class: "h-12 w-12 text-green-600 mr-4" }),
                t[2] || (t[2] = M("h3", { class: "text-2xl font-semibold" }, "Baum-Äquivalent", -1))
              ]),
              M("p", vu, [
                A(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  value: o.result.yearsToBind.years
                }, null, 8, ["value"]),
                t[3] || (t[3] = M("span", { class: "text-2xl ml-2" }, "Jahr(e), ", -1)),
                A(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 500,
                  value: o.result.yearsToBind.months
                }, null, 8, ["value"]),
                t[4] || (t[4] = M("span", { class: "text-2xl ml-2" }, "Monat(e), ", -1)),
                A(i, {
                  class: "text-green-700",
                  "decimal-places": 0,
                  duration: 1e3,
                  delay: 1e3,
                  value: o.result.yearsToBind.days
                }, null, 8, ["value"]),
                t[5] || (t[5] = M("span", { class: "text-2xl ml-2" }, "Tag(e)", -1))
              ]),
              t[6] || (t[6] = M("p", { class: "text-lg" }, " So lange braucht eine typische Buche, um diese Menge CO2 zu binden. ", -1))
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    M("div", hu, [
      t[7] || (t[7] = M("h3", { class: "text-2xl font-semibold mb-4" }, "Vergleich mit anderen Transportmitteln", -1)),
      M("div", gu, [
        (_(!0), L(we, null, st(o.dummy, (m, p) => (_(), P(d, {
          key: p,
          class: "bg-gray-100 hover:scale-105 duration-300"
        }, {
          default: C(() => [
            A(c, { class: "p-4" }, {
              default: C(() => [
                M("div", yu, [
                  (_(), P(Qe(a.icons[m.transportMediumDTO.transportMediumName] || "Leaf"), { class: "h-8 w-8 text-gray-600" }))
                ]),
                M("h4", bu, fe(m.transportMediumDTO.transportMediumName) + " (" + fe(m.transportMediumDTO.transportMediumFuel) + ") ", 1),
                M("p", wu, fe(m.emission.toFixed(2)) + " kg CO2 ", 1),
                M("p", xu, " Bindungszeit: " + fe(a.formatYearsToBind(m.yearsToBind)), 1)
              ]),
              _: 2
            }, 1024)
          ]),
          _: 2
        }, 1024))), 128))
      ])
    ]),
    M("div", null, [
      t[9] || (t[9] = M("div", { className: "mt-8 text-xs text-gray-500 flex items-center justify-center" }, " Entwickelt von Kleemann und Siemens Software GbR ", -1)),
      A(u, {
        onClick: a.resetCalculation,
        class: "mt-4"
      }, {
        default: C(() => t[8] || (t[8] = [
          J("Neue Berechnung")
        ])),
        _: 1
      }, 8, ["onClick"])
    ])
  ]);
}
const _u = /* @__PURE__ */ pt(iu, [["render", Cu]]), ku = {
  __name: "AlertDescription",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(f(G)("text-sm [&_p]:leading-relaxed", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Su = {
  __name: "AlertTitle",
  props: {
    class: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("h5", {
      class: X(f(G)("mb-1 font-medium leading-none tracking-tight", t.class))
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Au = Dr(
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
), Eu = {
  __name: "Alert",
  props: {
    class: { type: null, required: !1 },
    variant: { type: null, required: !1 }
  },
  setup(e) {
    const t = e;
    return (n, r) => (_(), L("div", {
      class: X(f(G)(f(Au)({ variant: e.variant }), t.class)),
      role: "alert"
    }, [
      B(n.$slots, "default")
    ], 2));
  }
}, Tu = {
  name: "CalculationStepper",
  components: {
    AlertDescription: ku,
    AlertTitle: Su,
    Alert: Eu,
    ArrowLeft: ni,
    ArrowRight: ri,
    AlertCircle: si,
    Switch: jr,
    Progress: Li,
    Input: zr,
    Label: Pt,
    Button: Bt,
    CardFooter: xi,
    SelectItem: gi,
    SelectContent: wi,
    SelectTrigger: vi,
    Select: Qs,
    CardContent: pr,
    CardDescription: Wo,
    CardTitle: jo,
    CardHeader: zo,
    Card: fr
  },
  data() {
    return {
      step: 1,
      maxStep: 4,
      advancedCalculation: !0,
      stepsValidity: [!1, !1, !1, !1],
      calculationData: {
        startLocation: "",
        endLocation: "",
        transportMode: "",
        fuelType: "",
        vehicleSize: "",
        distance: 0,
        co2Emission: 0,
        treeYears: 0,
        simpleResults: {}
      },
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
          return Ui;
        case 2:
          return Ji;
        case 3:
          return lu;
        case 4:
          return _u;
      }
    }
  },
  methods: {
    updateStepValidity(e, t) {
      this.stepsValidity[e] = t;
    },
    isCurrentStepValid() {
      return console.log("CURRENT STEPS VALIDITY: " + this.stepsValidity), this.stepsValidity[this.step - 1];
    },
    nextStep() {
      this.isCurrentStepValid() && this.step < this.maxStep && this.step++;
    },
    prevStep() {
      this.step > 1 && this.step--;
    },
    updateData(e) {
      Object.assign(this.calculationData, e);
    },
    resetData() {
      this.step = 1, Object.assign(this.calculationData, {});
    }
  }
}, Ou = { class: "w-full bg-white" }, Bu = { class: "mt-2 mb-4" }, Pu = { class: "w-full" }, Iu = { class: "w-full flex justify-between" }, Mu = { class: "mt-6" };
function Ru(e, t, n, r, o, a) {
  const l = F("Progress"), i = F("CardHeader"), c = F("CardContent"), d = F("AlertCircle"), s = F("AlertTitle"), u = F("AlertDescription"), m = F("Alert"), p = F("ArrowLeft"), v = F("Button"), g = F("ArrowRight"), h = F("CardFooter"), y = F("Card");
  return _(), L(we, null, [
    t[9] || (t[9] = M("div", null, [
      M("p", null, "CalculationComponent")
    ], -1)),
    M("div", Ou, [
      A(y, { class: "max-w-4xl lg:mx-auto m-6" }, {
        default: C(() => [
          A(i, null, {
            default: C(() => [
              M("div", Bu, [
                A(l, {
                  modelValue: a.progress,
                  "onUpdate:modelValue": t[0] || (t[0] = (w) => a.progress = w),
                  class: "w-full mx-auto"
                }, null, 8, ["modelValue"])
              ])
            ]),
            _: 1
          }),
          A(c, null, {
            default: C(() => [
              (_(), P(Qe(a.currentStep), {
                required: "",
                advancedCalculation: o.advancedCalculation,
                "onUpdate:advancedCalculation": t[1] || (t[1] = (w) => o.advancedCalculation = w),
                "calculation-data": o.calculationData,
                calculationResult: o.calculationResult,
                dummySimpleResult: o.dummySimpleResult,
                onUpdateData: a.updateData,
                onUpdateValidity: t[2] || (t[2] = (w) => a.updateStepValidity(o.step - 1, w)),
                onResetData: a.resetData,
                onNext: a.nextStep,
                onPrev: a.prevStep
              }, null, 40, ["advancedCalculation", "calculation-data", "calculationResult", "dummySimpleResult", "onUpdateData", "onResetData", "onNext", "onPrev"]))
            ]),
            _: 1
          }),
          A(h, { class: "w-full flex flex-col px-6 pb-6" }, {
            default: C(() => [
              M("div", Pu, [
                !a.isCurrentStepValid() && o.step !== o.maxStep ? (_(), P(m, {
                  key: 0,
                  variant: "",
                  class: "px-4 py-2.5 mb-3"
                }, {
                  default: C(() => [
                    A(d, { class: "w-4 h-4" }),
                    A(s, null, {
                      default: C(() => t[3] || (t[3] = [
                        J("Unvollständig")
                      ])),
                      _: 1
                    }),
                    A(u, null, {
                      default: C(() => t[4] || (t[4] = [
                        J(" Bitte überprüfe deine Eingabedaten vor dem nächsten Schritt. ")
                      ])),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : oe("", !0)
              ]),
              M("div", Iu, [
                o.step > 1 ? (_(), P(v, {
                  key: 0,
                  type: "button",
                  onClick: a.prevStep,
                  variant: "outline"
                }, {
                  default: C(() => [
                    A(p, { class: "mr-2 h-4 w-4" }),
                    t[5] || (t[5] = J(" Zurück "))
                  ]),
                  _: 1
                }, 8, ["onClick"])) : oe("", !0),
                o.step < o.maxStep && o.step !== o.maxStep - 1 ? (_(), P(v, {
                  key: 1,
                  disabled: !a.isCurrentStepValid(),
                  type: "button",
                  onClick: a.nextStep,
                  class: X(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: C(() => [
                    t[6] || (t[6] = J(" Weiter ")),
                    A(g, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : oe("", !0),
                o.step === o.maxStep - 1 ? (_(), P(v, {
                  key: 2,
                  disabled: !a.isCurrentStepValid(),
                  type: "button",
                  onClick: a.nextStep,
                  class: X(o.step === 1 ? "w-full" : "ml-auto")
                }, {
                  default: C(() => [
                    t[7] || (t[7] = J(" Berechnen ")),
                    A(g, { class: "ml-2 h-4 w-4" })
                  ]),
                  _: 1
                }, 8, ["disabled", "onClick", "class"])) : oe("", !0)
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    M("div", Mu, [
      J(fe(this.advancedCalculation), 1),
      t[8] || (t[8] = M("br", null, null, -1)),
      J(" " + fe(this.calculationData), 1)
    ])
  ], 64);
}
const $u = /* @__PURE__ */ pt(Tu, [["render", Ru]]);
function Lu(e) {
  const t = document.querySelector(e);
  if (!t) {
    console.error(`Element mit dem Selector "${e}" nicht gefunden.`);
    return;
  }
  io($u).mount(t);
}
export {
  Lu as default
};
