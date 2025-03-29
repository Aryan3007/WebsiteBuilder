'use server'
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import bcrypt from 'bcryptjs';


export async function signUp(email : string, password: string, name: string){
    const session = await getServerSession(authOptions);
    if (session?.user) {
        throw new Error('User is already signed in');
    }

    const existingUser = await prisma.user.findUnique({
        where : {
            email: email
        },
        select:{
            password: true,
            name: true
        }
    })

    if(existingUser){
        return {
            message: 'User already exists',
            status: 409,
            user: null,
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        }
    })

    return {
        message: "User created successfully",
        status: 200,
        user: user,
    };
}