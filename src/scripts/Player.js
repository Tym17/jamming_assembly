import House from "./House"

export default class Player {
    constructor (game, allFurnitures, house) {
        this.house = house
        this.mentalHealth = 100
        this.energyPerDay = 3
        this.energy = this.energyPerDay
        this.energyUsedByWalking = 0.5
        this.energyUsedByPlacing = 1
        this.energyUsedByBadRoom = 0.5
        this.currentRoom = 'living_room'
        this.currentWall = 0
    }

    move (to) {
        if (this.house.canTransition(this.currentRoom, to) && this.energy >= this.energyUsedByWalking) {
            this.energy -= this.energyUsedByWalking
            this.currentRoom = to
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
        this.currentWall = this.house.getRoom(this.currentRoom).nextWall(this.currentWall)
    }

    rotateLeft () {
        this.currentWall = this.house.getRoom(this.currentRoom).previousWall(this.currentWall)
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
