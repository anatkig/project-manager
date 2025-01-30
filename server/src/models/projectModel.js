let projects = [
    { id: 1, name: "Project A", description: "This is project A", startDate: "2021-01-01", endDate: "2021-12-31", manager: "John Doe" },
    { id: 2, name: "Project B", description: "This is project B", startDate: "2021-01-03", endDate: "2021-12-31", manager: "John Doewn" },
];

module.exports = {
    // Get all projects
    getAllProjects: (req, res) => {
        res.json(projects);
    },

    // Get project by ID
    getProjectById: (req, res) => {
        const { id } = req.params;
        const project = projects.find((p) => p.id === parseInt(id));

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    },

    // Create a new project
    createProject: (req, res) => {
        const { name, description, startDate, endDate, manager } = req.body;

        if (!name || !description || !startDate || !endDate || !manager) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProject = {
            id: projects.length + 1,
            name,
            description,
            startDate,
            endDate,
            manager,
        };

        projects.push(newProject);
        res.status(201).json(newProject);
    },

    // Update an existing project
    updateProject: (req, res) => {
        const { id } = req.params;
        const { name, description, startDate, endDate, manager } = req.body;

        const projectIndex = projects.findIndex((p) => p.id === parseInt(id));
        if (projectIndex === -1) {
            return res.status(404).json({ message: "Project not found" });
        }

        projects[projectIndex] = {
            ...projects[projectIndex],
            name: name || projects[projectIndex].name,
            description: description || projects[projectIndex].description,
            startDate: startDate || projects[projectIndex].startDate,
            endDate: endDate || projects[projectIndex].endDate,
            manager: manager || projects[projectIndex].manager,
        };

        res.json(projects[projectIndex]);
    },

    // Delete a project
    deleteProject: (req, res) => {
        const { id } = req.params;
        const projectIndex = projects.findIndex((p) => p.id === parseInt(id));

        if (projectIndex === -1) {
            return res.status(404).json({ message: "Project not found" });
        }

        projects.splice(projectIndex, 1);
        res.json({ message: "Project deleted successfully" });
    },
};
