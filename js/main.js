/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

//----------------------- HTML elements -----------------------
const isPublicHolidayInputForm = function() { 
  return ` 
  <form id="input-form""> 
      <h2>Choose country</h2>

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


const publicHolidaysInYear = function(data) { 
  return ` 
  <form id="input-form""> 
      <h2>Enter year and choose a country</h2>

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
        
      <div id="holiday-content">
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

/* const card = function(name, ul) { 
  return `  
  <div class="single-post-wrapper">
    <div class="single-post">
      <h2 class="card-title">${name}</h2>
      <div class="content">        
        <ul id='books-content'></ul>         
      </div>
      <hr>
      <div class="card-action">
        <button class="show-content menubtn">Get hint</button>         
      </div>
    </div>
  </div> 
  `
} */

const availableCountries = function(name, ul) { 
  return `  
  <div class="single-post-wrapper">
    <div class="single-post">
      <h2 class="card-title">All available countries</h2>
      <div class="content">        
        <ul id='countries'></ul>         
      </div>
    </div>
  </div> 
  `
}

const lis = function(liText) { 
  return `  
   <li>${liText}</li>
  `
}

const dropdownOptions = function(country) { 
  return ` 
    <option value="${country}">${country}</option>
  `
}

const divCountryInfo = function(data){

}

/* async function getArrayOfAllCountries(){
  console.log("In function getArrayOfAllCountries");
  let allCountries = [];

  try {
    const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    if (res.ok === false) {
        throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
    }     
    const data = await res.json();

    
    for (let country of data){   
        let liText = country.name  + " = " + country.countryCode;
        allCountries.push(liText);   
    } 
    console.log("All countries in function");
    console.log(allCountries);
    return allCountries;     
  }
  catch (error) 
  {
      console.log(error)
  }

} */

const countryInfo = function(data) { 
  return ` 
  <form id="input-form""> 
      <h2>Choose country</h2>

      <div class="input-field">
        <label for="country">Choose a country:</label>
        <select name="country" id="country">

        </select> 
      </div>
      <div class="country-info">
            <h2>Angola</h2>
            <h4>officialName: Principality of Andorra</h4>
            <h5>countryCode</h5>
            <h5>Region</h5>
            <p>Borders</p>
      </div>
      <hr>
    </div>
    <div class="submit-form">
      <button class="submit">Find</button>
    </div>
  </form>
  `
}
//-------------------------------------------------------------

const menuBtns =document.getElementsByClassName("menubtn");
console.log(menuBtns);
const divElement = document.getElementById('contentDiv');
const BASE_URL = "https://date.nager.at/api/v3/";


/* for (let button of menuBtns){
  button.addEventListener('click', actionFunction);
} */

//************************************************************ 
//------------------- Get all available countries ------------
//************************************************************

menuBtns[0].addEventListener('click', async ()=>{
  console.log("Get all available countries");
  let current_base_url = BASE_URL + "AvailableCountries"
  divElement.innerHTML = "";

  try {
    const res = await fetch(current_base_url);
    if (res.ok === false) {
        throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
    }     
    const data = await res.json();

    divElement.innerHTML = availableCountries();

    let ul = document.getElementById("countries");

    for (let country of data){   
        let liText = country.name  + " = " + country.countryCode;
        ul.innerHTML += lis(liText);     
    }     
  }
  catch (error) 
  {
      console.log(error)
  }

  })
//-------------------------------------------------------------

//************************************************************ 
//------------------- Is today a public holiday ------------
//************************************************************

menuBtns[1].addEventListener('click', async ()=>{
  console.log("Is today a public holiday");
  let allCountries = [];

  try {
    const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    if (res.ok === false) {
        throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
    }     
    const data = await res.json();

    
    for (let country of data){   
        let liText = country.name  + " = " + country.countryCode;
        allCountries.push(liText);   
    }      
  }
  catch (error) 
  {
      console.log(error)
  }


  divElement.innerHTML = "";
  divElement.innerHTML = isPublicHolidayInputForm();

  let $form = document.querySelector("#input-form");
 // let input = document.getElementById("code");
  let p = document.getElementById("string-content");
  let select = document.getElementById("country");
 
  console.log("select");
  console.log(select);

  for (let country of allCountries){
    console.log(country);
    select.innerHTML += dropdownOptions(country)
  }

  $form.addEventListener('submit', async function(event) {
    event.preventDefault();
    let country = select.options[select.selectedIndex].value;
    let myArray =country.split("=")
    let countryCode = myArray[1].trim().toLowerCase();

     let current_base_url = BASE_URL + "IsTodayPublicHoliday/" + countryCode;
    const res = await fetch(current_base_url);

    switch (res.status){
      case 200:
        p.innerText = "Congratulations! Today is a public holiday!"
        break;
      case 204:
        p.innerText = "Sorry! Today is not a public holiday!"
        break;
      case 400:
        p.innerText = "Sorry! Validation failure!"
        break;
      case 404:
        p.innerText = "Sorry! CountryCode is unknown!"
        break;
    }
 
  }) 

}) 



//************************************************************ 
//------------------- Public holidays in Year ------------
//************************************************************

menuBtns[2].addEventListener('click', async ()=>{
  console.log("Is today a public holiday");
  //------------------------------------------------------
   let allCountries = [];

  try {
    const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    if (res.ok === false) {
        throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
    }     
    const data = await res.json();

    
    for (let country of data){   
        let liText = country.name  + " = " + country.countryCode;
        allCountries.push(liText);   
    }      
  }
  catch (error) 
  {
      console.log(error)
  } 
//------------------------------------------------------

  divElement.innerHTML = "";
  divElement.innerHTML = publicHolidaysInYear();

  let $form = document.querySelector("#input-form");
  let input = document.getElementById("year");
  let select = document.getElementById("country");
  let ul = document.getElementById("date-holiday");
  

  for (let country of allCountries){
    console.log(country);
    select.innerHTML += dropdownOptions(country)
  }


  $form.addEventListener('submit', async function(event) {
    event.preventDefault();


    console.log("form event listener");
    let country = select.options[select.selectedIndex].value;
    console.log("Country code");
    console.log(country);
    let myArray =country.split("=")
    console.log(myArray);
    let countryCode = myArray[1].trim().toLowerCase();
    console.log(countryCode);
    let year = input.value;
    console.log(year);

   let current_base_url = BASE_URL + "PublicHolidays/" + year +"/" + countryCode;
    console.log(current_base_url);


    try {
      const res = await fetch(current_base_url);
      if (res.ok === false) {
          throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
      }     
      const data = await res.json();
      console.log(data);

      for (d of data){
        console.log(d["date"]);
        let liText = d["date"]  + " - " + d["name"];
        console.log(liText);
        ul.innerHTML += lis(liText); 
      }  
           
    }
    catch (error) 
    {
        console.log(error)
    }

  $(".submit").hide();
  })  

}) 


//************************************************************ 
//----------------------- Border countries -------------------
//************************************************************

menuBtns[3].addEventListener('click', async ()=>{
  console.log("Is today a public holiday");
  let allCountries = [];

  try {
    const res = await fetch("https://date.nager.at/api/v3/AvailableCountries");
    if (res.ok === false) {
        throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
    }     
    const data = await res.json();

    
    for (let country of data){   
        let liText = country.name  + " = " + country.countryCode;
        allCountries.push(liText);   
    }      
  }
  catch (error) 
  {
      console.log(error)
  }


  divElement.innerHTML = "";
  divElement.innerHTML = countryInfo();

  let $form = document.querySelector("#input-form");
 // let input = document.getElementById("code");
  let div = document.querySelector(".country-info");
  let select = document.getElementById("country");
 
  console.log("select");
  console.log(select);

  for (let country of allCountries){
    console.log(country);
    select.innerHTML += dropdownOptions(country)
  }

  $form.addEventListener('submit', async function(event) {
    event.preventDefault();
    let country = select.options[select.selectedIndex].value;
    let myArray =country.split("=")
    let countryCode = myArray[1].trim().toLowerCase();

     let current_base_url = BASE_URL + "CountryInfo/" + countryCode;
    const res = await fetch(current_base_url);
    const data = await res.json();

    console.log(data);
    
  }) 
 

}) 