"use client"
import styles from "./trashCan.module.css"
import {useRef} from "react";
export default function TrashCan(){
    const lid = useRef(null);
    function lidMover(){
        lid.current.style.transform = "rotate(30deg) translateX(10%) translateY(-10%)"
    }
    function lidMover2(){
        lid.current.style.transform = "none"
    }
    return(
        <div className={styles.trashCan} onMouseOver={lidMover} onMouseLeave={lidMover2}>
            <div className={styles.lidAndHandle} ref={lid}>
                <div className={styles.flex}>
                    <div className={styles.handleLeft}></div>
                    <div className={styles.handle}></div>
                    <div className={styles.handleRight}></div>
                </div>
                <div className={styles.lid}></div>
            </div>
            <div className={styles.fullShape}>
                <div className={styles.body}></div>
                <div className={styles.middleLine}></div>
                <div className={styles.middleLine2}></div>
                <div className={styles.middleLine3}></div>
            </div>
        </div>
    );
}
