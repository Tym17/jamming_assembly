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
    pickUp;
    pickedSprite;

    constructor() {
        super({ key: 'GameScene' });
        this.furnitureList = [];
        this.inventory = [];
        this.inventoryPage = 0;
        this.roomSprites = [];
        this.invSprites = [];
        this.pickUp = '';
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
        this.addfurniture({
            name: 'tabourney',
            sizeX: 1, sizeY: 1,
            placeableOnWall: true,
            images: {
                neutral: 'assets/img/sprites/skorjund.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });

        console.log('initial inv', this.inventory);
        console.log('furniture lib', this.furnitureList);
    }

    loadWallSprites(wall) {
        this.roomSprites.forEach(f => f.destroy());
        let furnitures = wall.getFurnitures();
        console.log('loading wall furnitures...', furnitures);

        furnitures.forEach(item => {
            let furniture = this.add.sprite(OFFSETGRID_WIDTH + (item.pos.x * CELL_SIZE),
                OFFSETGRID_HEIGTH + (item.pos.y * CELL_SIZE), item.image);
            furniture.setDisplayOrigin(0, 0);
            furniture.setInteractive();
            furniture.name = item.name;
            furniture.on('pointerdown', () => {
                if (this.pickUp !== '') { return ;}
                this.pickUp = item.name;
                this.roomSprites = this.roomSprites
                    .filter(f => f.name != item.name);
                wall.tryToRemoveFurniture(this.furnitureList[this.pickUp]);
                furniture.destroy();
                this.pickedSprite = this.add.sprite(OFFSETGRID_WIDTH + (item.pos.x * CELL_SIZE),
                    OFFSETGRID_HEIGTH + (item.pos.y * CELL_SIZE),
                    this.furnitureList[item.name].getInventoryImage());
            });
            this.roomSprites.push(furniture);

        });
    }

    loadInventorySprites() {
        if (this.inventoryPage * INV_PAGESIZE > this.inventory.length) {
            console.error('Trying to show a page further than the inventoryt capacity');
            return;
        }

        this.invSprites.forEach(f => f.destroy());
        let invPage = this.inventory.slice(this.inventoryPage * INV_PAGESIZE);

        for (let i = 0; i < INV_PAGESIZE; i++) {
            if (invPage[i] === undefined) { break; }
            let modi = i % 2
            let y = modi == 1 ? i - 1 : i;
            let pos = {
                x: OFFSETINV_WIDTH + (modi * CELL_SIZE * 2),
                y: OFFSETINV_HEIGTH + (y * CELL_SIZE)
            };
            let invElem = this.add.sprite(pos.x, pos.y,
                this.furnitureList[invPage[i]].getInventoryImage());
            invElem.setDisplayOrigin(0, 0);
            invElem.name = invPage[i];
            invElem.setInteractive();
            invElem.on('pointerdown', () => {
                if (this.pickUp !== '') { return ;}
                this.pickUp = invElem.name;
                this.inventory = this.inventory
                    .filter(it => it != invPage[i]);
                this.loadInventorySprites();
                this.pickedSprite = this.add.sprite(pos.x, pos.y,
                    this.furnitureList[invPage[i]].getInventoryImage());
            });
            this.invSprites.push(invElem);
        }

    }

    /**
     * 
     * @param {x, y} pos 
     * @param {{x, y}, width, height} area 
     */
    isInArea(pos, area) {
        return ((pos.x >= area.pos.x && pos.x <= area.pos.x + area.width)
            && (pos.y >= area.pos.y && pos.y <= area.pos.y + area.heigth));
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
            sizeX: 13, sizeY: 8, correctFurniturePositions: [], unusablePositions: [[3, 3], [1, 1]]
        });
        this.testWall.printTiles();
        this.loadInventorySprites();

        this.testWall.tryToAddFurniture(this.furnitureList['tabourey'], 0, 0);
        this.testWall.tryToAddFurniture(this.furnitureList['tabourey'], 0, 1);
        this.testWall.tryToAddFurniture(this.furnitureList['tabourney'], 1, 0);

        this.loadWallSprites(this.testWall);
        this.input.on('pointermove', pointer => {
            if (this.pickUp !== '') {
                this.pickedSprite.x = pointer.x;
                this.pickedSprite.y = pointer.y;
            }
        });
        this.input.on('pointerup', pointer => {
            if (this.pickUp !== '') {
                let pos = {
                    x: this.pickedSprite.x,
                    y: this.pickedSprite.y
                };
                if (this.isInArea(pos, {
                    pos: {x: OFFSETGRID_WIDTH, y: OFFSETGRID_HEIGTH},
                    width: GRID_WIDTH, heigth: GRID_HEIGTH
                })) {
                    let localPos = {
                        x: Math.trunc((pos.x - OFFSETGRID_WIDTH) / CELL_SIZE),
                        y: Math.trunc((pos.y - OFFSETGRID_HEIGTH) / CELL_SIZE),
                    };
                    if (this.testWall.tryToAddFurniture(this.furnitureList[this.pickUp], 
                        localPos.x, localPos.y)) {
                            this.pickUp = '';
                            this.pickedSprite.destroy();
                            this.loadWallSprites(this.testWall);
                        }
                }
                else {
                    this.inventory.push(this.pickUp);
                    this.pickUp = '';
                    this.pickedSprite.destroy();
                    this.loadInventorySprites();
                }
            }
        })
    }

    update() {
    }


}
