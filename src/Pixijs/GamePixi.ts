import { Application, Container, FederatedMouseEvent } from "pixi.js"
import { Cell } from "./Cell"
import { request } from "../Util"
import { Game } from "../Objects"
import { Unit } from "./Unit"

export class GamePixi {
    app: Application<HTMLCanvasElement>
    cells: Cell[][]
    units: Unit[]
    gameMap = new Container()
    isMouseButtonDown = false;
    startPosition = { x: 0, y: 0 }


    constructor() {
        this.app = new Application<HTMLCanvasElement>({ background: '#1099bb', resizeTo: window })
        this.units = []
        this.cells = []
        this.gameMap.eventMode = "dynamic";
        this.gameMap.sortableChildren = true
        this.app.view.addEventListener("mousedown", (e) => this.rightDown(e))
        this.app.view.addEventListener("mouseup", (e) => this.rightUp(e))
        this.app.view.addEventListener("mousemove", (e) => this.moveMap(e))
        this.app.stage.addChild(this.gameMap)
        this.initClass()
    }

    rightDown(event: MouseEvent) {
        if (event.button === 2) {
            this.isMouseButtonDown = true
            this.startPosition.x = this.gameMap.x - event.pageX
            this.startPosition.y = this.gameMap.y - event.pageY
        }
    }

    private rightUp(event: MouseEvent) {
        if (event.button === 2) {
            this.isMouseButtonDown = false
        }
    }

    private getPosition(event: MouseEvent) {
        const pos = { x: 0, y: 0 };

        pos.x = event.pageX + this.startPosition.x
        pos.y = event.pageY + this.startPosition.y

        return pos;
    }

    private moveMap(event: MouseEvent) {
        if (!this.isMouseButtonDown)
            return;

        const position = this.getPosition(event)
        this.gameMap.x = position.x
        this.gameMap.y = position.y

    }

    private async setClickableCells() {
        const moves = await request<Array<Array<number>>>("http://localhost:8080/api/moves")
        for (let x = 0; x < moves.length; x++) {
            for (let y = 0; y < moves[x].length; y++) {
                if (moves[x][y] > 0 || moves[x][y] === -2)
                    this.cells[x][y].cursor = "pointer"
            }
        }
    }

    private movePlayer(event: FederatedMouseEvent) {
    }


    private async initClass() {
        const game: Game = await request<Game>("http://localhost:8080/api/game")
        const field = game.field;
        for (let x = 0; x < field.length; x++) {
            this.cells.push([])
            for (let y = 0; y < field[x].length; y++) {
                const cell = new Cell(field[x][y].isPassable, x, y, (e) => this.movePlayer(e))
                cell.zIndex = 0
                this.cells[x].push(cell)
                this.gameMap.addChild(cell)
                if (field[x][y].hasUnit) {
                    const unit = new Unit(x, y)
                    unit.zIndex = 1
                    this.units.push(unit)
                    this.gameMap.addChild(unit)
                }
            }
        }
        this.setClickableCells()
    }
}