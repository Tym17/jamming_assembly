import House from "./House"
import UIConfig from "./UIConfig"

export default class Player {
    constructor (game, allFurnitures, house) {
        this.game = game
        this.house = house
        this.mentalHealth = 100
        this.energyPerDay = 3
        this.energy = this.energyPerDay
        this.energyUsedByWalking = 0.5
        this.energyUsedByPlacing = 1
        this.energyUsedByBadRoom = 0.5
        this.currentRoom = 'living_room'
        this.currentWall = 0
        this.inventory = []
        this.inventoryPage = 0

        this.currentlyDragging = undefined /*{
            sprite: game.add.sprite(0, 0, 'fatbourey_phase_neutral'),
            furniture: allFurnitures.fatbourey
        }*/

        
        game.input.on('pointermove', pointer => {
            if (this.currentlyDragging) {
                const wall = this.house.getRoom(this.currentRoom).walls[this.currentWall]
                const tilePos = UIConfig.sceneGrid.pixelToTile(pointer.x, pointer.y, wall.sizeX, wall.sizeY)
                if (tilePos[0] < 0) tilePos[0] = 0
                if (tilePos[1] < 0) tilePos[1] = 0
                if (tilePos[0] + this.currentlyDragging.furniture.sizeX >= wall.sizeX) tilePos[0] = wall.sizeX - this.currentlyDragging.furniture.sizeX 
                if (tilePos[1] + this.currentlyDragging.furniture.sizeY >= wall.sizeY) tilePos[1] = wall.sizeY - this.currentlyDragging.furniture.sizeX 
                // Cannot place => red tint
                if (!house.getRoom(this.currentRoom).walls[this.currentWall].canAddFurniture(this.currentlyDragging.furniture, tilePos[0], tilePos[1])) {
                    this.currentlyDragging.sprite.tint = 0xFF0000
                } else {
                    this.currentlyDragging.sprite.tint = 0xFFFFFF
                }
                const pixPos = UIConfig.sceneGrid.tileToPixel(tilePos[0], tilePos[1], wall.sizeX, wall.sizeY)
                this.currentlyDragging.sprite.x = pixPos[0] + this.currentlyDragging.furniture.sizeX * UIConfig.sceneGrid.tileSize / 2;
                this.currentlyDragging.sprite.y = pixPos[1] + (2 - this.currentlyDragging.furniture.sizeY) * UIConfig.sceneGrid.tileSize / 2;
            }
        });

        game.input.on('pointerup', pointer => {
            if (this.currentlyDragging) {
                const wall = this.house.getRoom(this.currentRoom).walls[this.currentWall]
                const tilePos = UIConfig.sceneGrid.pixelToTile(pointer.x, pointer.y, wall.sizeX, wall.sizeY)
                // If in the scene and can place
                if (tilePos[0] >= 0 && tilePos[1] >= 0 && tilePos[0] < wall.sizeX && tilePos[1] < wall.sizeY) {
                    if (this.placeFurniture(this.currentlyDragging.furniture, tilePos[0], tilePos[1])) {
                        this._exitWall()
                        this._enterWall()
                        this._destroyCurrentlyDragging()
                        return
                    }
                }
                // Drag and Drop failed, put it back in the inventory
                this._addCurrentlyDraggingToInventory()
            }
        });
        
        this._refreshInventory()
        this._enterWall()
    }

    addToInventory (furniture) {
        this.inventory.push({
            sprite: undefined,
            furniture: furniture
        })

        this._refreshInventory()
    }

    _refreshInventory () {
        this.inventory.filter(invElem => invElem.sprite).forEach(elem => {
            elem.sprite.destroy()
            elem.sprite = undefined
        })
        this.inventory
        .slice(this.inventoryPage * 6, (this.inventoryPage + 1) * 6)
        .forEach((elem, idx) => {
            const pixelPos = UIConfig.inventoryGrid.tileToPixel(idx % 2, ~~(idx / 2), 2, 3)
            console.log('Adding sprite at position', pixelPos, '(tile=', idx % 2, ',', idx / 2, ')')
            elem.sprite = this.game.add.sprite(pixelPos[0], pixelPos[1], elem.furniture.getInventoryImage())
            elem.sprite.setInteractive();
            elem.sprite.on('pointerdown', (event) => {
                console.log(event)
                if (this.currentlyDragging) { return ;}
                this._takeFromInventoryToDragging(elem, event.position.x, event.position.y);
            });
        })
    }

