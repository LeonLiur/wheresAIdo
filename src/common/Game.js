import { GameEngine, BaseTypes, DynamicObject, SimplePhysicsEngine } from 'lance-gg';

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
        this.on('postStep', this.gameLogic.bind(this));

        // server-only code
        this.on('server__init', this.serverSideInit.bind(this));
        this.on('server__playerJoined', this.serverSidePlayerJoined.bind(this));
        this.on('server__playerDisconnected', this.serverSidePlayerDisconnected.bind(this));

        // client-only code
        this.on('client__rendererReady', this.clientSideInit.bind(this));
        this.on('client__draw', this.clientSideDraw.bind(this));
    }

    registerClasses(serializer) {
        serializer.registerClass(Cursor);
    }

    gameLogic() {
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
        this.addObjectToWorld(new Cursor(this, null, { playerID: 0, position: new TwoVector(0, 0) }));
    }

    serverSidePlayerJoined(ev) {
        let cursors = this.gameEngine.world.queryObjects({ instanceType: Cursor });
    }

    serverSidePlayerDisconnected(ev) {
    }


    // /////////////////////////////////////////////////////////
    //
    // CLIENT ONLY CODE
    //
    // /////////////////////////////////////////////////////////
    clientSideInit() {
    }

    clientSideDraw() {
    }

    updateMouseXY(e) {
        e.preventDefault();
        if (e.touches) e = e.touches.item(0);
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }
}
