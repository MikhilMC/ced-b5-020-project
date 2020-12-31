# ced-b5-020-project

# Dog Chain Project

## Setting Up:

**Step 1:** Download the repostory using the command:
```
 git clone "https://gitlab.com/MikhilMC/ced-b5-020-project.git"
 ```
**Step 2:** Go to the directory DogChain/Backend and install dependancies 
```
 cd DogChain/Backend
 npm Install
 ```
 **Step 3:** Go to the directory DogChain/Frontend and install dependancies and build the Angular project.
```
 cd DogChain/Frontend
 npm install
 ng build
```
**Step 4:** Use the following command to compile smart contract:
```
 truffle compile
 ```
**Step 5:** Use one of the following commands to connect to the private or public chain:

**Private chain:** 
```
geth --identity "DogChain" --networkid "5777" --datadir "data" --http --http.port "8545" --unlock "0x15e98155e92Be1B21Eb1cD2eFf66BfBa4595cb67" --http.corsdomain "*" --http.api "miner,eth,net,web3,personal" --allow-insecure-unlock --nodiscover
```

start mining using the following command, before doing any transaction:
```
  miner.start()
```
*Password: Enter Key*

The data folder is in the project root

<!-- **Ropsten:**  
```
geth --testnet --syncmode 'light' --datadir 'ropsten' --unlock '0x15e98155e92Be1B21Eb1cD2eFf66BfBa4595cb67' --rpc --rpcapi 'db,eth,net,web3,personal' --cache=1024 --rpcport '8545' --rpcaddr '127.0.0.1' --rpccorsdomain '*' --allow-insecure-unlock console
```
*Password: sms*  

UTC file is availabel inside ropsten folder in the project root  

use eth.syncing to know the status of synching after it shows false, then you can begin useing the network.   -->
 
**Step 6:** Use the following command to deploy the smart contract to the connected chain: 
```
 truffle migrate
 ```
**Step 7:** Run the dapp backend server using the command
```
 cd Backend
 npm start
```
**Step 8:** Run the dapp frontend server using the command
```
 cd Frontend
 ng serve 
```

## Execution Flow:

**Step 9:** Go http://localhost:4200/, comes the login menu

**Step 10:** Go http://localhost:4200/register-menu, comes the register menu. Click breeder/owner button first

**Step 11:** Go http://localhost:4200/register-user/breeder. This is the registration page for breeder.

```
ex:
  User ID: 10
  Name: saji
  Email: saji@abc.com
  password: saji
``` 

**Step 12:** Go back to the register menu, go to http://localhost:4200/register-user/doctor. This is the registration page for doctors.

```
ex:
  User ID: 20
  Name: ayana
  Email: ayana@abc.com
  Hospital: dog care
  password: ayana
``` 

**Step 13:** Go back to the register menu, go to http://localhost:4200/register-user/authority. This is the registration page for authority.

```
ex:
  User ID: 1
  Name: admin
  Email: admin@abc.com
  password: admin
``` 
After this, the page is redirected to http://localhost:4200/authority-home.

**Step 14:** Go to http://localhost:4200/approve-breeders for viewing unapproved breeders. Select options approve or delete for each account. 

**Step 15.a:** If you select delete, it will go to http://localhost:4200/delete-breeder/:breederId. There you will have 2 buttons. No button will take you back to the unapproved breeders page. If you choose yes, the account of that breeder will be deleted.

**Step 15.b:** If you select approve, it will go to http://localhost:4200/approve-breeder/:breederId. There you will have 2 buttons. No button will take you back to the unapproved breeders page. If you choose yes, the account of that breeder will be added to blockchain.

**Step 16:** Go back to authority menu, and go to http://localhost:4200/approve-doctors for viewing unapproved doctors. Select options approve or delete for each account. 

**Step 17.a:** If you select delete, it will go to http://localhost:4200/delete-doctor/:doctorId. There you will have 2 buttons. No button will take you back to the unapproved doctors page. If you choose yes, the account of that doctor will be deleted.

**Step 17.b:** If you select approve, it will go to http://localhost:4200/approve-doctor/:doctorId. There you will have 2 buttons. No button will take you back to the unapproved doctors page. If you choose yes, the account of that doctor will be added to blockchain.

**Step 18:** Log out, and go to http://localhost:4200/login-menu. Select breeder option and go to http://localhost:4200/login-user/breeder for login as a breeder. Give appropriate email and password, and go to http://localhost:4200/breeder-home.

**Step 19:** Click on dog birth registration and go to http://localhost:4200/dog-birth-registration/:breederId. Give appropriate data.

```
ex:
  Dog ID: 100
  Dog Name: tucker
  Breed: labrador
  Colour: creamy white
  Sex: Dog
  Date of Birth: 12-05-2018
  Type of Parents: Both parents are unregistered
  Father's ID: 0
  Mother's ID: 0
``` 
After submitting this data, the authority have to approve this birth registration.

**Step 20:** Log out, and go to http://localhost:4200/login-menu. Select authority option and go to http://localhost:4200/login-user/authority for login as a authority. Give appropriate email and password, and go to http://localhost:4200/authority-home.

**Step 21:** Click approving dog birth registration and goto http://localhost:4200/approve-dog-birth-registrations. Select options approve or delete for each account. 

**Step 22.a:** If you select delete, it will go to http://localhost:4200/delete-dog-birth-registration/:dogId. There you will have 2 buttons. No button will take you back to the unapproved dog birth registrations page. If you choose yes, the details of that dog will be deleted.

**Step 22.b:** If you select approve, it will go to http://localhost:4200/approve-dog-birth-registration/:dogId. There you will have 2 buttons. No button will take you back to the unapproved dog birth registrations page. If you choose yes, the details of that dog will be added to blockchain.

