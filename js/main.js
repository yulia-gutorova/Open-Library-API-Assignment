
//************************************************************ 
//------------------- getArrayOfAllCountries -----------------
//************************************************************
async function getArrayOfAllCountries(){
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
    return allCountries;     
  }
  catch (error) 
  {
      console.log(error)
  }
}
//-----------------------------------------------------------------

//************************************************************ 
// Create an array with available countries when DOM content loaded
//************************************************************
document.addEventListener("DOMContentLoaded", async function() {
  //getArrayOfAllCountries()
  allCountries = await getArrayOfAllCountries();
});
//------------------------------------------------------------


const menuBtns =document.getElementsByClassName("menubtn");

//Create arrays of buttons with the same functions from main and dropdown mwnu
let btnsArrayGetAllCountries = [menuBtns[0], menuBtns[5]];
let btnsArrayIsHoliday = [menuBtns[1], menuBtns[6]];
let btnsArrayPublicHolidays = [menuBtns[2], menuBtns[7]];
let btnsArrayGetBorderCountries = [menuBtns[3], menuBtns[8]];

const divElement = document.getElementById('contentDiv');
const BASE_URL = "https://date.nager.at/api/v3/";


//************************************************************ 
//----------------- Get all available countries --------------
//************************************************************


btnsArrayGetAllCountries.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    let current_base_url = BASE_URL + "AvailableCountries"
    
    divElement.innerHTML = "";
  
    try 
    {
      const res = await fetch(current_base_url);
      if (res.ok === false) {
          throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
      }     
      const data = await res.json();
      //Invoke function availableCountries() and add HTML-content into divElement
      divElement.innerHTML = availableCountries();
      
      let ul = document.getElementById("countries");
      //Create li-elements and add them into ul-element
      for (let country of data){   
          let liText = country.name  + " = " + country.countryCode;
          ul.innerHTML += lis(liText);     
      } 
      //Show HTML-element with class .content
      $(".content").show(1000)
    }
    catch (error) 
    {
        console.log(error)
    }
    })
})


//-------------------------------------------------------------

//************************************************************ 
//------------------- Is today a public holiday ------------
//************************************************************

btnsArrayIsHoliday.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
  
    divElement.innerHTML = "";
  
    //Invoke a function to choose country
    divElement.innerHTML = isPublicHolidayInputForm();
  
    let $form = document.querySelector("#input-form");
    let p = document.getElementById("string-content");
    let select = document.getElementById("country");
  
    //Create a  dropdown list with all available countries
    for (let country of allCountries){
      select.innerHTML += dropdownOptions(country)
    }
  
    // Event listenet for submit form
    $form.addEventListener('submit', async function(event) {
      event.preventDefault();
  
      //Get selected dropdown option and extract a coutry code
      let country = select.options[select.selectedIndex].value;
      let myArray =country.split("=")
      let countryCode = myArray[1].trim().toLowerCase();
  
      //Define request URL 
      let current_base_url = BASE_URL + "IsTodayPublicHoliday/" + countryCode;
  
      try 
      {
        const res = await fetch(current_base_url);

        if (res.ok === false) {         
            throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
        }
        
        //Send text in p-element depends on responce code
        switch (res.status)
        {
          case 200:
            //Add text into p-element
            p.innerText = "Congratulations! Today is a public holiday in this country!"
            break;
          case 204:
            p.innerText = "Sorry! Today is not a public holiday in this country!"
            break;
          case 400:
            p.innerText = "Sorry! Validation failure!"
            break;
          case 404:
            p.innerText = "Sorry! CountryCode is unknown!"
            break;
        }      
      }
      catch (error) 
      {
          console.log(error)
      }
    }) 
  }) 
})


//************************************************************ 
//------------------- Public holidays in Year ------------
//************************************************************

btnsArrayPublicHolidays.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
  
    divElement.innerHTML = "";
  
    //Invoke a function to choose a country and a year
    divElement.innerHTML = publicHolidaysInYear();
  
    let $form = document.querySelector("#input-form");
    let input = document.getElementById("year");
    let select = document.getElementById("country");
    let ul = document.getElementById("date-holiday");
    
    //Create a  dropdown list with all available countries
    for (let country of allCountries){
      select.innerHTML += dropdownOptions(country)
    }
  
    //Event listener for submit form
    $form.addEventListener('submit', async function(event) {
      event.preventDefault();
      $("#holiday-content").hide(); 
      ul.innerHTML = "";
  
      //Get selected dropdown option and extract a coutry code
      let country = select.options[select.selectedIndex].value;
      let myArray =country.split("=")
      let countryCode = myArray[1].trim().toLowerCase();
      let year = input.value;
  
      //Define request URL 
      let current_base_url = BASE_URL + "PublicHolidays/" + year +"/" + countryCode;
    
      try 
      {
        const res = await fetch(current_base_url);
        if (res.ok === false) {
            throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
        }     
        const data = await res.json();
  
        //Create a list with dates and hilidays
        for (d of data){
          let liText = d["date"]  + " - " + d["name"];
          ul.innerHTML += lis(liText); 
        } 
        //Show content 
         $("#holiday-content").show(1000);         
      }
      catch (error) 
      {
         ul.innerHTML = lis("Sorry! Validation failure! Try to choose a later year.");
         $("#holiday-content").show(1000);
        //console.log(error)
      }
    })  
  }) 
  
})


//************************************************************ 
//----------------------- Border countries -------------------
//************************************************************
btnsArrayGetBorderCountries.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
  
    divElement.innerHTML = "";

    //Invoke function to choose counry and show info
    divElement.innerHTML = countryInfo();
  
    let $form = document.querySelector("#input-form");
    let div = document.querySelector(".country-info");
    let select = document.getElementById("country");
  
    //Create a dropdown meny
    for (let country of allCountries){
      select.innerHTML += dropdownOptions(country)
    }
  
    //Listener for submit form
    $form.addEventListener('submit', async function(event) {
      event.preventDefault();
      $(".country-info").hide();
      
      //Get selected country and extract a country code
      let country = select.options[select.selectedIndex].value;
      let myArray =country.split("=")
      let countryCode = myArray[1].trim().toLowerCase();
      let borderCoutnries = [];
  
      //Define request URL
      let current_base_url = BASE_URL + "CountryInfo/" + countryCode;
  
      try 
      {
        const res = await fetch(current_base_url);
        if (res.ok === false) {
            throw new Error(`HTTP error code: ${res.status}, HTTP error message: ${response.statusText}`);
        }  

        const data = await res.json();
        
        if (data.borders.length == 0){
          borderCoutnriesToString = "The country has no land borders";
        }else{
        //Creare an array with border countries
        for (let d of data.borders){
          borderCoutnries.push(d["commonName"]);
        }
  
        //Array to string
        borderCoutnriesToString = borderCoutnries.join(', ');       
      }
        //Show country info  
        div.innerHTML = divCountryInfo(data, borderCoutnriesToString);
        $(".country-info").show(1000);
      }
      catch (error) 
      {
          console.log(error)
      }
    }) 
  }) 
})
