// components/AddBulbScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";

interface AddBulbScreenProps {
    onAdd: (bulb: any) => void; // Replace with your Bulb type
    onGoBack: () => void;
}

const AddBulbScreen: React.FC<AddBulbScreenProps> = ({ onAdd, onGoBack }) => {
    const [name, setName] = useState("");
    const [brightness, setBrightness] = useState(100);
    const [colorTemperature, setColorTemperature] = useState(2700);

    const handleAdd = () => {
        const newBulb = {
            id: Date.now().toString(), // Unique ID based on timestamp
            name,
            isOn: false,
            brightness,
            colorTemperature,
        };
        onAdd(newBulb);
        onGoBack();
    };

    return (
        <View style={styles.container}>
            <Text>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter bulb name"
                style={styles.input}
            />
            <Text>Brightness:</Text>
            <Slider
                value={brightness}
                onValueChange={setBrightness}
                minimumValue={0}
                maximumValue={100}
            />
            <Text>Color Temperature:</Text>
            <Slider
                value={colorTemperature}
                onValueChange={setColorTemperature}
                minimumValue={2700}
                maximumValue={6500}
            />
            <Button title="Add Bulb" onPress={handleAdd} />
            <Button title="Go Back" onPress={onGoBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default AddBulbScreen;
