// Initialize the map centered on Finland
const map = L.map('interactive-map').setView([65.0, 26.0], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Weather data fetching (now using OpenWeatherMap API)
async function fetchWeatherData(lat, lng) {
    try {
        const apiKey = 'bf77f308c184fa91abf53b87fe832fa4'; // Replace with your OpenWeatherMap API key
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        updateWeatherOverlay(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Update weather overlay
function updateWeatherOverlay(data) {
    const weatherOverlay = document.querySelector('.weather-overlay');
    if (data && data.main && data.weather && data.weather[0]) {
        weatherOverlay.innerHTML = `
            <h3>Current Weather</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } else {
        weatherOverlay.innerHTML = `<p>Weather data unavailable.</p>`;
    }
}

// Sample routes data (replace with actual data from backend)
const routes = [
  {
    name: 'Helsinki City Tour',
    description: 'Explore the vibrant capital city, including Senate Square, Market Square, and the Design District.',
    duration: '4 hours',
    difficulty: 'Easy',
    image: 'https://zzzziyang.github.io/finnilini/helsinki.jpg'
  },
  {
    name: 'Lapland Adventure',
    description: 'Experience the magic of Lapland: Rovaniemi, Santa Claus Village, and a reindeer safari.',
    duration: '2 days',
    difficulty: 'Moderate',
    image: 'https://zzzziyang.github.io/finnilini/lapland.jpg'
  },
  {
    name: 'Coastal Castles Route',
    description: 'Visit Turku Castle, Suomenlinna Fortress, and Olavinlinna Castle along Finland’s scenic coast.',
    duration: '1 day',
    difficulty: 'Easy',
    image: 'https://zzzziyang.github.io/finnilini/coastalcastle.jpg'
  }
];

const hiddenGems = [
  {
    name: 'Secret Lake View',
    location: 'Northern Lapland',
    description: 'A pristine lake with aurora viewing spot',
    category: 'Nature',
    image: 'https://zzzziyang.github.io/finnilini/secretlake.jpg'
  },
  {
    name: 'Kummakivi Balancing Rock',
    location: 'Ruokolahti',
    description: 'A mysterious balancing rock in the forest, a true geological wonder.',
    category: 'Natural Wonder',
    image: 'https://zzzziyang.github.io/finnilini/balancingrock.jpg'
  },
  {
    name: 'Vallisaari Island',
    location: 'Helsinki Archipelago',
    description: 'A tranquil island with lush nature and abandoned fortifications, perfect for peaceful walks.',
    category: 'Island',
    image: 'https://zzzziyang.github.io/finnilini/island.jpg'
  }
];


// Tourist landmarks data
const landmarks = [
    {
        name: "Helsinki Cathedral",
        lat: 60.1699,
        lng: 24.9524,
        description: "A famous neoclassical cathedral in Helsinki."
    },
    {
        name: "Santa Claus Village",
        lat: 66.5436,
        lng: 25.8476,
        description: "Meet Santa Claus in Rovaniemi, Lapland."
    },
    {
        name: "Suomenlinna Fortress",
        lat: 60.1446,
        lng: 24.9871,
        description: "A UNESCO World Heritage sea fortress near Helsinki."
    },
    {
        name: "Temppeliaukio Church",
        lat: 60.1738,
        lng: 24.9225,
        description: "A unique church built into solid rock in Helsinki."
    },
    {
        name: "Olavinlinna Castle",
        lat: 61.8647,
        lng: 28.8976,
        description: "A 15th-century three-tower castle in Savonlinna."
    },
    {
        name: "Turku Castle",
        lat: 60.4351,
        lng: 22.2302,
        description: "A medieval castle in Turku, one of Finland's oldest buildings."
    },
    {
        name: "Sibelius Monument",
        lat: 60.1828,
        lng: 24.9106,
        description: "A famous monument dedicated to composer Jean Sibelius in Helsinki."
    },
    {
        name: "Levi Ski Resort",
        lat: 67.8057,
        lng: 24.8028,
        description: "Finland's largest ski resort, located in Lapland."
    },
    {
        name: "Koli National Park",
        lat: 63.0997,
        lng: 29.8067,
        description: "A scenic national park known for its hills and lake views."
    },
    {
        name: "Ateneum Art Museum",
        lat: 60.1719,
        lng: 24.9414,
        description: "Finland's best-known art museum, located in Helsinki."
    },
    {
        name: "Market Square (Kauppatori)",
        lat: 60.1675,
        lng: 24.9522,
        description: "A central square in Helsinki, famous for its market and sea views."
    },
    {
        name: "Seurasaari Open-Air Museum",
        lat: 60.1856,
        lng: 24.8817,
        description: "An island museum showcasing Finnish buildings and culture."
    },
    {
        name: "Hämeenlinna Castle",
        lat: 60.9950,
        lng: 24.4642,
        description: "A medieval castle in Hämeenlinna."
    },
    {
        name: "Arktikum Science Museum",
        lat: 66.5039,
        lng: 25.7260,
        description: "A museum and science center in Rovaniemi focused on Arctic research."
    },
    {
        name: "Ranua Wildlife Park",
        lat: 65.9272,
        lng: 26.5031,
        description: "A wildlife park with arctic animals in Ranua."
    },
    {
        name: "Porvoo Old Town",
        lat: 60.3932,
        lng: 25.6637,
        description: "A picturesque old town with wooden houses and cobblestone streets."
    },
    {
        name: "Espoo Museum of Modern Art (EMMA)",
        lat: 60.1860,
        lng: 24.8056,
        description: "A major modern art museum in Espoo."
    },
    {
        name: "Oulu Cathedral",
        lat: 65.0136,
        lng: 25.4717,
        description: "A historic cathedral in Oulu."
    },
    {
        name: "Moominworld",
        lat: 60.4572,
        lng: 21.9376,
        description: "A theme park based on the Moomin books, located in Naantali."
    },
    {
        name: "Pyhä-Luosto National Park",
        lat: 67.1167,
        lng: 26.9167,
        description: "A national park in Lapland known for its fells and forests."
    },
    {
        name: "Ruka Ski Resort",
        lat: 66.1700,
        lng: 29.1400,
        description: "A popular ski resort in Kuusamo."
    },
    {
        name: "Helsinki Zoo (Korkeasaari)",
        lat: 60.1756,
        lng: 24.9772,
        description: "A zoo located on an island in Helsinki."
    },
    {
        name: "Linnanmäki Amusement Park",
        lat: 60.1944,
        lng: 24.9417,
        description: "A popular amusement park in Helsinki."
    },
    {
        name: "Tampere Cathedral",
        lat: 61.4981,
        lng: 23.7666,
        description: "A national romantic style cathedral in Tampere."
    },
    {
        name: "Verla Groundwood and Board Mill",
        lat: 61.0672,
        lng: 26.6406,
        description: "A UNESCO World Heritage site in Verla."
    },
    {
        name: "Siida Sámi Museum",
        lat: 68.5047,
        lng: 27.0276,
        description: "A museum dedicated to Sámi culture in Inari."
    },
    {
        name: "Helsinki Central Library Oodi",
        lat: 60.1744,
        lng: 24.9384,
        description: "A modern library and cultural center in Helsinki."
    },
    {
        name: "Serlachius Museum Gösta",
        lat: 62.0217,
        lng: 24.4197,
        description: "An art museum in Mänttä-Vilppula."
    },
    {
        name: "Pallas-Yllästunturi National Park",
        lat: 68.0000,
        lng: 24.1667,
        description: "A large national park in Finnish Lapland."
    },
    {
        name: "Savonlinna Opera Festival",
        lat: 61.8647,
        lng: 28.8976,
        description: "A world-famous opera festival held at Olavinlinna Castle."
    }
    // Add more as needed
];

// Populate routes
function displayRoutes() {
    const routesGrid = document.querySelector('.routes-grid');
    routes.forEach(route => {
        const routeElement = document.createElement('div');
        routeElement.className = 'route-card';
        routeElement.innerHTML = `
            <img src="${route.image || ''}" alt="Route Image" style="width:100%;border-radius:0.8rem 0.8rem 0 0;max-height:180px;object-fit:cover;background:#e0e0e0;" loading="lazy">
            <h3>${route.name}</h3>
            <p>${route.description}</p>
            <div class="route-details">
                <span>Duration: ${route.duration}</span><br>
                <span>Difficulty: ${route.difficulty}</span>
            </div>
        `;
        routesGrid.appendChild(routeElement);
    });
}

// Populate hidden gems
function displayHiddenGems() {
    const gemsGrid = document.querySelector('.gems-grid');
    hiddenGems.forEach(gem => {
        const gemElement = document.createElement('div');
        gemElement.className = 'gem-card';
        gemElement.innerHTML = `
            <img src="${gem.image || ''}" alt="Hidden Gem Image" style="width:100%;border-radius:0.8rem 0.8rem 0 0;max-height:180px;object-fit:cover;background:#e0e0e0;" loading="lazy">
            <h3>${gem.name}</h3>
            <p>${gem.description}</p>
            <span class="gem-location">${gem.location}</span>
            <span class="gem-category">${gem.category}</span>
        `;
        gemsGrid.appendChild(gemElement);
    });
}

// Add landmark markers to the map
function addLandmarksToMap() {
    landmarks.forEach(landmark => {
        L.marker([landmark.lat, landmark.lng])
            .addTo(map)
            .bindPopup(`<b>${landmark.name}</b><br>${landmark.description}`);
    });
}

// Initialize displays
displayRoutes();
displayHiddenGems();
addLandmarksToMap(); // Only use manual list

// Add map click handler for weather updates
map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    fetchWeatherData(lat, lng);
});
