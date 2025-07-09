import { PUBLIC_BACKENDURL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals }) => {
    let products: any[] = [];
    if(!locals.user) throw redirect(303 , '/login')

    try {
        const response = await axios.get( PUBLIC_BACKENDURL +'/api/v1/getAllProducts');
        products = response.data.products;
    } catch (e) {
        console.log(e);
    }

    return {
        products,
        user: locals.user
    };
};
