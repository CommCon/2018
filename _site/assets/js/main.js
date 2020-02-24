$(document).ready(function () {


    $('.schedule_expand').on('click', function(e){
        e.preventDefault();
        var targetContent = $(this).closest('.schedule_item').find('.panel-collapse');
        targetContent.toggleClass('in');
        $(this).toggleClass('collapsed');
    });

    if ( $('#googleMap').length > 0 ) {
        var $latitude = 51.211044;
        var $longitude = -0.395894;
        var $map_zoom = 15;
        var style = [
            {
              "stylers": [
                {
                  "color": "#ffeb3b"
                },
                {
                  "saturation": 100
                }
              ]
            },
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          ];
        var map_options = {
            center: new google.maps.LatLng($latitude,$longitude),
            zoom: $map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel:false,
            styles:style
        };
        var map = new google.maps.Map(document.getElementById('googleMap'),map_options);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng($latitude,$longitude),
            map: map,
            visible: true,
        });
    }

    /*=================================
     ||          Registration
     ==================================*/
    $("#registration_form").submit(function (e) {

        e.preventDefault();
        
        var name = $('#registration_form input[name=name]').val();
        var email = $('#registration_form input[name=email]').val();

        if($.trim(name) != '' && $.trim(email) != '') {
            var url = ["https://ti.to/nimbleape/commcon2018/interested_users/subscribe.json?&interested_user[email]=", email , "&interested_user[name]=", name, "&callback=?"].join('')
            $.getJSON(url, null, function(data){

            }).error(function() { 

            })
        } else {
            //Error
        }

        return false;

    });

    /*=================================
     ||          Submission
     ==================================*/
    $("#submission_form").submit(function (e) {

        e.preventDefault();
        var $ = jQuery;

        var postData = $(this).serializeArray(),
            formURL = $(this).attr("action"),
            $sfResponse = $('#submissionFormResponse'),
            $sfsubmit = $("#sfsubmit"),
            sfsubmitText = $sfsubmit.text();

        $sfsubmit.text("Processing...");


        $.ajax(
            {
                url: formURL,
                type: "POST",
                data: postData,
                success: function (data) {
                    $sfResponse.html(data);
                    $sfsubmit.text(sfsubmitText);
                    $('#submission_form input[name=fname]').val('');
                    $('#submission_form input[name=lname]').val('');
                    $('#submission_form input[name=email]').val('');
                    $('#submission_form input[name=subject]').val('');
                    $('#submission_form textarea[name=message]').val('');
                },
                error: function (data) {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });

    /*=================================
     ||          Contact
     ==================================*/
    $("#contactForm").submit(function (e) {

        e.preventDefault();
        var $ = jQuery;

        var postData = $(this).serializeArray(),
            formURL = $(this).attr("action"),
            $cfResponse = $('#contactFormResponse'),
            $cfsubmit = $("#cfsubmit"),
            cfsubmitText = $cfsubmit.text();

        $cfsubmit.text("Sending...");


        $.ajax(
            {
                url: formURL,
                type: "POST",
                data: postData,
                success: function (data) {
                    $cfResponse.html(data);
                    $cfsubmit.text(cfsubmitText);
                    $('#contactForm input[name=name]').val('');
                    $('#contactForm input[name=email]').val('');
                    $('#contactForm textarea[name=message]').val('');
                },
                error: function (data) {
                    alert("Error occurd! Please try again");
                }
            });

        return false;

    });

    if($('.schedule_tabs').length) {
        //$('.schedule_tabs a:first').click();
    }
});


// Countdown jquery

$(function () {
    var day = 25,
        month = 06,
        year = 2018;
    var austDay = new Date(year, month - 1, day);
    $('#defaultCountdown').countdown({until: austDay});
    $('#year').text(austDay.getFullYear());
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

/*
 * Change Navbar color while scrolling
 */

$(window).scroll(function () {
    handleTopNavAnimation();
});

$(window).load(function () {
    handleTopNavAnimation();
});

function handleTopNavAnimation() {
    var top = $(window).scrollTop();

    if (top > 10) {
        $('#site-nav').addClass('navbar-solid');
    }
    else {
        $('#site-nav').removeClass('navbar-solid');
    }
}

$(function () {
    $('#navbar-items a[href*=#]:not([href=#]), a.inpage').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            console.log(target);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
});