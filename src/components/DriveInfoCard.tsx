import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { IDrive } from "../objs/interfaces/IDrive";
import { Box } from "./layout/Box";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from 'd3-shape';
import { Card, CardBody } from "./layout/Card";
import { NavigationContext } from "../pages/home/HomePage";

interface DriveInfoProps extends ViewProps{
    drive? : IDrive
}

export default function DriveInfoCard(props: DriveInfoProps){
    const styles = StyleSheet.create({
        label: {
            fontSize: 17
        },
        icon: {
            fontSize: 19
        }
    });

    const array = Array.from({length: (Math.random()+3)*20}, ()=>(Math.random()-0.4)*10);
    const navigation = useContext<any>(NavigationContext);
    return (
        <Card>
            <CardBody>
                <Box noPadding>
                    <Box noPadding col={7}><Text style={styles.label}><Icon style={styles.icon} name="pin"/> Mühlenstraße 17 </Text></Box>
                    <Box noPadding col={5}>
                        <Text style={styles.label}>14:25 <Icon name="arrow-forward-outline" style={styles.icon}/> 14:45</Text>
                    </Box>
                    <Box noPadding col={9}><Text style={styles.label}><Icon style={styles.icon} name="flag"/> Gut Insel 6 </Text></Box>
                    <Box noPadding col={3}></Box>
                </Box>
                <Box noPadding>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="hourglass"/> {props.drive?.duration} min</Text>
                    </Box>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="navigate"/> {props.drive?.distance} km</Text>
                    </Box>
                </Box>
                <Box noPadding>
                    <Box noPadding col={6}><Text style={styles.label}><Icon style={styles.icon} name="battery-half-sharp"/> -8%</Text></Box>
                    <Box noPadding col={6}><Text style={styles.label}><Icon style={styles.icon} name="pulse"/> 10kw/h</Text></Box>
                </Box>
                <Box noPadding>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="leaf-outline"/> 25kg Co2</Text>
                    </Box>
                    <Box noPadding col={6}>
                        <Text style={styles.label}><Icon style={styles.icon} name="leaf-outline"/> 7 l</Text>
                    </Box>
                    <Box noPadding col={12}>
                        <TouchableWithoutFeedback style={{width: "100%"}} onPress={()=>{navigation?.navigate('DriveDetails', {drive: props.drive});}}>
                            <Icon size={35} style={{textAlign:"right", width:"100%"}} name="arrow-forward-outline"/>
                        </TouchableWithoutFeedback>
                    </Box>
                </Box>
            </CardBody>
            <AreaChart 
                style={{position:"absolute",height: 150, top:10, width: "100%", left:0, zIndex: -1}} 
                data={array}
                contentInset={{ top: 0, bottom: 0 }}
                curve={shape.curveLinear}
                svg={{ fill: '#B4F84F', stroke: "#B4F84F", strokeWidth: 2, fillOpacity: 0.3  }}/> 
        </Card>
    );
}