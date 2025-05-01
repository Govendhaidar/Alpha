using Business.Contexts;
using Business.Interfaces;
using Business.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Controllers;


public class ProjectsController : Controller
{
    private readonly IProjectService _projectService;
    private readonly DataContext _context;

    public ProjectsController(IProjectService projectService, DataContext context)
    {
        _projectService = projectService;
        _context = context;
    }

    public async Task<IActionResult> AddProject(AddProjectForm form)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToArray()
                );

            return BadRequest(new { success = false, errors });
        }

       
        await _projectService.CreateAsync(form);
        return Ok(new { success = true });
    }


    [HttpPost]
    public async Task <IActionResult> EditProject(EditProjectForm form)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState
                .Where(x => x.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors.Select(x => x.ErrorMessage).ToArray()
                );

           

            return BadRequest(new { success = false, errors });
        }

        await _projectService.UpdateAsync(form);

        return Ok(new { success = true });
    }

    [HttpGet]
    public async Task<IActionResult> GetProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        return Ok(new
        {
            id = project.Id,
            projectName = project.ProjectName,
            clientName = project.ClientName,
            description = project.Description,
            startDate = project.StartDate.ToString("yyyy-MM-dd"),
            endDate = project.EndDate.ToString("yyyy-MM-dd"),
            budget = project.Budget.ToString()
        });
    }

    // ChatGpt. Denna kod genereras av Chat-GPT 40. Denna är en Delete-Handler som tar emot ett projekt-ID och försöker ta bort projektet från databasen via min _projectService. Delete(int id) är ID:t för projektet som man vill radera. Var result = await _projectService.DeleteAsync(id) är metoden som letar upp projekt med angiven Id, och om det finns så radera det från databasen. Lyckades den radera så returnera en "true", och lycas den inte så blire det en "false" istället. 

    [HttpPost]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _projectService.DeleteAsync(id);
        if (result)
            return Ok(new { success = true });

        return BadRequest(new { success = false, message = "Project was not found" });
    }







}

