"use server"
import prisma from "@/lib/databaseConnector";
import {redirect} from "next/navigation";
import {SignJWT, jwtVerify} from "jose"
import {cookies} from "next/headers";
const bcrypt = require ('bcrypt');



export async function submitted(state, data) {
    const email = data.get("email");
    const password = data.get("password");

    const checkingUser = await prisma.organization.findUnique({
        where:{
            email: email
        }
    })
    console.log(secretKey)
    if (checkingUser) {
        const passwordOld = checkingUser.password;
        const match = await bcrypt.compare(password, passwordOld)
        if (match) {
            await createSession(email)
            redirect("/dashboard")
        } else{
            console.log("error raised")
            return {message : "The password was incorrect"};
        }
    } else{
        console.log("error raised")
        return {message : "The username was incorrect"};
    }
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('4h')
        .sign(encodedKey)
}
export async function createSession(userId) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}