import React, { createContext, useContext, useEffect, useState } from "react";
import { Container } from "../../components/layout/Container";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CoilTabBar from "../../components/layout/CoilTabBar";
import { Settings } from "./settings/Settings";
import { HomePage } from "./HomePage";
import { UserContext } from "../../../App";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import AccountDataService from "../../services/AccountDataService";
import { VehicleService } from "../../services/VehicleService";
import DriveList from "./drives/DriveList";
import ChargeList from "./charges/ChargeList";

const Tab = createBottomTabNavigator();

export function IndexPage({navigation}:any) {
    var user = useContext<FirebaseAuthTypes.User|null>(UserContext);
    
    // Navigate to SetupAccountPage if user has not setup account
    useEffect(()=>{
        if(user){
            AccountDataService.hasSetupAccount(user.uid).then(hasSetupAccount => { // Vorraussetzung eine RefreshId ist hinterlegt
                if(!hasSetupAccount){
                    navigation.navigate("SetupAccount");
                }
            });
            

            VehicleService.getSelectedVehicleId().then((vehicleId)=>{ // Fahrzeug ID setzen wenn keine vergeben
                if(!vehicleId){
                    VehicleService.getVehicles((vehicles)=>{
                        VehicleService.setSelectVehicleId(vehicles[0].id.toString());
                    });
                }
            });
        } 
    }, [user]);
    

    return (
        <Tab.Navigator tabBar={props => <CoilTabBar {...props} />} screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Drives" component={DriveList} />
            <Tab.Screen name="Charges" component={ChargeList} />
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarBadge: 3  }}/>{/*Todo*/}
        </Tab.Navigator>
    );
}

