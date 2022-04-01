import React, { Component, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { BigIcon } from "../../components/decoration/BigIcon";
import Wave from "../../components/decoration/Wave";
import { CButton } from "../../components/form/cbutton";
import { CInput } from "../../components/form/cinput";
import { Box } from "../../components/layout/Box";
import { Container } from "../../components/layout/Container";
import { gStyle } from "../../globals/style";
import auth from "@react-native-firebase/auth";
import { CModal } from "../../components/form/cmodal";
import Icon from 'react-native-vector-icons/Feather';

 
export function LoginPage({ navigation }: any) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    Icon.loadFont();
        return(
            <Container alignment="space-evenly" backNavigator={navigation}>
                <Box>
                    <Text style={{fontSize:65, color:"white", fontWeight: "500", borderBottomWidth: 10, textShadowColor: gStyle.bgSecondary.backgroundColor,textDecorationLine: "underline",textDecorationStyle: "solid",textDecorationColor: gStyle.bgSecondary.backgroundColor}}>Wilkommen</Text>
                    <Text style={{fontSize:65, color:"white", fontWeight: "500"}}>zurück.</Text>
                </Box>
                <Box> 
                    <CInput autoCapitalize='none' autoCorrect={false} onChangeText={(text)=>setUser(text)} placeholder="Email"></CInput>
                    <CInput secureTextEntry={true} onChangeText={(text)=>setPassword(text)} placeholder="Passwort"></CInput>
                    <CButton onClick={()=>auth().signInWithEmailAndPassword(user, password).catch((e)=>{Alert.alert("Login", "Login fehlgeschlagen: " + e);})} style={{marginVertical: 25}} background={gStyle.bgPrimary.backgroundColor} textColor={gStyle.bgPrimary.color} title="Einloggen"></CButton>
                </Box>
                <Wave side="bottom"/>
            </Container>
        );
}