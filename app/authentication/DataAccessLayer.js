import "server-only"
import {cache} from "react"
import { cookies } from 'next/headers'
import {jwtVerify} from "jose";

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export const verifySession = cache(async () => {
    const cookie = await cookies().get('session')?.value
    if (cookie === undefined){
        return {isAuth: false, userId: null}
    } else{
    const session = await decrypt(cookie)
        if (!session?.userId) {
            return {isAuth: false, userId: null}
        }
        return {isAuth: true, userId: session.userId}
}})
export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}