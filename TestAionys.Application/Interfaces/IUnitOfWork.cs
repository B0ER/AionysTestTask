using TestAionys.Application.Data_Transfer_Objects;
using TestAionys.Application.IRepositories;
using TestAionys.Models.Database;

namespace TestAionys.Application.Interfaces
{
    public interface IUnitOfWork
    {
        IBaseRepository<Visit, VisitDto> Visits { get; }
        IClientRepository Clients { get; }
    }
}