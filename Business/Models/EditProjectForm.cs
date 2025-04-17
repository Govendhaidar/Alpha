using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Business.Models;

public class EditProjectForm
{
    public int Id { get; set; }

    [Display(Name = "Project Image", Prompt = "Select a image")]
    [DataType(DataType.Upload)]
    public IFormFile? ProjectImage { get; set; }


    [Display(Name = "Project Name", Prompt = "Enter project name")]
    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Required")]
    public string ProjectName { get; set; } = null!;

    [Display(Name = "ClientName", Prompt = "Enter client name")]
    [Required(ErrorMessage = "Required")]
    public string ClientName { get; set; } = null!;


    [Display(Name = "Description", Prompt = "Enter Description")]
    [DataType(DataType.Text)]
    [Required(ErrorMessage = "Required")]
    public string Description { get; set; } = null!;


    [Display(Name = "Start Date", Prompt = "Enter start date")]
    [DataType(DataType.Date)]
    [Required(ErrorMessage = "Required")]
    public string StartDate { get; set; } = null!;

    [Display(Name = "End Date", Prompt = "Enter end date")]
    [DataType(DataType.Date)]
    [Required(ErrorMessage = "Required")]
    public string EndDate { get; set; } = null!;


    [Display(Name = "Budget", Prompt = "Enter Budget")]
    [Required(ErrorMessage = "Required")]
    [DataType(DataType.Currency)]
    public string Budget { get; set; } = null!;

}
