import { redirect } from '@sveltejs/kit';
import { PUBLIC_BACKENDURL } from '$env/static/public';

export const load = async ({ locals,params }) => {
    if(!locals.user?.isAdmin) return redirect(303, '/');

    return {
        user: locals.user,
        PUBLIC_BACKENDURL
    }
};