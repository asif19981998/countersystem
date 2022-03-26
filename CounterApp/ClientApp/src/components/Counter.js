import React, { useState,useEffect } from 'react';
import { apiUrl } from "../config/urlConfig.json";
import axios from "axios";
import { HubConnectionBuilder } from '@microsoft/signalr';
const Counter = () => {
    const [connection, setConnection] = useState(null);
    const [counter, setCounter] = useState({ id: 0, isNumericValueAdded: false, isAlphaNumericValueAdded: false, isFloatValueAdded: false, fileSize:0 })
    const [name, setName] = useState({});
    var temp = [];

    const handleInputChange = (name, value) => {

        const fieldsValue = { [name]: value };
        setCounter({ ...counter, ...fieldsValue });
    }

    const handleStop = async ()  => {
        try {
            await axios.post(apiUrl + "Counter/cancelRequest", counter).then(res => {
                console.log(res);
            })
        }

        catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async () => {
        
        try {
            await axios.post(apiUrl + "Counter/addRandomValue", counter).then(res => {
                console.log(res);
            })


            if (connection) {
                console.log("abc");
                connection.on('ReceiveMessage',function(message) {
                        console.log("fdfd")
                        console.log(message)
                    })
               
            }
        }

        catch (err) {
            console.error(err);
        }
        
    }
    const handleReportPrint = () => {
        axios.get(apiUrl + "Counter/print").then(res => {
            console.log(res);
        })
    }
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:44338/" + "objectUpdatedHub")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
       
    }, [])

    useEffect(() => {

        if (connection) {
            connection.start().then(result => {
                console.log("isconnected");
                connection.on('ReceiveMessage', function (message) {
                    temp.push(message);
                    console.log("fdfdf");
                })
            })
              
           
        }
    }, [connection])

     return (
        

         <div>
             <div className="row">
                 <div className="col-md-6">
                     <div class="form-check">
                         <input
                             class="form-check-input"
                             type="checkbox"
                             name="isNumericValueAdded"
                             value={counter.isNumericValueAdded}
                             id="numericData"
                             onChange={(e) => handleInputChange(e.target.name, e.target.value == "false")} />
                         <label class="form-check-label" for="numericData">
                             Numeric
                         </label>
                     </div>
                     <div class="form-check">
                         <input class="form-check-input"
                             type="checkbox"
                             name="isAlphaNumericValueAdded"
                             value={counter.isAlphaNumericValueAdded}
                             id="alphaNumericData"
                             onChange={(e) => handleInputChange(e.target.name, e.target.value == "false")} />
                         <label class="form-check-label" for="alphaNumericData">
                             Alphanumeric
                         </label>
                     </div>
                     <div class="form-check">
                         <input
                             class="form-check-input"
                             type="checkbox"
                             name="isFloatValueAdded"
                             value={counter.isFloatValueAdded}
                             id="floatValueData"
                             onChange={(e) => handleInputChange(e.target.name, e.target.value == "false")}/>
                         <label class="form-check-label" for="floatValueData">
                             Float
                         </label>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div class="form-group">
                         <label for="fileSize">Size of the output file(kB)</label>
                         <input
                             type="number"
                             class="form-control"
                             name="fileSize"
                             value={counter.fileSize}
                             placeholder="Size of the output file(kB)"
                             onChange={(e) => handleInputChange(e.target.name, e.target.value)} />
                     </div>
                 </div>

             </div>

             <div className="row">
                 <div className="col-md-12">
                     <button type="button" class="btn btn-outline-success" style={{ width: "200px", marginRight: "5px" }} onClick={handleSubmit}>Start</button>
                     <button type="button" class="btn btn-outline-success" style={{ width: "200px", marginRight: "3px" }} onClick={handleStop}>Stop</button>
                 </div>

             </div>

             <div className="row" style={{ marginTop: "45px" }}>
                 <form>
                     <div class="form-group row">
                         <label for="staticEmail" class="col-sm-2 col-form-label">Counter 1(Numeric)</label>
                         <div class="col-sm-10">
                             <input type="text" class="form-control" id="numericValue" placeholder="Counter 1(Numeric)" />
                         </div>
                     </div>
                     <div class="form-group row">
                         <label for="inputPassword" class="col-sm-2 col-form-label">Counter 2(Alphanumeric)</label>
                         <div class="col-sm-10">
                             <input type="text" class="form-control" id="AlphaNumericValue" placeholder="Counter 2(Alphanumeric)" />
                         </div>
                     </div>
                     <div class="form-group row">
                         <label for="inputPassword" class="col-sm-2 col-form-label">Counter 3(Float)</label>
                         <div class="col-sm-10">
                             <input type="text" class="form-control" id="CounterValue" placeholder="Counter 3(Float)" />
                         </div>
                     </div>

                 </form>
                 <div className="row">
                     <button type="button" class="btn btn-outline-success" onClick={handleReportPrint}>Generate Report</button>
                 </div>

             </div>

         </div>

         )
}

export default Counter;
