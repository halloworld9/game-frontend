import { Rectangle, Sprite } from "pixi.js"
import { unit } from "./Textures"

export class Unit extends Sprite {
    constructor(x = 0, y = 0) {
        const texture = unit
        super(texture)
        this.x = x * this.texture.width
        this.y = y * this.texture.height
        this.hitArea = new Rectangle(0, 0, 0, 0)
    }
}

