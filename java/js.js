var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];

async function search(a){
   var t = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=674d9b9ac9bd4267880201217220806&q=${a}&days=3`);
    if(t.status == 200){
        var a = await t.json();
    }
    displayForecastDay(a);
    displayAnotherDay(a.forecast.forecastday);
}
document.getElementById("search").addEventListener("keyup",function(a){ return search(a.target.value)})

function displayForecastDay(a){
    var newDate = new Date(`${a.current.last_updated}`);
    let ForecastDay =`
        <div class="today forecast">
            <div class="forecast-header" id="today">
                <div class="day">${days[newDate.getDay()]}</div>
                <div class=" date">${newDate.getDate() + monthNames [newDate.getMonth()]}</div>
            </div>
            <div class="forecast-content" id="current">
                <div class="location">${a.location.name}</div>
                <div class="degree">
                    <div class="num">${a.current.temp_c}<sup>o</sup>C</div>
                    <div class="forecast-icon">
                        <img src="https://${a.current.condition.icon}" alt="" width="100">
                    </div>	
                </div>
                <div class="custom">${a.current.condition.text}</div>
                <span><img src="images/icon-umberella.png" alt="">${a.current.humidity}%</span>
                <span><img src="images/icon-wind.png" alt="">${a.current.wind_kph}km/h</span>
                <span><img src="images/icon-compass.png" alt="">East</span>
            </div>
        </div> `
   document.getElementById("forecastToday").innerHTML = ForecastDay;
}
function displayAnotherDay(a){
    let AnotherDay =``
    for(var d=1 ;d < a.length ;d++){
        AnotherDay +=`
        <div class="forecast col-md-6 col-sm-12">
            <div class="forecast-header">
                <div class="day">${days[new Date (a[d].date).getDay()]}</div>
                <div class=" date">${new Date (a[d].date).getDate() + monthNames [new Date (a[d].date).getMonth()]}</div>
            </div>
            <div class="forecast-content">
                <div class="forecast-icon">
                    <img src="https://${a[d].day.condition.icon}" alt="" width="48">
                </div>
                <div class="degree">${a[d].day.maxtemp_c}<sup>o</sup>C</div>
                <small>${a[d].day.mintemp_c}<sup>o</sup></small>
                <div class="custom">${a[d].day.condition.text}</div>
            </div>
        </div>`
    }
    document.getElementById("forecastAnotherDay").innerHTML = AnotherDay ;
}
search("mecca")