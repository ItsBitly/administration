const manufacturerPage = require('administration/page-objects/sw-manufacturer.page-object.js');

module.exports = {
    '@tags': ['product', 'manufacturer-edit', 'manufacturer', 'edit'],
    'navigate to manufacturer module and click on add manufacturer': (browser) => {
        browser
            .openMainMenuEntry('#/sw/product/index', 'Product', '#/sw/manufacturer/index', 'Manufacturer')
            .assert.urlContains('#/sw/manufacturer/index')
            .waitForElementPresent('.sw-button__content')
            .click('.sw-button__content');
    },
    'create first manufacturer': (browser) => {
        const page = manufacturerPage(browser);
        page.createBasicManufacturer('MAN-U-FACTURE');
    },
    'check if new manufacturer exists in overview': (browser) => {
        browser
            .openMainMenuEntry('#/sw/product/index', 'Product', '#/sw/manufacturer/index', 'Manufacturer')
            .waitForElementPresent('.sw-button__content')
            .assert.urlContains('#/sw/manufacturer/index')
            .assert.containsText('.smart-bar__header', 'Manufacturer')
            .waitForElementVisible('.sw-grid-row:first-child .sw-context-button__button')
            .assert.containsText('.sw-grid-row:first-child', 'MAN-U-FACTURE');
    },
    'open manufacturer details and change the given data': (browser) => {
        browser
            .waitForElementPresent('.sw-sidebar__navigation .sw-sidebar-navigation-item')
            .click('.sw-sidebar__navigation .sw-sidebar-navigation-item')
            .waitForElementVisible('.sw-grid-row:first-child .sw-context-button__button')
            .click('.sw-grid-row:first-child .sw-context-button__button')
            .waitForElementVisible('.sw-context-menu')
            .click('.sw-context-menu .sw-context-menu-item__text')
            .waitForElementNotPresent('.sw-loader')
            .waitForElementVisible('.smart-bar__header h2:not(.sw-manufacturer-detail__empty-title)')
            .assert.containsText('.smart-bar__header', 'MAN-U-FACTURE')
            .fillField('input[name=name]', 'Minnie\'s Haberdashery')
            .fillField('input[name=link]', 'https://google.com/doodles')
            .fillField('.ql-editor', 'Schnell den langen Text austauschen, sodass es keiner mitbekommt!','editor')
            .click('.sw-manufacturer-detail__save-action')
            .checkNotification('Manufacturer "Minnie\'s Haberdashery" has been saved successfully.')
            .click('.sw-button__content');
    },
    after: (browser) => {
        browser.end();
    }
};
