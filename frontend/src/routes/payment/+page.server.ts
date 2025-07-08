import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals }) => {

    try {
        // const response = await axios({
        //     url:'http://localhost:5500/api/v1/payment',
        //     method:'POST',
        //     data:{
        //         userID: locals.user?.id,
        //         price: 1000,
        //         basketId: locals.user?.id + 'basket' + Math.floor(Math.random() * 1000 * Math.random()).toString(),
        //         basketItems: JSON.parse(localStorage.getItem('basket') || '')
        //     }
        // });

        // console.log(response.data)

        console.log(locals.user)
    } catch (e) {
        console.log(e);
    }

    return {

        user: locals.user
    };
};
