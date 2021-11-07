import { inject, observer } from 'mobx-react';
import './App.css';
import { LoadingSpinnerComponent } from './components/loading-spinner/LoadingSpinner';
import LoginView from './views/login/Login';
import RegisterView from './views/register/Register';
import FriendsView from './views/friends/Friends';
import ChatView from './views/chat/Chat';
import { Routes, Route } from "react-router-dom";
import { ROUTES } from './utils/constants/routes.constant';
import ToastComponent from './components/toast/Toast';

function App({toastStore}: any) {
  
  return (
    <div>
      {/* <LoginView /> */}
      {/* <LoadingSpinnerComponent /> */}
      <ToastComponent />
      {/* <RegisterView /> */}
      {/* <FriendsView /> */}
      {/* <ChatView /> */}
      <Routes>
        <Route path={ROUTES.REGISTER} element={<RegisterView />} />
        <Route path={ROUTES.LOGIN} element={<LoginView />} />
        <Route path={ROUTES.FRIENDS} element={<FriendsView />} />
        <Route path={ROUTES.CHAT} element={<ChatView /> } />
      </Routes>
        {
            toastStore.isToastVisible ?
              <LoadingSpinnerComponent /> : null
        }
    </div>
  );
}

export default inject('toastStore')(observer(App));
