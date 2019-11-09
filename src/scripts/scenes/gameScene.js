import Wall from '../Wall';
import Furniture from '../Furniture';

const CELL_SIZE = 96;
const GRID_WIDTH = 1248;
const GRID_HEIGTH = 768;
const POSGRID_X = 1920 * 0.4;
const POSGRID_Y = 1080 * 0.4;
const OFFSETGRID_WIDTH = POSGRID_X - (GRID_WIDTH / 2);
const OFFSETGRID_HEIGTH = POSGRID_Y - (GRID_HEIGTH / 2);

const INV_WIDTH = CELL_SIZE * 4;
const INV_HEIGHT = CELL_SIZE * 7;
const INV_X = OFFSETGRID_WIDTH + GRID_WIDTH + CELL_SIZE + (INV_WIDTH / 2);
const INV_Y = POSGRID_Y + (CELL_SIZE / 2);
const OFFSETINV_WIDTH = INV_X - (INV_WIDTH / 2);
const OFFSETINV_HEIGHT = INV_Y - (INV_HEIGHT / 2);

export default class GameScene extends Phaser.Scene {
    debugGrid;
    mainGrid;
    testWall;
    furnitureList;

    constructor() {
        super({ key: 'GameScene' });
        this.furnitureList = [];
    }

    preload() {
        // TODO CREATE  EVERY FURNITURE HERE
        this.furnitureList['tabourey'] = new Furniture(this, {
            name: 'tabourey',
            sizeX: 1, sizeY: 1,
            placeableOnWall: false,
            images: {
                neutral: 'assets/img/sprites/skorjund.png',
            }
        });
    }

    loadWallSprites(wall) {
        let furnitures = wall.getFurnitures();
        let sprites = [];
        console.log(furnitures);

        furnitures.forEach(item => {
            sprites.push(this.add.sprite(OFFSETGRID_WIDTH + (item.pos.x * CELL_SIZE),
                OFFSETGRID_HEIGTH + (item.pos.y * CELL_SIZE), item.image).setDisplayOrigin(0, 0));
        });
    }

    create() {
        console.log('Gamescene started');
        this.debugGrid = this.add.grid(POSGRID_X,
            POSGRID_Y,
            GRID_WIDTH, GRID_HEIGTH,
            CELL_SIZE, CELL_SIZE,
            0xcacaca, 1, 0x0000FF);

        this.add.grid(INV_X, INV_Y, 
            INV_WIDTH, INV_HEIGHT,
            CELL_SIZE, CELL_SIZE,
            0xcacaca, 1, 0xFF0000);
        
        this.testWall = new Wall(this, {
            sizeX: 4, sizeY: 4, correctFurniturePositions: [], unusablePositions: [[3, 3], [1, 1]]
        });
        this.testWall.printTiles();

        this.testWall.tryToAddFurniture(this.furnitureList['tabourey'], 0, 0);

        this.loadWallSprites(this.testWall);


    }

    update() {
    }
}
