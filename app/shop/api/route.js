// import prisma from "@/lib/databaseConnector";
// import {NextResponse} from "next/server";
// import {s3} from "@/app/dashboard/serverActions"
// import { GetObjectCommand } from "@aws-sdk/client-s3";
//
// export async function POST(request) {
//         let requestData = await request.json()
//         const painting = await prisma.paintings.findUnique({
//         where: {
//             slug: requestData.slug
//         }
//     });
//         const image1 = await getFile(painting.imageName)
//         return Response.json(painting)
// }
// export async function getFile(fileName) {
//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: fileName,
//     };
//
//     try {
//         const data = await s3.send(new GetObjectCommand(params));
//         console.log("File retrieved successfully:", data);
//         return data.Body; // Body is a readable stream
//     } catch (err) {
//         console.error("Error retrieving file:", err);
//         throw err;
//     }
// }