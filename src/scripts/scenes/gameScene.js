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
const INV_HEIGHT = CELL_SIZE * 8;
const INV_PAGESIZE = 8;
const INV_X = OFFSETGRID_WIDTH + GRID_WIDTH + CELL_SIZE + (INV_WIDTH / 2);
const INV_Y = POSGRID_Y + (CELL_SIZE / 2);
const OFFSETINV_WIDTH = INV_X - (INV_WIDTH / 2);
const OFFSETINV_HEIGTH = INV_Y - (INV_HEIGHT / 2);

export default class GameScene extends Phaser.Scene {
    debugGrid;
    mainGrid;
    testWall;
    furnitureList;
    inventory;
    inventoryPage;

    roomSprites;
    invSprites;

    constructor() {
        super({ key: 'GameScene' });
        this.furnitureList = [];
        this.inventory = [];
        this.inventoryPage = 0;
        this.roomSprites = [];
        this.invSprites = [];
    }

    addfurniture(furniture) {
        this.furnitureList[furniture.name] = new Furniture(this, furniture);
        this.inventory.push(furniture.name);
    }

    preload() {
        // TODO CREATE  EVERY FURNITURE HERE
        this.addfurniture({
            name: 'tabourey',
            sizeX: 1, sizeY: 1,
            placeableOnWall: false,
            images: {
                neutral: 'assets/img/sprites/skorjund.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });

        console.log('initial inv', this.inventory);
        console.log('furniture lib', this.furnitureList);
    }

    loadWallSprites(wall) {
        let furnitures = wall.getFurnitures();
        console.log('loading wall furnitures...', furnitures);

        furnitures.forEach(item => {
            this.roomSprites.push(this.add.sprite(OFFSETGRID_WIDTH + (item.pos.x * CELL_SIZE),
                OFFSETGRID_HEIGTH + (item.pos.y * CELL_SIZE), item.image).setDisplayOrigin(0, 0));
        });
    }

    loadInventorySprites() {
        if (this.inventoryPage * INV_PAGESIZE > this.inventory.length) {
            console.error('Trying to show a page further than the inventoryt capacity');
            return ;
        }

        let invPage = this.inventory.slice(this.inventoryPage * INV_PAGESIZE);

        for (let i = 0; i < INV_PAGESIZE; i++) {
            if (invPage[i] === undefined) { break; }
            this.roomSprites.push(this.add.sprite(OFFSETINV_WIDTH + ((i % 2) * CELL_SIZE * 2),
                // Should have been i / 2 to keep with the ratio but factorised with the bigger Cells size removes the need to divide
                OFFSETINV_HEIGTH + (i * CELL_SIZE), 
                this.furnitureList[invPage[i]].getInventoryImage())
                .setDisplayOrigin(0, 0));
                console.info(this.furnitureList[invPage[i]]);
                console.info(this.furnitureList[invPage[i]].getInventoryImage());
        }

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
            CELL_SIZE * 2, CELL_SIZE * 2,
            0xcacaca, 1, 0xFF0000);
        
        this.testWall = new Wall(this, {
            sizeX: 4, sizeY: 4, correctFurniturePositions: [], unusablePositions: [[3, 3], [1, 1]]
        });
        this.testWall.printTiles();
        this.loadInventorySprites();

        this.testWall.tryToAddFurniture(this.furnitureList['tabourey'], 0, 0);

        this.loadWallSprites(this.testWall);


    }

    update() {
    }
}
