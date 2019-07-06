using Microsoft.Extensions.DependencyInjection;
using TestAionys.Application.Interfaces;

namespace TestAionys.Repository.Dependency_Injection
{
    public static class AddModuleExtension
    {
        public static void AddRepository(this IServiceCollection service)
        {
            service.AddSingleton<IUnitOfWork, DbRepository>();
        }
    }
}