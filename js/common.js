head.ready(function() {

	var tabs                  = $('.js-tabs'),
		tab                   = tabs.find('.js-tab').children(),
		tabContent            = tabs.find('.js-tabcontent').children(),
		activeClass           = 'is-active',

		search                = $('.search'),
		searchShow            = $('.js-search-show'),
		searchHide            = $('.js-search-hide'),

		sidebar               = $('.l-sidebar__inner'),
		footer                = $('.footer');

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

		var	sidebarTopPosition    = sidebar.offset().top,
			sidebarBottomPosition = sidebar.offset().top + sidebar.height(),
			footerTopPosition     = footer.offset().top - 70;
		// when sidebar height is less than window height
		if ( sidebarBottomPosition < $(window).height() ) {
			$(document).scroll(function(event) {
				var scrollDocumentTop = $(document).scrollTop();

				if ( scrollDocumentTop >= sidebarTopPosition - 20 ) {
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

				if ( scrollDocumentTop - 40 >= footerTopPosition ) {
					sidebar.css({
						position: 'absolute',
						top: 'auto',
						bottom: '0'
					});
				};
			});
		}
		// when sidebar height is larger than window height
		else {
			$(document).scroll(function(event) {
				var scrollDocumentTop = $(document).scrollTop() + $(window).height();

				if ( scrollDocumentTop >= sidebarBottomPosition ) {
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

				if ( scrollDocumentTop >= footerTopPosition ) {
					sidebar.css({
						position: 'absolute',
						top: 'auto',
						bottom: '0'
					});
				};
			});
		};
	};

	if ( !sidebar.hasClass('js-no-change') ) {
		changeSidebarPosition();
	};

});



