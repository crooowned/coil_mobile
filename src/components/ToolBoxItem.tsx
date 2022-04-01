import React, { useState } from "react";
import { StyleSheet, Switch, Text, View, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IToolBox from "../objs/interfaces/IToolBox";
import { Box } from "./layout/Box";

interface ToolBoxProps extends ViewProps{
    toolbox: IToolBox;
}
export default function ToolBoxItem(props: ToolBoxProps){

    const style = StyleSheet.create({
        labelDescription: {
            fontSize: 17,
            fontWeight: "500"
        }
    });
    const [state, setState] = useState(false);
    Icon.loadFont();
    return (
        <View style={{justifyContent: "space-between", flex:0, height: 150, width: 150, backgroundColor: props.toolbox.bgColor, borderRadius: 20, padding: 5}}>
            <Box style={{justifyContent: "space-between"}}>
                <Icon size={30} name={props.toolbox.icon}/>
                <Switch value={state} onValueChange={(state)=>setState(state)}/>
            </Box>
            <Box>
                <Text style={style.labelDescription}>{props.toolbox.toolBoxName}</Text>
            </Box>
        </View>
    );
}