using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Migrations
{
    public partial class ssp_recipeIngredient_change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			var ingredientChangeProc = @"create procedure ssp_recipeIngredient_change @recipeId int, @ingredientId int, @quantity float as
				begin
					if (select count(*) from RecipeIngredients where RecipeId = @recipeId and IngredientId = @ingredientId) = 0
						insert into RecipeIngredients (IngredientId, Quantity, RecipeId) values (@ingredientId, @quantity, @recipeId);
					else
						update RecipeIngredients set Quantity = @quantity 
						where RecipeId = @recipeId and IngredientId = @ingredientId;
				end";

			var query = @"if (SELECT COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'ssp_recipeIngredient_change') = 1
				  drop procedure ssp_recipeIngredient_change; 
				  go " + ingredientChangeProc;

			migrationBuilder.Sql(query);

		}

		protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql("drop procedure ssp_recipeIngredient_change");
        }
    }
}
