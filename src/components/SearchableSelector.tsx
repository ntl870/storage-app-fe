import { Empty, Select, SelectProps, Spin } from "antd";
import { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import { DocumentNode } from "graphql";
import { OperationVariables, useLazyQuery } from "@apollo/client";

export interface DebounceSelectProps<ValueType, QueryOptionVariables>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  debounceTimeout?: number;
  query: DocumentNode;
  format: (a: ValueType) => { label: string; value: string };
  queryOptionsVariables?: QueryOptionVariables;
  onChange?: (value: any) => void;
  multiple?: boolean;
}
const initialPagination = {
  page: 1,
  limit: 20,
};

export const SearchableSelector = <
  T,
  Y extends OperationVariables | undefined
>({
  debounceTimeout = 800,
  query,
  format,
  queryOptionsVariables,
  onChange,
  multiple,
  ...props
}: DebounceSelectProps<T, Y>) => {
  const [options, setOptions] = useState<T[]>([]);
  const [queryLoading, setQueryLoading] = useState(false);
  const [pagination, setPagination] = useState(initialPagination);
  const [hasMore, setHasMore] = useState(true);
  const [fetchQuery] = useLazyQuery(query);
  const [currentSearch, setCurrentSearch] = useState("");

  const fetchData = (search: string) => {
    fetchQuery({
      variables: queryOptionsVariables
        ? {
            ...queryOptionsVariables,
            search,
            ...pagination,
          }
        : {
            search,
            ...pagination,
          },
      fetchPolicy: "cache-and-network",
    })
      .then((newOptions) => {
        const queryName = Object.keys(newOptions.data)[0];
        setOptions(newOptions.data[queryName]?.results?.map(format));
        setHasMore(newOptions.data[queryName]?.hasMore);
      })
      .finally(() => {
        setQueryLoading(false);
      });
  };

  const debounceFetcher = useMemo(() => {
    setPagination(initialPagination);
    setHasMore(true);
    const loadOptions = (search: string) => {
      setQueryLoading(true);
      setOptions([]);
      fetchData(search);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

  const handleScroll = (e: any) => {
    const target = e.target;
    if (
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      hasMore
    ) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  useEffect(() => {
    const loadMoreOptions = async () => {
      if (hasMore && !queryLoading) {
        setQueryLoading(true);
        fetchData(currentSearch);
      }
    };

    loadMoreOptions();
  }, [pagination.page]);

  return (
    <Select
      className="w-full"
      labelInValue
      filterOption={false}
      onSearch={(search) => {
        setCurrentSearch(search);
        debounceFetcher(search);
      }}
      onChange={(value) => {
        onChange?.(value);
      }}
      showSearch
      allowClear
      autoClearSearchValue
      onPopupScroll={handleScroll}
      notFoundContent={queryLoading ? <Spin size="small" /> : <Empty />}
      loading={queryLoading}
      {...props}
      options={options as any}
      mode={multiple ? "multiple" : undefined}
    />
  );
};
