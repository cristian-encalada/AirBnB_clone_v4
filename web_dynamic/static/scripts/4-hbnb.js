$(document).ready(function () {
  let checkedAmenities = [];

  function apiStatus() {
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

  // Function to create an article element for a place
  // !== 1 ? 's' : '' check if place.x is not equal to 1. If not, it adds an "s" to the end of the word
  function createArticle(place) {
      article = `
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

  function postRequest() {
      $.ajax({
          type: 'POST',
          url: 'http://0.0.0.0:5001/api/v1/places_search/',
          contentType: "application/json",
          data: JSON.stringify({}),
          success: function (data) {
              for (place of data) {
                  article = createArticle(place);
                  $('.places').append(article);
              }
              console.log("Success")
          }
      });
  }

  postRequest();

  // Select all amenity input checkboxes
  $('.amenities input[type="checkbox"]').change(function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      // Verify if the checkbox is checked or not
      if ($(this).is(':checked')) {
          checkedAmenities.push({ data_amenity_id: amenityId, data_amenity_name: amenityName });
      } else {
          // If unchecked, remove the amenity that matches the Id
          checkedAmenities = checkedAmenities.filter(function (amenity) {
              return amenity.data_amenity_id !== amenityId;
          });
      }

      // Update the <h4> tag with the list of amenities
      const amenitiesList = checkedAmenities.map(function (amenity) {
          return amenity.data_amenity_name;
      }).join(', ');

      $('.amenities h4').text('Amenities: ' + amenitiesList);

      // Check the state of checkedAmenities
      console.log('Checked Amenities:', checkedAmenities);
  });
});