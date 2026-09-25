import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import {
  CreateDataSourceDto,
  CreateFieldValuesDto,
  CreatePeriodDto,
  DataSourceService,
  RepairSourceRegistrationDto,
} from "./index.js";

@ApiTags("data-sources")
@Controller("data-sources")
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Get()
  @ApiOperation({ summary: "List data source metadata" })
  @ApiOkResponse({ description: "Data source summaries" })
  list() {
    return this.dataSourceService.listSources();
  }

  @Post()
  @ApiOperation({ summary: "Create a provider-backed data source" })
  @ApiCreatedResponse({ description: "Created data source" })
  create(@Body() input: CreateDataSourceDto) {
    return this.dataSourceService.createSource(input);
  }

  @Post("repair-registration")
  @HttpCode(200)
  @ApiOperation({ summary: "Repair the registry entry for a selected source" })
  repairSourceRegistration(@Body() input: RepairSourceRegistrationDto) {
    return this.dataSourceService.repairSourceRegistration(input);
  }

  @Get("periods")
  @ApiOperation({ summary: "List saved data source periods" })
  @ApiOkResponse({ description: "Data source periods" })
  listPeriods() {
    return this.dataSourceService.listPeriods();
  }

  @Get("periods/name-availability")
  @ApiOperation({ summary: "Check whether a period name is available" })
  @ApiOkResponse({ description: "Period name availability" })
  async periodNameAvailability(@Query("name") name = "") {
    return {
      available: await this.dataSourceService.isPeriodNameAvailable(name),
    };
  }

  @Post("periods")
  @ApiOperation({ summary: "Create a data source period" })
  @ApiCreatedResponse({ description: "Created period" })
  createPeriod(@Body() input: CreatePeriodDto) {
    return this.dataSourceService.createPeriod(input);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get metadata for one data source" })
  getSource(@Param("id") sourceId: string) {
    return this.dataSourceService.getSource(sourceId);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a data source and its store" })
  deleteSource(@Param("id") sourceId: string) {
    return this.dataSourceService.deleteSource(sourceId);
  }

  @Get(":id/content")
  @ApiOperation({ summary: "List content in one data source" })
  listObservations(@Param("id") sourceId: string) {
    return this.dataSourceService.listObservations(sourceId);
  }

  @Post(":id/refresh")
  @ApiOperation({ summary: "Refresh metadata for one provider-backed source" })
  @ApiOkResponse({ description: "Updated data source summary" })
  refreshSource(@Param("id") sourceId: string) {
    return this.dataSourceService.refreshSource(sourceId);
  }

  @Delete(":id/content")
  @ApiOperation({ summary: "Clear source content while retaining metadata" })
  @ApiOkResponse({ description: "Updated data source summary" })
  clearSourceData(@Param("id") sourceId: string) {
    return this.dataSourceService.clearSourceData(sourceId);
  }

  @Patch(":id/connection")
  @ApiOperation({ summary: "Write the source connection timestamp to its update record" })
  @ApiOkResponse({ description: "Updated connection timestamp" })
  updateSourceConnection(@Param("id") sourceId: string) {
    return this.dataSourceService.updateSourceConnection(sourceId);
  }

  @Get(":id/connection")
  @ApiOperation({ summary: "Read the source connection update record" })
  @ApiOkResponse({ description: "The update record value" })
  getSourceConnection(@Param("id") sourceId: string) {
    return this.dataSourceService.getSourceConnection(sourceId);
  }

  @Post(":id/field-values")
  @ApiOperation({ summary: "Save period values for one source in a compute" })
  @ApiCreatedResponse({ description: "Saved source values" })
  createFieldValues(
    @Param("id") sourceId: string,
    @Body() input: CreateFieldValuesDto,
  ) {
    return this.dataSourceService.createFieldValues(sourceId, input);
  }
}
