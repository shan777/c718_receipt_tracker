import React, {Component} from 'react';
import './modal.css';
import TagPanel from './receipt_tags/tag_panel';
import axios from 'axios';

class TagModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            newTagName: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event) {
        const { tags } = this.state;
        const { checked, name } = event.target;

        const tagData = tags[name];

        if(tagData){
            tagData.checked = checked;

            this.setState({
                tags: {...tags, [name]: tagData}
            });
        }
    }
    
    async componentDidMount() {
        const resp = await axios.post('/api/manageTags/getUserTags');

        const tags = {};

        resp.data.tags.map(tag => {
            tag.checked = false;
            tags[tag.tagId] = tag
        });

        this.setState({
            tags: tags
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { tags } = this.state;
        const addedTags = Object.keys(tags).map( tagId => {
            return tags[tagId];
        }).filter(tag => tag.checked);

        this.props.selectTags(addedTags);

        this.props.handleClose();

    } 

    handleNewTag = async (newTagText) => {
        const resp = await axios.post('/api/manageTags/addTag', {
            tagName: newTagText
        });

        this.setState({
            newTagName: newTagText
        })
    }

    render() {

        const { tags, newTagName } = this.state;
        const tagChoices = Object.keys(tags).map((tagId, index) => {
            return (<label className="checkbox_label" key={index}>
                        <input 
                        className="checkbox"
                        name={tagId}
                        type="checkbox"
                        checked={tags[tagId].checked}
                        onChange={this.handleInputChange}
                        />&nbsp;&nbsp;&nbsp;{tags[tagId].tagName}<br />
                    </label>
            );
        });

        return (
            <div className="basic_modal">
                <div className="basic_modal_content">
                    <form onSubmit={this.handleSubmit}>
                    <div className="tag_modal_container">
                        <h2><i className="material-icons tag_icon">local_offer</i>
                            &nbsp;&nbsp;&nbsp;Select Tags 
                        </h2>
                        {tagChoices}
                        <br />

                        <label className="tag_label">New Tag :</label>
                        <input className="new_tag_input" placeholder="Enter new tag name" onChange={ (e) => this.setState({newTagName: e.target.value})}
                            type="text"
                            value={newTagName}
                        /><br/><br/>
                        <button type="button" className="tag_modal_close_btn" onClick={this.props.handleClose}>Cancel</button>
                        <button className="tag_modal_apply_btn">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TagModal;

