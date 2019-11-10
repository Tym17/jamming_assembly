import Room from './Room'
import Wall from './Wall'

export default class House {
    constructor (game, allFurnitures) {
        this.player = undefined
        this.rooms = {
            living_room: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}, doors: [
                    {x: 0, y: 0, onClick: (() => { this.player.move('kitchen') })}
                ]}),
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}, doors: [
                    {x: 0, y: 0, onClick: (() => { this.player.move('bathroom') })}
                ]}),
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}}),
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}})
            ]), unlockAtLevel: 0, links: ['kitchen', 'bathroom', 'bedroom', 'library']},
            kitchen: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}, doors: [
                    {x: 0, y: 0, onClick: (() => { this.player.move('living_room') })}
                ]}),
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}}),
            ]), unlockAtLevel: 0, links: ['living_room']},
            bathroom: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}, doors: [
                    {x: 0, y: 0, onClick: (() => { this.player.move('living_room') })}
                ]}),
                new Wall(game, allFurnitures, {sizeX: 11, sizeY: 8, correctFurniturePositions: {}}),
            ]), unlockAtLevel: 0, links: ['living_room']},
            bedroom: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}}),
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}}),
            ]), unlockAtLevel: 1, links: ['living_room']},
            library: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}}),
                new Wall(game, allFurnitures, {sizeX: 9, sizeY: 8, correctFurniturePositions: {}}),
            ]), unlockAtLevel: 2, links: ['living_room', 'garden']},
            garden: {room: new Room(game, allFurnitures, []), unlockAtLevel: 3, links: ['library']}
        }
        this.level = 0
    }

    setPlayer (player) {
        this.player = player
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
                if (this.rooms['living_room'].room.validated) {
                    this.level = 1
                    this.rooms['living_room'].room.walls[2].doors.push({
                        x: 0, y: 0, onClick: (() => { this.player.move('bedroom') })
                    })
                    this.rooms['bedroom'].room.walls[0].doors.push({
                        x: 0, y: 0, onClick: (() => { this.player.move('living_room') })
                    })
                    this.player._exitWall()
                    this.player._enterWall()
                }
            break
            case 1:
                if (this.rooms['bedroom'].room.validated) {
                    this.level = 2
                    this.rooms['living_room'].room.walls[3].doors.push({
                        x: 0, y: 0, onClick: (() => { this.player.move('library') })
                    })
                    this.rooms['library'].room.walls[0].doors.push({
                        x: 0, y: 0, onClick: (() => { this.player.move('living_room') })
                    })
                    this.player._exitWall()
                    this.player._enterWall()
                }
            break
            case 2:
                if (this.rooms['library'].room.validated) {
                    this.level = 3
                    this.rooms['library'].room.walls[0].doors.push({
                        x: 0, y: 0, onClick: (() => { this.player.move('garden') })
                    })
                    this.player._exitWall()
                    this.player._enterWall()
                }
            break
        }
    }
}
