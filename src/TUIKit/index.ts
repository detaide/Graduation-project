import TUIChatEngine from "@tencentcloud/chat-uikit-engine";
import { genTestUserSig } from "./debug";
import Server from "./server";
import TUIComponents, {
  TUIChat,
  TUIConversation,
  TUIContact,
  TUISearch,
  TUIGroup,
} from "./components";
import { App } from "vue";
import { TUILogin } from "@tencentcloud/tui-core";

const SDKAppID = 1600028196; // Your SDKAppID
const secretKey = "eb80e1a18137ab3055ff966c4cb89be5a8852f3ee5d0f9cc1a71796c79e2568f"; //Your secretKey
// const userID = "who"; // User ID

const TUIChatKit = new Server();

export {
  TUIChatKit,
  TUIChatEngine,
  TUIComponents,
  TUIChat,
  TUIConversation,
  TUIContact,
  TUISearch,
  TUIGroup,
  genTestUserSig,
};

export async function TUIKitLogin(userID : string)
{
  // console.log("login")
  // console.log(TUIChatKit)
  let ret = await TUILogin.login({  
      SDKAppID,
      userID,
      // UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。  
      // 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688 
      userSig: genTestUserSig({
          SDKAppID,
          secretKey,
          userID,  
      }).userSig,  
      // 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true  
      useUploadPlugin: true,  
      // 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航  
      // 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139  
      // 如果您已购买内容审核服务，开启此功能请设置为 true  
      useProfanityFilterPlugin: false,  
      framework: "vue3",
  });

  

  // // console.log("TUIChatKit", TUIChatKit)
}

export function useTUIKit(app : App<Element>)
{
  // TUIChatKit add TUIComponents
  TUIChatKit.components(TUIComponents, app);
  // TUIChatKit init
  TUIChatKit.init();
  // TUICore login
  // TUILogin.login({  
  //     SDKAppID,
  //     userID,
  //     // UserSig 是用户登录即时通信 IM 的密码，其本质是对 UserID 等信息加密后得到的密文。  
  //     // 该方法仅适合本地跑通 Demo 和功能调试，详情请参见 https://cloud.tencent.com/document/product/269/32688 
  //     userSig: genTestUserSig({
  //         SDKAppID,
  //         secretKey,
  //         userID,  
  //     }).userSig,  
  //     // 如果您需要发送图片、语音、视频、文件等富媒体消息，请设置为 true  
  //     useUploadPlugin: true,  
  //     // 本地审核可识别、处理不安全、不适宜的内容，为您的产品体验和业务安全保驾护航  
  //     // 此功能为增值服务，请参考：https://cloud.tencent.com/document/product/269/79139  
  //     // 如果您已购买内容审核服务，开启此功能请设置为 true  
  //     useProfanityFilterPlugin: false,  
  //     framework: "vue3",
  // });
}