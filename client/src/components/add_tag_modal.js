import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';

class AddTagModal extends Component{
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
        this.props.handleClose();

    }

    render() {
        const { newTagName } = this.state;
        
        return (
            <div className="basic_modal">
                 <div className="basic_modal_content">
                    <form onSubmit={this.handleAddTag}>
                        <div className="add_tag_modal_container">
                            <div className="tag_header"><i className="material-icons tag_icon">local_offer</i>
                                &nbsp;&nbsp;&nbsp;Add New Tag
                            </div>
                            <div className="new_tag">
                                <label className="new_tag_label">
                                <input className="new_tag_input" placeholder="Enter new tag name" onChange={ (e) => this.setState({newTagName: e.target.value})}
                                    type="text"
                                    value={newTagName}
                                />
                                </label>
                            </div>

                            <button type="button" className="tag_modal_close_btn" onClick={this.props.handleClose}>Cancel</button>
                            <button className="tag_modal_add_btn">Add</button>
                        </div>
                    </form>
                </div> 
            </div>
        );
    }
}

export default AddTagModal;