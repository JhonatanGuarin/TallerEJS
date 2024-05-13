console.log('si esta pasando malpario')
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los checkboxes con la clase 'form-check-input'
    const checkboxes = document.querySelectorAll('.form-check-input');
  
    // Recorrer todos los checkboxes y agregar un event listener
    checkboxes.forEach(checkbox => {
      const checkboxId = checkbox.id;
      const cantidadesDiv = document.getElementById(`cantidadesDiv-${checkboxId.split('-')[1]}`);
  
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          cantidadesDiv.style.display = 'flex'; // Mostrar el selector de unidades
          alert('aca vamos')
        } else {
          cantidadesDiv.style.display = 'none'; // Ocultar el selector de unidades
        }
      });
    });
  });