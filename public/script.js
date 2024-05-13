console.log('si esta pasando malpario');

document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.form-check-input');

  checkboxes.forEach(checkbox => {
    const targetId = checkbox.dataset.target;
    checkbox.addEventListener('change', () => {
      const cantidadesDiv = document.getElementById(targetId);
      if (checkbox.checked) {
        if (!cantidadesDiv) {
          const div = document.createElement('div');
          div.id = targetId;
          div.className = 'd-flex align-items-center mt-3 cantidades';
          const decrementBtn = document.createElement('button');
          decrementBtn.textContent = '-';
          decrementBtn.className = 'btn btn-secondary';
          const input = document.createElement('input');
          input.type = 'number';
          input.className = 'form-control mx-2';
          input.value = '1';
          input.min = '1';
          input.id = `cantidadInput-${checkbox.id.split('-')[1]}`;
          input.name = `cantidad-${checkbox.id.split('-')[1]}`;
          input.style.maxWidth = '80px';
          const incrementBtn = document.createElement('button');
          incrementBtn.textContent = '+';
          incrementBtn.className = 'btn btn-secondary';
          div.appendChild(decrementBtn);
          div.appendChild(input);
          div.appendChild(incrementBtn);
          checkbox.parentNode.insertAdjacentElement('afterend', div);

          decrementBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (input.value > input.min) {
              input.value = parseInt(input.value) - 1;
            }
          });

          incrementBtn.addEventListener('click', (event) => {
            event.preventDefault();
            input.value = parseInt(input.value) + 1;
          });
        }
      } else {
        if (cantidadesDiv) {
          cantidadesDiv.remove();
        }
      }
    });
  });

  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedProducts = Array.from(form.querySelectorAll('input[type="checkbox"]:checked'))
      .map(checkbox => {
        const productId = checkbox.id.split('-')[1];
        const cantidadInput = form.querySelector(`input[name="cantidad-${productId}"]`);
        const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
        return { id: productId, cantidad };
      });

    fetch('/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ selectedProducts })
    })
    .then(response => {
      console.log('Productos seleccionados y cantidades enviados al servidor');
    })
    .catch(error => {
      console.error('Error al enviar los productos seleccionados y sus cantidades:', error);
    });
  });
});
