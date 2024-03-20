import { useState, useEffect } from "react";

/* PREFIX adalah nama dari local storage untuk aplikasi ini */
const PREFIX = "simplestore-app-"

/* useLocal storage adalah function untuk mengirim atau membuat data di local storage,
   menerima parameter berupa key (string) dan value (bisa jenis data apa saja) */
   const useLocalStorage = (key, initialValue) => {
    const prefixedKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue);
            } catch (error) {
                console.error("Error parsing stored JSON:", error);
            }
        }

        // Jika nilai di local storage tidak valid JSON atau null, gunakan initialValue
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    useEffect(() => {
        // Simpan nilai ke local storage setiap kali nilai berubah
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
};
export default useLocalStorage