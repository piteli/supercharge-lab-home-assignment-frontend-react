import { inject, observer } from 'mobx-react';
import './App.css';
import { LoadingSpinnerComponent } from './components/loading-spinner/LoadingSpinner';
import Login from './views/login/Login';

function App({toastStore}: any) {
  
  return (
    <div>
      <Login />
      {/* <LoadingSpinnerComponent /> */}
        {/* {
            toastStore.isToastVisible ?
              <LoadingSpinnerComponent /> : null
        } */}
    </div>
  );
}

export default inject('toastStore')(observer(App));
