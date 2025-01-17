/*-----------------------------------------------------------------------------------

    Theme Name: GeekFolio
    Theme URI: http://
    Description: Creative Agency & Portfolio
    Author: UI-ThemeZ
    Author URI: http://themeforest.net/user/UI-ThemeZ
    Version: 1.0

-----------------------------------------------------------------------------------*/


$(function () {

    "use strict";

    var wind = $(window);


    /* =============================================================================
    -----------------------------  Smooth Scroll nav   -----------------------------
    ============================================================================= */


    $.scrollIt({
        upKey: 38,                // key code to navigate to the next section
        downKey: 40,              // key code to navigate to the previous section
        easing: 'swing',          // the easing function for animation
        scrollTime: 600,          // how long (in ms) the animation takes
        activeClass: 'active',    // class given to the active nav element
        onPageChange: null,       // function(pageIndex) that is called when page is changed
        topOffset: -80            // offste (in px) for fixed top navigation
    });


    /* =============================================================================
    --------------------------------  Navbar Menu   --------------------------------
    ============================================================================= */

    $('.navbar .dropdown').hover(function () {
        $(this).find('.dropdown-menu').addClass('show');
    }, function () {
        $(this).find('.dropdown-menu').removeClass('show')
    });

    $('.navbar .dropdown-item').hover(function () {
        $(this).find('.dropdown-side').addClass('show');
    }, function () {
        $(this).find('.dropdown-side').removeClass('show')
    });

    $(".navbar .search-form").on("click", ".search-icon", function () {

        $(".navbar .search-form").toggleClass("open");

        if ($(".navbar .search-form").hasClass('open')) {

            $(".search-form .close-search").slideDown();

        } else {

            $(".search-form .close-search").slideUp();
        }
    });

    $(".navbar").on("click", ".navbar-toggler", function () {

        $(".navbar .navbar-collapse").toggleClass("show");
    });

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar.change .logo> img");

        if (bodyScroll > 300) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'assets/imgs/logo-dark.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'assets/imgs/logo-light.png');
        }
    });

    function noScroll() {
        window.scrollTo(0, 0);
    }

    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".topnav");

        if (bodyScroll > 300) {

            navbar.addClass("nav-scroll");

        } else {

            navbar.removeClass("nav-scroll");
        }
    });

    var open = false,
        navDark = $(".topnav.dark"),
        logoChan = $(".topnav.dark .logo img");

    $('.topnav .menu-icon').on('click', function () {
        open = !open;

        $('.hamenu').toggleClass("open");

        if (open) {

            $('.hamenu').animate({ left: 0 });

            $('.topnav .menu-icon').addClass('open');

            navDark.addClass("navlit");
            logoChan.attr('src', 'img/logo-light.png');

            window.addEventListener('scroll', noScroll);

        } else {

            $('.hamenu').delay(300).animate({ left: "-100%" });

            $('.topnav .menu-icon').removeClass('open');

            $('.hamenu .menu-links .main-menu .sub-menu').slideUp();

            $('.hamenu .menu-links .main-menu .dmenu').removeClass("dopen");

            navDark.removeClass("navlit");
            logoChan.attr('src', 'img/logo-dark.png');

            window.removeEventListener('scroll', noScroll);
        }
    });

    $('.hamenu .menu-links .main-menu > li').on('mouseenter', function () {
        $(this).removeClass('hoverd').siblings().addClass('hoverd');
    });

    $('.hamenu .menu-links .main-menu > li').on('mouseleave', function () {
        $(this).removeClass('hoverd').siblings().removeClass('hoverd');
    });


    $('.main-menu > li .dmenu').on('click', function () {
        $(this).parent().parent().find(".sub-menu").toggleClass("sub-open").slideToggle();
        $(this).toggleClass("dopen");
    });

    /* =============================================================================
    ------------------------------  Parallax Swiper   ------------------------------
    ============================================================================= */


    var parallaxSlider;
    var parallaxSliderOptions = {
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        parallax: true,
        loop: true,

        on: {
            init: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.bg-img')
                        .attr({
                            'data-swiper-parallax': 0.75 * swiper.width
                        });
                }
            },
            resize: function () {
                this.update();
            }
        },

        pagination: {
            el: '.slider-prlx .parallax-slider .swiper-pagination',
            type: 'fraction',
            clickable: true
        },

        navigation: {
            nextEl: '.slider-prlx .parallax-slider .next-ctrl',
            prevEl: '.slider-prlx .parallax-slider .prev-ctrl'
        }
    };
    parallaxSlider = new Swiper('.slider-prlx .parallax-slider', parallaxSliderOptions);

    var parallaxShowCase;
    var parallaxShowCaseOptions = {
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        parallax: true,
        mousewheel: true,
        loop: true,

        on: {
            init: function () {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.bg-img')
                        .attr({
                            'data-swiper-parallax': 0.75 * swiper.width
                        });
                }
            },
            resize: function () {
                this.update();
            }
        },

        pagination: {
            el: '.showcase-full .parallax-slider .swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.showcase-full .parallax-slider .swiper-button-next',
            prevEl: '.showcase-full .parallax-slider .swiper-button-prev'
        }
    };
    parallaxShowCase = new Swiper('.showcase-full .parallax-slider', parallaxShowCaseOptions);




    /* ===============================  half slider  =============================== */

    var galleryThumb = new Swiper('.gallery-thumb .swiper-container', {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
    });

    var galleryImg = new Swiper('.gallery-top .swiper-container', {
        spaceBetween: 0,
        effect: 'fade',
        speed: 1000,
        thumbs: {
            swiper: galleryThumb
        }
    });

    galleryImg.on("slideChangeTransitionStart", function () {
        galleryThumb.slideTo(galleryImg.activeIndex);
    });
    galleryThumb.on("transitionStart", function () {
        galleryImg.slideTo(galleryThumb.activeIndex);
    });


    /* =============================================================================
    ------------------------------  Interactive work   -----------------------------
    ============================================================================= */

    $('.inter-links-center .links-text li').on('mouseenter', function () {
        var tab_id = $(this).attr('data-tab');
        $('.links-text li').removeClass('current');
        $(this).addClass('current');

        $('.links-img .img').removeClass('current');
        $("#" + tab_id).addClass('current');

        if ($(this).hasClass('current')) {
            return false;
        }
    });

    $('.inter-links-center .links-text li').on('mouseleave', function () {
        $('.links-text li').removeClass('current');
        $('.links-img .img').removeClass('current');
    });


    $('.inter-links-center .links-text li').on('mouseenter', function () {
        $(this).removeClass('no-active').siblings().addClass('no-active');
    });

    $('.inter-links-center .links-text li').on('mouseleave', function () {
        $('.inter-links-center .links-text li').removeClass('no-active');
    });


    /* =============================================================================
    -------------------------------  works Hover  ----------------------------------
    ============================================================================= */
    /*
    $(".portfolio.changed-bg .item").on("mouseenter", ".img", function () {

        var Bgcolor = $(this).attr("data-bgcolor");

        $(".portfolio.changed-bg").css("background-color", Bgcolor);

        if ($(this).hasClass('chang-text')) {
            $(".portfolio.changed-bg").addClass("chang-text");
        }
    });

    $(".portfolio.changed-bg .item").on("mouseleave", ".img", function () {

        $(".portfolio.changed-bg").css("background-color", "transparent");
        $(".portfolio.changed-bg").removeClass("chang-text");
    });
    */

    /* =============================================================================
    ------------------------------  Data Background   ------------------------------
    ============================================================================= */

    var pageSection = $(".bg-img, section");
    pageSection.each(function (indx) {

        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    var pageSectionColor = $(".bg-solid-color, section");
    pageSectionColor.each(function (indx) {

        var color = $(this).attr("data-solid-color");

        if ($(this).attr("data-solid-color")) {
            $(this).css("background-color", color);
        }
    });


    /* =============================================================================
    -----------------------------------  Tabs  -------------------------------------
    ============================================================================= */

    $('#tabs .tab-links').on('click', '.item-link', function () {

        var tab_id = $(this).attr('data-tab');

        $('#tabs .tab-links .item-link').removeClass('current');
        $(this).addClass('current');

        $('.tab-content').hide();
        $("#" + tab_id).show();

    });

    $('#tabs-fade .tab-links').on('click', '.item-link', function () {

        var tab2_id = $(this).attr('data-tab');

        $('#tabs-fade .tab-links .item-link').removeClass('current');
        $(this).addClass('current');

        $('.tab-content').fadeOut();
        $("#" + tab2_id).fadeIn();

    });

    // Tabs de sobre mi
    $('.tab-links-exp').on('click', '.item-link-exp', function () {

        var tab3_id = $(this).attr('data-tab-exp');

        $('.tab-links-exp .item-link-exp').removeClass('current-exp');
        $(this).addClass('current-exp');

        $('.tab-content-exp').fadeOut();
        $("#" + tab3_id).fadeIn();

    });

    $('#tabs-ubicacion-nav li:first-child,#tabs-contratacion-arg-nav li:first-child,#tabs-contratacion-lat-nav li:first-child,#tabs-portfolio-mobile-nav li:first-child').addClass('active');
    $('.tab-content').hide();
    $('.tab-content:first').show();

    // Click function
    $('#tabs-ubicacion-nav li').click(function(){
    $('#tabs-ubicacion-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();
    
    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();
    return false;
    });

    $('.tab-cont-content,.tab-cont-latam-content,.tab-portfolio-content').hide();
    $('.tab-cont-content:first,.tab-cont-latam-content:first,.tab-portfolio-content:first').show();

    $('#tabs-contratacion-arg-nav li').click(function(){
        //$('#tabs-contratacion-arg-nav li').removeClass('active');
        $(this).addClass('active');
        $('.tab-cont-content').hide();
        
        var activeTabCont = $(this).find('a').attr('href');
        $(activeTabCont).fadeIn();
        return false;
    });

    $('#tabs-contratacion-lat-nav li').click(function(){
        $('#tabs-contratacion-lat-nav li').removeClass('active');
        $(this).addClass('active');
        $('.tab-cont-latam-content').hide();
        
        var activeTabContLat = $(this).find('a').attr('href');
        $(activeTabContLat).fadeIn();
        return false;
    });

    

    
       const tabsContainer = document.querySelector('#tabs-portfolio-mobile-nav');
    const slidersContainer = document.querySelector('#datos-portfolio');

    if (tabsContainer && slidersContainer) {
        const tabs = tabsContainer.querySelectorAll('.filter li a');
        const sliders = slidersContainer.querySelectorAll('> div');

        // Inicializar visibilidad: Mostrar solo el primer slider
        sliders.forEach((slider, index) => {
            if (index === 0) {
                slider.classList.add('active');
                slider.style.display = 'block';
            } else {
                slider.style.display = 'none';
            }
        });

        // Manejar clic en tabs
        tabs.forEach((tab) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();

                // Ocultar todos los sliders
                sliders.forEach((slider) => {
                    slider.classList.remove('active');
                    slider.style.display = 'none';
                });

                // Quitar clase activa de todas las tabs
                tabs.forEach((t) => t.parentElement.classList.remove('active'));

                // Mostrar el slider correspondiente
                const targetId = tab.getAttribute('href');
                const targetSlider = slidersContainer.querySelector(targetId);

                if (targetSlider) {
                    targetSlider.classList.add('active');
                    targetSlider.style.display = 'block';
                }

                // Activar la tab seleccionada
                tab.parentElement.classList.add('active');
            });
        });
    }
      
        // Mostrar solo el primer slider por defecto
        if (sliders.length > 0) {
          sliders[0].style.display = 'block';
          sliders[0].classList.add('active');
        }
     
      
        document.querySelectorAll('.tabs-portfolio-mobile li a').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Quitar clase activa de todos los tabs y sliders
                document.querySelectorAll('.tabs-portfolio-mobile li').forEach(item => item.classList.remove('active'));
                document.querySelectorAll('.slider-content').forEach(slider => slider.classList.remove('active'));
                
                // Agregar clase activa al tab y slider correspondiente
                e.target.parentElement.classList.add('active');
                const target = e.target.getAttribute('href');
                document.querySelector(target).classList.add('active');
            });
        });
        
       
