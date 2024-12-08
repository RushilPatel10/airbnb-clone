import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt?.toISOString() , // Safeguard
            updatedAt: currentUser.updatedAt?.toISOString() , // Safeguard
            emailVerified: currentUser.emailVerified?.toISOString() || null, // Safeguard
        };
    } catch (error: unknown) {
        console.error("Error in getCurrentUser:", error);
        return null;
    }
}
