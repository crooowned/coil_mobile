import React from "react";
import { Text, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Box } from "../../../components/layout/Box";
import { Container } from "../../../components/layout/Container";
import { IDrive } from "../../../objs/interfaces/IDrive";



export default function DriveDetailPage({navigation,route}: any){
    let drive : IDrive = route.params.drive;
    Icon.loadFont();
    return (
    <Container backNavigator={navigation}>
        <Box>
            <Text>Test</Text>
        </Box>
    </Container>
    );
}