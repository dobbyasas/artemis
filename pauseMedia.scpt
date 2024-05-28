use framework "AppKit"
use scripting additions

property NSEvent : a reference to current application's NSEvent
property NSSystemDefined : a reference to 14
property keyFlags : a reference to 8
property keyState : a reference to 10

on sendKeyPress()
    set keyDownEvent to NSEvent's keyEventWithType:(NSSystemDefined) location:(0) modifierFlags:(keyFlags) timestamp:(0) windowNumber:(0) context:(missing value) characters:(missing value) charactersIgnoringModifiers:(missing value) isARepeat:(false) keyCode:(keyState)
    keyDownEvent's postEvent()
    return
end sendKeyPress

sendKeyPress()
