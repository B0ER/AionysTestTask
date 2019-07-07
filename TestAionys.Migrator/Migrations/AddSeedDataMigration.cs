using FluentMigrator;
using TestAionys.Models.Database;

namespace TestAionys.Migrator.Migrations
{
    [Migration(20190706161900)]
    public class AddSeedDataMigration : Migration
    {
        public override void Up()
        {
            var client1 = new Client { Address = "Киев", FirstName = "Суворов", LastName = "Игорь", PhoneNumbers = "7-495-655-81-39" };
            var client2 = new Client { Address = "Харьков", FirstName = "Одинцова", LastName = "Ксения", PhoneNumbers = "7-495-649-58-56" };
            var client3 = new Client { Address = "Москва", FirstName = "Савина", LastName = "Нина", PhoneNumbers = "7-495-984-28-85" };
            var client4 = new Client { Address = "Одесса", FirstName = "Гаврилов", LastName = "Юрий", PhoneNumbers = "7-495-344-92-65" };
            var client5 = new Client { Address = "Луцк", FirstName = "Баранова", LastName = "Юлиана", PhoneNumbers = "7-495-833-19-51" };
            var client6 = new Client { Address = "Питер", FirstName = "Лыткина", LastName = "Валентина", PhoneNumbers = "7-495-612-18-43" };
            var client7 = new Client { Address = "Харьков", FirstName = "Ковалёва", LastName = "Елизавета ", PhoneNumbers = "7-495-655-32-13" };
            var client8 = new Client { Address = "Киев", FirstName = "Сафонова", LastName = "Валентина", PhoneNumbers = "7-495-524-37-53" };

            Insert.IntoTable("Clients").Row(client1);
            Insert.IntoTable("Clients").Row(client2);
            Insert.IntoTable("Clients").Row(client3);
            Insert.IntoTable("Clients").Row(client4);
            Insert.IntoTable("Clients").Row(client5);
            Insert.IntoTable("Clients").Row(client6);
            Insert.IntoTable("Clients").Row(client7);
            Insert.IntoTable("Clients").Row(client8);
        }

        public override void Down()
        {
            Delete.FromTable("Clients").AllRows();
        }
    }
}