import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
var moment = require('moment');

const QuestionsTable = (props) => {
  console.log('props',props)
  var items = <TableRow key={0}/>
  if (props.questions) {
    items = props.questions.map((item) => {
      return (
        <TableRow key={item.id}>
          <TableRowColumn>
            <FlatButton 
              label={item.title} 
              labelStyle={{textTransform: 'inherit'}}
              href={item.url} 
              target = "_blank"
            />
          </TableRowColumn>
          <TableRowColumn>{item.creation_date ? moment(item.creation_date.value).format("MMM Do YY") : ''}</TableRowColumn>
          <TableRowColumn>{item.view_count}</TableRowColumn>
          <TableRowColumn>{item.answer_count}</TableRowColumn>
        </TableRow>
      )
    })
  }
  
  return (
    <Table>
    <TableHeader
    displaySelectAll = {false}
    >
      <TableRow>
        <TableHeaderColumn>Title</TableHeaderColumn>
        <TableHeaderColumn>Created</TableHeaderColumn>
        <TableHeaderColumn>View Count</TableHeaderColumn>
        <TableHeaderColumn>Answer Count</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
    displayRowCheckbox = {false}
    >
      {items}
    </TableBody>
  </Table>
  )
}

export default QuestionsTable;