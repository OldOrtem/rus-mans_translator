import { observer } from "mobx-react-lite";
import LangButt from "./LangButt";
import langStore from "../store/langStore";
import styles from "./styles/translator.module.scss"
import { useEffect, useState } from "react";

const Translator = observer(() => {
    const [input, setInput] = useState<string>("");

    useEffect(()=>{
        console.log(input);
    }, [input])


    return(
        <div className={styles.translator}>
            <div className={styles.switcher}>
                <div className={styles.switcher__lang}>{langStore.fromLang}</div>
                <LangButt/>
                <div className={styles.switcher__lang}>{langStore.toLang}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.field}>
                    <hr className={styles.field__hr}/>
                    <div className={styles.field__wrapper} style={{marginLeft:"auto"}}>
                        <input
                            value={input}
                            className={styles.field__text} 
                            contentEditable={true} 
                            onChange={e => setInput(e.currentTarget.value || "")}
                        />
                        <div className={styles.field__tools} >

                        </div>
                    </div>
                </div>
                <div className={styles.field}>
                    <hr className={styles.field__hr} />
                    <div className={styles.field__wrapper} style={{marginRight:"auto"}}>
                        <div className={styles.field__text}>

                        </div>
                        <div className={styles.field__tools} >

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Translator;