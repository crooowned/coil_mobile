import React, { useEffect, useState } from "react";
import { Text, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ICar } from "../../objs/interfaces/ICar";
import { VehicleService } from "../../services/VehicleService";
interface SwitcherProps extends ViewProps{
    vehicle: ICar;
}
export default function VehicleSwitcher(switcherProps: SwitcherProps){
    const [vehicles, setVehicles] = React.useState<ICar[]>();
    
    useEffect(()=>{
        VehicleService.getVehicles((vhs: ICar[])=>{
            setVehicles(vhs);
        });
    }, [setVehicles]);
    return(
        <><Text style={{ color: "white", fontSize: 25, width: "100%" }}>
            {switcherProps.vehicle?.display_name}
            <Icon style={{ fontSize: 25, textAlign: "right", paddingVertical: 25 }} name="chevron-down-outline" />
        </Text></>
    );
}

