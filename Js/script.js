const dropList = document.querySelectorAll('.drop-list select'),
fromCurrency = document.querySelector('.from select'),
toCurrency = document.querySelector('.to select'),
getButton = document.querySelector('form button');

const apiKey = '9ac34d4082cccb134ef70bba';

for(let i = 0; i < dropList.length; i++){
 for(currency_code in country_code){
  //selecting USD by default as FROM currency and NPR as TO currency
  let selected;
  if (i == 0){
   selected = currency_code == 'USD' ? 'selected' : '';
  }else if(i == 1){
   selected = currency_code == 'NPR' ? 'selected' : '';
  }
  //creating option tag with passing currency code as a text and value
  let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
  //inserting options tags inside select tag
  dropList[i].insertAdjacentHTML('beforeend', optionTag);
 }
 dropList[i].addEventListener('change', e =>{
  loadFlag(e.target); //calling loadFlag with passing target element as an argument
 });
}

function loadFlag(element){
 for(code in country_code){
  if(code == element.value){//if currency code of country list is equal to option value
   let imgTag = element.parentElement.querySelector('img');//selecting a particular img tag of particular drop list
   //passing country code of a selected currency code in a img url
    imgTag.src = `https://flagcdn.com/48x36/${country_code[
      code
    ].toLowerCase()}.png`;
  }
 }
}

window.addEventListener('load', () =>{
 getExchangeRate();
}); 

getButton.addEventListener('click', e =>{
 e.preventDefault(); /*preventing form from submitting */
 getExchangeRate();
});

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click', () =>{
 let tempCode = fromCurrency.value;//temporary currency code of FROM drop list
 fromCurrency.value = toCurrency.value;//passing TO currency code to FROM currency code
 toCurrency.value = tempCode;//passing temporary currency code to TO currency code
 loadFlag(fromCurrency);//calling loadFlag with passing selected element (fromCurrency) of  FROM
 loadFlag(toCurrency);//calling loadFlag with passing selected element (toCurrency) of TO
getExchangeRate();
});

function getExchangeRate(){
  const amount = document.querySelector(".amount input"),
  exchangeRateTxt = document.querySelector('.exchange-rate');
  let amountVal = amount.value;
  /*if user does not enter any value or enters 0, then we'll put 1 value by default in the input field*/
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangeRateTxt.innerText = 'Getting exchange rate...';
  let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
  /*fetching api response and returning it with parsing into js obj and in another then method recieving that obj*/
  fetch(url).then(response => response.json()).then(result => {
   let exchangeRate = result.conversion_rates[toCurrency.value];
  console.log(exchangeRate);
  //multiplying user entered value with selected TO currency rate
  let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
  console.log(totalExchangeRate);
  exchangeRateTxt.innerText =`${amountVal} ${fromCurrency.value} = ${totalExchangeRate}   ${toCurrency.value}`;
  //console.log(result)
  }).catch(() =>{//if user is offline or any other error occurred while fetching data then catch function will run
   exchangeRateTxt.innerText = 'Something went wrong';
  });
}

//the apikey
//9ac34d4082cccb134ef70bba

//example request
//https://v6.exchangerate-api.com/v6/9ac34d4082cccb134ef70bba/latest/USD
//https://www.countryflags.io/us/flat/64.png
//https://www.countryflags.com/us/flat/64.png