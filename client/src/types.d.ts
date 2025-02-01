export interface Project {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    manager: string;
}

export interface ProjectListProps {
    favoriteProjects: Project[];
    setFavoriteProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export interface ProjectDetailProps {
    favoriteProjects: Project[];
}

export interface ProjectTableProps {
    projects: { id: string; name: string; startDate: string; endDate: string; manager: string }[];
    favoriteProjects: { id: string; name: string; startDate: string; endDate: string; manager: string }[];
    toggleFavorite: (project: { id: string; name: string; startDate: string; endDate: string; manager: string }) => void;
  }