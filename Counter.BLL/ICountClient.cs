using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Counter.BLL
{
    public interface ICountClient
    {
        Task ReceiveMessage(string message);
    }
}
