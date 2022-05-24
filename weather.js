
const timeel=document.getElementById('time');
const dateel=document.getElementById('date');

var latitudes;
var longitudes;
const days=['Sunday','Monday','Tuesday','Wednesday','Thiursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
setInterval(()=>{

    const time=new Date();
    const minutes=time.getMinutes();
    const hours=time.getHours();
    const hoursin12=hours>=13?hours%12:hours;
    const ampm=hours>=12?'PM':'AM';
    const day=time.getDay();
    const month=time.getMonth();
    const date=time.getDate();
    timeel.innerHTML=(hoursin12<10?"0"+hoursin12:hoursin12)+":"+(minutes<10?"0"+minutes:minutes)+" "+'<span id="am-pm">'+ampm+'</span>';
    dateel.innerHTML=days[day]+','+date+" "+months[month];
   },1000);

   navigator.geolocation.getCurrentPosition(go);
function go(ek)
{
     latitudes=ek.coords.latitude;
     longitudes=ek.coords.longitude;
     $('#country').html(latitudes.toFixed(4)+"N  "+longitudes.toFixed(4)+"E");
     var key="5b10829af4bba6febd75dc5785fd1259";
    $.get("https://api.openweathermap.org/data/2.5/onecall?lat="+latitudes+"&lon="+longitudes+"&appid="+key+"",lnd);

}

function lnd(data)
{
    
    let{humidity,pressure,wind_speed,sunrise,sunset}=data.current;
    $("#time-zone").html(data.timezone);
   $("#hum").html(humidity);
   $("#pre").html(pressure+" hPa");
   $("#speed").html(wind_speed+" m/s");
   $("#sunrise").html(window.moment(sunrise*1000).format('HH:mm a'));
   $("#sunset").html(window.moment(sunset*1000).format('HH:mm a'));

    let other='';
    data.daily.forEach((day,idx)=>{

        if(idx==0)
        {

            $("#dayname").html(window.moment(day.dt*1000).format('ddd'));
            $("#current-temp").attr('src','http://openweathermap.org/img/wn/'+day.weather[0].icon+'@2x.png');
            $("#nig").html("Night-"+((day.temp.night)-273.15).toFixed(2)+"&#176;C");
            $("#da").html("Day-"+((day.temp.day)-273.15).toFixed(2)+"&#176;C");
        }
        else{
            other+=`
           <div class="weather-forecast-item">

           <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
           <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather-icon" class="w-icon">
           
           <div class="temp">Night-${(day.temp.night-273.15).toFixed(2)}&#176;C</div>
           <div class="temp">Day-${(day.temp.day-273.15).toFixed(2)}&#176;C</div>
     
         </div>
         `}
      
    });    
    $("#weather-forecast").append(other);
}

