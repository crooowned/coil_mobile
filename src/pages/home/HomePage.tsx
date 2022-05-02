import React, { createContext, useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Box } from "../../components/layout/Box";
import { Container } from "../../components/layout/Container";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "react-native-swiper";
import DriveInfoCard from "../../components/DriveInfoCard";
import { VehicleService } from "../../services/VehicleService";
import { IDrive } from "../../objs/interfaces/IDrive";
import ToolBoxItem from "../../components/ToolBoxItem";
import IToolBox from "../../objs/interfaces/IToolBox";
import { UserContext } from "../../../App";
import { ICar } from "../../objs/interfaces/ICar";
import VehicleSwitcher from "../../components/internal/VehicleSwitcher";
import { ProgressCircle } from "react-native-svg-charts";


export const NavigationContext = createContext(null);

export function HomePage({navigation}:any){
    const user = useContext(UserContext);
    const [drives, setDrives] = useState<IDrive[]>([]);
    const [tools, setTools] = useState<IToolBox[]>([]);
    const [vehicle, setVehicle] = useState<ICar>();
    
    useEffect(()=>{
        VehicleService.getSelectedVehicleId().then(vid=>{
            if(vid)
                VehicleService.getVehicleById(vid, (veh)=>{
                    if(veh)
                        setVehicle(veh);
                })
        });
    }, [setVehicle]);

    Icon.loadFont();
    return (
        <NavigationContext.Provider value={navigation}>
            <Container>
                <Box>
                    <Box col={12} noPadding>
                        <VehicleSwitcher/>
                    </Box>
                    <Box col={4} noPadding>
                        <Text style={{color:"gray", fontSize: 15, width:"100%"}}>{vehicle?.vehicle_config.car_type + " " + vehicle?.vehicle_config.efficiency_package}</Text>
                    </Box>
                    <Box>
                        
                        <ProgressCircle style={{width:100, height: 100}} backgroundColor={"white"} progressColor={"green"} progress={vehicle?.charge_state.usable_battery_level? vehicle?.charge_state.usable_battery_level/100:0}/>
                        {/* Statistik kp */}
                    </Box>
                </Box>
                <Box>
                    <Box col={12} noPadding>
                        <Text style={{color:"white", fontSize: 25, width:"100%"}}>Letzte Fahrten</Text>
                    </Box>
                    <Box col={12} style={{paddingTop:20, paddingHorizontal:0}}>
                        <Swiper loop={false}  showsPagination={false} style={{height:175}} horizontal={true}>
                        {drives.map((drive, i) => {   
                            return (<DriveInfoCard drive={drive} key={i}/>) 
                        })}
                        </Swiper>
                    </Box>
                </Box>
                <Box>
                    <Box col={12} noPadding>
                        <Text style={{color:"white", fontSize: 25, width: "100%"}}>Toolbox</Text>
                    </Box>
                    <Box col={12} style={{paddingTop:20, paddingHorizontal:0}}>
                        <Swiper loop={false} showsPagination={false} style={{height:150}} horizontal={true}>
                                
                            <Box noPadding>
                                <Box noPadding style={{justifyContent: "center", alignContent: "center"}} col={6}>
                                    <ToolBoxItem toolbox={{bgColor:"#DC6BAD", icon:"eye-outline", toolBoxName: "Charging Sentry"}} />
                                </Box>
                                <Box noPadding style={{justifyContent: "center", alignContent: "center"}} col={6}>
                                    <ToolBoxItem toolbox={{bgColor:"#B4F84F", icon:"battery-charging-outline", toolBoxName: "Smart Charging"}} />
                                </Box>
                            </Box>
                            <Box noPadding>
                                <Box noPadding style={{justifyContent: "center", alignContent: "center"}} col={6}>
                                    <ToolBoxItem toolbox={{bgColor:"#9DEAFB", icon:"people-circle-outline", toolBoxName: "Driver Profiles"}} />
                                </Box>
                                <Box noPadding style={{justifyContent: "center", alignContent: "center"}} col={6}>
                                    <ToolBoxItem toolbox={{bgColor:"#A9EFCD", icon:"navigate-outline", toolBoxName: "Automatic Battery Heating"}} />
                                </Box>
                            </Box>
                        </Swiper>
                    </Box>
                </Box>
            </Container>
        </NavigationContext.Provider>
    );
}

