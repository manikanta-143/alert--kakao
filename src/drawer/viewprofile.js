import { createStackNavigator, DrawerActions } from 'react-navigation';
import ViewProfile from '../views/ViewProfile';
const ViewProfileDrawerItem = createStackNavigator({
  ViewProfile: {
    screen: ViewProfile,
    path: '/viewprofile',
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },

});
ViewProfileDrawerItem.navigationOptions = {
  drawerLabel: () => null
}

export default ViewProfileDrawerItem;