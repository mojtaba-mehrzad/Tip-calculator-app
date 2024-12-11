
const tipButtons = document.querySelectorAll('.tip-button')
const billInput = document.getElementById('bill')
const numberOfPeople = document.getElementById('people')
const totalAmount = document.getElementById('totalAmount-number')
const tipAmount =document.getElementById('tipAmount-number')
const resetButton = document.getElementById('ResetButton')
const dataInputs = document.querySelectorAll('#bill , #people');
const customTip =document.getElementById('CustomTip')

let resetActive = false;


/////// start error message ///////
const renderError = (inputName)=>{
    document.getElementById([inputName]+'Error').classList.add('error');
    document.getElementById([inputName]).classList.add('input-error');
}

const handelChange= (e)=>{
    if(e.target.value > 0){
        e.target.classList.remove('input-error');
        document.getElementById([e.target.name]+'Error').classList.remove('error');
    }
}
/////// end error message ///////


/////// start validation ///////
const validations ={
    bill : (value) => value > 0,
    people: (value) => value > 0,
}

const dataIsValid = (key, value, validations) => {
    if(!validations[key]) return true;
    return validations[key](value);
}

const inputsIsValid = (validations) => {
    let isValid = true;
    for (const element of dataInputs) {
        const inputName = element.getAttribute('name');
        const inputValue = element.value;
        if(!dataIsValid(inputName,inputValue, validations)) {
            isValid = false;
            renderError(inputName); 
        }
    }
    return isValid;
}
/////// end validation ///////


/////// start reset button ///////
function activatingResetButton(resetActive){
    if(resetActive){
        resetButton.removeAttribute('disabled')
        resetButton.classList.add('active')
    }else{
        resetButton.setAttribute('disabled' , "")
        resetButton.classList.remove('active')
    }
}

const handleReset = ()=>{
    resetActive = false;
    billInput.value = "";
    numberOfPeople.value = "";
    customTip.value = "";
    tipAmount.innerText = '0.00';
    totalAmount.innerText = '0.00';
    deactiveTipButton()
    activatingResetButton(resetActive)
}
/////// end reset button ///////


/////// start tip button and custom tip ///////
const activatingTipButton = (e)=>{
    let current = document.getElementsByClassName("active");
    if(current.length > 0){current[0].classList.remove("active")}
    e.target.className += " active";
}

function deactiveTipButton(){
    for (const element of tipButtons) {
        if(element.className.includes('active')){
        element.classList.remove('active')
        }
    }
}

const handelCustomTip = (e)=>{
    if(inputsIsValid(validations)) {
        const customTipValue = parseFloat(e.target.value / 100) || 0;
        resetActive = true;
        calculator(customTipValue);
        activatingResetButton(resetActive);
        deactiveTipButton()
    } 
}

const handleClick = (e)=>{
    resetActive = true;
    let tipValue = e.target.value;
    if(inputsIsValid(validations)) {
        activatingTipButton(e);
        calculator(tipValue);
        activatingResetButton(resetActive);
      } else {
        return null;
      }
}
/////// end tip button and custom tip ///////


///////// start calculator /////////
const showCalculations = (totalCalculation , tipCalculation)=>{
    totalAmount.innerText = totalCalculation;
    tipAmount.innerText = tipCalculation;
}

const calculator = (tip)=>{
    let bill = Number(billInput.value);
    let people = Number(numberOfPeople.value);
    let totalCalculation = ((tip*bill)+bill)/people;
    let tipCalculation = tip*bill/people;
    showCalculations(totalCalculation.toFixed(2) , tipCalculation.toFixed(2))
}
///////// end calculator /////////


///////// start add events /////////
resetButton.addEventListener("click" , handleReset )

for (const element of tipButtons) {
    element.addEventListener( "click" , handleClick )
}

for (const element of dataInputs) {
    element.addEventListener("input", handelChange)
}

customTip.addEventListener("input" , handelCustomTip)
///////// end add events /////////
