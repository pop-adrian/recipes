using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Models
{
  public class Recipe
  {
    public int Id { get; set; }
    public String Name { get; set; }
    public String Description { get; set; }
    public List<RecipeIngredient> Ingredients { get; set; }

    public Recipe() { }

    public Recipe(int id, String name, String desc, List<RecipeIngredient> ings)
    {
      Id = id;
      Name = name;
      Description = desc;
      Ingredients = ings;
    }
  }
}
