import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useCardDeckStore } from './cardDeck';

export const useSelectedCardStore = defineStore('selectedCardStore', () => {
  const cardDeckStore = useCardDeckStore();
  const selectedCards = ref<Card[]>([]);

  function add(card: Card) {
    if (!card.isSelected) return;

    if (totalSelected.value === 1) {
      const cardA = selectedCards.value[0];
      if (match(card, cardA)) cardDeckStore.matchFound(card.id, cardA.id);
      else
        setTimeout(() => {
          if (totalSelected.value === 2) clear();
        }, 500);
    } else if (totalSelected.value === 2) {
      clear();
    }

    selectedCards.value.push(card);
  }

  const totalSelected = computed(() => selectedCards.value.length);

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
