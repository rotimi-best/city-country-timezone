# city-country-timezone

[![NPM](https://nodei.co/npm/city-country-timezone.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/city-country-timezone/)

Find timezone of any country, city or province

## About

By passing a country, province or city you would get an object with the timezone of that location you indicated and then the difference in hours between that location you indicated and the location where the code is running (know as `time_diff`). The location used to test this code is `Odessa, Ukraine` which would determine the outcome of the `time_diff`

## Getting Started

### Installation

`npm install city-country-timezone`

### Code snippet

#### Search by city

```javascript
const getTimeDiffAndTimeZone = require('city-country-timezone');

const country = "Los Angeles"; //city

const { timezone, time_diff } = getTimeDiffAndTimeZone(country);

console.log(`Timezone: ${timezone}, Time Difference: ${time_diff}`); 
// Timezone: America/Santiago, Time Difference: -5
```

#### Search by region and country

```javascript
const getTimeDiffAndTimeZone = require('city-country-timezone');

const country = "Samara Region, Russian Federation"; //region and country

const { timezone, time_diff } = getTimeDiffAndTimeZone(country);

console.log(`Timezone: ${timezone}, Time Difference: ${time_diff}`); 
// Timezone: Europe/Moscow, Time Difference: +1
```

#### Search by city and country

```javascript
const getTimeDiffAndTimeZone = require('city-country-timezone');

const country = "Lagos, Nigeria"; //city and country

const { timezone, time_diff } = getTimeDiffAndTimeZone(country);

console.log(`Timezone: ${timezone}, Time Difference: ${time_diff}`); 
// Timezone: Africa/Lagos, Time Difference: -1
```
