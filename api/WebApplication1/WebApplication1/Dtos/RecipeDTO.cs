using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Dtos
{
  public class RecipeDTO
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public RecipeIngredientDTO[] RecipeIngredients { get; set; }
  }

  public class RecipeIngredientDTO
  {
    public int Id { get; set; }
    public double Quantity { get; set; }
    public int IngredientId { get; set; }
    public string IngredientName { get; set; }
  }
}
