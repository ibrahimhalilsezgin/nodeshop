import { PUBLIC_BACKENDURL } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals }) => {
    let products: any[] = [];
    console.log(locals.user.isAdmin)
    if(!locals.user.isAdmin) return redirect(303, '/');

    try {
        const response = await axios.get(PUBLIC_BACKENDURL + '/api/v1/getAllProducts');
        products = response.data.products;
    } catch (e) {
        console.log(e);
    }

    return {
        products,
        user: locals.user
    };
};
