import React, { useContext, useEffect } from "react";
import { Container } from "../../components/layout/Container";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoilTabBar from "../../components/layout/CoilTabBar";
import { Settings } from "./settings/Settings";
import { HomePage } from "./HomePage";
import { UserContext } from "../../../App";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import AccountDataService from "../../services/AccountDataService";

const Tab = createBottomTabNavigator();

export function IndexPage({navigation}:any) {
    var user = useContext<FirebaseAuthTypes.User|null>(UserContext);

    // Navigate to SetupAccountPage if user has not setup account
    if(user){
        AccountDataService.hasSetupAccount(user.uid).then(hasSetupAccount => {
            if(!hasSetupAccount){
                navigation.navigate("SetupAccount");
            }
        });
    }   

    return (
        <Tab.Navigator tabBar={props => <CoilTabBar {...props} />} screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarBadge: 3  }}/>{/*Todo*/}
        </Tab.Navigator>
    );
}

