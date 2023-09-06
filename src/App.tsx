import {Provider} from 'react-redux';
import {persistor, store} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './utils/toast';
import RootNavigator from './navigation';
import {View} from 'react-native';
import {PopUpModal} from './components';
import NotificationProvider from './services/notification/NotificationProvider';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NotificationProvider>
            <RootNavigator />
            <Toast position="top" config={toastConfig} />
            <PopUpModal />
          </NotificationProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
