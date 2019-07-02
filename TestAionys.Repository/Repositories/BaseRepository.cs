using System.Data;


namespace TestAionys.Repository.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly string ConnectionString;
        protected readonly string TableName;

        protected IDbConnection Connection;

        public BaseRepository(string tableName, string connectionString)
        {
            ConnectionString = connectionString;
            TableName = tableName;
        }
    }
}