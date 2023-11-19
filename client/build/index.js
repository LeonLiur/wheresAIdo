var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 98,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-7ISE4VV6.css";

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: tailwind_default }
];
function App() {
  return /* @__PURE__ */ jsxDEV2("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV2("head", { children: [
      /* @__PURE__ */ jsxDEV2("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 20,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV2("body", { children: [
      /* @__PURE__ */ jsxDEV2(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV2(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
<<<<<<< HEAD
import { useState } from "react";
=======
import { useEffect, useState } from "react";
import * as io from "socket.io-client";
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5

// public/waldo.json
var waldo_default = {
  coords: [
    {
<<<<<<< HEAD
      src: "/Users/yiyixu/Documents/Personal/wheresAIdo/client/public/assets/1.jpg",
=======
      src: "assets/1.jpg",
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5
      x: "35.506003430531734",
      y: "43.52469996558499"
    },
    {}
  ]
};

// app/routes/_index.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
<<<<<<< HEAD
var threshold = 1.5, meta = () => [
=======
var threshold = 1.5, socket = io.connect("http://localhost:3001/"), meta = () => [
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
<<<<<<< HEAD
  let [msg, setMsg] = useState(), [found, setFound] = useState(!1), sendMessage = () => {
    console.log(1);
  };
  function handleClick(event) {
    let img = new Image();
    img.src = "/assets/1.jpg", img.onload = () => {
      let renderedWidth = Math.min(window.innerWidth, img.width), renderedHeight = img.height * (window.innerWidth / img.width), x = event.clientX / renderedWidth * 100, y = event.clientY / renderedHeight * 100, waldo_x = waldo_default.coords[0].x, waldo_y = waldo_default.coords[0].y;
      Math.abs(x - Number(waldo_x)) < threshold && Math.abs(y - Number(waldo_y)) < threshold ? console.log("You found Waldo!") : console.log("Try again!");
    };
  }
  return /* @__PURE__ */ jsxDEV3("div", { children: /* @__PURE__ */ jsxDEV3("img", { src: "/assets/1.jpg", alt: "Waldo", onClick: handleClick }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 66,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 65,
=======
  let [found, setFound] = useState(!1);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  function handleClick(event) {
    let img = new Image();
    img.src = waldo_default.coords[0].src, img.onload = () => {
      let renderedWidth = Math.min(window.innerWidth, img.width), renderedHeight = img.height * (window.innerWidth / img.width), x = event.clientX / renderedWidth * 100, y = event.clientY / renderedHeight * 100, waldo_x = waldo_default.coords[0].x, waldo_y = waldo_default.coords[0].y;
      found || (Math.abs(x - Number(waldo_x)) < threshold && Math.abs(y - Number(waldo_y)) < threshold ? (console.log("You found Waldo!"), socket.emit("send_message", { message: "found waldo" }), setFound(!1)) : console.log("Try again!"));
    };
  }
  return /* @__PURE__ */ jsxDEV3("div", { children: /* @__PURE__ */ jsxDEV3("img", { src: waldo_default.coords[0].src, alt: "Waldo", onClick: handleClick }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 65,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 64,
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5
    columnNumber: 5
  }, this);
}

// app/routes/room.tsx
var room_exports = {};
__export(room_exports, {
  default: () => Room
});

// app/@/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// app/@/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// app/@/components/ui/button.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive: "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/@/components/ui/button.tsx",
      lineNumber: 48,
      columnNumber: 7
    },
    this
  )
);
Button.displayName = "Button";

// app/routes/room.tsx
<<<<<<< HEAD
import * as io from "socket.io-client";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var socket = io.connect("http://localhost:3001/");
=======
import * as io2 from "socket.io-client";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var socket2 = io2.connect("http://localhost:3001/");
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5
async function getRoom() {
  let result = await fetch("http://localhost:3001/getRoom");
  console.log(await result.json());
}
function Room() {
  let sendMessage = () => {
<<<<<<< HEAD
    console.log(1), socket.emit("send_message", {});
=======
    console.log(1), socket2.emit("send_message", {});
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5
  };
  return /* @__PURE__ */ jsxDEV5("div", { className: "p-4 flex gap-4", children: [
    /* @__PURE__ */ jsxDEV5(Button, { children: "Join Room" }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Button, { onClick: getRoom, children: "Start Room" }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/room.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
<<<<<<< HEAD
var assets_manifest_default = { entry: { module: "/build/entry.client-C4YYY6DV.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-5L4A6FHF.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-OPY7SWG5.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-4BXZ5K6I.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-FW6A2UT5.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/room": { id: "routes/room", parentId: "root", path: "room", index: void 0, caseSensitive: void 0, module: "/build/routes/room-CDKGFM2Y.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 } }, version: "7ba0244f", hmr: { runtime: "/build/_shared/chunk-OPY7SWG5.js", timestamp: 1700365087632 }, url: "/build/manifest-7BA0244F.js" };
=======
var assets_manifest_default = { entry: { module: "/build/entry.client-NEWLRCSP.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-CQEVPDCO.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-U6TTRABJ.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-I2TY6DHX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-7MXRP536.js", imports: ["/build/_shared/chunk-KRYXFZVY.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/room": { id: "routes/room", parentId: "root", path: "room", index: void 0, caseSensitive: void 0, module: "/build/routes/room-3GVHL4SN.js", imports: ["/build/_shared/chunk-KRYXFZVY.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 } }, version: "ebcc527a", hmr: { runtime: "/build/_shared/chunk-U6TTRABJ.js", timestamp: 1700366104345 }, url: "/build/manifest-EBCC527A.js" };
>>>>>>> 1a4519f4f6f716cccd52cd30f3fba9adcfb377e5

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/room": {
    id: "routes/room",
    parentId: "root",
    path: "room",
    index: void 0,
    caseSensitive: void 0,
    module: room_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
