import Room from './Room'
import Wall from './Wall'

export default class House {
    constructor (game, allFurnitures) {
        this.rooms = {
            living_room: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 4, sizeY: 4, correctFurniturePositions: {'fridge': [0, 0]}, unusablePositions: []}),
                new Wall(game, allFurnitures, {sizeX: 4, sizeY: 4, correctFurniturePositions: {'furnace': [1, 1]}, unusablePositions: []})
            ]), unlockAtLevel: 0, links: ['kitchen', 'bathroom', 'bedroom', 'library']},
            kitchen: {room: new Room(game, allFurnitures, []), unlockAtLevel: 0, links: ['living_room']},
            bathroom: {room: new Room(game, allFurnitures, []), unlockAtLevel: 0, links: ['living_room']},
            bedroom: {room: new Room(game, allFurnitures, []), unlockAtLevel: 1, links: ['living_room']},
            library: {room: new Room(game, allFurnitures, []), unlockAtLevel: 2, links: ['living_room', 'garden']},
            garden: {room: new Room(game, allFurnitures, []), unlockAtLevel: 3, links: ['library']}
        }
        this.level = 0
    }

    unlockNewRoom () {
        ++this.level
    }

    checkIfRoomExists (room) {
        if (!this.rooms[room]) {
            throw new Error(`The room ${room} does not exist`)
        }
    }

    availableTransitions (from) {
        this.checkIfRoomExists(from)
        return this.rooms[from].links
        .filter(next_room => this.rooms[next_room].unlockAtLevel <= this.level)
    }

    canTransition (from, to) {
        this.checkIfRoomExists(from)
        this.checkIfRoomExists(to)
        return this.availableTransitions(from).includes(to)        
    }

    getRoom (name) {
        return this.rooms[name].room
    }

    performMutations () {
        Object.values(this.rooms)
        .map(roomDict => roomDict.room)
        .map(room => room.applyMutations())

        switch (this.level) {
            case 0:
                if (this.rooms['living_room'].room.validated)
                    this.level = 1
            break
            case 1:
                if (this.rooms['bedroom'].room.validated)
                    this.level = 2
            break
            case 1:
                if (this.rooms['library'].room.validated)
                    this.level = 3
            break
        }
    }
}
