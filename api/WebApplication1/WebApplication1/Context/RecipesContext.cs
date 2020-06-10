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


  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
      modelBuilder.Entity<Ingredient>().HasData(
        new Ingredient
        {
          Id = 1,
          Name = "potatoes"
        },
        new Ingredient
        {
          Id = 2,
          Name = "flour"
        }
      );

      modelBuilder.Entity<Recipe>().HasData(
         new Recipe
         {
          Id = 1,
          Name = "bread",
          Description = "use flour",
         }
        );

      modelBuilder.Entity<RecipeIngredient>().HasData(
        new 
        {
           Id = 1,
           IngredientId = 1,
           Quantity = 2.5,
           RecipeId = 1
        }
        );
    }

    public DbSet<Ingredient> Ingredients { get; set; }

    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
  }
}
