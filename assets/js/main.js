/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	"use strict";

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

    $.fn.textWidth = function(text) {
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').addClass('ruler').appendTo(document.body);
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text());

        var cssValues = [
        	'font',
			'font-weight',
			'font-size',
			'line-height',
			'font-family'
		];

        for(var i=0; i<cssValues.length; i++) {
            $.fn.textWidth.fakeEl.css(cssValues[i], $(this).css(cssValues[i]));
		}

        return $.fn.textWidth.fakeEl.width();
    };

	$(function() {

		var init = function() {
            var $window = $(window),
                $body = $('body');

            // Disable animations/transitions until the page has loaded.
            $body.addClass('is-loading');

            $window.on('load', function () {
                window.setTimeout(function () {
                    $body.removeClass('is-loading');
                }, 100);
            });

            // Fix: Placeholder polyfill.
            $('form').placeholder();

            // Prioritize "important" elements on medium.
            skel.on('+medium -medium', function () {
                $.prioritize(
                    '.important\\28 medium\\29',
                    skel.breakpoint('medium').active
                );
            });

            // Hader
            $("#slider").sliderResponsive({
                slidePause: 5000,
                fadeSpeed: 800,
                autoPlay: "on",
                showArrows: "off",
                hideDots: "on",
                hoverZoom: "off",
                titleBarTop: "off"
            });

            // Handle the mouseenter and mouseleave functionality
            $(".img").mouseenter(function () {
                $(this).addClass("hover");
            })
                .mouseleave(function () {
                    $(this).removeClass("hover");
                });

            $('.animation_check').each(function () {
                if ($(this).offset().top < $(window).height()) {
                    var $anims = 'animate-fadeInLeft,animate-fadeInUp,animate-fadeInDown-80,animate-fadeInDown,animate-fadeInRight'.split(',');
                    for (var i = 0; i < $anims.length; i++) {
                        if ($(this).hasClass($anims[i])) {
                            $(this).removeClass($anims[i]);
                        }
                    }
                    $(this).show();
                }
                ;
            });

            // Animations
            $('.animate-fadeInLeft').waypoint(function () {
                $('.animate-fadeInLeft').addClass('animated fadeInLeft');
            }, {
                offset: '75%'
            })
            $('.animate-fadeInLeft').on(
                "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                function () {
                    $(this).removeClass("fadeInLeft").removeClass('animated').removeClass('animate-fadeInLeft');//.dequeue();
                }
            );
            ;
            $('.animate-fadeInUp').waypoint(function () {
                $('.animate-fadeInUp').addClass('animated fadeInUp');
            }, {
                offset: '75%'
            });
            $('.animate-fadeInDown-80').waypoint(function () {
                $('.animate-fadeInDown-80').addClass('animated fadeInDown');
            }, {
                offset: '80%'
            });
            $('.animate-fadeInDown').waypoint(function () {
                $('.animate-fadeInDown').addClass('animated fadeInDown');
            }, {
                offset: '75%'
            });
            $('.wp5').waypoint(function () {
                $('.wp5').addClass('animated fadeInUp');
            }, {
                offset: '75%'
            });
            $('.wp6').waypoint(function () {
                $('.wp6').addClass('animated fadeInDown');
            }, {
                offset: '75%'
            });
            $('.animate-fadeInRight').waypoint(function () {
                $('.animate-fadeInRight').addClass('animated fadeInRight');
            }, {
                offset: '75%'
            });


            $('.animate-fadeInRight_85').waypoint(function () {
                $('.animate-fadeInRight_85').addClass('animated fadeInRight');
            }, {
                offset: '85%'
            });

            $('.animate-fadeInLeft_85').waypoint(function () {
                $('.animate-fadeInLeft_85').addClass('animated fadeInLeft');
            }, {
                offset: '85%'
            });

            $('figure.project_anim .caption').each(function () {
                var wdh = $(this).textWidth($(this).html());
                $(this).css('width', wdh + 'px');
                $(this).html('<div>' + $(this).html() + '</div>');
            });

            // Modal popup in contact form
            var $modalMSG = $('#modal-msg');

            $modalMSG._locked = false;

            $modalMSG._lock = function () {

                if ($modalMSG._locked)
                    return false;

                $modalMSG._locked = true;

                window.setTimeout(function () {
                    $modalMSG._locked = false;
                }, 350);

                return true;
            };

            $modalMSG._show = function () {
                if ($modalMSG._lock())
                    $body.addClass('is-modal-msg-visible');
            };

            $modalMSG._hide = function () {
                if ($modalMSG._lock())
                    $body.removeClass('is-modal-msg-visible');
            };

            $modalMSG._toggle = function () {
                if ($modalMSG._lock())
                    $body.toggleClass('is-modal-msg-visible');
            };

            $modalMSG
                .appendTo($body)
                .on('click', function (event) {

                    event.stopPropagation();

                    // Hide.
                    $modalMSG._hide();

                })
                .find('.inner')
                .on('click', '.close', function (event) {

                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();

                    // Hide.
                    $modalMSG._hide();

                })
                .on('click', function (event) {
                    event.stopPropagation();
                })
                .on('click', 'a', function (event) {

                    var href = $(this).attr('href');

                    event.preventDefault();
                    event.stopPropagation();

                    // Hide.
                    $modalMSG._hide();

                    // Redirect.
                    window.setTimeout(function () {
                        window.location.href = href;
                    }, 350);

                });

            // Contact form
            var contactForm = $("#contactForm");
            contactForm.on("submit", function (e) {
                e.preventDefault();

                var name = $("#name").val();
                var email = $("#email").val();
                var message = $("#message").val();

                $.ajax({
                    type: "POST",
                    url: "mailer.php",
                    data: {
                        name: name,
                        email: email,
                        message: message,
                        captcha: grecaptcha.getResponse()
                    }
                }).done(function (msg) {
                    $modalMSG.find('li').html(msg);
                    $modalMSG._show();
                });
            })
        };

        if($('#game_template').length > 0)
        {
            var template = $('#game_template').html();
            var version = parseInt(Math.random()*100000);
            $.getJSON( "projects.json?v="+version, function(games) {
				for(var i=0; i<games.length; i++)
				{
					var game = games[i];
					game.class = i%2 == 1 ? 'animate-fadeInRight_85' : 'animate-fadeInLeft_85';
					if(i >= 2)
					{
                        game.class += ' delay-05s';
                    }
                    if( games.length%2 == 1 && i == 0 )
                    {
                        game.class += ' project_anim_wide';
                        game.image = game.image_wide;
                    }

                    $('.inner-projects').append(tmpl(template, game));
				}

				init();
            });

        }
	});
})(jQuery);