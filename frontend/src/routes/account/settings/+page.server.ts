import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals, cookies }) => {
    if(!locals.user) return redirect(303, '/login')
    let userDetails:any
    const response = await axios({
        url: 'http://localhost:5500/api/v1/userDetails',
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
