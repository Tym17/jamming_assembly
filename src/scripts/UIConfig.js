const SCENE_GRID_TILESIZE = 96
const SCENE_GRID_POS_X = 707
const SCENE_GRID_POS_Y = 540

const sceneGridPositionBottomLeft = (x, y) => ([SCENE_GRID_POS_X - (x / 2) * SCENE_GRID_TILESIZE,
                                                SCENE_GRID_POS_Y + (y / 2 - 1) * SCENE_GRID_TILESIZE])
const sceneGridTileToPixel = (x, y, maxX=13, maxY=8) => ([sceneGridPositionBottomLeft(maxX, maxY)[0] + x * SCENE_GRID_TILESIZE,
                                                          sceneGridPositionBottomLeft(maxX, maxY)[1] - y * SCENE_GRID_TILESIZE])

const INVENTORY_GRID_TILESIZE = 192
const INVENTORY_GRID_POS_X = 1609
const INVENTORY_GRID_POS_Y = 564

const inventoryGridPositionBottomLeft = (x, y) => ([INVENTORY_GRID_POS_X - (x / 2 - 0.5) * INVENTORY_GRID_TILESIZE,
                                                    INVENTORY_GRID_POS_Y - (y / 2 - 0.5) * INVENTORY_GRID_TILESIZE])
const inventoryGridTileToPixel = (x, y, maxX=2, maxY=3) => ([inventoryGridPositionBottomLeft(maxX, maxY)[0] + x * INVENTORY_GRID_TILESIZE,
                                                             inventoryGridPositionBottomLeft(maxX, maxY)[1] + y * INVENTORY_GRID_TILESIZE])
                                                          

export default {
    sceneGrid: {
        positionCenter: [SCENE_GRID_POS_X, SCENE_GRID_POS_Y],
        positionBottomLeft: sceneGridPositionBottomLeft,
        tileSize: SCENE_GRID_TILESIZE,
        size: (x, y) => ([x * SCENE_GRID_TILESIZE, y * SCENE_GRID_TILESIZE]),
        tileToPixel: sceneGridTileToPixel,
        pixelToTile: (x, y, maxX=13, maxY=8) => {
            const tile = [~~((x - sceneGridPositionBottomLeft(maxX, maxY)[0]) / SCENE_GRID_TILESIZE),
                          ~~((sceneGridPositionBottomLeft(maxX, maxY)[1] - y) / SCENE_GRID_TILESIZE + 1)]
            return tile
        }
    },
    inventoryGrid: {
        positionCenter: [INVENTORY_GRID_POS_X, INVENTORY_GRID_POS_Y],
        positionBottomLeft: inventoryGridPositionBottomLeft,
        tileSize: INVENTORY_GRID_TILESIZE,
        size: (x, y) => ([x * INVENTORY_GRID_TILESIZE, y * INVENTORY_GRID_TILESIZE]),
        tileToPixel: inventoryGridTileToPixel,
        pixelToTile: (x, y, maxX=2, maxY=3) => {
            const tile = [~~((x - inventoryGridPositionBottomLeft(maxX, maxY)[0]) / INVENTORY_GRID_TILESIZE),
                          ~~((y - inventoryGridPositionBottomLeft(maxX, maxY)[1]) / INVENTORY_GRID_TILESIZE)]
            return tile
        }
    }
}