/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CalculatorMain from './src/screens/CalculatorMain';
import Calculator from './src/screens/Calculator';

AppRegistry.registerComponent(appName, () =>  Calculator);
