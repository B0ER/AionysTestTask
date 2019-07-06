using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestAionys.Application.Interfaces;
using TestAionys.Models.Database;

namespace TestForAionys.Controllers
{
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private IUnitOfWork _db;

        public ClientsController(IUnitOfWork db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<Client>> GetAllClients()
        {
            IEnumerable<Client> clients = await _db.Clients.GetAll();
            return clients;
        }
    }
}