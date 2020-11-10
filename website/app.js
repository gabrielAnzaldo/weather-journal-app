const APY_KEY = '7ea45cdb1c4fee217fbf8316ab369fd0';
const BASE_URL = 'api.openweathermap.org';
// example
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=

// event listeners
const generateButton = document.getElementById('generate');

const getData = async(url = '') => {
    const response = await fetch(url);
    try{
        const newData = await response.json();
        return newData;
    } catch(error){
        console.log('GET error: ', error);
        throw new Error(error);
    }
};

const postData = async(url = '', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log('POST error: ', error);
        throw new Error(error);
    }
};

function  handleClickEvent() {
    console.log('click aca pa...');
    const weatherData = getData(`https://${BASE_URL}/data/2.5/weather?q=London,uk&APPID=${APY_KEY}`);
    weatherData.then(function(data) {
        console.log('response: ', data);
    });
}
generateButton.addEventListener('click', handleClickEvent);