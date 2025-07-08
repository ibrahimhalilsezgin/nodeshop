import axios from "axios";
import "dotenv/config";



export function validateEmail(email) {

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return emailPattern.test(email);

}
let epoch = 1750085232920n;
let increment = 0n;

export function generateSnowflake() {
  const timestamp = BigInt(Date.now()) - epoch; // Geçerli zaman - epoch
  const timestampShifted = timestamp << 22n;

  const workerId = 1n << 17n;     // örnek worker ID (5 bit)
  const processId = 1n << 12n;    // örnek process ID (5 bit)
  const inc = increment++ & 0xFFFn; // 12 bitlik increment (0-4095)

  return (timestampShifted | workerId | processId | inc).toString();
}
export const isValidPhoneNumber = (phone) => {
  return /^(\+90|0)?5\d{9}$/.test(phone);
};


export async function sendWebhook(username:string, content:string, embeds = []) {
    let webhookURL:string = process.env.webhookURL;



    const response = await axios({
      method:'POST',
      url:webhookURL,
      data:{
        content: content,
        username: username,
        embeds: embeds ? embeds : [], 
      }
    })

    if(!response) return null;

    return response;
}