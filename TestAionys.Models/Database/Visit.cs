using System;

namespace TestAionys.Models.Database
{
    public class Visit : BaseEntity
    {
        public string ClientId { get; set; }

        public string TaskName { get; set; }
        public string Description { get; set; }
        public string ClientAddress { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}