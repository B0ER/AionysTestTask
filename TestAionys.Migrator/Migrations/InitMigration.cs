using System.Data;
using FluentMigrator;
using TestAionys.Models.Database;

namespace TestAionys.Migrator.Migrations
{
    [Migration(20190702165300)]
    public class InitMigration : Migration
    {
        public override void Up()
        {
            Create.Table("Clients")
                .WithColumn(nameof(Client.Id)).AsString(36).PrimaryKey()
                .WithColumn(nameof(Client.CreatedAt)).AsDateTime()
                .WithColumn(nameof(Client.FirsName)).AsString()
                .WithColumn(nameof(Client.LastName)).AsString()
                .WithColumn(nameof(Client.Address)).AsString()
                .WithColumn(nameof(Client.PhoneNumbers)).AsString(13);

            Create.Table("Visits")
                .WithColumn(nameof(Visit.Id)).AsString(36).PrimaryKey()
                .WithColumn(nameof(Visit.CreatedAt)).AsDateTime()
                .WithColumn(nameof(Visit.ClientId)).AsString(36)
                .WithColumn(nameof(Visit.TaskName)).AsString()
                .WithColumn(nameof(Visit.Description)).AsString()
                .WithColumn(nameof(Visit.ClientAddress)).AsString()
                .WithColumn(nameof(Visit.StartTime)).AsDateTime()
                .WithColumn(nameof(Visit.EndTime)).AsDateTime();

            //relationship
            Create.ForeignKey()
                .FromTable("Visits").ForeignColumn(nameof(Visit.ClientId))
                .ToTable("Clients").PrimaryColumn(nameof(Client.Id)).OnDeleteOrUpdate(Rule.Cascade);
        }

        public override void Down()
        {
            Delete.Table("Clients");
            Delete.Table("Visits");
        }
    }
}