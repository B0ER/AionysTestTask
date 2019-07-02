using TestAionys.Models.Database;

namespace TestAionys.Application.Data_Transfer_Objects
{
    public class VisitDto
    {
        public Client Client { get; set; }
        public Visit Visit { get; set; }
    }
}