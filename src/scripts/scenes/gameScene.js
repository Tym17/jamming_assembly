
const CELL_SIZE = 96;
const ITEMGRID_WIDTH = 1248;
const ITEMGRID_HEIGTH = 768;

export default class GameScene extends Phaser.Scene {
    debugGrid
    mainGrid

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.spritesheet('furnitures', 'assets/sprites/skorjund.png', { frameWidth: 96, frameHeight: 96 });

    }

    create() {
        console.log('Gamescene started');
        this.debugGrid = this.add.grid(this.cameras.main.width * 0.4,
                                    this.cameras.main.height * 0.4, 
                                    ITEMGRID_WIDTH, ITEMGRID_HEIGTH,
                                    CELL_SIZE, CELL_SIZE, 
                                0xc9c9c9, 1, 0x0000FF);



    
        
        
    }

    update() {
    }
}
