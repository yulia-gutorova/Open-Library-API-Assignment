//************************************************************ 
//----------------- availableCountries function --------------
//************************************************************
const availableCountries = function(name, ul) { 
  return `  
  <div class="single-post-wrapper">
    <div class="single-post">
      <h2 class="card-title">All available countries</h2>
      <div class="content" style="display:none;">        
        <ul id='countries'></ul>         
      </div>
    </div>
  </div> 
  `
}

//************************************************************ 
//------------- isPublicHolidayInputForm function ------------
//************************************************************
const isPublicHolidayInputForm = function() { 
    return ` 
    <form id="input-form""> 
        <h2>Choose a country to know is today a public holiday there:</h2> 
        <div class="input-field">
          <label for="country">Choose a country:</label>
          <select name="country" id="country">  
          </select> 
        </div>  
        <p id="string-content"></p>  
        <hr>
      </div>
      <div class="submit-form">
        <button class="submit">Find</button>
      </div>
    </form>
    `
  }

//************************************************************ 
//--------------- publicHolidaysInYear function --------------
//************************************************************
const publicHolidaysInYear = function(data) { 
  return ` 
  <form id="input-form""> 
      <h2>Enter year and choose a country to get a list of holidais:</h2> 
      <div class="input-field holidayYear">  
        <div>
          <label for="year">Input year:</label>
          <input id="year" type="text" class="input-field" required> 
        </div>
        <div>
          <label for="country">Choose a country:</label>
          <select name="country" id="country"> 
          </select> 
        </div>
      </div>         
      <div id="holiday-content" style="display:none;">
        <ul id='date-holiday'> </ul> 
      </div>
      <hr>
    </div>
    <div class="submit-form">
      <button class="submit">Find</button>
    </div>
  </form>
  `
}

//************************************************************ 
//--------------------- countryInfo function -----------------
//************************************************************
const countryInfo = function(data) { 
  return ` 
  <form id="input-form""> 
      <h2>Choose a country to get information about it:</h2>

      <div class="input-field">
        <label for="country">Choose a country:</label>
        <select name="country" id="country">

        </select> 
      </div>
      <div class="country-info" style="display:none;">

      </div>
      <hr>
    </div>
    <div class="submit-form">
      <button class="submit">Find</button>
    </div>
  </form>
  `
}

//************************************************************ 
//------------------------------ lis -------------------------
//************************************************************
const lis = function(liText) { 
  return `  
    <li>${liText}</li>
  `
}
  
//************************************************************ 
//---------------------- dropdownOptions ---------------------
//************************************************************
const dropdownOptions = function(country) { 
  return ` 
    <option value="${country}">${country}</option>
  `
}
  
//************************************************************ 
//----------------------- divCountryInfo ---------------------
//************************************************************
const divCountryInfo = function(data, borderCoutnriesToString){
  return ` 
  <h2><span>Country name:   </span>${data["commonName"]}</h2>
  <h3><span>Official name: </span>${data["officialName"]}</h3>
  <h3><span>Country code: </span>${data["countryCode"]}</h3>
  <h4><span>Region: </span>${data["region"]}</h4>
  <p><span>Border countries: </span>${borderCoutnriesToString}</p>
  `
}

