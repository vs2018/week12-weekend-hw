const app = function (){
  const url = "https://restcountries.eu/rest/v2/all"
  makeRequest(url, requestComplete)
}

const makeRequest = function (url, callback){
  const request = new XMLHttpRequest()
  request.open("GET", url)
  request.addEventListener("load", callback)
  request.send()
}

const requestComplete = function(){
  const response = JSON.parse(this.responseText)
  populateLanguageDropdown(response)
}

const populateLanguageDropdown = function(data){
  const result = []
  for(i = 0; i < data.length; i++){
    if(result.indexOf(data[i].languages[0].name) === -1 || result.indexOf(data[i].languages[0].name) === i){
      const select = document.querySelector("#language-dropdown")
      const option = document.createElement('option')
      option.innerText = data[i].languages[0].name
      select.appendChild(option)
      result.push(data[i].languages[0].name)
    }
  }

  const select = document.querySelector("#language-dropdown")
  select.addEventListener('change', function(){
    populateColumnChart(data, this.value)
  })
}

const populateColumnChart = function(data, selectedLanguage){

  chartTitle = selectedLanguage + " information"

  const populations = []
  const countries = []

  data.forEach(function(country){
    if(country.languages[0].name === selectedLanguage){
      countries.push(country.name)
      populations.push(country.population)
    }
  })

  const container = document.querySelector('#column-chart')
  const chart = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: container
    },
    title: {
      text: chartTitle
    },
    series: [{
      name: "Countries",
      data: populations}],
    xAxis: {
      name: "Population",
      categories: countries
    }
  })


}



document.addEventListener('DOMContentLoaded', app)
