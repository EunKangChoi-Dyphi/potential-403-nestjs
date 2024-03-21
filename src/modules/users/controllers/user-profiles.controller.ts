import { Controller } from '@nestjs/common';
import { UserProfileService } from '../services/user-profiles.service';

@Controller(':id/profile')
export class UserProfilesController {
  constructor(private readonly userProfileService: UserProfileService) {}
}
