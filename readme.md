# NSS Weather App API

### Project Description 
#### Part 1
This exercise sends an API request to [OpenWeatherMap](http://openweathermap.org/API) using as primary parameter the five-digit zip code entered by the user. When the user clicks the `Show Current Weather` button, the current weather for the specified location displays as well as additional buttons for forecast options. Clicking one of these buttons initiates another `ajax` call to the OpenWeatherMap for forecast information, which then displays in a table format. 


#### Part 2
For Part 2, a user log-in screen displays on launch. Upon displaying forecasts the user has the option to save a selected day's forecast, and can click to view all saved forecasts. When saved forecasts are displayed the user can delete any selected forecast from the list. The saved forecasts are stored in firebase. Adding and deleting records to firebase are made via `ajax` statements to `POST` and `DELETE` respectively. 

#### Weather App API on Launch // PART 1
![Weather App API on Launch](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/screens/screens/Weather%20App%20on%20Launch.png)

#### Weather App | Current Weather // PART 1
![Weather App | Current Weather](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/screens/screens/Weather%20App%20%7C%20Current%20Weather.png)

#### Weather App | One-Day Forecast // PART 1
![Weather App | One-Day Forecast](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/screens/screens/Weather%20App%20%7C%20One-Day%20Forecast.png)

#### Weather App | Seven-Day Forecast // PART 1
![Weather App | Seven-Day Forecast](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/weather/screens/Weather%20App%20%7C%20Seven-Day%20Forecast.png)

#### Weather App | on Launch // PART 2
![Weather App Part 2 API on Launch](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/master/screens/Weather%20App2%20on%20Launch.png)

#### Weather App | Current Weather // PART 2
![Weather App Part 2 Current Weather](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/master/screens/Weather%20App2%20%7C%20Current%20Weather.png)

#### Weather App | Seven-Day Forecast // PART 2
![Weather App Part 2 Seven-Day Forecast](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/master/screens/Weather%20App2%20%7C%20Seven-Day%20Forecast.png)

#### Weather App | Saved Forecasts // PART 2
![Weather App Part 2 Saved Forecasts](https://raw.githubusercontent.com/SMITHsharon/weatherAppAPI/master/screens/Weather%20App2%20%7C%20Saved%20Forecasts.png)


### Project Specs // PART 1
Use the [OpenWeatherMap](http://openweathermap.org/API) API to build an application that meets the following criteria.

**given** a user wants to view weather information
**when** the user visits your initial view
**then** there should be an input field to accept a zip code value

**given** a user wants to view weather information
**when** the user visits your initial view
**then** there should be a submit button next to the zip code field

**given** a user has entered in some text into the zip code field
**when** the user presses the enter key
**or** the user clicks the submit button
**then** the value should be validated as a zip code (5 digit number)

**given** the user has entered a valid zip code
**when** the user presses the enter key
**or** clicks the submit button
**then** the current weather for the provided zip code should be displayed, which includes

1. Temperature
1. Conditions
1. Air pressure
1. Wind speed
1. An affordance to view the forecast for the current day, the next three days, or the next seven days

**given** the user is viewing the current forecast
**when** the user clicks on the link to view the 3 day forecast
**then** the current data (see above), and the data for the next three days should be displayed

**given** the user is viewing the current forecast
**when** the user clicks on the link to view the 7 day forecast
**then** the current data (see above), and the data for the next seven days should be displayed

#### Additional Implementation Notes
- Displays the forecast output in a table
- Tests the returned Precipitation forecast property, to determine that it exists
- Generates Date objects and formats Date output for the table rows for the forecast output
- Completed code does not have any Grunt errors.


### Project Specs // PART 2
**given** a user wants to view weather information
**when** the user visits your application
**then** they should be presented with an authentication mechanism that allows login email and password.

**given** a user wants to view weather information
**when** the user visits your initial view
**then** there should be social sharing buttons for Facebook and Twitter

**given** a user wants to save weather information
**when** the user visits your initial view
**then** there should be an affordance (e.g. a star or link) that allows them to save a day's forecast to their profile

**given** a user wants to view their saved forecasts
**when** the user performs a gesture on an element that clearly states its purpose is to view saved data
**then** the user should be shown a list of all of their saved forecasts

**given** a user wants to delete one of their saved forecasts
**when** the user performs a gesture on an element that clearly states its purpose is to delete saved data
**then** the data should be deleteted and the user should be shows the list of all their remaining forecasts

#### Additional Implementation Notes
- Changed the user navigation from input field and buttons on the screen, to a nav bar
- Added weather icons, grabbed from http://openweathermap.org/img/w/${iconCode}.icon


### Technologies Used
- `html`
- `css`; `SASS`
- `JavaScript`
- `ES6`
- `jQuery`
- `Bootstrap`
- firebase
- `Grunt`


### How To View The Screen 
```
git clone https://github.com/SMITHsharon/weatherAppAPI.git
cd weatherAppAPI
cd lib
bower install
npm install
http-server -p 8080
This will show in your browser at: http://localhost:8080
```


### Contributor
[Sharon Smith](https://github.com/SMITHsharon)

