radio.onReceivedNumber(function (receivedNumber) {
    MilisecsAtReceiveTime = control.millis()
    BaseTime = receivedNumber
})
function ShowNumber2 (Number2: number, Offset: number) {
    for (let index2 = 0; index2 <= 9; index2++) {
        if (index2 < Number2) {
            if (index2 % 2 == 0) {
                led.plotBrightness(Offset, 4 - Math.trunc(index2 / 2), 40)
            } else {
                led.plotBrightness(Offset + 1, 4 - Math.trunc(index2 / 2), 40)
            }
        } else {
            if (index2 % 2 == 0) {
                led.plotBrightness(Offset, 4 - Math.trunc(index2 / 2), 0)
            } else {
                led.plotBrightness(Offset + 1, 4 - Math.trunc(index2 / 2), 0)
            }
        }
    }
}
function ShowFraction (Value: number, Offset: number, Intensity: number) {
    Reminder = Math.trunc((Value - Math.trunc(Value)) * 10)
    led.unplot(Offset, 0)
    led.unplot(Offset, 1)
    led.unplot(Offset, 2)
    led.unplot(Offset, 3)
    led.unplot(Offset, 4)
    FractionToggle = FractionToggle * -1 + 1
    if (Reminder >= 1) {
        led.plotBrightness(Offset, 4, FractionToggle)
    }
    if (Reminder >= 2) {
        led.plotBrightness(Offset, 4, Intensity)
    }
    if (Reminder >= 3) {
        led.plotBrightness(Offset, 3, FractionToggle)
    }
    if (Reminder >= 4) {
        led.plotBrightness(Offset, 3, Intensity)
    }
    if (Reminder >= 5) {
        led.plotBrightness(Offset, 2, FractionToggle)
    }
    if (Reminder >= 6) {
        led.plotBrightness(Offset, 2, Intensity)
    }
    if (Reminder >= 7) {
        led.plotBrightness(Offset, 1, FractionToggle)
    }
    if (Reminder >= 8) {
        led.plotBrightness(Offset, 1, Intensity)
    }
    if (Reminder >= 9) {
        led.plotBrightness(Offset, 0, FractionToggle)
    }
}
function ShowPercent (Percent: number) {
    ShowNumber2(Math.trunc(Percent / 10), 0)
    ShowNumber2(Math.trunc(Percent) % 10, 3)
    ShowFraction(Percent, 2, 1)
}
let Reminder = 0
let MilisecsAtReceiveTime = 0
let BaseTime = 0
let FractionToggle = 0
music.setVolume(30)
FractionToggle = 0
let Time = 0
let PrevTime = 0
let MaxPriodLength = 86400000
BaseTime = 100000000
radio.setGroup(1)
basic.forever(function () {
    Time = (BaseTime + (control.millis() - MilisecsAtReceiveTime)) / (MaxPriodLength / 100)
    ShowPercent(Time)
    if (Math.trunc(Time * 10) != PrevTime) {
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        PrevTime = Math.trunc(Time * 10)
    }
    basic.pause(500)
})
