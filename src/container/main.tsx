import React from "react";
import css from './main.scss';
import bootstrap from 'resources/bootstrap-5.0.0-beta2-dist/css/bootstrap.css'
import UserBoard from "src/user_board/main";
import GeneralBoard from "src/general_board/main";
import Landing from "src/landing/main"
import logo from 'resources/narwallets.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    HashRouter,
    useHistory
  } from "react-router-dom";


export default class Container extends React.Component{

    state ={
        pageName: "",
        connected: false,
        walletId: ""
    }   
    render(){
        return(<>
            <HashRouter>
                <header className={css.header}>
                    <img src={logo}></img>
                    <p className={css.title}>Hackaton Denver 2021 - Near StableCoin</p> 
                    <label className={css.menuItem}>{this.state.connected ? this.state.walletId : "Not Connected"}</label> 
                </header>
                <div className={[bootstrap["container"], css.container].join(" ")}>
                    <Switch>
                        <Route path="/landing">
                            <Landing/>
                        </Route>
                        <Route path="/general_board">
                            <GeneralBoard/>
                        </Route>
                        <Route path="/user_board">
                            <UserBoard/>
                        </Route>
                    </Switch>
                        
                </div>
            </HashRouter>
        </>)
    }


}
