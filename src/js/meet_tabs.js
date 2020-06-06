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

// Registers a callback function which will be called when the mute message is sent to the tab
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  // do nothing if the meeting is pending Join or was left
  let joinButton = document.evaluate(`//div[@role='button']/span/span[text()='Join now']`, document, null, XPathResult.ANY_TYPE, null)
  let rejoinButton = document.evaluate(`//div[@role='button']/span/span[text()='Rejoin']`, document, null, XPathResult.ANY_TYPE, null)
  if (joinButton?.iterateNext() || rejoinButton?.iterateNext()) {
    console.debug("not active meeting")
    return
  }

  if (msg.muteAudio) {
    console.debug("muting audio")
    document.querySelector(`[data-tooltip*='Turn off microphone']`)?.click();
  }
  if (msg.muteVideo) {
    console.debug("muting video")
    document.querySelector(`[data-tooltip*='Turn off camera']`)?.click();
  }
})