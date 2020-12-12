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
        bytes32 breederName;
        uint[] ownerIds;
        bytes32[] ownerNames;
        uint currentOwner;
        uint[] vaccineIds;
        uint[] treatmentIds;
        string databaseId;
    }
    
    struct breeder{
        bytes32 breederName;
        uint[] dogIds;
        bytes32 [] dogNames;
        uint[] soldDogIds;
        bytes32 [] soldDogs;
        string databaseId;
    }
    
    struct doctor{
        bytes32 doctorName;
        bytes32[] hospitalName;
        uint currentHospital;
        string databaseId;
    }
    
    struct authority{
        bytes32 authorityName;
        string databaseId;
    }
    
    struct vaccine{
        uint dogId;
        bytes32 dogName;
        bytes19 vaccinatedDate;
        uint dogAgeYears;
        uint dogAgeMonths;
        uint doctorId;
        bytes32 doctorName;
        bytes32 vaccineName;
        string databaseId;
    }
    
    struct treatment{
        uint dogId;
        bytes32 dogName;
        bytes19 admissionDate;
        uint dogAgeYears;
        uint dogAgeMonths;
        uint doctorId;
        bytes32 doctorName;
        string symptoms;
        string verdict;
        string medicinesPrescribed;
        string databaseId;
    }
    
    mapping ( uint => dog ) private kennelClub;
    mapping ( uint => breeder ) private breeders;
    mapping ( uint => doctor ) private doctors;
    mapping ( uint => authority ) private kennelClubAuthority;
    mapping ( uint => vaccine ) private vaccinationRecord;
    mapping ( uint => treatment ) private treatmentRecord;
    
    
    // AUTHORITY FUNCTIONS
    
    function registerAuthority(
        uint _authId,
        bytes32 _authName,
        string memory _dbId
    ) public {
        kennelClubAuthority[_authId].authorityName = _authName;
        kennelClubAuthority[_authId].databaseId = _dbId;
    }
    
    function getAuthorityData(uint _authId) public view returns (
        bytes32 _authName,
        string memory _dbId
    ) {
        _authName = kennelClubAuthority[_authId].authorityName;
        _dbId = kennelClubAuthority[_authId].databaseId;
    }
    
    
    // BREEDER/OWNER FUNCTIONS
    
    function registerBreeder(
        uint _breederId,
        bytes32 _breederName,
        string memory _dbId
    ) public {
        breeders[_breederId].breederName = _breederName;
        breeders[_breederId].databaseId = _dbId;
    }
    
    function getBreederData(uint _breederId) public view returns (
        bytes32 _breederName,
        bytes32[] memory _dogNames,
        bytes32[] memory _soldDogs,
        string memory _dbId
    ) {
        _breederName = breeders[_breederId].breederName;
        _dogNames = breeders[_breederId].dogNames;
        _soldDogs = breeders[_breederId].soldDogs;
        _dbId = breeders[_breederId].databaseId;
    }
    
    
    // DOCTOR FUNCTIONS
    
    function registerDoctor(
        uint _docId, 
        bytes32 _docName,
        bytes32 _hospitalName,
        string memory _dbId
    ) public{
        doctors[_docId].doctorName = _docName;
        doctors[_docId].hospitalName.push(_hospitalName);
        doctors[_docId].currentHospital = 0;
        doctors[_docId].databaseId = _dbId;
    }
    
    function getDoctorData(uint _doctorId) public view returns (
        bytes32 _doctorName,
        bytes32[] memory _hospitals,
        bytes32 _currentHospital,
        string memory _dbId
    ) {
        _doctorName = doctors[_doctorId].doctorName;
        _hospitals = doctors[_doctorId].hospitalName;
        _currentHospital = doctors[_doctorId].hospitalName[doctors[_doctorId].currentHospital];
        _dbId = doctors[_doctorId].databaseId;
    }
    
    function changeHospital(uint _doctorId, bytes32 _newHospitalName) public {
        doctors[_doctorId].hospitalName.push(_newHospitalName);
        doctors[_doctorId].currentHospital++;
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
        uint _breederId,
        string memory _dbId
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
        kennelClub[_dogId].breederName = breeders[_breederId].breederName;
        kennelClub[_dogId].ownerIds.push(_breederId);
        kennelClub[_dogId].ownerNames.push(breeders[_breederId].breederName);
        breeders[_breederId].dogIds.push(_dogId);
        breeders[_breederId].dogNames.push(kennelClub[_dogId].dogName);
        kennelClub[_dogId].currentOwner = 0;
        kennelClub[_dogId].databaseId = _dbId;
    }
    
    function getDogData(uint _dogId) public view returns (dog memory) {
        dog memory dogData = dog(
            kennelClub[_dogId].dogName,
            kennelClub[_dogId].breed,
            kennelClub[_dogId].colour,
            kennelClub[_dogId].sex,
            kennelClub[_dogId].dateOfBirth,
            kennelClub[_dogId].fatherId,
            kennelClub[_dogId].fatherName,
            kennelClub[_dogId].motherId,
            kennelClub[_dogId].motherName,
            kennelClub[_dogId].breederId,
            kennelClub[_dogId].breederName,
            kennelClub[_dogId].ownerIds,
            kennelClub[_dogId].ownerNames,
            kennelClub[_dogId].currentOwner,
            kennelClub[_dogId].vaccineIds,
            kennelClub[_dogId].treatmentIds,
            kennelClub[_dogId].databaseId
        );
        return dogData;
    }
    
    function sellDog(uint _dogId, uint oldOwnerId, uint _newOwnerId) public {
        breeders[oldOwnerId].soldDogIds.push(_dogId);
        breeders[oldOwnerId].soldDogs.push(kennelClub[_dogId].dogName);
        kennelClub[_dogId].ownerIds.push(_newOwnerId);
        kennelClub[_dogId].ownerNames.push(breeders[_newOwnerId].breederName);
        kennelClub[_dogId].currentOwner++;
        breeders[_newOwnerId].dogNames.push(kennelClub[_dogId].dogName);
    }
    
    
    // VACCINATION FUNCTIONS
    
    function vaccinateDog(
        uint _vaccId,
        uint _dogId,
        bytes32 _dogName,
        bytes19 _vaccDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _docName,
        bytes32 _vaccName
    ) public {
        vaccinationRecord[_vaccId].dogId = _dogId;
        vaccinationRecord[_vaccId].dogName = _dogName;
        vaccinationRecord[_vaccId].vaccinatedDate = _vaccDate;
        vaccinationRecord[_vaccId].dogAgeYears = _dogAgeYears;
        vaccinationRecord[_vaccId].dogAgeMonths = _dogAgeMonths;
        vaccinationRecord[_vaccId].doctorId = _docId;
        vaccinationRecord[_vaccId].doctorName = _docName;
        vaccinationRecord[_vaccId].vaccineName = _vaccName;
        kennelClub[_dogId].vaccineIds.push(_vaccId);
    }
    
    function getDogsVaccineData(uint _vaccId) public view returns (
        bytes32 _dogName,
        bytes19 _vaccDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _docName,
        bytes32 _vaccName
    ){
        _dogName = vaccinationRecord[_vaccId].dogName;
        _vaccDate = vaccinationRecord[_vaccId].vaccinatedDate;
        _dogAgeYears = vaccinationRecord[_vaccId].dogAgeYears;
        _dogAgeMonths = vaccinationRecord[_vaccId].dogAgeMonths;
        _docId = vaccinationRecord[_vaccId].doctorId;
        _docName = vaccinationRecord[_vaccId].doctorName;
        _vaccName = vaccinationRecord[_vaccId].vaccineName;
    }
    
    
    // TREATMENT FUNCTIONS
    
    function treatDog(
        uint _treatmentId,
        bytes32 _dogName,
        bytes19 _admissionDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _docName,
        string memory _symptoms,
        string memory _verdict,
        string memory _medicines
    ) public {
        treatmentRecord[_treatmentId].dogName = _dogName;
        treatmentRecord[_treatmentId].admissionDate = _admissionDate;
        treatmentRecord[_treatmentId].dogAgeYears = _dogAgeYears;
        treatmentRecord[_treatmentId].dogAgeMonths = _dogAgeMonths;
        treatmentRecord[_treatmentId].doctorId = _docId;
        treatmentRecord[_treatmentId].doctorName = _docName;
        treatmentRecord[_treatmentId].symptoms = _symptoms;
        treatmentRecord[_treatmentId].verdict = _verdict;
        treatmentRecord[_treatmentId].medicinesPrescribed = _medicines;
    }
    
    function getDogTreatmentData(uint _treatmentId) public view returns (
        bytes32 _dogName,
        bytes19 _admissionDate,
        uint _dogAgeYears,
        uint _dogAgeMonths,
        uint _docId,
        bytes32 _docName,
        string memory _symptoms,
        string memory _verdict,
        string memory _medicines
    ) {
        _dogName = treatmentRecord[_treatmentId].dogName;
        _admissionDate = treatmentRecord[_treatmentId].admissionDate;
        _dogAgeYears = treatmentRecord[_treatmentId].dogAgeYears;
        _dogAgeMonths = treatmentRecord[_treatmentId].dogAgeMonths;
        _docId = treatmentRecord[_treatmentId].doctorId;
        _docName = treatmentRecord[_treatmentId].doctorName;
        _symptoms = treatmentRecord[_treatmentId].symptoms;
        _verdict = treatmentRecord[_treatmentId].verdict;
        _medicines = treatmentRecord[_treatmentId].medicinesPrescribed;
    }
}