// Mostrar solo RRSS al inicio
$('.portfolio-category-mobile').hide(); // Ocultar todas las categorías
$('#portfolio-rrss-mobile').show(); // Mostrar solo RRSS
$('#portfolio-filters-mobile .filter-item-mobile').removeClass('active'); // Remover clases activas de filtros
$('#portfolio-filters-mobile .filter-item-mobile[data-target="#portfolio-rrss-mobile"]').addClass('active'); // Activar filtro RRSS

// Filtros
$('#portfolio-filters-mobile .filter-item-mobile').on('click', function () {
    // Cambiar la clase activa en los filtros
    $('#portfolio-filters-mobile .filter-item-mobile').removeClass('active');
    $(this).addClass('active');

    // Mostrar la categoría correspondiente y ocultar las demás
    const target = $(this).data('target');
    $('.portfolio-category-mobile').removeClass('active').hide();
    $(target).addClass('active').fadeIn();
});





 // Inicialización de Swipers
 function initializeSwiper(selector, nextButton, prevButton) {
    return new Swiper(selector, {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
        },
    });
}

// Inicializa todos los Swipers
const swipers = {
    rrss: initializeSwiper('.rrss-swiper-mobile', '.rrss-controls-mobile .swiper-button-next', '.rrss-controls-mobile .swiper-button-prev'),
    branding: initializeSwiper('.branding-swiper-mobile', '.branding-controls-mobile .swiper-button-next', '.branding-controls-mobile .swiper-button-prev'),
    mailing: initializeSwiper('.mailing-swiper-mobile', '.mailing-controls-mobile .swiper-button-next', '.mailing-controls-mobile .swiper-button-prev'),
    uxui: initializeSwiper('.uxui-swiper-mobile', '.uxui-controls-mobile .swiper-button-next', '.uxui-controls-mobile .swiper-button-prev'),
};

