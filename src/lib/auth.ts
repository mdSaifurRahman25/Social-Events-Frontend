import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { isPasswordValid, PASSWORD_ERROR_MESSAGE } from "@/lib/password";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("kindred");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") return;

            const password = ctx.body?.password;

            if (typeof password === "string" && !isPasswordValid(password)) {
                throw APIError.from("BAD_REQUEST", { message: PASSWORD_ERROR_MESSAGE, code: "INVALID_PASSWORD" });
            }
        }),
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    }
});