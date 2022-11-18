import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, DynamicColorIOS, FlatList, RefreshControl, Text, TouchableHighlight, TouchableNativeFeedback, TouchableNativeFeedbackBase, TouchableWithoutFeedback, View } from "react-native";
import { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/Ionicons";
import { UserContext } from "../../../../App";
import { Box } from "../../../components/layout/Box";
import { Container } from "../../../components/layout/Container";
import Drive from "../../../objs/impl/Drive";
import DriveService from "../../../services/DriveService";

export default function DriveList() {
    let account = useContext(UserContext);
    let [drives, setDrives] = useState<Drive[]>([]);
    let [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(account && loading){
            DriveService.getDrives(account.uid).then(drives => {
                setDrives(drives);
                setLoading(false);
            });
        }
    }, [loading]);

    const renderItem = ({ item }: any) => {
        let drive = item as Drive;
        return (
            <TouchableHighlight style={{flex:1,flexDirection:"row", flexWrap:"wrap"}}>
                <View style={{display:"flex",paddingHorizontal:20, paddingVertical:5, width:"100%"}}>
                    <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                        <Text style={{color:"white"}}><Icon name="flag-outline"></Icon>{drive.endLocation?.getDisplayName()}</Text>
                        <Text style={{color:"white"}}>{Number(drive.summary?.drivenKm).toFixed(0)} km</Text>
                    </View>
                    <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width: "100%"}}>
                        <Text style={{color:"white"}}><Icon name="pin"></Icon>{drive.startLocation?.getDisplayName()}</Text>
                        <Text style={{color:"white"}}>{drive.getDurationString()}</Text>
                    </View>
                    <View style={{width:"100%", height: 2, marginTop: 10, backgroundColor:"gray", alignSelf:"flex-end"}}></View>
                </View>
            </TouchableHighlight>
        );
    }

    return (
        <Container>
            <View style={{width:"100%", paddingTop: 5}}>
                {(drives.length > 0) ? 

                (<FlatList refreshControl={<RefreshControl onRefresh={()=>setLoading(true)} title="Aktualisiere" titleColor="white" refreshing={loading} />} renderItem={renderItem} data={drives} />) 
                : 
                (<ActivityIndicator style={{width: "100%"}}></ActivityIndicator>)}
            </View>
        </Container>
    );
}


