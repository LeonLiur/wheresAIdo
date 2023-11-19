import {
  Button,
  lookup
} from "/build/_shared/chunk-4B7OYGOX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-THDIDIAX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/room.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/room.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/room.tsx"
  );
  import.meta.hot.lastModified = "1700362855014.4585";
}
var socket = lookup("http://localhost:3001/");
async function getRoom() {
  let result = await fetch("http://localhost:3001/getRoom");
  console.log(await result.json());
}
function Room() {
  const sendMessage = () => {
    console.log(1);
    socket.emit("send_message", {});
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "p-4 flex gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { children: "Join Room" }, void 0, false, {
      fileName: "app/routes/room.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { onClick: getRoom, children: "Start Room" }, void 0, false, {
      fileName: "app/routes/room.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/room.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
_c = Room;
var _c;
$RefreshReg$(_c, "Room");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Room as default
};
//# sourceMappingURL=/build/routes/room-MB3KVT5G.js.map
