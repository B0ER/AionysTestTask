using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestAionys.Models.Database;

namespace TestAionys.Application.IRepositories
{
    public interface IClientRepository : IBaseRepository<Client, Client>
    {
        Task<IEnumerable<Client>> FindByFirstName(string firstName);
        Task<IEnumerable<Client>> FindByCity(string city);
    }
}