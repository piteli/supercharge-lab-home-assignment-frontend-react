import React from 'react';
import { HEADLINE_LOGIN } from './Login.constant';
import { AUTHENTICATION_TYPE, GENERAL_ERROR_MESSAGE, LOGIN_API, LOGIN_WRONG_INPUT_MESSAGE } from '../../utils/constants/api.constant';
import './Login.css';
import { loginObjectType } from './Login.model';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/LoadingSpinner';
import { hasErrorResponse } from '../../services/response.service';
import { observer, inject } from "mobx-react";
import ApiService from '../../services/api.service';
import StorageService from '../../services/storage.service';
import { USER_DETAILS } from '../../utils/constants/key-storage.constant';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../utils/constants/routes.constant';

function LoginView({toastStore}: any) {
    const defaultUserInput: loginObjectType = {username : '', password: ''};
    const [userInput, setUserInput] = React.useState(defaultUserInput);
    const [isLoadingShown, setLoadingVisiblity] = React.useState(false);
    const navigate = useNavigate();

    function loginClicked() {
        if(userInput.username === '' || userInput.password === '')
            return displayErrorInputMessage();
        setLoadingVisiblity(true);
        callLoginAPI();
    }

    function callLoginAPI() {
        new ApiService().post(LOGIN_API, userInput, AUTHENTICATION_TYPE.BASIC)
            .then((res) => res.json()).then((responseJSON) => {
                if(hasErrorResponse(responseJSON)) {
                    setLoadingVisiblity(false);
                    toastStore.setToastVisibility(true, GENERAL_ERROR_MESSAGE);
                    return;
                }
                new StorageService().setLocalStorage(responseJSON, USER_DETAILS);
                navigate(ROUTES.FRIENDS);
            }).catch((e) => {
                setLoadingVisiblity(false);
                toastStore.setToastVisibility(true, GENERAL_ERROR_MESSAGE);
            })
    }

    function displayErrorInputMessage(){
        toastStore.setToastVisibility(true, LOGIN_WRONG_INPUT_MESSAGE);
        return;
    }

    function saveInputChanged(value: string, key: string) {
        let obj: any = {};
        obj[key] = value;
        setUserInput({...userInput, ...obj});
    }
    
    return(
        <div className="container-login">
            <h1>{HEADLINE_LOGIN}</h1>
            <input onChange={(event) => saveInputChanged(event.target.value, 'username')} />
            <input onChange={(event) => saveInputChanged(event.target.value, 'password')} />
            <button onClick={loginClicked}>Login</button>

            <div className="overlay">
                {isLoadingShown ? 
                    <LoadingSpinnerComponent
                    {...{color: 'black', size: 100, message: 'Logging In...'}}
                    /> 
                : 
                    null}
            </div>
        </div>
    );
};

export default inject('toastStore')(observer(LoginView));