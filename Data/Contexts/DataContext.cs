using Business.Entities;
using Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Business.Contexts;

public class DataContext(DbContextOptions<DataContext> options) : IdentityDbContext<MemberEntity>(options)
{

    public virtual DbSet<ProjectEntity> Projects { get; set; }
}
