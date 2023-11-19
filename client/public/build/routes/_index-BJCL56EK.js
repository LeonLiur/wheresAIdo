import {
  lookup
} from "/build/_shared/chunk-KRYXFZVY.js";
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
      src: "assets/1.jpg",
      x: "35.506003430531734",
      y: "43.52469996558499"
    },
    {
      src: "assets/2.jpg",
      x: "7.5126903553299496",
      y: "69.47246263902584"
    },
    {
      src: "assets/3.jpg",
      x: "69.13705583756345",
      y: "39.223687040215545"
    },
    {
      src: "assets/4.jpg",
      x: "73.19796954314721",
      y: "23.93309717708067"
    },
    {
      src: "assets/6.jpg",
      x: "84.8730964467005",
      y: "35.06863544697237"
    }
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
  import.meta.hot.lastModified = "1700369023183.8237";
}
var threshold = 1.5;
var pic_id = 1;
var socket = lookup("http://localhost:3001/");
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
  const [found, setFound] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  function handleClick(event) {
    const img = new Image();
    img.src = waldo_default.coords[0].src;
    img.onload = () => {
      const renderedWidth = Math.min(window.innerWidth, img.width);
      const renderedHeight = img.height * (window.innerWidth / img.width);
      const x = event.clientX / renderedWidth * 100;
      const y = event.clientY / renderedHeight * 100;
      const waldo_x = waldo_default.coords[pic_id].x;
      const waldo_y = waldo_default.coords[pic_id].y;
      if (!found) {
        if (Math.abs(x - Number(waldo_x)) < threshold && Math.abs(y - Number(waldo_y)) < threshold) {
          console.log("You found Waldo!");
          socket.emit("send_message", {
            message: "found waldo"
          });
          setFound(false);
        } else {
          console.log("Try again!");
        }
      }
    };
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: waldo_default.coords[pic_id].src, alt: "Waldo", onClick: handleClick }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 77,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}
_s(Index, "GAGVaynpim8Xx+EdaT5cVB2SPJo=");
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-BJCL56EK.js.map
