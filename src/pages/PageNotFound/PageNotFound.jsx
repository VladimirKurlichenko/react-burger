import style from './PageNotFound.module.css';

export default function PageNotFound() {

    return (
        <>
        <div className={`text text_type_main-large ${style.main}`}>
            <h1 className={`text text_type_main-large`}> 404 </h1>
            <br/>
            <p className={`text text_type_main-large`}>Запрашиваемая вами страница не существует</p>
        </div>
            
        </>
    )
}