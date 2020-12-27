var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var Web3 = require('web3');

var registerBreeder = require('./routes/registerBreeder');
var registerDoctor = require('./routes/registerDoctor');
var registerAuthority = require('./routes/registerAuthority');

var loginBreeder = require('./routes/loginBreeder');
var loginDoctor = require('./routes/loginDoctor');
var loginAuthority = require('./routes/loginAuthority');

var unapprovedBreeders = require('./routes/unapprovedBreeders');
var unapprovedDoctors = require('./routes/unapprovedDoctors');
var unapprovedDogRegistrations = require('./routes/unapprovedDogRegistrations');
var unapprovedOwnershipTransfers = require('./routes/unapprovedOwnershipTransfers');

var deleteBreeder = require('./routes/deleteBreeder');
var deleteDoctor = require('./routes/deleteDoctor');
var deleteDogRegistration = require('./routes/deleteDogRegistration');
var deleteOwnershipTransfer = require('./routes/deleteOwnershipTransfer');

var getUnapprovedBreeder = require('./routes/getUnapprovedBreeder');
var getUnapprovedDoctor = require('./routes/getUnapprovedDoctor');
var getUnapprovedDogRegistration = require('./routes/getUnapprovedDogRegistration');
var getUnapprovedOwnershipTransfer = require('./routes/getUnapprovedOwnershipTransfer');

var approveBreeder = require('./routes/approveBreeder');
var approveDoctor = require('./routes/approveDoctor');
var approveDogRegistration = require('./routes/approveDogRegistration');
var approveOwnershipTransfer = require('./routes/approveOwnershipTransfer');

var puppyRegistrationOfKnownParents = require('./routes/puppyRegistrationOfKnownParents');
var puppyRegistrationOfUnknownFather = require('./routes/puppyRegistrationOfUnknownFather');
var puppyRegistrationOfUnknownMother = require('./routes/puppyRegistrationOfUnknownMother');
var puppyRegistrationOfUnknownParents = require('./routes/puppyRegistrationOfUnknownParents');

var getTotalDogs = require('./routes/getTotalDogs');
var getSoldDogs = require('./routes/getSoldDogs');
var getCurrentDogs = require('./routes/getCurrentDogs');
var getDogDetails = require('./routes/getDogDetails');

var vaccinateDog = require('./routes/vaccinateDog');

var hasAlreadySubmittedOwnershipTransfer = require('./routes/hasAlreadySubmittedOwnershipTransfer');
var dogOwnershipTransfer = require('./routes/dogOwnershipTransfer');

var MyContractJSON = require(path.join(__dirname, "build/contracts/DogChain.json"));

web3 = new Web3("http://localhost:8545");

contractAddress = MyContractJSON.networks['5777'].address;
contractAbi = MyContractJSON.abi;

MyContract = new web3.eth.Contract(contractAbi, contractAddress);
// console.log("Connected to smart contract");
// console.log(MyContract.methods);

var app = express();

const mongoURI = "mongodb+srv://ethereumUser:eth_user@cluster0.pmzlg.mongodb.net/dogchain?retryWrites=true&w=majority"

mongoose.connect(mongoURI, 
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to dogchain database');
    }
  }
);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register-breeder', registerBreeder);
app.use('/register-doctor', registerDoctor);
app.use('/register-authority', registerAuthority);

app.use('/login-breeder', loginBreeder);
app.use('/login-doctor', loginDoctor);
app.use('/login-authority', loginAuthority);

app.use('/unapproved-breeders', unapprovedBreeders);
app.use('/unapproved-doctors', unapprovedDoctors);
app.use('/unapproved-dog-registrations', unapprovedDogRegistrations);
app.use('/unapproved-dog-ownership-transfers', unapprovedOwnershipTransfers);

app.use('/delete-breeder', deleteBreeder);
app.use('/delete-doctor', deleteDoctor);
app.use('/delete-dog-registration', deleteDogRegistration);
app.use('/delete-ownership-transfer', deleteOwnershipTransfer);

app.use('/get-unapproved-breeder', getUnapprovedBreeder);
app.use('/get-unapproved-doctor', getUnapprovedDoctor);
app.use('/get-unapproved-dog-registration', getUnapprovedDogRegistration);
app.use('/get-unapproved-dog-ownership-transfer', getUnapprovedOwnershipTransfer);

app.use('/approve-breeder', approveBreeder);
app.use('/approve-doctor', approveDoctor);
app.use('/approve-dog-registration', approveDogRegistration);
app.use('/approve-ownership-transfer', approveOwnershipTransfer);

app.use('/puppy-registration-of-known-parents', puppyRegistrationOfKnownParents);
app.use('/puppy-registration-of-unknown-father', puppyRegistrationOfUnknownFather);
app.use('/puppy-registration-of-unknown-mother', puppyRegistrationOfUnknownMother);
app.use('/puppy-registration-of-unknown-parents', puppyRegistrationOfUnknownParents);

app.use('/get-total-dogs', getTotalDogs);
app.use('/get-sold-dogs', getSoldDogs);
app.use('/get-current-dogs', getCurrentDogs);
app.use('/get-dog-details', getDogDetails);

app.use('/has-already-submitted-ownership-transfer', hasAlreadySubmittedOwnershipTransfer);
app.use('/dog-ownership-transfer', dogOwnershipTransfer);

app.use('/vaccinate-dog', vaccinateDog);

module.exports = app;
