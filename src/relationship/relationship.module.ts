// src/relationship/relationship.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Relationship, RelationshipSchema } from '../schemas/relationship.schema';
import { RelationshipService } from './relationship.service';
import { RelationshipController } from './relationship.controller';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Relationship.name, schema: RelationshipSchema }],
      'userdbConnection' // ensure this matches the connection name
    ),
  ],
  providers: [RelationshipService],
  controllers: [RelationshipController],
})
export class RelationshipModule {}