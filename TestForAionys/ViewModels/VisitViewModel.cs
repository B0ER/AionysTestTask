using System;
using TestAionys.Application.Data_Transfer_Objects;

namespace TestForAionys.ViewModels
{
    public class VisitViewModel
    {
        public string Id { get; set; }
        public string TaskName { get; set; }
        public string Description { get; set; }
        public string ClientAddress { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    
        public string ClientId { get; set; }
        public string ClientFirstName { get; set; }
        public string ClientLastName { get; set; }

        public static VisitViewModel Create(VisitDto visitDto)
        {
            var newVisitView = new VisitViewModel
            {
                Id = visitDto.Visit.Id,
                TaskName = visitDto.Visit.TaskName,
                Description = visitDto.Visit.Description,
                ClientAddress = visitDto.Visit.ClientAddress,
                StartTime = visitDto.Visit.StartTime.ToShortTimeString(),
                EndTime = visitDto.Visit.EndTime.ToShortTimeString(),

                ClientId = visitDto.Client.Id,
                ClientFirstName = visitDto.Client.FirstName,
                ClientLastName = visitDto.Client.LastName,
            };

            return newVisitView;
        }
    }
}