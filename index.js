const cityTimezones = require('city-timezones');

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

    const russia = RegExp('Russia', 'i').test(country);
    const miami = RegExp('Miami', 'i').test(country);
    const dallas = RegExp('Dallas', 'i').test(country);
    const denmark = RegExp('Copenhagen', 'i').test(country);
    const california = RegExp('USA', 'i').test(country);
    const london = RegExp('England', 'i').test(country);
    const england = RegExp('London', 'i').test(country);
    const warwickshire = RegExp('Warwickshire', 'i').test(country);
    const zurich = RegExp('Zurich', 'i').test(country);
    const armok = RegExp('Armonk', 'i').test(country);
    const quebec = RegExp('Quebec', 'i').test(country);
    const rtp = RegExp('Research Triangle Park', 'i').test(country);
    const france = RegExp('NEUILLY', 'i').test(country);
    const paris = RegExp('Paris', 'i').test(country);
    const ny = RegExp('NY', 'i').test(country);
    const nc = RegExp('NC', 'i').test(country);

    if (russia) country = "Russia";

    if (france || paris) country = "France";

    if (miami) country = "Miami";

    if (dallas) country = "Dallas";

    if (denmark) country = "Denmark";

    if (california) country = "California";

    if (london || england || warwickshire) country = "United Kingdom";

    if (zurich) country = "Switzerland";

    if (armok || rtp || quebec || ny || nc) country = "Armonk, New York";

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

    const country = determineCountry(givenCountry);
    const cityData = cityTimezones.findFromCityStateProvince(country);

    let timezone = "";
    
    if (len(cityData)) timezone = setTimeZone(cityData);

    else {
        const countryParts = country.split(',');
        const region = countryParts[len(countryParts) - 1];
        const regionData = cityTimezones.findFromCityStateProvince(region);

        if (len(regionData)) timezone = setTimeZone(regionData);

        else {
            const invalidRegions = ["Greater", "Bay", "Area", "area", "Metro", "City"];
            const splittedRegion = region.split(' ');
            const province = splittedRegion
                                .filter(reg  => !invalidRegions.includes(reg) && len(reg))
                                .join(' ');

            const provinceData = cityTimezones.findFromCityStateProvince(province);

            if (len(provinceData)) timezone = setTimeZone(provinceData);
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
    const dateOfLead = now.toLocaleString('en-GB', {hour: 'numeric',   hour12: false, timeZone })

    return dateOfLead;
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
    
    const dateFromTimeZone = new Date();
    const timeDiff =  timeFromTz - (dateFromTimeZone.getHours());
    
    return timeDiff;
};

/**
 * 
 * Time difference and Timezone from a given location(country)
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
