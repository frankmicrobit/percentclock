radio.onReceivedNumber(function (receivedNumber) {
    MilisecsAtReceiveTime = control.millis()
    BaseTime = receivedNumber
})
input.onButtonPressed(Button.A, function () {
    PersonalPeriodLength = MaxPriodLength - (BaseTime + (control.millis() - MilisecsAtReceiveTime))
    CurrentlPeriodLength = PersonalPeriodLength
    IsPersonal = true
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
    led.unplot(Offset, 1)
    led.unplot(Offset, 2)
    led.unplot(Offset, 3)
    led.unplot(Offset, 4)
    if (Reminder >= 2) {
        led.plotBrightness(Offset, 4, Intensity)
    }
    if (Reminder >= 4) {
        led.plotBrightness(Offset, 3, Intensity)
    }
    if (Reminder >= 6) {
        led.plotBrightness(Offset, 2, Intensity)
    }
    if (Reminder >= 8) {
        led.plotBrightness(Offset, 1, Intensity)
    }
}
function ShowPercent (Percent: number) {
    ShowNumber2(Math.trunc(Percent / 10), 0)
    ShowNumber2(Math.trunc(Percent) % 10, 3)
    ShowFraction(Percent, 2, 1)
}
input.onButtonPressed(Button.B, function () {
    if (IsPersonal) {
        CurrentlPeriodLength = MaxPriodLength
        IsPersonal = false
    } else {
        CurrentlPeriodLength = PersonalPeriodLength
        IsPersonal = true
    }
})
function ShowNumber (Number2: number, Offset: number) {
    for (let index = 0; index <= 9; index++) {
        if (index < 5) {
            if (index < Number2) {
                led.plotBrightness(Offset, 4 - index, 100)
            } else {
                led.plotBrightness(Offset, 4 - index, 5)
            }
        } else {
            if (index < Number2) {
                led.plotBrightness(Offset + 1, 9 - index, 100)
            } else {
                led.plotBrightness(Offset + 1, 9 - index, 5)
            }
        }
    }
}
let TimeDecimal = 0
let Reminder = 0
let PersonalPeriodLength = 0
let MilisecsAtReceiveTime = 0
let BaseTime = 0
let IsPersonal = false
let CurrentlPeriodLength = 0
let MaxPriodLength = 0
music.setVolume(30)
let Time = 0
let PrevTime = 0
MaxPriodLength = 86400000
CurrentlPeriodLength = MaxPriodLength
IsPersonal = false
BaseTime = 100000000
radio.setGroup(1)
basic.forever(function () {
    Time = (BaseTime + (control.millis() - MilisecsAtReceiveTime)) / (CurrentlPeriodLength / 100)
    TimeDecimal = (BaseTime + (control.millis() - MilisecsAtReceiveTime)) / (CurrentlPeriodLength / 100)
    if (Math.trunc(Time * 10) != PrevTime) {
        ShowPercent(Time)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        PrevTime = Math.trunc(Time * 10)
    }
    basic.pause(500)
})
