export default class Furniture {
    constructor (game, {name, sizeX, sizeY, placeableOnWall, images}) {
        this.name = name
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.placeableOnWall = placeableOnWall
        this.images = images
        this.phase = 'neutral'
        this.checkedPostIt = false

        game.load.image(`${name}_inventory`, images['inventory'])
        game.load.image(`${name}_phase_bad`, images['bad'])
        game.load.image(`${name}_phase_neutral`, images['neutral'])
        game.load.image(`${name}_phase_good`, images['good'])
    }

    static phases () {
        return ['bad', 'neutral', 'good']
    }

    static validatePhaseName (phase) {
        if (Furniture.phases().indexOf(phase) == -1) {
            throw new Error(`${phase} is not a valid furniture phase name`)
        }
    }

    static mutationProbability () {
        return 0.5
    }

    getInventoryImage () {
        return `${this.name}_inventory`
    }
    
    setPhase (phase) {
        Furniture.validatePhaseName(phase)
        this.phase = phase
    }

    worsen() {
        const phase = this.phase
        Furniture.validatePhaseName(this.phase)
        this.phase = Furniture.phases()[Furniture.phases().indexOf(this.phase) - 1]
        if (!this.phase) this.phase = phase
    }

    improve() {
        const phase = this.phase
        Furniture.validatePhaseName(this.phase)
        this.phase = Furniture.phases()[Furniture.phases().indexOf(this.phase) + 1]
        if (!this.phase) this.phase = phase
    }

    getCurrentImage () {
        return `${this.name}_phase_${this.phase}`
    }
}
