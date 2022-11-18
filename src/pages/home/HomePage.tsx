import React, { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
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
import { gStyle } from "../../globals/style";
import DriveService from "../../services/DriveService";
import Drive from "../../objs/impl/Drive";


export const NavigationContext = createContext(null);

export function HomePage({navigation}:any){
    const user = useContext(UserContext);
    const [drives, setDrives] = useState<Drive[]>([]);
    const [tools, setTools] = useState<IToolBox[]>([]);
    const [vehicle, setVehicle] = useState<ICar>();
    
    useEffect(()=>{
        let mounted = true;
        if(mounted)
        VehicleService.getSelectedVehicleId().then(vid=>{
            if(vid && user){
                VehicleService.getVehicleById(vid, (veh)=>{
                    if(veh) setVehicle(veh);
                })
                DriveService.getDrives(user.uid).then(drives=>{
                    setDrives(drives.splice(0, 10));
                });
            }
        });
        return ()=>{mounted = false;}
    }, [setVehicle, setDrives]);

    Icon.loadFont();
    return (
        <NavigationContext.Provider value={navigation}>
            <Container>
                {(vehicle)?
                <Box>
                    <Box col={12} noPadding>
                        <VehicleSwitcher vehicle={vehicle}/>
                    </Box>
                    <Box col={12} noPadding>
                        <Text style={{color:"gray", fontSize: 15, width:"100%"}}>{vehicle.vin}</Text>
                        <Text style={{color:"gray", fontSize: 15, width: "100%"}}>
                            {Number(vehicle.vehicle_state.odometer*1.609344).toFixed(2) + "km"} 
                            <Text style={{color:"green", marginLeft: 20}}> {vehicle.charge_state?.usable_battery_level} %</Text>
                        </Text>
                        
                    </Box>
                    {/*<Box col={12} style={{justifyContent: "space-around"}}>
                        <Box col={6} style={{justifyContent:"center"}}>
                            <Text style={{fontSize:17,color:"white", width:"100%", textAlign:"center", marginBottom: 10}}>Batterie</Text>
                            <ProgressCircle style={{width:100, height: 100}} backgroundColor={"transparent"} progressColor={vehicle.charge_state.usable_battery_level > 80 || vehicle.charge_state.usable_battery_level < 20 ? "yellow": "green"} progress={vehicle.charge_state.usable_battery_level/100}/>
                        </Box>
                        <Box col={6} style={{justifyContent:"center"}}>
                            <Text style={{fontSize:17, color:"white", width:"100%", textAlign:"center", marginBottom:10}}>Fahrverhalten</Text>
                            <ProgressCircle strokeWidth={5} style={{width:"100%", height: 100}} backgroundColor={"transparent"} progressColor={"green"} progress={0.2}/>
                        </Box>
                         Statistik kp 
                    </Box>*/}
                </Box>
                :
                <Box style={{justifyContent:"center", paddingVertical: 50}}>   
                    <Text style={{fontSize:30, color:"white"}}>Warte auf Fahrzeugdaten...</Text>
                    <Text style={{fontSize:20, color:"gray"}}>Dies kann bis zu 24h dauern.</Text>
                    <ActivityIndicator style={{width:"100%", marginVertical: 20}}></ActivityIndicator>
                </Box>
                }
                
                <Box>
                    <Box col={12} noPadding>
                        <Text style={{color:"white", fontSize: 25, width:"100%"}}>Letzte Fahrten</Text>
                    </Box>
                    <Box col={12} style={{paddingTop:20, paddingHorizontal:0}}>
                        {drives.length > 0 ? 
                        <Swiper loop={false}  showsPagination={false} style={{height:175}} horizontal={true}>
                            {drives.map((drive, i) => {   
                                return (<DriveInfoCard drive={drive} key={i}/>) 
                            })}
                        </Swiper> 
                        : 
                    
                        <Text style={{color:"gray", height:150, textAlign:"center", width:"100%", fontSize: 20}}>Es wurden noch keine Fahrten aufgezeichnet.</Text>
                        }
                    </Box>
                </Box>
                <Box>
                    <Box col={12} noPadding>
                        <Text style={{color:"white", fontSize: 25, width: "100%"}}>Toolbox</Text>
                    </Box>
                    <Box col={12} style={{paddingTop:20, paddingHorizontal:0}}>
                        <Swiper dotColor="darkgray" loop={false} showsPagination={true} paginationStyle={{bottom: -20}} style={{height:150}} horizontal={true}>
                                
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

