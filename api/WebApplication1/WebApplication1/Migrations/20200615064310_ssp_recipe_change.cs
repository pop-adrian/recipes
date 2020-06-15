using Microsoft.EntityFrameworkCore.Migrations;

namespace Recipes.Migrations
{
    public partial class ssp_recipe_change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			var recipeChangeProc = @"create procedure ssp_recipe_change @name varchar(100), @description varchar(200), @RecipeId int = 0 as
				begin
					if @RecipeId = 0
						insert into Recipes(Name, Description) values(@name, @description);
					else
						update Recipes set Name = @name, Description = @description where Id = @RecipeId;
				end";

			var query = @"if (SELECT COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_NAME = 'ssp_recipe_change') = 1
				  drop procedure ssp_recipe_change; 
				  go "+ recipeChangeProc;

			migrationBuilder.Sql(query);
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.Sql("drop procedure ssp_recipe_change");
        }
    }
}
