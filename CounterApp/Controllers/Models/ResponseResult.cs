﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CounterApp.Controllers.Models
{
    public class ResponseResult
    {
        public dynamic Result { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
    }
}
