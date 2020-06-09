using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Context
{
  public class IngredientContext : DbContext
  {
    public IngredientContext(DbContextOptions<IngredientContext> options)
        : base(options)
    {
    }

    public DbSet<Ingredient> Ingredients { get; set; }
  }
}
