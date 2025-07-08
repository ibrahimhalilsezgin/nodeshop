import { redirect } from '@sveltejs/kit';
import axios from 'axios';

export const load = async ({ locals }) => {

    try {


        console.log(locals.user)
    } catch (e) {
        console.log(e);
    }

    return {

        user: locals.user
    };
};
