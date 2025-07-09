import { redirect } from '@sveltejs/kit';
import { BACKENDURL } from '$env/static/private';

export const load = async ({ locals,params }) => {
    if(!locals.user?.isAdmin) return redirect(303, '/');

    return {
        user: locals.user,
        BACKENDURL
    }
};