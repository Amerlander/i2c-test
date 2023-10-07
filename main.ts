input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    qwiicopenlog.changeIndex(qwiicopenlog.eArray.SearchString, -1)
})
pins.onPulsed(DigitalPin.P1, PulseValue.Low, function () {
    basic.setLedColor(bit.hex4(bit.eHEX4bit.x7))
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.rtcpcf85063tp_eADDR(rtcpcf85063tp.eADDR.RTC_x51))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 13, lcd20x4.lcd20x4_text(rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.mit)))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 0, 2, lcd20x4.lcd20x4_text(bit.formatNumber(qwiicopenlog.readRegister(qwiicopenlog.qwiicopenlog_eADDR(qwiicopenlog.eADDR.LOG_x2A), qwiicopenlog.eReadRegister.status), bit.eLength.HEX_FF)))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 3, 11, lcd20x4.lcd20x4_text(rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit)))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 12, 15, input.rotation(Rotation.Roll), lcd20x4.eAlign.right)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 16, 19, input.rotation(Rotation.Pitch), lcd20x4.eAlign.right)
    dipswitch.readSwitch(dipswitch.dipswitch_eADDR(dipswitch.eADDR.DIP_SWITCH_x03))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 14, 19, lcd20x4.lcd20x4_text(bit.formatNumber(dipswitch.getBIN(), bit.eLength.BIN_111111)))
    keypadASCII = qwiickeypad.getButton(qwiickeypad.qwiickeypad_eADDR(qwiickeypad.eADDR.KEY_x4B))
    if (bit.between(keypadASCII, bit.charCodeAt("0", 0), bit.charCodeAt("9", 0))) {
        qwiicgpio.writeOUTPUT_PORT(qwiicgpio.qwiicgpio_eADDR(qwiicgpio.eADDR.GPIO_x27), qwiicgpio.siebenSegment(keypadASCII - 48, false))
        spdtrelay.channelCtrl(spdtrelay.spdtrelay_eADDR(spdtrelay.eADDR.Rel_x11), keypadASCII - 48)
    }
    if (qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index) < qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length)) {
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 2, 0, 13, lcd20x4.lcd20x4_text(qwiicopenlog.getString(qwiicopenlog.eArray.SearchString)))
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 2, 14, 19, lcd20x4.lcd20x4_text("" + qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index) + "/" + qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length)), lcd20x4.eAlign.right)
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 3, 0, 13, lcd20x4.lcd20x4_text(qwiicopenlog.getString(qwiicopenlog.eArray.FileName)))
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 3, 14, 19, qwiicopenlog.readInt32BE(qwiicopenlog.qwiicopenlog_eADDR(qwiicopenlog.eADDR.LOG_x2A), qwiicopenlog.eWriteStringReadInt32BE.fileSize, qwiicopenlog.getString(qwiicopenlog.eArray.FileName)), lcd20x4.eAlign.right)
    }
    if (qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index) >= qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length) - 1) {
        qwiicopenlog.listDirectory(qwiicopenlog.qwiicopenlog_eADDR(qwiicopenlog.eADDR.LOG_x2A), qwiicopenlog.getString(qwiicopenlog.eArray.SearchString), 16)
    } else {
        qwiicopenlog.changeIndex(qwiicopenlog.eArray.FileName, 1)
    }
    rtcpcf85063tp.anzeige25LED(rtcpcf85063tp.e25LED.Zeit)
    basic.turnRgbLedOff()
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    qwiicopenlog.changeIndex(qwiicopenlog.eArray.SearchString, 1)
})
let keypadASCII = 0
lcd20x4.initLCD(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4))
qwiicopenlog.checkStatusRegister(qwiicopenlog.qwiicopenlog_eADDR(qwiicopenlog.eADDR.LOG_x2A))
qwiicgpio.setMode(
qwiicgpio.qwiicgpio_eADDR(qwiicgpio.eADDR.GPIO_x27),
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT
)
qwiicopenlog.listDirectory(qwiicopenlog.qwiicopenlog_eADDR(qwiicopenlog.eADDR.LOG_x2A), qwiicopenlog.getString(qwiicopenlog.eArray.SearchString), 8)
