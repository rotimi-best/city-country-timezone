# city-country-timezone

[![NPM](https://nodei.co/npm/city-country-timezone.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/city-country-timezone/)

Find timezone of any country, city or province

## About
By passing a country, province or city you would get an object with the timezone of that location you indicated and then the difference in hours between that location you indicated and the location where the code is running (know as time_diff).


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
