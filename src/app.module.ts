import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './config/configuration';
import { ConfigurationModule } from './config/config.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
// import { ormConfig } from './search/constant/ormconfig';
@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env`,
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().database.mongoDb),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    ConfigurationModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
