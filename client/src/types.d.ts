import { AxiosResponse } from "axios";

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
    newProjectCreated: boolean;
}

export interface ProjectDetailProps {
    favoriteProjects: Project[];
}

export interface ProjectTableProps {
    projects: Project[];
    favoriteProjects: Project[];
    toggleFavorite: (project: Project) => void;
  }

export interface FavoriteProjectsProps {
    favoriteProjects: Project[];
    isLoadingFavoriteProjects: boolean;
  }

export interface FavoriteButtonProps {
    isFavorite: boolean;
    toggleFavorite?: () => void;
  }

export interface EditButtonProps {
    projectId: string;
  }

export interface ProjectEditProps {
   editProject: (project: Project) => Promise<AxiosResponse<any, any>>
}