import React from "react";
import css from './main.scss';


export default class GeneralBoard extends React.Component{

    render(){
        return(<>
            <div className={[css.background].join(" ")}>
                <p className={css.title}>General Board</p>
            </div>
            <div className={css.container}>
                <label className={css.menuItem}>Item1</label> 
                <label className={css.menuItem}>Item2</label> 
            </div>

        </>)
    }
}