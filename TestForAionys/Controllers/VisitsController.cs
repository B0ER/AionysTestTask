using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAionys.Application.Data_Transfer_Objects;
using TestAionys.Application.Interfaces;
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
    }
}