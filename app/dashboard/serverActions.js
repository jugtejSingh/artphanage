"use server"
import {verifySession} from "@/app/authentication/DataAccessLayer";
import {redirect} from "next/navigation";
import prisma from "@/lib/databaseConnector";
import {S3Client,PutObjectCommand} from "@aws-sdk/client-s3";
import {randomUUID} from "crypto";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWSS3_ACCESS_KEY,
        secretAccessKey: process.env.AWSS3_SECRET_KEY,
    },
})
export async function fetchingData(){
    const authentication = await verifySession();
    if (await authentication.isAuth === false){
        redirect("/")
    }else{
        const userId = await authentication.userId
        const userInformation = await prisma.organization.findFirst({
            where:{
                email : userId
            }
        });
    }
}
export async function addData(state,data){
    const authentication = await verifySession();
    const userId = await authentication.userId
    const userInformation = await prisma.organization.findFirst({
        where:{
            id : userId
        }
    });
    const name = data.get("nameOfArt");
    const description = data.get("description");
    const frame = data.get("frame");
    const price = data.get("price");
    const location = data.get("location");
    const childName = data.get("nameOfArtist");
    const dimensions = data.get("dimension");
    const slug = await randomUUID()
    const file = await data.getAll("images");
    const orphanage = userInformation.name
    const array = []
    for (let  i = 0; i < file.length; i++) {
        const arrayBuffer = await file[i].arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const imageNewName = randomUUID()+"%"+file.name
        array.push(imageNewName)
        await uploadFile(imageNewName ,buffer);
    }
    const newPainting = await prisma.paintings.create({
        data:{
            artName: name,
            description: description,
            price: price,
            sold: "No",
            imageName:array,
            size: dimensions,
            frame : frame,
            slug: slug,
            childName: childName,
            location: location,
            orphanage: orphanage,

            organization:{
                connect:{id:userInformation.id},
            },
        },
    });
}
async function uploadFile(nameOfFile, buffer){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${nameOfFile}`,
        Body: buffer, // A Buffer or Readable Stream
        ContentType: 'image/jpeg',
    };

    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log('Upload successful:', data);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
}
export async function gettingData(){
    const authentication = await verifySession();
    const userId = await authentication.userId
    console.log(userId)
    let returnData = await prisma.paintings.findMany({
        where :{
            organizationId: userId,
        },
    })
    return returnData
}
