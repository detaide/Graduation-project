
export function openChatModel()
{
    const chatModel = document.querySelector(".chatModel");
    chatModel?.classList.remove("display-hide");
}

export async function closeChatModel()
{
    const chatModel = await document.querySelector(".chatModel");
    chatModel?.classList.add("display-hide")
}
