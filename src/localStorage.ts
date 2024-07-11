import {ITasksList} from "./components/ContentBlock/ContentBlock";

export const getJSONFromStorage = (key: string): Array<ITasksList> => {
    const serialized = localStorage.getItem(key);
    if (serialized == null){
        return [];
    }
    return JSON.parse(serialized);
};

export const setJSONToStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
}