// Función para mostrar la categoría seleccionada
function showCategory(target) {
    // Oculta todas las categorías
    $('.portfolio-category-mobile').removeClass('active');
    // Muestra la categoría seleccionada
    $(target).addClass('active');

    // Recalcula Swiper para la categoría activa
    const swiperKey = target.replace('#portfolio-', '').replace('-mobile', '');
    if (swipers[swiperKey]) {
        swipers[swiperKey].update();
    }
}

// Evento para manejar el filtrado
$('#portfolio-filters-mobile .filter-item-mobile').on('click', function () {
    const target = $(this).data('target');
    // Cambia la clase activa del filtro
    $('#portfolio-filters-mobile .filter-item-mobile').removeClass('active');
    $(this).addClass('active');
    // Muestra la categoría correspondiente
    showCategory(target);
});




   // Mostrar Argentina y preseleccionar 40 hs /sem al cargar
$('#honorarios-tab-argentina').show(); // Mostrar solo Argentina inicialmente
$('#honorarios-tab-latam').hide(); // Ocultar LATAM inicialmente
$('#honorarios-tabs-contratacion-nav li:nth-child(3) a').addClass('active'); // Seleccionar 40 hs /sem
$('.tab-cont-content').hide(); // Ocultar todos los contenidos
$('#honorarios-tab-cont-tres').show(); // Mostrar contenido de 40 hs /sem para Argentina

