import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { PUBLIC_BACKENDURL } from '$env/static/public';

export const load = async ({ locals }) => {
    if(!locals.user) return;
    if(!locals.user.isAdmin) return redirect(303, '/');

    return {
        user: locals.user,
        PUBLIC_BACKENDURL
    };
};
