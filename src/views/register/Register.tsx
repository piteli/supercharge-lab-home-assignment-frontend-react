import React from 'react';
import './Register.css';
import { registerObjectType } from './Register.model';
import { observer, inject } from 'mobx-react';
import { REGISTER_API } from '../../utils/constants/api.constant';

function RegisterView() {

    const defaultUserInput: registerObjectType = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    }
    const [userInput, setUserInput] = React.useState(defaultUserInput);
    const [isLoadingShown, setLoadingVisiblity] = React.useState(false);
    
    function registerClicked() {
        if(!areInputsValid())
            return displayErrorInputMessage();
        setLoadingVisiblity(true);
        callRegisterAPI();
    }

    function callRegisterAPI() {

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

    function displayErrorInputMessage(){
        //TO-DO: display error message to input
        return;
    }

    return(
        <div>
        </div>
    );
}

export default RegisterView;