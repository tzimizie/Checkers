const { firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch();
  const page = await browser.newPage();

  // Step 1: Navigate to the game page
  await page.goto('https://www.gamesforthebrain.com/game/checkers/');

  // Step 2: Confirm that the site is up
  const title = await page.title();
  if (title !== 'Checkers - Games for the Brain') {
    console.log('The site is not loading correctly.');
    await browser.close();
    return;
  }

  // Function to make a legal move as orange
  const makeMove = async (from, to) => {
    await page.click(`#square_${from}`);
    await page.click(`#square_${to}`);
    await page.click('#makeMove');
    await page.waitForTimeout(1000); // Wait for animation to complete
  };

  // Step 3: Make five legal moves as orange
  
    await makeMove(62, 53); 
    await makeMove(42, 33);
    await makeMove(22, 13);
    await makeMove(71, 62);
    await makeMove(31, 22);
  // Step 4: Restart the game
  await page.click('#restart');

  // Step 5: Confirm that restarting was successful
  const newTitle = await page.title();
  if (newTitle === 'Checkers - Games for the Brain') {
    console.log('Game has been successfully restarted.');
  } else {
    console.log('Game restart was not successful.');
  }

  // Close the browser
  await browser.close();
})();
