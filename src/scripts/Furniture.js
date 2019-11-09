export default class Furniture {
    constructor (game, {name, sizeX, sizeY, placeableOnWall, images}) {
        this.name = name
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.placeableOnWall = placeableOnWall
        this.images = images
        this.phase = 'neutral'

        game.load.image(`${name}_inventory`, images['inventory'])
        game.load.image(`${name}_phase_very_bad`, images['very_bad'])
        game.load.image(`${name}_phase_bad`, images['bad'])
        game.load.image(`${name}_phase_neutral`, images['neutral'])
        game.load.image(`${name}_phase_good`, images['good'])
    }

    static phases () {
        return ['very_bad', 'bad', 'neutral', 'good']
    }

    static validatePhaseName (phase) {
        if (Furniture.phases().indexOf(phase) == -1) {
            throw new Error(`${phase} is not a valid furniture phase name`)
        }
    }

    getInventoryImage () {
        return `${this.name}_inventory`
    }
    
    setPhase (phase) {
        Furniture.validatePhaseName(phase)
        this.phase = phase
    }

    worsen() {
        Furniture.validatePhaseName(this.phase)
        if (this.phase == Furniture.phases()[0]) return; // Cannot worsen
        this.phase = Furniture.phases()[Furniture.phases().indexOf(this.phase) - 1]
    }

    improve() {
        Furniture.validatePhaseName(this.phase)
        if (this.phase == Furniture.phases()[-1]) return; // Cannot improve
        this.phase = Furniture.phases()[Furniture.phases().indexOf(this.phase) + 1]
    }

    getCurrentImage () {
        return `${this.name}_phase_${this.phase}`
    }
}
