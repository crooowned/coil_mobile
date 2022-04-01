import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { gStyle } from "../../globals/style";

export default function CoilTabBar({ state, descriptors, navigation } :any) {
  return (
    <View style={{ flexDirection: 'row', display:"flex", justifyContent:"space-evenly", minHeight:90, backgroundColor: gStyle.container.backgroundColor, borderTopWidth: 2, borderColor:"black" }}>
      {state.routes.map((route:any, index:any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        var iconName = "flask-outline";
        switch(route.name){
            case "Home":
              iconName = "bar-chart-outline";
              break;
            case "Settings":
              iconName = "settings-outline";
              break;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };
        
        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        Icon.loadFont();
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ padding:20 }}
            key={index}
          >
            {/*<Text style={{ fontSize: 20, color: isFocused ? gStyle.bgSecondary.backgroundColor : 'white' }}></Text>*/}
            <Icon style={{fontSize:25, color: isFocused ? gStyle.bgSecondary.backgroundColor : 'white'}} name={iconName}></Icon>
            <View style={{borderBottomColor: isFocused ? gStyle.bgSecondary.backgroundColor : 'white',borderBottomWidth: 2, marginTop: 5}}/>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}