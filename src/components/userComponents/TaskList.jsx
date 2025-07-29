import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox'; // Keep Checkbox import for individual tasks
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { useState, useEffect } from 'react';
import getAllTasks from '../../api/getAllTasks';
import deleteTask from '../../api/deleteTasks';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../modals/deleteConfirmationModal';
import UpdateTaskModal from '../../modals/updateTaskModal';
import AddTaskModal from '../../modals/addTaskModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../context/AuthContext';


const headCells = [
  {
    id: 'Task Name',
    numeric: false,
    disablePadding: false,
    label: 'Tasks',
  },
  {
    id: 'Status ',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'Due Date',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  { // New column for Actions
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
    align: 'center', // Center alignment for the 'Actions' header label
  },
];



function EnhancedTableHead(props) {
  // Removed onSelectAllClick, numSelected, rowCount from props destructuring
  const { order, orderBy, onRequestSort } = props; 
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        {/* Removed the TableCell containing the "select all" checkbox */}
        <TableCell padding="checkbox" /> {/* Empty TableCell for the checkbox column header for alignment */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || (headCell.numeric ? 'right' : 'left')}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={true}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired, // Keep for potential use with toolbar or other logic
  onRequestSort: PropTypes.func.isRequired,
  // Removed onSelectAllClick from propTypes
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired, // Keep for potential use with toolbar or other logic
};



function EnhancedTableToolbar(props) {
  const { numSelected, allTheTasks, selectedID, clearSelected } = props; // Add clearSelected prop
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleUpdateRefresh = async () => {
    await allTheTasks();
    clearSelected(); // Call clearSelected after refreshing tasks
  }

  const handleDelete = async () => {
    await deleteTask(selectedID, auth.token);
    handleUpdateRefresh();
  }

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          py: 1,
          minHeight: { xs: 56, sm: 64 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete" >
          <DeleteConfirmationModal deleteFunc={handleDelete}/>
        </Tooltip>
        </>
        
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Tooltip title="Back" >
            <IconButton onClick={()=>{navigate('/')}} sx={{ mr: 1 }}>
              <ArrowBackIcon fontSize="small"/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Task">
            <IconButton sx={{ ml: 'auto' }}>
              <AddTaskModal allTheTasks={allTheTasks} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedID: PropTypes.array.isRequired,
  allTheTasks: PropTypes.func.isRequired,
  clearSelected: PropTypes.func.isRequired, // Add propType for clearSelected
};



export default function TaskList() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [rows, setTasks] = useState([]);
  const [refresh, setRefresh ] = useState(false);
  const { auth } = useAuth();


  const allTheTasks = async () => {
      await getAllTasks(auth.token)
      .then(e => {setTasks(e)})
  };

   const refreshTasks = async () => {
      refresh ? setRefresh(false) : setRefresh(true);
  }

  const clearSelected = () => { // New function to clear selected items
    setSelected([]);
  };

  useEffect(()=>{
    const timerId = setTimeout(() => {
      allTheTasks();
    }, 10);

    return () => {
      clearTimeout(timerId);
    };
  }, [refresh])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    } 
    setSelected(newSelected);
  };


  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, elevation: 3 }}>
        <EnhancedTableToolbar 
          allTheTasks={refreshTasks} 
          numSelected={selected.length} 
          selectedID={selected} 
          clearSelected={clearSelected} // Pass clearSelected to toolbar
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // Removed onSelectAllClick from props passed to EnhancedTableHead
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* Keep the TableCell with the Checkbox for individual rows */}
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      // Default padding or adjust as needed
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.dueDate}</TableCell>

                    {/* New TableCell for Actions */}
                    <TableCell align="center">
                      <IconButton>
                          <UpdateTaskModal allTheTasks={refreshTasks} selectedID={row.id}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    </>
  );
}