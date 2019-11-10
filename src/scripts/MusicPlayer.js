export default class MusicPlayer {
    constructor (game) {
        this.game = game
        
        this.neutral = game.sound.add('music_neutral')
        this.good = game.sound.add('music_good')
        this.bad = game.sound.add('music_bad')
        this.very_bad = game.sound.add('music_very_bad')
        
        this.playing = this.neutral
        this.playing.play({loop: true})
    }

    switchToVeryBad () {
        if (this.playing != this.very_bad) {
            this.playing.stop()
            this.playing = this.very_bad
            this.playing.play({loop: true})
        }
    }

    switchToGood () {
        if (this.playing != this.good) {
            this.playing.stop()
            this.playing = this.good
            this.playing.play({loop: true})
        }
    }

    switchToNeutral () {
        if (this.playing != this.neutral) {
            this.playing.stop()
            this.playing = this.neutral
            this.playing.play({loop: true})
        }
    }

    switchToBad () {
        if (this.playing != this.bad) {
            this.playing.stop()
            this.playing = this.bad
            this.playing.play({loop: true})
        }
    }
}