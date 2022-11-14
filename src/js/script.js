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
});