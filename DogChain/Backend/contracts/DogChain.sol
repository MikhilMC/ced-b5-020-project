// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract DogChain{
    enum dogSex{ dog, bitch }
    
    struct dog{
        bytes32 dogName;
        bytes32 breed;
        bytes32 colour;
        dogSex sex;
        bytes19 dateOfBirth;
        uint fatherId;
        bytes32 fatherName;
        uint motherId;
        bytes32 motherName;
        uint breederId;
        uint[] ownerIds;
        uint currentOwner;
        uint[] vaccineIds;
        uint[] treatmentIds;
        bool exists;
    }
    
    struct breeder{
        bytes32 breederName;
        uint[] dogIds;
        uint[] soldDogIds;
        bool exists;
    }
    
    struct doctor{
        bytes32 doctorName;
        bytes32[] hospitalNames;
        uint currentHospital;
        bool exists;
        uint[] vaccinatedDogs;
        uint[] treatedDogs;
    }
    
    struct authority{
        bytes32 authorityName;
        bool exists;
    }
    
    struct vaccine{
        uint dogId;
        uint ownerId;
        bytes19 vaccinatedDate;
        uint dogAgeYears;
        uint dogAgeMonths;
        uint doctorId;
        bytes32 hospitalName;
        bytes32 vaccineName;
        bool exists;
    }
    
    struct treatment{
        uint dogId;
        uint ownerId;
        bytes19 admissionDate;
        uint dogAgeYears;
        uint dogAgeMonths;
        uint doctorId;
        bytes32 hospitalName;
        bytes32[] symptoms;
        bytes32 verdict;
        bytes32[] medicinesPrescribed;
        bool exists;
    }
    
    mapping ( uint => dog ) private kennelClub;
    mapping ( uint => breeder ) private breeders;
    mapping ( uint => doctor ) private doctors;
    mapping ( uint => authority ) private kennelClubAuthority;
    mapping ( uint => vaccine ) private vaccinationRecord;
    mapping ( uint => treatment ) private treatmentRecord;
    
    uint[] private breederUsers;
    uint[] private doctorUsers;
    uint[] private dogs;
    
    
    // AUTHORITY FUNCTIONS
    
    function registerAuthority(
        uint _authId,
        bytes32 _authName
    ) public {
        kennelClubAuthority[_authId].authorityName = _authName;
        kennelClubAuthority[_authId].exists = true;
    }
    
    function getAuthorityData(uint _authId) public view returns (authority memory) {
        require(kennelClubAuthority[_authId].exists, 'Authority account does not exists');
        
        return kennelClubAuthority[_authId];
    }
    
    function getAllBreeders() public view returns (breeder[] memory) {
        breeder[] memory breedersList;
        for(uint i = 0; i < breederUsers.length; i++) {
            breedersList[i] = breeders[breederUsers[i]];
        }
        return breedersList;
    }
    
    function getAllDoctors() public view returns (doctor[] memory) {
        doctor[] memory doctorsList;
        for(uint i = 0; i < doctorUsers.length; i++) {
            doctorsList[i] = doctors[doctorUsers[i]];
        }
        return doctorsList;
    }
    
    function getAllDogs() public view returns (dog[] memory) {
        dog[] memory dogsList;
        for(uint i = 0; i < dogs.length; i++) {
            dogsList[i] = kennelClub[dogs[i]];
        }
        return dogsList;
    }
    
    
    // BREEDER/OWNER FUNCTIONS
    
    function registerBreeder(
        uint _breederId,
        bytes32 _breederName
    ) public {
        breeders[_breederId].breederName = _breederName;
        breeders[_breederId].exists = true;
        breederUsers.push(_breederId);
    }
    
    function getBreederData(uint _breederId) public view returns (breeder memory) {
        require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
        return breeders[_breederId];
    }
    
    function getTotalDogIds(uint _breederId) public view returns(uint[] memory) {
        require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
        return breeders[_breederId].dogIds;
    }
    
    function getSoldDogIds(uint _breederId) public view returns(uint[] memory) {
        require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
        return breeders[_breederId].soldDogIds;
    }
    
    function getDogGroupDetails(uint[] memory _dogIds) public view returns(dog[] memory) {
        //require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
        dog[] memory _dogs;
        for(uint i = 0; i < _dogIds.length; i++) {
            _dogs[i] = kennelClub[_dogIds[i]];
        }
        return _dogs;
    }
    
    
    // DOCTOR FUNCTIONS
    
    function registerDoctor(
        uint _docId, 
        bytes32 _docName,
        bytes32 _hospitalName
    ) public{
        doctors[_docId].doctorName = _docName;
        doctors[_docId].hospitalNames.push(_hospitalName);
        doctors[_docId].currentHospital = 0;
        doctors[_docId].exists = true;
        doctorUsers.push(_docId);
    }
    
    function getDoctorData(uint _docId) public view returns (doctor memory) {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        return doctors[_docId];
    }
    
    function changeHospital(uint _docId, bytes32 _newHospitalName) public {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        doctors[_docId].hospitalNames.push(_newHospitalName);
        doctors[_docId].currentHospital++;
    }
    
    function getWorkedHospitals(uint _docId) public view returns(bytes32[] memory) {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        return doctors[_docId].hospitalNames;
    }
    
    function getCurrentWorkingHospital(uint _docId) public view returns (bytes32) {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        return doctors[_docId].hospitalNames[doctors[_docId].currentHospital];
    }
    
    
    // DOG FUNCTIONS
    
    function dogBirthRegistration(
        uint _dogId,
        bytes32 _dogName,
        bytes32 _breed,
        bytes32 _colour,
        dogSex _sex,
        bytes19 _dob,
        uint _fatherId,
        uint _motherId,
        uint _breederId
    ) public {
        kennelClub[_dogId].dogName = _dogName;
        kennelClub[_dogId].breed = _breed;
        kennelClub[_dogId].colour = _colour;
        kennelClub[_dogId].sex = _sex;
        kennelClub[_dogId].dateOfBirth = _dob;
        if (_fatherId == 0) {
            kennelClub[_dogId].fatherId = 0;
            kennelClub[_dogId].fatherName = "Parent with unknown pedigree";
        } else {
            kennelClub[_dogId].fatherId = _fatherId;
            kennelClub[_dogId].fatherName = kennelClub[_fatherId].dogName;
        }
        if (_motherId == 0) {
            kennelClub[_dogId].motherId = 0;
            kennelClub[_dogId].motherName = "Parent with unknown pedigree";
        } else {
            kennelClub[_dogId].motherId = _motherId;
            kennelClub[_dogId].motherName = kennelClub[_motherId].dogName;
        }
        kennelClub[_dogId].breederId = _breederId;
        kennelClub[_dogId].ownerIds.push(_breederId);
        breeders[_breederId].dogIds.push(_dogId);
        kennelClub[_dogId].currentOwner = 0;
        kennelClub[_dogId].exists = true;
        dogs.push(_dogId);
    }
    
    function getDogData(uint _dogId) public view returns (dog memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId];
    }
    
    function sellDog(uint _dogId, uint _oldOwnerId, uint _newOwnerId) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(breeders[_oldOwnerId].exists, 'Breeder/Owner account of current owner does not exists.');
        require(breeders[_newOwnerId].exists, 'Breeder/Owner account of new owner does not exists.');
        
        breeders[_oldOwnerId].soldDogIds.push(_dogId);
        kennelClub[_dogId].ownerIds.push(_newOwnerId);
        kennelClub[_dogId].currentOwner++;
    }
    
    function getDogBreeder(uint _dogId) public view returns(breeder memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return breeders[kennelClub[_dogId].breederId];
    }
    
    function getDogOwnersList(uint _dogId) public view returns (breeder[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        breeder[] memory dogOwners;
        for(uint i = 0; i < kennelClub[_dogId].ownerIds.length; i++) {
            dogOwners[i] = breeders[kennelClub[_dogId].ownerIds[i]];
        }
        
        return dogOwners;
    }
    
    function getDogCurrentOwner(uint _dogId) public view returns(breeder memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return breeders[kennelClub[_dogId].ownerIds[kennelClub[_dogId].currentOwner]];
    }
    
    function getDogVaccines(uint _dogId) public view returns(vaccine[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        vaccine[] memory _dogVaccine;
        
        for(uint i = 0; i < kennelClub[_dogId].vaccineIds.length; i++) {
            _dogVaccine[i] = vaccinationRecord[kennelClub[_dogId].vaccineIds[i]];
        }
        
        return _dogVaccine;
    }
    
    function getDogTreatments(uint _dogId) public view returns(treatment[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        treatment[] memory _dogTreatment;
        
        for(uint i = 0; i < kennelClub[_dogId].treatmentIds.length; i++) {
            _dogTreatment[i] = treatmentRecord[kennelClub[_dogId].treatmentIds[i]];
        }
        
        return _dogTreatment;
    }
    
    
    // VACCINATION FUNCTIONS
    
    function vaccinateDog(
        uint _vaccId,
        uint _dogId,
        uint _ownerId,
        bytes19 _vaccDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _hospitalName,
        bytes32 _vaccName
    ) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(breeders[_ownerId].exists, 'Breeder/Owner account does not exists.');
        require(doctors[_docId].exists, "Doctor account does not exists.");
        require(getCurrentWorkingHospital(_docId) == _hospitalName, 'Invalid hospital name.');
        
        vaccinationRecord[_vaccId].dogId = _dogId;
        vaccinationRecord[_vaccId].ownerId = _ownerId;
        vaccinationRecord[_vaccId].vaccinatedDate = _vaccDate;
        vaccinationRecord[_vaccId].dogAgeYears = _dogAgeYears;
        vaccinationRecord[_vaccId].dogAgeMonths = _dogAgeMonths;
        vaccinationRecord[_vaccId].doctorId = _docId;
        vaccinationRecord[_vaccId].hospitalName = _hospitalName;
        vaccinationRecord[_vaccId].vaccineName = _vaccName;
        vaccinationRecord[_vaccId].exists = true;
        kennelClub[_dogId].vaccineIds.push(_vaccId);
        doctors[_docId].vaccinatedDogs.push(_dogId);
    }
    
    function getVaccineData(uint _vaccId) public view returns (vaccine memory){
        require(vaccinationRecord[_vaccId].exists, 'Vaccination record does not exists.');
        
        return vaccinationRecord[_vaccId];
    }
    
    
    // TREATMENT FUNCTIONS
    
    function treatDog(
        uint _treatmentId,
        uint _dogId,
        uint _ownerId,
        bytes19 _admissionDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _hospitalName,
        bytes32[] memory _symptoms,
        bytes32 _verdict,
        bytes32[] memory _medicines
    ) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(breeders[_ownerId].exists, 'Breeder/Owner account does not exists.');
        require(doctors[_docId].exists, "Doctor account does not exists.");
        require(getCurrentWorkingHospital(_docId) == _hospitalName, 'Invalid hospital name.');
        
        treatmentRecord[_treatmentId].dogId = _dogId;
        treatmentRecord[_treatmentId].ownerId = _ownerId;
        treatmentRecord[_treatmentId].admissionDate = _admissionDate;
        treatmentRecord[_treatmentId].dogAgeYears = _dogAgeYears;
        treatmentRecord[_treatmentId].dogAgeMonths = _dogAgeMonths;
        treatmentRecord[_treatmentId].doctorId = _docId;
        treatmentRecord[_treatmentId].hospitalName = _hospitalName;
        treatmentRecord[_treatmentId].symptoms = _symptoms;
        treatmentRecord[_treatmentId].verdict = _verdict;
        treatmentRecord[_treatmentId].medicinesPrescribed = _medicines;
        kennelClub[_dogId].treatmentIds.push(_treatmentId);
        doctors[_docId].treatedDogs.push(_dogId);
    }
    
    function getDogTreatmentData(uint _treatmentId) public view returns (treatment memory) {
        require(treatmentRecord[_treatmentId].exists, 'Treatement record does not exists.');
        
        return treatmentRecord[_treatmentId];
    }
}