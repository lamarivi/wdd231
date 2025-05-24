document.addEventListener("DOMContentLoaded", async () => {
    const loadSpotlights = async () => {
        const spotlightsMainBox = document.querySelector(".spotlights-main-box");
        spotlightsMainBox.innerHTML = "";

        const createSpotCard = (index) => {
            const spotCard = document.createElement("div");
            spotCard.className = `spot-card spot-card-0${index}`;

            const titleSpot = document.createElement("div");
            titleSpot.className = "title-spot";

            const h4 = document.createElement("h4");
            h4.id = `business-name-0${index}`;

            const h3 = document.createElement("h3");
            h3.id = `tag0${index}`;

            titleSpot.appendChild(h4);
            titleSpot.appendChild(h3);

            const spotData = document.createElement("div");
            spotData.className = "spot-data";

            const phoneP = document.createElement("p");
            const phoneSpan = document.createElement("span");
            phoneSpan.id = `phone-0${index}`;
            phoneP.appendChild(phoneSpan);

            const addressP = document.createElement("p");
            const addressSpan = document.createElement("span");
            addressSpan.id = `address-0${index}`;
            addressP.appendChild(addressSpan);

            const urlP = document.createElement("p");
            const urlA = document.createElement("a");
            urlA.id = `url-0${index}`;
            urlA.target = "_blank";
            urlA.rel = "noopener";
            urlP.appendChild(urlA);

            const memberP = document.createElement("p");
            const memberSpan = document.createElement("span");
            memberSpan.id = `member-level-0${index}`;
            memberP.appendChild(memberSpan);

            spotData.appendChild(phoneP);
            spotData.appendChild(addressP);
            spotData.appendChild(urlP);
            spotData.appendChild(memberP);

            spotCard.appendChild(titleSpot);
            spotCard.appendChild(spotData);

            return spotCard;
        };

        for (let i = 1; i <= 3; i++) {
            spotlightsMainBox.appendChild(createSpotCard(i));
        }

        const membershipMap = {
            1: "Bronze",
            2: "Silver",
            3: "Gold"
        };

        try {
            const response = await fetch("data/members.json");
            const data = await response.json();

            const filtered = data.filter(member =>
                member.membershipLevel === 2 || member.membershipLevel === 3
            );

            const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

            selected.forEach((member, index) => {
                const nameEl = document.getElementById(`business-name-0${index + 1}`);
                const tagEl = document.getElementById(`tag0${index + 1}`);
                const phoneEl = document.getElementById(`phone-0${index + 1}`);
                const addressEl = document.getElementById(`address-0${index + 1}`);
                const urlEl = document.getElementById(`url-0${index + 1}`);
                const memberLevelEl = document.getElementById(`member-level-0${index + 1}`);

                if (nameEl) nameEl.textContent = member.name;
                if (tagEl) tagEl.textContent = member.industry || "";
                if (phoneEl) phoneEl.textContent = `Phone: ${member.phone || "N/A"}`;
                if (addressEl) addressEl.textContent = member.address || "";
                if (urlEl) {
                    urlEl.href = member.website;
                    urlEl.textContent = "Visit the website";
                }
                if (memberLevelEl) {
                    memberLevelEl.textContent = `Membership level: ${membershipMap[member.membershipLevel] || "Unknown"}`;
                }
            });
        } catch (error) {
            console.error("Error fetching or processing member data:", error);
        }
    };

    const loadWeather = async () => {
        const myKey = "90158c8799bb28ca5c3054efdcbe85fd";
        const myLat = "10.4806";
        const myLon = "-66.9036";

        const time = new Date();
        const day = time.getDay();
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const weatherContainer = document.getElementById("weather-main");
        const forecastContainer = document.getElementById("weather-forecast");

        try {
            const currentRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`
            );
            const currentData = await currentRes.json();

            const temp = currentData.main.temp.toFixed(1);
            const description = currentData.weather[0].description;
            const icon = currentData.weather[0].icon;
            const city = currentData.name;

            weatherContainer.innerHTML = "";

            const currentWeatherDiv = document.createElement("div");
            currentWeatherDiv.className = "current-weather";

            const h2 = document.createElement("h2");
            h2.textContent = "The current Weather in: ";
            const citySpan = document.createElement("span");
            citySpan.id = "Venezuela";
            citySpan.textContent = city;
            h2.appendChild(citySpan);

            const h4 = document.createElement("h4");
            h4.textContent = weekdays[day];

            const tempP = document.createElement("p");
            tempP.textContent = "Temperature: ";
            const tempSpan = document.createElement("span");
            tempSpan.id = "current-temp";
            tempSpan.textContent = `${temp}°C`;
            tempP.appendChild(tempSpan);

            const figure = document.createElement("figure");
            const img = document.createElement("img");
            img.id = "weather-icon";
            img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            img.alt = description;
            const figcaption = document.createElement("figcaption");
            figcaption.textContent = description;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            currentWeatherDiv.appendChild(h2);
            currentWeatherDiv.appendChild(h4);
            currentWeatherDiv.appendChild(tempP);
            currentWeatherDiv.appendChild(figure);

            weatherContainer.appendChild(currentWeatherDiv);
        } catch (err) {
            console.error("Error fetching current weather:", err);
            weatherContainer.textContent = "Unable to load current weather.";
        }

        try {
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLon}&appid=${myKey}&units=metric`
            );
            const forecastData = await forecastRes.json();

            const dailyForecasts = forecastData.list.filter(f => f.dt_txt.includes("12:00:00")).slice(1, 4);

            forecastContainer.innerHTML = "";

            const h3 = document.createElement("h3");
            h3.textContent = "3-Day Weather Forecast";
            forecastContainer.appendChild(h3);

            const mainDayBox = document.createElement("div");
            mainDayBox.className = "main-day-box";

            dailyForecasts.forEach((f) => {
                const forecastDate = new Date(f.dt_txt);
                const weekday = weekdays[forecastDate.getDay()];
                const forecastTemp = f.main.temp.toFixed(1);
                const forecastIcon = f.weather[0].icon;
                const forecastDesc = f.weather[0].description;

                const dayBox = document.createElement("div");
                dayBox.className = "day-box";

                const dayH4 = document.createElement("h4");
                dayH4.textContent = weekday;

                const figure = document.createElement("figure");
                const img = document.createElement("img");
                img.src = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
                img.alt = forecastDesc;
                const figcaption = document.createElement("figcaption");
                figcaption.textContent = forecastDesc;

                figure.appendChild(img);
                figure.appendChild(figcaption);

                const tempP = document.createElement("p");
                tempP.textContent = "Temperature: ";
                const tempSpan = document.createElement("span");
                tempSpan.textContent = `${forecastTemp}°C`;
                tempP.appendChild(tempSpan);

                dayBox.appendChild(dayH4);
                dayBox.appendChild(figure);
                dayBox.appendChild(tempP);

                mainDayBox.appendChild(dayBox);
            });

            forecastContainer.appendChild(mainDayBox);
        } catch (err) {
            console.error("Error fetching forecast:", err);
            forecastContainer.textContent = "Unable to load forecast data.";
        }
    };

    const loadEvents = async () => {
        const eventsContainer = document.getElementById("events-list");
        if (!eventsContainer) return;

        try {
            const response = await fetch("data/events.json");
            const data = await response.json();

            if (!data.events || !Array.isArray(data.events)) {
                throw new Error("Invalid events data format");
            }

            const events = [...data.events];
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentEvents = events.slice(0, 2);

            eventsContainer.innerHTML = "";

            recentEvents.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.className = "event-card";

                const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                eventCard.innerHTML = `
                    <h3>${event.name}</h3>
                    <p class="event-date">${eventDate}</p>
                    <p>${event.description || ""}</p>
                `;

                eventsContainer.appendChild(eventCard);
            });
        } catch (error) {
            console.error("Error loading events:", error);
            eventsContainer.textContent = "Unable to load events.";
        }
    };

    // Call all loaders
    loadSpotlights();
    loadWeather();
    loadEvents();
});
