

using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CounterApp.Controllers.Hubs
{
    public class ObjectUpdatedHub:Hub
    {
        public async Task SendMessage(string message = "abbbb")
        {
            //await Clients.Caller.ReceiveMessage(message);
        }
    }
}
