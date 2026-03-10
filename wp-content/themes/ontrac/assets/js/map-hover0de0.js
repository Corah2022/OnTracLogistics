(function ($) {
	let $map = $('#js-map-figure');
    let $states = $('#js-map-states');

    if($(window).width() <= 767) {
    	$map.attr('src', `${$map.data('base')}map-mobile.png`);

		$states.on('change', (e) => {
			let state = $(e.currentTarget).val();
			let dot = state;

			if($map.data('category') == 'delivery') {
        $("#mobileMapLegend > span").css("display", "none");
        switch (parseInt(state)) {
          // Phoenix
          case 1:
            dot = 10;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Charlotte
          case 2:
            dot = 15;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Columbus
          case 3:
            dot = 12;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Commerce
          case 4:
            dot = 9;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Dallas
          case 5:
            dot = 11;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Denver
          case 6:
            dot = 5;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Hayward
          case 7:
            dot = 2;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Nashville
          case 8:
            dot = 14;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Ontario
          case 9:
            dot = 7;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Orlando
          case 10:
            dot = 16;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Reno
          case 11:
            dot = 3;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // South Brunswick
          case 12:
            dot = 17;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Logan
          case 13:
            dot = 13;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Vegas
          case 14:
            dot = 6;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Vancouver
          case 15:
            dot = 1;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Visalia
          case 16:
            dot = 8;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          // Salt Lake
          case 17:
            dot = 4;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
          case 18:
            dot = 18;
            $("#mobileMapLegend > span:nth-child(1)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(2)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(3)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(4)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(5)").css("display", "flex");
            // $("#mobileMapLegend > span:nth-child(6)").css("display", "flex");
            $("#mobileMapLegend > span:nth-child(7)").css("display", "flex");
            break;
        }
      }

			if(state != '') {
				$map.attr('src', `${$map.data('base')}${$map.data('category')}-mobile-${state}.png`);

				$('.js-map-dots img').hide();
				$(`.js-map-dots img:eq(${dot - 1})`).show();
        // Show after user chooses a city/state
        // $("#mobileMapLegend > span").css("display", "flex");

			}
			else {
				$map.attr('src', `${$map.data('base')}map-mobile.png`);

        $('.l-delivery__about-mobile').show();

				$('.js-map-dots img').show();
			}
		});
	}
	else {
		$('.js-map-dots img').hover((e) => {

			let index = $(e.currentTarget).index() + 1;

			$map.attr('src', `${$map.data('base')}${$map.data('category')}-hover-${index}.png`);

			$(`.js-map-dots img:not(:nth-child(${index}))`).hide();
		}, (e) => {
			$map.attr('src', `${$map.data('base')}map.png`);

			$('.js-map-dots img').show();
		});
	}
})(jQuery);

