import {
  GameEngine,
  BaseTypes,
  DynamicObject,
  SimplePhysicsEngine,
  TwoVector,
} from "lance-gg";

class Cursor extends DynamicObject {
  constructor(gameEngine, options, props) {
    super(gameEngine, options, props);
    this.class = Cursor;

    this.mouseX = null;
    this.mouseY = null;
  }

  syncTo(other) {
    super.syncTo(other);
  }
}

// /////////////////////////////////////////////////////////
//
// GAME ENGINE
//
// /////////////////////////////////////////////////////////
export default class Game extends GameEngine {
  constructor(options) {
    super(options);
    this.physicsEngine = new SimplePhysicsEngine({ gameEngine: this });

    // common code
    this.on("postStep", this.gameLogic.bind(this));

    // server-only code
    this.on("server__init", this.serverSideInit.bind(this));
    this.on("server__playerJoined", this.serverSidePlayerJoined.bind(this));
    this.on(
      "server__playerDisconnected",
      this.serverSidePlayerDisconnected.bind(this)
    );

    // client-only code
    this.on("client__rendererReady", this.clientSideInit.bind(this));
    this.on("client__draw", this.clientSideDraw.bind(this));

    this.on(
      "client__updateMousePosition",
      this.onClientUpdateMousePosition.bind(this)
    );
  }

  registerClasses(serializer) {
    serializer.registerClass(Cursor);
  }

  gameLogic() {
    // Log the position of the cursors
    let cursors = this.gameEngine.world.queryObjects({ instanceType: Cursor });
    cursors.forEach((cursor) => {
      console.log(
        `Cursor Position - X: ${cursor.position.x}, Y: ${cursor.position.y}`
      );
    });
  }

  processInput(inputData, playerId) {
    super.processInput(inputData, playerId);
  }

  // /////////////////////////////////////////////////////////
  //
  // SERVER ONLY CODE
  //
  // /////////////////////////////////////////////////////////
  serverSideInit() {
    this.addObjectToWorld(
      new Cursor(this, null, { playerID: 0, position: new TwoVector(0, 0) })
    );
    console.log("Server socket connected!");
  }

  serverSidePlayerJoined(ev) {
    // You might want to perform additional logic when a player joins
  }

  serverSidePlayerDisconnected(ev) {
    // You might want to perform additional logic when a player disconnects
  }

  onClientUpdateMousePosition(data, playerId) {
    // Find the Cursor object associated with the player
    const cursor = this.world.queryObjects({
      playerId,
      instanceType: Cursor,
    })[0];
    if (cursor) {
      // Update the Cursor object's position based on the received mouse coordinates
      cursor.position.set(data.x, data.y);
      cursor.refreshToPhysics();
    }
  }

  // /////////////////////////////////////////////////////////
  //
  // CLIENT ONLY CODE
  //
  // /////////////////////////////////////////////////////////
  clientSideInit() {
    // Assuming you have some way to capture mouse events, like 'mousemove'
    window.addEventListener("click", (e) => {
        console.log("click");
    });
  }

  clientSideDraw() {
    // You might want to perform additional client-side drawing
  }

  updateMouseXY(e) {
    e.preventDefault();
    if (e.touches) e = e.touches.item(0);
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
    console.log(`Mouse Position - X: ${this.mouseX}, Y: ${this.mouseY}`);
  }
}
