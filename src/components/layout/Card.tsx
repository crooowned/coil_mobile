import React from "react";
import { View, ViewProps } from "react-native";

export function Card(props: ViewProps){
    return (
    <View {...props} style={[{flex:1, backgroundColor:"white", borderRadius: 20, marginHorizontal: 10}, props.style]}>
        {props.children}
    </View>
    )
}

export function CardBody(props:any){
    return (<View {...props} style={{padding: 20}}>
        {props.children}
    </View>);
}