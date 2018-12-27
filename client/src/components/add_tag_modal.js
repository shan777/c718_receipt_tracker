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
        try{
            if(newTagName) {
                const resp = await axios.post('/api/manageTags/addTag', {
                    tagName: newTagName
                });
                const response = await axios.post('/api/manageTags/getUserTags');
    
                let respTagId = null;
                const responseTag = response.data.tags
                for(let i =0; i < responseTag.length; i ++){
                    if(responseTag[i].tagName === newTagName){
                        respTagId = responseTag[i].tagId;
                    }
                }
                this.createNewTag();
    
                this.setState({
                    newTagName: ''
                });
            }
            this.props.addNewDirectly(newTagName, respTagId);

        }catch(err){
            const response = await axios.post('/api/manageTags/getUserTags');
            const responseTag = response.data.tags
            let respTagId = null;
            let resptagName = null;
            for(let i = 0; i < responseTag.length; i++){
                if(responseTag[i].tagName === newTagName){
                    resptagName = responseTag[i].tagName;
                    respTagId = responseTag[i].tagId;
                }
            }

            this.createNewTag();
    
            this.setState({
                newTagName: ''
            });

            this.props.addNewDirectly(resptagName, respTagId);
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
                                    pattern="^[a-zA-Z \d]{1,18}$" 
                                    title="Must be letters/numbers up to 18 characters only."
                                    type="text"
                                    value={newTagName}
                                />
                                </label>
                            </div>

                            <button type="button" className="add_tag_modal_cancel_btn" onClick={this.props.handleClose}>Cancel</button>
                            <button className="add_tag_modal_add_btn">Add</button>
                        </div>
                    </form>
                </div> 
            </div>
        );
    }
}

export default AddTagModal;