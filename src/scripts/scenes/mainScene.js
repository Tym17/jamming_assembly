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

  preload() {
    this.load.image('main_bg', 'assets/img/sprites/menu/bg.png');
    this.load.image('main_btn', 'assets/img/sprites/menu/btn.png');
  }

  create() {
    let bg = this.add.sprite(0, 0, 'main_bg');
    bg.setDisplayOrigin(0, 0);
    bg.setScale(1920 / 1280, 1080 / 720);


    const playButton = this.add.sprite(1920 * 0.65, 1080 * 0.7, 'main_btn');
    playButton.setInteractive();


    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
      console.log('Starting gamescene');
    });

  }

  update() {
    //this.fpsText.update(this)
  }
}
