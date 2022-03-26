using Counter.BLL;
using Counter.BLL.Abastractions.IService;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Counter.IoCContainer
{
    public class IoCContainer
    {
        public static void Configure(IServiceCollection services)
        {
            services.AddTransient<ICounterService, CounterService>();
        
        }
    }
}
