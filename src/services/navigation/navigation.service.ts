import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';

type RouteParams<T extends keyof RootStackParamList> = RootStackParamList[T];

type ResetParams<T extends keyof RootStackParamList> = {
  index: number;
  routes: {name: keyof RootStackParamList; params?: RouteParams<T>}[];
};
class NavigationService {
  private static navigationRef: React.RefObject<
    NavigationContainerRef<RootStackParamList>
  >;

  static initialize(
    ref: React.RefObject<NavigationContainerRef<RootStackParamList>>,
  ) {
    NavigationService.navigationRef = ref;
  }

  static navigate<T extends keyof RootStackParamList>(
    routeName: keyof RootStackParamList,
    params?: RouteParams<T>,
  ) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      // @ts-ignore
      NavigationService.navigationRef.current.navigate(routeName, params);
    }
  }

  static push<T extends keyof RootStackParamList>(
    routeName: keyof RootStackParamList,
    params?: RouteParams<T>,
  ) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(
        StackActions.push(routeName, params),
      );
    }
  }

  static replace(routeName: string, params?: object) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(
        StackActions.replace(routeName, params),
      );
    }
  }

  static goBack() {
    NavigationService.navigationRef.current?.dispatch(CommonActions.goBack());
  }

  static pop() {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(StackActions.pop());
    }
  }

  static canGoBack() {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      const navigation = NavigationService.navigationRef.current;
      const canGoBack = navigation.canGoBack();
      return canGoBack;
    }

    return false;
  }

  static reset<T extends keyof RootStackParamList>(params: ResetParams<T>) {
    const {index, routes} = params;
    NavigationService.navigationRef.current?.dispatch(
      CommonActions.reset({index, routes}),
    );
  }
}

export default NavigationService;
