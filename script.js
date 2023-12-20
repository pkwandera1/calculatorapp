let backspace = document.querySelector('#backspace');
let clear = document.querySelector('#clear');
let percent = document.querySelector('#percent');
let bracket = document.querySelector('#bracket');
let devide = document.querySelector('#devide');
let seven = document.querySelector('#seven');
let eight = document.querySelector('#eight');
let nine = document.querySelector('#nine');
let times = document.querySelector('#times');
let four = document.querySelector('#four');
let five = document.querySelector('#five');
let six = document.querySelector('#six');
let minus = document.querySelector('#minus');
let one = document.querySelector('#one');
let two = document.querySelector('#two');
let three = document.querySelector('#three');
let negative = document.querySelector('#negative');
let plus = document.querySelector('#plus');
let zero = document.querySelector('#zero');
let point = document.querySelector('#point');
let equals = document.querySelector('#equals'); 


let arr = [7, 8, 9]
function add (arr) {
   let sum = 0;
   for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
   }
   return sum;
}
console.log(add(arr));


const displayParagraph = document.querySelector('.screen-display');
seven.addEventListener("click", () => displayParagraph.innerHTML += '7');

backspace.addEventListener("click", () => {
    let currentContent = displayParagraph.innerHTML;
    displayParagraph.innerHTML = currentContent.slice(0, -1); 
});

clear.addEventListener("click", () => displayParagraph.innerHTML = "");
