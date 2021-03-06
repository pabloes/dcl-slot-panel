import { SPRITE } from "../../sprites";
import { createSlotPanel } from "../SlotPanel/SlotPanel";
import { getSpriteDefinition, SpriteDefiniton } from "../SpriteRepo";
import { TabDefinition } from "../Tabs/Tab";
import { createTabs } from "../Tabs/TabNavigator";
import { getImageSrc } from "../utils";

const canvas= new UICanvas();

type UIContainer = UICanvas|UIContainerRect|UIContainerStack|UIScrollRect;
type InventoryOptions = {
    tabDefinitions:TabDefinition[], 
    width?:number,
    height?:number,
    tabDefaultSize?:number,
    slotSize?:number
}

const createInvetory = (parent:UIContainer = canvas, options:InventoryOptions) => {
    const { tabDefinitions, height, width, tabDefaultSize, slotSize } = options;

    const callbacks = {
        onClickItem:null
    };

    const state = {
        currentTab:tabDefinitions[0]
    };
    const background = new UIContainerRect(parent);
    background.color = Color4.Black();    
    
    background.opacity = 0.3;
    const container = new UIContainerRect(parent);      
    background.height =  container.height = height || 300;
    background.width = container.width = width || 400;
    
    const tabNav = createTabs(container, {
        tabDefinitions,
        tabDefaultSize:100        
    });
    
    const slotPanel = createSlotPanel(container, {
        tabDefinitions,
        slotSize:slotSize||64
    });

    slotPanel.setMaxSlots(10);//TODO tab[0] maxSlots
    tabNav.onChangeActiveTab((tab)=>{
        const maxSlots = 1+Math.floor(Math.random()*30);
        slotPanel.setMaxSlots(maxSlots);
    });
    return {
        onClickItem:(fn)=>{
            callbacks.onClickItem = fn;
            return ()=>callbacks.onClickItem = null;
        },
        dispose:()=>{

        }
    }
};

export {
    createInvetory
}