// Tabs de ubicación (Argentina / LATAM)
$('#honorarios-tabs-ubicacion-nav li a').click(function (e) {
    e.preventDefault();

    // Cambiar estado de los tabs de ubicación
    $('#honorarios-tabs-ubicacion-nav li a').removeClass('active');
    $(this).addClass('active');

    // Mostrar/Ocultar contenido según la selección
    if ($(this).attr('href') === '#honorarios-tab-argentina') {
        $('#honorarios-tab-argentina').show();
        $('#honorarios-tab-latam').hide();

        // Resetear Argentina a 40 hs /sem por defecto
        $('#honorarios-tabs-contratacion-nav li a').removeClass('active');
        $('#honorarios-tabs-contratacion-nav li:nth-child(3) a').addClass('active');
        $('.tab-cont-content').hide();
        $('#honorarios-tab-cont-tres').show();
    } else if ($(this).attr('href') === '#honorarios-tab-latam') {
        $('#honorarios-tab-argentina').hide();
        $('#honorarios-tab-latam').show();

        // Resetear LATAM a 40 hs /sem por defecto
        $('#honorarios-tabs-contratacion-latam-nav li a').removeClass('active');
        $('#honorarios-tabs-contratacion-latam-nav li:nth-child(3) a').addClass('active');
        $('.honorarios-tab-cont-content').hide(); // Asegura ocultar correctamente
        $('#honorarios-tab-cont-tres-latam').show();
    }
});

// Tabs de contratación (Argentina)
$('#honorarios-tabs-contratacion-nav li a').click(function (e) {
    e.preventDefault();

    // Cambiar estado de los tabs de contratación
    $('#honorarios-tabs-contratacion-nav li a').removeClass('active');
    $(this).addClass('active');

    // Mostrar contenido correspondiente
    $('.tab-cont-content').hide();
    $($(this).attr('href')).show();
});

// Tabs de contratación (LATAM)
$('#honorarios-tabs-contratacion-latam-nav li a').click(function (e) {
    e.preventDefault();

    // Cambiar estado de los tabs de contratación
    $('#honorarios-tabs-contratacion-latam-nav li a').removeClass('active');
    $(this).addClass('active');

    // Mostrar contenido correspondiente
    $('.honorarios-tab-cont-content').hide();
    $($(this).attr('href')).show();
});




/* Tabs sobremi mobile */
// Inicializar Swiper
 const sobreMiSwiper = new Swiper('.sobre-mi-mobile', {
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});




