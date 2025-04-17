using Microsoft.AspNetCore.Identity;

namespace Business.Entities;

public class MemberEntity : IdentityUser
{
    [ProtectedPersonalData]
    public string? ProjectName { get; set; }

    [ProtectedPersonalData]
    public string? FirstName { get; set; }

    [ProtectedPersonalData]
    public string? LastName { get; set; }

    [ProtectedPersonalData]
    public string? ClientName { get; set; }

    [ProtectedPersonalData]
    public string? Descirption { get; set; }

    [ProtectedPersonalData]
    public string? StartDate { get; set; }

    [ProtectedPersonalData]
    public string? EndDate { get; set; }

    [ProtectedPersonalData]
    public string? Budget { get; set; }

    [ProtectedPersonalData]
    public string? JobTitle { get; set; }

  

}


