import { test } from '../../../src/test-runner';
import { helpers } from '../../../src/helpers';

/**
 * Checks whether Control+Shift+Z redoes the last action for multiline text.
 */
test(__filename, async({ page }) => {
  const table = page.locator(helpers.selectors.mainTable);

  await table.waitFor();

  const tbody = table.locator(helpers.selectors.mainTableBody);

  const cell = tbody.locator(helpers.findCell({ row: 1, column: 1, cellType: 'td' }));

  await cell.click();
  await cell.press('Enter');

  const cellEditor = table.locator(helpers.findCellEditor());

  await cellEditor.waitFor();
  await cellEditor.press('Control+Enter');
  await cellEditor.press('Control+Enter');
  await cellEditor.press('Control+Enter');

  await cell.press('Control+Z');
  await cell.press('Control+Z');
  await cell.press('Control+Shift+Z');

  await page.screenshot({ path: helpers.screenshotPath() });

  await cell.press('Control+Shift+Z');

  await page.screenshot({ path: helpers.screenshotPath() });
});
