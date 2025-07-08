import axios from 'axios';

export const load = async ({ locals }) => {

    const statics = await axios({
        url:'http://localhost:5500/',
        method:'GET',
    })
    return {
        stats: statics.data,
        
        user: locals.user
    };
};
