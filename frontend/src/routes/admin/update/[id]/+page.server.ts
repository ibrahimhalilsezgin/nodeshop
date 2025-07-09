import { BACKENDURL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals,params,cookies }) => {
    if(!locals.user?.isAdmin) return redirect(303, '/');
    let product:any;
    let {id} = params
    try {
        const response = await axios({
            url: BACKENDURL + '/api/v1/getProduct/' + params.id,
            method:'get',
            headers:{
                Authorization:'Bearer ' + cookies.get('token')
            }
        })
        product = response.data.product;
    } catch (e) {
        console.log(e);
    }
    console.log(params.id)
    return {
        product,
        id,
        user: locals.user
    };
};
