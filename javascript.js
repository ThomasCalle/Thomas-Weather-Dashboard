var searchInputEl=document.getElementById("search-input")
var searchButtonEl=document.getElementById("search-button")
var apiKey="4019261bd78cd50daccdfd0a8e4719ed"
function getLocation(city){
var locationUrl="http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apiKey
fetch(locationUrl).then(function(data){
return data.json()


}).then(function(data){
    console.log(data)
    
    
    })
    }







searchButtonEl.addEventListener("click",function(){
var searchInput=searchInputEl.value
console.log(searchInput)
getLocation(searchInput)

})