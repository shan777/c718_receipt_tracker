import React, { Component } from 'react';
import './modal.css';
import axios from 'axios';

class SelectTagModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            tags: {},
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
        if(this.props.currentTagsforUpdate){
            this.props.currentTagsforUpdate.map((item)=>{
                item.checked = true;
                this.state.tags[item.tagId] = item;
            });
        }
        if(this.props.currentTags){
            this.props.currentTags.map((item)=>{
                item.checked = true;
                this.state.tags[item.tagId] = item;
            });
        }
        this.createNewTag();
    }
    
    async createNewTag(){
        const resp = await axios.post('/api/manageTags/getUserTags');
        const { tags } = this.state;
        
        resp.data.tags.map(tag => {
            if(!tags[tag.tagId]){
                tag.checked = false;
                tags[tag.tagId] = tag
            }
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

   

    render() {
        const { tags } = this.state;
        const tagChoices = Object.keys(tags).map((tagId, index) => {
            return (
                // <div className="each_tag_container" key={index}>
                    <label className="checkbox_label" key={index}>
                        {tags[tagId].tagName}
                        <input 
                        type="checkbox"
                        name={tagId}
                        checked={tags[tagId].checked}
                        onChange={this.handleInputChange}
                        />
                        <span 
                        className="checkmark"
                        name={tagId}
                        checked={tags[tagId].checked}
                        onChange={this.handleInputChange}
                        />
                        <br/>
                    </label>
                // </div>
            );
        });

        return (
            <div className="basic_modal">
                 <div className="basic_modal_content">
                    <form onSubmit={this.handleSubmit}>
                        <div className="tag_modal_container">
                            <div className="tag_header"><i className="material-icons tag_icon">local_offer</i>
                                &nbsp;&nbsp;&nbsp;Select Tags 
                            </div>
                 
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

export default SelectTagModal;