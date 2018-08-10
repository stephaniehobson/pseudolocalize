// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    document.addEventListener("click", (e) => {

        // messages for content script
        function goAccent(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "accent"
            });
            window.close();
        }
        function goBidi(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "bidi"
            });
            window.close();
        }

        // log error
        function reportError(error) {
            console.error(`Could not pseudolocalize: ${error}`);
        }

        // pass command to content script
        if (e.target.classList.contains("accent")) {
            browser.tabs.query({active: true, currentWindow: true})
            .then(goAccent)
            .catch(reportError);
        }
        else if (e.target.classList.contains("bidi")) {
            browser.tabs.query({active: true, currentWindow: true})
            .then(goBidi)
            .catch(reportError);
        }
    });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute pseudolocalize content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/p12ify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);
