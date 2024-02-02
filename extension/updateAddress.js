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

let queryString = document.location.search;

if (queryString.includes('useskin=vector')) {
    queryString = queryString.replace(/(|&)useskin=vector(&|)/, '');
    if (queryString === '?') {
        queryString = '';
    }
  window.history.replaceState(
    null, 
    document.title, 
    `${document.location.origin}${document.location.pathname}${queryString}${document.location.hash}`
    )
}