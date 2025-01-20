import Navbar from "@/app/homepage/Navbar";
import Homepage from "@/app/homepage/MainHome";
import "@/lib/databaseConnector"
import styles from "./page.module.css"
import WhatAreWe from "@/app/homepage/whatAreWe";
import ImagesAndHome from "@/app/homepage/imagesAndHome";
export default function Home() {
  return (
      <div>
          <Navbar/>
          <ImagesAndHome/>
          {/*<Homepage/>*/}
          <WhatAreWe/>
      </div>
  );
}
