// components/types.ts
export type Bulb = {
    id: string;
    name: string;
    isOn: boolean;
    brightness: number;
    colorTemperature: number;
};

export type RootStackParamList = {
    BulbList: undefined; // No parameters
    BulbDetails: { bulb: Bulb }; // BulbDetails expects a bulb parameter
    AddBulb: undefined; // No parameters
};
