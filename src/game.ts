import {createButtonTrigger} from './lib/Inventory/ButtonTrigger';
import { createInvetory } from './lib/Inventory/Inventory';
import { getSpriteDefinition } from './lib/SpriteRepo';
import { registerAllSprites, SPRITE } from './sprites';

registerAllSprites();
const triggerButton = createButtonTrigger({backgroundColor:Color4.Red()})
const inventory = createInvetory(new UICanvas(), {
  tabDefinitions:[
    {
      id:SPRITE.FISHING,
      label:"Fishing",
      spriteDefinition:getSpriteDefinition(SPRITE.FISHING),
      maxSlots:20
    },
    {
      id:SPRITE.FISHING,
      label:"Fishing",
      spriteDefinition:getSpriteDefinition(SPRITE.FISHING),
      maxSlots:10
    }    
  ],
  width:400,
  height:200,
  slotSize:32
});




triggerButton.onClick(()=>{
  
})