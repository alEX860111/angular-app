export class Session {
  username: string;
  userId: string;
  role: string;
  expirationDate: Date;
  loginDate: Date;

  public isAdmin() {
    return 'ADMIN' === this.role;
  }

}
