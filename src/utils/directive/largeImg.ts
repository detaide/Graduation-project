// largeImgTrigger
import { eventBus } from "../eventBus";

const largeImg = {
    mounted : (el : HTMLImageElement, binding : any) =>
    {
        let originFunc = binding.value;
        if(el.nodeName !== "IMG")
        {
            return;
        }
       
        el.addEventListener("click",async (event) => {
            eventBus.emit("largeImgTrigger", el.src);
        })

    }
}

export {largeImg}