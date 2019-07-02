using System.Collections.Generic;
using System.Threading.Tasks;
using TestAionys.Models.Database;

namespace TestAionys.Application.IRepositories
{
    public interface IBaseRepository<TEntity, TDtoModel>
        where TEntity : BaseEntity
    {
        Task<IEnumerable<TDtoModel>> GetAll();
        Task<TDtoModel> FindById(string id);
        Task Add(TEntity addEntity);
        Task Update(TEntity updateEntity);
        Task DeleteById(string id);
        Task Delete(TEntity deletedEntity);
    }

}