if ($(this).hasClass('slider-servicios-mobile')) {
    var conf = {

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },


        navigation: {
            nextEl: '.testim-controls .swiper-button-next',
            prevEl: '.testim-controls .swiper-button-prev'
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        }
    };
};



 // Inicializar: Mostrar solo el primer filtro y ocultar los demás
 $('.gallery-portfolio-mobile > div').hide(); // Ocultar todos los elementos inicialmente
 $('.gallery-portfolio-mobile > .redes-mob').show(); // Mostrar el primer elemento (Redes Sociales)

 // Manejar clic en los filtros
 $('.filter span').click(function () {
     // Cambiar el estado activo del filtro
     $('.filter span').removeClass('active'); // Quitar la clase activa de todos los filtros
     $(this).addClass('active'); // Agregar la clase activa al filtro seleccionado

     // Obtener el filtro seleccionado
     const filterClass = $(this).data('filter'); // Obtener el valor de data-filter

     // Mostrar/Ocultar elementos
     $('.gallery-portfolio-mobile > div').hide(); // Ocultar todos los elementos
     $(filterClass).show(); // Mostrar los elementos que coinciden con el filtro
 });


    /* =============================================================================
    --------------------------------  Accordion  -----------------------------------
    ============================================================================= */

    $(".accordion").on("click", ".title", function () {

        $(this).next().slideDown();

        $(".accordion-info").not($(this).next()).slideUp();

    });

    $(".accordion").on("click", ".item", function () {

        $(this).addClass("active").siblings().removeClass("active");

    });


    /* =============================================================================
    ---------------------------------  Tolltip  ------------------------------------
    ============================================================================= */

    $('[data-tooltip-tit]').hover(function () {
        $('<div class="div-tooltip-tit"></div>').text($(this).attr('data-tooltip-tit')).appendTo('body').fadeIn('slow');
    }, function () {
        $('.div-tooltip-tit').remove();
    }).mousemove(function (e) {
        $('.div-tooltip-tit').css({ top: e.pageY + 10, left: e.pageX + 20 })
    });

    $('[data-tooltip-sub]').hover(function () {
        $('<div class="div-tooltip-sub"></div>').text($(this).attr('data-tooltip-sub')).appendTo('body').fadeIn('slow');
    }, function () {
        $('.div-tooltip-sub').remove();
    }).mousemove(function (e) {
        $('.div-tooltip-sub').css({ top: e.pageY + (-15), left: e.pageX + 30 })
    });


    /* =============================================================================
    -------------------------------  Progress Bar  ---------------------------------
    ============================================================================= */

    var c4 = $('.skills-circle .skill');
    var myVal = $(this).attr('data-value');

    $(".skills-circle .skill").each(function () {

        c4.circleProgress({
            startAngle: -Math.PI / 2 * 1,
            value: myVal,
            thickness: 4,
            size: 140,
            fill: { color: "#ff5e57" }
        });

    });

    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });


    /* =============================================================================
    ------------------------------  Parallax Items   -----------------------------
    ============================================================================= */

    // Get the target elements
    const parallaxTargets = document.querySelectorAll('.parallax');

    // Get the mouse position
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Update the target elements' position on each animation frame
    let rafId = null;
    function updateParallax() {
        // Loop through each target element
        parallaxTargets.forEach(target => {
            // Get the target's speed
            let speed = target.dataset.speed;

            // Calculate the new position based on the mouse position and speed
            let x = (window.innerWidth / 2 - mouseX) * speed;
            let y = (window.innerHeight / 2 - mouseY) * speed;
            target.style.transform = `translate3d(${x / 10}rem, ${y / 10}rem, 0)`;
        });

        // Schedule the next animation frame
        rafId = requestAnimationFrame(updateParallax);
    }

    // Start the parallax animation
    updateParallax();


    /* =============================================================================
    -----------------------------  Trigger Plugins  --------------------------------
    ============================================================================= */


    /* ========== Sticky ========== */

    $("#sticky_item").stick_in_parent();


    /* ========== YouTubePopUp ========== */

    $("a.vid").YouTubePopUp();


    /* ========== parallaxie ========== */

    $('.parallaxie').parallaxie({
        speed: 0.8,
        size: "cover"
    });


    /* ========== paroller ========== */

    $('.my-paroller').paroller();


    /* ========== magnificPopup ========== */

    $('.popup-img , .gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });


    /* =========== justifiedGallery =========== */

    $('.justified-gallery').justifiedGallery({
        rowHeight: 400,
        lastRow: 'nojustify',
        margins: 15
    });


    /* =========== hover3d =========== */

    $(".hover3d").hover3d({
        selector: ".hover3d-child",
        invert: true
    });


    /* =========== countUp =========== */

    $('.number-sec .count').countUp({
        delay: 10,
        time: 500
    });

    /* ===========  Splitting  =========== */

    Splitting();

});


/* =============================================================================
-----------------------------  Parallax Animation  -----------------------------
============================================================================= */

(function () {
    const link = document.querySelectorAll('.hover-this');
    const cursor = document.querySelector('.cursor');
    const animateit = function (e) {
        const hoverAnim = this.querySelector('.hover-anim');
        const { offsetX: x, offsetY: y } = e,
            { offsetWidth: width, offsetHeight: height } = this,
            move = 25,
            xMove = x / width * (move * 2) - move,
            yMove = y / height * (move * 2) - move;
        hoverAnim.style.transform = `translate(${xMove}px, ${yMove}px)`;
        if (e.type === 'mouseleave') hoverAnim.style.transform = '';
    };
    const editCursor = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    };
    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', animateit));
    window.addEventListener('mousemove', editCursor);

    $("a, .cursor-pointer").hover(
        function () {
            $(".cursor").addClass("cursor-active");
        }, function () {
            $(".cursor").removeClass("cursor-active");
        }
    );



    let elements = document.querySelectorAll(".rolling-text");

    elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerHTML = "";

        let textContainer = document.createElement("div");
        textContainer.classList.add("block");

        for (let letter of innerText) {
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0" : letter;
            span.classList.add("letter");
            textContainer.appendChild(span);
        }

        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });

    elements.forEach((element) => {
        element.addEventListener("mouseover", () => {
            element.classList.remove("play");
        });
    });
})();