**Step 23.a:** Go back to authority menu. Select display complete list of breeders and goto http://localhost:4200/breeders-list. You can select each account seperately, for viewing more details about that breeder by going to http://localhost:4200/breeder/:breederId

**Step 23.b:** Go back to authority menu. Select display complete list of doctors and goto http://localhost:4200/doctors-list. You can select each account seperately, for viewing more details about that doctor by going to http://localhost:4200/doctor/:doctorId

**Step 23.c:** Go back to authority menu. Select display complete list of dogs and goto http://localhost:4200/all-dogs-list. You can select each account seperately, for viewing more details about that dog by going to http://localhost:4200/dog/:dogId

**Step 24:** Log out, and go to http://localhost:4200/login-menu. Select breeder option and go to http://localhost:4200/login-user/breeder for login as a breeder. Give appropriate email and password, and go to http://localhost:4200/breeder-home.

**Step 25.a:** Select display complete list of dogs and goto http://localhost:4200/total-dogs/:breederId. You can select each account seperately, for viewing more details about that breeder by going to http://localhost:4200/dog/:dogId

**Step 25.b:** Select display complete list of sold dogs and goto http://localhost:4200/sold-dogs/:breederId. You can select each account seperately, for viewing more details about that doctor by going to http://localhost:4200/doctor/:doctorId

**Step 25.c:** Select display complete list current dogs and goto http://localhost:4200/current-dogs/:breederId. You can select each account seperately, for viewing more details about that dog by going to http://localhost:4200/dog/:dogId. Select ownership transfer option and go to http://localhost:4200/dog-ownership-transfer:dogId. Enter appropriate details.

```
ex
  New Owner ID: 11
```
This process also have to be approved by the authority.

**Step 26:** Log out, and go to http://localhost:4200/login-menu. Select authority option and go to http://localhost:4200/login-user/authority for login as a authority. Give appropriate email and password, and go to http://localhost:4200/authority-home.

**Step 27:** Click approving dog ownership transfer and goto http://localhost:4200/approve-dog-ownership-transfers. Select options approve or delete for each processes. 

**Step 28.a:** If you select delete, it will go to http://localhost:4200/delete-dog-ownership-transfer/:dogId. There you will have 2 buttons. No button will take you back to the unapproved dog ownership transfers page. If you choose yes, the ownership transfer of that dog will be cancelld.

**Step 28.b:** If you select approve, it will go to http://localhost:4200/approve-dog-ownership-transfer/:dogId. There you will have 2 buttons. No button will take you back to the unapproved dog ownership transfers page. If you choose yes, the ownership transfer of that dog will be approved and add it to the blockchain.

**Step 29:** Log out, and go to http://localhost:4200/login-menu. Select breeder option and go to http://localhost:4200/login-user/breeder for login as a breeder. Give appropriate email and password, and go to http://localhost:4200/breeder-home.

**Step 30.a:** Select display complete list of sold dogs and goto http://localhost:4200/sold-dogs/:breederId. You can select each account seperately, for viewing more details about that doctor by going to http://localhost:4200/doctor/:doctorId

**Step 30.b:** Select display complete list current dogs and goto http://localhost:4200/current-dogs/:breederId. You can select each account seperately, for viewing more details about that dog by going to http://localhost:4200/dog/:dogId.

**Step 31:** Log out, and go to http://localhost:4200/login-menu. Select doctor option and go to http://localhost:4200/login-user/doctor for login as a doctor. Give appropriate email and password, and go to http://localhost:4200/doctor-home.

**Step 32:** Click on vaccination option and go to http://localhost:4200/vaccinate-dog/:doctorId. Give appropriate data.

```
ex:
  Vaccination ID: 1000
  Dog ID: 100
  Vaccination Date: 12-05-2018
  Vaccination Name: rabies vaccine
``` 
**Step 33:** Click on treatment option and go to http://localhost:4200/treat-dog/:doctorId. Give appropriate data.

```
ex:
  Treatment ID: 1000
  Dog ID: 100
  Treatment Date: 12-05-2018
  Symptoms: pain in the back left leg,
            could not walk properly
  Verdict: A sprain in the back left leg
  Prescription: bandage in the back left leg,
                pain killer for dogs
``` 

**Step 34:** Click on change hospital option and go to http://localhost:4200/change-hospital/:doctorId. Give appropriate data.

```
ex:
  New Hospital Name: Pet Hospital
```

**Step 35:** Click on complete list of vaccinated dogs option and go to http://localhost:4200/doctor-vaccinated-dogs/:doctorId. You can view list of vaccinations done by that doctor in this page. For viewing more details, go to http://localhost:4200/vaccination-data/:vaccId.

**Step 36:** Click on complete list of treated dogs option and go to http://localhost:4200/doctor-treated-dogs/:doctorId. You can view list of treatments done by that doctor in this page. For viewing more details, go to http://localhost:4200/treatment-data/:treatId.

**Step 37:** Log out, and go to http://localhost:4200/login-menu. Select breeder option and go to http://localhost:4200/login-user/breeder for login as a breeder. Give appropriate email and password, and go to http://localhost:4200/breeder-home.

**Step 38:** Go to total dogs/sold dogs/current dogs option. Select a single dog. At the bottom you will see links for vaccination and treatment data

**Step 39.a:** Click on vaccination details option and go to http://localhost:4200/dog-vaccination/:dogId. You can view list of vaccinations done to that dog in this page. For viewing more details, go to http://localhost:4200/vaccination-data/:vaccId.

**Step 36:** Click on treatment details option and go to http://localhost:4200/dog-treatment/:dogId. You can view list of treatments done to that dog in this page. For viewing more details, go to http://localhost:4200/treatment-data/:treatId.

END
