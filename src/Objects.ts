interface MapObject {
    isPassable: boolean;
}

export class Cell {
    isPassable: boolean;
    mapObjects: MapObject[];
    hasUnit: boolean;

    constructor(mapObjects: MapObject[], isPassable: boolean, hasUnit: boolean) {
        this.mapObjects = mapObjects;
        this.isPassable = isPassable;
        this.hasUnit = hasUnit;
    }
}



export class Game {
    field: Cell[][];

    constructor(field: Cell[][]) {
        this.field = field;
    }
} 