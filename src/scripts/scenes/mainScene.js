import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Furniture from '../Furniture'
import Wall from '../Wall'
import Room from '../Room'
import House from '../House'
import Player from '../Player'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    const playButton = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Play', 
    { fill: '#0F0', fontSize: 72});
    playButton.setInteractive();


    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
      console.log('Starting gamescene');
    });

    /*
    const furnace = new Furniture(this, {
      name: 'furnace',
      sizeX: 1,
      sizeY: 2,
      placeableOnWall: false,
      images: {
          inventory: '../phaser-logo.js',
          very_bad: '../phaser-logo.js',
          bad: '../phaser-logo.js',
          neutral: '../phaser-logo.js',
          good: '../phaser-logo.js'
      }})
  
    const fridge = new Furniture(this, {
      name: 'fridge',
      sizeX: 2,
      sizeY: 3,
      placeableOnWall: false,
      images: {
          inventory: '../phaser-logo.js',
          very_bad: '../phaser-logo.js',
          bad: '../phaser-logo.js',
          neutral: '../phaser-logo.js',
          good: '../phaser-logo.js'
      }})

    const allFurnitures = {furnace, fridge}
  

    let house = new House(this, allFurnitures)
    let player = new Player(this, allFurnitures, house)

    console.log('Energy: ', player.energy)
    console.log('Current Room: ', player.currentRoom)
    console.log('Moving to the kitchen: ', player.move('kitchen'))
    console.log('Energy: ', player.energy)
    console.log('Current Room: ', player.currentRoom)
    console.log('Moving to the living room: ', player.move('living_room'))
    console.log('Energy: ', player.energy)
    console.log('Current Room: ', player.currentRoom)
    console.log('Current Wall: ', player.currentWall)
    console.log('Rotating right')
    player.rotateRight()
    console.log('Energy: ', player.energy)
    console.log('Current Room: ', player.currentRoom)
    console.log('Current Wall: ', player.currentWall)
    console.log('Placing the furnace', player.placeFurniture(furnace, 2, 1))
    console.log('Rotating left')
    player.rotateLeft()
    console.log('Energy: ', player.energy)
    console.log('Current Room: ', player.currentRoom)
    console.log('Current Wall: ', player.currentWall)
    console.log('Energy: ', player.energy)
    console.log('Correct: ', house.getRoom(player.currentRoom).getAllCorrectFurnitures())
    console.log('Missing: ', house.getRoom(player.currentRoom).getAllMissingFurnitures())
    console.log('Misplaced: ', house.getRoom(player.currentRoom).getAllMisplacedFurnitures())
    console.log('Rotating right')
    player.rotateRight()
    console.log('Current Room: ', player.currentRoom)
    console.log('Current Wall: ', player.currentWall)
    console.log('Removing the furnace', player.takeFurniture(furnace))
    console.log('Correct: ', house.getRoom(player.currentRoom).getAllCorrectFurnitures())
    console.log('Missing: ', house.getRoom(player.currentRoom).getAllMissingFurnitures())
    console.log('Misplaced: ', house.getRoom(player.currentRoom).getAllMisplacedFurnitures())
    player.rotateRight()
    player.sleep()
    */
  }

  update() {
    //this.fpsText.update(this)
  }
}
