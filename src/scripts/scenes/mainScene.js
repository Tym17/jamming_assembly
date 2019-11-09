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
    let furnace = new Furniture(this, {
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
    player.sleep()

      /**
     * Delete all the code below to start a fresh scene
     *
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
    this.fpsText = new FpsText(this)

    // async/await example
    const pause = ms => {
      return new Promise(resolve => {
        window.setTimeout(() => {
          resolve()
        }, ms)
      })
    }
    const asyncFunction = async () => {
      console.log('Before Pause')
      await pause(4000) // 4 seconds pause
      console.log('After Pause')
    }
    asyncFunction()

    // Spread operator test
    const numbers = [0, 1, 2, 3]
    const moreNumbers = [...numbers, 4, 5]
    console.log(`All numbers: ` + moreNumbers)

    // display the Phaser.VERSION
    this.add
      .text(this.cameras.main.width - 15, 15, `Phaser v${Phaser.VERSION}`, {
        color: '#000000',
        fontSize: 24
      })
      .setOrigin(1, 0)

    this.add.sprite(0, 0, "wooden_wall");
    */
  }

  update() {
    //this.fpsText.update(this)
  }
}
