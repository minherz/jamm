
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