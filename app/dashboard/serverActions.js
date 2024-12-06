"use server"
import {verifySession} from "@/app/authentication/DataAccessLayer";
import {redirect} from "next/navigation";
import prisma from "@/lib/databaseConnector";

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
        console.log(userInformation.paintings + " THIS IS USERINFORMATION")
    }
}