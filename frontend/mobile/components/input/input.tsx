import { colors } from "@/constants/colors";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Controller } from "react-hook-form";

interface InputProps {
    name: string;
    control: any;
    placeholder: string;
    rules?: object;
    error?: string;
    keyboardType: KeyboardTypeOptions;
}

export function Input({
    name,
    control,
    keyboardType,
    error,
    rules,
    placeholder,
}: InputProps) {
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        keyboardType={keyboardType}
                    />
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
    input: {
        borderRadius: 5,
        padding: 6,
        fontSize: 16,
        paddingLeft: 14,
        backgroundColor: colors.white,
    },
    textError: {
        paddingTop: 2,
        color: "#FF0000",
    },
});
