import React from "react";
import { Image, useWindowDimensions, View } from "react-native";

interface Waveprops{
    side: "top" | "bottom";
}

function Wave(props: Waveprops) {
  const { height, width } = useWindowDimensions();
  if(props.side === "top"){
    return (
        <View style={{position:"absolute", top:0, rotation: 0}}>
            <Image style={{left:0, top:-180, width:width, resizeMode: "contain"}} source={require('../../assets/wave_upper.png')}></Image>
        </View>
    );
  } else if(props.side === "bottom"){
    return (
        <View style={{position:"absolute", bottom:0, rotation: 0}}>
            <Image style={{left:0, bottom:-230, width:width, resizeMode: "contain"}} source={require('../../assets/wave.png')}></Image>
        </View>
    );
  }
  else return (<View></View>);
}

export default Wave;