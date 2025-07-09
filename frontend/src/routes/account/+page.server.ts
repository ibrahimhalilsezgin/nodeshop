import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import {PUBLIC_BACKENDURL} from "$env/static/public"

export const load = async ({ locals, cookies }) => {

    if(!locals.user) return redirect(303, '/login')
    let userDetails:any
    const response = await axios({
        url: PUBLIC_BACKENDURL +'/api/v1/userDetails',
        method:'GET',
         headers: {
            Authorization: 'Bearer ' + cookies.get('token')
        }
    })

    if(response.status == 200) {
        userDetails = response.data
    } else {
        userDetails = null
    }

    return {
        user: locals.user,
        userDetails
    };
};
