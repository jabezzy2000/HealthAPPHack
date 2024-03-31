// navigationTypes.ts or wherever you prefer to define your types
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  AuthScreen: undefined;
  TabLayout: undefined;
  // Define other routes here
};

export type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AuthScreen'>;
export type AuthScreenRouteProp = RouteProp<RootStackParamList, 'AuthScreen'>;
