import React,{Component} from 'react';
 
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
 
class MenuItems extends Component {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
          
        >
          <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
          <MenuDivider />

          <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
          <MenuDivider />

          <MenuItem onPress={this.hideMenu}>Menu item 3</MenuItem>
          <MenuDivider />
          <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
        </Menu>
      </View>
    );
  }
}
 
export default MenuItems;