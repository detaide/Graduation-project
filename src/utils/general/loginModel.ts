


export function triggerLogin()
{
    const loginModel = document.querySelector(".loginModel");
    loginModel?.classList.toggle("display-hide");
}

export function openLoginModel()
{
    const loginModel = document.querySelector(".loginModel");
    loginModel?.classList.remove("display-hide");
}

export async function closeLoginModel()
{
    const loginModel = await document.querySelector(".loginModel");
    loginModel?.classList.add("display-hide")
}
