# Old Wiki ![Logo](./extension/icons/logo_48.png) 

## What?
This is a extension for common web browsers coded using the WebExtensions API.

## Main Features
This extension simply changes Wikipedia interface to the old beautiful vector layout.

### How?
The extension simply adds "?useskin=vector" to the end of each HTTP request to use the old vector skin.

### Which browser to use?
The extension can be added into Chrome, Firefox and Opera.

#### Chrome Web Store
[Old Wiki at the Chrome Web Store]()

#### Firefox Add-ons (AMO)
[Old Wiki at AMO]()

### Important Notice
This is a third party extension and is not related to the Wikipedia developer team in any way.

## Contributing

### Developing
- `npm install` - Installs all dependencies.
- `npm run build` - Builds the Firefox (.xpi) and the Chrome/Opera (.zip) builds.

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