## Moulder ##

### About ###

Moulder is an easy-to-use, graphical tool for manipulating (moulding) data from various input datasources and outputting them into different datasources. The goal is to allow people who dont have a very big knowledge of SQL, Excel, Access, etc., to extract data and modify it to fit the format they need, and then outputting it in the format they need.

### Installation and introduction ###

Moulder consists of two parts:
* a backend 'engine' written in clojure, resposible for the actual data manipulation
* web-based frontend written in javascript for editing and inspecting the data molding steps.


### Licence ###

Moulder (and its backend) is distributed under the terms of both the [MIT](MIT-LICENSE.txt) or [GPL 2](GPL-LICENSE.txt) Licenses. You can choose the license that best suits your project.


### Roadmap ###

#### Milestone 1: Datastructures, APIs, languages and libraries ####

* Bestem backend sprog - clojure    &#x2713;
* Bestem front-end sprog - javascript &#x2713;
* Bestem graf-bibliotek - jsplumb &#x2713;
* Backend/frontend - hvor er hoved-definitionen af en node type, krav til input format i de forskellige felter, antallet (og typer) af input og output, dokumentation. Ligger det i frontend eller backend, og i så fald hvilket format? &#x2713;
* Bestem backend/frontend API
  * Hvordan rapporterer jeg fejlbeskeder fra backend til front-end &#x2713;
  * Hvordan sender jeg input/output tables til frontend (for hver node) &#x2713;
  * Hvordan sender jeg headers+tables lister til frontend &#x2713;
* Project structure: two repos or one? - two repos, with scripts for pulling things in from the backend part &#x2713;
* Dokumenter/beslut format, opbygning, osv


#### Milestone 2: UX Design ####
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
  * 

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

#### Milestone 3: Backend basics - input/output nodes and pipes (45h) (*[16h45m]*) ####

* NODE - CSV input: (13h) (*[3h]*) &#x2713;
  * plan properties (1t *[30m]*)
  * implement definitions in backend (1h) (*[30m]*)
  * Implement functionality (3h) (*[1h]*)
  * implement test for it (5h) ([*1h]*)

* NODE - CSV output: (8h) (*[2h]*) &#x2713;
  * plan properties (1t)
  * implement definitions in backend (1h)
  * Implement functionality (3h)
  * implement test for it (3h)

* Pipe CSV input -> CSV output: (24h) (*[9h]*)
  * Test that things are working (3h) *[3.5h]*
  * Write test for the piping functionality (5h) *[3h]*
  * Output the table data to caller (16h) *[2.5h]*

* Documentation for adding nodes (1t *[30m]*)

EXTRAS:
* Test for running multimethod with non existing node name (*[1h]*)
* Test for metadata function for non-exisiting multimethod *[15m]*)
* General cleanup *[1h]*)

#### Milestone 4: Backend basics - API and standard node (43h) ####

* Implement public API (31h)
  * URLs working (3h) *[2.5h]*
  * Load project (3h) *[1h]*
  * Save project (3h) *[1h]*
  * Run (5h)
    * First do validation call. If no errors, process the mold.
    * On errors, break the process and return
  * Try (5h)
    * Validation call first.
    * Process the mold
    * All outputs should instead log what they would've output (or, more realistically, mark whether they believe they would've succeeded)
  * node metadata (4h) *[1h]*
* Tests public API (incl. full pipe) (16h) [*1h*]

* NODE - drop column(s) (6h *[4h]*)
  * plan properties
  * implement in backend
  * Implement tests
  * Warning if columns do not exist
  * Warning if empty list of keywords is given

* Document public API (3h)
* Code cleanup and style-validation (3h)
* Installation instructions for backend (3h)

EXTRAS
* Move data used in tests to a common location (3h) *[2h]*
* Need to store ordering of table headers somewhere - perhaps wait with support, but decide strategy now. Also relevant in terms of being able to see headers of tables with no data in it. *[5h]*

#### Milestone 5: Frontend basics - basic layout (3w) ####

* Basic UI layout implemented 6.5h
* Decide testing framework
* Tests of basic UI

* Installation instructions for getting UI to run


#### Milestone 6: Frontend basics - Node creation (3w)

* Decide general styling for node:
  * borders, endpoints, pictogram, etc

* Create menu for nodes [3h]

* NODE - CSV output
  * decide styling for output node [1h]
  * Add node to menu [1h]
  * Auto-generate end-points for nodes [1h]
  * Drag and drop options for nodes [2h]
  * Show properties when clicking on it [2h]
  * write tests for all this