/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(window).on("load", function () {


    /* =============================================================================
    ---------------------------------  Preloader  ----------------------------------
    ============================================================================= */

    var body = $('body');
    body.addClass('loaded');
    setTimeout(function () {
        body.removeClass('loaded');
    }, 1500);


    /* =============================================================================
    ------------------------------  Parallax image  --------------------------------
    ============================================================================= */

    var imageUp = document.getElementsByClassName('thumparallax');
    new simpleParallax(imageUp, {
        delay: 1,
        scale: 1.2
    });

    var imageDown = document.getElementsByClassName('thumparallax-down');
    new simpleParallax(imageDown, {
        orientation: 'down',
        delay: 1,
        scale: 1.2
    });


    /* =============================================================================
    -----------------------------  isotope Masonery   ------------------------------
    ============================================================================= */

    /*
var $gallery = $('#portfolio-gallery .portfolio-items').isotope({
    itemSelector: '.portfolio-item', // Solo los elementos específicos del portafolio
    layoutMode: 'fitRows'
});


$('.filtering').on('click', 'span', function () {
    var filterValue = $(this).attr('data-filter'); // Obtener el filtro seleccionado
    $gallery.isotope({ filter: filterValue }); // Aplicar el filtro al portafolio

    
    $(this).addClass('active').siblings().removeClass('active');
});

*/
$('.gallery').isotope({
    itemSelector: '.items'
});

var $gallery = $('.gallery').isotope();

$('.filtering').on('click', 'span', function () {
    var filterValue = $(this).attr('data-filter');
    $gallery.isotope({ filter: filterValue });
});

$('.filtering').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active');
});

// Inicialización de estado inicial
$('#tabs-ubicacion-nav li:first-child, #tabs-contratacion-arg-nav li:nth-child(3), #tabs-contratacion-lat-nav li:nth-child(3), #tabs-portfolio-mobile-nav li:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first').show();
$('.tab-cont-content, .tab-cont-latam-content, .tab-portfolio-content').hide();
$('.tab-portfolio-content').first().show();
$('#tab_cont_tres, #tab_cont_tres_latam').show(); // Mostrar "40 hs /sem" por defecto

// Click en tabs de ubicación
$('#tabs-ubicacion-nav li').click(function () {
    $('#tabs-ubicacion-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();

    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn();
    return false;
});

// Click en tabs de contratación (ARG)
$('#tabs-contratacion-arg-nav li').click(function () {
    //$('#tabs-contratacion-arg-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-cont-content').hide();

    var activeTabCont = $(this).find('a').attr('href');
    $(activeTabCont).fadeIn();
    return false;
});

// Click en tabs de contratación (LATAM)
$('#tabs-contratacion-lat-nav li').click(function () {
    $('#tabs-contratacion-lat-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-cont-latam-content').hide();

    var activeTabContLat = $(this).find('a').attr('href');
    $(activeTabContLat).fadeIn();
    return false;
});

// Click en tabs de portfolio (mobile)
$('#tabs-portfolio-mobile-nav li').click(function () {
    $('#tabs-portfolio-mobile-nav li').removeClass('active');
    $(this).addClass('active');
    $('.tab-portfolio-content').hide();

    var activeTabConPortfolio = $(this).find('a').attr('href');
    $(activeTabConPortfolio).fadeIn();
    return false;
});

$('#tabs-contratacion-arg-nav li').removeClass('active');
    

    /* =============================================================================
    -----------------------------  Contact Valdition   -----------------------------
    ============================================================================= */

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});


/* =============================================================================
-----------------------------  Button scroll up   ------------------------------
============================================================================= */

$(document).ready(function () {

    "use strict";

    var progressPath = document.querySelector('.progress-wrap path');
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
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })

});


/* =============================================================================
--------------------------------  Fade Header   --------------------------------
============================================================================= */

$(window).scroll(function () {

    var scrolled = $(this).scrollTop();
    $('.fixed-slider .caption , .fixed-slider .capt .parlx').css({
        'transform': 'translate3d(0, ' + -(scrolled * 0.20) + 'px, 0)',
        'opacity': 1 - scrolled / 600
    });

});



