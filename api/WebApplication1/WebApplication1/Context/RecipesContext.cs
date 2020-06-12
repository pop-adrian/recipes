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

		/*
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Ingredient>().HasKey(ingredient => ingredient.Id);
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
			  },
			  new Ingredient
			  {
				  Id = 3,
				  Name = "kiwi"
			  }
			);
			modelBuilder.Entity<Recipe>().HasKey(recipe => new { recipe.Id });
			modelBuilder.Entity<Recipe>().HasData(
		 new Recipe
		 {
			 Id = 1,
			 Name = "bread",
			 Description = "use flour",
		 },
		 new Recipe
		 {
			 Id = 2,
			 Name = "pizza",
			 Description = "use potatoes and flour"
		 }
		);

			//modelBuilder.Entity<RecipeIngredient>().HasKey(recipeIngredient => new { recipeIngredient.Id, recipeIngredient.RecipeId });
			modelBuilder.Entity<RecipeIngredient>().HasData(
			new RecipeIngredient
			{
				Id = 1,
				IngredientId = 1,
				Quantity = 2.5,
				RecipeId = 1
			},
			new RecipeIngredient
			{
				Id = 2,
				IngredientId = 1,
				Quantity = 2.0,
				RecipeId = 2
			},
			new RecipeIngredient
			{
				Id = 3,
				IngredientId = 2,
				Quantity = 2.0,
				RecipeId = 2
			}
			);
		}
		*/
    public DbSet<Ingredient> Ingredients { get; set; }

    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
  }
}
