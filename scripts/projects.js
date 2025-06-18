fetch('./data/projects.json')
  .then(response => response.json())
  .then(projects => {
    const container = document.getElementById('projects-container');

    projects.forEach(({ title, description }) => {
      const project = document.createElement('div');
      project.className = 'project';
      project.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
      `;
      container.appendChild(project);
    });
  })
  .catch(error => console.error('Error cargando los proyectos:', error));
