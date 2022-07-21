
// scroll
const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// menu hamburger
const ham = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const body = document.body;

ham.addEventListener('click', () => {
	menu.classList.toggle('active');
    ham.classList.toggle('active');
    body.classList.toggle('disable_scroll');
});

menu.addEventListener("click",function(e) {

  if((e.target) && (e.target.nodeName == "LI" || e.target.nodeName == "A" || 
  e.target.classList.contains('menu__overlay'))){
      this.classList.remove('active');
      body.classList.remove('disable_scroll');
      ham.classList.remove('active');
  }
});

//import
import arrayPets from '../js/pets.js';
const petPhoto = document.querySelectorAll('.pets__photo');
const petName = document.querySelectorAll('.pets__name');
const btnSlider = document.querySelectorAll('.btn_slider');
const cards = document.querySelectorAll('.pets__card');
const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');
const slider = document.querySelector('.pets__slider');

const petsStart = () => {
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = arrayPets[i].img;
        petName[i].innerHTML = arrayPets[i].name;
        btnSlider[i].dataset.pet = arrayPets[i].name;
        cards[i].dataset.pet = arrayPets[i].name;
        //petPhoto[i].dataset.pet = arrayPets[i].name;
        //petName[i].dataset.pet = arrayPets[i].name;
    }
};
petsStart();
console.log(arrayPets);

// slider
let first = 0;
let last = petPhoto.length - 1;
const nextSlide = () => {
    if (last + 1 === arrayPets.length) {
        first = 0;
    } else {
        first = last + 1;
    }
    for(let i = 0; i < petPhoto.length; i++){
        if (last + 1 === arrayPets.length) {
            last = 0;
        } else {
            last++;
        }
        showPets (i, last);
    }
    //slider.classList.add('transition-right');
};
next.addEventListener('click', nextSlide);

const prevSlide = () => {
    if (first - 1 < 0) {
        last = 0;
    } else {
        last = first - 1;
    }
    for(let i = 0; i < petPhoto.length; i++){
        if (first - 1 < 0) {
            first = arrayPets.length - 1;
        } else {
            first--;
        }
        showPets (i, first);
    }
    //slider.classList.add('transition-left');
};
prev.addEventListener('click', prevSlide);
const showPets = (indexPet, index) => {
    petPhoto[indexPet].src = arrayPets[index].img;
    petName[indexPet].innerHTML = arrayPets[index].name;
    btnSlider[indexPet].dataset.pet = arrayPets[index].name;
    //cards[indexPet].dataset.pet = arrayPets[index].name;
    //petPhoto[indexPet].dataset.pet = arrayPets[index].name;
    //petName[indexPet].dataset.pet = arrayPets[index].name;
};

//popap
const btnClose = document.querySelector('.btn_modal');
const modal = document.querySelector('.pets__cover');

const getPetsInfo = (e) => {
    modal.classList.add('active');
    body.classList.add('disable_scroll');
    for (let i = 0; i < arrayPets.length; i++){
        if(e.target.dataset.pet === arrayPets[i].name) {
            document.querySelector('.pets__modal_photo').src = arrayPets[i].img;
            document.querySelector('.pets__name_modal').innerHTML = arrayPets[i].name;
            document.querySelector('.pets__breed').innerHTML = arrayPets[i].breed;
            document.querySelector('.pets__descr').innerHTML = arrayPets[i].description;
            document.querySelector('.pets__age').innerHTML = arrayPets[i].age;
            document.querySelector('.pets__inoculations').innerHTML = arrayPets[i].inoculations;
            document.querySelector('.pets__diseases').innerHTML = arrayPets[i].diseases;
            document.querySelector('.pets__parasites').innerHTML = arrayPets[i].parasites;
        }
    }   
};  
cards.forEach(card => {
    card.addEventListener('click', getPetsInfo);
});
btnSlider.forEach(btn => {
    btn.addEventListener('click', getPetsInfo);
});

const closeModal = () => {
    modal.classList.remove('active');
    body.classList.remove('disable_scroll');
};    
btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);
