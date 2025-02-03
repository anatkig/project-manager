let projects = [
    { id: 1, name: "Project A", description: "This is project A", startDate: "2021-01-01", endDate: "2021-12-31", manager: "John Doe" },
    { id: 2, name: "Project B", description: "This is project B", startDate: "2021-01-03", endDate: "2021-12-31", manager: "John Doewn" },
    { id: 3, name: "Project G", description: "This is project G", startDate: "2021-01-01", endDate: "2021-12-30", manager: "John Doewn" },
];

module.exports = {
    getAllProjects: () => projects,
    getProjectById: (id) => projects.find((p) => parseInt(p.id) === parseInt(id)),
    createProject: ({name, description, startDate, endDate, manager}) => {
      const newProject = { 
        id: projects.length + 1, 
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
        manager: manager
      };
      projects.push(newProject);
      return newProject;
    },
    updateProject: (id, updatedFields) => {
      const project = projects.find((p) => parseInt(p.id) === parseInt(id));
      if (project) {
        Object.keys(updatedFields).forEach((key) => {
          if (project[key] !== undefined) {
            project[key] = updatedFields[key];
          }
        });
      }
      return project;
    },
    deleteProject: (id) => {
      projects = projects.filter((p) => parseInt(p.id) !== parseInt(id));
      return projects;
    }
  };