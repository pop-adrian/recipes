using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recipes.Context;
using Recipes.Models;
using Recipes.Dtos;
using Recipes.Converters;
using System.Xml.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Recipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly RecipesContext _context;
		private string ConnectionString;

        public RecipesController(RecipesContext context, IConfiguration configuration)
        {
            _context = context;
			this.ConnectionString = configuration.GetConnectionString("myConnection");

	}

	// GET: api/Recipes
	[HttpGet]
        public ActionResult<IEnumerable<RecipeDTO>> GetRecipes()
        {
            var recipeIngredients = _context.RecipeIngredients.Include(r => r.Ingredient).ToList();
            var result = _context.Recipes.Include(r => r.Ingredients).ToList();
            return result.Select(x => RecipeConverter.RecipeToRecipeDTO(x)).ToList();
        }

        // GET: api/Recipes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeDTO>> GetRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
			recipe.Ingredients = _context.RecipeIngredients.Include(r => r.Ingredient).ToList().Where(x => x.RecipeId == id).ToList();
			var recipeDTO = RecipeConverter.RecipeToRecipeDTO(recipe);

            if (recipe == null)
            {
                return NotFound();
            }

            return recipeDTO;
        }

        // PUT: api/Recipes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipe(int id, RecipeDTO recipeDTO)
        {
            if (id != recipeDTO.Id)
            {
                return BadRequest();
            }
			this.UpdateRecipe(recipeDTO);		
            return NoContent();
        }
		private void UpdateRecipe(RecipeDTO recipeDTO)
		{
			var recipe = RecipeConverter.RecipeDTOToRecipe(recipeDTO);
			var xmlRecipe = getXmlFromRecipe(recipe);
			try
			{
				using (SqlConnection connection = new SqlConnection(this.ConnectionString))
				{
					connection.Open();
					SqlCommand updateCommand = connection.CreateCommand();
					updateCommand.CommandType = CommandType.StoredProcedure;
					updateCommand.CommandText = "ssp_recipes_insert";
					updateCommand.Parameters.Add(new SqlParameter("@name", recipe.Name));
					updateCommand.Parameters.Add(new SqlParameter("@description", recipe.Description));
					updateCommand.Parameters.Add(new SqlParameter("@ingredients", xmlRecipe.ToString()));
					updateCommand.Parameters.Add(new SqlParameter("@rId", recipe.Id));
					updateCommand.ExecuteNonQuery();
				}
			}
			catch (SqlException exeption)
			{
				Console.WriteLine(exeption.Message);
			}
		}
        // POST: api/Recipes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<string>> PostRecipe(RecipeDTO recipeDTO)
        {
			InsertNewRecipe(recipeDTO);
			return "ok";
        }

		public void InsertNewRecipe(RecipeDTO recipeDTO)
		{
			var recipe = RecipeConverter.RecipeDTOToRecipe(recipeDTO);
			var xmlRecipe = getXmlFromRecipe(recipe);
			try
			{
				using (SqlConnection connection = new SqlConnection(this.ConnectionString))
				{
					connection.Open();
					SqlCommand insertCommand = connection.CreateCommand();
					insertCommand.CommandType = CommandType.StoredProcedure;
					insertCommand.CommandText = "ssp_recipes_insert";
					insertCommand.Parameters.Add(new SqlParameter("@name", recipe.Name));
					insertCommand.Parameters.Add(new SqlParameter("@description", recipe.Description));
					insertCommand.Parameters.Add(new SqlParameter("@ingredients", xmlRecipe.ToString()));
					insertCommand.ExecuteNonQuery();
				}
			}catch (SqlException exeption)
			{
				Console.WriteLine(exeption.Message);
			}
		}

		// DELETE: api/Recipes/5
		[HttpDelete("{id}")]
        public async Task<ActionResult<Recipe>> DeleteRecipe(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();

            return recipe;
        }
		private XElement getXmlFromRecipe(Recipe recipe)
		{
			var xmlIngredients = recipe.Ingredients.Select(ingredient =>
			{
				return
				new XElement("recipeIngredient", new XAttribute("quantity", ingredient.Quantity),
					new XAttribute("ingredientId", ingredient.IngredientId));
			}).ToList();
			return new XElement("recipeIngredients", xmlIngredients);
		}
        private bool RecipeExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
