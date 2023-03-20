// import App from './module/app'

// const app =new App();

// Text Animation Code
const text =document.querySelector('.logo-text');
const strText=text.textContent;
const spitText= strText.split("");
text.textContent="";

 
for (let i=0; i<spitText.length; i++){

    text.innerHTML+="<span>" + spitText[i] + "</span>"
}

let char=0;
let timer=setInterval(onTick,50);

function onTick(){
    const span=text.querySelectorAll('span')[char];
    span.classList.add('fade-logo');
    char++;
    if(char === spitText.length){ 
        complete();
         return;
        }
}
function complete(){
    clearInterval(timer);
    timer=null;
}