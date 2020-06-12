using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Recipes.Migrations
{
    public partial class spUpsert : Migration
    {		
		protected override void Up(MigrationBuilder migrationBuilder)
        {
			var upsertProc = @"ssp_recipes_insert @name NVARCHAR(100), @description NVARCHAR(200), @ingredients XML, @rId int = 0 as
				begin
				declare @hdoc int;
				if (@rId = 0)
					begin
				    insert into Recipes(Name, Description) values(@name, @description);
					declare @recipeId int;
					set @recipeId = @@Identity;

					EXEC sp_xml_preparedocument @hdoc OUTPUT, @ingredients;

					INSERT INTO RecipeIngredients(RecipeId, IngredientId, Quantity)
					select @recipeId, *
					FROM OPENXML(@hdoc, ''/recipeIngredients/recipeIngredient'', 1)
					WITH(ingredientId int ''@ingredientId'',
					quantity float ''@quantity'');

					EXEC sp_xml_removedocument @hdoc;
					return;
					end
				else
					begin
					update Recipes set Name = @name, Description = @description where Id = @rId;

					EXEC sp_xml_preparedocument @hdoc OUTPUT, @ingredients;

					declare @tempTable Table(IngredientId int, quantity int);
					insert into @tempTable(IngredientId, quantity)

					select*
					FROM OPENXML(@hdoc, ''/recipeIngredients/recipeIngredient'', 1)

					WITH(ingredientId int ''@ingredientId'',
					quantity float ''@quantity'');

					EXEC sp_xml_removedocument @hdoc;
					/*remove */
					delete RecipeIngredients where(RecipeId = @rId and IngredientId not in (select IngredientId from @tempTable));

					declare myCursor cursor for select* from @tempTable;
					open myCursor;
					declare @currentIngredientId int;
					declare @currentIngredientQuantity int;

					fetch next from myCursor into @currentIngredientId, @currentIngredientQuantity;
					while @@FETCH_STATUS = 0
						begin
							if (select count(*) from RecipeIngredients where RecipeId = @rId and IngredientId = @currentIngredientId)= 0
								/* insert new Ingredients */
								insert into RecipeIngredients(RecipeId, IngredientId, Quantity)
								values(@rId, @currentIngredientId, @currentIngredientQuantity);
							else
								/* update new Ingredients */
								update RecipeIngredients set Quantity = @currentIngredientQuantity
								where RecipeId = @rId and IngredientId = @currentIngredientId;

							fetch next from myCursor into @currentIngredientId, @currentIngredientQuantity;
						end

				   close myCursor;
						deallocate myCursor;
						end
				end'";

			var query = string.Format("if (SELECT COUNT(*) FROM INFORMATION_SCHEMA.ROUTINES " +
				" WHERE ROUTINE_NAME = 'ssp_recipes_insert') = 1 " +
				" drop procedure ssp_recipes_insert;	" +
				" EXECUTE sp_executesql N' "+
				" create procedure {0}", upsertProc);

			migrationBuilder.Sql(query);
		}

        protected override void Down(MigrationBuilder migrationBuilder)
        {
			var connString = @"Server=DESKTOP-JGO467Q\SQLEXPRESS;Database=Recipes;Trusted_Connection=True;";
			var query = string.Format("drop procedure ssp_recipes_insert;");
			using (var conn = new SqlConnection(connString))
			{
				conn.Open();
				using (var cmd = new SqlCommand(query, conn))
				{
					cmd.ExecuteNonQuery();
				}
			}
			
		}
    }
}
