
> Diese Seite bei [https://calliope-net.github.io/i2c-test/](https://calliope-net.github.io/i2c-test/) öffnen

![](icon.png)

### i2c Module an Calliope anstecken

* [Grove - 16x2 LCD](https://wiki.seeedstudio.com/Grove-16x2_LCD_Series/)
* [SparkFun Qwiic OpenLog](https://www.sparkfun.com/products/15164) / [Qwiic Cable - Grove Adapter](https://www.sparkfun.com/products/15109)

Alle i2c Module werden parallel am linken Grove Steckverbinder A0 angeschlossen. 
Dazu kann ein [i2c-Hub](https://wiki.seeedstudio.com/Grove-I2C-Hub-6Port/) benutzt werden.
i2c Module mit zwei Buchsen (z.B. Qwiic) können hintereinander gesteckt werden.

Für die Stromversorgung sollte Calliope über USB Kabel (an Computer oder Powerbank) angeschlossen sein.

### .hex-Datei direkt auf Calliope laden, oder in MakeCode importieren.

* [mini-i2c-test.hex](mini-i2c-test.hex)
* [Schnappschuss (Bildschirmfoto mit den Blöcken)](mini-i2c-test.png)

### Dieses Projekt von GitHub importieren, bearbeiten, mit Calliope testen.

Um dieses Repository in MakeCode zu importieren.

* öffne [https://makecode.calliope.cc](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* kopiere die folgende **URL des Projekts** in die Zwischenablage
* **calliope-net/i2c-test**
* füge sie auf der MakeCode Webseite ein und klicke auf **Los geht's!**

### Bedienung der Calliope-App: mit dem DIP Schalter wird eingestellt:

* Schalter 1 OFF: LCD Display zeigt Datum und Uhrzeit an (dauerhaft jede Sekunde)
  * solange Knopf B gedrückt: zeigt den Zustand der 6 DIP Schalter binär am LCD Display an
* Schalter 1 ON: aller 10 Sekunden wird eine Zeile auf die Speicherkarte protokolliert
  * Dateiname ergibt sich aus Datum/Zeit yyMMddHH.CSV (pro Stunde eine neue Datei)
  * Inhalt der Zeile: Dateiname; Datum; Zeit; DIP-Schalter binär; Temperatur; DrehungX; DrehungY; HardwareInterrupt; RGB
  * aktueller Dateiname und Zeit (aller 10 Sekunden wenn Zeile geschrieben) wird auf LCD Display angezeigt
  * schreiben auf Speicherkarte kann zum Langzeit-Test der i2c Funktion genutzt werden
* Schalter 2 ON 3 OFF: LED-Matrix zeigt binär (in 5 Spalten) Uhrzeit (Stunde, Minute 10^1, Minute 10^0, Sekunde 10^1, Sekunde 10^0)
* Schalter 2 ON 3 ON: LED-Matrix zeigt binär Datum (Tag, -, Monat, -, Jahr)
* Schalter 2 OFF 3 ON: LED-Matrix löschen
* Schalter 4-5-6: Hintergrundfarbe r-g-b, wenn ein Display mit 'Backlight' angeschlossen ist (eine weitere i2c Adresse)

> Einmalig Knopf A+B geklickt schaltet zusätzlich den Lagesensor (Drehung x- y-Achse) an (auch am i2c Bus).
> Danach werden im Sekundentakt die x und y Winkel im LCD Display rechts angezeigt (und auf Speicherkarte protokolliert).

> Der Sekundentakt kann von einer 'alle 1000 ms' Schleife kommen. Genauer geht es, wenn ein PIN mit CLK am RTC-Modul verdrahtet wird.
> Das wird erkennt und schaltet die Schleife ab. Ein Symbol wird links unten angezeigt.

> Auf dem LCD Display haben verschiedene Funktionen einen eigenen Bereich, ohne sich zu überschreiben.

### 6 Erweiterungen werden automatisch mit geladen

* [https://github.com/calliope-net/bit](https://calliope-net.github.io/bit/)
* [https://github.com/calliope-net/i2c](https://calliope-net.github.io/i2c/)
* [https://github.com/calliope-net/dip-switch](https://calliope-net.github.io/dip-switch/)
* [https://github.com/calliope-net/lcd-16x2rgb](https://calliope-net.github.io/lcd-16x2rgb/)
* [https://github.com/calliope-net/log-qwiicopenlog](https://calliope-net.github.io/log-qwiicopenlog/)
* [https://github.com/calliope-net/rtc-pcf85063tp](https://calliope-net.github.io/rtc-pcf85063tp/)

![](blocks.png)

> Für eigene Entwicklungen, oder wenn i2c Module fehlen, können nicht benötigte Erweiterungen gelöscht werden.
> Dazu in der **JavaScript** Ansicht links unter dem Simulator im schwarzen Explorer auf den Mülleimer klicken.
> Mit dem Pfeil-Symbol kann die Erweiterung aktualisiert werden, wenn es ein Update gab.

![](explorer.png)

### Updates

> Um ein Update einer Erweiterung von GitHub zu laden, klicke in der JavaScript Ansicht
> links unter dem Simulator auf den schwarzen Explorer. Dort steht der Name der Erweiterung
> vor einem Mülleimer- und einem Pfeil-Symbol. Mit dem Mülleimer wird die Erweiterung gelöscht,
> mit dem runden Pfeil nach einem Update gesucht. Danach steht dort eine Versionsnummer.

### Calliope-Apps, .hex-Dateien, Bildschirmfotos mit Blöcken

* [Calliope-App mit vier i2c Modulen gleichzeitig, DIP-Schalter, Speicherkarte, LCD-Display, Uhr.](https://calliope-net.github.io/i2c-test/)
* [Calliope-App Quarz-Uhr anzeigen, stellen mit Knopf A/B, Korrektur-Register, Binär-Uhr.](https://calliope-net.github.io/i2c-uhr-stellen/)
* [Calliope-App Dateien der Speicherkarte anzeigen, lesen, schreiben, löschen, mit Knopf A/B.](https://calliope-net.github.io/i2c-speicherkarte-verwalten/)

### Material

* [i2c-Erweiterungen für MakeCode (Software)](https://calliope-net.github.io/i2c-test)
* [i2c-Module und Bezugsquellen (Hardware)](https://calliope-net.github.io/i2c-test#bezugsquellen)

### Bezugsquellen

* [Grove - I2C Hub (6 Port)](https://www.mouser.de/ProductDetail/713-103020272)
* [Grove - 6-Position DIP Switch](https://www.mouser.de/ProductDetail/713-111020043)
* [Grove - 5-Way Switch](https://www.mouser.de/ProductDetail/713-111020048)
* [Grove - 16 x 2 LCD (White on Blue)](https://www.mouser.de/ProductDetail/713-104020111)
* [Grove - 16 x 2 LCD (Black on Red)](https://www.mouser.de/ProductDetail/713-104020112)
* [Grove - 16 x 2 LCD (Black on Yellow)](https://www.mouser.de/ProductDetail/713-104020113)
* [Grove - LCD RGB Backlight](https://www.mouser.de/ProductDetail/713-104030001)
* [Grove - High Precision RTC](https://www.mouser.de/ProductDetail/713-102020083)
* [SparkFun Qwiic OpenLog](https://www.mouser.de/ProductDetail/474-DEV-15164)
* [SparkFun Qwiic OpenLog](https://www.digikey.de/de/products/detail/sparkfun-electronics/DEV-15164/9920435)
* [Qwiic Cable - Grove Adapter (100mm)](https://www.mouser.de/ProductDetail/474-PRT-15109)
* [Qwiic Adapter](https://www.mouser.de/ProductDetail/474-DEV-14495)

#### Metadaten (verwendet für Suche, Rendering)

* Calliope mini
* i2c
