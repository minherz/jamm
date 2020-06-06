
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