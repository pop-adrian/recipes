using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
  public class Ingredient
  {
    public int Id { get; set; }
    public String Name { get; set; }

    public Ingredient()
    {
    }

    public Ingredient(int id, String name)
    {
      Id = id;
      Name = name;
    }
  }
}
