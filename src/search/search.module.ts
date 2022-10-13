import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: SearchService) => ({
        node: 'http://localhost:9200/',
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
        index: 'categorys',
        auth: {
          username: 'elastic',
          password: 'KfTdC=4qgizEX6r68vuA',
        },
      }),
      inject: [ConfigService],
    }),
  ],

  // providers: [
  //   //   {
  //   //     provide: 'SearchServiceInterface',
  //   //     useClass: SearchService,
  //   //   },
  //   SearchService,
  // ],
  controllers: [],
  exports: [SearchModule, ElasticsearchModule],
})
export class SearchModule {}
