const cityTimezones = require('city-timezones');

const groupCountries = [
  { caseSensitive: false, name: 'Russia', result: 'Russia'  },
  { caseSensitive: false, name: 'Miami', result:  'Miami' },
  { caseSensitive: false, name: 'Vancouver', result:  'Vancouver' },
  { caseSensitive: false, name: 'Dallas', result: 'Dallas'  },
  { caseSensitive: false, name: 'Copenhagen', result: 'Denmark' },
  { caseSensitive: false, name: 'San Francisco', result: 'California' },
  { caseSensitive: false, name: 'California', result: 'California' },
  { caseSensitive: false, name: 'Amsterdam', result: 'Netherlands' },
  { caseSensitive: false, name: 'Warwickshire', result: 'United Kingdom' },
  { caseSensitive: false, name: 'Zurich', result: 'Switzerland'  },
  { caseSensitive: false, name: 'Armonk', result: 'New York'  },
  { caseSensitive: false, name: 'Quebec', result: 'New York'  },
  { caseSensitive: false, name: 'Research Triangle Park', result: 'New York' },
  { caseSensitive: false, name: 'NEUILLY', result: 'France'  },
  { caseSensitive: false, name: 'Paris', result: 'France'  },
  { caseSensitive: false, name: 'Norway', result: 'Oslo'  },
  { caseSensitive: false, name: 'Los Angeles', result: 'California' },
  { caseSensitive: false, name: 'Slovak', result: 'Slovakia' },
  { caseSensitive: false, name: 'Toronto', result: 'Ontario' },
  { caseSensitive: false, name: 'London', result: 'United Kingdom' },
  { caseSensitive: true, name: 'USA', result: 'California' },
  { caseSensitive: true, name: 'NY', result: 'New York' },
  { caseSensitive: true, name: 'NC', result: 'New York' }
];

/**
 * 
 * Returns length of a string object
 * 
 * @param {string|array} x variable to calculate its length
 * @returns {number} 
 */
const len = x => x.length;

/**
 * 
 * Destructure timezone from result of city-timezones module
 * 
 * @param {array} cityData Array gotten from city-timezones module
 * @returns {string}
 */
const setTimeZone = cityData => {
    if (!cityData) {
        return "";
    }

    const [{ timezone }] = cityData;

    return timezone;
}

/**
 * 
 * Get the country if city or town passed alongside
 * 
 * @param {string} country Name of a country
 * @returns {string}
 */
const determineCountry = country => {
  if (!country) {
    return "";
  }

  for (const groupCountry of groupCountries) {
    const { caseSensitive, name, result } = groupCountry;
    
    if (RegExp(name, caseSensitive ? '' : 'i').test(country)) {
      return result;
    }
  }

  return country;
};

/**
 * 
 * Get timezone of a city, province and country
 * 
 * @param {string} givenCountry country
 * @returns {string}
 */
const getTimezones = givenCountry => {
    if (!givenCountry) {
      return "";
    }

    const cityData = cityTimezones.findFromCityStateProvince(givenCountry);

    let timezone = "";

    if (len(cityData)) {
      timezone = setTimeZone(cityData);
    } else {
      const country = determineCountry(givenCountry);
      const countryParts = country.split(',');
      const region = countryParts[len(countryParts) - 1];
      const regionData = cityTimezones.findFromCityStateProvince(region);

      if (len(regionData)) {
        timezone = setTimeZone(regionData);
      } else {
        const invalidRegions = ["Greater", "Bay", "Area", "area", "Metro", "City"];
        const splittedRegion = region.split(' ');
        const province = splittedRegion
          .filter(reg  => !invalidRegions.includes(reg) && len(reg))
          .join(' ');

        const provinceData = cityTimezones.findFromCityStateProvince(province);

        if (len(provinceData)) {
          timezone = setTimeZone(provinceData);
        }
      }
    }

    return timezone;
};

/**
 * 
 * Get the current date in a particular timezone
 * 
 * @param {string} timeZone Timezone of a country
 * @returns {Date}
 */
const getTimeNowFromTz = timeZone => {
    if (!timeZone) {
      return "";
    }

    const now = new Date();
    const dateOfLead = now.toLocaleString('en-GB', { timeZone });
    const millisec = new Date(dateOfLead).getTime();

    return millisec;
};

/**
 * 
 * Difference between where you are and the timezone indicated
 * 
 * @param {Date} timeFromTz time from a timezone
 * @returns {number}
 */
const calcTimeDiff = timeFromTz => {
    if (!timeFromTz) {
      return 0;
    }

    const odessaTime = Date.now();
    const diff = timeFromTz - odessaTime;
    const timeDiff = Math.round(diff / 1000 / 60 / 60);

    return timeDiff;
};

/**
 * 
 * Timezone and Time difference from a given location(country)
 * 
 * @param {string} country a city, country, province or all together
 * @returns {Object}
 */
const getTimeDiffAndTimeZone = country => {
  let timeDiffAndTimeZone = { timezone: "", time_diff: "0" };
  const timezone = getTimezones(country);

  if (timezone) {
    const timeFromTimeZone = getTimeNowFromTz(timezone);
    let time_diff = calcTimeDiff(timeFromTimeZone).toString();
    
    // Not "-1" and Not "0" but if "1"
    if (time_diff.charAt(0) !== "0" && time_diff.charAt(0) !== "-") {
      time_diff = "+" + time_diff;
    }

    timeDiffAndTimeZone = { timezone, time_diff };
  }

  return timeDiffAndTimeZone;
};

module.exports = getTimeDiffAndTimeZone;
