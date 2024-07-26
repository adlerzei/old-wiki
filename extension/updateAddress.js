// updateAddress.js
// by Torma
// https://github.com/torma616
//
//
// This updates the URL on the webpage after
// the ?useskin=vector query has been applied,
// to bring us back to the good old days when
// Vector was default, as it should be.
//
'use strict';

(async () => {
  const browser = chrome;
  let hideQuery = true;

  /**
   * Called when the settings are loaded from the local storage.
   * 
   * @param {[key: string]: any} items The items from the local storage.
   */
  function onSettingsLoaded(items) {
    parseSettings(items);
    checkURL(hideQuery);
  }

  /**
   * Parses the items from the local storage to the global variables in this worker script.
   * 
   * @param {[key: string]: any} items The items from the local storage.
   */
  function parseSettings(items) {
    hideQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query : true;
  }

  /**
   * Processes the query string by removing the 'useskin=vector' parameter and updates the browser history.
   * 
   * @param {string} query The search string from the URL that needs to be processed.
   */
  function processQuery(query) {
    let search = query.replace(/(\?|&)useskin=vector(&|$)/, '$1').replace(/&$/, '');
    if (search === '?') {
      search = '';
    }
    updateBrowserHistory(search)
  }

  /**
   * Updates the browser history state with the new URL.
   * 
   * @param {string} search The updated search string part of the URL.
   */
  function updateBrowserHistory(search) {
    const { origin, pathname, hash } = window.location;
    window.history.replaceState(null, document.title, `${origin}${pathname}${search}${hash}`);
  }

  /**
   * Checks the current URL's search string to determine if it contains the 'useskin=vector' parameter.
   * If the parameter is present, it processes the query string to remove it.
   * 
   * @param {Boolean} isHidden Whether or not the query display is enabled via settings or not
   */
  function checkURL(isHidden) {
    let { search } = window.location;
    if (isHidden && search.includes('useskin=vector')) {
      processQuery(search)
    }
  }

  /**
   * Loads the current settings from local storage and processes the URL if needed.
   */
  await browser.storage.local.get(onSettingsLoaded);
})();