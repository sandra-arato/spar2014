spar2014
========

mini project to gather exhibitors of upcoming SPAR international conference

The map loads the location of the exhibitors that come to the conference. If you click on a marker, it shows the company name, and provides a link to the company website. 
The exhibitor list is manually copied from the exhibition's official website, then website info and the company's location is added to a Google Spreadsheet. Then the data is retrieved in form of a JSON feed from Spreadsheets Data API. The geocoding is done inside the spreadsheet, via MapBox's Geo script with MapQuest Nominatim geocoding services. More info about the geocoding: https://www.mapbox.com/geo-for-google-docs/