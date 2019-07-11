using System.Collections.Generic;
using System.Threading.Tasks;
using TestAionys.Models.Database;

namespace TestAionys.Application.IRepositories
{
    public interface IClientRepository : IBaseRepository<Client, Client>
    {
        Task<IEnumerable<string>> GetAllCities();
        Task<IEnumerable<string>> GetAllFirstNames();
    }
}