export class DogBirthRegisterDataModel {
  constructor(
    public dogId: Number,
    public dogName: String,
    public breed: String,
    public colour: String,
    public sex: String,
    public dob: Date,
    public fatherId: Number,
    public motherId: Number
  ) {}
}