import { StyleSheet } from "react-native";

const INCSteps = 10;
const INCMultiplier = 2;
export const gStyle = StyleSheet.create({
    /* Basic Flex Layout */
    container: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        backgroundColor: "#111518",
        height:"100%",
        paddingTop: 30
    },
    box: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width:"100%",
        padding:INCSteps,
        zIndex: 10,
        elevation:10
    },
    bgPrimary: { 
        backgroundColor: "#3454D1",
        color: "white",
    },
    bgSecondary: {
        backgroundColor: "#B4F84F",
        color: "white"
    },
    /* Alignment */
    justifyCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    verticalCenter: {
        justifyContent: "center",
    },

    /*Margins*/
    marginY_S:{
        marginTop:INCSteps,
        marginBottom:INCSteps
    },
    marginX_S:{
        marginLeft:INCSteps,
        marginRight:INCSteps
    },
    marginY_M:{
        marginTop:INCSteps*INCMultiplier,
        marginBottom:INCSteps*INCMultiplier
    },
    marginX_M:{
        marginLeft:INCSteps*INCMultiplier,
        marginRight:INCSteps*INCMultiplier
    },

    /* Paddings for Input etc.. */
    padding_S:{
        padding:INCSteps
    },
    paddingY_S:{
        paddingTop: INCSteps,
        paddingBottom:INCSteps
    },
    paddingX_S:{
        paddingLeft:INCSteps,
        paddingRight:INCSteps
    },
});