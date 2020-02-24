var background_transition = document.querySelector(".background-transition");
var home_button = document.querySelector("#btn-back");

home_button.addEventListener("click", ()=>{
    background_transition.style.transform = "translateY(0)";
});