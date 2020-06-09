using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Models
{
  public class RecipeIngredient
  {
    public int Id { get; set; }
    public int IngredientId { get; set; }
    public Ingredient Ingredient { get; set; }
    public double Quantity { get; set; }

    public RecipeIngredient() { }

    public RecipeIngredient(int id, int ingId, Ingredient ing, double quantity)
    {
      Id = id;
      IngredientId = ingId;
      Ingredient = ing;
      Quantity = quantity;
    }
  }
}
