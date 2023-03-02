import { defineStore } from 'pinia';

import { computed, reactive, ref } from 'vue';
import { useSelectedCardStore } from './selectedCard';
import { useCardImageStore } from './cardImage';
import { shuffleArray } from '@/helpers/shuffle';

export const useCardDeckStore = defineStore('cardDeckStore', () => {
  const deck = ref<Card[]>([]); // stores duplicated cards for the game
  const cardList = ref<Card[]>([]); // stores unique cards

  const getKey = (image: APODImg) =>
    image.title.replace(/\s/g, '-').substring(0, 25);

  const totalCards = computed(() => deck.value.length);

  const matchedId = ref(-1);
  const lastMatch = computed(() => getCard(matchedId.value));

  const matchedCardsId = ref<number[]>([]);
  const matchedCards = computed(() =>
    matchedCardsId.value.map((cardId) => getCard(cardId))
  );

  function addCard(image: APODImg, opts = { addToList: false }) {
    const destination = opts.addToList ? cardList.value : deck.value;
    const card: Card = reactive({
      id: destination.length,
      image: image,
      key: getKey(image),
      isSelected: false,
      foundMatch: false,
    });

    destination.push(card);
  }

  function getCard(id: number) {
    return deck.value[id];
  }

  function toggleSelection(id: number) {
    getCard(id).isSelected = !getCard(id).isSelected;
  }

  function selectCard(id: number) {
    const card = getCard(id);
    if (card.isSelected || card.foundMatch) return;

    const selectedCardStore = useSelectedCardStore();

    card.isSelected = true;
    selectedCardStore.add(card);
  }

  function matchFound(idCardA: number, idCardB: number) {
    deck.value[idCardA].foundMatch = true;
    deck.value[idCardB].foundMatch = true;

    matchedId.value = idCardA;
    matchedCardsId.value.push(idCardA);
  }

  const initCardDeck = async (imagesCount: number) => {
    const cardImagesStore = useCardImageStore();

    await cardImagesStore.fetchImages();

    cardImagesStore.images.forEach((img) => addCard(img, { addToList: true }));

    const allImages: APODImg[] = shuffleArray(
      cardImagesStore.duplicateImages()
    );

    allImages.forEach((img) => addCard(img));
  };

  return {
    deck,
    cardList,
    initCardDeck,
    totalCards,
    addCard,
    toggleSelection,
    selectCard,
    matchFound,
    lastMatch,
    matchedCards,
  };
});
