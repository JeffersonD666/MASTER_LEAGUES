// Slider automático
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const slideTitle = document.getElementById('slide-title');
    const slideDescription = document.getElementById('slide-description');
    
    const slideLinks = [
        "noticia1.html",
        "noticia2.html", 
        "noticia3.html" 
    ];
    
    const slideTitles = [
        "Nuevo Campeón de la Liga Street",
        "Próximo Torneo Internacional",
        "Biografía Destacada"
    ];
    
    const slideDescriptions = [
        "Descubre quién se llevó la victoria en la última edición de nuestra prestigiosa liga. Un torneo lleno de emociones y momentos épicos que quedará en la historia de MASTER LEAGUES.",
        "Inscripciones abiertas para la Champions League. No te pierdas la oportunidad de competir contra los mejores jugadores de diferentes regiones en este prestigioso torneo.",
        "Conoce la historia del legendario jugador SpartanX, desde sus humildes comienzos hasta convertirse en una leyenda de nuestras ligas. Una inspiración para todos."
    ];
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideTitle.textContent = slideTitles[currentSlide];
    slideDescription.textContent = slideDescriptions[currentSlide];
    document.getElementById('slide-link').href = slideLinks[currentSlide];
    }
    
    // Cambiar slide cada 5 segundos
    setInterval(nextSlide, 5000);
    
    // Inicializar
    updateSlider();
});