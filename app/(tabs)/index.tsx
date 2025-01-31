// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as FileSystem from "expo-file-system";
import BulbListScreen from "@/components/BulbListScreen";
import BulbDetailsScreen from "@/components/BulbDetailsScreen";
import AddBulbScreen from "@/components/AddBulbScreen";
import { RootStackParamList, Bulb } from "@/components/types"; // Import types

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use the defined types
const FILE_URI = `${FileSystem.documentDirectory}bulbs.json`;

const App = () => {
    const [bulbs, setBulbs] = useState<Bulb[]>([]); // Use the Bulb type

    useEffect(() => {
        const loadBulbs = async () => {
            try {
                const fileInfo = await FileSystem.getInfoAsync(FILE_URI);
                if (fileInfo.exists) {
                    const fileContent = await FileSystem.readAsStringAsync(
                        FILE_URI
                    );
                    setBulbs(JSON.parse(fileContent));
                }
            } catch (error) {
                console.error("Error loading bulbs:", error);
            }
        };
        loadBulbs();
    }, []);

    const toggleBulb = (id: string) => {
        const updatedBulbs = bulbs.map((bulb) =>
            bulb.id === id ? { ...bulb, isOn: !bulb.isOn } : bulb
        );
        setBulbs(updatedBulbs);
        saveBulbs(updatedBulbs);
    };

    const saveBulbs = async (bulbs: Bulb[]) => {
        try {
            await FileSystem.writeAsStringAsync(
                FILE_URI,
                JSON.stringify(bulbs)
            );
        } catch (error) {
            console.error("Error saving bulbs:", error);
        }
    };

    const handleSaveBulbDetails = (bulb: Bulb) => {
        const updatedBulbs = bulbs.map((b) => (b.id === bulb.id ? bulb : b));
        setBulbs(updatedBulbs);
        saveBulbs(updatedBulbs);
    };

    const handleAddBulb = (newBulb: Bulb) => {
        const updatedBulbs = [...bulbs, newBulb];
        setBulbs(updatedBulbs);
        saveBulbs(updatedBulbs);
    };

    const handleDeleteBulb = (id: string) => {
        const updatedBulbs = bulbs.filter((bulb) => bulb.id !== id);
        setBulbs(updatedBulbs);
        saveBulbs(updatedBulbs);
    };

    return (
        <NavigationIndependentTree>
            <Stack.Navigator initialRouteName="BulbList">
                <Stack.Screen name="BulbList">
                    {(props) => (
                        <BulbListScreen
                            {...props}
                            bulbs={bulbs}
                            toggleBulb={toggleBulb}
                            onSelectBulb={(bulb) =>
                                props.navigation.navigate("BulbDetails", {
                                    bulb,
                                })
                            }
                            onAddBulb={() =>
                                props.navigation.navigate("AddBulb")
                            }
                            onDeleteBulb={handleDeleteBulb}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="BulbDetails">
                    {(props) => (
                        <BulbDetailsScreen
                            bulb={props.route.params.bulb} // Now TypeScript knows this is a Bulb
                            onSave={handleSaveBulbDetails}
                            onGoBack={() => props.navigation.goBack()}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="AddBulb">
                    {(props) => (
                        <AddBulbScreen
                            onAdd={handleAddBulb}
                            onGoBack={() => props.navigation.goBack()}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationIndependentTree>
    );
};

export default App;