/* =============================================================================
-------------------------------  Wow Animation   -------------------------------
============================================================================= */

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();


/* =============================================================================
////////////////////////////////////////////////////////////////////////////////
============================================================================= */

$(function () {


    "use strict";


    /* ===============================  fixed-slider  =============================== */

    var slidHeight = $(".fixed-slider").outerHeight();

    $(".main-content").css({
        marginTop: slidHeight
    });



    /* =============================================================================
    ----------------------------  Swiper Data Controls   ---------------------------
    ============================================================================= */

    $('[data-carousel="swiper"]').each(function () {

        var containe = $(this).find('[data-swiper="container"]').attr('id');
        var pagination = $(this).find('[data-swiper="pagination"]').attr('id');
        var prev = $(this).find('[data-swiper="prev"]').attr('id');
        var next = $(this).find('[data-swiper="next"]').attr('id');
        var items = $(this).data('items');
        var autoplay = $(this).data('autoplay');
        var iSlide = $(this).data('initial');
        var loop = $(this).data('loop');
        var parallax = $(this).data('parallax');
        var space = $(this).data('space');
        var speed = $(this).data('swiper-speed');
        var center = $(this).data('center');
        var effect = $(this).data('effect');
        var direction = $(this).data('direction');
        var mousewheel = $(this).data('mousewheel');

        // Configuration
        var conf = {

        };

        // Responsive
        if ($(this).hasClass('swiper5')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }
            };
        };

        if ($(this).hasClass('swiper4')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }
            };
        };

        if ($(this).hasClass('blog-carsouel')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },

                navigation: {
                    nextEl: '.blog-modern .swiper-button-next',
                    prevEl: '.blog-modern .swiper-button-prev'
                }
            };
        };

        if ($(this).hasClass('work-crus3')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },

                pagination: {
                    el: ".work-carsouel .swiper-pagination",
                    clickable: true,
                },

                navigation: {
                    nextEl: '.work-carsouel .swiper-button-next',
                    prevEl: '.work-carsouel .swiper-button-prev'
                }
            };
        };

        if ($(this).hasClass('work-crus2')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                },

                pagination: {
                    el: ".work-carsouel .swiper-pagination",
                    clickable: true,
                },

                navigation: {
                    nextEl: '.work-carsouel .swiper-button-next',
                    prevEl: '.work-carsouel .swiper-button-prev'
                }
            };
        };

        if ($(this).hasClass('work-crsol-clum')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }
            };
        };

        if ($(this).hasClass('testim-grid')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }
            };
        };

        if ($(this).hasClass('serv-swiper')) {
            var conf = {

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                },

                navigation: {
                    nextEl: '.services .swiper-button-next',
                    prevEl: '.services .swiper-button-prev'
                }
            };
        };

        if ($(this).hasClass('testim-swiper')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.testim-controls .swiper-button-next',
                    prevEl: '.testim-controls .swiper-button-prev'
                },
            };
        };

        if ($(this).hasClass('testim-swiper2')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.testim-controls .swiper-button-next',
                    prevEl: '.testim-controls .swiper-button-prev'
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                }
            };
        };

       
