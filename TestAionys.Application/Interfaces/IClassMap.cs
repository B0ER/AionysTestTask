using TestAionys.Models.Database;

namespace TestAionys.Application.Interfaces
{
    public interface IClassMap { }

    public interface IClassMap<in TIn, out TOut> : IClassMap
        where TIn : BaseEntity
    {
        TOut Create(TIn inEntity);
    }
}