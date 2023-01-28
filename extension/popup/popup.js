"use strict";

//for compatibility reasons
var browser = chrome;

var vectorSkinActivation = true;

var vectorSkinActivationSwitch = document.getElementById("vectorSkinActivationSwitch");

// load stored settings from local storage
browser.storage.local.get((items) => {
	vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation : true;

	vectorSkinActivationSwitch.checked = vectorSkinActivation;
	vectorSkinActivationSwitch.addEventListener("change", activationSwitchChanged);
});

/**
 * Changes the activation status.
 */
function activationSwitchChanged() {
	// apply skin or not
	vectorSkinActivation = vectorSkinActivationSwitch.checked;
	browser.storage.local.set({vector_skin_activation: vectorSkinActivationSwitch.checked});
}

/**
 * Returns the current browser name.
 *
 * @returns {string} - The browser's name.
 */
function getBrowser() {
	// Opera 8.0+
	let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

	// Firefox 1.0+
	let isFirefox = typeof InstallTrigger !== 'undefined';

	// Chrome 1 - 71
	let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

	return isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
			isChrome ? 'Chrome' :
				"Don't know";
}

if (getBrowser() !== 'Firefox') {
	// for opening the hyperlink in the popup in a new tab
	document.addEventListener('DOMContentLoaded', function () {
		var links = document.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			(function () {
				var ln = links[i];
				var location = ln.href;
				ln.onclick = function () {
					browser.tabs.create({
						active: true,
						url: location
					});
				};
			})();
		}
	});
}