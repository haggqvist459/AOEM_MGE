// save and load to local storage 
import { LOCALSTORAGE_KEY } from "./constants";

export const loadData = () => {
    // console.log("loadData start")
    try {
        const loadedData = localStorage.getItem(LOCALSTORAGE_KEY);
        return loadedData ? JSON.parse(loadedData) : undefined
        
    } catch (err) {
        // return empty array in case of loading error with localstorage 
        console.error("localStorage loadList error: ", err)
        return undefined;
    }
}


export const saveData = (data) => {
    // console.log("saveData start");
    // console.log("saveData data to save: ", data);

    try {
        const serializedData = JSON.stringify(data);
        // console.log("list to serialize: ", serializedList);
        localStorage.setItem(LOCALSTORAGE_KEY, serializedData);

    } catch (err) {
        console.log("localStorage saveData error: ", err);
    }
}


export const deleteData = () => {
    // delete everything in localstorage. 
    // console.log("deleteData start");

    try {
        console.log("deleteData triggered, all gone.")
        localStorage.clear()
    } catch (err) {
        console.log("localStorage saveData error: ", err)
    }
}