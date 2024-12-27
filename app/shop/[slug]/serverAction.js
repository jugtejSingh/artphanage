"use server"
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import prisma from "@/lib/databaseConnector";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWSS3_ACCESS_KEY,
        secretAccessKey: process.env.AWSS3_SECRET_KEY,
    },
})

export async function gettingData(slug){
    const painting = await prisma.paintings.findUnique({
        where: {
            slug: slug
        }
    });
    for (let i = 0; i < painting.imageName.length; i++){
        painting.imageName[i] = await getImage(painting.imageName[i])
    }
    return painting
}

async function getImage(fileName){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "images/"+fileName,
    };

    try{
        const command = new GetObjectCommand(params);
        return await getSignedUrl(s3, command, {expiresIn: 3600})
            } catch (err) {
        console.error("Error retrieving file:", err);
        throw err;
    }
}