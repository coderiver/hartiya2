head.ready(function() {
	$('.js-gototop').click(function(event) {
		event.preventDefault();
	    $('html, body').animate({
	        scrollTop: 0
	    }, 500);

	});
	var tabs                  = $('.js-tabs'),
		tab                   = tabs.find('.js-tab').children(),
		tabContent            = tabs.find('.js-tabcontent').children(),
		activeClass           = 'is-active',

		search                = $('.search'),
		searchShow            = $('.js-search-show'),
		searchHide            = $('.js-search-hide'),

		sidebar               = $('.l-sidebar__inner'),
		wrapper               = $('.main-wrap');

	// hide all tabcontents exept first
	tabContent.not(':first-child').hide();

	tab.click(function(event) {
		var activeTabIndex = $(this).index();
		// change active tab
		tab.removeClass(activeClass);
		$(this).addClass(activeClass);
		// change active tabcontent
		tabContent.hide();
		tabContent.eq(activeTabIndex).show();
		return false;
	});

	searchShow.click(function(event) {
		search.slideToggle();
		searchShow.toggleClass('is-inactive');
		return false;
	});

	searchHide.click(function(event) {
		search.slideUp();
		searchShow.removeClass('is-inactive');
		return false;
	});

	//articles galleries synchronize
	var slideshows = $('.cycle-slideshow').on('cycle-next cycle-prev', function(e, opts) {
		slideshows.not(this).cycle('goto', opts.currSlide);
	});

	$('.gallery__pager .slide').click(function() {
		var index = $('.gallery__pager').data('cycle.API').getSlideIndex(this);
		console.log(index);
		slideshows.cycle('goto', index);
	});

	//change position of sidebar to fixed/to static when scrolling document
	var changeSidebarPosition = function() {

		$(document).scroll(function(event) {
			b = $('body');
			if($(document).scrollTop()>400){
				b.addClass('can-gototop')
			} else{
				b.removeClass('can-gototop')
			}

			var sidebarBottomPosition = wrapper.offset().top + sidebar.height(),
				wrapperTopPosition    = wrapper.offset().top,
				wrapperBottomPosition = wrapper.offset().top + wrapper.height();

			// check if layout is
			if ( wrapper.parents('l-article').length == 0 && $(window).width() < 1150 ) {
				return false;
			};

			// when sidebar height is less than window height
			if ( sidebar.height() < $(window).height() ) {
				var targetTopPosition    = $(document).scrollTop() + 20,
					targetBottomPosition = $(document).scrollTop() + sidebar.height() +20;

				if ( targetTopPosition >= wrapperTopPosition ) {
					sidebar.css({
						position: 'fixed',
						top: '20px',
						bottom: 'auto'
					});
				}
				else {
					sidebar.css({
						position: 'static',
						top: 'auto',
						bottom: 'auto'
					});
				};

				if ( targetBottomPosition >= wrapperBottomPosition ) {
					sidebar.css({
						position: 'absolute',
						top: 'auto',
						bottom: '0'
					});
				};
			}
			// when sidebar height is larger than window height
			else {
				var targetTopPosition    = $(document).scrollTop() + $(window).height();

				if ( targetTopPosition >= sidebarBottomPosition ) {
					sidebar.css({
						position: 'fixed',
						top: 'auto',
						bottom: '0'
					});
				}
				else {
					sidebar.css({
						position: 'static',
						top: 'auto',
						bottom: 'auto'
					});
				};

				if ( targetTopPosition >= wrapperBottomPosition ) {
					sidebar.css({
						position: 'absolute',
						top: 'auto',
						bottom: '0'
					});
				};
			};
		});
	};

	// if ( !sidebar.hasClass('js-no-change') ) {
		changeSidebarPosition();
	// };

});
