import React from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { gStyle } from "../../globals/style";

interface CInputProps extends ViewProps {
    primaryBackground?: false
}

export class BigIcon extends React.Component<CInputProps, any> {
    iconStyle = StyleSheet.create({
        icon: {
            fontSize: 95,
        },
        box:{
            backgroundColor: this.props.primaryBackground ? gStyle.bgPrimary.backgroundColor : "",
            borderRadius: 200,
            shadowColor: "#00000",
            shadowOpacity: 0.5,
            shadowRadius: 30,
            padding:20,
            shadowOffset: {
                height: 20,
                width: 20
            }
        }
    });
    constructor(props: CInputProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={[this.props?.style, this.iconStyle.box]}>
                <Text style={this.iconStyle.icon}>{this.props.children}</Text>
            </View>
        );
    }
}