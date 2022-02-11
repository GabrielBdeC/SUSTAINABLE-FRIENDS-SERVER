import { HealthCheckDto } from '../dtos/health-check.dto';
import { HealthCheck } from '../models/health-check.entity';

export class HealthCheckDataConverter {
  public toDto(entity: HealthCheck): HealthCheckDto {
    const response = new HealthCheckDto();
    response.setIdentifier(entity.getIdentifier());
    return response;
  }

  public toEntity(dto: HealthCheckDto): HealthCheck {
    const response = new HealthCheck();
    response.setIdentifier(dto.getIdentifier());
    return response;
  }
}
