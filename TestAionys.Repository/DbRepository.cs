using Microsoft.Extensions.Options;
using TestAionys.Application.Data_Transfer_Objects;
using TestAionys.Application.Interfaces;
using TestAionys.Application.IRepositories;
using TestAionys.Models.Database;
using TestAionys.Repository.Configurations;
using TestAionys.Repository.Repositories;

namespace TestAionys.Repository
{
    public class DbRepository : IUnitOfWork
    {
        private readonly string _connectionString;

        public DbRepository(IOptions<ConnectionConfig> config)
        {
            _connectionString = config.Value.ConnectionString;
        }

        private IBaseRepository<Visit, VisitDto> _visits;
        public IBaseRepository<Visit, VisitDto> Visits => _visits ?? (_visits = new VisitRepository(DbTables.Visits, _connectionString));

        private IClientRepository _clients;
        public IClientRepository Clients => _clients ?? (_clients = new ClientRepository(DbTables.Clients, _connectionString));
    }
}