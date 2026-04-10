document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica de Filtrado en la página de Adopciones
    const filterButtons = document.querySelectorAll('#filter-buttons .btn');
    const petItems = document.querySelectorAll('.pet-item');
    const noResultsMessage = document.getElementById('no-results');

    if (filterButtons.length > 0 && petItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar estado activo de los botones
                filterButtons.forEach(btn => {
                    btn.classList.remove('btn-primary', 'active-filter');
                    btn.classList.add('btn-outline-primary');
                });
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-primary', 'active-filter');

                const filterValue = button.getAttribute('data-filter');
                let visibleCount = 0;

                petItems.forEach(item => {
                    // Animación suave usando clases
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        if (filterValue === 'todos' || item.getAttribute('data-category') === filterValue) {
                            item.classList.remove('d-none');
                            // Trigger reflow para que la animación funcione
                            void item.offsetWidth; 
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                            visibleCount++;
                        } else {
                            item.classList.add('d-none');
                        }
                        
                        // Mostrar mensaje de no resultados
                        if (noResultsMessage) {
                            if (visibleCount === 0) {
                                noResultsMessage.classList.remove('d-none');
                            } else {
                                noResultsMessage.classList.add('d-none');
                            }
                        }
                    }, 300); // 300ms de tiempo de transición para que coincida (aproximadamente)
                });
            });
        });
    }

    // 2. Validación de Formulario Bootstrap (Página de Contacto)
    const forms = document.querySelectorAll('.needs-validation');

    // Bucle para prevenir el envío y aplicar validación
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Evitar envío por defecto siempre para simular el proceso
            
            if (!form.checkValidity()) {
                event.stopPropagation();
            } else {
                // Si el formulario es válido
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('d-none');
                    // Resetear formulario
                    form.reset();
                    // Quitar las clases de validación para volver al estado inicial visualmente
                    form.classList.remove('was-validated');
                    
                    // Ocultar mensaje después de unos segundos
                    setTimeout(() => {
                        successMessage.classList.add('d-none');
                    }, 5000);
                    return; // Salir para no añadir la clase was-validated de nuevo
                }
            }

            form.classList.add('was-validated');
        }, false);
    });

    // 3. Pre-llenar asunto si viene de adopciones.html
    const urlParams = new URLSearchParams(window.location.search);
    const petRef = urlParams.get('ref');
    
    if (petRef) {
        const asuntoSelect = document.getElementById('asunto');
        const mensajeTextarea = document.getElementById('mensaje');
        
        if (asuntoSelect && mensajeTextarea) {
            asuntoSelect.value = 'adopcion';
            mensajeTextarea.value = `Hola, estoy interesado en adoptar a ${petRef}. ¿Podrían darme más información sobre el proceso?`;
        }
    }
});
