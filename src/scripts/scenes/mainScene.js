import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Furniture from '../Furniture'

export default class MainScene extends Phaser.Scene {
  fpsText

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    let furnace = new Furniture(this, {
      name: 'furnace',
      blocksX: 1,
      blocksY: 2,
      placeableOnWall: false,
      images: {
        inventory: '../phaser-logo.js',
        very_bad: '../phaser-logo.js',
        bad: '../phaser-logo.js',
        neutral: '../phaser-logo.js',
        good: '../phaser-logo.js'
      }})
    /**
     * Delete all the code below to start a fresh scene
     */
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
  }

  update() {
    this.fpsText.update(this)
  }
}
