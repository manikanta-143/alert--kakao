import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation' 
import Login1 from './login1';
import Login2 from './login2';
import MasterDrawer from './MasterDrawer';
import UserDrawer from './UserDrawer';

const LoginScreens  = createStackNavigator({
  Login1: Login1,
  signin: Login2
},
{
  headerMode: 'none'
})
const Switches = createAppContainer(createSwitchNavigator(
  {
    Login:{
      screen : LoginScreens,
    },
    MasterDrawer:{
      screen: MasterDrawer
    },
    UserDrawer: {
      screen: UserDrawer
    }
  },
  {
    initialRouteName: 'Login',
    resetOnBlur: true,
    backBehavior: 'initialRoute'
  }
));

export default Switches;

