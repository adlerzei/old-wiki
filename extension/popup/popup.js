"use strict";

//for compatibility reasons
var browser = chrome;

var vectorSkinActivationSwitch = document.getElementById("vectorSkinActivationSwitch");
var autoReloadSwitch = document.getElementById("autoReloadSwitch");
var hideURLQuerySwitch = document.getElementById("hideURLQuerySwitch");

var vectorSkinActivation = true;
var autoReload = true;
var hideURLQuery = true;

// load stored settings from local storage
browser.storage.local.get((items) => {
	vectorSkinActivation = items.hasOwnProperty('vector_skin_activation') ? items.vector_skin_activation : true;
	autoReload = items.hasOwnProperty('auto_reload') ? items.auto_reload : true;
	hideURLQuery = items.hasOwnProperty('hide_url_query') ? items.hide_url_query : true;

	vectorSkinActivationSwitch.checked = vectorSkinActivation;
	autoReloadSwitch.checked = autoReload;
	hideURLQuerySwitch.checked = hideURLQuery;
	
	vectorSkinActivationSwitch.addEventListener("change", switchChanged);
	autoReloadSwitch.addEventListener("change", switchChanged);
	hideURLQuerySwitch.addEventListener("change", switchChanged);
});

/**
 * Changes the settings.
 */
function switchChanged() {
	// apply skin or not
	vectorSkinActivation = vectorSkinActivationSwitch.checked;	
	autoReload = autoReloadSwitch.checked;
	hideURLQuery = hideURLQuerySwitch.checked;

	browser.storage.local.set({
		vector_skin_activation: vectorSkinActivationSwitch.checked,
		auto_reload: autoReloadSwitch.checked,
		hide_url_query: hideURLQuerySwitch.checked
	});
}
