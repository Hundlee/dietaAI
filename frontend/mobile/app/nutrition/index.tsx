import { Header } from "@/components/header";
import { useDataStore } from "@/store/data";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    Pressable,
    Platform,
    StatusBar,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { colors } from "@/constants/colors";
import { useRef, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { Data } from "../types/data";
import { Link } from "expo-router";

interface ResponseProps {
    data: Data;
}

export default function Nutrition() {
    const user = useDataStore((state) => state.user);

    const spinValue = useRef(new Animated.Value(0)).current;

    const startSpin = () => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    useEffect(() => {
        startSpin();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const { data, isFetching, error } = useQuery({
        queryKey: ["nutrition"],
        queryFn: async () => {
            try {
                if (!user) {
                    throw new Error("Faild load nutrition");
                }

                // const response = await api.get<ResponseProps>("/teste");

                const response = await api.post<ResponseProps>("/create", {
                    name: user.name,
                    age: user.age,
                    gender: user.gender,
                    height: user.height,
                    weight: user.weight,
                    objective: user.objective,
                    level: user.level,
                });

                return response.data.data;
            } catch (error) {
                console.log(error);
            }
        },
    });

    if (isFetching) {
        return (
            <View style={styles.loading}>
                <Animated.View
                    style={[styles.spinner, { transform: [{ rotate: spin }] }]}
                >
                    <Text style={styles.spinnerText}>
                        <Feather name="loader" size={36} />
                    </Text>
                </Animated.View>
                <Text style={styles.loadingText}>
                    Estamos gerando sua dieta
                </Text>
                <Text style={styles.loadingText}>Consultando IA...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.error}>
                <Text style={styles.errorText}>Falha ao gerar dieta!</Text>
                <Link href="/">
                    <Text style={styles.loadingText}>Tente novamente!</Text>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.headerText}>Minha dieta</Text>
                <Pressable style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>
                        Compartilhar{" "}
                        <Feather name="copy" size={16} color={colors.white} />
                    </Text>
                </Pressable>
            </View>

            <View style={styles.containerContent}>
                <Text style={styles.userName}>{data?.nome}</Text>
                <Text style={styles.objective}>
                    Foco:{" "}
                    <Text style={styles.objectiveText}>{data?.objetivo}</Text>
                </Text>
                <Text style={styles.meals}>Refeições</Text>
                <View style={styles.mealsSection}>
                    {data?.refeicoes.map((meal) => (
                        <View style={styles.mealsItem}>
                            <View style={styles.mealsItemHeader}>
                                <Text style={styles.mealsItemTitle}>
                                    {meal.nome}
                                </Text>
                                <Feather name="corner-up-left" />
                            </View>
                            <Text>
                                <Feather name="clock" />
                                Horário: {meal.horario}
                            </Text>

                            <View>
                                <Text style={styles.mealText}>Alimentos:</Text>
                                {meal.alimentos.map((meal) => (
                                    <Text>{meal}</Text>
                                ))}
                            </View>

                            <View>
                                <Text style={styles.suplementText}>
                                    Dica Suplementos:
                                </Text>
                                {data.suplementos.map((suplemento) => (
                                    <Text>{suplemento}</Text>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: { fontSize: 18, color: colors.white, marginBottom: 4 },
    error: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: { fontSize: 18, color: "#F00000" },
    spinner: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    spinnerText: {
        fontSize: 24,
        color: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerHeader: {
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight! + 64 : 64,
        backgroundColor: colors.white,
        borderBottomRightRadius: 14,
        borderBottomLeftRadius: 14,
        marginBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.background,
    },
    headerButton: {
        backgroundColor: colors.blue,
        justifyContent: "center",
        paddingHorizontal: 6,
        height: 26,
        borderRadius: 5,
    },
    headerButtonText: {
        color: colors.white,
        fontWeight: "bold",
    },
    containerContent: { paddingHorizontal: 16 },
    userName: { fontSize: 22, fontWeight: "bold", color: colors.white },
    objective: { fontSize: 16, fontWeight: "bold", color: colors.white },
    objectiveText: { fontWeight: "400" },
    meals: { paddingTop: 16, color: colors.white, fontWeight: "bold" },
    mealsSection: {
        backgroundColor: colors.white,
        borderRadius: 6,
        gap: 5,
        padding: 10,
    },
    mealsItem: {
        backgroundColor: "#efefef",
        borderRadius: 6,
        padding: 10,
        gap: 10,
    },
    mealsItemHeader: {
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center",
    },
    mealsItemTitle: {
        fontWeight: "bold",
    },
    mealText: {
        fontWeight: "bold",
    },
    suplementText: {
        fontWeight: "bold",
    },
});
