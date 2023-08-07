### Calliope i2c Beispiel-Projekt mit vier i2c Modulen gleichzeitig
 lädt alle i2c Erweiterungen von GitHub

> Diese Seite bei [https://calliope-net.github.io/i2c-test/](https://calliope-net.github.io/i2c-test/) öffnen

![](icon.png)

### Dieses Projekt importieren, mit Calliope testen, bearbeiten

Um dieses Repository in MakeCode zu importieren.

* öffne [https://makecode.calliope.cc](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge folgende **URL des Projekts** ein und klicke auf **Los geht's!**
* **https://github.com/calliope-net/i2c-test**

#### mit dem DIP Schalter wird eingestellt:

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

#### 6 Erweiterungen werden automatisch mit geladen

* https://github.com/calliope-net/bit
* https://github.com/calliope-net/i2c
* https://github.com/calliope-net/dip-switch
* https://github.com/calliope-net/lcd-16x2rgb
* https://github.com/calliope-net/log-qwiicopenlog
* https://github.com/calliope-net/rtc-pcf85063tp

![](blocks.png)

> Für eigene Entwicklungen, oder wenn i2c Module fehlen, können nicht benötigte Erweiterungen gelöscht werden.
> Dazu in der **JavaScript** Ansicht links unter dem Simulator im schwarzen Explorer auf den Mülleimer klicken.
> Mit dem Pfeil-Symbol kann die Erweiterung aktualisiert werden, wenn es ein Update gab.

![](explorer.png)

#### Bezugsquellen

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
