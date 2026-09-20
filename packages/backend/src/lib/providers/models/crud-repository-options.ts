export type CrudRepositoryOptions = {
  entityName: string;
  searchableFields: readonly string[];
  sortableFields: readonly string[];
  sortFieldMap?: Readonly<Record<string, string>>;
  defaultSort?: string;
};
