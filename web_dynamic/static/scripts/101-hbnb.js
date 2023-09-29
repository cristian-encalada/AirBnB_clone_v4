$(document).ready(function () {
  // console.log('Document ready function executed');
  let checkedAmenities = [];
  let checkedStates = [];
  let checkedCities = [];

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
  $('.state-checkbox').change(function () {
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

  // Select all city input checkboxes
  $('.city-checkbox').change(function () {
  // console.log('City checkbox changed');
    const cityId = $(this).data('id');
    const cityName = $(this).data('name');

    // Find if the city object is already in checkedCities
    const existingCity = checkedCities.find(function (city) {
      return city.id === cityId;
    });

    // Verify if the checkbox is checked or not
    if ($(this).is(':checked')) {
      if (!existingCity) {
      // Push the city object if it doesn't exist in the array
        checkedCities.push({ id: cityId, name: cityName });
      }
    } else {
    // If unchecked, remove the city object that matches the Id
      checkedCities = checkedCities.filter(function (city) {
        return city.id !== cityId;
      });
    }

    // Update the <h4> tag with the list of city names
    const citiesList = checkedCities.map(function (city) {
      return city.name;
    }).join(', ');

    $('.locations h4').text('Cities: ' + citiesList);

    // Check the state of checkedCities
    console.log('Checked Cities:', checkedCities);
  });

  // Retrieve and append reviews to each article
  function getReviews (placeId, articleElement) {
    console.log('Clicked on "Show" button');
    $.ajax({
      type: 'GET',
      url: `http://127.0.0.1:5001/api/v1/places/${placeId}/reviews`,
      success: function (reviews) {
        console.log('Reviews data:', reviews);
        const reviewsDiv = articleElement.find('.reviews');
        reviewsDiv.empty(); // Clear existing reviews

        for (const review of reviews) {
        // Create a review and append it to the reviews div
          const reviewElement = `<p>${review.text}</p>`;
          reviewsDiv.append(reviewElement);
        }
      }
    });
  }

  // Function for the reviews visibility
  function reviewsVisibility (reviewsDiv, showHideButton) {
    // Hide reviews by default
    reviewsDiv.hide();

    showHideButton.click(function () {
      if (showHideButton.text() === 'Show') {
        // Show reviews
        showHideButton.text('Hide');
        reviewsDiv.slideDown();
      } else {
        // Hide reviews
        showHideButton.text('Show');
        reviewsDiv.slideUp();
      }
    });
  }

  // Event delegation for show/hide reviews
  $('.places').on('click', '.span-reviews', function () {
    const reviewsDiv = $(this).closest('.reviews').find('.reviews-div');
    if ($(this).text() === 'Show') {
      getReviews($(this).data('place-id'), $(this).closest('article'));
    }
    reviewsVisibility(reviewsDiv, $(this));
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
      <div class="reviews">
        <h2>
          Reviews:
          <span class="span-reviews" data-place-id="${place.id}">Show</span>
        </h2>
        <div class="reviews-div">
          <!-- Reviews will be appended here -->
        </div>
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

    // Extract just the city IDs from checkedCities
    const cityIds = checkedCities.map(function (city) {
      return city.id;
    });

    // Create a data object to send in the request
    const requestData = {
      amenities: amenityIds,
      states: stateIds,
      cities: cityIds
    };

    // Check if amenities, states and cities arrays are empty
    if (!requestData.amenities.length && !requestData.states.length && !requestData.cities.length) {
      // If all are empty, send an empty object to retrieve all places
      requestData.amenities = requestData.states = requestData.cities = {};
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
          const mainArticle = $(article);
          $('.places').append(mainArticle);
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
