"use strict";

// for compatibility reasons
var browser = chrome;

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

/**
 * Loads the current settings.
 */
function onStartUp() {
    // load stored settings from local storage
	browser.storage.local.get(onSettingsLoaded);
}

/**
 * Called when the settings are loaded from the local storage.
 * 
 * @param {[key: string]: any} items The items from the local storage.
 */
function onSettingsLoaded(items) {
    parseSettings(items);
    updateEnabledRulesets();
}

/**
 * Called when the settings are changed in the local storage.
 * 
 * @param {[key: string]: any} changed The changed items from the local storage.
 */
 function onSettingsChanged(changed) {
    parseChangedSettings(changed);
    updateEnabledRulesets();

    if (autoReload) {
		if (vectorSkinActivation) {
			addSkinParamToAllTabs();
		} else {
			removeSkinParamFromAllTabs();
		}
	}
}

/**
 * Parses the items from the local storage to the global variables in this worker script.
 * 
 * @param {[key: string]: any} items The items from the local storage.
 */
function parseSettings(items) {
    vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation : true;
    autoReload = items.hasOwnProperty('auto_reload') ? items.auto_reload : true;
    hideURLQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query : true;
}

/**
 * Parses the items from the local storage to the global variables in this worker script.
 * 
 * @param {[key: string]: any} items The items from the local storage.
 */
 function parseChangedSettings(items) {
    vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation.newValue : true;
    autoReload = items.hasOwnProperty('auto_reload') ? items.auto_reload.newValue : true;
    hideURLQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query.newValue : true;
}

/**
 * Updates the enabled rulesets according to the activation state in the local storage.
 */
function updateEnabledRulesets() {
    let disableRulesetIds = [];
    let enableRulesetIds = [];

    if (vectorSkinActivation) {
        enableRulesetIds.push("apply_vector_skin");
    } else {
        disableRulesetIds.push("apply_vector_skin");
    }

    browser.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: disableRulesetIds,
        enableRulesetIds: enableRulesetIds
    });
}

/**
 * Adds the 'useskin=vector' parameter to all tabs that are a Wikipedia page.
 */
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

/**
 * Removes the 'useskin=vector' parameter from all tabs that are a Wikipedia page.
 */
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

browser.runtime.onInstalled.addListener(onStartUp);
browser.runtime.onStartup.addListener(onStartUp);

browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName != "local")
        return;

    onSettingsChanged(changes);
});
