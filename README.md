# madrid-p2p
A simple web application that shows a map of Madrid and a widget with information about the neighbourhoods with most of the P2P apartments and another widget with information about the apartment's hosts.
The widget reacts to map movement, updating the data when the user moves the map. 
You can click on the name of a neighbourhood to filter the map visualization and hosts. 


The app uses the [CARTO.js library](https://carto.com/developers/carto-js/) and the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial).
I altered the map, removing some elements and changing some colors, in order to avoid distractions and to make the relevant information pop up more.
I tried to keep the project structure as simple as possible, with just one file each for the HTML, CSS and JavaScript so no bundlers are required.
I built a reusable template for rendering both widgets, since they are very similar, and for any other future widget that may need it.

The app can be seen live at https://evamillan.github.io/madrid-p2p. You can also download this repository and access the index.html file.
