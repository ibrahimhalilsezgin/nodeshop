import Iyzipay from "iyzipay";
import { json, redirect } from '@sveltejs/kit';
import axios from "axios";
import { getCookie } from "../../../utils/cookie.util.js";
import { PUBLIC_BACKENDURL } from "$env/static/public";
import { PRIVATE_IYZICOAPIKEY, PRIVATE_IYZICOSECRETKEY, PRIVATE_IYZICOURI } from "$env/static/private";

const iyzipay = new Iyzipay({
  apiKey: PRIVATE_IYZICOAPIKEY,
  secretKey: PRIVATE_IYZICOSECRETKEY,
  uri: PRIVATE_IYZICOURI
});

export async function POST({ request,cookies }) {
  const form = await request.formData();

  const token = form.get('token');
  const status = form.get('status');
  const conversationId = form.get('conversationId');
  const paymentId = form.get('paymentId');

  console.log('Iyzico callback:', { token, status, conversationId, paymentId });

  const result:any = await new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ token }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  if(result.status == "failure"){
    console.log(result)
    redirect(303, '/payment/failfure');
  }
  if(result.status == 'success') {

    axios({
        url:PUBLIC_BACKENDURL + '/api/v1/payment/savePurchase',
        method:'POST',
        headers:{
            Authorization: 'Bearer ' + cookies.get('token')
        },
        data:{
            token: token
        }
    })
    .then((res) => {
        console.log(res)
    })
    
    .catch((err) => {
        console.log(err)
    })
    redirect(301, '/payment/success/');
  }
}
