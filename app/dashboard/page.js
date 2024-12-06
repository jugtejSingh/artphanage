"use server"
import Navbar from "@/app/homepage/Navbar";
import {DashboardForOrphanages} from "@/app/dashboard/dashboardForOrphanages";
import {fetchingData} from "@/app/dashboard/serverActions";
import {redirect} from "next/navigation";


export default async function Page() {
    const userInformation = await fetchingData()
    return (
        <div>
            <Navbar />
            <DashboardForOrphanages />
        </div>
    );
}
