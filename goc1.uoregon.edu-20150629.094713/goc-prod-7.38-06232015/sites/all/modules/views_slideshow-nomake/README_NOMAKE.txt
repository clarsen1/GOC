Views Slideshow depends on these libraries so they need to be included in your platfrom make file.

; Modules
; --------
projects[views_slideshow-nomake][download][type] = "git"
projects[views_slideshow-nomake][download][url] = "https://git.uoregon.edu/scm/uo_drpl_prod/uobanner.git"
projects[views_slideshow-nomake][type] = "module"


; Libraries
; ---------
libraries[jquery.cycle][type] = "libraries"
libraries[jquery.cycle][download][type] = "file"
libraries[jquery.cycle][download][url] = "https://raw.githubusercontent.com/malsup/cycle/master/jquery.cycle.all.js"
libraries[json2][type] = "libraries"
libraries[json2][download][type] = "file"
libraries[json2][download][url] = "https://raw.githubusercontent.com/douglascrockford/JSON-js/master/json2.js"
