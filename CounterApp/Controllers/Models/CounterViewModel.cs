using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CounterApp.Controllers.Models
{
    public class CounterViewModel
    {
        public int Id { get; set; }
        public bool isNumericValueAdded { get; set; }
        public bool isAlphaNumericValueAdded { get; set; }
        public bool isFloatValueAdded { get; set; }
        public int FileSize { get; set; }
    }
}
