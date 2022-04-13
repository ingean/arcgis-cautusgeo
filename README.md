# arcgis-cautusgeo
Visning av skreddata fra radar i 3D.

#### Parameteroppstart
Denne webapplikasjonen støtter parameterstyrt oppstart. Parametre gis i URL'en til applikasjonen, hvor følgende parametre er støttet:

- startdate 
- enddate
- lat
- lon

Parameterene lat og lon avgjør hvor applikasjonen zoomer til ved oppstart (senter av visningen). Tilsvarende benyttes startdate og enddate til å filtrere applikasjonens skreddata. Begge må være tilstede i Url'en for å aktivisere filteret. 

Eksempel:
```
?startdate=2022-02-02&enddate=2022-02-09&lat=60.5&lon=5.6
```
Eksempelet sentrerer visningen til 60.5 og 5.6 og viser skreddato innenfor tidsvinduet 2. til 9. februar 2022.