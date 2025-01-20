"use client"
import styles from "./cssfiles/cards.module.css"
import Image from 'next/image'
import Link from "next/link";
import {Barlow} from "next/font/google";
import {Masonry} from "react-plock";
import {useEffect, useState} from "react";

const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'], display: 'swap' })

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
                                                                 alt={"Image"} className={styles.image} /></Link>)}>
                </Masonry>
            </div>
        );
    }
}