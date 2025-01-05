"use strict";

// for compatibility reasons
var browser = chrome;

var vectorSkinActivation = true;
var hideURLQuery = true;

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
}

/**
 * Parses the items from the local storage to the global variables in this worker script.
 * 
 * @param {[key: string]: any} items The items from the local storage.
 */
function parseSettings(items) {
    vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation : true;
    hideURLQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query : true;
}

/**
 * Parses the items from the local storage to the global variables in this worker script.
 * 
 * @param {[key: string]: any} items The items from the local storage.
 */
 function parseChangedSettings(items) {
    vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation.newValue : true;
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
        disableRulesetIds.push("remove_vector_skin");
    } else {
        enableRulesetIds.push("remove_vector_skin");
        disableRulesetIds.push("apply_vector_skin");
    }

    browser.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: disableRulesetIds,
        enableRulesetIds: enableRulesetIds
    });
}

browser.runtime.onInstalled.addListener(onStartUp);
browser.runtime.onStartup.addListener(onStartUp);

browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName != "local")
        return;

    onSettingsChanged(changes);
});