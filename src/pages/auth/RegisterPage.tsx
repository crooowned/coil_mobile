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
export function RegisterPage({ navigation }: any) {
        const [user, setUser] = useState("");
        const [password, setPassword] = useState("");
        return(
            <Container alignment="space-evenly" backNavigator={navigation}>
                <Box>
                    <Text style={{fontSize:65, color:"white", fontWeight: "500", borderBottomWidth: 10, textShadowColor: gStyle.bgSecondary.backgroundColor,textDecorationLine: "underline",textDecorationStyle: "solid",textDecorationColor: gStyle.bgSecondary.backgroundColor}}>Account</Text>
                    <Text style={{fontSize:65, color:"white", fontWeight: "500"}}>erstellen.</Text>
                </Box> 
                <Box>
                    <CInput autoCorrect={false} autoCapitalize='none' onChangeText={email => setUser(email)} placeholder="Email"></CInput>
                    <CInput secureTextEntry={true} onChangeText={pass => setPassword(pass)} placeholder=""></CInput>
                    <CButton onClick={()=>{auth().createUserWithEmailAndPassword(user, password).catch((e)=>Alert.alert("Regestrierung", "Registrierung fehlgeschlagen: " + e));}} style={{marginVertical: 25}} background={gStyle.bgPrimary.backgroundColor} textColor={gStyle.bgPrimary.color} title="Einloggen"></CButton>
                </Box>
                <Wave side="bottom"/>
            </Container>
        );
}