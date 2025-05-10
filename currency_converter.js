
const BASE_URL ="https://api.currencyapi.com/v3/latest?apikey=cur_live_GhP1Cdc20BNqfJI35GhJoXfiI43xcMjfXowX6NCs";
 
const dropdowns = document.querySelectorAll(".dropdown select");
const Btn = document.querySelector("form button"); 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
// const CountryLists = document.querySelectorAll(".countryList")

for(let select of dropdowns){
for (CurrCode in CountryList){
    //console.log(CurrCode,  CountryList[CurrCode]);
   let newOption = document.createElement("option");
    newOption.innerText = CurrCode;
   newOption.value = CurrCode;
   if(select.name === "from" && CurrCode === "USD"){
     newOption.selected = true;
   } else if(select.name === "to" && CurrCode === "INR"){
    newOption.selected = true;
}
select.append(newOption);
}
select.addEventListener("change",(Event) => {
    uppdateFlag(Event.target);
})
}
 const uppdateFlag = (element) =>{
 let CurrCode = element.value;
 let Countrycode = CountryList[CurrCode];
 let newsrc = `https://flagsapi.com/${ Countrycode}/flat/64.png`;
 let img = element.parentElement.querySelector("img");
 img.src = newsrc
//  console.log(CurrCode);
 };
 Btn.addEventListener("click", async (event) => {
    

    event.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if( amtVal ==="" ||  amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
      //console.log(fromCurr.value ,toCurr.value);
    //    const URL =`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    //  let response = await fetch(URL);
    //  let data = await response.json();
    // let rate = data[toCurr.value.toLowerCase()];
    //  console.log(rate);






      try {
    const url = `${BASE_URL}&base_currency=${fromCurr.value}`;
    const response = await fetch(url);
    const data = await response.json();

    const rate = data.data[toCurr.value].value;
    const finalAmount = (amtVal * rate).toFixed(2);

    document.querySelector(".msg").innerText = 
      `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    alert("Failed to fetch currency data. Please try again.");
  }
});
    