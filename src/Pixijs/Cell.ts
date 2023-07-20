import { FederatedEventHandler, Sprite } from "pixi.js";
import { rectangle, wall } from "./Textures"


export class Cell extends Sprite {
    moveFn: FederatedEventHandler

    constructor(isPassable: boolean, fn: FederatedEventHandler, x = 0, y = 0) {
        super(isPassable ? rectangle : wall)
        this.x = x * this.texture.width
        this.y = y * this.texture.height
        this.eventMode = "static"
        this.moveFn = fn
    }

    setClickable() {
        this.cursor = "pointer"
        this.on("pointerdown", this.moveFn)
    }

    setUnclickable() {  
        this.cursor = ""
        this.on("pointerdown", () => { })
    }

}

