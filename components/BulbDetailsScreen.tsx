// components/BulbDetailsScreen.tsx
import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
} from "react-native";
import Slider from "@react-native-community/slider";

interface BulbDetailsScreenProps {
    bulb: any; // Replace with your Bulb type
    onSave: (bulb: any) => void; // Replace with your Bulb type
    onGoBack: () => void;
}

const BulbDetailsScreen: React.FC<BulbDetailsScreenProps> = ({
    bulb,
    onSave,
    onGoBack,
}) => {
    const [name, setName] = React.useState(bulb.name);
    const [brightness, setBrightness] = React.useState(bulb.brightness);
    const [colorTemperature, setColorTemperature] = React.useState(
        bulb.colorTemperature
    );

    const handleSave = () => {
        onSave({ ...bulb, name, brightness, colorTemperature });
        onGoBack();
    };

    return (
        <View style={styles.container}>
            <Text>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
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
            <Button title="Save" onPress={handleSave} />
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

export default BulbDetailsScreen;
