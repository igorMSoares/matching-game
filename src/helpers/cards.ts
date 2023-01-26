import { shuffleArray } from './shuffle';

const generateCards = (images: APODImg[], imagesCount: number): APODImg[] => {
  const cards: APODImg[] = Array(imagesCount * 2);

  let cardIndex = 0;
  for (let i = 0; i < imagesCount; i++) {
    cards[cardIndex] = images[i];
    cards[++cardIndex] = images[i];
    cardIndex++;
  }

  shuffleArray(cards);
  return cards;
};

const generateCardKey = (image: APODImg) =>
  image.title.replace(/\s/g, '-').substring(0, 25);

const showImage = (card: HTMLElement) => {
  const cardImage = card.firstChild as HTMLElement;
  cardImage.classList.toggle('hidden');
};

const hideImage = (image: HTMLElement) => {
  image.classList.toggle('hidden');
};

const selectedCards: Array<{ id: string; key: string }> = [];

const checkMatch = (key: string) => {
  if (selectedCards.length === 0) return false;

  if (selectedCards[0].key === key) return true;
};

const getCardKey = (card: HTMLElement) => card.id.replace(/_\d+$/, '');

const selectCard = (card: HTMLElement) => {
  selectedCards.push({ id: card.id, key: getCardKey(card) });
  card.setAttribute('selected-card', 'true');
};

const clearSelectedCards = () => {
  while (selectedCards.length > 0) {
    const card = selectedCards.pop();
    if (card)
      document.getElementById(card.id)?.removeAttribute('selected-card');
  }
};

const hideVisibleCards = () => {
  for (const card of selectedCards) {
    const cardImage = document.getElementById(card.id)?.firstChild;
    if (cardImage) hideImage(cardImage as HTMLElement);
  }
};

const matchHandler = () => {
  for (const card of selectedCards) {
    const cardElement = document.getElementById(card.id);
    if (cardElement) {
      cardElement.setAttribute('matched', 'true');

      const cardImage = cardElement.firstChild;
      if (cardImage) (cardImage as HTMLElement).classList.toggle('hidden');
    }
  }
  clearSelectedCards();
};

const getCardIndex = (elementId: string) =>
  elementId.match(/\d+$/)?.at(0) ?? null;

const cardSelectionHandler = (card: HTMLElement) => {
  if (
    card.tagName === 'IMG' ||
    card.getAttribute('selected-card') ||
    card.getAttribute('matched')
  )
    return null;

  showImage(card);

  const totalCardsSelected = selectedCards.length;
  if (totalCardsSelected === 0) {
    selectCard(card);
  } else if (totalCardsSelected === 1) {
    selectCard(card);
    if (checkMatch(getCardKey(card))) {
      matchHandler();
      return parseInt(getCardIndex(card.id) ?? '');
    }
  } else if (totalCardsSelected === 2) {
    hideVisibleCards();
    clearSelectedCards();
    selectCard(card);
  }

  return null;
};

export { generateCards, cardSelectionHandler, generateCardKey };
