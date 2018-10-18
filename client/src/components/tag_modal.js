import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';

class TagModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
            newTagName: ''
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewTag = this.createNewTag.bind(this);
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
        this.createNewTag();
    }
    
    async createNewTag(){
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

    handleAddTag = async (event) => {
        event.preventDefault();

        const { newTagName } = this.state;

        if(newTagName) {
            const resp = await axios.post('/api/manageTags/addTag', {
                tagName: newTagName
            });

            this.createNewTag();

            this.setState({
                newTagName: ''
            });
        }
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
                            <div className="new_tag">
                                <label className="new_tag_label">New Tag :</label>
                                <input className="new_tag_input" placeholder="new tag name" onChange={ (e) => this.setState({newTagName: e.target.value})}
                                    type="text"
                                    value={newTagName}
                                />
                                <i className="add_tag_btn material-icons md-30" onClick={this.handleAddTag}>add_box</i>
                            </div>
                            <br/>
                            <div className="tag_choices_container">
                                {tagChoices}
                            </div>
                            <br />
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

