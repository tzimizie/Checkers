const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Step 1: Navigate to https://deckofcardsapi.com/
    await page.goto('https://deckofcardsapi.com/');

    // Step 2: Confirm the site is up
    const title = await page.title();
    if (title !== 'Deck of Cards API') {
      console.log('The site is not loading correctly.');
      return;
    }

    // Step 3: Get a new deck
    await page.click('text=Get a New Deck');
    await page.waitForSelector('text=Cards Remaining: 52');

    // Step 4: Shuffle the deck
    await page.click('text=Shuffle Deck');
    await page.waitForSelector('text=Shuffle Complete');

    // Step 5: Deal three cards to each of two players
    const player1Cards = await page.locator('.card').take(3);
    const player2Cards = await page.locator('.card').take(3);

    // Step 6: Check whether either has blackjack
    const hasBlackjack = (cards) => {
      const values = cards.map((card) => card.innerText().trim());
      return (
        (values.includes('Ace') && values.includes('10')) ||
        (values.includes('Ace') && values.includes('Jack')) ||
        (values.includes('Ace') && values.includes('Queen')) ||
        (values.includes('Ace') && values.includes('King'))
      );
    };

    // Step 7: If either has blackjack, write out which one does
    if (hasBlackjack(player1Cards)) {
      console.log('Player 1 has blackjack!');
    } else if (hasBlackjack(player2Cards)) {
      console.log('Player 2 has blackjack!');
    } else {
      console.log('Neither player has blackjack.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await browser.close();
  }
})();
