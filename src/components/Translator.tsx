import { observer } from "mobx-react-lite";
import LangButt from "./LangButt";
import langStore from "../store/langStore";
import styles from "./styles/translator.module.scss"
import { useEffect, useRef, useState } from "react";
import translateService from "../service/translateService";
import Loader from "./Loader";
import CopyButt from "./CopyButt";
import Keyboard from "./Keyboard";

const Translator = observer(() => {
    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const maxLength = 5000; 
    const inputAreaRef = useRef<HTMLTextAreaElement>(null);
    const outputAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        fixHeights();
    }, [input, output])

    useEffect(()=>{
        const translate = async () => {
            setLoading(true);
            const lang = langStore.fromLang;
            const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
            await sleep(1000);
            const result = await translateService.translate(input, lang);
            setOutput(result);
            setLoading(false);
        }
        if(input && input.length){
            translate();
        }
        else{
            setOutput("")
        }
        
    }, [input, langStore.fromLang])

    


    const fixHeights = () => {
        if (inputAreaRef.current && outputAreaRef.current) {
            inputAreaRef.current.style.height = 'auto'; 
            outputAreaRef.current.style.height = 'auto'; 
            const height = Math.max(inputAreaRef.current.scrollHeight, outputAreaRef.current.scrollHeight)
            inputAreaRef.current.style.height = `${height}px`; 
            outputAreaRef.current.style.height = `${height}px`;
        }
    }

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
                        <textarea
                            placeholder="Введите текст для перевода..."
                            value={input}
                            ref={inputAreaRef}
                            className={styles.field__text}
                            maxLength={maxLength}
                            onChange={e => setInput(e.currentTarget.value || "")}
                        >
                           
                        </textarea>
                        <div className={styles.field__tools} >
                            <div>{input.length}/{maxLength}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.field}>
                    <hr className={styles.field__hr} />
                    <div className={styles.field__wrapper} style={{marginRight:"auto"}}>
                        <textarea
                            value={output}
                            ref={outputAreaRef}
                            className={`${styles.field__text} ${styles.field__text_readOnly}`}
                            
                            readOnly
                        >
                        </textarea>
                        {loading && <Loader/>}
                        <div className={styles.field__tools} >
                            <CopyButt targetRef={outputAreaRef}/>
                        </div>
                    </div>
                </div>
            </div>
            <Keyboard callBack={(inp:string)=>{setInput(input + inp)}}/>
        </div>
    );
});

export default Translator;