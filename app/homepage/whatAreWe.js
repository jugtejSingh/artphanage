import styles from "./cssfiles/whatarewe.module.css";

export default function WhatAreWe(){
    return(
      <div>
        <h1 className={styles.title}>What are we?</h1>
          <p> Artphanage is a place for the world to come and discover art. Here you can find art made by children that
          live in orphanages around the world that would love for you to purchase their creative item</p>
      </div>
    );
}