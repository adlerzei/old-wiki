# Old Wiki ![Logo](./extension/icons/logo_32.png) 

## What?
This is a extension for common web browsers coded using the WebExtensions API.

## Main Features
This extension simply changes the Wikipedia user interface to the beautiful old vector layout. It is also applied to the other international Wikimedia pages.

Supported [Wikimedia projects](https://meta.wikimedia.org/wiki/Our_projects):
- Wikipedia
- Wiktionary
- Wikiquote
- Wikibooks
- Wikisource
- Wikispecies
- Wikinews
- Wikiversity
- Wikivoyage
- Wikimedia Commons
- Wikidata
- MediaWiki
- Meta-Wiki
- Wikimedia Incubator
- Wikimedia Cloud Services

### How?
The extension simply adds "?useskin=vector" to the end of each HTTP request to use the old vector skin.

### Which browser to use?
The extension can be added into Chrome, Edge, Brave and Opera. Unfortunately, Firefox is not supported because Firefox does not currently support the delarativeNetRequest API. Nevertheless, we are releasing Firefox-compatible builds so that you can use the extension as soon as Mozilla adds support for delarativeNetRequest to Firefox.

#### Chrome Web Store
[Old Wiki at the Chrome Web Store](https://chrome.google.com/webstore/detail/old-wiki/cphagceemhgokfclmbnkpfkmchbfnclb)

<!-- #### Firefox Add-ons (AMO)
[Old Wiki at AMO]() -->

### Important Notice
This is a third party extension and is not related to the Wikipedia developer team in any way.

## Contributing

### Developing
- `npm install` - Installs all dependencies.
- `npm run build` - Builds the Firefox (.xpi) and the Chrome (.zip) builds.

### How to test?
1. Run `npm install` once at the beginning of your development.
2. Load the extension in your browser.

In Chrome: 
- go to `chrome://extensions`
- activate developer mode 
- then
    - click `load unpacked extension` 
    - load the `/extension` folder 
- or
    - drag & drop the Chrome build file from `/builds` into the tab.

In Firefox:
- go to `about:debugging`
- then
    - load `extension/manifest.json`
- or
    - load the Firefox build file from `/builds`.

### Donations
If you like my work, you can support me via [PayPal](https://www.paypal.me/ChristianZei/5). Thank you!

## Acknowledgements
Thanks to everyone using, supporting and contributing to the extension.

## What's new?

##### v1.0
- Append "?useskin=vector" to the end of each HTTP request.

##### v1.1
- Apply the vector skin to the remaining international Wikimedia pages:
    - Wiktionary
    - Wikiquote
    - Wikibooks
    - Wikisource
    - Wikispecies
    - Wikinews
    - Wikiversity
    - Wikivoyage
    - Wikimedia Commons
    - Wikidata
    - MediaWiki
    - Meta-Wiki
    - Wikimedia Incubator
    - Wikimedia Cloud Services

##### v1.2
- A popup was added to activate or deactivate the vector skin.

##### v1.3
- Fix popup font size for Windows
