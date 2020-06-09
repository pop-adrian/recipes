using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Recipes.Models;

namespace Recipes.Context
{
  public class RecipesContext : DbContext
  {
    public RecipesContext(DbContextOptions<RecipesContext> options)
        : base(options)
    {
    }

    public DbSet<Ingredient> Ingredients { get; set; }

    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
  }
}
