async function chargerImages() {
    try {
      const res = await fetch('https://jtm-memory-v2.onrender.com/images');
      const images = await res.json();

      const gallery = document.getElementById('gallery');
      gallery.innerHTML = '';

      images.forEach(img => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="https://jtm-memory-v2.onrender.com/uploads/${img.filename}" alt="${img.title}">
          <h3>${img.title}</h3>
          <p>${img.description}</p>
        `;

        gallery.appendChild(card);
      });
    } catch (err) {
      console.error('Erreur lors du chargement des images :', err);
    }
  }
  chargerImages();