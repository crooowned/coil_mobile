import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ICar } from "../../objs/interfaces/ICar";
import { VehicleService } from "../../services/VehicleService";

export default function VehicleSwitcher(){
    const [vehicle, setVehicle] = React.useState<ICar>();
    const [vehicles, setVehicles] = React.useState<ICar[]>();
    
    useEffect(()=>{
        console.log("effect")
        VehicleService.getSelectedVehicleId().then(vid=>{
            VehicleService.getVehicles((vhs: ICar[])=>{
                setVehicles(vhs);
            });
            if(vid)
                VehicleService.getVehicleById(vid, (vh: ICar)=>{
                    setVehicle(vh);
                });
        });
    }, [setVehicles, setVehicle]);
    return(
        <><Text style={{ color: "white", fontSize: 25, width: "100%" }}>
            {vehicle?.display_name}
            <Icon style={{ fontSize: 25, textAlign: "right", paddingVertical: 25 }} name="chevron-down-outline" />
        </Text></>
    );
}

