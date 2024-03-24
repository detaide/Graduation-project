import { Router } from "vue-router";
import { useUserInfoStore } from "@/store/modules/userInfo";

export function usePermission(router : Router)
{
    router.beforeEach(async (to, from, next) => {
        if(to.matched.some(record => record.meta.requiresAuth))
        {
            const userInfoStore = useUserInfoStore();
            let checkLogin = await userInfoStore.isLogin();
            if(!checkLogin){
                next("/home")
                return;
            } 
        }
    
        next();
    });
    
}