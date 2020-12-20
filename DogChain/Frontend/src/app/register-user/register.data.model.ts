export class RegisterDataModel {
  constructor(
    public userId: number,
    public name: string,
    public email: string,
    public hospital: string,
    public password: string
  ) {}
}