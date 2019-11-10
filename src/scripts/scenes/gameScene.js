import Wall from '../Wall';
import Furniture from '../Furniture';
import House from '../House';
import Player from '../Player';
import UIConfig from '../UIConfig';

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
                good: 'assets/img/sprites/skorjund.png',
                bad: 'assets/img/sprites/skorjund.png',
                very_bad: 'assets/img/sprites/skorjund.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });
        this.addfurniture({
            name: 'fatbourey',
            sizeX: 2, sizeY: 2,
            placeableOnWall: true,
            images: {
                neutral: 'assets/img/sprites/skorjund_fat.png',
                good: 'assets/img/sprites/skorjund_fat.png',
                bad: 'assets/img/sprites/skorjund_fat.png',
                very_bad: 'assets/img/sprites/skorjund_fat.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });
        this.addfurniture({
            name: 'fatbourey',
            sizeX: 2, sizeY: 2,
            placeableOnWall: true,
            images: {
                neutral: 'assets/img/sprites/skorjund_fat.png',
                good: 'assets/img/sprites/skorjund_fat.png',
                bad: 'assets/img/sprites/skorjund_fat.png',
                very_bad: 'assets/img/sprites/skorjund_fat.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });
        this.addfurniture({
            name: 'desk',
            sizeX: 4, sizeY: 3,
            placeableOnWall: false,
            images: {
                neutral: 'assets/img/sprites/furnitures/desk_neutral.png',
                good: 'assets/img/sprites/furnitures/desk_neutral.png',
                bad: 'assets/img/sprites/furnitures/desk_neutral.png',
                very_bad: 'assets/img/sprites/furnitures/desk_neutral.png',
                inventory: 'assets/img/sprites/skorjund.png'
            }
        });

        this.load.image('arrow_right', 'assets/img/sprites/arrow_right.png')
        this.load.image('arrow_left', 'assets/img/sprites/arrow_left.png')

        this.load.image('door', 'assets/img/sprites/door.png')

        this.load.image('living_room_0_neutral', 'assets/img/sprites/rooms/salon_face.png')
        this.load.image('living_room_1_neutral', 'assets/img/sprites/rooms/salon_gauche.png')
        this.load.image('living_room_2_neutral', 'assets/img/sprites/rooms/salon_bas.png')
        this.load.image('living_room_3_neutral', 'assets/img/sprites/rooms/salon_droite_nodoor.png')

        this.load.image('library_0_neutral', 'assets/img/sprites/rooms/bibliotheque_face.png')
        this.load.image('library_1_neutral', 'assets/img/sprites/rooms/bibliotheque_porte.png')

        this.load.image('bathroom_0_neutral', 'assets/img/sprites/rooms/sdb_face.png')

        this.load.image('bedroom_0_neutral', 'assets/img/sprites/rooms/chambre_face.png')
        this.load.image('bedroom_1_neutral', 'assets/img/sprites/rooms/chambre_porte.png')

        this.load.image('kitchen_0_neutral', 'assets/img/sprites/rooms/cuisine_face.png')
        this.load.image('kitchen_1_neutral', 'assets/img/sprites/rooms/cuisine_porte.png')


        console.log('initial inv', this.inventory);
        console.log('furniture lib', this.furnitureList);
        
        this.house = new House(this, this.furnitureList)
        this.house.rooms.living_room.room.walls[1].tryToAddFurniture(this.furnitureList['tabourey'], 2, 5)
        
        this.house.rooms.living_room.room.walls[2].tryToAddFurniture(this.furnitureList['fatbourey'], 4, 4)
        
        this.house.rooms.living_room.room.walls[3].tryToAddFurniture(this.furnitureList['fatbourey'], 8, 2)
        
        this.player = new Player(this, this.furnitureList, this.house);
        
        this.player.addToInventory(this.furnitureList['tabourey'])
        this.player.addToInventory(this.furnitureList['fatbourey'])
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
        this.debugGrid = this.add.grid(
            UIConfig.sceneGrid.positionCenter[0],
            UIConfig.sceneGrid.positionCenter[1],
            UIConfig.sceneGrid.size(13, 8)[0], UIConfig.sceneGrid.size(13, 8)[1],
            UIConfig.sceneGrid.tileSize, UIConfig.sceneGrid.tileSize,
            0xcacaca, 1, 0x0000FF);
            
        this.add.grid(
            UIConfig.inventoryGrid.positionCenter[0],
            UIConfig.inventoryGrid.positionCenter[1],
            UIConfig.inventoryGrid.size(2, 3)[0], UIConfig.inventoryGrid.size(2, 3)[1],
            UIConfig.inventoryGrid.tileSize, UIConfig.inventoryGrid.tileSize,
            0xcacaca, 1, 0x0000FF);
                
        this.player.create();

        console.log('Gamescene started');

        this.input.on('pointerdown', event => {
            console.log(event.position)
            UIConfig.sceneGrid.pixelToTile(event.position.x, event.position.y, 13, 8)
        });

        setTimeout(() => {
            console.log('plop')
            this.house.getRoom('living_room').validated = true
            this.house.performMutations()
        }, 10000)
    }

    update() {
    }


}
