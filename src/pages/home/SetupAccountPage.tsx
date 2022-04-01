import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { UserContext } from "../../../App";
import { CButton } from "../../components/form/cbutton";
import { CInput } from "../../components/form/cinput";
import { Box } from "../../components/layout/Box";
import { Container } from "../../components/layout/Container";
import { gStyle } from "../../globals/style";
import AccountDataService from "../../services/AccountDataService";

export default function SetupAccountPage({navigation}:any){
    const style = StyleSheet.create({
        label: {
            fontSize: 40,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            width: "100%"
        },
        sublabel: {
            fontSize: 15,
            marginTop: 20
        },
        introBox: {
            paddingVertical: 30
        },
        cinput: {
            marginVertical: 20
        }
    });
    const user = useContext(UserContext);
    const [token, setToken] = React.useState("");
    return (
    <Container art="stacked-waves">
        <Box style={style.introBox}>
            <Text style={style.label}>Tesla Account verknüpfen</Text>
            <Text style={[style.label, style.sublabel]}>Dieser Token kann über die Teslatoken App erreicht werden.</Text>
        </Box>
        <Box>
            <CInput style={style.cinput} onChangeText={(text)=>setToken(text)} placeholder="Refreshtoken" underlineColor={gStyle.bgSecondary.backgroundColor}></CInput>
            <CButton onClick={()=>{if(user){AccountDataService.setupAccount(user.uid, token); navigation.navigate('Index');}}} title="Bestätigen" background={gStyle.bgSecondary.backgroundColor}></CButton>
        </Box>
    </Container>
    );
}