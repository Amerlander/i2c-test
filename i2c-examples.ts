
//% color=#3F3FFF icon="\uf1e6" block="i2c Beispiele" weight=19
namespace i2cexamples
/* 230806 Funktionen auskommentiert, sind in den Projekten i2c-test und i2c-speicherkarte-verwalten
Calliope i2c Beispiele, die mehrere i2c Module gleichzeitig nutzen. Lädt alle i2cErweiterungen.
optimiert und getestet für die gleichzeitige Nutzung mehrerer i2c Module am Calliope mini

[Dokumentation] https://calliope-net.github.io/i2c-test/

Code zum testen der i2c Erweiterungen neu programmiert von Lutz Elßner im August 2023
*/ {
    // ========== group="i2c LCD LOG leere LOG Dateien löschen und Protokoll-Datei schreiben, LCD Anzeige"

    //% group="i2c LCD LOG leere LOG Dateien löschen und Protokoll-Datei schreiben, LCD Anzeige"
    //% block="i2c %pLCD %pLOG lösche %pCount leere LOG00*.TXT Dateien mit Protokoll in %logFilename"
    //% pCount.min=1 pCount.max=16 pCount.defl=8
    //% logFilename.defl="REMOVE.LOG"
    //% inlineInputMode=inline
/*     export function loescheDateien(pLCD: lcd16x2rgb.eADDR_LCD, pLOG: qwiicopenlog.eADDR, pCount: number, logFilename: string) {
        let iSize: number, iCount: number, sText: string

        // liest pCount Dateinamen nach Muster "LOG00*.TXT" in Array aFileName
        qwiicopenlog.listDirectory(pLOG, "LOG00*.TXT", pCount)
        // Länge des Arrays aFileName=Anzahl Dateinamen fürs Protokoll
        sText = "" + qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length) + " Dateien"
        // schreibt sText auf Display Zeile 0 Zeichen 0-9
        lcd16x2rgb.writeText(pLCD, 0, 0, 9, lcd16x2rgb.eAlign.left, sText)
        // schreibt sText in Protokoll-Datei logFilename auf Speicherkarte
        qwiicopenlog.writeFile(pLOG, logFilename, sText, qwiicopenlog.eCRLF.CRLF)
        // Zähler für gelöschte Dateien
        iCount = 0
        // Schleife durch alle gefundenen Dateinamen, kann weniger als pCount sein
        for (let Index = 0; Index <= qwiicopenlog.getInt(qwiicopenlog.eArray.FileName, qwiicopenlog.eInt.Array_Length) - 1; Index++) {
            // fragt Register 13 fileSize vom aktuellen Dateiname (Array aFileName(iFileName))
            iSize = qwiicopenlog.readInt32BE(pLOG, qwiicopenlog.eWriteStringReadInt32BE.fileSize, qwiicopenlog.getString(qwiicopenlog.eArray.FileName))
            // schreibt iSize auf Display Zeile 0 Zeichen 10-15 rechtsbündig
            lcd16x2rgb.writeText(pLCD, 0, 10, 15, lcd16x2rgb.eAlign.right, convertToText(iSize))
            // schreibt aktuellen Dateiname auf Display Zeile 1 Zeichen 0-15
            lcd16x2rgb.writeText(pLCD, 1, 0, 15, lcd16x2rgb.eAlign.left, qwiicopenlog.getString(qwiicopenlog.eArray.FileName))
            // schreibt aktuellen Dateiname und iSize in Protokoll-Datei logFilename auf Speicherkarte
            qwiicopenlog.writeFile(pLOG, logFilename, "" + qwiicopenlog.getString(qwiicopenlog.eArray.FileName) + " " + iSize + " Bytes", qwiicopenlog.eCRLF.CRLF)
            if (iSize == 0) {
                // sendet aktuellen Dateiname an Register 15 remove
                // und bekommt Anzahl gelöschter Dateien zurück, 1 oder 0 wird zum Zähler addiert
                iCount += qwiicopenlog.readInt32BE(pLOG, qwiicopenlog.eWriteStringReadInt32BE.remove, qwiicopenlog.getString(qwiicopenlog.eArray.FileName))
            }
            basic.pause(1000)
            qwiicopenlog.changeIndex(qwiicopenlog.eArray.FileName, 1)
        }
        // Anzahl gelöschter Dateien fürs Protokoll auf Display und in die Datei auf Speicherkarte
        sText = "" + iCount + " gelöscht"
        lcd16x2rgb.writeText(pLCD, 0, 0, 15, lcd16x2rgb.eAlign.left, sText)
        qwiicopenlog.writeFile(pLOG, logFilename, sText, qwiicopenlog.eCRLF.CRLF)
    } */



    // ========== group="i2c LCD LOG Sonderzeichen in Datei schreiben und wieder lesen, LCD Anzeige"

    //% group="i2c LCD LOG Sonderzeichen in Datei schreiben und wieder lesen, LCD Anzeige"
    //% block="i2c %pLCD %pLOG 3 Zeilen in Datei %pFilename schreiben, lesen und anzeigen"
    //% pFilename.defl="UMLAUTE.TXT"
    //% inlineInputMode=inline
/*     export function schreibeUmlaute(pFilename: string) { // Parameter i2c-Adressen entfernt, weil nicht benutzt
        let iSize: number
        lcd16x2rgb.screenClear(lcd16x2rgb.eADDR_LCD.LCD_16x2)
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 0, 0, 15, lcd16x2rgb.eAlign.left, pFilename)
        iSize = qwiicopenlog.readInt32BE(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.eWriteStringReadInt32BE.fileSize, pFilename)
        basic.pause(5000)
        if (iSize < 0) {
            lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0, 15, lcd16x2rgb.eAlign.left, "nicht gefunden")
        } else if (iSize > 0) {
            lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 0, 0, 15, lcd16x2rgb.eAlign.left, "Datei Größe " + iSize)
            lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0, 15, lcd16x2rgb.eAlign.left, "wird gelöscht")
            basic.pause(5000)
            iSize = qwiicopenlog.readInt32BE(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.eWriteStringReadInt32BE.remove, pFilename)
            lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0, 15, lcd16x2rgb.eAlign.left, "gelöscht " + iSize)
        }
        qwiicopenlog.writeFile(qwiicopenlog.eADDR.LOG_Qwiic, pFilename, "äöüßÄÖÜ", qwiicopenlog.eCRLF.CRLF)
        qwiicopenlog.writeFile(qwiicopenlog.eADDR.LOG_Qwiic, pFilename, "gjpqy", qwiicopenlog.eCRLF.CRLF)
        qwiicopenlog.writeFile(qwiicopenlog.eADDR.LOG_Qwiic, pFilename, "~ 1€ 2µF -3°C", qwiicopenlog.eCRLF.CRLF)
        iSize = qwiicopenlog.readInt32BE(qwiicopenlog.eADDR.LOG_Qwiic, qwiicopenlog.eWriteStringReadInt32BE.fileSize, pFilename)
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 0, 0, 15, lcd16x2rgb.eAlign.left, "neue Datei " + iSize)
        lcd16x2rgb.writeText(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0, 15, lcd16x2rgb.eAlign.left, "wird gelesen")
        basic.pause(5000)
        qwiicopenlog.readFile(qwiicopenlog.eADDR.LOG_Qwiic, pFilename, 128)
        lcd16x2rgb.screenClear(lcd16x2rgb.eADDR_LCD.LCD_16x2)
        lcd16x2rgb.writeLCD(lcd16x2rgb.eADDR_LCD.LCD_16x2, qwiicopenlog.getString(qwiicopenlog.eArray.FileContent).substr(0, 16))
        lcd16x2rgb.setCursor(lcd16x2rgb.eADDR_LCD.LCD_16x2, 1, 0)
        lcd16x2rgb.writeLCD(lcd16x2rgb.eADDR_LCD.LCD_16x2, qwiicopenlog.getString(qwiicopenlog.eArray.FileContent).substr(16, 16))
    } */



    // ========== group="i2c LCD RTC LOG Zeile auf Speicherkarte schreiben (Datum, Zeit, Licht, °C), LCD Anzeige"

    //% group="i2c LCD RTC LOG Zeile auf Speicherkarte schreiben (Datum, Zeit, Licht, °C), LCD Anzeige"
    //% block="i2c %pLCD %pRTC %pLOG Zeile auf Speicherkarte protokollieren"
/*     export function foreverDateLog(pLCD: lcd16x2rgb.eADDR_LCD, pRTC: rtcpcf85063tp.eADDR, pLOG: qwiicopenlog.eADDR) {
        rtcpcf85063tp.readDateTime(pRTC)
        let sName = rtcpcf85063tp.getyyMMddHHmmss(0, 8) + ".LOG"
        lcd16x2rgb.writeText(pLCD, 0, 0, 15, lcd16x2rgb.eAlign.left, sName)
        lcd16x2rgb.writeText(pLCD, 1, 0, 15, lcd16x2rgb.eAlign.left, rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit))
        qwiicopenlog.writeFile(pLOG, sName, "" + sName + ";" + rtcpcf85063tp.getDate(rtcpcf85063tp.ePart.mit, rtcpcf85063tp.ePart.mit) + ";" + rtcpcf85063tp.getTime(rtcpcf85063tp.ePart.mit) + ";" + input.lightLevel() + ";" + input.temperature(), qwiicopenlog.eCRLF.CRLF)
    } */

} // i2c-examples.ts
