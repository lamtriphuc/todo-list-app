export function getStorageItem<T>(key: string, fallbackValue: T): T {
    try {
        const item = localStorage.getItem(key);

        if (!item) {
            return fallbackValue;
        }

        return JSON.parse(item);
    } catch (error) {
        return fallbackValue;
    }
}

export function setStorageItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}