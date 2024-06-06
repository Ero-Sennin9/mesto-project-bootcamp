// variables for useful usage

let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let cover = document.querySelector('.cover');
let coverImage = cover.querySelector('.cover__image');
let coverText = cover.querySelector('.cover__text');
let coverClose = cover.querySelector('.cover__close');
let submitButton = popup.querySelector('.popup__button');
let addButton = document.querySelector('.profile__add-button');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let closePopup = popup.querySelector('.popup__close');
let cards = document.querySelector('.cards');
let inputs = popup.querySelectorAll('.popup__field');


// edit popup code

let popupEdit = {
    title: 'Редактировать профиль',
    placeholders: ['Имя', 'Описание'],
    button: 'Сохранить'
};

let popupAdd = {
    title: 'Новое место',
    placeholders: ['Название', 'Ссылка на картинку'],
    button: 'Создать'
};

function applyPopup(info) {
    popup.querySelector('.popup__title').textContent = info.title;
    for (let ind = 0; ind < inputs.length; ++ind) {
        inputs[ind].placeholder = info.placeholders[ind];
    }
    submitButton.textContent = info.button;
}

function GetName() {
    return name.textContent;
}

function GetDescription() {
    return description.textContent;
}

function editHandler(svt) {
    svt.preventDefault();
    name.textContent = inputs[0].value;
    description.textContent = inputs[1].value;
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', function () {
    applyPopup(popupEdit);
    inputs[0].value = GetName();
    inputs[1].value = GetDescription();
    submitButton.removeEventListener('click', addHandler);
    submitButton.addEventListener('click', editHandler);
    popup.classList.add('popup_opened');
});

closePopup.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

// liking cards code

function addLikeHandler(like) {
    like.addEventListener('click', function () {
        like.classList.toggle('card__like_active');
    });
}

// deleting cards code
function addDeleteHandler(trash) {
    trash.addEventListener('click', function () {
        let deletedCard = trash.closest('.card');
        deletedCard.remove();
    });
}

// default cards objects

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// adding cover of image
function addImageHandler(object, url, description) {
    object.addEventListener('click', function () {
        coverImage.src = url;
        coverText.textContent = description;
        coverImage.alt = description;
        cover.classList.add('cover_opened');
    });
}

coverClose.addEventListener('click', function () {
    cover.classList.remove('cover_opened');
});


// adding default cards to html

function addCard(cardInfo) {
    // creating card node
    let card = document.createElement('article');
    card.classList.add('card');

    let image = document.createElement('img');
    image.classList.add('card__image');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;

    addImageHandler(image, cardInfo.link, cardInfo.name);

    let info = document.createElement('div');
    info.classList.add('card__info');

    let text = document.createElement('h2');
    text.classList.add('card__text');
    text.textContent = cardInfo.name;

    let button = document.createElement('button');
    button.classList.add('card__like');
    button.type = 'button';
    addLikeHandler(button);

    let trash = document.createElement('button');
    trash.classList.add('card__delete');
    trash.type = 'button';
    addDeleteHandler(trash);

    // constructing and adding card
    info.append(text, button);
    card.append(image, info, trash);
    cards.prepend(card);
}

for (let ind = 0; ind < initialCards.length; ++ind) {
    let currInfo = initialCards[ind];
    addCard(currInfo);
}

// adding card code

function addHandler(svt) {
    svt.preventDefault();
    addCard({name: inputs[0].value, link: inputs[1].value});
    popup.classList.remove('popup_opened');
}

addButton.addEventListener('click', function () {
    applyPopup(popupAdd);
    inputs[0].value = '';
    inputs[1].value = '';
    submitButton.removeEventListener('click', editHandler);
    submitButton.addEventListener('click', addHandler);
    popup.classList.add('popup_opened');
});





