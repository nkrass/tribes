import { UserRole } from "../../user/entities/user.entity";

export class JwtDto {
  userId: string;
  userRole: UserRole;
}