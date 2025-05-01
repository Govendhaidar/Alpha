using Business.Models;
using Data.Entities;

namespace WebApp.ViewModels
{
    public class ProjectsViewModel
    {
        public IEnumerable<ProjectEntity> Projects { get; set; } = new List<ProjectEntity>();
        public AddProjectForm AddForm { get; set; } = new();
        public EditProjectForm EditForm { get; set; } = new();

    }
}
