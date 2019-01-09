# city-country-timezone

## About
By passing a country, province or city to the module you would get an object with the timezone of that location you indicated and then you get the difference in hours between that location you indicated and the location where the code is running


# Getting Started

## Installation

`npm install --save city-country-timezone`

## Code snippet

```javascript
    const getTimeDiffAndTimeZone = require('city-country-timezone');

    const country = "Los Angeles";

    const { timezone, time_diff } = getTimeDiffAndTimeZone(country);

    console.log(`Timezone: ${timezone}, Time Difference: ${time_diff}`); // Timezone: America/Santiago, Time Difference: -5
```