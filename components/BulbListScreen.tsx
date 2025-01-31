// components/BulbListScreen.tsx
import React from "react";
import { View, Button, FlatList, Text, StyleSheet } from "react-native";
import { Bulb } from "./types"; // Define your Bulb type in a separate file

interface BulbListScreenProps {
    bulbs: Bulb[];
    toggleBulb: (id: string) => void;
    onSelectBulb: (bulb: Bulb) => void;
    onAddBulb: () => void;
    onDeleteBulb: (id: string) => void;
}

const BulbListScreen: React.FC<BulbListScreenProps> = ({
    bulbs,
    toggleBulb,
    onSelectBulb,
    onAddBulb,
    onDeleteBulb,
}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={bulbs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bulbItem}>
                        <Text>{item.name}</Text>
                        <Button
                            title={item.isOn ? "Turn Off" : "Turn On"}
                            onPress={() => toggleBulb(item.id)}
                        />
                        <Button
                            title="Details"
                            onPress={() => onSelectBulb(item)}
                        />
                        <Button
                            title="Delete"
                            onPress={() => onDeleteBulb(item.id)}
                        />
                    </View>
                )}
            />
            <Button title="Add New Bulb" onPress={onAddBulb} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
    },
    bulbItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
});

export default BulbListScreen;
