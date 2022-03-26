import React, { useState } from 'react';
import { apiUrl } from "../config/urlConfig.json";
import axios from "axios";

const Counter = () => {

    const [counter, setCounter] = useState({ id: 0, isNumericValueAdded: false, isAlphaNumericValueAdded: false, isFloatValueAdded: false })


    const handleInputChange = (name, value) => {

        const fieldsValue = { [name]: value };
        setCounter({ ...counter, ...fieldsValue });
    }

    const handleSubmit = (e) => {
        axios.post(apiUrl + "Counter", counter).then(res => {
            console.log(res);
        })
    }

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
                         <input type="number" class="form-control" id="fileSize" placeholder="Size of the output file(kB)" />
                     </div>
                 </div>

             </div>

             <div className="row">
                 <div className="col-md-12">
                     <button type="button" class="btn btn-outline-success" style={{ width: "200px", marginRight: "5px" }} onClick={handleSubmit}>Start</button>
                     <button type="button" class="btn btn-outline-success" style={{ width: "200px", marginRight: "3px" }}>Stop</button>
                 </div>

             </div>

             <div className="row" style={{ marginTop: "45px" }}>
                 <form>
                     <div class="form-group row">
                         <label for="staticEmail" class="col-sm-2 col-form-label">Counter 1(Numeric)</label>
                         <div class="col-sm-10">
                             <input type="password" class="form-control" id="inputPassword" placeholder="Counter 1(Numeric)" />
                         </div>
                     </div>
                     <div class="form-group row">
                         <label for="inputPassword" class="col-sm-2 col-form-label">Counter 2(Alphanumeric)</label>
                         <div class="col-sm-10">
                             <input type="password" class="form-control" id="inputPassword" placeholder="Counter 2(Alphanumeric)" />
                         </div>
                     </div>
                     <div class="form-group row">
                         <label for="inputPassword" class="col-sm-2 col-form-label">Counter 3(Float)</label>
                         <div class="col-sm-10">
                             <input type="password" class="form-control" id="inputPassword" placeholder="Counter 3(Float)" />
                         </div>
                     </div>

                 </form>
                 <div className="row">
                     <button type="button" class="btn btn-outline-success">Generate Report</button>
                 </div>

             </div>

         </div>

         )
}

export default Counter;
