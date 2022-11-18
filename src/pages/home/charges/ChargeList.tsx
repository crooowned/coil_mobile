import { ActivityIndicator } from "react-native";
import React from "react";
import { Container } from "../../../components/layout/Container";

export default function ChargeList(){
    return (
        <Container alignment="center">
            <ActivityIndicator style={{width: "100%"}}></ActivityIndicator>
        </Container>
    )
}