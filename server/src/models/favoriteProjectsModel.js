let favorite_projects = [
  {
    id: 3,
    name: "Project G",
    description: "This is project G",
    startDate: "2021-01-01",
    endDate: "2021-12-30",
    manager: "John Doewn",
  },
];

module.exports = {
  getFavoriteProjects: () => favorite_projects,
  updateFavoriteProjects: (projects) => {
    if (projects) {
      favorite_projects = projects;
    } else {
      favorite_projects = [];
    }
    return favorite_projects;
  },
};
