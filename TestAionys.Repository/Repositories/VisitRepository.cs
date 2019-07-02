using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using TestAionys.Application.Data_Transfer_Objects;
using TestAionys.Application.IRepositories;
using TestAionys.Models.Database;

namespace TestAionys.Repository.Repositories
{
    public class VisitRepository : BaseRepository, IBaseRepository<Visit, VisitDto>
    {
        public VisitRepository(string tableName, string connectionString) : base(tableName, connectionString)
        {
        }

        public async Task<IEnumerable<VisitDto>> GetAll()
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                IEnumerable<VisitDto> visitsDto = await Connection.QueryAsync<Visit, Client, VisitDto>(
                    $"Select * from {TableName}",
                    (visit, client) =>
                    {
                        var visitDto = new VisitDto { Client = client, Visit = visit };
                        return visitDto;
                    });
                return visitsDto;
            }
        }

        public async Task<VisitDto> FindById(string id)
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                using (Connection = new SqlConnection(ConnectionString))
                {
                    IEnumerable<VisitDto> visitsDto = await Connection.QueryAsync<Visit, Client, VisitDto>(
                        $"Select top(1) * from {TableName} where Id=@id",
                        (visit, client) =>
                        {
                            var visitDto = new VisitDto { Client = client, Visit = visit };
                            return visitDto;
                        }, new { id });
                    return visitsDto.FirstOrDefault();
                }
            }
        }

        public async Task Add(Visit addEntity)
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                await Connection.ExecuteAsync(
                    $"Insert into {TableName} (Id, CreatedAt, ClientId, TaskName, Description, ClientAddress, StartTime, EndTime) " +
                    $"Values (@Id, @CreatedAt, @ClientId, @TaskName, @Description, @ClientAddress, StartTime, EndTime)",
                    new
                    {
                        addEntity.Id,
                        addEntity.CreatedAt,
                        addEntity.ClientId,
                        addEntity.TaskName,
                        addEntity.Description,
                        addEntity.ClientAddress,
                        addEntity.StartTime,
                        addEntity.EndTime
                    });
            }
        }

        public async Task Update(Visit updateEntity)
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                await Connection.ExecuteAsync(
                    $"Update {TableName} " +
                    $"SET CreatedAt=@CreatedAt, ClientId=@ClientId, TaskName=@TaskName, " +
                    $"Description=@Description, ClientAddress=@ClientAddress, StartTime=@StartTime, EndTime=@EndTime " +
                    $"where Id = @id",
                    new
                    {
                        updateEntity.Id,
                        updateEntity.CreatedAt,
                        updateEntity.ClientId,
                        updateEntity.TaskName,
                        updateEntity.Description,
                        updateEntity.ClientAddress,
                        updateEntity.StartTime,
                        updateEntity.EndTime
                    });
            }
        }


        public async Task DeleteById(string id)
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                await Connection.ExecuteAsync($"DELETE FROM {TableName} where Id = @id", new { id });
            }
        }

        public async Task Delete(Visit deletedEntity)
        {
            using (Connection = new SqlConnection(ConnectionString))
            {
                await Connection.ExecuteAsync($"DELETE FROM {TableName} where Id = @Id", new { deletedEntity.Id });
            }
        }
    }
}