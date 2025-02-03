import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectCreate from "../pages/ProjectCreate";
import dayjs from "dayjs";

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ProjectCreate", () => {
  const initialData = {
    id: "1",
    name: "Test Project",
    description: "Test Description",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    manager: "John Doe",
  };

  const onSubmit = jest.fn();

  const renderComponent = () =>
    render(
      <ProjectCreate initialData={initialData} onSubmit={onSubmit} />
    );

  it("renders the form with initial data", () => {
    renderComponent();

    expect(screen.getByLabelText(/Project Name/i)).toHaveValue(initialData.name);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(initialData.description);
    expect(screen.getByLabelText(/Start Date/i)).toHaveValue(dayjs(initialData.startDate).format("MM/DD/YYYY"));
    expect(screen.getByLabelText(/End Date/i)).toHaveValue(dayjs(initialData.endDate).format("MM/DD/YYYY"));
    expect(screen.getByLabelText(/Project Manager/i)).toHaveValue(initialData.manager);
  });

  it("submits the form with updated data", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: "Updated Project" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Updated Description" } });
    fireEvent.change(screen.getByLabelText(/Project Manager/i), { target: { value: "Jane Doe" } });

    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: initialData.id,
      name: "Updated Project",
      description: "Updated Description",
      startDate: initialData.startDate,
      endDate: initialData.endDate,
      manager: "Jane Doe",
    });

    expect(mockNavigate).toHaveBeenCalledWith("/project-manager/");
  });
});