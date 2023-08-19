input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    qwiicopenlog.changeIndex(qwiicopenlog.eArray.SearchString, -1)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    qwiicopenlog.changeIndex(qwiicopenlog.eArray.SearchString, 1)
})
let key = 0
lcd20x4.initLCD(lcd20x4.eADDR.LCD_20x4, lcd20x4.eINIT._)
qwiicopenlog.checkStatusRegister(qwiicopenlog.eADDR.LOG_Qwiic)
qwiicgpio.setMode(
qwiicgpio.eADDR.GPIO_Qwiic,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT,
qwiicgpio.eIO.OUT
)
qwiicopenlog.listDirectory(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.getString(qwiicopenlog.eArray.SearchString), 8)
loops.everyInterval(1000, function () {
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.eADDR.RTC_PCF85063TP)
    lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 0, 0, 13, lcd20x4.eAlign.left, rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.mit))
    lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 1, 0, 2, lcd20x4.eAlign.left, bit.formatNumber(qwiicopenlog.readRegister(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.eReadRegister.status), bit.eLength.HEX_FF))
    lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 1, 3, 11, lcd20x4.eAlign.left, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit))
    lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 1, 12, 19, lcd20x4.eAlign.right, bit.formatNumber(input.rotation(Rotation.Roll), bit.eLength.toString))
    dipswitch.readSwitch(dipswitch.eADDR.DIP_SWITCH)
    lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 0, 14, 19, lcd20x4.eAlign.left, bit.formatNumber(dipswitch.getBIN(), bit.eLength.BIN_111111))
    key = qwiickeypad.getButton(qwiickeypad.eADDR.KEY_Qwiic)
    if (bit.between(key, 48, 57)) {
        qwiicgpio.writeOUTPUT_PORT(qwiicgpio.eADDR.GPIO_Qwiic, key)
        spdtrelay.channelCtrl(spdtrelay.eADDR.Relay, key)
    }
    if (qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index) < qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length)) {
        lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 2, 0, 13, lcd20x4.eAlign.left, qwiicopenlog.getString(qwiicopenlog.eArray.SearchString))
        lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 2, 14, 19, lcd20x4.eAlign.right, "" + bit.formatNumber(qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index), bit.eLength.toString) + "/" + bit.formatNumber(qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length), bit.eLength.toString))
        lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 3, 0, 13, lcd20x4.eAlign.left, qwiicopenlog.getString(qwiicopenlog.eArray.FileName))
        lcd20x4.writeText(lcd20x4.eADDR.LCD_20x4, 3, 14, 19, lcd20x4.eAlign.right, bit.formatNumber(qwiicopenlog.readInt32BE(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.eWriteStringReadInt32BE.fileSize, qwiicopenlog.getString(qwiicopenlog.eArray.FileName)), bit.eLength.toString))
    }
    if (qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Index) >= qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length) - 1) {
        qwiicopenlog.listDirectory(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.getString(qwiicopenlog.eArray.SearchString), 16)
    } else {
        qwiicopenlog.changeIndex(qwiicopenlog.eArray.FileName, 1)
    }
    rtcpcf85063tp.Anzeige25LED(rtcpcf85063tp.e25LED.Zeit)
})
