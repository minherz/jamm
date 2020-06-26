# **J**ust **A**nother **M**eet **M**ute

_Inspired by weeks of remote work while using Google Meet for video conferencing._ Did you need to block video and audio streams in the Google Meet VC when there is a phone call, your child enters the room or you just need to leave to a lavatory?
It is always two clicks away, right? Unless you prefer frantically moving your mouse to unhide the toolbar and then click each of the mic and camera buttons.
What about a meeting where you are in mute and need to say just few words (like "Yes, I agree" or "Bye bye") and think about this nice "Push-To-Talk" feature they have in Zoom? Sometimes you do not care to extra click or another mouse move and sometimes you do.
It would be great if you could just do a single click and mute all audio and all video output in all Google Meet`ings.
While it is too extravaganza having more than one Meet window open, some people (like the author) appear in several meetings in parallel from time to time.
What about to press a button to say something and release it to get back to mute mode. This Chrome extensions allows to do exactly that.

This extension implements two functions: "_global mute and hide_" and "_push to talk_".
There are quite a few Chrome extensions that do similar job (hence "just another..." in the name) but neither does exactly this simple set of features.

## How it works

The _global mute and hide_ mutes audio and disables video in all currently open Google meetings.
Pressing the extension's icon or `Alt`+`Shift`+`D` combination triggers the global mute and hide.
This operation is idempotent. Triggering it multiple time will have the same result. Note, there is no reverse operation. User has to unmute / enable video manually.
This operation works only for Meet windows with "running" meetings. Meeting "Join screens" aren't influenced.

The _push to talk_ functionality allows temporarily unmute the current meeting. If the active Meet window is muted, a user can press and hold `Shift`+`Space` to temporarily unmute the mic of the meeting. Once user finish speaking, releasing any pressed key will muted the mic of the meeting again.
