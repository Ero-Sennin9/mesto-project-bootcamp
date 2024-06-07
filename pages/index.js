// variables for useful usage

// popup elements
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditButton = popupEdit.querySelector('.popup__button');
const popupEditInputFirstname = popupEdit.querySelector('.popup__field_type_firstname');
const popupEditInputDescription = popupEdit.querySelector('.popup__field_type_description');
const popupEditClose = popupEdit.querySelector('.popup__close');


const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = popupAdd.querySelector('.popup__button');
const popupAddInputName = popupAdd.querySelector('.popup__field_type_name');
const popupAddInputLink = popupAdd.querySelector('.popup__field_type_link');
const popupAddClose = popupAdd.querySelector('.popup__close');

const popupCover = document.querySelector('.popup_type_image');
const popupCoverClose = popupCover.querySelector('.popup__close');
const popupCoverImage = popupCover.querySelector('.popup__image');
const popupCoverText = popupCover.querySelector('.popup__text');

// main page elements
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const cards = document.querySelector('.cards');

// adding card to page

// adding cover of image
function addImageHandler(image, url, description) {
    image.addEventListener('click', function () {
        popupCoverImage.src = url;
        popupCoverImage.alt = description;
        popupCoverText.textContent = description;
        openPopup(popupCover);
    });
}

function createCard(cardInfo) {
    let cardTemplate = document.querySelector('#card-template').content;
    let cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    let image = cardItem.querySelector('.card__image');
    image.src = cardInfo.link;
    image.alt = cardInfo.name;
    addImageHandler(image, cardInfo.link, cardInfo.name);

    let text = cardItem.querySelector('.card__text');
    text.textContent = cardInfo.name;

    let button = cardItem.querySelector('.card__like');
    addLikeHandler(button);

    let trash = cardItem.querySelector('.card__delete');
    addDeleteHandler(trash);

    return cardItem;
}

function addCard(cardInfo) {
    cards.prepend(createCard(cardInfo));
}

// submit buttons listeners

popupEditButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    name.textContent = popupEditInputFirstname.value;
    description.textContent = popupEditInputDescription.value;
    closePopup(popupEdit);
});

popupAddButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    addCard({name: popupAddInputName.value, link: popupAddInputLink.value});
    closePopup(popupAdd);
});

// edit popup code

function getName() {
    return name.textContent;
}

function getDescription() {
    return description.textContent;
}


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closePopup(popup);
        }
    });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closePopup(popup);
        }
    });
}

popupEditClose.addEventListener('click', function () {
    closePopup(popupEdit);
});

popupAddClose.addEventListener('click', function () {
    closePopup(popupAdd);
});

popupCoverClose.addEventListener('click', function () {
    closePopup(popupCover);
});


editButton.addEventListener('click', function () {
    popupEditInputFirstname.value = getName();
    popupEditInputDescription.value = getDescription();
    openPopup(popupEdit);
});

addButton.addEventListener('click', function () {
    popupAddInputName.value = '';
    popupAddInputLink.value = '';
    openPopup(popupAdd);
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

// adding default cards to html

for (let ind = 0; ind < initialCards.length; ++ind) {
    let currInfo = initialCards[ind];
    addCard(currInfo);
}




