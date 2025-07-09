import axios from 'axios';
import {BACKENDURL} from "$env/static/private"
export const load = async ({ locals }) => {

    const statics = await axios({
        url:BACKENDURL,
        method:'GET',
    })
    return {
        stats: statics.data,
        
        user: locals.user
    };
};
