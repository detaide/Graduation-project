const modules = import.meta.glob('./**/*.ts')

let api : any = {}


async function loadModule() {
    for (const [path, module] of Object.entries(modules)) {
      const list = await module() as any
      for (const key in list) {
        api[key] = list[key]
      }
    }
  }


await loadModule()

export  default api;