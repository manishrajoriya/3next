
import {z} from "zod"

export const usernameValidation = z.
string().min(3, "minimum 3 letter").max(20, "maximum 20 letter").regex(/^[a-zA-Z0-9_]+$/)

export const signUpSchema = z.object({
    username: usernameValidation,
    password: z.string().min(4, "minimum 4 letter"),
    email: z.string().email("invalid email")
})