$(document).ready(function () {
    // console.log('Document ready function executed');
    let checkedAmenities = [];
    let checkedStates = [];
  
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

    // Select all state input checkboxes
    $('.locations input[type="checkbox"]').change(function () {
        console.log('State checkbox changed'); 
        const stateId = $(this).data('id');
        const stateName = $(this).data('name');
    
        // Find if the state object is already in checkedStates
        const existingState = checkedStates.find(function (state) {
         return state.id === stateId;
        });
    
        // Verify if the checkbox is checked or not
        if ($(this).is(':checked')) {
          if (!existingState) {
          // Push the state object if it doesn't exist in the array
            checkedStates.push({ id: stateId, name: stateName });
          }
        } else {
        // If unchecked, remove the state object that matches the Id
          checkedStates = checkedStates.filter(function (state) {
            return state.id !== stateId;
          });
        }
    
        // Update the <h4> tag with the list of state names
        const statesList = checkedStates.map(function (state) {
          return state.name;
        }).join(', ');
    
        $('.locations h4').text('States: ' + statesList);
    
        // Check the state of checkedStates
        console.log('Checked States:', checkedStates);
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

       // Extract just the state IDs from checkedStates
      const stateIds = checkedStates.map(function (state) {
        return state.id;
      });

      // Create a data object to send in the request
      const requestData = {
        amenities: amenityIds,
        states: stateIds,
      };

      // Check if both amenities and states arrays are empty
      if (!requestData.amenities.length && !requestData.states.length) {
        // If both are empty, send an empty object to retrieve all places
        requestData.amenities = requestData.states = {};
      }
  
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify(requestData),
        success: function (data) {
          $('.places').empty(); // Clear existing results
          for (const place of data) {
            const article = createArticle(place);
            $('.places').append(article);
          }
          console.log('Post request done successfully');
        }
      });
    }
  
    postRequest();
  
    // Event listener for the "Search" button
    $('button[type="button"]').click(function () {
      postRequest();
    });
  });
  