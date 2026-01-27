const { test, expect, describe, beforeEach, } = require('@playwright/test')

describe('Blog App', () => {
  beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByRole('button', { name: 'login' })
    await expect(locator).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByRole('textbox').first().fill('erik99')
    await page.getByRole('textbox').last().fill('holahola');
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('Blogs')).toBeVisible();
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('textbox').first().fill('erik99')
      await page.getByRole('textbox').last().fill('holahola');
      await page.getByRole('button', { name: 'login' }).click();
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create new blog' }).click()

      await page.getByTestId('title').fill('hola')
      await page.getByTestId('author').fill('erik')
      await page.getByTestId('url').fill('qqqqqq')

      await page.getByRole('button', { name: 'Submit blog' }).click()
      await expect(page.getByText('Blog added!')).toBeVisible()
    })
  })

})

