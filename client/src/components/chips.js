import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import TagIcon from '@material-ui/icons/LocalOffer';
// import TagFacesIcon from '@material-ui/icons/TagFaces';
import DoneIcon from '@material-ui/icons/Done';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class ChipsArray extends Component {
    state = {
        chipData: [
        { key: 0, label: 'reimbursable' },
        { key: 1, label: 'date' },
        { key: 2, label: 'sister' },
        { key: 3, label: 'gift' },
        { key: 4, label: 'Amberlyn' },
        ],
    };

  handleDelete = data => () => {
    // if (data.label === 'React') {
    //   alert('Why would you want to delete React?! :)'); // eslint-disable-line no-alert
    //   return;
    // }

    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        {this.state.chipData.map(data => {
          let icon = <TagIcon />;

          

          return (
            <Chip
            avatar={<Avatar>{data.label.charAt(0).toUpperCase()}</Avatar>}
              key={data.key}
            //   icon={icon}
              label={data.label}
              onDelete={this.handleDelete(data)}
              className={classes.chip}
              deleteIcon={<DoneIcon />}
            />
            
            
          );
        })}
      </Paper>
    );
  }
}

// ChipsArray.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ChipsArray);
