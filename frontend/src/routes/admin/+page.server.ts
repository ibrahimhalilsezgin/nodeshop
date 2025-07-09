import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { BACKENDURL } from '$env/static/private';

export const load = async ({ locals }) => {
    if(!locals.user) return;
    if(!locals.user.isAdmin) return redirect(303, '/');

    return {
        user: locals.user,
        BACKENDURL
    };
};
