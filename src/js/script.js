$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: true,
        draggable: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/arrL.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/arrR.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                    draggable: true
                }
            }
        ]
    })

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault()
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    function hideScrollBar() {
        let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.cssText = `overflow:hidden;margin-right:${scrollBarWidth}px;background-color:#F6F6F6`;
        $('.pageup').fadeOut('fast');
    }

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
        hideScrollBar();
    });
    $('.modal-window__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('fast');
        document.body.style.cssText = '';
    });
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal-window__description').text($('.catalog-item__subtitle').eq(i).text());
            console.log($('catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
            hideScrollBar();
        })
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: 'required',
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: 'Пожалуйста, введите своё имя',
                    minlength: jQuery.validator.format('Введите как минимум {0} символа')
                },
                phone: 'Пожалуйста, введите свой номер телефона',
                email: {
                    required: 'Пожалуйста, введите свою почту',
                    email: 'Неправильно введёт адрес почты'
                }
            }
        });
    };

    validateForm('#consultation form');
    validateForm('#order form');
    validateForm('#consultation-form');

    $('input[name=phone]').mask('+375 (99) 999-99-99');

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut('fast');
            $('.overlay, #thanks').fadeIn('fast');

            $('form').trigger('reset');
        });
        return false;
    });

    // pageup and smooth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('.pageup').fadeIn('fast');
        } else {
            $('.pageup').fadeOut('fast');
        }
    });

    // wow

    new WOW().init();
});