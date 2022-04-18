using AspNetCore.Reporting;
using CounterApp.Controllers.Hubs;
using CounterApp.Controllers.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Threading.Tasks;


namespace CounterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CounterController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        readonly IDisposable _disposable;
        private readonly IHubContext<ObjectUpdatedHub> _messageHub;

       public CounterController([NotNull] IHubContext<ObjectUpdatedHub> messageHub,IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _messageHub = messageHub;
        }



       
        
        [HttpPost]
        [Route("addRandomValue")]
        public async Task<IActionResult> AddRandomValue(CounterViewModel model,CancellationToken cts)
        {
           
            int sizeInByte = 0;
            using StreamWriter file = new StreamWriter("file.txt");
            try
            {
               
                while (sizeInByte <= model.FileSize)
                {
                    

                    if (model.isNumericValueAdded)
                    {
                        Random rndNumeric = new Random();
                        int integerData = rndNumeric.Next(100, 10000);
                        int sizeOfInt = sizeof(int);
                        file.Write(integerData);
                       
                        sizeInByte += sizeOfInt;

                        file.Write(",");
                        int sizeOfChar = sizeof(char);
                        sizeInByte += sizeOfChar;


                    }
                    if (model.isAlphaNumericValueAdded)
                    {
                        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        var Charsarr = new char[8];
                        Random rndAlphaNumeric = new Random();
                        for (int i = 0; i < Charsarr.Length; i++)
                        {
                            Charsarr[i] = characters[rndAlphaNumeric.Next(characters.Length)];
                        }
                        var resultString = new String(Charsarr);
                        file.Write(resultString);

                        int sizeOfString = resultString.Length * sizeof(char);
                        sizeInByte += sizeOfString;
                        file.Write(",");
                        int sizeOfChar = sizeof(char);
                        sizeInByte += sizeOfChar;

                    }
                    if (model.isFloatValueAdded)
                    {
                        Random rndFloat = new Random();
                        var floatRandomValue = rndFloat.NextDouble();
                        file.Write(floatRandomValue);
                        int sizeOfDouble = sizeof(double);
                        sizeInByte += sizeOfDouble;
                        file.Write(",");
                        int sizeOfChar = sizeof(char);
                        sizeInByte += sizeOfChar;

                    }

                   
                }



                Thread.Sleep(6000);
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }

            catch(Exception ex)
            {
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }
       
        
        }

        [HttpPost]
        [Route("cancelRequest")]

        public async Task<IActionResult> CancelRequest()
        {
            try
            {

               
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }
            catch(Exception ex)
            {
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }
           
        }

        [HttpGet]
        [Route("print")]
        public async Task<IActionResult> Print()
        {
            try
            {
                var dt = new DataTable();
                dt = GetCounterList();
                string mimeType = "";
                int extension = 1;
                var path = Path.Combine(_webHostEnvironment.ContentRootPath, "NewReport", "Counter.rdlc");
                Dictionary<string, string> parameters = new Dictionary<string, string>();
               
                LocalReport localReport = new LocalReport(path);
                localReport.AddDataSource("Counter", dt);
                var result = localReport.Execute(RenderType.Pdf, extension, null, mimeType);
                return File(result.MainStream, "application/pdf");
                //return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }
            catch (Exception ex)
            {
                return Ok(new ResponseResult { Result = null, IsSuccess = true, Message = "" });
            }

        }

        private DataTable GetCounterList()
        {
            var dt = new DataTable();
            dt.Columns.Add("NumericData");
            dt.Columns.Add("AlphaNumericData");
            dt.Columns.Add("DecimalData");
          
            DataRow row;

            for (int i = 101; i < 120; i++)
            {
                row = dt.NewRow();
                row["NumericData"] = i;
                row["AlphaNumericData"] = "abc";
                row["DecimalData"] = "XXYY";
               
                dt.Rows.Add(row);
            }
            return dt;
        }

        [HttpPost]
        [Route("sendMessage")]
        public async Task<IActionResult> Create(MessagePost message)
        {
            await _messageHub.Clients.All.SendAsync("sendToReact", "The message " + message.Message + " Has been received ");
            return Ok();
        }


    }


    public class MessagePost
    {
        public virtual string Message { get; set; }
    }

}
