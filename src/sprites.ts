import { registerSpriteDefinition } from "./lib/SpriteRepo"

const SPRITE = {
    FISHING:"fishing"
}
const registerAllSprites  = () => {
    registerSpriteDefinition(SPRITE.FISHING, {
        sourceHeight:16,
        sourceWidth:16,
        sourceLeft:32,
        sourceTop:0,
        width:16,
        height:16,
     })
}

export {
    registerAllSprites,
    SPRITE
}