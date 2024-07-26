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

(async () => {
  const browser = chrome;
  const { hide_url_query: hideQuery } = await browser.storage.local.get('hide_url_query')
  const { origin, pathname, hash } = window.location;
  let { search } = window.location;

  if (hideQuery) {
    if (search.includes('useskin=vector')) {
      search = search
        .replace(/(\?|&)useskin=vector(&|$)/, '$1')
        .replace(/&$/, '');
      if (search === '?') {
        search = '';
      }
      window.history.replaceState(
        null,
        document.title,
        `${origin}${pathname}${search}${hash}`);
    }
  }
})();