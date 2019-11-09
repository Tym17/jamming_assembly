const SCENE_GRID_TILESIZE = 96
const SCENE_GRID_POS_X = 1920 * 0.4
const SCENE_GRID_POS_Y = 1080 * 0.4

export default {
    sceneGrid: {
        position: [SCENE_GRID_POS_X, SCENE_GRID_POS_Y],
        tileSize: SCENE_GRID_TILESIZE,
        size: (x, y) => ([x * SCENE_GRID_TILESIZE, y * SCENE_GRID_TILESIZE]),
        tileToPixel: (x, y) => ([SCENE_GRID_POS_X + (x + 0.5) * SCENE_GRID_TILESIZE,
                                 SCENE_GRID_POS_Y + (y + 0.5) * SCENE_GRID_TILESIZE])
    }
}