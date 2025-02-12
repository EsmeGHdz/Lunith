function addImageHoverEffect() {
    const productImages = document.querySelectorAll('.producto-card img');

    productImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1.25)';
            this.style.transition = 'opacity 0.3s, transform 0.3s';
        });

        image.addEventListener('mouseout', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
    });
}

// Llama a la función cuando se carga la página
window.onload = function() {
    addImageHoverEffect();
};
