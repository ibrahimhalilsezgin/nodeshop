import { PUBLIC_BACKENDURL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals, params }) => {
    let product:any;
    if(!locals.user) throw redirect(303 , '/login')

    try {
        const response = await axios.get(PUBLIC_BACKENDURL +'/api/v1/getProductInfo/' + params.id);
        product = response.data.product;
    } catch (e) {
        console.log(e);
    }

    return {
        product,
        user: locals.user
    };
};