    _destroyCurrentlyDragging () {
        if (this.currentlyDragging) {
            this.currentlyDragging.sprite.destroy()
            this.currentlyDragging = undefined
        }
    }

    _addCurrentlyDraggingToInventory () {
        if (this.currentlyDragging) {
            this.inventory.unshift({ // Push at front
                furniture: this.currentlyDragging.furniture,
                sprite: undefined
            })
            this._destroyCurrentlyDragging()
        }
        this._refreshInventory()
    }

    _takeFromInventoryToDragging (elem, mousePosX=0, mousePosY=0) {
        if (!this.currentlyDragging) {
            this.currentlyDragging = {
                furniture: elem.furniture,
                sprite: this.game.add.sprite(mousePosX, mousePosY, elem.furniture.getCurrentImage())
            }
            elem.sprite.destroy()
            console.log(elem, this.inventory)
            this.inventory = this.inventory.filter(e => e.furniture.name != elem.furniture.name)
            this._refreshInventory
        }
    }

    _enterWall () {
        console.log('Entering wall')
        const wall = this.house.getRoom(this.currentRoom).walls[this.currentWall]
        wall.printTiles()
        wall.enter()
        wall.onSpriteClick((event, sprite, furniture) => {
            if (this.currentlyDragging) return
            this.currentlyDragging = {
                furniture,
                sprite
            }
            this.takeFurniture(furniture)
        })
        wall.onArrowLeft(() => {
            this.rotateLeft()
        })
        wall.onArrowRight(() => {
            this.rotateRight()
        })
    }

    _exitWall () {
        this.house.getRoom(this.currentRoom).walls[this.currentWall].exit()
    }

    move (to) {
        if (this.house.canTransition(this.currentRoom, to) && this.energy >= this.energyUsedByWalking) {
            this.energy -= this.energyUsedByWalking
            this._exitWall()
            this.currentRoom = to
            this.currentWall = 0
            this._enterWall()
            const roomPhase = this.house.getRoom(this.currentRoom).phase
            if (roomPhase == 'good') {
                this.takeDamage(-5)
            }
            if (roomPhase == 'bad' || roomPhase == 'very_bad') {
                this.takeDamage(5)
                this.energy -= this.energyUsedByBadRoom
                if (roomPhase == 'very_bad') {
                    this.takeDamage(5)
                }
            }
            return true
        }
        return false
    }

    placeFurniture (furniture, x, y) {
        if (this.house.getRoom(this.currentRoom).walls[this.currentWall].tryToAddFurniture(furniture, x, y)) {
            this.energy -= this.energyUsedByPlacing
            return true
        }
        return false
    }

    takeFurniture(furniture) {
        return this.house.getRoom(this.currentRoom).walls[this.currentWall].tryToRemoveFurniture(furniture)
    }

    rotateRight () {
        console.log('Rotating right')
        this._exitWall()
        this.currentWall = this.house.getRoom(this.currentRoom).nextWall(this.currentWall)
        this._enterWall()
    }

    rotateLeft () {
        console.log('Rotating left')
        this._exitWall()
        this.currentWall = this.house.getRoom(this.currentRoom).previousWall(this.currentWall)
        this._enterWall()
    }

    checkEndOfDay () {
        if (this.energy <= 0) { // TODO: OR TIMEOUT
            this.sleep()
        }
    }

    sleep () {
        console.log('Sleeping')
        this.house.performMutations()
        this.energy = this.energyPerDay
    }

    takeDamage (damage) {
        this.mentalHealth -= damage
        if (this.mentalHealth >= 100) this.mentalHealth = 100
        if (this.mentalHealth <= 0) this.gameOver()
    }

    gameOver () {
        console.error('GAME OVER') // TODO
    }
}
