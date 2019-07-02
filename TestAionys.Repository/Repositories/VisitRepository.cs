using System.Collections.Generic;
using System.Threading.Tasks;
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
            throw new System.NotImplementedException();
        }

        public async Task<VisitDto> FindById(string id)
        {
            throw new System.NotImplementedException();
        }

        public async Task Add(Visit addEntity)
        {
            throw new System.NotImplementedException();
        }

        public async Task Update(Visit updateEntity)
        {
            throw new System.NotImplementedException();
        }

        public async Task DeleteById(string id)
        {
            throw new System.NotImplementedException();
        }

        public async Task Delete(Visit deletedEntity)
        {
            throw new System.NotImplementedException();
        }
    }
}