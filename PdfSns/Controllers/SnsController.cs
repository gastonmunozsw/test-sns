using Microsoft.AspNetCore.Mvc;

namespace PdfSns.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SnsController : ControllerBase
    {
        private readonly ILogger<SnsController> _logger;

        public SnsController(ILogger<SnsController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post()
        {
            Console.WriteLine(Request.Form);
            return Ok();
        }
    }
}