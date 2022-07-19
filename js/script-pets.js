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
const petPhoto = document.querySelectorAll('.pets__photo');
const petName = document.querySelectorAll('.pets__name');
const btnCard = document.querySelectorAll('.btn_catalog');
const cards = document.querySelectorAll('.pets__card');

import arrayPets from '../js/pets.js';
const petsStart = () => {
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = arrayPets[i].img;
        petName[i].innerHTML = arrayPets[i].name;
        btnCard[i].dataset.pet = arrayPets[i].name;
        cards[i].dataset.pet = arrayPets[i].name;
        //petPhoto[i].dataset.pet = arrayPets[i].name;
        //petName[i].dataset.pet = arrayPets[i].name;
    }
};
petsStart();
console.log(arrayPets);
console.log(petPhoto[1].src);
console.log(arrayPets[1].img);

// popap
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
btnCard.forEach(btn => {
    btn.addEventListener('click', getPetsInfo);
});

const closeModal = () => {
    modal.classList.remove('active');
    body.classList.remove('disable_scroll');
};    
btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);

//Pagination
const btns = document.querySelectorAll('.btn_nav');
const prev = document.querySelector('.btn_prev');
const next = document.querySelector('.btn_next');
const doublePrev = document.querySelector('.btn_doublePrev');
const doubleNext = document.querySelector('.btn_doubleNext');
const btnNumber = document.querySelector('.btn_number');
let index = 1;

const navigationChange = (i) => {
    if (i > 1) {
        btns.forEach(btn => {
            btn.classList.remove('inactive');
        });
    }
    if (i > 5) {
        next.classList.add('inactive');
        doubleNext.classList.add('inactive');
    }
    if (i == 1) {
        prev.classList.add('inactive');
        doublePrev.classList.add('inactive');
        next.classList.remove('inactive');
        doubleNext.classList.remove('inactive');
    }
};
navigationChange(index);

const indexPlus = (i) => {
   navigationChange(index += i);
};

const nextPage = () => {
    let lastCard = arrayPets[arrayPets.length - 1];
    arrayPets.pop();
    arrayPets.unshift(lastCard);
    indexPlus(1);
    if (index > 6) {
        index = 6;
        return;
    }
    btnNumber.innerHTML = index;
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = arrayPets[i].img;
        petName[i].innerHTML = arrayPets[i].name;
        btnCard[i].dataset.pet = arrayPets[i].name;
        cards[i].dataset.pet = arrayPets[i].name;
    }
};

const prevPage = () => {
    let firstCard = arrayPets[0];
    arrayPets.shift();
    arrayPets.push(firstCard);
    indexPlus(-1);
    if (index < 1) {
        index = 1;
        return;
    }
    btnNumber.innerHTML = index;
    for(let i = 0; i < petPhoto.length; i++){
        petPhoto[i].src = arrayPets[i].img;
        petName[i].innerHTML = arrayPets[i].name;
        btnCard[i].dataset.pet = arrayPets[i].name;
        cards[i].dataset.pet = arrayPets[i].name;
    }
};

next.addEventListener('click', nextPage);
prev.addEventListener('click', prevPage);

doubleNext.addEventListener('click', function() {
    const petsStart = () => {
        for(let i = 5; i < petPhoto.length; i++){
            petPhoto[i].src = arrayPets[i - 5].img;
            petName[i].innerHTML = arrayPets[i - 5].name;
            btnCard[i].dataset.pet = arrayPets[i - 5].name;
            cards[i].dataset.pet = arrayPets[i - 5].name;
        }
        for(let i = 0; i < 5; i++){
            petPhoto[i].src = arrayPets[i + 3].img;
            petName[i].innerHTML = arrayPets[i + 3].name;
            btnCard[i].dataset.pet = arrayPets[i + 3].name;
            cards[i].dataset.pet = arrayPets[i + 3].name;
        }
    };
    petsStart();
    index = 6;
    btnNumber.innerHTML = index;
    navigationChange(index);
});
doublePrev.addEventListener('click', function() {
    const petsStart = () => {
        for(let i = 0; i < petPhoto.length; i++){
            petPhoto[i].src = arrayPets[i].img;
            petName[i].innerHTML = arrayPets[i].name;
            btnCard[i].dataset.pet = arrayPets[i].name;
            cards[i].dataset.pet = arrayPets[i].name;
        }
    };
    petsStart();
    index = 1;
    btnNumber.innerHTML = index;
    navigationChange(index);
});
