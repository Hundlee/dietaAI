import { colors } from "@/constants/colors";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Controller } from "react-hook-form";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    name: string;
    control: any;
    placeholder: string;
    error?: string;
    options: OptionsProps[];
}

export function Select({
    name,
    control,
    error,
    placeholder,
    options,
}: SelectProps) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TouchableOpacity
                            style={styles.select}
                            onPress={() => setVisible(true)}
                        >
                            <Text style={styles.selectText}>
                                {value
                                    ? options.find(
                                          (option) => option.value === value
                                      )?.label
                                    : placeholder}
                            </Text>
                            <Feather
                                name="arrow-down"
                                size={16}
                                color={colors.black}
                            />
                        </TouchableOpacity>

                        <Modal
                            visible={visible}
                            animationType="fade"
                            transparent={true}
                            onRequestClose={() => setVisible(false)}
                        >
                            <TouchableOpacity
                                style={styles.modalContainer}
                                activeOpacity={0}
                                onPress={() => setVisible(false)}
                            >
                                <TouchableOpacity style={styles.modalContent}>
                                    <FlatList
                                        contentContainerStyle={{ gap: 4 }}
                                        data={options}
                                        keyExtractor={(item) =>
                                            item.value.toString()
                                        }
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                onPress={() => {
                                                    onChange(
                                                        item.value.toString()
                                                    );
                                                    setVisible(false);
                                                }}
                                            >
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />

            {error && <Text style={styles.textError}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    select: {
        borderRadius: 5,
        padding: 10,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectText: {
        fontSize: 16,
    },
    modalContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
        flex: 1,
        justifyContent: "center",
    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 20,
    },
    option: {
        paddingVertical: 14,
        backgroundColor: "rgba(208,208,208,0.4)",
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    textError: {
        paddingTop: 2,
        color: "#FF0000",
    },
});
