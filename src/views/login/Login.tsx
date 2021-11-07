import React from 'react';
import { GENERAL_ERROR_MESSAGE, LOGIN_API } from './Login.constant';
import './Login.css';
import { loginObjectType } from './Login.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/LoadingSpinner';
import { hasErrorResponse } from '../../services/response.service';
import { observer, inject } from "mobx-react";

export default inject('toastStore')(observer(function Login({toastStore}: any) {
    
    const defaultUserInput: loginObjectType = {username : '', password: ''};
    const [userInput, setUserInput] = React.useState(defaultUserInput);
    const [isLoadingShown, setLoadingVisiblity] = React.useState(false);

    function loginClicked() {
        if(userInput.username === '' || userInput.password === '')
            return displayErrorInputMessage();
        setLoadingVisiblity(true);
        callLoginAPI();
    }

    async function callLoginAPI() {
        try {
            const response = await fetch(LOGIN_API);
            const json = await response.json();
            if(hasErrorResponse(json)) {
                setLoadingVisiblity(false);
                toastStore.setToastVisibility(true, GENERAL_ERROR_MESSAGE);
                return;
            }
            //TO:DO: save user session
            //TO:DO: redirect to dashboard / chat screen
        } catch(e) {
            setLoadingVisiblity(false);
            toastStore.setToastVisibility(true, GENERAL_ERROR_MESSAGE);
        }
    }

    function displayErrorInputMessage(){
        //TO-DO: display error message to input
        return;
    }

    function inputChanged(value: string, key: string) {
        let obj: any = {};
        obj[key] = value;
        setUserInput({...userInput, ...obj});
    }
    
    return(
        <div className="container-login">
            <h1>Login</h1>
            <input onChange={(event) => inputChanged(event.target.value, 'username')} />
            <input onChange={(event) => inputChanged(event.target.value, 'password')} />
            <button onClick={loginClicked}>Login</button>

            <div className="overlay">
                {isLoadingShown ? <LoadingSpinnerComponent /> : null}
            </div>
        </div>
    );
}));