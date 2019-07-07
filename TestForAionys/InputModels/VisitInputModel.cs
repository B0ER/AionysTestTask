using System;
using System.ComponentModel.DataAnnotations;
using TestAionys.Models.Database;

namespace TestForAionys.InputModels
{
    public class VisitInputModel
    {
        [Required]
        public string TaskName { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string ClientId { get; set; }
        [Required]
        public string ClientAddress { get; set; }
        [Required]
        public int StartTime { get; set; }
        [Required]
        public int EndTime { get; set; }

        public Visit ToVisit()
        {
            var visit = new Visit
            {
                TaskName = TaskName,
                Description = Description,
                ClientAddress = ClientAddress,
                ClientId = ClientId,
                StartTime = new DateTime(TimeSpan.FromSeconds(StartTime).Ticks),
                EndTime = new DateTime(TimeSpan.FromSeconds(EndTime).Ticks)
            };
            return visit;
        }
    }
}