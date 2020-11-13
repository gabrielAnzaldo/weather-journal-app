const APY_KEY = '7ea45cdb1c4fee217fbf8316ab369fd0';
const BASE_URL = 'api.openweathermap.org';

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

function updateUIDinamically(data) {
    const date = document.getElementById('date');
    date.innerHTML = data.date;
    const temp = document.getElementById('temp');
    temp.innerHTML = data.temperature;
    const content = document.getElementById('content');
    content.innerHTML = data.userResponse;
    // clean up
    const userInput = document.getElementById('feelings');
    userInput.value = '';
    const zipCode = document.getElementById('zip');
    zipCode.value = '';
}

function  handleClickEvent() {
    const zipCode = document.getElementById('zip');
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    const userInput = document.getElementById('feelings').value;
    const weatherData = getData(`https://${BASE_URL}/data/2.5/weather?zip=${zipCode.value},us&APPID=${APY_KEY}`);
    weatherData.then(function(data) {
        if(data) {
            const dataObject = {
                temperature: data.main.temp,
                date: newDate,
                userResponse: userInput,
            };
            postData('/add', dataObject);
            const serverResponse = getData('/all');
            serverResponse.then(function(data){
                if(data) {
                    updateUIDinamically(data);
                }
            });
        }
    });
}
generateButton.addEventListener('click', handleClickEvent);