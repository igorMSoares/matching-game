import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCardDeckStore } from './cardDeck';

export const useSelectedCardStore = defineStore('selectedCardStore', () => {
  const cardDeckStore = useCardDeckStore();
  const selectedCards = ref<Card[]>([]);

  function add(card: Card) {
    if (!card.isSelected) return;

    const totalSelected = selectedCards.value.length;

    if (totalSelected === 1) {
      const cardA = selectedCards.value[0];
      if (match(card, cardA)) cardDeckStore.matchFound(card.id, cardA.id);
    } else if (totalSelected === 2) {
      clear();
    }

    selectedCards.value.push(card);
  }

  function match(cardA: Card, cardB: Card) {
    return cardA.key === cardB.key;
  }

  function clear() {
    selectedCards.value.forEach((card) =>
      cardDeckStore.toggleSelection(card.id)
    );
    selectedCards.value = [];
  }

  return { add, match, clear };
});
