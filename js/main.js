window.onload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  const langSwitchBtn = document.getElementById('langSwitch');
  const translatableElements = document.querySelectorAll('[data-en][data-ar]');

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("UserName");
  const emailInput = document.getElementById("UserEmail");
  const messageInput = document.getElementById("message");
  const phoneInput = document.getElementById("UserPhone");
  const phoneError = document.getElementById("phoneError");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const searchInput=document.getElementById("searchInput");
  const searchError = document.getElementById("searchError");
  const successMessage = document.getElementById("formSuccess");
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarSupportedContent');
  const navbar = document.querySelector(".navbar");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Scroll event listener
  window.addEventListener("scroll", () => {
    if (scrollToTopBtn) {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    }
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // Scroll to top button
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Navbar link behavior
  if (navLinks && navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const isNavbarVisible = window.getComputedStyle(navbarCollapse).display !== 'none';

        if (isNavbarVisible && window.innerWidth < 992) {
          const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
          if (collapseInstance) {
            collapseInstance.hide(); 
          }
        }
      });
    });
  }

  let validationErrors = {
    name: false,
    email: false,
    phone: false,
    message: false, 
  };

  function updatePlaceholders(lang) {
    [nameInput, emailInput, messageInput, phoneInput].forEach(input => {
      if (input) {
        const placeholder = input.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) input.placeholder = placeholder;
      }
    });
  }
  
  // Counter animation
  const counters = document.querySelectorAll('.counter');
  const speed = 200; 
  
  const startCounters = () => {
    counters.forEach(counter => {
      const targetValue = parseInt(counter.getAttribute('data-count'));
      const increment = targetValue / speed;
      let currentValue = 0;
      
      const updateCounter = () => {
        if (currentValue < targetValue) {
          currentValue += increment;
          counter.textContent = Math.ceil(currentValue);
          setTimeout(updateCounter, 1);
        } else {
          counter.textContent = targetValue;
        }
      };
      
      updateCounter();
    });
  };

  // Intersection Observer for counters
  const statsSection = document.querySelector('.stats');
  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
  }

  function updateErrorMessages(lang) {
    const isRTL = lang === 'ar';

    if (validationErrors.name) {
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
    }

    if (validationErrors.email) {
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
    }

    if (validationErrors.phone) {
      phoneError.innerHTML = isRTL ? "يرجى إدخال رقم هاتف صالح." : "Please enter a valid phone number.";
    }

    if (validationErrors.message) {
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
    }
  }

 
    langSwitchBtn.addEventListener('click', () => {
      const currentLang = langSwitchBtn.getAttribute('data-lang');
      const newLang = currentLang === 'ar' ? 'en' : 'ar';

      translatableElements.forEach(el => {
        const icon = el.querySelector('i');
        const text = el.getAttribute(`data-${newLang}`);
        el.innerHTML = '';
        if (icon) {
          el.appendChild(icon);
          el.append(' ' + text);
        } else {
          el.innerHTML = text;
        }
      });

      langSwitchBtn.innerHTML = newLang === 'ar' ? 'EN' : 'AR';
      langSwitchBtn.setAttribute('data-lang', newLang);

      document.documentElement.setAttribute('lang', newLang);
      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.style.textAlign = newLang === 'ar' ? 'right' : 'left';

      updatePlaceholders(newLang);
      updateErrorMessages(newLang);
    });
  

  function validateAll() {
    let isValid = true;
    const dir = document.documentElement.getAttribute('dir');
    const isRTL = dir === 'rtl';

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';


    // Name validation
    if (name.length < 3) {
      validationErrors.name = true;
      nameError.innerHTML = isRTL ? "الاسم يجب أن يكون على الأقل 3 أحرف." : "Name must be at least 3 characters.";
      isValid = false;
    } else {
      validationErrors.name = false;
      nameError.innerHTML = "";
    }

    // Email validation
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      validationErrors.email = true;
      emailError.innerHTML = isRTL ? "يرجى إدخال بريد إلكتروني صالح." : "Please enter a valid email.";
      isValid = false;
    } else {
      validationErrors.email = false;
      emailError.innerHTML = "";
    }

    // Phone validation
     const phoneRegex = /^[0-9]{8,15}$/;
    if (!phoneRegex.test(phone)) {
      validationErrors.phone = true;
      phoneError.innerHTML = isRTL ? "يرجى إدخال رقم هاتف صالح." : "Please enter a valid phone number.";
      isValid = false;
    } else {
      validationErrors.phone = false;
      phoneError.innerHTML = "";
    }  

    // Message validation
    if (message.length < 10) {
      validationErrors.message = true;
      messageError.innerHTML = isRTL ? "يجب أن تكون الرسالة 10 أحرف على الأقل." : "Message must be at least 10 characters.";
      isValid = false;
    } else {
      validationErrors.message = false;
      messageError.innerHTML = "";
    }

    return isValid;
  }

  // Input validation listeners
  [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
    
    if (input) {
    input.addEventListener("input", validateAll);
    input.addEventListener("change", validateAll);
  }
    
  });

  // Form submission
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

     if (validateAll()) {
        const name = nameInput?.value.trim() || '';
        const email = emailInput?.value.trim() || '';
        const phone = phoneInput?.value.trim() || '';
        const message = messageInput?.value.trim() || '';

        const waMessage = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
        const whatsappURL = `https://wa.me/201011159119?text=${waMessage}`;
        window.open(whatsappURL, "_blank");
        if (successMessage) {
          successMessage.innerHTML = isRTL ? "تم إرسال الرسالة بنجاح." : "Message sent successfully.";
          successMessage.classList.remove("d-none");
        }

        form.reset();
        validationErrors = { name: false, email: false, phone: false, message: false };

          setTimeout(() => {
            if (successMessage) successMessage.classList.add("d-none");
          }, 3000);
        }
        else {
                if (successMessage) successMessage.classList.add("d-none");
              }
            });
          }

  // Initialize AOS
   AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
  });
  
});