# Roadmap #

#### Milestone X: Backend basics - input/output nodes and pipes (45h) (*[16h45m]*) ####

* Delete arrow between two nodes + tests
** Find suitable place for deletion: menuitem? GUI menu item? Under general? UI symbol
** Confirmation if sensible
** Ensure moving of arrow gets recorded properly
** update UI
** Trigger try event

* Deletion of nodes
** Find suitable place for deletion: menuitem? GUI menu item? Under general? UI symbol
** Confirmation if sensible
** esnure it's recorded properly
** update UI
** Trigger try event

* Ability to load a pipe 14:30
** Load menu item (20m) DONE
** Event triggered on click + ctrl+o/cmd+o (15m) DONE
** show file system picker (15m) DONE
** save filename to session after load (10m)
** Create and render nodes (60m)
** Create and render connections (60m)
** Do run (20m)
** Clear things in case there is already a mold on screen

* Run (5h)
  * First do validation call.
  * If no errors, process the mold.
  * On errors, break the process and return
  * run from UI on clicking the play button

* Tests of basic UI

* NODE - CSV output
  * write tests for UI
  * write tests for backend
  * Save dialog instead of open

* NODE - CSV input:
  * write tests for UI
 
* NODE - drop column
  * write tests for UI
  * write tests for backend

* Other cleanup:
  * wrap samples in scrollbars when necessary




#### Milestone 10: Error handling (4w)

* Proper UI error if backend isn't running


#### Milestone 11: Planning and cleanup (2d) ####

* Planlæg en eller flere mål ift. et datasæt som man gerne vil have manipulere på den ene eller anden måde
* Revurder milestones
* Revurder first 'release'
* Stresstest backend for at sikre at den kan håndtere det (ie. er lazy)... Hvis jeg ikke kan håndtere store datamængder er det hele lidt ligegyldigt.
* Documentation for adding nodes (1t *[30m]*)

* Installation instructions for backend (3h)
* Installation instructions for getting UI to run

#### Milestone 12: Multi-input nodes (3w) ####

* NODE - Console output:
  * decide styling for node
  * decide styling for output node
  * Add node to menu
  * Auto-generate end-points for nodes
  * Drag and drop options for nodes
  * Show properties when clicking on it
  * write tests for all this

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
* NODE - merge multiple columns into single column: "fname" "lname" -> "fullname"

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

* Multi input node
* Macro implementation
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
* Configuration for molder skal gemmes i en configurationsfil (såsom antallet af sample linier, sidste åbnet fil (så den kan blive genåbnet), listen over de sidste X filer man har åbnet, preferences ift. setup/beskeder/osvosv) - evt se electron-json-storage
