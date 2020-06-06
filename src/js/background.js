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

// Registers a callback function which will be called when the application icon will be clicked
chrome.browserAction.onClicked.addListener(function (_) {
  muteAllMeetSessions()
})

// Registers a callback function which will be called when the application shortcut is pressed.
chrome.commands.onCommand.addListener(function(command) {
    if (command == 'toggle-pin-tab') {
      muteAllMeetSessions()
    }
})


// Finds all tabs that run active Google Meet sessions and sends a message to mute mic and disable camera to each.
function muteAllMeetSessions() {
  chrome.tabs.query({url: ["https://meet.google.com/*","https://*.meet.sandbox.google.com/*"]}, function (tabs) {
    tabs.forEach(tab => {
      const url = new URL( tab.url )
      if (url.pathname && url.pathname !== "/") {
        console.debug("{ tab: { id: " + tab.id + ", url: " + tab.url + "},\npath: " + url.pathname + "} is sent mute message")
        chrome.tabs.sendMessage(tab.id, {muteAudio: true, muteVideo: true})
      }
    })
  })
}