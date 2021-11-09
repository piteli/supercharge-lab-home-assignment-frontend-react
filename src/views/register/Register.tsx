import React from 'react';
import './Register.css';
import { registerObjectType } from './Register.model';
import { observer, inject } from 'mobx-react';
import { AUTHENTICATION_TYPE, GENERAL_ERROR_MESSAGE, REGISTER_API, REGISTER_INVALID_INPUT_MESSAGE } from '../../utils/constants/api.constant';
import { HEADLINE_REGISTER, REGISTER_SPINNER_MESSAGE, REGISTER_SUCCESS_MESSAGE } from './Register.constant';
import ApiService from '../../services/api.service';
import { hasErrorResponse } from '../../services/response.service';
import { TOAST_BG_COLOR } from '../../utils/constants/component.constant';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/constants/routes.constant';

function RegisterView({toastStore, loadingSpinnerStore}: any) {

    const defaultUserInput: registerObjectType = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }
    const [userInput, setUserInput] = React.useState(defaultUserInput);
    const navigate = useNavigate();

    function registerClicked() {
        if(!areInputsValid())
            return displayErrorInputMessage();
            loadingSpinnerStore.SetLoadingVisibilityAndMessage(true, REGISTER_SPINNER_MESSAGE);
        callRegisterAPI();
    }

    function callRegisterAPI() {
        new ApiService().post(REGISTER_API, userInput, AUTHENTICATION_TYPE.BASIC)
            .then((res) => res.json()).then((responseJSON) => {
                if(hasErrorResponse(responseJSON)) {
                    loadingSpinnerStore.SetLoadingVisibilityAndMessage(false);
                    toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, GENERAL_ERROR_MESSAGE);
                    return;
                }
                toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, REGISTER_SUCCESS_MESSAGE);
                navigate(ROUTES.FRIENDS);
            }).catch((e) => {
                loadingSpinnerStore.SetLoadingVisibilityAndMessage(false);
                toastStore.setToastVisibilityColorAndMessage(true, TOAST_BG_COLOR.ERROR, GENERAL_ERROR_MESSAGE);
            })
    }

    function areInputsValid() {
        if(
            userInput.firstname === '' ||
            userInput.lastname === '' ||
            userInput.password === '' ||
            userInput.username === ''    
        ){
            return false;
        }

        return true;
    }

    function saveInputChanged(value: string, key: string) {
        let obj: any = {};
        obj[key] = value;
        setUserInput({...userInput, ...obj});
    }

    function displayErrorInputMessage(){
        toastStore.setToastVisibilityAndMessage(true, REGISTER_INVALID_INPUT_MESSAGE);
        return;
    }

    return(
        <div className="container-register">
            <h1>{HEADLINE_REGISTER}</h1>
            <input onChange={(event) => saveInputChanged(event.target.value, 'username')} />
            <input onChange={(event) => saveInputChanged(event.target.value, 'password')} />
            <button onClick={registerClicked}>Login</button>
        </div>
    );
}

export default inject('toastStore', 'loadingSpinnerStore')(observer(RegisterView));