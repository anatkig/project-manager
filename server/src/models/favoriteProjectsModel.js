let favorite_projects = [];

module.exports = {
    getFavoriteProjects: () => favorite_projects,
    updateFavoriteProjects: (id) => {
      const project = projects.find((p) => p.id === parseInt(id));
      if (project) {
        const index = favorite_projects.findIndex((p) => p.id === parseInt(id));
        if (index === -1) {
          favorite_projects.push(project);
        } else {
          favorite_projects = favorite_projects.filter((p) => p.id !== parseInt(id));
        }
      }
      return favorite_projects;
    }
  };