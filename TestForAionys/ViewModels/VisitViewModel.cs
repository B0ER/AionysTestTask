using System;
using TestAionys.Application.Data_Transfer_Objects;

namespace TestForAionys.ViewModels
{
    public class VisitViewModel
    {
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string ClientAddress { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }

        public static VisitViewModel Create(VisitDto visitDto)
        {
            var newVisitView = new VisitViewModel
            {
                TaskName = visitDto.Visit.TaskName,
                Description = visitDto.Visit.Description,
                ClientAddress = visitDto.Visit.ClientAddress,
                StartTime = visitDto.Visit.StartTime,
                EndTime = visitDto.Visit.EndTime,

                ClientFirstName = visitDto.Client.FirstName,
                ClientLastName = visitDto.Client.LastName,
            };

            return newVisitView;
        }
    }
}