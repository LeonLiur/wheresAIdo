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
var tailwind_default = "/build/_assets/tailwind-6EG5S6DK.css";

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

// app/routes/background_prompt.tsx
var background_prompt_exports = {};
__export(background_prompt_exports, {
  default: () => background_prompt_default
});
import { useState } from "react";

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
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
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
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
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

// app/routes/background_prompt.tsx
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var TextBoxComponent = () => {
  let [text, setText] = useState(""), [submittedText, setSubmittedText] = useState(""), [imgUrl, setImgUrl] = useState("");
  return /* @__PURE__ */ jsxDEV4("div", { children: [
    /* @__PURE__ */ jsxDEV4("input", { type: "text", value: text, onChange: (event) => {
      setText(event.target.value);
    } }, void 0, !1, {
      fileName: "app/routes/background_prompt.tsx",
      lineNumber: 28,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4(Button, { onClick: async () => {
      let prompt = " A densely packed cartoonic 'where's waldo?' scene with a " + text + "background without Waldo";
      setSubmittedText(text);
      let res = await fetch(`http://localhost:3001/generate_waldo?prompt=${prompt}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json()).catch((error) => console.error("Error:", error));
      console.log(res.img_url), setImgUrl(res.img_url);
    }, children: "Submit" }, void 0, !1, {
      fileName: "app/routes/background_prompt.tsx",
      lineNumber: 29,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("p", { children: [
      "Typed Text: ",
      submittedText
    ] }, void 0, !0, {
      fileName: "app/routes/background_prompt.tsx",
      lineNumber: 30,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV4("img", { src: imgUrl || "" }, void 0, !1, {
      fileName: "app/routes/background_prompt.tsx",
      lineNumber: 31,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/background_prompt.tsx",
    lineNumber: 27,
    columnNumber: 9
  }, this);
}, background_prompt_default = TextBoxComponent;

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
import { useEffect, useState as useState2 } from "react";
import * as io from "socket.io-client";

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
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var threshold = 1.5, pic_id = 1, socket = io.connect("http://localhost:3001/"), meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  let [found, setFound] = useState2(!1);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  function handleClick(event) {
    let img = new Image();
    img.src = waldo_default.coords[0].src, img.onload = () => {
      let renderedWidth = Math.min(window.innerWidth, img.width), renderedHeight = img.height * (window.innerWidth / img.width), x = event.clientX / renderedWidth * 100, y = event.clientY / renderedHeight * 100, waldo_x = waldo_default.coords[pic_id].x, waldo_y = waldo_default.coords[pic_id].y;
      found || (Math.abs(x - Number(waldo_x)) < threshold && Math.abs(y - Number(waldo_y)) < threshold ? (console.log("You found Waldo!"), socket.emit("send_message", { message: "found waldo" }), setFound(!1)) : console.log("Try again!"));
    };
  }
  return /* @__PURE__ */ jsxDEV5("div", { children: /* @__PURE__ */ jsxDEV5("img", { src: waldo_default.coords[pic_id].src, alt: "Waldo", onClick: handleClick }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 66,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}

// app/routes/room.tsx
var room_exports = {};
__export(room_exports, {
  default: () => room_default
});
import * as io2 from "socket.io-client";
import { useEffect as useEffect2, useState as useState3 } from "react";

// app/@/components/ui/input.tsx
import * as React3 from "react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var Input = React3.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxDEV6(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/@/components/ui/input.tsx",
      lineNumber: 11,
      columnNumber: 7
    },
    this
  )
);
Input.displayName = "Input";

// app/routes/room.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var socket2 = io2.connect("http://localhost:3001");
function App2() {
  let [message, setMessage] = useState3(""), [room, setRoom] = useState3(""), [messageReceived, setMessageReceived] = useState3(""), joinRoom = (room_id) => {
    setRoom(room_id), socket2.emit("join_room", room_id);
  }, sendMessage = () => {
    socket2.emit("send_message", { message, room });
  };
  return useEffect2(() => {
    socket2.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket2]), /* @__PURE__ */ jsxDEV7("div", { children: [
    /* @__PURE__ */ jsxDEV7(Button, { onClick: () => joinRoom("11"), children: " Join Room" }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Input, { onChange: (e) => setMessage(e.target.value) }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7(Button, { onClick: sendMessage, children: " Send mock message" }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV7("h3", { children: messageReceived }, void 0, !1, {
      fileName: "app/routes/room.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/room.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
var room_default = App2;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-XYZX3UAA.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-HZTFBMFD.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-OPY7SWG5.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-TUVJORWW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-3E2C4CTE.js", imports: ["/build/_shared/chunk-KRYXFZVY.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/background_prompt": { id: "routes/background_prompt", parentId: "root", path: "background_prompt", index: void 0, caseSensitive: void 0, module: "/build/routes/background_prompt-HV2BLIXR.js", imports: ["/build/_shared/chunk-QFZOKMSQ.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/room": { id: "routes/room", parentId: "root", path: "room", index: void 0, caseSensitive: void 0, module: "/build/routes/room-FF5DQHEF.js", imports: ["/build/_shared/chunk-QFZOKMSQ.js", "/build/_shared/chunk-KRYXFZVY.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 } }, version: "80cb3918", hmr: { runtime: "/build/_shared/chunk-OPY7SWG5.js", timestamp: 1700381961502 }, url: "/build/manifest-80CB3918.js" };

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
  "routes/background_prompt": {
    id: "routes/background_prompt",
    parentId: "root",
    path: "background_prompt",
    index: void 0,
    caseSensitive: void 0,
    module: background_prompt_exports
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
