# Shortlinks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 
<!-- Bootstrap 4 CDN -->
  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    crossorigin="anonymous">  -->

    <!-- Bootstrap CDNS -->
  <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script> -->

  / userApp.get('/getUrls',(req,res)=>{
//     dbo.collection('urlcollection').find().toArray((err,objjj)=>{
//         if(!err){
//             res.send({message:objjj})
//         }
//     })
// })

// else if (signedToken) {

//     //step-1
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_ACC,
//             pass: process.env.EMAIL_PASS
//         }
//     });
//     // Step 2
//     let mailOptions = {
//         from: 'doNotreply',
//         to: `${req.body.userEmail}`,
//         subject: 'Account Activation Request',
//         html: `<h2>Hi ${req.body.userName},Welcome</h2> <br> 
//                 <p>Your account in <h1>shortlinks</h2> is few steps away from being creation just </p>
//                 <p>Click on the Activation link to acivate your account</p>
//                 <a href="http://localhost:11111/acivation/${signedToken}">http://localhost:11111/acivation/${signedToken}</a>
//             `
//     };
//     // Step 3
//     transporter.sendMail(mailOptions, (err, data) => {
//         if (err) {
//             return console.log('Error occurs', err);
//         }
//         else {
//             return console.log('Email sent!!!');
//         }
//     });
// }

// const data = {
//     from: 'donotreply@sample.com',
//     to: req.body.userEmail,
//     subject: 'Account Activation Request',
//     html: `<h2>Hi ${req.body.userName},</h2> <br> 
// <p>Click on the Activation link to acivate your account</p> <br>
// <a href="http://localhost:1001/#/authenticate/${signedToken}">http://localhost:1001/#/authenticate/${signedToken}</a> `
// };
// mg.messages().send(data, function (error, body) {
//     // console.log(body);
//     if (!err) {
//         return res.status(200).json({ message: body })
//     }
//     else {
//         console.log("err in send", error);
//     }
// });