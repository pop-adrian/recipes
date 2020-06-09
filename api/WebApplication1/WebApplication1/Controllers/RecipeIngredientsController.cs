using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Recipes.Context;
using Recipes.Models;

namespace Recipes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeIngredientsController : ControllerBase
    {
        private readonly RecipesContext _context;

        private void AddHardcodedData()
        {
           Ingredient i1 = new Ingredient(10, "tomatoes");
           Ingredient i2 = new Ingredient(11, "flour");
           Ingredient i3 = new Ingredient(12, "potatoes");
           RecipeIngredient ri1 = new RecipeIngredient(10, 10, i1, 2.5);
           RecipeIngredient ri2 = new RecipeIngredient(11, 11, i2, 2.0);
           RecipeIngredient ri3 = new RecipeIngredient(12, 12, i3, 1.5);
           _context.RecipeIngredients.Add(ri1);
           _context.RecipeIngredients.Add(ri2);
           _context.RecipeIngredients.Add(ri3);
           _context.SaveChanges();
        }
        public RecipeIngredientsController(RecipesContext context)
        {
            _context = context;
            AddHardcodedData();
        }

        // GET: api/RecipeIngredients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeIngredient>>> GetRecipeIngredients()
        {
            return await _context.RecipeIngredients.ToListAsync();
        }

        // GET: api/RecipeIngredients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeIngredient>> GetRecipeIngredient(int id)
        {
            var recipeIngredient = await _context.RecipeIngredients.FindAsync(id);

            if (recipeIngredient == null)
            {
                return NotFound();
            }

            return recipeIngredient;
        }

        // PUT: api/RecipeIngredients/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipeIngredient(int id, RecipeIngredient recipeIngredient)
        {
            if (id != recipeIngredient.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipeIngredient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeIngredientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RecipeIngredients
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RecipeIngredient>> PostRecipeIngredient(RecipeIngredient recipeIngredient)
        {
            _context.RecipeIngredients.Add(recipeIngredient);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipeIngredient", new { id = recipeIngredient.Id }, recipeIngredient);
        }

        // DELETE: api/RecipeIngredients/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RecipeIngredient>> DeleteRecipeIngredient(int id)
        {
            var recipeIngredient = await _context.RecipeIngredients.FindAsync(id);
            if (recipeIngredient == null)
            {
                return NotFound();
            }

            _context.RecipeIngredients.Remove(recipeIngredient);
            await _context.SaveChangesAsync();

            return recipeIngredient;
        }

        private bool RecipeIngredientExists(int id)
        {
            return _context.RecipeIngredients.Any(e => e.Id == id);
        }
    }
}
