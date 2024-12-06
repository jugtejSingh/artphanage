import prisma from "@/lib/databaseConnector";
import {NextResponse} from "next/server";

export async function POST(request) {
    let requestData = await request.json()
           const painting = await prisma.paintings.findUnique({
            where: {
                slug: requestData.slug
            }
        });
        return Response.json(painting)
}