import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
    Platform,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface HeaderProps {
    step: string;
    title: string;
}

export function Header({ step, title }: HeaderProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.row}>
                    <Pressable onPress={() => router.back()}>
                        <Feather
                            name="arrow-left"
                            size={24}
                            color={colors.black}
                        />
                    </Pressable>

                    <View style={styles.contentStep}>
                        <Text style={styles.textHeader}>{step}</Text>
                        <Feather name="loader" size={16} color={colors.black} />
                    </View>
                </View>

                <Text style={styles.title}>{title}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
        backgroundColor: colors.white,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginBottom: 14,
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 34,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
    },
    contentStep: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    textHeader: {
        fontSize: 18,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.background,
    },
});
