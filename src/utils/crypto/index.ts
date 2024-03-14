
import sha256 from "crypto-js/sha256";


export function encrypted(text : string)
{
    let sha256Text = sha256(text);
    return sha256Text.toString();
}
