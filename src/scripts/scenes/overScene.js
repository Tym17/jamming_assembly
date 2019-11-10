import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import Furniture from '../Furniture'
import Wall from '../Wall'
import Room from '../Room'
import House from '../House'
import Player from '../Player'

export default class OverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OverScene' })
  }

  create() {
    let rect = this.add.rectangle(0, 0, 1920, 1080, 0);
    rect.setDisplayOrigin(0, 0);
    this.add.text(1920 * 0.4, this.cameras.main.centerY, 'On ne veut pas de moi ici', 
    { fill: '#FFF', fontSize: 72});

  }

  update() {
    //this.fpsText.update(this)
  }
}
