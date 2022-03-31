radio.onReceivedNumber(function (receivedNumber) {
    MilisecsAtReceiveTime = control.millis()
    TimeReceived = receivedNumber
})
function ShowPercent (Percent: number) {
    ShowNumber(Math.trunc(Percent / 10), 0)
    ShowNumber(Percent % 10, 3)
}
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
let TimeReceived = 0
let MilisecsAtReceiveTime = 0
music.setVolume(30)
let Time = 0
let PrevTime = 0
radio.setGroup(1)
basic.forever(function () {
    Time = Math.trunc((TimeReceived + (control.millis() - MilisecsAtReceiveTime)) / 864000)
    if (Time != PrevTime) {
        ShowPercent(Time)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        PrevTime = Time
    }
    basic.pause(500)
})
