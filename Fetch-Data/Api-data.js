const axios = require('axios');
const fs = require('fs');

const url = 'https://adminapi.takeuforward.org/api/sheets/double/strivers_a2z_sheet';

async function fetchData() {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

async function storeDataToFile() {
    const data = await fetchData();
    if (data) {
        const jsonData = JSON.stringify(data, null, 4);
        fs.writeFile('data.json', jsonData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Data successfully written to data.json');
            }
        });
    }
}

storeDataToFile();