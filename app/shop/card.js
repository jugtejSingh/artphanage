"use client"
import styles from "./cssfiles/cards.module.css"
import Image from 'next/image'
import Link from "next/link";
import {Masonry} from "react-plock";

export default function Cards({painting}){
    const items = [painting.map(function(item, index){return item})]
    if (items){
        return(
            <div className={styles.container}>
                <Masonry
                    items={items[0]}
                    config={{
                        columns:[1,2,3],
                        gap:[20,20,20],
                        media:[640, 768, 1024],
                    }}
                    render={(item, idx) => (
                        <Link href={`/shop/${item.slug}`}><Image key={idx} src={item.imageName[0]} width={1000}
                                                                 height={1000} style={{ width: '100%', height: 'auto' }}
                                                                 alt={"Image"} priority={true} className={styles.image} /></Link>)}>
                </Masonry>
            </div>
        );
    }
}