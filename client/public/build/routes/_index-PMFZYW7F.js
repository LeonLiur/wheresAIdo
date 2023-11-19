import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-OPY7SWG5.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_react = __toESM(require_react(), 1);

// public/waldo.json
var waldo_default = {
  coords: [
    {
      src: "/Users/yiyixu/Documents/Personal/wheresAIdo/client/public/assets/1.jpg",
      x: "35.506003430531734",
      y: "43.52469996558499"
    },
    {}
  ]
};

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1700364171213.3657";
}
var meta = () => {
  return [{
    title: "New Remix App"
  }, {
    name: "description",
    content: "Welcome to Remix!"
  }];
};
function Index() {
  _s();
  const [msg, setMsg] = (0, import_react.useState)();
  const sendMessage = () => {
    console.log(1);
  };
  function handleClick(event) {
    const img = new Image();
    img.src = "/assets/1.jpg";
    img.onload = () => {
      const renderedWidth = Math.min(window.innerWidth, img.width);
      const renderedHeight = img.height * (window.innerWidth / img.width);
      const x = event.clientX / renderedWidth * 100;
      const y = event.clientY / renderedHeight * 100;
      const waldo_x = waldo_default.coords[0].x;
      const waldo_y = waldo_default.coords[0].y;
      if (Math.abs(x - Number(waldo_x)) < 1.5 && Math.abs(y - Number(waldo_y)) < 1.5) {
        console.log("You found Waldo!");
      } else {
        console.log("Try again!");
      }
    };
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/assets/1.jpg", alt: "Waldo", onClick: handleClick }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}
_s(Index, "aaMilNPdKNCWMQhsqvqt8D/J2iM=");
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-PMFZYW7F.js.map
