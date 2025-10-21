import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value as string;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('COACH_ASSISTANT_HOST'),
      port: parseInt(this.getValue('COACH_ASSISTANT_PORT')),
      username: this.getValue('COACH_ASSISTANT_USER'),
      password: this.getValue('COACH_ASSISTANT_PASSWORD'),
      database: this.getValue('COACH_ASSISTANT_DATABASE'),

      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      extra: {
        multipleStatements: true,
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'COACH_ASSISTANT_HOST',
  'COACH_ASSISTANT_PORT',
  'COACH_ASSISTANT_USER',
  'COACH_ASSISTANT_PASSWORD',
  'COACH_ASSISTANT_DATABASE',
]);

export { configService };
