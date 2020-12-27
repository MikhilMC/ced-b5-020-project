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
        uint[] vaccinationRecordIds;
        uint[] treatmentRecordIds;
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
    
    mapping ( uint => mapping ( uint => bool) ) private allSoldDogs;
    
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
    
    function getAllBreeders() public view returns (uint[] memory) {
        return breederUsers;
    }
    
    function getAllDoctors() public view returns (uint[] memory) {
        return doctorUsers;
    }
    
    function getAllDogs() public view returns (uint[] memory) {
        return dogs;
    }
    
    function getBreedersList(uint[] memory _breederIds) public view returns (breeder[] memory) {
        breeder[] memory _breeders = new breeder[](_breederIds.length);
        for(uint i = 0; i < _breederIds.length; i++) {
            _breeders[i] = breeders[_breederIds[i]];
        }
        return _breeders;
    }
    
    function getDoctorsList(uint[] memory _docIds) public view returns (doctor[] memory) {
        doctor[] memory _doctors = new doctor[](_docIds.length);
        for(uint i = 0; i < _docIds.length; i++) {
            _doctors[i] = doctors[_docIds[i]];
        }
        return _doctors;
    }
    
    function getDogsList(uint[] memory _dogIds) public view returns (dog[] memory) {
        dog[] memory _dogs = new dog[](_dogIds.length);
        for(uint i = 0; i < _dogIds.length; i++) {
            _dogs[i] = kennelClub[_dogIds[i]];
        }
        return _dogs;
    }
    
    function getVaccinesList(uint[] memory _vaccIds) public view returns (vaccine[] memory) {
        vaccine[] memory _vaccines = new vaccine[](_vaccIds.length);
        for(uint i = 0; i < _vaccIds.length; i++) {
            _vaccines[i] = vaccinationRecord[_vaccIds[i]];
        }
        return _vaccines;
    }
    
    function getTreatmentList(uint[] memory _treatIds) public view returns (treatment[] memory) {
        treatment[] memory _treatments = new treatment[](_treatIds.length);
        for(uint i = 0; i < _treatIds.length; i++) {
            _treatments[i] = treatmentRecord[_treatIds[i]];
        }
        return _treatments;
    }
    
    function isBreederPresent(uint _breederId) public view returns(bool) {
        if (breeders[_breederId].exists) {
            return true;
        } else {
            return false;
        }
    }
    
    function isDoctorPresent(uint _docId) public view returns(bool) {
        if (doctors[_docId].exists) {
            return true;
        } else {
            return false;
        }
    }
    
    function isDogPresent(uint _dogId) public view returns(bool) {
        if (kennelClub[_dogId].exists) {
            return true;
        } else {
            return false;
        }
    }
    
    function isVaccineDataPresent(uint _vaccId) public view returns(bool) {
        if (vaccinationRecord[_vaccId].exists) {
            return true;
        } else {
            return false;
        }
    }
    
    function isTreatmentDataPresent(uint _treatmentId) public view returns(bool) {
        if (treatmentRecord[_treatmentId].exists) {
            return true;
        } else {
            return false;
        }
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
    
    function getCurrentDogIds(uint _breederId) public view returns(uint[] memory) {
        require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
        uint[] memory _currentDogIds = new uint[](getTotalDogIds(_breederId).length - getSoldDogIds(_breederId).length);
        uint j = 0;
        uint[] memory _totalDogs = getTotalDogIds(_breederId);
        
        for(uint i = 0; i < _totalDogs.length; i++) {
            if (!allSoldDogs[_breederId][_totalDogs[i]]) {
                _currentDogIds[j] = _totalDogs[i];
                j++;
            }
        }
        return _currentDogIds;
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
    
    function getDoctorVaccinations(uint _docId) public view returns (uint[] memory) {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        return doctors[_docId].vaccinationRecordIds;
    }
    
    function getDoctorTreatments(uint _docId) public view returns (uint[] memory) {
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        return doctors[_docId].treatmentRecordIds;
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
        require(_fatherId == 0 || kennelClub[_fatherId].exists, 'Dog account of the father does not exists.');
        require(_motherId == 0 || kennelClub[_motherId].exists, 'Dog account of the mother does not exists.');
        require(breeders[_breederId].exists, 'Breeder/Owner account does not exists.');
        
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
        allSoldDogs[_breederId][_dogId] = false;
    }
    
    function getDogData(uint _dogId) public view returns (dog memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId];
    }
    
    function transferDogOwnership(uint _dogId, uint _currentOwnerId, uint _newOwnerId) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(breeders[_currentOwnerId].exists, 'Breeder/Owner account of current owner does not exists.');
        require(!allSoldDogs[_currentOwnerId][_dogId], 'Breeder does not have any permission to sell this dog');
        require(breeders[_newOwnerId].exists, 'Breeder/Owner account of new owner does not exists.');
        
        breeders[_currentOwnerId].soldDogIds.push(_dogId);
        breeders[_newOwnerId].dogIds.push(_dogId);
        kennelClub[_dogId].ownerIds.push(_newOwnerId);
        kennelClub[_dogId].currentOwner++;
        allSoldDogs[_currentOwnerId][_dogId] = true;
        allSoldDogs[_newOwnerId][_dogId] = false;
    }
    
    function getDogBreeder(uint _dogId) public view returns(uint) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId].breederId;
    }
    
    function getDogOwnersList(uint _dogId) public view returns (uint[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId].ownerIds;
    }
    
    function getDogCurrentOwner(uint _dogId) public view returns(uint) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId].ownerIds[kennelClub[_dogId].currentOwner];
    }
    
    function getDogVaccines(uint _dogId) public view returns(uint[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId].vaccineIds;
    }
    
    function getDogTreatments(uint _dogId) public view returns(uint[] memory) {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        
        return kennelClub[_dogId].treatmentIds;
    }
    
    
    // VACCINATION FUNCTIONS
    
    function vaccinateDog(
        uint _vaccId,
        uint _dogId,
        bytes19 _vaccDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _vaccName
    ) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        vaccinationRecord[_vaccId].dogId = _dogId;
        vaccinationRecord[_vaccId].ownerId = getDogCurrentOwner(_dogId);
        vaccinationRecord[_vaccId].vaccinatedDate = _vaccDate;
        vaccinationRecord[_vaccId].dogAgeYears = _dogAgeYears;
        vaccinationRecord[_vaccId].dogAgeMonths = _dogAgeMonths;
        vaccinationRecord[_vaccId].doctorId = _docId;
        vaccinationRecord[_vaccId].hospitalName = getCurrentWorkingHospital(_docId);
        vaccinationRecord[_vaccId].vaccineName = _vaccName;
        vaccinationRecord[_vaccId].exists = true;
        kennelClub[_dogId].vaccineIds.push(_vaccId);
        doctors[_docId].vaccinationRecordIds.push(_vaccId);
    }
    
    function getVaccineData(uint _vaccId) public view returns (vaccine memory){
        require(vaccinationRecord[_vaccId].exists, 'Vaccination record does not exists.');
        
        return vaccinationRecord[_vaccId];
    }
    
    
    // TREATMENT FUNCTIONS
    
    function treatDog(
        uint _treatmentId,
        uint _dogId,
        bytes19 _admissionDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32[] memory _symptoms,
        bytes32 _verdict,
        bytes32[] memory _medicines
    ) public {
        require(kennelClub[_dogId].exists, 'Dog account does not exists.');
        require(doctors[_docId].exists, "Doctor account does not exists.");
        
        treatmentRecord[_treatmentId].dogId = _dogId;
        treatmentRecord[_treatmentId].ownerId = getDogCurrentOwner(_dogId);
        treatmentRecord[_treatmentId].admissionDate = _admissionDate;
        treatmentRecord[_treatmentId].dogAgeYears = _dogAgeYears;
        treatmentRecord[_treatmentId].dogAgeMonths = _dogAgeMonths;
        treatmentRecord[_treatmentId].doctorId = _docId;
        treatmentRecord[_treatmentId].hospitalName = getCurrentWorkingHospital(_docId);
        treatmentRecord[_treatmentId].symptoms = _symptoms;
        treatmentRecord[_treatmentId].verdict = _verdict;
        treatmentRecord[_treatmentId].medicinesPrescribed = _medicines;
        treatmentRecord[_treatmentId].exists = true;
        kennelClub[_dogId].treatmentIds.push(_treatmentId);
        doctors[_docId].treatmentRecordIds.push(_treatmentId);
    }
    
    function getDogTreatmentData(uint _treatmentId) public view returns (treatment memory) {
        require(treatmentRecord[_treatmentId].exists, 'Treatement record does not exists.');
        
        return treatmentRecord[_treatmentId];
    }
}