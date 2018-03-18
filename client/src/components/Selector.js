import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';  
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


const Selector = (props) => {
  
  return (
    <Toolbar>
        <ToolbarGroup firstChild={false}>
          <SelectField
            floatingLabelText="Select Query"
            value={props.query}
            onChange={(event,index,value) => props.onQueryChange(value)}
          >
            <MenuItem value={1} primaryText="Most Viewed Questions" />
            <MenuItem value={2} primaryText="Most Recent Questions" />
            <MenuItem value={3} primaryText="Most Answered Questions" />
          </SelectField>
        </ToolbarGroup>
    </Toolbar>
  )
}

export default Selector;