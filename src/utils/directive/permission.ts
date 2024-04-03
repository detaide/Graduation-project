import { useUserInfoStore } from "@/store/modules/userInfo";


const permission = {
    mounted : (el : HTMLElement, binding : any) =>
    {
        let originFunc = binding.value;
        
        el.addEventListener("click",async (event) => {
            let userInfoStore = useUserInfoStore()
            
            let loginStatus = await userInfoStore.isLogin();
            if(!loginStatus)
            {
                window.message.error("请先登录");
                return;
            }

            originFunc(event)
        })

    }
}

export {permission}