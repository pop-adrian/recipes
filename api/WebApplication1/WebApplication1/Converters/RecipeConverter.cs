using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Recipes.Dtos;
using Recipes.Models;

namespace Recipes.Converters
{
	public class RecipeConverter
	{
		public static RecipeDTO RecipeToRecipeDTO(Recipe recipe)
		{
			RecipeDTO recipeDTO = new RecipeDTO();
			recipeDTO.Id = recipe.Id;
			recipeDTO.Name = recipe.Name;
			recipeDTO.Description = recipe.Description;
			recipeDTO.Ingredients = recipe.Ingredients.Select(x =>
			{
				RecipeIngredientDTO riDTO = new RecipeIngredientDTO();
				riDTO.Id = x.Id;
				riDTO.IngredientId = x.IngredientId;
				riDTO.IngredientName = x.Ingredient.Name;
				riDTO.Quantity = x.Quantity;
				return riDTO;
			}).ToArray();
			return recipeDTO;
		}
		public static Recipe RecipeDTOToRecipePOST(RecipeDTO recipeDTO)
		{
			Recipe recipe = new Recipe();
			recipe.Name = recipeDTO.Name;
			recipe.Description = recipeDTO.Description;
			recipe.Ingredients = recipeDTO.Ingredients.Select(x =>
			{
				RecipeIngredient recipeIngredient = new RecipeIngredient();
				//recipeIngredient.Id = x.Id;
				recipeIngredient.Quantity = x.Quantity;
				recipeIngredient.RecipeId = recipeDTO.Id;
				recipeIngredient.Recipe = recipe;
				recipeIngredient.IngredientId = x.IngredientId;
				recipeIngredient.Ingredient = new Ingredient(x.IngredientId, x.IngredientName);
				return recipeIngredient;
			}).ToList();
			return recipe;
		}

		public static Recipe RecipeDTOToRecipePUT(RecipeDTO recipeDTO)
		{
			Recipe recipe = new Recipe();
			recipe.Name = recipeDTO.Name;
			recipe.Description = recipeDTO.Description;
			recipe.Ingredients = recipeDTO.Ingredients.Select(x =>
			{
				RecipeIngredient recipeIngredient = new RecipeIngredient();
				recipeIngredient.Id = x.Id;
				recipeIngredient.Quantity = x.Quantity;
				recipeIngredient.RecipeId = recipeDTO.Id;
				recipeIngredient.Recipe = recipe;
				recipeIngredient.IngredientId = x.IngredientId;
				recipeIngredient.Ingredient = new Ingredient(x.IngredientId, x.IngredientName);
				return recipeIngredient;
			}).ToList();
			return recipe;
		}
	}
}
