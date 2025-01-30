let projects = [
    { id: 1, name: "Project A" },
    { id: 2, name: "Project B" },
  ];
  
  module.exports = {
    getAllProjects: () => projects,
    getProjectById: (id) => projects.find((p) => p.id === parseInt(id)),
    createProject: (name) => {
      const newProject = { id: projects.length + 1, name };
      projects.push(newProject);
      return newProject;
    },
    updateProject: (id, newName) => {
      const project = projects.find((p) => p.id === parseInt(id));
      if (project) project.name = newName;
      return project;
    },
    deleteProject: (id) => {
      projects = projects.filter((p) => p.id !== parseInt(id));
      return projects;
    },
  };
  