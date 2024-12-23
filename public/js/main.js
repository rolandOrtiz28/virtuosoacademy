(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

})(jQuery);








//AUTH VALIDITIONS
// showpassword
let eyeicon2 = document.getElementById("eye-icon2");
let password2 = document.getElementById("password2");
let eyeicon = document.getElementById("eye-icon");
let confirmPassword = document.getElementById("confirm-password");

if (eyeicon2 && password2) {
    eyeicon2.onclick = function () {
        if (password2.type == "password") {
            password2.type = "text";
            eyeicon2.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            password2.type = "password";
            eyeicon2.innerHTML = '<i class="far fa-eye"></i>';
        }
    }
}
if (eyeicon && confirmPassword) {
    eyeicon.onclick = function () {
        if (confirmPassword.type == "password") {
            confirmPassword.type = "text";
            eyeicon.innerHTML = '<i class="far fa-eye-slash"></i>';
        } else {
            confirmPassword.type = "password";
            eyeicon.innerHTML = '<i class="far fa-eye"></i>';
        }
    }
}
// password requirements

const passwordInput = document.getElementById("password2");
const passwordAlert = document.getElementById("password-alert");
const checkLeng = document.querySelector(".leng i.fas.fa-check");
const crossLeng = document.querySelector(".leng i.fas.fa-times");
const checkBigLetter = document.querySelector(".big-letter i.fas.fa-check");
const crossBigLetter = document.querySelector(".big-letter i.fas.fa-times");
const checkNum = document.querySelector(".num i.fas.fa-check");
const crossNum = document.querySelector(".num i.fas.fa-times");

const lengRegex = /.{8,}/;
const bigLetterRegex = /[A-Z]/;
const numRegex = /[0-9]/;

if (passwordInput && passwordAlert && checkLeng && crossLeng && checkBigLetter && crossBigLetter && checkNum && crossNum) {
    passwordInput.addEventListener("focus", function () {
        passwordAlert.style.display = "block";
    });

    passwordInput.addEventListener("blur", function () {
        passwordAlert.style.display = "none";
    });

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        if (lengRegex.test(password)) {
            checkLeng.style.display = "inline";
            crossLeng.style.display = "none";
        } else {
            checkLeng.style.display = "none";
            crossLeng.style.display = "inline";
        }
        if (bigLetterRegex.test(password)) {
            checkBigLetter.style.display = "inline";
            crossBigLetter.style.display = "none";
        } else {
            checkBigLetter.style.display = "none";
            crossBigLetter.style.display = "inline";
        }
        if (numRegex.test(password)) {
            checkNum.style.display = "inline";
            crossNum.style.display = "none";
        } else {
            checkNum.style.display = "none";
            crossNum.style.display = "inline";
        }

        const isValid = lengRegex.test(password) && bigLetterRegex.test(password) && numRegex.test(password);
        if (isValid) {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
            passwordAlert.classList.remove("alert-warning");
            passwordAlert.classList.add("alert-success");
        } else {
            passwordInput.classList.remove("is-valid");
            passwordInput.classList.add("is-invalid");
            passwordAlert.classList.remove("alert-success");
            passwordAlert.classList.add("alert-warning");
        }
    });
}

// bootstrap validation

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();
