import {useFormState} from "react-dom";
import {addData} from "@/app/dashboard/serverActions";
import styles from "@/app/dashboard/cssfiles/addProducts.module.css";
import {Barlow} from "next/font/google";
import {useActionState} from "react";

const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'] })
export default function AddProducts(){
    const array = []
    function handleOnChange(values){
        if (values.target.files.length > 4) {
            alert("Length Exceeded");
            values.target.value = "";
            return false
        } else{
            for (let i = 0; i < values.target.files.length; i++){
                array.push(values.target.files[i]);
            }
            return array
            }


    }
    const [state,formAction,isPending] = useActionState(addData,null);
    return(
        <div>
            <h2 className={`${styles.addProductsTitle} ${barlow500.className}`}>Add Products</h2>
            <form action={formAction}>
                <div className={styles.flexForAllItems}>

                    <div className={styles.flexForItems}>
                        <div className={styles.labels}>
                            <label htmlFor="nameOfArt" className={barlow400.className}>Name of Item</label>
                            <input type="text" name="nameOfArt" className={styles.nameOfArt}/>
                        </div>
                        <div className={styles.labels}>
                            <label htmlFor="location" className={barlow400.className}>Location, Please write
                                City,Country</label>
                            <input type="text" name="location" className={`${styles.location} ${barlow400.className}`}/>
                        </div>

                    </div>

                    <div className={styles.flexForItems}>
                        <div className={styles.labels}>
                            <label htmlFor="price" className={barlow400.className}>Price in USD</label>
                            <input type="text" name="price"
                                   className={`${styles.price} ${barlow400.className}`}/>
                        </div>
                    <div className={styles.labels}>
                        <label htmlFor="dimension" className={barlow400.className}>Size of the Item, Write in Width, Length and Height</label>
                        <input type="text" name="dimension"
                               className={`${styles.dimension} ${barlow400.className}`}/>
                    </div>
                </div>
                    <div className={styles.flexForItems}>
                        <div className={styles.labels}>
                            <label htmlFor="nameOfArtist" className={barlow400.className}>Name of Artist</label>
                            <input type="text" name="nameOfArtist" className={`${styles.nameOfArtist} ${barlow400.className}`}/>
                        </div>
                        <div className={styles.labelsForRadio}>
                            <label htmlFor="frame" className={`${styles.radio} ${barlow400.className}`}>Does it have a
                                frame</label>
                            <div className={styles.radio2}>
                                <label htmlFor="frame" className={barlow400.className}>Yes</label>
                                <input type="radio" name="frame"
                                       value="yes" className={`${barlow400.className}`}/>
                                <label htmlFor="frame" className={barlow400.className}>No</label>
                                <input type="radio" name="frame"
                                       value="no" className={`$${barlow400.className}`}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.flexForItems2}>
                        <div className={styles.labels}>
                            <label htmlFor="images" className={` ${styles.imagesLabel} ${barlow400.className}`}>Images, Do not add more than 4
                                images</label>
                            <input type="file" name="images" multiple className={`${styles.images} ${barlow400.className}`}
                                   onChange={(e) => {
                                       handleOnChange(e)
                                   }}/>
                        </div>
                        <div className={styles.labels}>
                            <label htmlFor="description" className={`${barlow400.className}`}>Description</label>
                            <textarea rows={4} name="description"
                                      className={`${styles.description} ${barlow400.className}`}/>
                    </div>
                </div>
                </div>
                    <button type="submit" className={`${styles.submit}  ${barlow400.className}`}>Submit</button>
                {isPending && <h3>Please Wait.....</h3>}
            </form>
        </div>
);
}