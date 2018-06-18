$(document).ready(() => {

  $.getJSON('https://www.algaecal.com/wp-json/acf/v3/options/options').done(data => {
    //console.log(data.acf);
    /*
    get the company phone number (default_phone_number) and to show the message ‘Speak to Our Bone Specialist’ if and only if the current time is within working hours.
    */
    //console.log(data.acf.office_hours);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const currentDay = currentDate.getDay();

    const startingTime = data.acf.office_hours[currentDay].starting_time;
    const startingHour = parseInt(startingTime.slice(0, 2));
    const startingMin = parseInt(startingTime.slice(2));
    const closingTime = data.acf.office_hours[currentDay].closing_time;
    const closingHour = parseInt(closingTime.slice(0, 2));
    const closingMin = parseInt(closingTime.slice(2));

    // console.log(currentDate, currentDay, currentHour, currentMin);
    // console.log(startingTime, startingHour, startingMin);
    // console.log(closingTime, closingHour, closingMin);
    if (currentHour >= startingHour && currentMin > startingMin) {
      if (currentHour < closingHour || (currentHour == closingHour && currentMin < closingMin)) {
        const phone = data.acf.default_phone_number;
        $('#navbarText').append('<strong>Tap to Talk <a href="tel:+' + phone + '">' + phone + '</a></strong><span class="navbar-text-contact">Speak to our Bone Health Specialists!</span>');
      }
    }

    /*
     link in the guarantee should trigger a bootstrap modal popup with the content from the 7 year guarantee long form found here: https://www.algaecal.com/wp-json/acf/v3/options/options
    */
  });

  /*
   three package pricing bundle boxes hidden until the video hits the 2:13 second
  */
  window._wq = window._wq || [];
  _wq.push({
    id: "cecdwaq3dz",
    onReady: video => {
      video.bind("secondchange", s => {
        //console.log("the second changed to " + s);
        // show products when pass 2:13
        $('#products').hide();

        if (s >= 133) {
          $('#products').show();
        }
      });
    }
  });
});
