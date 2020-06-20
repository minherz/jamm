/**
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// set constants
const isMacOS = navigator.platform.indexOf("Mac") != -1;
const controlKeyName = isMacOS ? "cmd" : "ctrl";

// register a callback function which will be called when the mute message is sent to the tab
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  if (!isActiveMeetTab()) {
    return;
  }

  if (msg.muteAudio && isAudioEnabled()) {
    toggleAudio();
  }
  if (msg.muteVideo && isVideoEnabled()) {
    toggleVideo();
  }
})

//
// isActiveMeetTab verifies that the tab with URL https://meet.google.com/[meeting-id] displays active meeting screen and not (re)join screen
// implementation uses reverse engineered DOM from Meet app (June 2020)
//
function isActiveMeetTab() {
  if (window.location.host !== "meet.google.com" || window.location.pathname === "") {
    return false;
  }
  // current version of meet has this element in active meet window *ONLY*
  if (document.evaluate("//div[@jscontroller='k8QGV']", document, null, XPathResult.ANY_TYPE, null).iterateNext()) {
    return true;
  }
  // second test for above element in a case jscontroller ID will change but the structure stay same
  if (document.evaluate("//div[div/div[@data-self-name]]", document, null, XPathResult.ANY_TYPE, null).iterateNext()) {
    return true;
  }
  return false;
}

//
// getStreamControlButton returns div element that implements mic or camera buttons.
// the button is identified using data tooltip with a shortcut hint
//
function getStreamControlButton(suffix, mutted) {
  var flag = mutted ?? false
  // TODO: optimize test after Chrome will support fn:matches()
  return document.evaluate(`//div[@data-is-muted='${flag}'][contains(translate(@data-tooltip, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${controlKeyName}${suffix}')]`, document, null, XPathResult.ANY_TYPE, null).iterateNext()
}

//
// isAudioEnabled verifies that the meet window does not mute audio
//
function isAudioEnabled() {
  // TODO: optimize test after Chrome will support fn:matches()
  if (getStreamControlButton(" + d") || getStreamControlButton("+d")) {
    return true;
  }
  return false;
}

//
// isVideoEnabled verifies that the meet window does not block video
//
function isVideoEnabled() {
  // TODO: validate for data-is-mute=false
  if (getStreamControlButton(" + e") || getStreamControlButton("+e")) {
    return true;
  }
  return false;
}

//
// toggleAudio sends shortcut Cltr-D (Cmd-D) to meet window
//
function toggleAudio() {
  document.dispatchEvent(new KeyboardEvent("keydown", {
    cancelable: true,
    ctrlKey: !isMacOS,
    metaKey: isMacOS,
    keyCode: 68,  // this field is depricated but without it Meet does not recognize shortcut
    code: "KeyD"
  }));
}

//
// toggleVideo sends shortcut Cltr-E (Cmd-E) to meet window
//
function toggleVideo() {
  document.dispatchEvent(new KeyboardEvent("keydown", {
    cancelable: true,
    ctrlKey: !isMacOS,
    metaKey: isMacOS,
    keyCode: 69, // this field is depricated but without it Meet does not recognize shortcut
    code: "KeyE"
  }));
}
