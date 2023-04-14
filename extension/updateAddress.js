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
if (document.location.search === '?useskin=vector') {
  window.history.replaceState(
    null, 
    document.title, 
    `${document.location.origin}${document.location.pathname}${document.location.hash}`
    )
}