export class HealthCheckDto {
  protected identifier: string;

  public getIdentifier(): string {
    return this.identifier;
  }

  public setIdentifier(value: string) {
    this.identifier = value;
  }
}
