import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { db } from "./db";

function getGoogleCredentials() {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || clientId.length === 0) {
        throw new Error('Missing GOOGLE client ID')
    }
    if (!clientSecret || clientSecret.length === 0) {
        throw new Error('Missing GOOGLE client Secret')
    }

    return {
        clientId, 
        clientSecret,
    }
}


export const authOptions: NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret,
        })
    ],
    callbacks: {
        async jwt ({token, user}){
            const dbUser = (await db.get(`user:${token.id}`)) as User | null;

            if(!dbUser){
                token.id = user!.id
                return token
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                picture: dbUser.image,
                email: dbUser.email,
            }
        }
    }
}