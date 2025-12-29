'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAdminClient, createSessionClient } from '@/lib/appwrite/client';

export const signIn = async (email: string, password: string) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);
        (await cookies()).set("session", session.secret, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            path: '/'
        })
        return { status: true }
    } catch (error) {
        console.log("SIGNIN-ERROR", error)
        return { statue: false, error }
    }
}

export const getUser = async () => {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        if (!user) throw new Error("No User")
        return user;
    } catch (error) {
        console.log("GET-USER-ERROR", error)
        return null;
    }
}

export const signOut = async () => {
    const { account } = await createSessionClient();
    (await cookies()).delete('session')
    account.deleteSession({ sessionId: 'current' });
    redirect("/login");
}