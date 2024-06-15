(function ($) {
    "use strict";
    /*=================================
      JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Set Background Mask Image
    8. Ajax Contact Form
    09. Search Box Popup
    10. Popup Sidemenu
    11. Popup Sidecart
    12. Magnific Popup
    13. Counter Up
    14. Countdown
    15. Quantity Plus Minus
    16. Hero Slider One and Two with Text Animation
    17. Testimonial Slider
    18. Fitness Class Slider
    19. Trainer Slider Slider
    20. Portfolio  Slider
    21. Swiper Animation
    22. Before & after image comparison slider
  */
    /*=================================
      JS Index End
  ==================================*/
    /*
  
  /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
    });



    /*---------- 02. Preloader ----------*/
    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".preloader").css("display", "none");
            });
        });
    }



    /*---------- 03. Mobile Menu Active ----------*/
    $.fn.thmobilemenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".th-menu-toggle",
                bodyToggleClass: "th-body-visible",
                subMenuClass: "th-submenu",
                subMenuParent: "th-item-has-children",
                subMenuParentToggle: "th-active",
                meanExpandClass: "th-mean-expand",
                appendElement: '<span class="th-mean-expand"></span>',
                subMenuToggleClass: "th-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this); // Select menu

            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            // Class Set Up for every submenu
            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            // Toggle Submenu
            function toggleDropDown($element) {
                if ($($element).next("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).next("ul").slideToggle(opt.toggleSpeed);
                    $($element).next("ul").toggleClass(opt.subMenuToggleClass);
                } else if ($($element).prev("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).prev("ul").slideToggle(opt.toggleSpeed);
                    $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
                }
            }

            // Submenu toggle Button
            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            // Hide Menu On out side click
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            // Stop Hide full menu on menu click
            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".th-menu-wrapper").thmobilemenu();



    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
        } else {
            $('.sticky-wrapper').removeClass('sticky')
        }
    })



    /*---------- 05. Scroll To Top ----------*/
    // progressAvtivation
    if ($('.scroll-top')) {
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });
        jQuery(scrollTopbtn).on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, 1);
            return false;
        })
    }



    /*---------- 06. Set Background Image ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }



    /*---------- 07. Set Background Mask Image ----------*/
    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
            var mask = $(this).attr('data-mask-src');
            $(this).css({
                'mask-image': 'url(' + mask + ')',
                '-webkit-mask-image': 'url(' + mask + ')'
            });
            $(this).removeAttr('data-mask-src');
        });
    };




    /*----------- 8. Ajax Contact Form ----------*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    url: $(form).attr("action"),
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });




    /*---------- 09. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(
        ".popup-search-box",
        ".searchBoxToggler",
        ".searchClose",
        "show"
    );




    /*---------- 10. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls)
        });
        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu(
        '.sidemenu-wrapper',
        '.sideMenuToggler',
        '.sideMenuCls',
        'show');




    /*---------- 11. Popup Sidecart ----------*/
    function popupSideCart($sideCart, $sideMunuOpen, $sideCartCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideCart).addClass($toggleCls);
        });
        $($sideCart).on('click', function (e) {
            e.stopPropagation();
            $($sideCart).removeClass($toggleCls)
        });
        $($sideCartCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideCart).removeClass($toggleCls);
        });
    };
    popupSideCart(
        '.side-cart-wrapper',
        '.sideCartToggler',
        '.sideCartCls',
        'show');




    /*----------- 12. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });




    /*----------- 13. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });



    /*----------- 14. Countdown ----------*/
    $.fn.countdown = function () {
        $(this).each(function () {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };



    /*----------- 15. Quantity Plus Minus ----------*/

    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val());
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });




    /*--------------------------------------------------
    16. Hero Slider One and Two with Text Animation
    ---------------------------------------------------*/
    const swiperSliders = [
        { selector: ".heroSliderOne", effect: "slide" },
        { selector: ".heroSliderTwo", effect: "fade" },
        { selector: ".heroSliderThree", effect: "overflow" }
    ];

    swiperSliders.forEach(slider => {
        const swiper = new Swiper(slider.selector, {
            effect: slider.effect,
            speed: 1500,
            loop: true,
            spaceBetween: 0,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                // When window width is >= 120px
                120: {
                    slidesPerView: 1,
                    spaceBetween: 70,
                },
                // When window width is >= 640px
                640: {
                    spaceBetween: 0,
                },
            },
            navigation: {
                nextEl: slider.selector + ' .swiper-button-next',
                prevEl: slider.selector + ' .swiper-button-prev',
            },
        });
    });


    /*--------------------------------------------------
    17. Testimonial Slider
    ---------------------------------------------------*/
    var swiper = new Swiper(".testimonialSliderOne", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 1200,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 70,
            },
            // When window width is >= 640px
            640: {
                spaceBetween: 30,
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /* Testimonial two */
    var swiper = new Swiper(".testimonialSliderTwo", {
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    /* Testimonial three */
    var swiper = new Swiper(".testimonialSliderThree", {
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        direction: 'vertical',
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 70,
                direction: 'horizontal',
            },
            // When window width is >= 640px
            640: {
                spaceBetween: 30,
                direction: 'vertical',
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });


    /*--------------------------------------------------
    18. Fitness Class Slider
   ---------------------------------------------------*/
    /* Fitness Class Slider One */
    var swiper = new Swiper(".fitnessClassSliderOne", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 70,
            },
            // When window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },

        navigation: {
            nextEl: '.fitnessClassOne-slider-arrow.fitnessClassOne-next',
            prevEl: '.fitnessClassOne-slider-arrow.fitnessClassOne-prev',
        },
    });


    /* Fitness Class Slider Two */
    var swiper = new Swiper(".fitnessClassSliderTwo", {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 3,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 70,
            },
            // When window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 100,
            },
        },

        navigation: {
            nextEl: '.fitnessClassTwo-slider-arrow.fitnessClassTwo-next',
            prevEl: '.fitnessClassTwo-slider-arrow.fitnessClassTwo-prev',
        },
    });


    /*--------------------------------------------------
    19. Trainer Slider Slider
   ---------------------------------------------------*/
    /* Trainer Slider One */
    var swiper = new Swiper(".trainerSliderOne", {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },

        navigation: {
            nextEl: ".trainerTwo-next",
            prevEl: ".trainerTwo-prev",
        },
    });

    /* Trainer Slider Two */
    var swiper = new Swiper(".trainerSliderTwo", {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },

        navigation: {
            nextEl: ".trainerTwo-next",
            prevEl: ".trainerTwo-prev",
        },
    });

    /* Trainer Slider Three */
    var swiper = new Swiper(".trainerSliderThree", {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 1500,
        loop: true,
        loopAdditionalSlides: 2,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            // When window width is >= 120px
            120: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 640px
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            // When window width is >= 1024px
            1024: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },

        navigation: {
            nextEl: ".trainerTwo-next",
            prevEl: ".trainerTwo-prev",
        },
    });


    /*--------------------------------------------------
    20. Portfolio  Slider
   ---------------------------------------------------*/
    /* Portfolio Slider One */
    var swiper = new Swiper(".portfolioSliderOne", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        loopAdditionalSlides: 3,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        centeredSlides: true,  // Center the active slide
        breakpoints: {
            120: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                this.slides.forEach((slide, index) => {
                    const body = slide.querySelector('.portfolio_body');
                    if (body) {
                        body.style.display = index === this.activeIndex ? 'flex' : 'none';
                        slide.classList.toggle('active-slide', index === this.activeIndex);
                    }
                });
            },
            slideChange: function () {
                this.slides.forEach((slide, index) => {
                    const body = slide.querySelector('.portfolio_body');
                    if (body) {
                        body.style.display = index === this.activeIndex ? 'flex' : 'none';
                        slide.classList.toggle('active-slide', index === this.activeIndex);
                    }
                });
            },
        },
    });


    /*--------------------------------------------------
    21. Product  Slider
   ---------------------------------------------------*/
    /* Product Slider One */
    var swiper = new Swiper(".productSliderOne", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 1000,
        loop: true,
        loopAdditionalSlides: 4,
        loopFillGroupWithBlank: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },   
        breakpoints: {
            120: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        }, 

        navigation: {
            nextEl: ".productOne-next",
            prevEl: ".productOne-prev",
        },
    });

    
    /*--------------------------------------------------
    22. Swiper Animation
   ---------------------------------------------------*/
    $(document).ready(function () {
        const animatedElements = $('[data-animate]');

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.each(function () {
            observer.observe(this);
        });
    });


    /*-------------------------------------------------- 
    23. Before & after image comparison slider
   ---------------------------------------------------*/
    $("#slider").on("input change", (e)=>{
        const sliderPos = e.target.value;
        // Update the width of the foreground image
        $('.foreground-img').css('width', `${sliderPos}%`)    
        // Update the position of the slider button
        $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`) 
      });


    /*-------------------------------------------------- 
    24. Price slider
   ---------------------------------------------------*/
  $(".price_slider").slider({
    range: true,
    min: 10,
    max: 100,
    values: [10, 75],
    slide: function (event, ui) {
      $(".from").text("$" + ui.values[0]);
      $(".to").text("$" + ui.values[1]);
    }
  });
  $(".from").text("$" + $(".price_slider").slider("values", 0));
  $(".to").text("$" + $(".price_slider").slider("values", 1));


    /*--------------------------------------------------
      select onput
  ---------------------------------------------------*/
  if ($('.single-select').length){
    $('.single-select').niceSelect();
}


    //     window.addEventListener('contextmenu', function (e) {
    //       // do something here...
    //       e.preventDefault();
    //     }, false);


    //   /*----------- 00. Inspect Element Disable ----------*/
    //     document.onkeydown = function (e) {
    //       if (event.keyCode == 123) {
    //         return false;
    //       }
    //       if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //         return false;
    //       }
    //       if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //         return false;
    //       }
    //       if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //         return false;
    //       }
    //       if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
    //         return false;
    //       }
    //     }


})(jQuery);



