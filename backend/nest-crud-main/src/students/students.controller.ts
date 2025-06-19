// backend/nest-crud-main/src/students/students.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService }    from './students.service';
import { CreateStudentDto }   from './dto/create-student.dto';
import { UpdateStudentDto }   from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly svc: StudentsService) {}

  @Post()
  create(@Body() dto: CreateStudentDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
