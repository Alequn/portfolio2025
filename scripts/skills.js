fetch('./data/skills.json')
  .then(response => response.json())
  .then(skills => {
    const container = document.getElementById('skills-container');

    skills.forEach(({ skill, icon }) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.innerHTML = `
        <div class="skill-inner">
          <div class="skill-front"><i class="${icon}"></i></div>
          <div class="skill-back">${skill}</div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Error cargando las habilidades:', error));
