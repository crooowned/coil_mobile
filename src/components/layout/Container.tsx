import React, { FC } from "react";
import { Image, StyleSheet, TouchableHighlight, useWindowDimensions, View, ViewProps } from "react-native";
import { gStyle } from "../../globals/style";
import { Box } from "./Box";

interface ContainerProps extends ViewProps {
    /** Alignment */
    alignment?: "center" | "space-between" | "space-around" | "space-evenly" | "bottom";
    art?: "layered-waves" | "stacked-waves" | "blob-scene";
    backNavigator?: any;
}
export const Container : FC<ContainerProps> = (props: ContainerProps)=> {
    let alignStyle = {};
    switch(props.alignment) {
        case "center":
            alignStyle = {justifyContent:"center", alignItems:"center"};
            break;
        case "bottom":
            alignStyle = {justifyContent:"flex-end"};
            break;
        case "space-around":
            alignStyle = {justifyContent:"space-around"};
            break;
        case "space-evenly":
            alignStyle = {justifyContent:"space-evenly"};
            break;
        case "space-between":
            alignStyle = {justifyContent:"space-between"};
            break;
        default:
            alignStyle = {};
    }
    const {width, height} = useWindowDimensions();
    return (
    <View {... props} style={[gStyle.container, alignStyle, props.style]} >
        { props.backNavigator ? (
            <Box >
                <TouchableHighlight onPress={()=>{props.backNavigator.goBack()}} style={{width:50, height:50, position:"relative"}}>
                    <Image style={{width:50, height:50}} source={require('../../assets/back.png')}/>
                </TouchableHighlight>
            </Box>
        ) : null}
        
        {props.children}
        
        { props.art ? (
            <View style={{position:"absolute", bottom:0}}>
                <Image style={{minHeight:height+120, resizeMode:"contain"}} source={
                    props.art === "layered-waves" ? require('../../assets/layered-waves-haikei.png') :
                    props.art === "stacked-waves" ? require('../../assets/stacked-waves-haikei.png') :
                    props.art === "blob-scene" ? require('../../assets/blob-scene-haikei.png') :
                    undefined
                }></Image>
            </View>
        ) : null }
    </View>
    );
}