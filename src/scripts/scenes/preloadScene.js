export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('arrow_right', 'assets/img/sprites/arrow_right.png')
    this.load.image('arrow_left', 'assets/img/sprites/arrow_left.png')
    this.load.image('arrow_down', 'assets/img/sprites/arrow_down.png')

    this.load.image('door', 'assets/img/sprites/door.png')
    this.load.image('invisible_door', 'assets/img/sprites/invisible_door.png')

    this.load.image('living_room_0_neutral', 'assets/img/sprites/rooms/salon_face.png')
    this.load.image('living_room_1_neutral', 'assets/img/sprites/rooms/salon_gauche.png')
    this.load.image('living_room_2_neutral', 'assets/img/sprites/rooms/salon_bas.png')
    this.load.image('living_room_3_neutral', 'assets/img/sprites/rooms/salon_droite_nodoor.png')
    this.load.image('living_room_0_bad', 'assets/img/sprites/rooms/salon_face_bad.png')
    this.load.image('living_room_1_bad', 'assets/img/sprites/rooms/salon_gauche_bad.png')
    this.load.image('living_room_2_bad', 'assets/img/sprites/rooms/salon_bas_bad.png')
    this.load.image('living_room_3_bad', 'assets/img/sprites/rooms/salon_droite_nodoor_bad.png')
    this.load.image('living_room_0_good', 'assets/img/sprites/rooms/salon_face_good.png')
    this.load.image('living_room_1_good', 'assets/img/sprites/rooms/salon_gauche_good.png')
    this.load.image('living_room_2_good', 'assets/img/sprites/rooms/salon_bas_good.png')
    this.load.image('living_room_3_good', 'assets/img/sprites/rooms/salon_droite_nodoor_good.png')


    this.load.image('library_0_neutral', 'assets/img/sprites/rooms/bibliotheque_face.png')
    this.load.image('library_1_neutral', 'assets/img/sprites/rooms/bibliotheque_porte.png')
    this.load.image('library_0_bad', 'assets/img/sprites/rooms/bibliotheque_face_bad.png')
    this.load.image('library_1_bad', 'assets/img/sprites/rooms/bibliotheque_porte_bad.png')
    this.load.image('library_0_good', 'assets/img/sprites/rooms/bibliotheque_face_good.png')
    this.load.image('library_1_good', 'assets/img/sprites/rooms/bibliotheque_porte_good.png')

    this.load.image('bathroom_0_neutral', 'assets/img/sprites/rooms/sdb_face.png')
    this.load.image('bathroom_0_bad', 'assets/img/sprites/rooms/sdb_face_bad.png')
    this.load.image('bathroom_0_good', 'assets/img/sprites/rooms/sdb_face_good.png')

    this.load.image('bedroom_0_neutral', 'assets/img/sprites/rooms/chambre_face.png')
    this.load.image('bedroom_1_neutral', 'assets/img/sprites/rooms/chambre_porte.png')
    this.load.image('bedroom_0_bad', 'assets/img/sprites/rooms/chambre_face_bad.png')
    this.load.image('bedroom_1_bad', 'assets/img/sprites/rooms/chambre_porte_bad.png')
    this.load.image('bedroom_0_good', 'assets/img/sprites/rooms/chambre_face_good.png')
    this.load.image('bedroom_1_good', 'assets/img/sprites/rooms/chambre_porte_good.png')

    this.load.image('kitchen_0_neutral', 'assets/img/sprites/rooms/cuisine_face.png')
    this.load.image('kitchen_1_neutral', 'assets/img/sprites/rooms/cuisine_porte.png')
    this.load.image('kitchen_0_bad', 'assets/img/sprites/rooms/cuisine_face_bad.png')
    this.load.image('kitchen_1_bad', 'assets/img/sprites/rooms/cuisine_porte_bad.png')
    this.load.image('kitchen_0_good', 'assets/img/sprites/rooms/cuisine_face_good.png')
    this.load.image('kitchen_1_good', 'assets/img/sprites/rooms/cuisine_porte_good.png')

    this.load.audio('music_neutral', 'assets/sound/neutral_round.wav')
    this.load.audio('music_good', 'assets/sound/good_round.wav')
    this.load.audio('music_bad', 'assets/sound/bad_round.wav')
    this.load.audio('music_very_bad', 'assets/sound/very_bad_round.wav')

    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
  }

  create() {
    this.scene.start('MainScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
