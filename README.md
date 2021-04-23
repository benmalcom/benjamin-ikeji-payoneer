## Running the project

* Clone the repository
* Install dependencies with `yarn install`
* Visit [localhost:3000](localhost:3000) after successful dependencies installation


### Running the tests

#### 
To run the test type `yarn test` in the project root


### IMPORTANT INFORMATION!

#### 
This project uses the openweathermap API which fetches a 3-hourly forecast for the next 5days (today inclusive), 
consequently we have 40 forecasts returned on every request, this 40 forecasts is spread over the next 5days, 
which means we get 8 forecasts per day, however when we make this requests at a time that is not morning (that is, afternoons, evenings, or nights) openweathermap will
not return the 8 forecasts for that day since the day is technically no more complete, instead the unreturned forecasts 
will be spilled over to the sixth day, hence due to this anomaly we end up having a sixth day forecast when we open 
the app around these times (afternoons, evenings, or nights), this also means that the BarChart will display fewer (or even one) bar(s) when the 
first day forecast is selected on this abnormal days.