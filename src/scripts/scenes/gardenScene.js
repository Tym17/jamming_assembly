export default class GardenScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GardenScene' })
  }

  
  preload() {
    this.load.image('garden_bg', 'assets/img/sprites/garden/jardin.png');
    this.load.image('tomb', 'assets/img/sprites/garden/tombe.png');
  }

  create() {
    let bg = this.add.sprite(0, 0, 'garden_bg');
    bg.setDisplayOrigin(0, 0);
    bg.setScale(1920 / 1248, 1080 / 768);

    let tomb = this.add.sprite(1920 * 0.505, 1080 * 0.55, 'tomb');
    tomb.setScale(0.4, 0.4);
    tomb.setDisplayOrigin(0, 0);

    tomb.setInteractive();
    tomb.on('pointerdown', pointer => {
        let bigtomb = this.add.sprite(1920 * 0.5, 1080 * 0.5, 'tomb');
        bigtomb.setScale(1.2, 1.2);
        bigtomb.setDepth(11);
        let rect = this.add.rectangle(0, 0, 1920, 1080, 0, 0.8);
        rect.setDepth(10);
        rect.setDisplayOrigin(0, 0);

        let menu = this.add.text(1920 * 0.7, 1080 * 0.9, 'Recommencer', 
        { fill: '#FFF', fontSize: 72});
        menu.setDepth(12);

        menu.setInteractive();
        menu.on('pointerdown', f => {
            this.scene.start('MainScene');
        })
    });

  }

  update() {
  }
}
