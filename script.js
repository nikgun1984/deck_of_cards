// Part 1

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

// axios
//     .get(`${BASE_URL}/new/shuffle/?deck_count=1`)
//     .then(deck => {
//         const deckID = deck.data.deck_id;
//         console.log(deckID);
//         return axios.get(`${BASE_URL}/${deckID}/draw/?count=1`);
//     })
//     .then(card => {
//         console.log(card.data);
//         console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
//     })
//     .catch(err => {
//         console.log(`Oops, there was a problem :( ${err}`);
//     });

// Part 2

// axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
//     .then(deck => {
//         const deckID = deck.data.deck_id;
//         return axios.get(`${BASE_URL}/${deckID}/draw/?count=1`);
//     })
//     .then(card1 => {
//         console.log(`Card 1 is ${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
//         return axios.get(`${BASE_URL}/${card1.data.deck_id}/draw/?count=1`);
//     })
//     .then(card2 => {
//         console.log(`Card 2 is ${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
//     })
//     .catch(err => {
//         console.log(`Oops, there was a problem :( ${err}`);
//     });

// Part 3
let deckID;
axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
    .then(deck => {
        deckID = deck.data.deck_id;
        return axios.get(`${BASE_URL}/${deckID}/draw/?count=1`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    });
let count = 0;
let currentRotation = 0;
document.querySelector("#simple-form").addEventListener("submit", function (evt) {
    evt.preventDefault();
    axios.get(`${BASE_URL}/${deckID}/draw/?count=1`)
        .then(card1 => {
            if (card1.data.remaining) {
                console.log(card1.data.cards[0].image);
                const div = document.createElement('div');
                div.setAttribute('class', 'child center');
                count = count + 1;
                currentRotation = Math.floor(Math.random() * 360);
                div.setAttribute('id', `card${count}`);
                document.querySelector(".parent").appendChild(div);
                const img = document.createElement('IMG');
                document.querySelector(`#card${count}`).style.transform = 'rotate(' + currentRotation + 'deg)';
                img.setAttribute("src", card1.data.cards[0].image);
                document.querySelector(`#card${count}`).appendChild(img);
            } else {
                document.querySelector("button#button").disabled = true;
            }
        })
        .catch(err => {
            console.log(`Oops, there was a problem :( ${err}`);
        });
})