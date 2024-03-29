import type {Actions} from "@sveltejs/kit";
// import { supabase } from '../../hooks.server'
import {fail, json} from "@sveltejs/kit";
import {redirect, setFlash} from "sveltekit-flash-message/server";

export const load = async (event) => {
    const loggedInUser = await event.locals.getSession();
    if (loggedInUser) {
        throw redirect(308, "/");
    }
}

export const actions : Actions  = {
    register: async ({request , url,  locals: { supabase }, cookies}) => {
        const formData = await request.formData()
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirm_password = formData.get('confirm_password') as string
        //if account had register is will have no error and no return bacuse it might cause data leak (supabase feature)
        if (password !== confirm_password){
            setFlash({type: "error", message: "Invalid Input"}, cookies)
            return fail(400)
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${url.origin}/api/auth/callback`,
            },
        })

        if (error) {
            // console.log(error.message)
            // return fail(500, { message: 'Server error. Try again later.', success: false, email })
            // return json("Please Try Again Later")
            setFlash({type: "error", message: error.message}, cookies)
            return fail(400)
        }

        // console.log("the chcek email thingy")//it work

        setFlash({type: 'success', message: 'Please check your email for a magic link'}, cookies)
    }
}