import { createDiscreteApi } from "naive-ui";
import { App } from "vue";

const {message} = createDiscreteApi(["message"]);

export function useGlobalErrorHandle(app : App<Element>)
{
    app.config.errorHandler = (error : any, vm, info) =>
    {
        message.error(error?.message || "Error");
    }

}