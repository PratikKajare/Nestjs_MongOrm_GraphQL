import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchServiceInterface } from './interface/search.service.interface';

import { ElasticsearchModule } from '@nestjs/elasticsearch';

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
    }),
  ],

  providers: [
    {
      provide: 'SearchServiceInterface',
      useClass: SearchService,
    },
    SearchService,
  ],
  controllers: [],
  exports: [SearchModule, SearchService],
})
export class SearchModule {}
