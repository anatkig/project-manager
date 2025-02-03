import { render } from "@testing-library/react";
import ProjectList from "../pages/ProjectList";
import { getProjects } from "../api";
import { Project } from "../types";

jest.mock("react-router", () => {
    return {
      useNavigate: jest.fn(),
      useParams: jest.fn(() => ({ id: "123" })),
      Link: jest.fn().mockImplementation(({ children }) => <span>{children}</span>),
      Navigate: jest.fn(),
    };
  });
  
  jest.mock("../api", () => ({
    getProjects: jest.fn(),
  }));

const mockProjects: Project[] = [
    { id: "1", name: "Project 1", startDate: new Date().toISOString(), endDate: new Date().toISOString(), manager: "Manager 1" },
    { id: "2", name: "Project 2", startDate: new Date().toISOString(), endDate: new Date().toISOString(), manager: "Manager 2" },
];

describe("ProjectList", () => {
    const favoriteProjects: Project[] = [];
    const setFavoriteProjects = jest.fn();
    const newProjectCreated = false;

    beforeEach(() => {
        (getProjects as jest.Mock).mockResolvedValue({ data: mockProjects });
    });

    it("renders loader initially", () => {
        render(
            <ProjectList
                favoriteProjects={favoriteProjects}
                setFavoriteProjects={setFavoriteProjects}
                newProjectCreated={newProjectCreated}
            />
        );
        expect(document.querySelector("div[class^='MuiBox']")).toBeInTheDocument();
    });
});
