async function fetchWeather() {
    const city = document.getElementById('city').value;
    const apiKey = 'df8e39321e7d1f09dd1a9791c34ff5d4'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod !== 200) {
            document.getElementById('weather').innerHTML = `<p>${data.message}</p>`;
            return;
        }

        const weatherHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather').innerHTML = weatherHTML;
        saveHistory(city, data.main.temp);
    } catch (error) {
        document.getElementById('weather').innerHTML = `<p>Failed to fetch weather data...</p>`;
    }
}

function saveHistory(city, temp) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    history.push({ city, temp, date: new Date().toLocaleString() });
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    history.reverse();
    document.getElementById('history').innerHTML = history.map(entry => `<p>${entry.date} - ${entry.city}: ${entry.temp}°C</p>`).join('');
}

displayHistory();

const images = [
        'url("aditya-vyas-PzhmEp_aDU4-unsplash.jpg")',
        'url("michael-diane-weidner-h-rP5KSC2W0-unsplash.jpg")',
        'url("frank-mckenna-eXHeq48Z-Q4-unsplash.jpg")',
        'url("chuttersnap-rk2s0sm8xF4-unsplash.jpg")',
        'url("valentin-muller-bWtd1ZyEy6w-unsplash.jpg")',
        'url("benjamin-sow-QjR_snVQn4c-unsplash.jpg")',
        'url("chan-hoi-uj-w-v7OFT4-unsplash.jpg")'
    ];

    let index = 0;

    function changeBackground() {
        document.body.style.backgroundImage = images[index];
        index = (index + 1) % images.length; // Loop back to first image
    }

    // Change background every 3 seconds
    setInterval(changeBackground, 6000);

    // Set initial background
    changeBackground();

    document.getElementById('clearHistory').addEventListener('click', function() {
        localStorage.removeItem('weatherHistory'); // Clear stored history
        document.getElementById('history').innerHTML = ''; // Clear UI
    });

    document.getElementById('toggleHistory').addEventListener('click', function() {
        const historyDiv = document.getElementById('history');
        if (historyDiv.style.display === 'none') {
            historyDiv.style.display = 'block';
            this.textContent = "Past Searches";
        } else {
            historyDiv.style.display = 'none';
            this.textContent = "Past Searches";
        }
    });

    window.onload = function() {
        document.getElementById('history').style.display = 'none';
    };