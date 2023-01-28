import { defineStore } from 'pinia';
import type { W } from 'vitest/dist/types-71ccd11d';
import { computed, reactive, ref } from 'vue';
import { useSelectedCardStore } from './selectedCard';

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

  return {
    deck,
    totalCards,
    addCard,
    toggleSelection,
    selectCard,
    matchFound,
    lastMatch,
  };
});
