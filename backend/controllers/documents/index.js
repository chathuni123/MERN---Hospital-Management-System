module.exports = ( appointmentDate, appointmentTime, physician, gender, fullname, appointmentNote, _id ) => {
    console.log(appointmentDate, appointmentTime, physician, gender, fullname, appointmentNote, _id)
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 1, .15);
         font-size: 16px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica',
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         padding-bottom: 20px;
         padding-top: 20px;
         }
         .invoice-box table td {
         padding: 8px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 40px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         padding-bottom: 20px;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         padding-bottom: 20px;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         padding-bottom: 20px;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">
         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                     <tr>
                        <td class="title"><img  src="https://res.cloudinary.com/derpuzhfi/image/upload/v1631200686/test/vz6sm5h5qhiozcsimygl.jpg?fit=800%2C600&ssl=1"
                           style="width:100%; max-width:156px;"></td>
                       <td>
                          <h1>iCross Hospitals</h1>
                          <h3>No 30 Wakwella Rd, Galle 80000</h3>
                          <h3>TP: 0914 944 775</h3>
                       </td>
                       
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="information">
               <td colspan="2">
                  <table>
                     <tr>
                        <td>
                          Patient name: ${fullname}
                        </td>
                        <td>
                           Receipt ID: ${_id}
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="heading">
               <td>Physician</td>
               <td>${physician}</td>
            </tr>
            <tr class="item">
               <td>Appointment Date</td>
               <td>${appointmentDate}</td><br><br>
            </tr>
            <tr class="item">
               <td> Appointment Time</td>
               <td>${appointmentTime}</td>
            </tr>
            <tr class="item">
               <td>Gender</td>
               <td>${gender}</td>
            </tr>
            <tr class="item">
               <td>Appointment Note</td>
               <td>${appointmentNote}</td>
            </tr>
         </table>
         <br />
         <h1 class="justify-center">Thank You!</h1>
      </div>
   </body>
</html>
    `;
};