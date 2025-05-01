using Business.Models;
using Data.Entities;

namespace Business.Interfaces
{
    public interface IProjectService
    {
        Task CreateAsync(AddProjectForm form);
        Task<IEnumerable<ProjectEntity>> GetAllProjects();
        Task<bool> DeleteAsync(int id);
        Task UpdateAsync(EditProjectForm form);


    }
}
