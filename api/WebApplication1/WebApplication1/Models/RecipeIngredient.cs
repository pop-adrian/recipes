using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Models
{
  public class RecipeIngredient
  {
    public int Id { get; set; }

    [ForeignKey(nameof(Ingredient))]
    public int IngredientId { get; set; }

    public Ingredient Ingredient { get; set; }

    [ForeignKey(nameof(AlternativeIngredient))]
    public int? AlternativeIngredientId { get; set; }

    public Ingredient AlternativeIngredient { get; set; }

    public double Quantity { get; set; }

    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; }

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
