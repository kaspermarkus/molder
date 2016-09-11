## Moulder ##

### About ###

Moulder is an easy-to-use, graphical tool for manipulating (moulding) data from various input datasources and outputting them into different datasources. The goal is to allow people who dont have a very big knowledge of SQL, Excel, Access, etc., to extract data and modify it to fit the format they need, and then outputting it in the format they need.

### Installation and introduction ###

Moulder consists of two parts:
* a backend 'engine' written in clojure, resposible for the actual data manipulation
* web-based frontend written in javascript for editing and inspecting the data molding steps.


### Licence ###

Moulder (and its backend) is distributed under the terms of both the [MIT](MIT-LICENSE.txt) or [GPL 2](GPL-LICENSE.txt) Licenses. You can choose the license that best suits your project.

### Documentation ###

#### Layout af skærm ####
* Overall layout af skærm - indeling:
  * Ingenting valgt:
    * Hovedgrafen
    * Menu over noder
    * Kør knap
    * Evt. en masse shortcuts til brugbare ting
    * evt. list af fejlbeskeder
  * Node markeret
    * Hovedgrafen
    * Menu over noder
    * Kør knap
    * RO view of properties, but with options to change
    * Input tabel/data
    * Output table/data (evt. samtidig med input table)
    * evt. dokumentation for node
    * Fejlbeskeder
    * mulighed for at slette
    * mulighed for at omdøbe
    * link til dobbeltklikket mode
  * pil markeret
    * Hovedgrafen
    * Menu over noder
    * kør knap
    * tabel for data på det punkt i molden
    * fejlbeskeder
    * mulighed for at slette
  * node dobbeltklikket
    * 3 rækker:
      * tabeller med input headers (hvis gyldigt for den pågældende node)
      * tabeller med output headers (hvis gyldigt for den pågældende node)
      * RO view for nodetype med pile til/fra tabel(ler) - mulighed for edit (evt. mange RO views hvis det er en transformation - nodens RO view med med edit options
    * dokumentation for node
    * mulighed for at slette
    * mulighed for at omdøbe
    * luk-vindue/tilbage til hovedgraf knap
    * fejlbeskeder
    * dokumentation for node
  * Endpoint markeret

#### Interaktion generelt ####
* Graf Manipulation: &#x2713;
  * Hvordan tilføjer pile? &#x2713;
     * Hiv fra gyldigt endpoint. Alle mulige connections highlightes med grøn ring
     * Højreklik på node og vælg "New output", hvilket giver pil. Alle mulige connections highlightes med grøn
  * Hvordan fjerner man pile? &#x2713;
     * Marker pil og vælg "fjern" oppe fra højre hjørne
     * Højreklik på pil og vælg "Remove arrow"
  * Hvordan tilføjer man noder? &#x2713;
     * Drag and drop fra venstre side
     * Højreklik og vælg: ny->output nodes->CSV Output
  * Hvordan fjerner man noder? &#x2713;
     * Marker node og vælg "fjern" oppe fra højre hjørne
* Hvad skal der være i menu-baren &#x2713;
  * Ingenting i første omgang 
  * Der vil altid være en quick-menu med ikoner og tekst til relevante funktioner
* Hvad gør vi med fejlbeskeder? &#x2713;
  * De vil hovedsageligt komme til at stå nede i syd-feltet
  * Ved dobbeltklik på en besked bliver den pågældende node markeret
  * Noder indikerer selv om der er fejl i dem
  * Om der er fejl generelt vil også blive indikeret på status i quick-menu
  * evt. skal beskederne stå som overlay på grafen når en node er valgt
* Interaktion med den enkelte node:  &#x2713;
  * Hvordan inspicerer man
     * Enkeltklik for at åbne den. Dette vil beholde hovedgrafen åben, men i syd-vinduet kan man ændre properties
     * Dobbelklik åben detailed view, med input/output tabel headers, osv.
  * Omdøb af den
    * Gøres i begge ovenstående tilfælde samme sted som man ændrer andre properties
  * ændre properties på den
    * blabla 
  * dokumentation af den - hvor er det?
    * Syd vindue
* Hvor kører man, tester man, stopper man, ser om tingene er vellykket  &#x2713;
  * Der er en indikator oppe i Quick menu der viser om der er fejl, osv
  * Tests sker hele tiden (hver gang man har ændret en property). Status for test kørsel vises ved ikon i quick menu og via. fejlbeskeder
  * Hvis der ingen fejl er kan man køre programmet
  * Ved kørsel laves "play" om til et load ikon - og der dukker et cancel kørsel symbol op.
* Skal programmet hele tiden tjekke om det er gyldigt? Ja! og farve/fejle der hvor der er problemer  &#x2713;
* Når man inspicerer en node, hvilke data skal man kunne se?  &#x2713;
  * sample input/output baseret på nuværende graf
  * beskrivelse af node-typen
  * Headers
  * Node properties (view/edit mode)
  * Edit view m. input-output header tabeller
