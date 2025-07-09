import axios from 'axios';
import {PUBLIC_BACKENDURL} from "$env/static/public"
export const load = async ({ locals }) => {

    const statics = await axios({
        url:PUBLIC_BACKENDURL,
        method:'GET',
    })
    return {
        stats: statics.data,
        
        user: locals.user
    };
};
