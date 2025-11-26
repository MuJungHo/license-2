import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  Paper,
  // Button,
  // DialogContent,
  // DialogActions,
  // TextField
} from "../components/common";

// import {
//   BorderColorSharp,
//   Delete,
//   AddBox,
// } from '@material-ui/icons';

// import {
//   License
// } from "../images/icons";
import moment from "moment";

const User = () => {
  const { t, authedApi } = useContext(GlobalContext);
  const [loglist, setLoglist] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    order: "desc",
    sort: "datetime",
    keyword: "",
    limit: 10,
    page: 1,
    start: moment().startOf('date').valueOf(),
    end: moment().endOf('date').valueOf(),
  });


  const getLogList = useCallback(async () => {
    const { result, total } = await authedApi.getLogList({
      data: {
      },
      ...filter
    });
    let _logs = result.map(l => ({
      ...l,
      _id: l.logid,
      datetime: moment(l.datetime).format("YYYY-MM-DD HH:mm:ss")
    }))
    setLoglist(_logs)
    setTotal(total)
  }, [filter])

  React.useEffect(() => {
    getLogList()
  }, [getLogList])

  return (
    <Paper>
      <Table
        title={t("_log")}
        rows={loglist}
        columns={[
          { key: 'datetime', label: t('datetime') },
          { key: 'accountname', label: t('account') },
          { key: 'condition', label: t('condition') },
          { key: 'detail', label: t('detail') },
        ]}
        dateRangePicker
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        total={total}
        onSearchClick={getLogList}
        onClearClick={() => setFilter({
          order: "desc",
          sort: "datetime",
          keyword: "",
          limit: 10,
          page: 1,
          start: moment().startOf('date').valueOf(),
          end: moment().endOf('date').valueOf(),
        })}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 1, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        onDateRangeChange={([start, end]) => setFilter({
          ...filter,
          start: moment(start).valueOf(),
          end: moment(end).valueOf()
        })
        }
        toolbarActions={[]}
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default User;