import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageProvider {
    private storage_key: string;
    constructor(storage_key: string) {
        this.storage_key = storage_key;
    }

    async saveData(input: string): Promise<void> {
        try {
            await AsyncStorage.setItem(this.storage_key, input);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getData(): Promise<string | null> {
        try {
            const data = await AsyncStorage.getItem(this.storage_key);
            return data;
        }
        catch (error) {
            console.log(error);
            return null;
        }

    }
}