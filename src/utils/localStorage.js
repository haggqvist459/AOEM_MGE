// save and load to local storage 
import { LOCALSTORAGE_KEY } from "./constants";

export const loadList = () => {
    console.log("loadList start")
    try {
        const loadedData = localStorage.getItem(LOCALSTORAGE_KEY);
        // console.log("localStorage loadList loadedData array length: ", loadedData);
        if (loadedData === null) {

            //return empty array in case nothing is stored in localstorage 
            console.log("localStorage loadList loaded null, returning empty array.")
            return [];
        }
        return JSON.parse(loadedData);
    } catch (err) {
        // return empty array in case of loading error with localstorage 
        console.error("localStorage loadList error: ", err)
        return [];
    }

}

export const saveList = (list) => {
    console.log("saveList start");
    console.log("list to save: ", list);

    try {
        const serializedList = JSON.stringify(list);
        // console.log("list to serialize: ", serializedList);
        localStorage.setItem(LOCALSTORAGE_KEY, serializedList);

    } catch (err) {
        console.log(err);
    }
}




// for future backup functionality on Admin Page

export const exportLocalStorageToFile = () => {

    const localStorageData = loadList() // Get the list of mugs from localStorage

    if (!localStorageData || localStorageData === 'null' || (Array.isArray(localStorageData) && localStorageData.length === 0)) {
        alert('No data found to export!');
        return;
    }

    const data = JSON.stringify(localStorageData, null, 2); 


    const blob = new Blob([data], { type: 'text/plain' }); // Create a blob
    const url = URL.createObjectURL(blob); // Create a URL for the blob

    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MoominMugs_Backup.txt'; // File name for the download
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Clean up
    URL.revokeObjectURL(url); // Free memory
}

export const importLocalStorageFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = JSON.parse(e.target.result); // Parse the file contents
        saveList(data);
        alert('Data successfully imported into localStorage!');
      } catch (error) {
        alert('Invalid file format!');
      }
    };
    reader.readAsText(file); // Read the file as text
}
