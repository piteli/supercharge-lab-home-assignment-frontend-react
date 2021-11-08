import React from 'react';
import { HEADLINE_LOGIN, LOGIN_SPINNER_MESSAGE, LOGIN_SUCCESS_MESSAGE } from './Login.constant';
import { AUTHENTICATION_TYPE, GENERAL_ERROR_MESSAGE, LOGIN_API, LOGIN_WRONG_INPUT_MESSAGE } from '../../utils/constants/api.constant';
import './Login.css';
import { loginObjectType } from './Login.model';
import { hasErrorResponse } from '../../services/response.service';
import { observer, inject } from "mobx-react";
import ApiService from '../../services/api.service';
import StorageService from '../../services/storage.service';
import { USER_DETAILS } from '../../utils/constants/key-storage.constant';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../utils/constants/routes.constant';
import { TOAST_BG_COLOR } from '../../utils/constants/component.constant';

function LoginView({toastStore, loadingSpinnerStore}: any) {
    const defaultUserInput: loginObjectType = {username : '', password: ''};
    const [userInput, setUserInput] = React.useState(defaultUserInput);
    const navigate = useNavigate();

    function loginClicked() {
        // if(userInput.username === '' || userInput.password === '')
        //     return displayErrorInputMessage();
        loadingSpinnerStore.SetLoadingVisibilityAndMessage(true, LOGIN_SPINNER_MESSAGE);
        // callLoginAPI();
    }

    function callLoginAPI() {
        new ApiService().post(LOGIN_API, userInput, AUTHENTICATION_TYPE.BASIC)
            .then((res) => res.json()).then((responseJSON) => {
                if(hasErrorResponse(responseJSON)) {
                    loadingSpinnerStore.SetLoadingVisibilityAndMessage(false);
                    toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, GENERAL_ERROR_MESSAGE);
                    return;
                }
                new StorageService().setLocalStorage(responseJSON, USER_DETAILS);
                toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, LOGIN_SUCCESS_MESSAGE);
                navigate(ROUTES.FRIENDS);
            }).catch((e) => {
                loadingSpinnerStore.SetLoadingVisibilityAndMessage(false);
                toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, GENERAL_ERROR_MESSAGE);
            })
    }

    function displayErrorInputMessage(){
        toastStore.setToastVisibilityAndMessage(true, LOGIN_WRONG_INPUT_MESSAGE);
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
        </div>
    );
};

export default inject('toastStore', 'loadingSpinnerStore')(observer(LoginView));