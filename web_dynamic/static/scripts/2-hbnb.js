$(document).ready(function() {
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

    // Select all amenity input checkboxes
    $('.amenities input[type="checkbox"]').change(function() {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');

      // Verify if the checkbox is checked or not
      if ($(this).is(':checked')) {
        checkedAmenities.push({ data_amenity_id: amenityId, data_amenity_name: amenityName });
      } else {
        // If unchecked, remove the amenity that matches the Id
        checkedAmenities = checkedAmenities.filter(function(amenity) {
          return amenity.data_amenity_id !== amenityId;
        });
      }

      // Update the <h4> tag with the list of amenities
      const amenitiesList = checkedAmenities.map(function(amenity) {
        return amenity.data_amenity_name;
      }).join(', ');

      $('.amenities h4').text('Amenities: ' + amenitiesList);

      // Check the state of checkedAmenities
      console.log('Checked Amenities:', checkedAmenities);
    });
  });