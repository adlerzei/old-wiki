"use strict";

//for compatibility reasons
var browser = chrome;

var vectorSkinActivationSwitch = document.getElementById("vectorSkinActivationSwitch");
var autoReloadSwitch = document.getElementById("autoReloadSwitch");
var hideURLQuerySwitch = document.getElementById("hideURLQuerySwitch");

var vectorSkinActivation = true;
var autoReload = true;
var hideURLQuery = true;

const wikiDomains = [
    "wikipedia.org",
    "wiktionary.org",
    "wikiquote.org",
    "wikibooks.org",
    "wikisource.org",
    "species.wikimedia.org",
    "wikinews.org",
    "wikiversity.org",
    "wikivoyage.org",
    "commons.wikimedia.org",
    "wikidata.org",
    "mediawiki.org",
    "meta.wikimedia.org",
    "incubator.wikimedia.org",
    "wikitech.wikimedia.org"
];

// load stored settings from local storage
browser.storage.local.get((items) => {
	vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation : true;
	autoReload = items.hasOwnProperty('auto_reload') ? items.auto_reload : true;
	hideURLQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query : true;

	vectorSkinActivationSwitch.checked = vectorSkinActivation;
	autoReloadSwitch.checked = autoReload;
	hideURLQuerySwitch.checked = hideURLQuery;
	
	vectorSkinActivationSwitch.addEventListener("change", activationSwitchChanged);
	autoReloadSwitch.addEventListener("change", autoReloadSwitchChanged);
	hideURLQuerySwitch.addEventListener("change", hideUrlSwitchChanged);
});

/**
 * Changes the activation status.
 */
function activationSwitchChanged() {
	// apply skin or not
	vectorSkinActivation = vectorSkinActivationSwitch.checked;	

	browser.storage.local.set({
		vector_skin_activation: vectorSkinActivationSwitch.checked,
	});

	if (autoReload) {
		if (vectorSkinActivation) {
			addSkinParamToAllTabs();
		} else {
			removeSkinParamFromAllTabs();
		}
	}
}

/**
 * Changes the auto reload status.
 */
function autoReloadSwitchChanged() {
	autoReload = autoReloadSwitch.checked;

	browser.storage.local.set({
		auto_reload: autoReloadSwitch.checked
	});
}

/**
 * Changes the hide URL status.
 */
function hideUrlSwitchChanged() {
	hideURLQuery = hideURLQuerySwitch.checked;

	browser.storage.local.set({
		hide_url_query: hideURLQuerySwitch.checked
	});
}

function addSkinParamToAllTabs() {
    browser.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            const url = new URL(tab.url);
            if (wikiDomains.some(domain => url.hostname.endsWith(domain))) {
                url.searchParams['useskin'] = 'vector';
                browser.tabs.update(tab.id, { url: url.toString() });
            }
        });
    });
}

function removeSkinParamFromAllTabs() {
    browser.tabs.query({}, function(tabs) {
        tabs.forEach(function(tab) {
            const url = new URL(tab.url);
            if (wikiDomains.some(domain => url.hostname.endsWith(domain))) {
                url.searchParams.delete('useskin');
                let address = url.toString();
                if (address.endsWith('?')) {
                    address = address.slice(0, -1); // Remove the last character if it is a question mark
                }
                browser.tabs.update(tab.id, { url: address });
            }
        });
    });
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