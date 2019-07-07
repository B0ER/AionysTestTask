using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAionys.Application.Data_Transfer_Objects;
using TestAionys.Application.Interfaces;
using TestForAionys.InputModels;
using TestForAionys.ViewModels;

namespace TestForAionys.Controllers
{
    [Route("api/[controller]")]
    public class VisitsController : Controller
    {
        private IUnitOfWork _db;

        public VisitsController(IUnitOfWork db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<VisitViewModel>> GetAll()
        {
            IEnumerable<VisitDto> visitDto = await _db.Visits.GetAll();
            IEnumerable<VisitViewModel> visitsViewModels = visitDto.Select(visit => VisitViewModel.Create(visit));
            return visitsViewModels;
        }

        [HttpPost]
        public async Task<ActionResult<VisitViewModel>> AddVisit([FromBody]VisitInputModel newVisit)
        {
            var visit = newVisit.ToVisit();
            var client = await _db.Clients.FindById(visit.ClientId);

            if (client == null) return BadRequest();

            await _db.Visits.Add(visit);

            var visitViewModel = new VisitViewModel
            {
                Id = visit.Id,
                TaskName = visit.TaskName,
                ClientAddress = visit.ClientAddress,
                ClientFirstName = client.FirstName,
                ClientLastName = client.LastName,
                Description = visit.Description,
                StartTime = visit.StartTime.ToShortTimeString(),
                EndTime = visit.EndTime.ToShortTimeString()
            };

            return visitViewModel;
        }
    }
}