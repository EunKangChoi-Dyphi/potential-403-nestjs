import { Module } from '@nestjs/common';
import { NcpService } from './ncp.service';
import { CustomConfigModule } from 'src/modules/core/config/custom-config.module';

// Naver-Cloud-Platform Service Modules
@Module({
  imports: [CustomConfigModule],
  providers: [NcpService],
  exports: [NcpService],
})
export class NcpModule {}
