import { defineStore } from 'pinia';

import { computed, reactive, ref } from 'vue';
import { useSelectedCardStore } from './selectedCard';
import { useCardImageStore } from './cardImage';
import { shuffleArray } from '@/helpers/shuffle';

export const useCardDeckStore = defineStore('cardDeckStore', () => {
  const deck = ref<Card[]>([]);

  const getKey = (image: APODImg) =>
    image.title.replace(/\s/g, '-').substring(0, 25);

  const totalCards = computed(() => deck.value.length);

  const matchedId = ref(-1);
  const lastMatch = computed(() => getCard(matchedId.value));

  function addCard(image: APODImg) {
    const card: Card = reactive({
      id: deck.value.length,
      image: image,
      key: getKey(image),
      isSelected: false,
      foundMatch: false,
    });

    deck.value.push(card);
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
  }

  const initCardDeck = async (imagesCount: number) => {
    const cardImagesStore = useCardImageStore();

    await cardImagesStore.fetchImages();

    const allImages: APODImg[] = shuffleArray(
      cardImagesStore.duplicateImages()
    );

    allImages.forEach((img) => addCard(img));
  };

  return {
    deck,
    initCardDeck,
    totalCards,
    addCard,
    toggleSelection,
    selectCard,
    matchFound,
    lastMatch,
  };
});
