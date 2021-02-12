import React from 'react';
import css from './main.scss';
import bootstrap from 'resources/bootstrap-5.0.0-beta2-dist/css/bootstrap.css'


export default class Landing extends React.Component{

    render(){
        return(<>
            <div className={[css.background].join(" ")}>
                <p className={css.welcome}>Welcome!</p>
                <p className={css.welcome}>Connect a wallet to start</p>
            </div>
        </>)
    }
}