import { App } from "vue"

const modules = import.meta.glob('./**/*.ts')


let directives : {[key : string] : any} = {}

async function loadDirectiveModule() {
    for( const [path, module] of Object.entries(modules))
    {
        const list = await module() as any
      for (const key in list) {
        directives[key] = list[key]
      }
    }
}


//导入自定义指令 
export async function setupDirective(app : App)
{

    await loadDirectiveModule();
    for(let [name, directive] of Object.entries(directives)){
        app.directive(name, directive as any)
    }
}


export {directives}