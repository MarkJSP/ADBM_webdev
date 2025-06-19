import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StudentsModule } from './students/students.module';
import { AcademicLevelsModule } from './academic-levels/academic-levels.module';

import { AcademicLevel } from './entities/academic-level.entity';
import { Student } from './entities/student.entity';

@Module({
  imports: [
    // 1) Global config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2) Database connection & entity registration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USER', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'student_db'),
        entities: [AcademicLevel, Student],
        synchronize: false,
        logging: true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    // 3) Make repositories injectable
    TypeOrmModule.forFeature([AcademicLevel, Student]),

    // 4) Feature modules
    StudentsModule,
    AcademicLevelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    // ensures that TypeORM DataSource is initialized
  }
}
