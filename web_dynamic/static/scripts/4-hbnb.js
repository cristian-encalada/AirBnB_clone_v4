$(document).ready(function () {
  let checkedAmenities = [];

  function apiStatus () {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/api/v1/status/',
      success: function (data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
  }

  apiStatus();

  // Select all amenity input checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    // Find if the amenity object is already in checkedAmenities
    const existingAmenity = checkedAmenities.find(function (amenity) {
      return amenity.id === amenityId;
    });

    // Verify if the checkbox is checked or not
    if ($(this).is(':checked')) {
      if (!existingAmenity) {
      // Push the amenity object if it doesn't exist in the array
        checkedAmenities.push({ id: amenityId, name: amenityName });
      }
    } else {
    // If unchecked, remove the amenity object that matches the Id
      checkedAmenities = checkedAmenities.filter(function (amenity) {
        return amenity.id !== amenityId;
      });
    }

    // Update the <h4> tag with the list of amenity names
    const amenitiesList = checkedAmenities.map(function (amenity) {
      return amenity.name;
    }).join(', ');

    $('.amenities h4').text('Amenities: ' + amenitiesList);

    // Check the state of checkedAmenities
    console.log('Checked Amenities:', checkedAmenities);
  });

  // Auxiliar function to create an article element tag for a place
  // !== 1 ? 's' : '' check if place.x is not equal to 1. If not, it adds an "s" to the end of the word
  function createArticle (place) {
    const article = `
          <article>
              <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                  ${place.description}
              </div>
          </article>
      `;
    return article;
  }

  function postRequest () {
    // Extract just the amenity IDs from checkedAmenities
    const amenityIds = checkedAmenities.map(function (amenity) {
      return amenity.id;
    });

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }), // Send only the IDs
      success: function (data) {
        $('.places').empty(); // Clear existing results
        for (const place of data) {
          const article = createArticle(place);
          $('.places').append(article);
        }
        console.log('Success');
      }
    });
  }

  postRequest();

  // Event listener for the "Search" button
  $('button[type="button"]').click(function () {
    postRequest();
  });
});
