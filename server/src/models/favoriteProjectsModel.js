let favorite_projects = [];

module.exports = {
    getFavoriteProjects: () => favorite_projects,
    updateFavoriteProjects: (projects) => {
      if (projects.length > 0) {
        favorite_projects = projects;       
      }
      return favorite_projects;
    }
  };