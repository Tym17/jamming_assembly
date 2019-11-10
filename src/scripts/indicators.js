const VIEW_WIDTH = 1920;
const VIEW_HEIGHT = 1080;

const OFFSET_INV_Y = 43;
const OFFSET_INV_X = 1130;
const INV_WIDTH = 201;
const INV_HEIGHT = 97;

const EYE_POS_X = 1158;
const SUN_POS_X = 1235;
const HUD_POS_Y = 75;

const SUN_MAX_LEVEL = 3;
const EYE_MAX_TIRED = 3;
const EYE_MAX_CRAZY = 3;

const EYE_PATH = 'assets/img/sprites/hud/oeil_icone_';

const SLEEPING_SPEED = 0.004;

export default class Indicators {
    game;
    sunLevel;
    activeSunSprite;

    tiredLevel;
    crazyLevel;
    eyeTirednessNames;
    eyeCrazinessNames;
    activeEyeSprite;

    sleepOverlay;
    goingToBed;
    transitionning;

    constructor(_game) {
        this.game = _game;

        this.sleepOverlay = this.game.add.rectangle(0, 0, VIEW_WIDTH, VIEW_HEIGHT, 0);
        this.sleepOverlay.setDisplayOrigin(0, 0);
        this.sleepOverlay.setDepth(2000);
        this.sleepOverlay.setAlpha(0);

        this.goingToBed = false;
        this.transitionning = false;

        this.eyeTirednessNames = [
            'open',
            'tired',
            'closed'
        ];
        this.eyeCrazinessNames = [
            'normal',
            'weird',
            'crazy'
        ];

        this.sunLevel = 2;
        this.activeSunSprite = undefined;
        
        this.tiredLevel = 0;
        this.crazyLevel = 0;
        this.activeEyeSprite = undefined;
        
        /* Debug rect
        this.game.add.rectangle(
            OFFSET_INV_X, OFFSET_INV_Y,
            INV_WIDTH, INV_HEIGHT, 0xdadada
        ).setDisplayOrigin(0, 0);
        */
        this.game.load.image('sun_2', 'assets/img/sprites/hud/soleil_icone_1.png');
        this.game.load.image('sun_1', 'assets/img/sprites/hud/soleil_icone_2.png');
        this.game.load.image('sun_0', 'assets/img/sprites/hud/soleil_icone_3.png');

        this.game.load.image(`eye_open_normal`, `${EYE_PATH}ouvert_normal.png`);
        this.game.load.image(`eye_open_weird`, `${EYE_PATH}ouvert_tendu.png`);
        this.game.load.image(`eye_open_crazy`, `${EYE_PATH}ouvert_fou.png`);

        this.game.load.image(`eye_tired_normal`, `${EYE_PATH}fatigue_normal.png`);
        this.game.load.image(`eye_tired_weird`, `${EYE_PATH}fatigue_tendu.png`);
        this.game.load.image(`eye_tired_crazy`, `${EYE_PATH}fatigue_fou.png`);

        this.game.load.image('eye_closed', `${EYE_PATH}ferme.png`);

        this.game.load.image('bg_ui', 'assets/img/sprites/background_ui.png');
    }

    updateSun(level) {
        level = Math.trunc(level);
        if (level != this.sunLevel) {
            this.sunLevel = level;
        }

        this.refreshSun();
    }

    updateEye(tiredness, craziness) {
        tiredness = Math.trunc(3 - tiredness);
        if (tiredness === 3) {
            tiredness = 2;
        }
        craziness = 2 - Math.trunc(craziness / 34);

        if (this.tiredLevel !== tiredness 
            || this.CrazyLevel !== craziness) {
            console.log('eye levels', tiredness, craziness);
            this.tiredLevel = tiredness;
            this.crazyLevel = craziness;
            this.refreshEye();
        }
    }

    getEyeSprite() {
        if (this.tiredLevel === 2) {
            return 'eye_closed';
        } 

        return `eye_${this.eyeTirednessNames[this.tiredLevel]}_${this.eyeCrazinessNames[this.crazyLevel]}`;
    }

    refreshEye() {
        let newEyeSprite = this.game.add.image(
            EYE_POS_X, HUD_POS_Y,
            this.getEyeSprite()
        );
        newEyeSprite.setDisplayOrigin(0, 0);

        if (this.activeEyeSprite !== undefined) {
            this.activeEyeSprite.destroy();
        }
        this.activeEyeSprite = newEyeSprite;
    }

    refreshSun() {
        let newSunSprite = this.game.add.image(
            SUN_POS_X, HUD_POS_Y - 17,
            `sun_${this.sunLevel}`
        );
        newSunSprite.setDisplayOrigin(0, 0);

        if (this.activeSunSprite !== undefined) {
            this.activeSunSprite.destroy();
        }
        this.activeSunSprite = newSunSprite;
    }

    create() {
        this.refreshSun();
        this.refreshEye();
        let bg = this.game.add.image(0, 0, 'bg_ui');
        bg.setDisplayOrigin(0, 0);
        bg.setDepth(-1);
    }

    nightTime() {
        this.transitionning = true;
        this.goingToBed = true;
    }

    update(time, delta) {
        if (this.transitionning) {
            let alpha = this.sleepOverlay.alpha;
            if (this.goingToBed) {
                this.sleepOverlay.setAlpha(alpha + (delta * SLEEPING_SPEED));
                if (this.sleepOverlay.alpha >= 1) {
                    this.sleepOverlay.alpha = 1;
                    this.goingToBed = false;
                }
            } else {
                this.sleepOverlay.setAlpha(alpha - (delta * SLEEPING_SPEED));
                if (this.sleepOverlay.alpha <= 0) {
                    this.sleepOverlay.alpha = 0;
                    this.transitionning = false;
                }
            }
        }
    }

}
