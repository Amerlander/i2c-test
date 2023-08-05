function LCDZeile0 (row: number) {
    if (input.buttonIsPressed(Button.B)) {
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, row, 0, 15, lcd16x2rgb.eAlign.right, bit.formatNumber(dipswitch.getBIN(), bit.eLength.BIN_11111111))
    } else {
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, row, 0, 11, lcd16x2rgb.eAlign.left, rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.ohne))
    }
    if (input.buttonIsPressed(Button.A)) {
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, row, 12, 15, lcd16x2rgb.eAlign.left, "y " + input.rotation(Rotation.Roll))
    }
}
function Hintergrundfarbe () {
    if (dipswitch.getON(dipswitch.eSwitch.DIP4, dipswitch.eONOFF.ON)) {
        rot = 63
    } else {
        rot = 0
    }
    if (dipswitch.getON(dipswitch.eSwitch.DIP5, dipswitch.eONOFF.ON)) {
        grün = 63
    } else {
        grün = 0
    }
    if (dipswitch.getON(dipswitch.eSwitch.DIP6, dipswitch.eONOFF.ON)) {
        blau = 63
    } else {
        blau = 0
    }
    lcd16x2rgb.setRGB(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5, rot, grün, blau)
}
function Speicherkarte () {
    sName = "" + rtcpcf85063tp.getyyMMddHHmmss(0, 8) + ".LOG"
    lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 0, 0, 12, lcd16x2rgb.eAlign.left, sName)
    lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0, 8, lcd16x2rgb.eAlign.left, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit))
    qwiicopenlog.writeFile(qwiicopenlog.eADDR.LOG_Qwiic, sName, "" + sName + ";" + rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.mit) + ";" + rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit) + ";" + bit.formatNumber(dipswitch.getBIN(), bit.eLength.BIN_11111111) + ";" + input.temperature() + "°C;x:" + input.rotation(Rotation.Pitch) + ";y:" + input.rotation(Rotation.Roll) + ";A:" + input.buttonIsPressed(Button.A) + ";B:" + input.buttonIsPressed(Button.B), qwiicopenlog.eCRLF.CRLF)
    lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 0, 13, 15, lcd16x2rgb.eAlign.right, "Hallo" + "Welt")
}
function LCDZeile1 (row: number) {
    lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, row, 3, 11, lcd16x2rgb.eAlign.left, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit))
    if (input.buttonIsPressed(Button.A)) {
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, row, 12, 15, lcd16x2rgb.eAlign.left, "x " + input.rotation(Rotation.Pitch))
    }
}
function Binäruhr () {
    if (dipswitch.getON(dipswitch.eSwitch.DIP2, dipswitch.eONOFF.ON) && dipswitch.getON(dipswitch.eSwitch.DIP3, dipswitch.eONOFF.ON)) {
        rtcpcf85063tp.Anzeige25LED(rtcpcf85063tp.e25LED.Datum)
    } else if (dipswitch.getON(dipswitch.eSwitch.DIP2, dipswitch.eONOFF.ON)) {
        rtcpcf85063tp.Anzeige25LED(rtcpcf85063tp.e25LED.Zeit)
    } else if (dipswitch.getON(dipswitch.eSwitch.DIP3, dipswitch.eONOFF.ON)) {
        basic.clearScreen()
    }
}
let sName = ""
let blau = 0
let grün = 0
let rot = 0
lcd16x2rgb.initRGB(lcd16x2rgb.eADDR_RGB.RGB_16x2_V5)
lcd16x2rgb.initLCD(lcd16x2rgb.eADDR_LCD.LCD_16x2)
qwiicopenlog.checkStatusRegister(qwiicopenlog.eADDR.LOG_Qwiic)
loops.everyInterval(1000, function () {
    rtcpcf85063tp.readDateTime(rtcpcf85063tp.eADDR.RTC_PCF85063TP)
    dipswitch.readSwitch(dipswitch.eADDR.DIP_SWITCH)
    Hintergrundfarbe()
    Binäruhr()
    if (dipswitch.getON(dipswitch.eSwitch.DIP1, dipswitch.eONOFF.OFF)) {
        LCDZeile0(0)
        LCDZeile1(1)
    } else {
        Speicherkarte()
    }
})
