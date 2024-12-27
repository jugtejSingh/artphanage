"use server"
import prisma from "@/lib/databaseConnector";
import bcrypt from 'bcrypt';
import {verifySession} from "@/app/authentication/DataAccessLayer";
import {redirect} from "next/navigation";

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
        console.log(userInformation.role)
        if(userInformation.role !== "Admin"){
            redirect("/")
        }
    }
}

export async function registered(state, data){
    await fetchingData()
    try{
    const email = await data.get("email");
    const password = await data.get("password");
    const name = await data.get("name");
    const role = "Admin"
    let hashed = await bcrypt.hash(password, 10);
    const registered = await prisma.organization.create({
        data:{
            email: email,
            password : hashed,
            name : name,
            role: role,
    },});
} catch(e){
    console.error(e);
}
}