using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Recipes.Models
{
  public class Recipe
  {
	[Key]
	[System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

    public Recipe(String name, String desc, List<RecipeIngredient> ings)
	{
		Name = name;
		Description = desc;
		Ingredients = ings;
	}
	}
}
