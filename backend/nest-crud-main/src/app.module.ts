// Path: backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService }    from './app.service';

import { Student }       from './entities/student.entity';
import { AcademicLevel } from './entities/academic-level.entity';
import { StudentGpa }    from './entities/student-gpa.entity';

import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    // 1) Load .env into process.env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2) TypeORM setup
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        type:       'mysql',
        host:       config.get<string>('DB_HOST', 'localhost'),
        port:       config.get<number>('DB_PORT', 3306),
        username:   config.get<string>('DB_USER', 'root'),
        password:   config.get<string>('DB_PASSWORD', ''),
        database:   config.get<string>('DB_NAME', 'student_db'),
        entities:   [AcademicLevel, Student, StudentGpa],
        synchronize: false,            // use migrations in production
        logging:     true,
        namingStrategy: new SnakeNamingStrategy(),
      }),
    }),

    // 3) Feature module for /student endpoints
    StudentsModule,
  ],
  controllers: [AppController],
  providers:   [AppService],
})
export class AppModule {}
