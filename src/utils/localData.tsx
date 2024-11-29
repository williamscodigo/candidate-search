import User from "../interfaces/User";

const getLocalData = (key: string): User[] => {
    const jsonData = localStorage.getItem(key); // Get JSON string from local storage
    return jsonData ? JSON.parse(jsonData) : []; // Parse JSON string to array or return empty array
};

const setLocalData = (key: string, data: User[]) => {
    const jsonData = JSON.stringify(data); // Convert array to JSON string
    localStorage.setItem(key, jsonData); // Store JSON string in local storage
};

const clearLocalData = (key: string) => {
    localStorage.removeItem(key);
  };

export { getLocalData, setLocalData, clearLocalData };