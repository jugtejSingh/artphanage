import Navbar from "@/app/homepage/Navbar";
import Homepage from "@/app/homepage/MainHome";
import "@/lib/databaseConnector"
export default function Home() {
  return (
      <div>
          <Navbar/>
          <Homepage/>
      </div>
  );
}
