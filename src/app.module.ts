// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService }    from './app.service';
import { StudentsModule } from './students/students.module';

import { AcademicLevel } from './entities/academic-level.entity';
import { Student }       from './entities/student.entity';
import { StudentGpa }    from './entities/student-gpa.entity';

@Module({
  imports: [
    // 1) Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2) Configure TypeORM with SnakeNamingStrategy
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:       'mysql',
        host:       config.get<string>('DATABASE_HOST', 'localhost'),
        port:       config.get<number>('DATABASE_PORT', 3306),
        username:   config.get<string>('DATABASE_USERNAME', 'root'),
        password:   config.get<string>('DATABASE_PASSWORD', ''),
        database:   config.get<string>('DATABASE_NAME', 'student_db'),
        entities:   [AcademicLevel, Student, StudentGpa],
        synchronize: false,
        logging:     true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    // 3) Register the Students feature module
    StudentsModule,
  ],
  controllers: [
    AppController,   // only the root controller
  ],
  providers: [
    AppService,      // only the root service
  ],
})
export class AppModule {}
