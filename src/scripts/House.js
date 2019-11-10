import Room from './Room'
import Wall from './Wall'

export default class House {
    constructor (game, allFurnitures) {
        this.player = undefined
        this.rooms = {
            living_room: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 11, sizeY: 8,
                    correctFurniturePositions: {},
                    doors: [{x: 2, y: 1, onClick: (() => { this.player.move('bathroom') }), texture: 'invisible_door', tooltip: 'Entrer'}],
                    backgrounds: {'good': 'living_room_0_neutral', 'neutral': 'living_room_0_neutral', 'bad': 'living_room_0_neutral', 'very_bad': 'living_room_0_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 11, sizeY: 8,
                    correctFurniturePositions: {},
                    doors: [{x: 8, y: 1, onClick: (() => { this.player.move('kitchen') }), texture: 'invisible_door', tooltip: 'Entrer'}],
                    backgrounds: {'good': 'living_room_1_neutral', 'neutral': 'living_room_1_neutral', 'bad': 'living_room_1_neutral', 'very_bad': 'living_room_1_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 11, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'living_room_2_neutral', 'neutral': 'living_room_2_neutral', 'bad': 'living_room_2_neutral', 'very_bad': 'living_room_2_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 11, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'living_room_3_neutral', 'neutral': 'living_room_3_neutral', 'bad': 'living_room_3_neutral', 'very_bad': 'living_room_3_neutral'}}),
                ]),
                unlockAtLevel: 0,
                links: ['kitchen', 'bathroom', 'bedroom', 'library']},
            
            kitchen: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'kitchen_0_neutral', 'neutral': 'kitchen_0_neutral', 'bad': 'kitchen_0_neutral', 'very_bad': 'kitchen_0_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    doors: [{x: 3, y: 1, onClick: (() => { this.player.move('living_room', 3) }), texture: 'invisible_door', tooltip: 'Entrer'}],
                    backgrounds: {'good': 'kitchen_1_neutral', 'neutral': 'kitchen_1_neutral', 'bad': 'kitchen_1_neutral', 'very_bad': 'kitchen_1_neutral'}}),
                ]),
                unlockAtLevel: 0,
                links: ['living_room']},

            bathroom: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 11, sizeY: 8,
                    correctFurniturePositions: {},
                    doors: [{x: 5.5, y: -3, onClick: (() => { this.player.move('living_room', 2) }), texture: 'arrow_down', tooltip: 'Sortir'}],
                    backgrounds: {'good': 'bathroom_0_neutral', 'neutral': 'bathroom_0_neutral', 'bad': 'bathroom_0_neutral', 'very_bad': 'bathroom_0_neutral'}}),
                ]),
                unlockAtLevel: 0,
                links: ['living_room']},

            bedroom: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'bedroom_0_neutral', 'neutral': 'bedroom_0_neutral', 'bad': 'bedroom_0_neutral', 'very_bad': 'bedroom_0_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'bedroom_1_neutral', 'neutral': 'bedroom_1_neutral', 'bad': 'bedroom_1_neutral', 'very_bad': 'bedroom_1_neutral'}}),
                ]),
                unlockAtLevel: 1,
                links: ['living_room']},

            library: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'library_0_neutral', 'neutral': 'library_0_neutral', 'bad': 'library_0_neutral', 'very_bad': 'library_0_neutral'}}),
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'library_1_neutral', 'neutral': 'library_1_neutral', 'bad': 'library_1_neutral', 'very_bad': 'library_1_neutral'}}),
                ]),
                unlockAtLevel: 2,
                links: ['living_room', 'garden']},

            garden: {room: new Room(game, allFurnitures, [
                new Wall(game, allFurnitures, {
                    sizeX: 9, sizeY: 8,
                    correctFurniturePositions: {},
                    backgrounds: {'good': 'garden', 'neutral': 'garden', 'bad': 'garden', 'very_bad': 'garden'}}),
            ]),
                unlockAtLevel: 3,
                links: ['library']}
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

    _upgradeLvL1 () {
        this.level = 1
        this.rooms['living_room'].room.walls[0].doors.push({
            x: 8, y: 1, onClick: (() => { this.player.move('bedroom') }), tooltip: 'Entrer'
        })
        this.rooms['bedroom'].room.walls[1].doors.push({
            x: 2.75, y: 0.95, onClick: (() => { this.player.move('living_room', 2) }), tooltip: 'Entrer'
        })
        this.player._exitWall()
        this.player._enterWall()
    }

    _upgradeLvL2 () {
        this.level = 2
        this.rooms['living_room'].room.walls[3].doors.push({
            x: 3, y: 1, onClick: (() => { this.player.move('library') }), tooltip: 'Entrer'
        })
        this.rooms['library'].room.walls[1].doors.push({
            x: 7, y: 1, onClick: (() => { this.player.move('living_room', 1) }), tooltip: 'Entrer'
        })
        this.player._exitWall()
        this.player._enterWall()
    }

    _upgradeLvL3 () {
        this.level = 3
        this.rooms['library'].room.walls[0].doors.push({
            x: 8, y: 1, onClick: (() => { this.player.move('garden') }), texture: 'invisible_door', tooltip: '???'
        })
        this.player._exitWall()
        this.player._enterWall()
    }

    performMutations () {
        Object.values(this.rooms)
        .map(roomDict => roomDict.room)
        .map(room => room.applyMutations())

        switch (this.level) {
            case 0:
                if (this.rooms['living_room'].room.validated) {
                    this._upgradeLvL1()
                }
            break
            case 1:
                if (this.rooms['bedroom'].room.validated) {
                    this._upgradeLvL2()
                }
            break
            case 2:
                if (this.rooms['library'].room.validated) {
                    this._upgradeLvL3()
                }
            break
        }
    }
}
