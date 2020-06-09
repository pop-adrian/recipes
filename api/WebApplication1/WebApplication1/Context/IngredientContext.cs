using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Recipes.Models;

namespace Recipes.Context
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
