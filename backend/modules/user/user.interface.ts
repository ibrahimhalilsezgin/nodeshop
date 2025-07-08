interface User {
  id: number;
  idenityID?: string;
  firstName: string;
  lastName: string;
  email: string;
  gsmNumber: string;
  password: string;
  IPAddress?: string;
  createdAt: Date;
  admin: boolean;
  registrationAddress?: string;
  city: string;
  country?: string;
  zipCode: string;
  purchases?: any[]; 

}

export default User;
