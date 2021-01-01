const DogChain = artifacts.require("DogChain");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DogChain", function () {
  
  // Condition to check whether the smart contract will deploy or not
  it("should assert true", async function () {
    await DogChain.deployed();
    return assert.isTrue(true);
  });

  // Condition to check whether the registration of a authority account will happen or not
  it("authority account register", async function() {
    const dc = await DogChain.deployed();
    let id = 1;
    let name = 'admin';
    await dc.registerAuthority(id, stringToBytes(name, 32));
    let authorityDetails = await dc.getAuthorityData(id);
    assert.equal(bytesToString(authorityDetails.authorityName), name, "authority name doesn't match.");
    assert.equal(authorityDetails.exists, true, "authority account doesn't exists.");
  });

  // Condition to check whether the registration of a breeder account will happen or not
  it("breeder account register", async function() {
    const dc = await DogChain.deployed();
    let id = 10;
    let name = 'abc';
    await dc.registerBreeder(id, stringToBytes(name, 32));
    let breederDetails = await dc.getBreederData(id);
    assert.equal(bytesToString(breederDetails.breederName), name, "breeder name doesn't match.");
    assert.equal(breederDetails.exists, true, "breeder account doesn't exists.");
  });

  // Condition to check whether the registration of another breeder account will happen or not
  it("second breeder account register", async function() {
    const dc = await DogChain.deployed();
    let id = 11;
    let name = 'abcd';
    await dc.registerBreeder(id, stringToBytes(name, 32));
    let breederDetails = await dc.getBreederData(id);
    assert.equal(bytesToString(breederDetails.breederName), name, "second breeder name doesn't match.");
    assert.equal(breederDetails.exists, true, "second breeder account doesn't exists.");
  });

  // Condition to check whether the registration of a doctor account will happen or not
  it("doctor account register", async function() {
    const dc = await DogChain.deployed();
    let id = 20;
    let name = 'abc';
    let hospital = "abcd"
    await dc.registerDoctor(id, stringToBytes(name, 32), stringToBytes(hospital, 32));
    let doctorDetails = await dc.getDoctorData(id);
    assert.equal(bytesToString(doctorDetails.doctorName), name, "doctor name doesn't match.");
    assert.equal(bytesToString(doctorDetails.hospitalNames[doctorDetails.currentHospital]), hospital, "hospital name doesn't match.");
    assert.equal(doctorDetails.exists, true, "doctor account doesn't exists.");
  });

  // Condition to check whether a doctor can change the current working hospital or not
  it("doctor changes to new hospital", async function() {
    const dc = await DogChain.deployed();
    let id = 20;
    let newHospital = "xyz"
    await dc.changeHospital(id, stringToBytes(newHospital, 32));
    let doctorDetails = await dc.getDoctorData(id);
    assert.equal(bytesToString(doctorDetails.hospitalNames[doctorDetails.currentHospital]), newHospital, "new hospital name doesn't match.");
  });

  // Condition to check whether the registration of a dog's birth will happen or not
  it("birth registration of a dog", async function() {
    const dc = await DogChain.deployed();
    let id = 100;
    let name = 'abc';
    let breed = "xyz";
    let colour = "black";
    let dogSex = 0;
    let dob = "2018-01-01";
    let fatherId = 0;
    let motherId = 0;
    let breederId = 10;
    await dc.dogBirthRegistration(
      id,
      stringToBytes(name, 32),
      stringToBytes(breed, 32),
      stringToBytes(colour, 32),
      dogSex,
      stringToBytes(dob, 19),
      fatherId,
      motherId,
      breederId
    );
    let dogDetails = await dc.getDogData(id);
    let ownerId = await dc.getDogCurrentOwner(id);
    assert.equal(bytesToString(dogDetails.dogName), name, "dog name doesn't match.");
    assert.equal(bytesToString(dogDetails.breed), breed, "dog breed doesn't match.");
    assert.equal(bytesToString(dogDetails.breed), breed, "dog breed doesn't match.");
    assert.equal(dogDetails.sex, dogSex, "dog sex doesn't match.");
    assert.equal(bytesToString(dogDetails.dateOfBirth), dob, "dog date of birth doesn't match.");
    assert.equal(dogDetails.fatherId, fatherId, "dog's father id doesn't match.");
    assert.equal(dogDetails.motherId, motherId, "dog's mother id doesn't match.");
    assert.equal(dogDetails.breederId, breederId, "dog's breeder id doesn't match.");
    assert.equal(ownerId, breederId, "dog's current owner id doesn't match.");
    assert.equal(dogDetails.exists, true, "dog birth registration doesn't exists.");
  });

  // Condition to check whether the ownership transfer of a dog will happen or not
  it("ownership transfer of a dog", async function() {
    const dc = await DogChain.deployed();
    let id = 100;
    let currentOwnerId = 10;
    let newOwnerId = 11;
    await dc.transferDogOwnership(
      id,
      currentOwnerId,
      newOwnerId
    );
    let ownerId = await dc.getDogCurrentOwner(id);
    assert.equal(ownerId, newOwnerId, "dog's ownership transfer didn't happened.");
  });

  // Condition to check whether the vaccination details of a dog can be saved or not
  it("vaccination of a dog", async function() {
    const dc = await DogChain.deployed();
    let id = 1000;
    let dogId = 100;
    let date = "2020-12-28";
    let ageYears = 2;
    let ageMonths = 5;
    let docId = 20;
    let vaccName = "rabies vaccine";
    await dc.vaccinateDog(
      id,
      dogId,
      stringToBytes(date, 19),
      ageYears,
      ageMonths,
      docId,
      stringToBytes(vaccName, 32)
    );
    let vaccinationDetails = await dc.getVaccineData(id);
    let ownerId = await dc.getDogCurrentOwner(dogId);
    let hospitalName = await dc.getCurrentWorkingHospital(docId);
    assert.equal(vaccinationDetails.dogId, dogId, "dog id doesn't match");
    assert.equal(vaccinationDetails.ownerId, ownerId, "dog owner id doesn't match");
    assert.equal(bytesToString(vaccinationDetails.vaccinatedDate), date, "vaccination date doesn't match");
    assert.equal(vaccinationDetails.dogAgeYears, ageYears, "dog age years doesn't match");
    assert.equal(vaccinationDetails.dogAgeMonths, ageMonths, "dog age months doesn't match");
    assert.equal(vaccinationDetails.doctorId, docId, "doctor id doesn't match");
    assert.equal(vaccinationDetails.hospitalName, hospitalName, "hospital name doesn't match");
    assert.equal(bytesToString(vaccinationDetails.vaccineName), vaccName, "vaccine name doesn't match");
    assert.equal(vaccinationDetails.exists, true, "vaccine data doesn't exists");
  });

  // Condition to check whether the treatment details of a dog can be saved or not
  it("treatment of a dog", async function() {
    const dc = await DogChain.deployed();
    let id = 2000;
    let dogId = 100;
    let date = "2020-12-28";
    let ageYears = 2;
    let ageMonths = 5;
    let docId = 20;
    let symptoms = ["pain in the legs", "could not walk properly"];
    let verdict = "sprain in the leg";
    let prescription = ["bandage in legs", "pain killer for dogs"];
    await dc.treatDog(
      id,
      dogId,
      stringToBytes(date, 19),
      ageYears,
      ageMonths,
      docId,
      symptoms.map(x => stringToBytes(x, 32)),
      stringToBytes(verdict, 32),
      prescription.map(x => stringToBytes(x, 32))
    );
    let treatmentDetails = await dc.getDogTreatmentData(id);
    let ownerId = await dc.getDogCurrentOwner(dogId);
    let hospitalName = await dc.getCurrentWorkingHospital(docId);
    assert.equal(treatmentDetails.dogId, dogId, "dog id doesn't match");
    assert.equal(treatmentDetails.ownerId, ownerId, "dog owner id doesn't match");
    assert.equal(bytesToString(treatmentDetails.admissionDate), date, "treatment date doesn't match");
    assert.equal(treatmentDetails.dogAgeYears, ageYears, "dog age years doesn't match");
    assert.equal(treatmentDetails.dogAgeMonths, ageMonths, "dog age months doesn't match");
    assert.equal(treatmentDetails.doctorId, docId, "doctor id doesn't match");
    assert.equal(treatmentDetails.hospitalName, hospitalName, "hospital name doesn't match");
    assert.equal(treatmentDetails.symptoms.map(x => bytesToString(x)).join(', '), symptoms.join(', '), "symptoms doesn't match");
    assert.equal(bytesToString(treatmentDetails.verdict), verdict, "verdict doesn't match");
    assert.equal(treatmentDetails.medicinesPrescribed.map(x => bytesToString(x)).join(', '), prescription.join(', '), "prescription doesn't match");
    assert.equal(treatmentDetails.exists, true, "treatment data doesn't exists");
  });

});

// Function to convert an utf8 string to it's equivalent hexadecimal form
function stringToHex(str) {
  const buf = Buffer.from(str, 'utf8');
  return buf.toString('hex');
}

// Function to convert an hexadecimal string to it's equivalent utf8 form
function hexToString(hexStr) {
  const buf = Buffer.from(hexStr, 'hex');
  return buf.toString('utf8');
}

// Function to convert an utf8 string to it's equivalent bytes data type of solidity
function stringToBytes(str, size) {
  return ('0x' + stringToHex(str)).padEnd((2*(size + 1)), 0);
}

// Function to convert an bytes data type of solidity to it's equivalent utf8 string
function bytesToString(bytesStr) {
  return hexToString(bytesStr.substring(2)).replace(/\u0000/gi, '');
}