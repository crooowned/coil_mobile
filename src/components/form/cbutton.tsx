import React from "react";
import { Button, StyleSheet, Text, TouchableHighlight, TouchableHighlightProps, View } from "react-native";
import { gStyle } from "../../globals/style";
import Wave from "../decoration/Wave";

interface CButtonProps extends TouchableHighlightProps{
    background?: string;
    outline? : string;
    title: string;
    textColor?: string;
    onClick?: () => void;
}

export class CButton extends React.Component<CButtonProps, any> {
    style = StyleSheet.create({
        buttonFrame: {
            width: "100%",
            padding: 7,
            borderRadius: 10,
            marginVertical: 5,
        },
        buttonFramePressed: {
            width: "100%",
            borderColor: this.props.outline,
            borderWidth: this.props.outline ? 2 : 0,
            padding: 7,
            borderRadius: 10,
            marginVertical: 5
        }
    });

    constructor(props: CButtonProps) {
        super(props);
        this.state = {pressStatus: false};
    }

    render(): React.ReactNode {
        return (
            <TouchableHighlight 
            {...this.props}
            onPress={()=>{this.props.onClick?.()}}
            onHideUnderlay={this._onHideUnderlay.bind(this)}
            onShowUnderlay={this._onShowUnderlay.bind(this)} 
            underlayColor={this.props.outline? this.props.outline : gStyle.bgPrimary.backgroundColor}
            style={[
                this.state.pressStatus ? this.style.buttonFramePressed : this.style.buttonFrame, 
                {   
                    backgroundColor: this.props.background, 
                    borderColor: this.props.outline,
                    borderWidth: this.props.outline ? 4 : 0,
                },
                this.props.style
                
                ]}>
                <Text style={{fontWeight: "500", color: this.props.textColor, textAlign: "center", fontSize: 25, padding:5}}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }

    _onHideUnderlay() {
        this.setState({ pressStatus: false });
    }
    _onShowUnderlay() {
        this.setState({ pressStatus: true });
    }
    
}