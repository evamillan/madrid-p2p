const client = new carto.Client({
  apiKey: 'j3OxoSBlrLexYxaueyY9hg',
  username: 'frontend'
});

const map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 40.43,
    lng: -3.64
  },
  zoom: 12,
  fullscreenControl: false,
  styles: [{
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#616161"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#ffffff"
      }]
    }
  ]
});

map.overlayMapTypes.push(client.getGoogleMapsMapType(map));

const listingsSource = new carto.source.Dataset('madrid_listings');

const listingsStyle = new carto.style.CartoCSS(`
        #layer {
          marker-width: 6;
          marker-fill: #FF5D73;
          marker-line-color: #FFFFFF;
        }
      `);

const listingsLayer = new carto.layer.Layer(listingsSource, listingsStyle);
client.addLayer(listingsLayer);

const categoryDataview = new carto.dataview.Category(listingsSource, 'neighbourhood_group');

const boundingBoxFilter = new carto.filter.BoundingBoxGoogleMaps(map);
categoryDataview.addFilter(boundingBoxFilter);

const renderWidget = (data) => {
  const categories = data.categories.map(category => `
    <li>
      <div class="data-line">
        <h2 data-neighbourhood="${category.name}" class="clickable">
          ${category.name}
        </h2>
        <span>${parseInt(category.value)}</span>
      </div>
      <div class="bar">
        <div class="bar-positive" style="width:${parseInt(category.value / data.count * 100)}%">
        </div>
      </div>
    </li>
    `).join('');

  const content = `
    <h1>NEIGHBOURHOODS</h1>
    <ul class="neighbourhoods">${categories}</ul>`;

  document.querySelector('.widget').innerHTML = content;
  
  addListeners();
};

const addListeners = () => {
  document.querySelector('.neighbourhoods').addEventListener('click', event => {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'H2') {
      const clickedNeighbourhood = clickedElement.dataset.neighbourhood;
      toggleNeighbourhoodFilter(clickedNeighbourhood);
    }
  })
};

const toggleNeighbourhoodFilter = (neighbourhood) => {
  const appliedFilters = listingsSource.getFilters();

  if (appliedFilters.length) {
    listingsSource.removeFilter(appliedFilters[0])
  } else {
    const clickedNeighbourhoodFilter = new carto.filter.Category('neighbourhood_group', { eq: neighbourhood });
    listingsSource.addFilter(clickedNeighbourhoodFilter);
  }
};

categoryDataview.on('dataChanged', renderWidget);
client.addDataview(categoryDataview);
