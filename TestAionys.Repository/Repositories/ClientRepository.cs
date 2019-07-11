using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.Sqlite;
using TestAionys.Application.IRepositories;
using TestAionys.Models.Database;

namespace TestAionys.Repository.Repositories
{
    public class ClientRepository : BaseRepository, IClientRepository
    {
        public ClientRepository(string tableName, string connectionString) : base(tableName, connectionString)
        {
        }

        public async Task<IEnumerable<Client>> GetAll()
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                IEnumerable<Client> clients = await Connection.QueryAsync<Client>($"Select * from {TableName}");
                return clients;
            }
        }

        public async Task<Client> FindById(string id)
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                IEnumerable<Client> clients = await Connection.QueryAsync<Client>(
                    $"Select * from {TableName} where id=@id limit 1", new { id });
                return clients.FirstOrDefault();
            }
        }

        public async Task Add(Client addEntity)
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                await Connection.ExecuteAsync(
                    $"Insert into {TableName} (Id, CreatedAt, FirstName, LastName, Address, PhoneNumbers) " +
                    $"Values (@Id, @CreatedAt, @FirstName, @LastName, @Address, @PhoneNumbers)",
                    new
                    {
                        addEntity.Id,
                        addEntity.CreatedAt,
                        addEntity.FirstName,
                        addEntity.LastName,
                        addEntity.Address,
                        addEntity.PhoneNumbers
                    });
            }
        }

        public async Task Update(Client updateEntity)
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                await Connection.ExecuteAsync(
                    $"Update {TableName} " +
                    $"SET CreatedAt=@CreatedAt, FirstName=@FirstName, LastName=@LastName, " +
                    $"Address=@Address, PhoneNumbers=@PhoneNumbers " +
                    $"where Id = @id",
                    new
                    {
                        updateEntity.Id,
                        updateEntity.CreatedAt,
                        updateEntity.FirstName,
                        updateEntity.LastName,
                        updateEntity.Address,
                        updateEntity.PhoneNumbers
                    });
            }
        }

        public async Task DeleteById(string id)
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                await Connection.ExecuteAsync($"DELETE FROM {TableName} where Id = @id", new { id });
            }
        }

        public async Task Delete(Client deletedEntity)
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                await Connection.ExecuteAsync($"DELETE FROM {TableName} where Id = @Id", new { deletedEntity.Id });
            }
        }

        public async Task<IEnumerable<string>> GetAllCities()
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                var cities = await Connection.QueryAsync<string>(
                    $"SELECT DISTINCT Address FROM {TableName}");
                return cities;
            }
        }

        public async Task<IEnumerable<string>> GetAllFirstNames()
        {
            using (Connection = new SqliteConnection(ConnectionString))
            {
                var cities = await Connection.QueryAsync<string>(
                    $"SELECT DISTINCT FirstName FROM {TableName}");
                return cities;
            }
        }
    }
}