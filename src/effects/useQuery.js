// @flow

import * as React from "react";

import CancelToken from "../framework/classes/CancelToken";

import type { CancelTokenQuery } from "../framework/interfaces/CancelTokenQuery";
import type { ExceptionHandler } from "../framework/interfaces/ExceptionHandler";
import type { LoggerBreadcrumbs } from "../framework/interfaces/LoggerBreadcrumbs";
import type { Query } from "../framework/interfaces/Query";
import type { QueryBus } from "../framework/interfaces/QueryBus";

export default function useQuery<T>(exceptionHandler: ExceptionHandler, loggerBreadcrumbs: LoggerBreadcrumbs, queryBus: QueryBus, query: ?Query<T>): ?CancelTokenQuery<T> {
  const [cancelTokenQuery, setCancelTokenQuery] = React.useState<?CancelTokenQuery<T>>(null);
  const setIsExecuted = React.useState<boolean>(false)[1];

  React.useEffect(
    function() {
      if (!query) {
        return;
      }

      const breadcrumbs = loggerBreadcrumbs.add("React.useEffect");
      const cancelToken = new CancelToken(breadcrumbs);
      const cancelTokenQuery = queryBus.enqueue(cancelToken, query);

      setIsExecuted(false);
      setCancelTokenQuery(cancelTokenQuery);

      cancelTokenQuery
        .whenExecuted()
        .then(() => {
          return setIsExecuted(true);
        })
        .catch(async function(err) {
          const isCaptured = await exceptionHandler.captureException(breadcrumbs, err);

          if (isCaptured) {
            throw err;
          }
        });

      return function() {
        cancelToken.cancel(breadcrumbs.add("cleanup"));
      };
    },
    [exceptionHandler, loggerBreadcrumbs, query, queryBus, setIsExecuted]
  );

  return cancelTokenQuery;
}
