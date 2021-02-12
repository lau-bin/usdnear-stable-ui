import React from 'react';
import css from './main.scss';

export default class UserBoard extends React.Component{

    render(){
        return(<>
            <div className={[css.background].join(" ")}>
                <p className={css.title}>User Board</p>
            </div>
            <div className={css.container}>
                <label className={css.menuItem}>Item3</label> 
                <label className={css.menuItem}>Item4</label> 
            </div>

        </>)
    }
}