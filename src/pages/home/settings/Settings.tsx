import React from "react";
import { CButton } from "../../../components/form/cbutton";
import { Box } from "../../../components/layout/Box";
import { Container } from "../../../components/layout/Container";
import auth from "@react-native-firebase/auth";
import { gStyle } from "../../../globals/style";

export function Settings(){
    return (
        <Container>
            <Box>
                <CButton onClick={()=>auth().signOut()} background={gStyle.bgPrimary.backgroundColor} title="Logout"></CButton>
            </Box>
        </Container>
    );
}