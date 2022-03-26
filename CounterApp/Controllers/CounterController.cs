using CounterApp.Controllers.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CounterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounterController : ControllerBase
    {
        [HttpPost]
        public IActionResult AddRandomValue(CounterViewModel model)
        {
            try
            {
                var result = model;
                return Ok(new ResponseResult { Result = result, IsSuccess = true, Message = "" });
            }

            catch(Exception ex)
            {
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }
        }
    }
}
