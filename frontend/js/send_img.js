const form = document.getElementById('uploadForm');
    const status = document.getElementById('status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch('https://jtm-memory-v2.onrender.com/upload', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (response.ok) {
          status.textContent = "✅ Image envoyée avec succès !";
          form.reset();
        } else {
          status.textContent = "❌ Erreur : " + result.error;
        }
      } catch (err) {
        status.textContent = "❌ Erreur réseau : " + err.message;
      }
    });