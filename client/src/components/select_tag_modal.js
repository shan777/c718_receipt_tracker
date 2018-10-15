import React, {Component} from 'react';
import './modal.css';
import TagPanel from './receipt_tags/tag_panel';
import axios from 'axios';


class SelectTagModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            tags: [],
            newTag: []
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const tagName = target.name;
    
        this.setState({
          [tagName]: value
        });
    }
    
    async componentDidMount() {
        const login = await axios.post('/api/login', {userName: 'sarahHan', password: 'sarahLfz123'});

        const resp = await axios.post('/api/manageTags/getUserTags', {
            tags: resp
        });

        console.log('resp tags: ', resp.data.tags);

        this.setState({
            tags: resp.data.tags
        });
    }


    //another modalllllllllllllllllllllllllllllllllllllllllllllll
    // handleNewTag = async (newTagText) => {
    //     console.log('new tab adding', newTagText);

    //     const resp = await axios.post('/api/manageTags/addTag', {
    //         tagName: newTagText
    //     });

    //     console.log('handle new tag resp: ', resp )
    //     this.setState({
    //         newTags: [...this.state.newTags, newTagText]
    //     })
    // }

    render() {
        const currentUsersTags = [ ...this.state.tags];

        console.log('Tags: ', currentUsersTags);

    
        const tagChoices = currentUsersTags.map((item, index) => {
            <label key={index}>{item.tagName}
                <input 
                name={item.tagName}
                type="checkbox"
                // checked={this.state.checked}
                onChange={this.handleInputChange}
                />
            </label>
        });

        return (
            <form>
                <label>Select Tags:</label>
                {tagChoices}
                <br />
                
                {/* below should be another modal to add new tag
                <label>
                    Tag:<input placeholder=" Add your own tag" type="text"/>
                </label>
                <TagPanel tags={this.state.tags} addCallback={this.handleNewTag}/> */}
            </form>

        );
    }
}

    export default SelectTagModal;

