import { redirect } from '@sveltejs/kit';

export const load = async ({ locals,params }) => {
    if(!locals.user?.isAdmin) return redirect(303, '/');

    return {
        user: locals.user
    }
};