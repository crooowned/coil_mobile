import React from "react";
import { Button, StyleSheet, Text, TextInput, TextInputProps, TouchableHighlight, View } from "react-native";
import { gStyle } from "../../globals/style";

interface CInputProps extends TextInputProps {
    underlineColor? : string;
}
    

export class CInput extends React.Component<CInputProps, any> {
    style = StyleSheet.create({
        input:{
            width:"100%",
            borderBottomWidth:5,
            borderColor: this.props.underlineColor ?  this.props.underlineColor : gStyle.bgPrimary.backgroundColor,
            padding:10,
            marginVertical: 5,
            fontSize: 20,
            color: gStyle.bgPrimary.color
        }
    });

    constructor(props: CInputProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <TextInput {... this.props} placeholderTextColor={gStyle.bgPrimary.color} placeholder={this.props.placeholder?.toUpperCase()} style={[this.style.input, this.props.style]}></TextInput>
        );
    }
    
}