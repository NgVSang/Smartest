import {Provider} from 'react-redux';
import {persistor, store} from './redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {toastConfig} from './utils/toast';
import RootNavigator from './navigation';
import {View} from 'react-native';
import {PopUpModal} from './components';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <View style={{flex: 1}}>
            <RootNavigator />
            <Toast position="top" config={toastConfig} />
            <PopUpModal />
          </View>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
