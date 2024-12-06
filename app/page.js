import styles from '@/app/page.module.css';
import Navbar from "@/app/homepage/Navbar";
import Homepage from "@/app/homepage/MainHome";
import "@/lib/databaseConnector"
import WhatAreWe from "@/app/homepage/whatAreWe";
export default function Home() {
  return (
      <div>
        <Navbar />
        <Homepage />
        <WhatAreWe/>
      </div>
  );
}