//
        if ($(this).hasClass('testim-swiper3')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.testim-controls .swiper-button-next',
                    prevEl: '.testim-controls .swiper-button-prev'
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            };
        };

        // Swiper de portfolio mobile

        if ($(this).hasClass('portfolio-swiper')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.portfolio-controls .swiper-button-next',
                    prevEl: '.portfolio-controls .swiper-button-prev'
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            };
        };

        

        if ($(this).hasClass('her-swiper-container')) {
            var conf = {
                navigation: {
                    nextEl: '.her-swiper-controls .swiper-button-next',
                    prevEl: '.her-swiper-controls .swiper-button-prev',
                },
                breakpoints: {
                    0: { // Mobile
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: { // Desktop
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                },
            };
        }


    // Swiper para videos
// Inicializar Swiper para videos
$('.swiper-container').each(function () {
    if ($(this).hasClass('portfolio-slider')) {
      new Swiper(this, {
        navigation: {
          nextEl: '.videos-next', // Clase personalizada para el botón "Siguiente"
          prevEl: '.videos-prev', // Clase personalizada para el botón "Anterior"
        },
        spaceBetween: 20,
        breakpoints: {
          0: { slidesPerView: 1 }, // Mobile
          768: { slidesPerView: 2, spaceBetween: 15 }, // Tablet
          1024: { slidesPerView: 4, spaceBetween: 30 }, // Desktop
        },
      });
    }
  });
  
  
  // Swiper para brief
  $('.swiper-container').each(function () {
    if ($(this).hasClass('portfolio-brief-slider')) {
      new Swiper(this, {
        navigation: {
          nextEl: '.portfolio-brief-controls .brief-next',
          prevEl: '.portfolio-brief-controls .brief-prev',
        },
        spaceBetween: 20,
        breakpoints: {
          0: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
        },
      });
    }
  });
  
  
          
        
        
        
        
          
        

        // Swiper de portfolio uxui mobile

        if ($(this).hasClass('portfolio-uxui-swiper')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.portfolio-uxui-controls .swiper-button-next',
                    prevEl: '.portfolio-uxui-controls .swiper-button-prev'
                },

                breakpoints: {
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }
            };
        };

        if ($(this).hasClass('pagination')) {
            var conf = {

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            };
        };

        if (items) {
            conf.slidesPerView = items
        };
        if (autoplay) {
            conf.autoplay = autoplay
        };
        if (iSlide) {
            conf.initialSlide = iSlide
        };
        if (center) {
            conf.centeredSlides = center
        };
        if (loop) {
            conf.loop = loop
        };
        if (parallax) {
            conf.parallax = parallax
        };
        if (space) {
            conf.spaceBetween = space
        };
        if (speed) {
            conf.speed = speed
        };
        if (mousewheel) {
            conf.mousewheel = mousewheel
        };
        if (effect) {
            conf.effect = effect
        };
        if (direction) {
            conf.direction = direction
        };
        if (prev) {
            conf.prevButton = '#' + prev
        };
        if (next) {
            conf.nextButton = '#' + next
        };
        if (pagination) {
            conf.pagination = '#' + pagination,
                conf.paginationClickable = true
        };

        // Initialization
        if (containe) {
            var initID = '#' + containe;
            var init = new Swiper(initID, conf);
        };
    });


    /* =============================================================================
    -------------------------------  Preloader svg   -------------------------------
    ============================================================================= */

    const svg = document.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });
    tl.from(
        "header",
        {
            y: 200,
        },
        "-=1.5"
    );
    tl.from(
        "header .container",
        {
            y: 40,
            opacity: 0,
            delay: 0.3,
        },
        "-=1.5"
    );

});



$(function () {
    var width = $(window).width();
    if (width > 991) {

        "use strict";

        var wind = $(window);

        /* =============================================================================
        -------------------------------  Smooth Footer   -------------------------------
        ============================================================================= */

        gsap.set('.footer-container', { yPercent: -50 })
        const uncover = gsap.timeline({ paused: true })
        uncover
            .to('.footer-container', { yPercent: 0, ease: 'none' })
            ;

        ScrollTrigger.create({
            trigger: 'main',
            start: 'bottom bottom',
            end: '+=50%',
            animation: uncover,
            scrub: true,
        });


        /* =============================================================================
       -------------------------------  Smooth contact   -------------------------------
       ============================================================================= */

       gsap.set('.contact-container', { yPercent: -50 })
       const cover = gsap.timeline({ paused: true })
       cover
           .to('.contact-container', { yPercent: 0, ease: 'none' })
           ;

       ScrollTrigger.create({
           trigger: '.main-box',
           start: 'bottom bottom',
           end: '+=50%',
           animation: cover,
           scrub: true,
       });


        /* =============================================================================
        -----------------------------  Portfolio Fixed  --------------------------------
        ============================================================================= */

        wind.on('scroll', function () {
            $(".portfolio-fixed .sub-bg .cont").each(function () {
                var bottom_of_object =
                    $(this).offset().top + $(this).outerHeight();
                var bottom_of_window =
                    $(window).scrollTop() + $(window).height();
                var tab_id = $(this).attr('data-tab');
                if (bottom_of_window > bottom_of_object) {
                    $("#" + tab_id).addClass('current');
                    $(this).addClass('current');
                } else {
                    $("#" + tab_id).removeClass('current');
                    $(this).removeClass('current');
                }
            });
        });
    }
});


$(function () {
    var width = $(window).width();
    if (width < 991) {

        "use strict";

        $(".navbar .navbar-nav").on("click", ".nav-link", function () {

            $(".navbar .navbar-nav .dropdown .dropdown-menu").removeClass("show");

            $(this).parent().find(".dropdown-menu").addClass("show");
        });
    }
});

// Añadir icono de agus en el slide

$('.item h4 span').append('<img src="/assets/imgs/icono-adn.png" class="icono-slider" width="30" height="30"/>');

$(function () {
    var includes = $('[data-include]');
    $.each(includes, function () {
      var file = '/assets/componentes/' + $(this).data('include') + '.html';
      $(this).load(file);
    });
  });


  (() => {
    const includes = document.getElementsByTagName('include');
    [].forEach.call(includes, i => {
        let filePath = i.getAttribute('src');
        fetch(filePath).then(file => {
            file.text().then(content => {
                i.insertAdjacentHTML('afterend', content);
                i.remove();
            });
        });
    });
})();


