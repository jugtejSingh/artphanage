import Navbar from "@/app/homepage/Navbar";
import Cards from "./card.js"
import prisma from "@/lib/databaseConnector";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWSS3_ACCESS_KEY,
        secretAccessKey: process.env.AWSS3_SECRET_KEY,
    },
})

export default async function Page() {
    const painting = await prisma.paintings.findMany()
    painting.map(async (painting) => {
        painting.imageName[0] = await getImage(painting.imageName[0])
    })

    return (
        <div>
            <Navbar />
            <Cards painting={painting}/>
        </div>
    );
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