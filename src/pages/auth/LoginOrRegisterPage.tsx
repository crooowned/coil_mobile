import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { CButton } from "../../components/form/cbutton";
import { Box } from "../../components/layout/Box";
import { Container } from "../../components/layout/Container";
import { gStyle } from "../../globals/style";

export function LoginOrRegisterPage({ navigation }: any) {
    return (
        <Container alignment="space-between" art="blob-scene">
            <Box>
                <Box style={{padding: 0,paddingTop:20, flexDirection: "row-reverse"}} col={12}>
                    <Image style={{width:60, height:60}} source={require('../../assets/logo.png')}/>
                </Box>
                <Box>
                    <Text style={{fontSize:80, color:"white", fontWeight: "500"}}>Coil.</Text>
                    <Text style={{fontSize:20, color:"white"}}>Deine e-Auto Übersicht.</Text>
                </Box>
            </Box>
            <Box style={{marginBottom:25}} col={12}>
                <CButton onClick={()=>{navigation.navigate('Register')}} textColor={gStyle.bgPrimary.color} background={gStyle.bgPrimary.backgroundColor} title="Registrieren"></CButton>
                <CButton onClick={()=>{navigation.navigate('Login')}} textColor={gStyle.bgPrimary.color} outline={gStyle.bgSecondary.backgroundColor} title="Einloggen"></CButton>
            </Box>
        </Container>
    );
};