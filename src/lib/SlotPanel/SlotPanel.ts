
const createSlot = (parent, options) => {
    const {slotSize, x, y} = options;
    let background = new UIContainerRect(parent);
    
    background.width = slotSize;
    background.height = slotSize;
    background.vAlign = "top";
    background.hAlign = "left";
    background.positionX = x;
    background.positionY = -y;     
    background.color = Color4.Black();
    background.opacity = 0.5;

    const callbacks = {
        onClick:null
    };

    return {
        setVisible:(value)=>{
            background.visible = value;
        },
        onClick: (fn) => {
            callbacks.onClick = fn;
            return () => callbacks.onClick = null;
        },
        dispose:() => {
            callbacks.onClick = null;
            background.visible = false;
            //TODO we cannot remove UI elements, so we should create a pool and disabled/hide the necessary            
        }
    };
};

const createSlotPanel = (parent = new UICanvas(), options ) => {
    const background = new UIContainerRect(parent);
    const container = new UIContainerRect(parent);
    const parentWidthNum = Number(parent.width.toString().replace("px",""));
    const parentHeightNum = Number(parent.height.toString().replace("px",""));
    const slotSize = options.slotSize || 64;
    const padding = 2;
    const columns = Math.floor(parentWidthNum / (slotSize + padding));
    const rows = Math.floor(parentHeightNum / (slotSize + padding));
    const MAX_SLOTS = columns * rows;

    const component = {
        slots:Array(MAX_SLOTS).fill(null).map((_,index)=>{
            const currentRow = getCurrentRow(columns, index);
            const currentColumn = index%columns;
            return createSlot(container, {
                slotSize,
                x:padding+currentColumn*(slotSize+padding),
                y:padding+currentRow*(slotSize+padding)
            });
        })
    };
    background.width = container.width = parentWidthNum;
    background.height = container.height = parentHeightNum - 30;
    background.hAlign = container.hAlign = "left";
    background.vAlign = container.vAlign = "top";
    background.positionY = container.positionY = -30;
    background.color = Color4.White();
    background.opacity = 0.2;
    

    console.log("rows", rows)
    return {
        setMaxSlots:(num:number)=>{
           component.slots.forEach((slot,index)=>{
            slot.setVisible( (index) < Math.min(num, MAX_SLOTS) )
           });
           /*  console.log("component", component);
            component.slots.forEach(slot=>slot.dispose());
            component.slots = (new Array(num)).fill(null).map((_,index)=>{
                const currentRow = getCurrentRow(columns, index);
                const currentColumn = index%columns;
                return createSlot(container, {
                    slotSize,
                    x:padding+currentColumn*(slotSize+padding),
                    y:padding+currentRow*(slotSize+padding)
                });
            });
            console.log("component2", component); */
        }
    }
}

function getCurrentRow(maxPerRow, index){
    let num = index+1;
    let row = 0;
    while(num--){
        if(num % maxPerRow === 0){
            row++;
        }
    }
    return row-1;
}

export {
    createSlotPanel
};

/* const withCallbacks =  (keys:string[]) => (...params) => (fn) => { //TODO
    const source = fn(...params);
    const _dispose = source.dispose;    
    const callbacks = source.callbacks || {};
    
    keys.forEach(key=>callbacks[key] = null);

    Object.assign(source, {
        dispose:()=>{
            _dispose();
            keys.forEach(key=>{
                callbacks[key] = null;
            })
        }
    })
}; */