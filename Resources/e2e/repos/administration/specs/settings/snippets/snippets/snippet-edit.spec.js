const settingsPage = require('administration/page-objects/module/sw-settings.page-object.js');

module.exports = {
    '@tags': ['settings', 'snippet-edit', 'snippets', 'snippets', 'edit'],
    '@disabled': !global.flags.isActive('next717'),
    before: (browser, done) => {
        global.SnippetFixtureService.setSnippetFixtures().then(() => {
            done();
        });
    },
    'open snippet module': (browser) => {
        browser
            .openMainMenuEntry({
                targetPath: '#/sw/settings/snippet/index',
                mainMenuId: 'sw-settings',
                subMenuId: 'sw-settings-snippet'
            });
    },
    'open snippet set': (browser) => {
        const page = settingsPage(browser);

        browser
            .expect.element('.sw-settings-snippet-set-list__edit-set-action').to.not.be.enabled;
        browser
            .tickCheckbox(`${page.elements.gridRow}--1 .sw-field__checkbox input`, true)
            .expect.element('.sw-settings-snippet-set-list__edit-set-action').to.be.enabled;

        browser
            .click('.sw-settings-snippet-set-list__edit-set-action')
            .expect.element(page.elements.smartBarHeader).to.have.text.that.contains('Snippets of "BASE en_GB"');
    },
    'verify snippet to be edited': (browser) => {
        const page = settingsPage(browser);

        browser
            .expect.element(`${page.elements.gridRow}--0 .sw-settings-snippet-list__column-name`).to.have.text.that.equals(global.SnippetFixtureService.snippetFixture.translationKey);
    },
    'edit snippet': (browser) => {
        const page = settingsPage(browser);

        browser
            .clickContextMenuItem('.sw-settings-snippet-list__edit-action', page.elements.contextMenuButton, `${page.elements.gridRow}--0`)
            .expect.element(page.elements.smartBarHeader).to.have.text.that.equals(global.SnippetFixtureService.snippetFixture.translationKey);

        browser
            .fillField('.sw-settings-snippet-detail__translation-field--1 input[name=sw-field--snippet-value]', 'Mine yours theirs', true)
            .click('.sw-snippet-detail__save-action')
            .waitForElementNotPresent(page.elements.loader)
            .checkNotification(`Snippet for "${global.SnippetFixtureService.snippetFixture.translationKey}" has been saved successfully.`);

    },
    'verify changed snippet': (browser) => {
        const page = settingsPage(browser);

        browser
            .click(page.elements.smartBarBack)
            .expect.element(`${page.elements.gridRow}--0`).to.have.text.that.contains('Mine yours theirs');
    },
    after: (browser) => {
        browser.end();
    }
};