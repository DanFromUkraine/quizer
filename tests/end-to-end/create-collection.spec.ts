import { test, expect } from "@playwright/test";

const COLLECTION_TITLE_EX_VAL = "Some example value for collection title";

test.describe("This tests bundle will describe collection creation process", () => {
  test("When user sets title, page reload must not earase it", async ({
    page,
  }) => {
    await page.goto("/main/add-collection");
    const titleInput = page.getByTestId("collection-title-input");
    await titleInput.focus();
    await titleInput.fill(COLLECTION_TITLE_EX_VAL);
    expect(titleInput).toHaveValue(COLLECTION_TITLE_EX_VAL);
    await page.reload();
    await page.waitForTimeout(300);
    await titleInput.focus();
    expect(titleInput).toHaveValue(COLLECTION_TITLE_EX_VAL);
    // expect(2).toBe(2);
  });
});
