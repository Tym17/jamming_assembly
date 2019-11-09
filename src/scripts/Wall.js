import UIConfig from './UIConfig'

export default class Wall {
    /**
     * 
     * @param Phaser.Game game 
     * @param int sizeX The number of tiles in the X axis
     * @param int sizeY The number of tiles in the Y axis
     * @param int sizeX The number of tiles in the X axis
     * @param int sizeX The number of tiles in the X axis
     */
    constructor (game, allFurnitures, {sizeX, sizeY, correctFurniturePositions, unusablePositions=[]}) {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.unusablePositions = unusablePositions
        this.correctFurniturePositions = correctFurniturePositions
        this.sprites = []
        this.resetTiles()
    }

    resetTiles () {
        // Creates a 2D array filled with similar objects
        this.tiles = new Array(this.sizeX)
        .fill(0)
        .map((_, i) => (new Array(this.sizeY)
            .fill(0)
            .map(_ => ({
                taken: false,
                by: undefined,
                isLowerLeftCorner: false
            })))
        )
        this.unusablePositions.forEach(([x, y]) => {
            this.tiles[x][y].taken = true
        })
    }

    checkValidPosition(x, y) {
        if (x < 0 || x >= this.sizeX || y < 0 || y >= this.sizeY)
            throw new Error(`Position [${x}, ${y}] is not valid in a ${this.sizeX} by ${this.sizeY} grid`)
    }

    isTileAvailable (x, y) {
        this.checkValidPosition(x, y);
        return !this.tiles[x][y].taken
    }

    tryToAddFurniture (furniture, x, y) {
        const Xs = new Array(furniture.sizeX).fill(0).map((_, i) => x + i)
        const Ys = new Array(furniture.sizeY).fill(0).map((_, i) => y + i)
        // Check if possible
        for (let x of Xs) {
            for (let y of Ys) {
                if (!this.isTileAvailable(x, y))
                    return false
            }    
        }
        // Then actually fill the tiles
        for (let x of Xs) {
            for (let y of Ys) {
                this.tiles[x][y] = {
                    taken: true,
                    by: furniture,
                    isLowerLeftCorner: false
                }
            }
        }    
        this.tiles[Xs[0]][Ys[0]].isLowerLeftCorner = true
        return true
    }

    getPresentFurniturePositions () {
        let furnitureNames = {}
        for (let x = 0; x < this.sizeX; ++x) {
            for (let y = 0; y < this.sizeY; ++y) {
                const tile = this.tiles[x][y]
                if (tile.isLowerLeftCorner)
                    furnitureNames[tile.by.name] = [x, y]
            }
        }
        return furnitureNames
    }

    getFurnitures() {
        let furnitures = [];

        for (let x = 0; x < this.sizeX; ++x) {
            for (let y = 0; y < this.sizeY; ++y) {
                const tile = this.tiles[x][y]
                if (tile.isLowerLeftCorner)
                    furnitures.push({
                        name: tile.by.name,
                        image: tile.by.getCurrentImage(),
                        pos: {x: x, y: y}
                    });
            }
        }
        return furnitures;
    }
    
    findFurniturePosition (furniture) {
        return this.getPresentFurniturePositions()[furniture.name]
    }

    tryToRemoveFurniture (furniture) {
        const pos = this.findFurniturePosition(furniture)
        if (!pos) return false
        const [X, Y] = pos
        for (let x = X; x < X + furniture.sizeX; ++x) {
            for (let y = Y; y < Y + furniture.sizeY; ++y) {
                this.tiles[x][y] = {
                    taken: false,
                    by: undefined,
                    isLowerLeftCorner: false
                }
            }    
        }
        return true
    }

    printTiles () {
        console.log(this.tiles)
        this.tiles.forEach(row => {
            let str = ''
            row.forEach(tile => { // transposed
                if (tile.taken == false) str += '0 '
                else {
                    if (tile.by != undefined) str += '1 '
                    else str += 'X '
                }
            })
            console.log(str)
        });
    }

    getMissingFurnitures () {
        return Object.keys(this.correctFurniturePositions)
        .filter(name => !Object.keys(this.getPresentFurniturePositions()).includes(name))
    }
    getCorrectFurnitures () {
        return Object.entries(this.correctFurniturePositions)
        .filter(([name, [x, y]]) => {
            const pos = this.getPresentFurniturePositions()[name]
            return pos && pos[0] == x && pos[1] == y;
        })
        .map(([name, pos]) => name)
    }
    getMisplacedFurnitures () {
        return Object.keys(this.getPresentFurniturePositions())
        .filter(name => !this.getCorrectFurnitures().includes(name))
    }

    draw () {
        this.furnitures.forEach(furniture => {
            let sprite = this.add.sprite(UIConfig.sceneGrid.tileToPixel(x, y)[0], UIConfig.sceneGrid.tileToPixel(x, y)[1],
                                         furniture.getCurrentImage())
            sprite.setDisplayOrigin(0, 0);
            sprite.setInteractive();
            sprite.name = furniture.name;

            sprite.on('pointerdown', () => {
                if (this.pickUp !== '') { return ;}
                this.pickUp = item.name;
                this.roomSprites = this.roomSprites
                    .filter(f => f.name != item.name);
                wall.tryToRemoveFurniture(this.furnitureList[this.pickUp]);
                furniture.destroy();
                this.pickedSprite = this.add.sprite(OFFSETGRID_WIDTH + (item.pos.x * CELL_SIZE),
                    OFFSETGRID_HEIGTH + (item.pos.y * CELL_SIZE),
                    this.furnitureList[item.name].getInventoryImage());
            });
        })
    }

    undraw() {

    }
}
