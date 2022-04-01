import React, { FC } from "react";
import { View, ViewProps } from "react-native";
import { gStyle } from "../../globals/style";

interface BoxProps extends ViewProps {
    /** Num of Columns / 12 */
    col?: number;
    noPadding?: boolean
}

export const Box : FC<BoxProps> = (props: BoxProps)=> {
    const width = props.col ? ((props.col/12)*100)+"%" : "100%";
    const padding = props.noPadding ? 0 : gStyle.box.padding;
    return (
    <View {...props} style={[gStyle.box, {width:width, padding: padding}, props.style]}>
        {props.children}
    </View>
    );
}