* NODE - CSV input: [2h]
  * decide styling for input node
  * Add node to menu
  * Auto-generate end-points for node
  * Drag and drop options for node
  * Show properties when clicking on it
  * write tests for all this

* Create arrows between two nodes + tests [2h]

* Delete arrow between two nodes + tests

#### Milestone 7: Frontend basics - Running and inspecting (2w)

* Implement connection til backend [4h]

* Ability to run the mold from the UI [2h]

* Preview data in nodes


#### Milestone 8: Frontend basics - Saving and loading, more nodes (2w)

* NODE - Console output:
  * decide styling for node
  * decide styling for output node
  * Add node to menu
  * Auto-generate end-points for nodes
  * Drag and drop options for nodes
  * Show properties when clicking on it
  * write tests for all this

* NODE - drop column
  * decide styling for output node
  * Add node to menu
  * Auto-generate end-points for node
  * Drag and drop options for node
  * Show properties when clicking on it
  * write tests for all this

* Ability to save a pipe
* Ability to load a pipe

#### Milestone 9: Frontend basics - Data validation (3w) ####

* data validation for all the implemented nodes / data-types
* tests
* Clean and clear display of error messages

#### Milestone 10: Error handling (4w)

* Implement connection from backend to frontend
* Make sure backend doesn't explode on errors
* Pass error messages on to front-end
* Display error messages in front-end
* Inspecting nodes in front-end shouldn't be broke on failed backend
* Proper UI error if backend isn't running


#### Milestone 11: Planning and cleanup (2d) ####

* Planlæg en eller flere mål ift. et datasæt som man gerne vil have manipulere på den ene eller anden måde
* Revurder milestones
* Revurder first 'release'

#### Milestone 12: Multi-input nodes (3w) ####

* NODE - merge two columns (join) - hvilken type join, hvad joiner man på, hvordan merges de enkelte felter? Hvilken tabel er den resulterende?
  * UI implementation
  * Backend implementation
  * Validation
  * Tests

* Ensure the correct number of endpoints are displayed, and marked clearly
* Ensure the backend supports this structure
* Update piping functionality + tests

#### Milestone 13: Multi-output nodes (3w) ####
* NODE - filter table (by value in table)
  * UI implementation
  * Backend implementation
  * Validation
  * Tests

* Ensure the correct number of endpoints are displayed, and marked clearly
* Ensure the backend supports this structure
* Update piping functionality + tests

#### Future (1w/node, 1.5w/right click menus, 5w for detailed node view) ####
* NODE - add column (incl. content generator) **MVP**
* NODE - rename column-title **MVP**
* NODE - drop fields if
* NODE - uniquify (ie. take first rows that are unique in some column content)
* NODE - Squash (ie. merge all rows, merging the content by some match formula/join) - should we allow people to uniquify on a different row in the process. So you could eg. get the sum age of all women and all men separately, by squashing the age column with "+" while uniquefying the gender column.
* NODE - Squash to array
* NODE - Split column to multiple **MVP**

CONTENT MANIPULATION:
* NODE - manipulation of data in a column (eg. ALL CAPS, search/replace) **MVP**
* NODE - Maths type transformations of content.. What do do with those? 
* NODE - Map content (ie. valuemapper)
* NODE - transform content

INPUT/OUTPUT NODES:
* NODE - command line PP out
* NODE - Access input
* NODE - Access output
* NODE - mySQL input 
* NODE - mySQL output
* NODE - postgreSQL input
* NODE - postgreSQL output
* NODE - Excel input **MVP**
* NODE - Excel output **MVP**
* NODE - Console output: **MVP**
*
* Create function to merge two columns: "fname" "lname" -> "fullname"
* Extend drop column function to be able to drop multiple columns (ie. take list of column names)
* Create data -> merge("fname", "lname" -> "fullname") -> drop("fname", "lname") -> stdout
* Multi input node
* Macro implementation
* Wrap frontend in atom electron or the like
* * What to do about data-types. This is important in some connections, but not others 
* Tutorial
* Højreklik menuer

* Tidestimater for alting
* Alting til issue tracker
* Klik på fejl/warning i listen over fejl, hop til den pågældende node **MVP**
* More error handling and validation **MVP**
* On checking, output nodes should not be written to - they should all to some extend be replaced by mock-endpoints **MVP**
* Test for laziness in all nodes: both that they are lazy, and that they dont break if handed a lazy table
* Turn off data logging when running proper
* Load testing
