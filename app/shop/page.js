import Navbar from "@/app/homepage/Navbar.js"
import Cards from "./card.js"
import styles from "./cssfiles/shop.module.css"
import prisma from "@/lib/databaseConnector";


export default async function Page() {
    const painting = await prisma.paintings.findMany()
    console.log(painting)
    return (
        <div>
            <Navbar />
            <Cards painting={painting}/>
        </div>
    );
}
