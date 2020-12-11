// Part 1

const BASE_URL = 'https://deckofcardsapi.com/api/deck';

axios
    .get(`${BASE_URL}/new/shuffle/?deck_count=1`)
    .then(deck => {
        const deckID = deck.data.deck_id;
        console.log(deckID);
        return axios.get(`${BASE_URL}/${deckID}/draw/?count=1`);
    })
    .then(card => {
        console.log(card.data);
        console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    });

// Part 2

axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
    .then(deck => {
        const deckID = deck.data.deck_id;
        return axios.get(`${BASE_URL}/${deckID}/draw/?count=1`);
    })
    .then(card1 => {
        console.log(`Card 1 is ${card1.data.cards[0].value} of ${card1.data.cards[0].suit}`);
        return axios.get(`${BASE_URL}/${card1.data.deck_id}/draw/?count=1`);
    })
    .then(card2 => {
        console.log(`Card 2 is ${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log(`Oops, there was a problem :( ${err}`);
    });