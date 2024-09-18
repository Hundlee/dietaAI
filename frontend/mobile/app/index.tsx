import { colors } from "@/constants/colors";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Image source={require("../assets/images/logo.png")} />

            <Text style={styles.title}>
                Dieta<Text style={{ color: colors.white }}>.AI</Text>
            </Text>

            <Text style={styles.text}>
                Sua dieta personalizada com inteligência artificial
            </Text>

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Gerar dieta</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.green,
    },
    text: {
        fontSize: 16,
        color: colors.white,
        width: 260,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 8,
    },
    button: {
        padding: 10,
        backgroundColor: colors.blue,
        borderRadius: 7,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 36,
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
});
