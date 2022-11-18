import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { IDrive } from "../objs/interfaces/IDrive";
import { Box } from "./layout/Box";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from 'd3-shape';
import { Card, CardBody } from "./layout/Card";
import { NavigationContext } from "../pages/home/HomePage";
import Drive from "../objs/impl/Drive";
import { IFrame } from "../objs/interfaces/IFrame";
import FrameService from "../services/FrameService";
import { UserContext } from "../../App";

interface DriveInfoProps extends ViewProps{
    drive? : Drive
}

export default function DriveInfoCard(props: DriveInfoProps){
    const styles = StyleSheet.create({
        label: {
            fontSize: 17,
            
            
        },
        icon: {
            fontSize: 19
        }
    });
    const user = useContext(UserContext);
    const [yarray, setYArray] = useState<number[]>([]);
    const [xarray, setXArray] = useState<number[]>([]);
    const navigation = useContext<any>(NavigationContext);
    const [frames, setFrames] = useState<IFrame[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(user && props.drive?.id)
            FrameService.getFrames(user?.uid, props.drive?.id)
                .then((frames)=>{
                    setFrames(frames);
                    setYArray(frames.map(frame=>frame.power));
                    setXArray(frames.map(frame=>frame.timestamp));
                }).finally(()=>setLoading(false));
    },[user, props.drive?.id, setFrames, setLoading]);
    Icon2.loadFont();
    return (
        (!loading?(<Card>
            <CardBody>
                <Box noPadding>
                    <Box noPadding col={7}><Text numberOfLines={1} style={styles.label}><Icon style={styles.icon} name="pin"/> {props.drive?.startLocation.getDisplayName()} </Text></Box>
                    <Box noPadding col={5}>
                        <Text style={styles.label}>{props.drive?.getStartTime()} <Icon name="arrow-forward-outline" style={styles.icon}/> {props.drive?.getEndTime()}</Text>
                    </Box>
                    <Box noPadding col={9}><Text style={styles.label}><Icon style={styles.icon} name="flag"/> {props.drive?.endLocation?.getDisplayName()} </Text></Box>
                    <Box noPadding col={3}></Box>
                </Box>
                <Box noPadding>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="hourglass"/> {props.drive?.getDurationString()}</Text>
                    </Box>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="navigate"/> {Number(props.drive?.summary?.drivenKm).toFixed(2)} km</Text>
                    </Box>
                </Box>
                <Box noPadding>
                    <Box noPadding col={6}><Text style={styles.label}><Icon style={styles.icon} name="battery-half-sharp"/> {props.drive?.summary?.usedBatteryLevel}%</Text></Box>
                    <Box noPadding col={6}><Text style={styles.label}><Icon style={styles.icon} name="pulse"/> 10kw/h</Text></Box>
                </Box>
                <Box noPadding>
                    {(props.drive?.summary?.drivenKm)?(
                        <>
                            <Box noPadding col={6}>
                                <Text style={styles.label}><Icon style={styles.icon} name="leaf-outline" /> {props.drive?.getAverageCo2()} Co2</Text>
                            </Box>
                            <Box noPadding col={6}>
                                    <Text style={styles.label}><Icon2 style={styles.icon} name="gas-station" /> {props.drive?.getAverageLiters()} l</Text>
                            </Box>
                        </>
                    ):(<></>)}
                    
                    <Box noPadding col={12}>
                        <TouchableWithoutFeedback style={{width: "100%"}} onPress={()=>{navigation?.navigate('DriveDetails', {drive: props.drive});}}>
                            <Icon size={35} style={{textAlign:"right", width:"100%"}} name="arrow-forward-outline"/>
                        </TouchableWithoutFeedback>
                    </Box>
                </Box>
            </CardBody>
            <AreaChart 
                style={{position:"absolute",height: 150, top:10, width: "100%", left:0, zIndex: -1}} 
                data={yarray}
                xAccessor={({index})=>xarray[index]}
                contentInset={{ top: 0, bottom: 0 }}
                yMax={320}
                curve={shape.curveNatural}
                svg={{ fill: '#B4F84F', stroke: "#B4F84F", strokeWidth: 2, fillOpacity: 0.3  }}/>
            
        </Card>):(<ActivityIndicator></ActivityIndicator>))
        
    );
}
