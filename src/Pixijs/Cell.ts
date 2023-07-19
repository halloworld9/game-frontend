import { FederatedEventHandler, Sprite } from "pixi.js";
import { rectangle, wall } from "./Textures"


export class Cell extends Sprite {

    constructor(isPassable: boolean, x = 0, y = 0, fn: FederatedEventHandler) {
        super(isPassable ? rectangle : wall)
        this.x = x * this.texture.width
        this.y = y * this.texture.height
        this.eventMode = "static"
        this.on("pointerdown", fn)
    }


}

